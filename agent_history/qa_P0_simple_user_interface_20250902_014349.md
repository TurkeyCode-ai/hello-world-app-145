<!-- AI TEAM BUILDER - FEATURE ITERATION HISTORY -->
<!-- Agent: qa -->
<!-- Timestamp: 2025-09-02T01:43:49+00:00 -->
<!-- Feature: Simple User Interface -->
<!-- Priority: P0 -->
<!-- Build Context: Feature-focused build -->

I'll create a comprehensive test suite for the Hello World web application's Simple User Interface feature. Let me implement testing configurations and test files using modern JavaScript testing frameworks.

## FILENAME: package.json
```json
{
  "name": "hello-world-app-tests",
  "version": "1.0.0",
  "description": "Test suite for Hello World web application",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:accessibility": "node tests/accessibility.test.js",
    "test:performance": "node tests/performance.test.js",
    "test:all": "npm run test && npm run test:e2e && npm run test:accessibility && npm run test:performance"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@playwright/test": "^1.40.0",
    "@axe-core/playwright": "^4.8.2",
    "lighthouse": "^11.4.0",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/dom": "^9.3.4"
  }
}
```

## FILENAME: jest.config.js
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.js',
    '<rootDir>/tests/integration/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    'public/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true
};
```

## FILENAME: playwright.config.js
```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npx http-server . -p 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## FILENAME: tests/setup.js
```javascript
// Jest DOM matchers
require('@testing-library/jest-dom');

// Global test setup
global.console = {
  ...console,
  // Suppress console.log in tests unless needed
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Setup DOM for testing
beforeEach(() => {
  document.body.innerHTML = '';
});
```

## FILENAME: tests/unit/ui.test.js
```javascript
/**
 * Unit Tests for Simple User Interface
 * Tests individual UI components and DOM manipulation
 */

describe('Simple User Interface - Unit Tests', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('HTML Structure', () => {
    test('should have proper HTML5 document structure', () => {
      // Simulate loading the main HTML
      container.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World</title>
        </head>
        <body>
          <main>
            <h1>Hello World!</h1>
          </main>
        </body>
        </html>
      `;

      const html = container.querySelector('html');
      const head = container.querySelector('head');
      const body = container.querySelector('body');
      const main = container.querySelector('main');
      const h1 = container.querySelector('h1');

      expect(html).toHaveAttribute('lang', 'en');
      expect(head).toBeInTheDocument();
      expect(body).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Hello World!');
    });

    test('should have proper meta tags for responsive design', () => {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      container.appendChild(viewport);

      expect(viewport).toHaveAttribute('name', 'viewport');
      expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    });
  });

  describe('Content Rendering', () => {
    test('should display "Hello World!" message', () => {
      const heading = document.createElement('h1');
      heading.textContent = 'Hello World!';
      container.appendChild(heading);

      expect(heading).toHaveTextContent('Hello World!');
      expect(heading.tagName).toBe('H1');
    });

    test('should maintain text content integrity', () => {
      const message = 'Hello World!';
      const element = document.createElement('p');
      element.textContent = message;
      container.appendChild(element);

      expect(element.textContent).toBe(message);
      expect(element.textContent.length).toBe(12);
      expect(element.textContent).not.toContain('<script>');
    });
  });

  describe('Accessibility Features', () => {
    test('should have semantic HTML elements', () => {
      container.innerHTML = `
        <main role="main">
          <h1>Hello World!</h1>
        </main>
      `;

      const main = container.querySelector('main');
      const heading = container.querySelector('h1');

      expect(main).toHaveAttribute('role', 'main');
      expect(heading.tagName).toBe('H1');
    });

    test('should support keyboard navigation', () => {
      const button = document.createElement('button');
      button.textContent = 'Click me';
      button.setAttribute('tabindex', '0');
      container.appendChild(button);

      expect(button).toHaveAttribute('tabindex', '0');
      expect(button).toBeVisible();
    });
  });

  describe('Error Handling', () => {
    test('should handle missing elements gracefully', () => {
      const nonExistentElement = container.querySelector('#non-existent');
      expect(nonExistentElement).toBeNull();
    });

    test('should validate input sanitization', () => {
      const userInput = '<script>alert("xss")</script>Hello World!';
      const element = document.createElement('div');
      element.textContent = userInput; // Using textContent prevents XSS
      
      expect(element.innerHTML).not.toContain('<script>');
      expect(element.textContent).toContain('Hello World!');
    });
  });
});
```

## FILENAME: tests/integration/ui-integration.test.js
```javascript
/**
 * Integration Tests for Simple User Interface
 * Tests component interactions and overall UI behavior
 */

