/**
 * Performance Tests for Hello World Application
 * Tests Core Web Vitals and performance metrics
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runPerformanceTests() {
  console.log('⚡ Running Performance Tests...');
  
  let chrome;
  
  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });
    
    // Run Lighthouse audit
    console.log('🔍 Running Lighthouse audit...');
    const result = await lighthouse('http://localhost:3000', {
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      settings: {
        formFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        }
      }
    });
    
    const lhr = result.lhr;
    const scores = {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100)
    };
    
    console.log('\n📊 Lighthouse Scores:');
    console.log(`- Performance: ${scores.performance}/100`);
    console.log(`- Accessibility: ${scores.accessibility}/100`);
    console.log(`- Best Practices: ${scores.bestPractices}/100`);
    console.log(`- SEO: ${scores.seo}/100`);
    
    // Core Web Vitals
    const audits = lhr.audits;
    const coreWebVitals = {
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      fid: audits['max-potential-fid']?.displayValue || 'N/A',
      speed: audits['speed-index']?.displayValue || 'N/A'
    };
    
    console.log('\n⚡ Core Web Vitals:');
    console.log(`- First Contentful Paint: ${coreWebVitals.fcp}`);
    console.log(`- Largest Contentful Paint: ${coreWebVitals.lcp}`);
    console.log(`- Cumulative Layout Shift: ${coreWebVitals.cls}`);
    console.log(`- First Input Delay: ${coreWebVitals.fid}`);
    console.log(`- Speed Index: ${coreWebVitals.speed}`);
    
    // Performance assertions
    const performanceThresholds = {
      performance: 90,
      accessibility: 95,
      bestPractices: 90,
      seo: 90
    };
    
    const failedThresholds = [];
    Object.keys(performanceThresholds).forEach(category => {
      if (scores[category] < performanceThresholds[category]) {
        failedThresholds.push(`${category}: ${scores[category]} < ${performanceThresholds[category]}`);
      }
    });
    
    if (failedThresholds.length > 0) {
      console.log('\n❌ Performance thresholds not met:');
      failedThresholds.forEach(failure => console.log(`- ${failure}`));
      return false;
    }
    
    console.log('\n✅ All performance thresholds met');
    
    // Additional performance metrics
    const metrics = {
      totalByteWeight: audits['total-byte-weight']?.displayValue || 'N/A',
      unusedCssRules: audits['unused-css-rules']?.displayValue || 'N/A',
      unusedJavaScript: audits['unused-javascript']?.displayValue || 'N/A',
      renderBlockingResources: audits['render-blocking-resources']?.displayValue || 'N/A'
    };
    
    console.log('\n📈 Additional Metrics:');
    console.log(`- Total Byte Weight: ${metrics.totalByteWeight}`);
    console.log(`- Unused CSS: ${metrics.unusedCssRules}`);
    console.log(`- Unused JavaScript: ${metrics.unusedJavaScript}`);
    console.log(`- Render Blocking Resources: ${metrics.renderBlockingResources}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Performance test failed:', error);
    return false;
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Custom performance metrics test
async function runCustomPerformanceTests() {
  console.log('🔍 Running custom performance tests...');
  
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Measure page load time
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    console.log(`⏱️  Page load time: ${loadTime}ms`);
    
    // Measure resource loading
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource');
      return entries.map(entry => ({
        name: entry.name,
        duration: Math.round(entry.duration),
        size: entry.transferSize || 0
      }));
    });
    
    console.log('\n📦 Resource Loading:');
    resources.forEach(resource => {
      console.log(`- ${resource.name}: ${resource.duration}ms (${resource.size} bytes)`);
    });
    
    // Memory usage
    const memoryInfo = await page.evaluate(() => {
      return performance.memory ? {
        usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      } : null;
    });
    
    if (memoryInfo) {
      console.log('\n🧠 Memory Usage:');
      console.log(`- Used JS Heap: ${memoryInfo.usedJSHeapSize}MB`);
      console.log(`- Total JS Heap: ${memoryInfo.totalJSHeapSize}MB`);
      console.log(`- JS Heap Limit: ${memoryInfo.jsHeapSizeLimit}MB`);
    }
    
    return loadTime < 2000; // Should load in under 2 seconds
    
  } finally {
    await browser.close();
  }
}

// Run tests if called directly
if (require.main === module) {
  Promise.all([
    runPerformanceTests(),
    runCustomPerformanceTests()
  ])
    .then(([lighthouseResults, customResults]) => {
      if (lighthouseResults && customResults) {
        console.log('\n🎉 All performance tests passed');
        process.exit(0);
      } else {
        console.log('\n❌ Some performance tests failed');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('💥 Performance tests failed:', error);
      process.exit(1);
    });
}

module.exports = { runPerformanceTests, runCustomPerformanceTests };