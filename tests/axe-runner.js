/**
 * Automated axe-core accessibility testing runner
 * Runs comprehensive accessibility audits using Puppeteer
 */

const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const fs = require('fs');
const path = require('path');

async function runAxeTests() {
  let browser;
  let results = [];

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent testing
    await page.setViewport({ width: 1200, height: 800 });

    // Create a simple Hello World HTML page for testing
    const testHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World - Accessibility Test</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .container { max-width: 800px; margin: 0 auto; }
          .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
          button { padding: 10px 20px; margin: 5px; border: 1px solid #ccc; background: #f8f9fa; }
          button:focus { outline: 2px solid #007bff; outline-offset: 2px; }
          input { padding: 8px; margin: 5px; border: 1px solid #ccc; }
          input:focus { outline: 2px solid #007bff; outline-offset: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <header role="banner">
            <h1>Hello World Application</h1>
            <nav role="navigation" aria-label="Main navigation">
              <ul>
                <li><a href="#home" aria-current="page">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </header>

          <main role="main">
            <section>
              <h2>Welcome</h2>
              <p>Welcome to our accessible Hello World application!</p>
              
              <form role="form" aria-label="Greeting form">
                <div>
                  <label for="name">Enter your name:</label>
                  <input type="text" id="name" name="name" aria-required="true" aria-describedby="name-help">
                  <div id="name-help" class="help-text">Please enter your full name</div>
                </div>
                
                <div>
                  <label for="message">Message (optional):</label>
                  <textarea id="message" name="message" rows="3" aria-describedby="message-help"></textarea>
                  <div id="message-help" class="help-text">Add a personal message</div>
                </div>

                <button type="submit">Say Hello</button>
                <button type="reset">Clear Form</button>
              </form>

              <div id="greeting-output" role="status" aria-live="polite" class="sr-only"></div>
              <div id="error-output" role="alert" aria-live="assertive" class="sr-only"></div>
            </section>

            <section>
              <h2>Features</h2>
              <ul>
                <li>Keyboard accessible navigation</li>
                <li>Screen reader friendly</li>
                <li>WCAG 2.1 AA compliant</li>
                <li>Responsive design</li>
              </ul>
            </section>
          </main>

          <footer role="contentinfo">
            <p>&copy; 2024 Hello World App. All rights reserved.</p>
          </footer>
        </div>

        <script>
          // Add some basic interactivity
          document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const output = document.getElementById('greeting-output');
            
            if (name.trim()) {
              output.textContent = 'Hello, ' + name + '! Welcome to our app.';
              output.className = '';
            } else {
              const errorOutput = document.getElementById('error-output');
              errorOutput.textContent = 'Please enter your name.';
            }
          });
        </script>
      </body>
      </html>
    `;

    await page.setContent(testHtml);

    console.log('🔍 Running axe-core accessibility tests...');

    // Run axe with comprehensive rule set
    const axeResults = await new AxePuppeteer(page)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();

    results.push({
      url: 'Hello World Test Page',
      timestamp: new Date().toISOString(),
      violations: axeResults.violations,
      passes: axeResults.passes,
      incomplete: axeResults.incomplete,
      summary: {
        violationCount: axeResults.violations.length,
        passCount: axeResults.passes.length,
        incompleteCount: axeResults.incomplete.length
      }
    });

    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewport(viewport);
      console.log(`🔍 Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})...`);

      const viewportResults = await new AxePuppeteer(page)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      results.push({
        url: `Hello World Test Page - ${viewport.name}`,
        viewport: viewport,
        timestamp: new Date().toISOString(),
        violations: viewportResults.violations,
        passes: viewportResults.passes,
        incomplete: viewportResults.incomplete,
        summary: {
          violationCount: viewportResults.violations.length,
          passCount: viewportResults.passes.length,
          incompleteCount: viewportResults.incomplete.length
        }
      });
    }

  } catch (error) {
    console.error('❌ Error running axe tests:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Generate report
  await generateReport(results);
}

async function generateReport(results) {
  const reportsDir = path.join(process.cwd(), 'reports');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Save detailed JSON report
  const jsonReport = path.join(reportsDir, 'axe-accessibility-report.json');
  fs.writeFileSync(jsonReport, JSON.stringify(results, null, 2));

  // Generate summary report
  const summary = results.map(result => ({
    page: result.url,
    viewport: result.viewport?.name || 'Default',
    violations: result.summary.violationCount,
    passes: result.summary.passCount,
    incomplete: result.summary.incompleteCount
  }));

  const totalViolations = results.reduce((sum, result) => sum + result.summary.violationCount, 0);
  const totalPasses = results.reduce((sum, result) => sum + result.summary.passCount, 0);

  console.log('\n📊 Accessibility Test Summary:');
  console.log('================================');
  console.log(`Total Violations: ${totalViolations}`);
  console.log(`Total Passes: ${totalPasses}`);
  console.log(`Success Rate: ${((totalPasses / (totalPasses + totalViolations)) * 100).toFixed(1)}%`);

  if (totalViolations > 0) {
    console.log('\n❌ Accessibility Violations Found:');
    results.forEach(result => {
      if (result.violations.length > 0) {
        console.log(`\n${result.url}:`);
        result.violations.forEach(violation => {
          console.log(`  - ${violation.id}: ${violation.description}`);
          console.log(`    Impact: ${violation.impact}`);
          console.log(`    Elements: ${violation.nodes.length}`);
        });
      }
    });
  } else {
    console.log('\n✅ No accessibility violations found!');
  }

  console.log(`\n📄 Detailed report saved to: ${jsonReport}`);
}

if (require.main === module) {
  runAxeTests().catch(console.error);
}

module.exports = { runAxeTests };