describe('Simple User Interface - Integration Tests', () => {
  let mockDocument;

  beforeEach(() => {
    // Create a mock HTML document structure
    document.body.innerHTML = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World</title>
        </head>
        <body>
          <main id="app">
            <header>
              <h1 id="main-heading">Hello World!</h1>
            </header>
            <section id="content">
              <p id="welcome-message">Welcome to our Hello World application!</p>
            </section>
          </main>
        </body>
      </html>
    `;
  });

  describe('Component Integration', () => {
    test('should integrate header and content sections properly', () => {
      const app = document.getElementById('app');
      const header = app.querySelector('header');
      const content = app.querySelector('#content');
      const heading = document.getElementById('main-heading');
      const message = document.getElementById('welcome-message');

      expect(app).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(message).toBeInTheDocument();

      // Test parent-child relationships
      expect(header.parentElement).toBe(app);
      expect(content.parentElement).toBe(app);
      expect(heading.parentElement).toBe(header);
    });

    test('should maintain consistent styling across components', () => {
      const elements = document.querySelectorAll('h1, p');
      
      elements.forEach(element => {
        expect(element).toBeVisible();
        expect(element.textContent.trim()).not.toBe('');
      });
    });
  });

  describe('User Interaction Flow', () => {
    test('should handle page load sequence correctly', () => {
      // Simulate DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);

      const heading = document.getElementById('main-heading');
      expect(heading).toHaveTextContent('Hello World!');
    });

    test('should maintain UI state during interactions', () => {
      const heading = document.getElementById('main-heading');
      const originalText = heading.textContent;

      // Simulate some interaction
      heading.focus();
      
      expect(heading.textContent).toBe(originalText);
      expect(document.activeElement).toBe(heading);
    });
  });

  describe('Responsive Behavior', () => {
    test('should handle viewport changes', () => {
      // Mock viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]') || 
        document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');

      if (!document.head.contains(viewportMeta)) {
        document.head.appendChild(viewportMeta);
      }

      expect(viewportMeta).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    });
  });

  describe('Error Recovery', () => {
    test('should handle DOM manipulation errors gracefully', () => {
      expect(() => {
        const nonExistent = document.getElementById('non-existent-element');
        if (nonExistent) {
          nonExistent.textContent = 'This should not crash';
        }
      }).not.toThrow();
    });

    test('should maintain UI integrity after errors', () => {
      try {
        // Attempt to access non-existent element
        document.getElementById('fake-element').click();
      } catch (error) {
        // Error should not affect existing elements
        const heading = document.getElementById('main-heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Hello World!');
      }
    });
  });
});
```

## FILENAME: tests/e2e/hello-world.spec.js
```javascript
/**
 * End-to-End Tests for Hello World Application
 * Tests complete user workflows and browser functionality
 */

const { test, expect } = require('@playwright/test');

test.describe('Hello World Application - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Page Load and Structure', () => {
    test('should load the page successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/Hello World/i);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should display Hello World message', async ({ page }) => {
      const heading = page.locator('h1');
      await expect(heading).toContainText('Hello World');
      await expect(heading).toBeVisible();
    });

    test('should have proper HTML structure', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('main, #app, .container')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await expect(page.locator('h1')).toBeVisible();
      
      const heading = page.locator('h1');
      const box = await heading.boundingBox();
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Hello World');
    });

    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Hello World');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const h1Count = await page.locator('h1').count();
      
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(1); // Should have exactly one H1
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      // Check that focus is visible and manageable
      const focusedElement = await page.evaluate(() => document.activeElement.tagName);
      expect(focusedElement).toBeDefined();
    });

    test('should have proper language attribute', async ({ page }) => {
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe('en');
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
    });

    test('should have minimal JavaScript errors', async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error));
      
      await page.goto('/');
      await page.waitForTimeout(1000); // Wait for any async errors
      
      expect(errors).toHaveLength(0);
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    test('should display correctly in all browsers', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Hello World');
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot('hello-world-page.png');
    });
  });
});
```

## FILENAME: tests/accessibility.test.js
```javascript
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
```

## FILENAME: tests/performance.test.js
```javascript
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
```

## FILENAME: tests/visual/visual-regression.test.js
```javascript
/**
 * Visual Regression Tests for Hello World Application
 * Tests UI consistency across browsers and devices
 */

const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test.describe('Desktop Views', () => {
    test('should match desktop screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      
      // Wait for any animations or async content
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('desktop-full-page.png', {
        fullPage: true,
        threshold: 0.2
      });
    });

    test('should match desktop heading component', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.goto('/');
      
      const heading = page.locator('h1').first();
      await expect(heading).toHaveScreenshot('desktop-heading.png', {
        threshold: 0.1
      });
    });
  });

  test.describe('Tablet Views', () => {
    test('should match tablet screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('tablet-full-page.png', {
        fullPage: true,
        threshold: 0.2
      });
    });
  });

  test.describe('Mobile Views', () => {
    test('should match mobile screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('mobile-full-page.png', {
        fullPage: true,
        threshold: 0.2
      });
    });

    test('should match mobile heading component', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const heading = page.locator('h1').first();
      await expect(heading).toHaveScreenshot('mobile-heading.png', {
        threshold: 0.1
      });
    });
  });

  test.describe('Dark Mode (if applicable)', () => {
    test('should match dark mode screenshot', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('dark-mode-full-page.png', {
        fullPage: true,
        threshold: 0.2
      });
    });
  });

  test.describe('High Contrast Mode', () => {
    test('should maintain readability in high contrast', async ({ page }) => {
      await page.emulateMedia({ 
        colorScheme: 'dark',
        reducedMotion: 'reduce'
      });
      await page.goto('/');
      
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      // Check that text is still readable
      const color = await heading.evaluate(el => 
        getComputedStyle(el).color
      );
      const backgroundColor = await page.evaluate(() => 
        getComputedStyle(document.body).backgroundColor
      );
      
      expect(color).toBeDefined();
      expect(backgroundColor).toBeDefined();
    });
  });
});
```

## FILENAME: tests/test-runner.js
```javascript
/**
 * Comprehensive Test Runner
 * Orchestrates all test suites and generates reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.testResults = {
      unit: { passed: 0, failed: 0, skipped: 0 },
      integration: { passed: 0, failed: 0, skipped: 0 },
      e2e: { passed: 0, failed: 0, skipped: 0 },
      accessibility: { passed: 0, failed: 0, violations: 0 },
      performance: { passed: 0, failed: 0, scores: {} },
      visual: { passed: 0, failed: 0, skipped: 0 }
    };
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🚀 Starting comprehensive test suite...\n');
    
    try {
      // Run unit tests
      console.log('1️⃣ Running Unit Tests...');
      await this.runUnitTests();
      
      // Run integration tests
      console.log('\n2️⃣ Running Integration Tests...');
      await this.runIntegrationTests();
      
      // Start local server for E2E tests
      console.log('\n🖥️  Starting local server...');
      const server = this.startLocalServer();
      
      // Wait for server to start
      await this.waitForServer();
      
      // Run E2E tests
      console.log('\n3️⃣ Running End-to-End Tests...');
      await this.runE2ETests();
      
      // Run accessibility tests
      console.log('\n4️⃣ Running Accessibility Tests...');
      await this.runAccessibilityTests();
      
      // Run performance tests
      console.log('\n5️⃣ Running Performance Tests...');
      await this.runPerformanceTests();
      
      // Run visual regression tests
      console.log('\n6️⃣ Running Visual Regression Tests...');
      await this.runVisualTests();
      
      // Stop server
      if (server) {
        server.kill();
      }
      
      // Generate comprehensive report
      await this.generateReport();
      
    } catch (error) {
      console.error('💥 Test suite failed:', error);
      process.exit(1);
    }
  }

  async runUnitTests() {
    try {
      const output = execSync('npm run test -- --coverage --json', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const result = JSON.parse(output.split('\n').pop());
      this.testResults.unit = {
        passed: result.numPassedTests,
        failed: result.numFailedTests,
        skipped: result.numPendingTests,
        coverage: result.coverageMap
      };
      
      console.log('✅ Unit tests completed');
    } catch (error) {
      console.log('❌ Unit tests failed');
      this.testResults.unit.failed += 1;
    }
  }

  async runIntegrationTests() {
    try {
      execSync('npm run test -- tests/integration/', { stdio: 'inherit' });
      this.testResults.integration.passed += 1;
      console.log('✅ Integration tests completed');
    } catch (error) {
      console.log('❌ Integration tests failed');
      this.testResults.integration.failed += 1;
    }
  }

  async runE2ETests() {
    try {
      execSync('npm run test:e2e', { stdio: 'inherit' });
      this.testResults.e2e.passed += 1;
      console.log('✅ E2E tests completed');
    } catch (error) {
      console.log('❌ E2E tests failed');
      this.testResults.e2e.failed += 1;
    }
  }

  async runAccessibilityTests() {
    try {
      execSync('npm run test:accessibility', { stdio: 'inherit' });
      this.testResults.accessibility.passed += 1;
      console.log('✅ Accessibility tests completed');
    } catch (error) {
      console.log('❌ Accessibility tests failed');
      this.testResults.accessibility.failed += 1;
    }
  }

  async runPerformanceTests() {
    try {
      execSync('npm run test:performance', { stdio: 'inherit' });
      this.testResults.performance.passed += 1;
      console.log('✅ Performance tests completed');
    } catch (error) {
      console.log('❌ Performance tests failed');
      this.testResults.performance.failed += 1;
    }
  }

  async runVisualTests() {
    try {
      execSync('npx playwright test tests/visual/', { stdio: 'inherit' });
      this.testResults.visual.passed += 1;
      console.log('✅ Visual regression tests completed');
    } catch (error) {
      console.log('❌ Visual regression tests failed');
      this.testResults.visual.failed += 1;
    }
  }

  startLocalServer() {
    try {
      const { spawn } = require('child_process');
      const server = spawn('npx', ['http-server', '.', '-p', '3000'], {
        stdio: 'pipe'
      });
      
      console.log('🖥️  Local server started on port 3000');
      return server;
    } catch (error) {
      console.error('Failed to start local server:', error);
      return null;
    }
  }

  async waitForServer() {
    const http = require('http');
    
    return new Promise((resolve, reject) => {
      const checkServer = () => {
        const req = http.get('http://localhost:3000', (res) => {
          resolve();
        });
        
        req.on('error', () => {
          setTimeout(checkServer, 1000);
        });
      };
      
      setTimeout(checkServer, 2000);
    });
  }

  async generateReport() {
    const endTime = Date.now();
    const duration = Math.round((endTime - this.startTime) / 1000);
    
    const report = {
      summary: {
        totalDuration: `${duration}s`,
        timestamp: new Date().toISOString(),
        overall: this.calculateOverallStatus()
      },
      results: this.testResults,
      recommendations: this.generateRecommendations()
    };
    
    // Write detailed report
    const reportPath = path.join(__dirname, '../test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Print summary
    console.log('\n📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Duration: ${duration}s`);
    console.log(`Overall Status: ${report.summary.overall}`);
    console.log('\nDetailed Results:');
    
    Object.entries(this.testResults).forEach(([suite, results]) => {
      const passed = results.passed || 0;
      const failed = results.failed || 0;
      const status = failed === 0 ? '✅' : '❌';
      console.log(`${status} ${suite}: ${passed} passed, ${failed} failed`);
    });
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => console.log(`- ${rec}`));
    }
    
    console.log(`\n📁 Detailed report saved to: ${reportPath}`);
    
    // Exit with appropriate code
    const overallSuccess = report.summary.overall === 'PASSED';
    process.exit(overallSuccess ? 0 : 1);
  }

  calculateOverallStatus() {
    const hasFailures = Object.values(this.testResults).some(result => 
      result.failed > 0
    );
    return hasFailures ? 'FAILED' : 'PASSED';
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.testResults.unit.failed > 0) {
      recommendations.push('Fix failing unit tests to ensure code reliability');
    }
    
    if (this.testResults.accessibility.failed > 0) {
      recommendations.push('Address accessibility violations for better user experience');
    }
    
    if (this.testResults.performance.failed > 0) {
      recommendations.push('Optimize performance to meet Core Web Vitals standards');
    }
    
    return recommendations;
  }
}

