/**
 * Performance Audit Script
 * Tests Core Web Vitals and performance metrics using Lighthouse
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runPerformanceAudit() {
  console.log('🚀 Starting performance audit...');
  
  let chrome;
  
  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });
    
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };
    
    // Run Lighthouse audit
    const runnerResult = await lighthouse('http://localhost:8080', options);
    
    if (!runnerResult) {
      throw new Error('Lighthouse failed to return results');
    }
    
    const { lhr } = runnerResult;
    
    // Extract key metrics
    const metrics = {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      bestPractices: lhr.categories['best-practices'].score * 100,
      seo: lhr.categories.seo.score * 100,
      firstContentfulPaint: lhr.audits['first-contentful-paint'].displayValue,
      largestContentfulPaint: lhr.audits['largest-contentful-paint'].displayValue,
      cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].displayValue,
      totalBlockingTime: lhr.audits['total-blocking-time'].displayValue
    };
    
    console.log('\n📊 PERFORMANCE RESULTS:');
    console.log(`Performance Score: ${metrics.performance}%`);
    console.log(`Accessibility Score: ${metrics.accessibility}%`);
    console.log(`Best Practices Score: ${metrics.bestPractices}%`);
    console.log(`SEO Score: ${metrics.seo}%`);
    
    console.log('\n⚡ CORE WEB VITALS:');
    console.log(`First Contentful Paint: ${metrics.firstContentfulPaint}`);
    console.log(`Largest Contentful Paint: ${metrics.largestContentfulPaint}`);
    console.log(`Cumulative Layout Shift: ${metrics.cumulativeLayoutShift}`);
    console.log(`Total Blocking Time: ${metrics.totalBlockingTime}`);
    
    // Check if performance meets thresholds
    const performanceThreshold = 90;
    const accessibilityThreshold = 95;
    
    if (metrics.performance < performanceThreshold) {
      console.log(`\n❌ Performance score (${metrics.performance}%) is below threshold (${performanceThreshold}%)`);
      process.exit(1);
    }
    
    if (metrics.accessibility < accessibilityThreshold) {
      console.log(`\n❌ Accessibility score (${metrics.accessibility}%) is below threshold (${accessibilityThreshold}%)`);
      process.exit(1);
    }
    
    console.log('\n🎉 All performance thresholds met!');
    
  } catch (error) {
    console.error('Error running performance audit:', error);
    process.exit(1);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Run the audit if this script is executed directly
if (require.main === module) {
  runPerformanceAudit();
}

module.exports = { runPerformanceAudit };