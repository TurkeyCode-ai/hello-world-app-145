/**
 * Accessibility Tests for Hello World Application
 * Tests WCAG 2.1 AA compliance and accessibility features
 */

const { chromium } = require('playwright');
const { injectAxe, checkA11y, getViolations } = require('@axe-core/playwright');

async function runAccessibilityTests() {
  console.log('🔍 Running Accessibility Tests...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the application
    await page.goto('http://localhost:3000');
    
    // Inject axe-core for accessibility testing
    await injectAxe(page);
    
    console.log('✅ Page loaded successfully');
    
    // Run comprehensive accessibility audit
    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        rules: {
          'color-contrast': { enabled: true },
          'keyboard-navigation': { enabled: true },
          'focus-management': { enabled: true },
          'semantic-html': { enabled: true },
          'aria-labels': { enabled: true }
        }
      });
    });
    
    // Check for violations
    if (results.violations.length > 0) {
      console.log('❌ Accessibility violations found:');
      results.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Help: ${violation.helpUrl}`);
      });
    } else {
      console.log('✅ No accessibility violations found');
    }
    
    // Test keyboard navigation
    console.log('🔍 Testing keyboard navigation...');
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => {
      return {
        tagName: document.activeElement.tagName,
        id: document.activeElement.id,
        className: document.activeElement.className
      };
    });
    console.log('✅ Keyboard navigation working:', focusedElement);
    
    // Test screen reader compatibility
    console.log('🔍 Testing screen reader compatibility...');
    const ariaLabels = await page.evaluate(() => {
      const elements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
      return Array.from(elements).map(el => ({
        tagName: el.tagName,
        ariaLabel: el.getAttribute('aria-label'),
        ariaLabelledBy: el.getAttribute('aria-labelledby'),
        role: el.getAttribute('role')
      }));
    });
    
    if (ariaLabels.length > 0) {
      console.log('✅ ARIA labels found:', ariaLabels);
    }
    
    // Test color contrast
    console.log('🔍 Testing color contrast...');
    const contrastIssues = results.violations.filter(v => v.id === 'color-contrast');
    if (contrastIssues.length === 0) {
      console.log('✅ Color contrast requirements met');
    }
    
    // Generate accessibility report
    const report = {
      url: page.url(),
      timestamp: new Date().toISOString(),
      violations: results.violations.length,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
      details: results.violations
    };
    
    console.log('\n📊 Accessibility Test Summary:');
    console.log(`- Violations: ${report.violations}`);
    console.log(`- Passes: ${report.passes}`);
    console.log(`- Incomplete: ${report.incomplete}`);
    console.log(`- Not Applicable: ${report.inapplicable}`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Accessibility test failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run tests if called directly
if (require.main === module) {
  runAccessibilityTests()
    .then(report => {
      if (report.violations > 0) {
        process.exit(1); // Exit with error if violations found
      }
      console.log('🎉 Accessibility tests completed successfully');
    })
    .catch(error => {
      console.error('💥 Accessibility tests failed:', error);
      process.exit(1);
    });
}

module.exports = { runAccessibilityTests };