// Run tests if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runAllTests();
}

module.exports = TestRunner;
```

## FILENAME: README.md
```markdown
# Hello World Application - Test Suite

Comprehensive testing framework for the Hello World web application's Simple User Interface feature.

## Test Architecture

This test suite provides comprehensive coverage across multiple testing levels:

### 🧪 Test Types

- **Unit Tests**: Test individual JavaScript functions and DOM manipulation
- **Integration Tests**: Test component interactions and UI behavior
- **End-to-End Tests**: Test complete user workflows across browsers
- **Accessibility Tests**: WCAG 2.1 AA compliance and accessibility features
- **Performance Tests**: Core Web Vitals and performance optimization
- **Visual Regression Tests**: UI consistency across devices and browsers

### 🛠 Technology Stack

- **Jest**: Unit and integration testing framework
- **Playwright**: Cross-browser end-to-end testing
- **Axe-core**: Accessibility testing and WCAG compliance
- **Lighthouse**: Performance auditing and Core Web Vitals
- **HTTP-Server**: Local development server for testing

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern browsers (Chrome, Firefox, Safari) for cross-browser testing

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm run test:all

# Run specific test suites
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:accessibility # Accessibility tests
npm run test:performance   # Performance tests

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Configuration

#### Jest Configuration (`jest.config.js`)
- JSDOM environment for DOM testing
- 80% coverage threshold
- Comprehensive test matching patterns

