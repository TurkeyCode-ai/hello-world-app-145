/**
 * Accessibility Audit Script
 * Tests WCAG 2.1 AA compliance using axe-core
 */

const { chromium } = require('playwright');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function runAccessibilityAudit() {
  console.log('🔍 Starting accessibility audit...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:8080');
    
    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 5000 });
    
    // Inject axe-core
    await page.addScriptTag({
      path: require.resolve('axe-core/axe.min.js')
    });
    
    // Run accessibility audit
    const results = await page.evaluate(async () => {
      const axe = window.axe;
      return await axe.run();
    });
    
    // Process results
    const { violations, passes, incomplete } = results;
    
    console.log(`✅ Accessibility tests passed: ${passes.length}`);
    console.log(`⚠️  Incomplete tests: ${incomplete.length}`);
    console.log(`❌ Violations found: ${violations.length}`);
    
    if (violations.length > 0) {
      console.log('\n🚨 ACCESSIBILITY VIOLATIONS:');
      violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Help: ${violation.helpUrl}`);
        
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   Element ${nodeIndex + 1}: ${node.target.join(', ')}`);
        });
      });
      
      process.exit(1);
    } else {
      console.log('\n🎉 No accessibility violations found!');
    }
    
  } catch (error) {
    console.error('Error running accessibility audit:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run the audit if this script is executed directly
if (require.main === module) {
  runAccessibilityAudit();
}

module.exports = { runAccessibilityAudit };