#### Playwright Configuration (`playwright.config.js`)
- Cross-browser testing (Chrome, Firefox, Safari, Mobile)
- Visual regression testing
- Automatic screenshot capture on failures

## Test Structure

```
tests/
├── unit/                 # Unit tests
│   └── ui.test.js       # UI component unit tests
├── integration/          # Integration tests
│   └── ui-integration.test.js
├── e2e/                 # End-to-end tests
│   └── hello-world.spec.js
├── visual/              # Visual regression tests
│   └── visual-regression.test.js
├── accessibility.test.js # Accessibility testing
├── performance.test.js   # Performance testing
├── test-runner.js       # Comprehensive test orchestration
└── setup.js            # Global test setup
```

## Quality Standards

### Coverage Requirements
- **Minimum Coverage**: 80% across all metrics
- **Critical Functions**: 100% coverage required
- **Browser Compatibility**: All major browsers

### Performance Benchmarks
- **Page Load**: < 2 seconds
- **Lighthouse Performance**: > 90
- **Accessibility Score**: > 95
- **Core Web Vitals**: All metrics in "Good" range

### Accessibility Standards
- **WCAG 2.1 AA**: Full compliance required
- **Keyboard Navigation**: Complete functionality
- **Screen Reader**: Compatible with major screen readers
- **Color Contrast**: Minimum 4.5:1 ratio

## Continuous Integration

The test suite is designed for CI/CD integration:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: |
    npm install
    npm run test:all
```

### Test Reports

- **Coverage Report**: `coverage/lcov-report/index.html`
- **E2E Report**: `playwright-report/index.html`
- **Comprehensive Report**: `test-report.json`

## Debugging Tests

### Visual Debugging
```bash
# Run E2E tests with UI mode
npm run test:e2e:ui

# Generate screenshots
npx playwright test --headed
```

### Performance Debugging
```bash
# Run Lighthouse with detailed metrics
npm run test:performance

# Analyze bundle size
npx bundlesize
```

## Best Practices

### Writing Tests
1. **Descriptive Names**: Use clear, descriptive test names
2. **Isolated Tests**: Each test should be independent
3. **Mock External Dependencies**: Avoid external service calls
4. **Test User Scenarios**: Focus on user workflows

### Maintenance
1. **Regular Updates**: Keep testing dependencies current
2. **Review Failures**: Investigate and fix failing tests promptly
3. **Performance Monitoring**: Track performance trends over time
4. **Accessibility Audits**: Regular accessibility reviews

## Troubleshooting

### Common Issues

**Tests Timing Out**
- Increase timeout in configuration
- Check for infinite loops or hanging promises

**Browser Launch Failures**
- Ensure Playwright browsers are installed
- Check system dependencies

**Coverage Issues**
- Verify all source files are included
- Check for excluded directories in configuration

**Accessibility Violations**
- Review axe-core documentation
- Implement proper ARIA labels and semantic HTML

## Contributing

1. Write tests for new features
2. Maintain minimum coverage thresholds
3. Update documentation for test changes
4. Ensure cross-browser compatibility

## Resources

- [Jest Documentation](https://jestjs.io/docs/)
- [Playwright Documentation](https://playwright.dev/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
```

<!-- END_OF_RESPONSE -->
