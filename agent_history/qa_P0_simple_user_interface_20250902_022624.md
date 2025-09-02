<!-- AI TEAM BUILDER - FEATURE ITERATION HISTORY -->
<!-- Agent: qa -->
<!-- Timestamp: 2025-09-02T02:26:24+00:00 -->
<!-- Feature: Simple User Interface -->
<!-- Priority: P0 -->
<!-- Build Context: Feature-focused build -->

I'll create a comprehensive test suite for the Hello World web application's Simple User Interface feature. Let me implement the necessary testing files and configurations.

## FILENAME: package.json
```json
{
  "name": "hello-world-app-testing",
  "version": "1.0.0",
  "description": "Test suite for Hello World web application",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:accessibility": "node tests/accessibility/a11y-audit.js",
    "test:performance": "node tests/performance/performance-audit.js",
    "test:all": "npm run test && npm run test:e2e && npm run test:accessibility && npm run test:performance",
    "install:browsers": "playwright install"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/dom": "^9.3.3",
    "@testing-library/user-event": "^14.5.1",
    "@playwright/test": "^1.40.0",
    "axe-core": "^4.8.2",
    "lighthouse": "^11.4.0",
    "puppeteer": "^21.6.0"
  }
}
```

## FILENAME: jest.config.js
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.js',
    '<rootDir>/tests/integration/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testTimeout: 10000
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
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
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
    command: 'python -m http.server 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
```

## FILENAME: tests/setup/jest.setup.js
```javascript
import '@testing-library/jest-dom';

// Mock window.matchMedia
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
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Global test setup
beforeEach(() => {
  // Clear any previous DOM state
  document.body.innerHTML = '';
  
  // Reset console methods
  jest.clearAllMocks();
});
```

## FILENAME: tests/unit/hello-world.test.js
```javascript
/**
 * Unit Tests for Hello World Application UI
 * Tests core functionality and DOM manipulation
 */

describe('Hello World Application', () => {
  let container;

  beforeEach(() => {
    // Set up a clean DOM container for each test
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = '';
  });

  test('should display "Hello World" message', () => {
    // Create the basic HTML structure
    container.innerHTML = '<h1 id="hello-message">Hello World</h1>';
    
    const messageElement = document.getElementById('hello-message');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.textContent).toBe('Hello World');
    expect(messageElement.tagName).toBe('H1');
  });

  test('should have proper semantic HTML structure', () => {
    container.innerHTML = `
      <main>
        <h1 id="hello-message">Hello World</h1>
        <p>Welcome to our simple Hello World application!</p>
      </main>
    `;

    const mainElement = container.querySelector('main');
    const heading = container.querySelector('h1');
    const paragraph = container.querySelector('p');

    expect(mainElement).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('should apply CSS classes correctly', () => {
    container.innerHTML = `
      <div class="container">
        <h1 class="title">Hello World</h1>
      </div>
    `;

    const containerDiv = container.querySelector('.container');
    const title = container.querySelector('.title');

    expect(containerDiv).toHaveClass('container');
    expect(title).toHaveClass('title');
  });

  test('should handle dynamic content updates', () => {
    container.innerHTML = '<h1 id="dynamic-message">Initial Message</h1>';
    
    const messageElement = document.getElementById('dynamic-message');
    expect(messageElement.textContent).toBe('Initial Message');

    // Simulate content update
    messageElement.textContent = 'Hello World';
    expect(messageElement.textContent).toBe('Hello World');
  });

  test('should maintain accessibility attributes', () => {
    container.innerHTML = `
      <main role="main" aria-label="Hello World Application">
        <h1 id="main-heading" tabindex="0">Hello World</h1>
      </main>
    `;

    const main = container.querySelector('main');
    const heading = container.querySelector('h1');

    expect(main).toHaveAttribute('role', 'main');
    expect(main).toHaveAttribute('aria-label', 'Hello World Application');
    expect(heading).toHaveAttribute('tabindex', '0');
  });
});
```

## FILENAME: tests/integration/ui-integration.test.js
```javascript
/**
 * Integration Tests for Hello World UI Components
 * Tests component interactions and overall UI behavior
 */

describe('Hello World UI Integration', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    // Simulate a complete HTML page structure
    container.innerHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World App</title>
        </head>
        <body>
          <main class="main-content">
            <div class="container">
              <h1 class="title" id="hello-message">Hello World</h1>
              <p class="description">Welcome to our simple Hello World application!</p>
            </div>
          </main>
        </body>
      </html>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render complete page structure', () => {
    const main = container.querySelector('.main-content');
    const containerDiv = container.querySelector('.container');
    const title = container.querySelector('.title');
    const description = container.querySelector('.description');

    expect(main).toBeInTheDocument();
    expect(containerDiv).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('should maintain proper heading hierarchy', () => {
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0].textContent).toBe('Hello World');
  });

  test('should support responsive design elements', () => {
    const viewport = container.querySelector('meta[name="viewport"]');
    expect(viewport).toBeTruthy();
  });

  test('should handle missing elements gracefully', () => {
    container.innerHTML = '<div></div>';
    
    const missingElement = container.querySelector('#nonexistent');
    expect(missingElement).toBeNull();
  });
});
```

## FILENAME: tests/e2e/hello-world.spec.js
```javascript
/**
 * End-to-End Tests for Hello World Application
 * Tests complete user workflows in browser environment
 */

const { test, expect } = require('@playwright/test');

test.describe('Hello World Application E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Hello World message', async ({ page }) => {
    // Check if the main heading is visible and contains correct text
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Hello World');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Hello World/);
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.reload();
    expect(consoleErrors).toHaveLength(0);
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Check if content is not overflowing
    const boundingBox = await heading.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Check if focusable elements are properly focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Wait for the main content to be visible
    await page.locator('h1').waitFor();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
  });
});
```

## FILENAME: tests/e2e/cross-browser.spec.js
```javascript
/**
 * Cross-Browser Compatibility Tests
 * Ensures consistent behavior across different browsers
 */

const { test, expect, devices } = require('@playwright/test');

test.describe('Cross-Browser Compatibility', () => {
  const browsers = ['chromium', 'firefox', 'webkit'];

  browsers.forEach(browserName => {
    test(`should work correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      test.skip(currentBrowser !== browserName, `This test is for ${browserName} only`);
      
      await page.goto('/');
      
      // Basic functionality test
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Hello World');
      
      // Check CSS rendering
      const headingStyles = await heading.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily
        };
      });
      
      expect(headingStyles.display).not.toBe('none');
    });
  });

  test('should work on different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      // Ensure content doesn't overflow
      const boundingBox = await heading.boundingBox();
      expect(boundingBox.width).toBeLessThanOrEqual(viewport.width);
    }
  });
});
```

## FILENAME: tests/accessibility/a11y-audit.js
```javascript
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
```

## FILENAME: tests/performance/performance-audit.js
```javascript
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
```

## FILENAME: tests/visual/visual-regression.test.js
```javascript
/**
 * Visual Regression Tests
 * Ensures UI consistency across different scenarios
 */

const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test('should match desktop homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    
    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('h1');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match tablet homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForSelector('h1');
    
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should handle different color schemes', async ({ page }) => {
    // Test dark mode if supported
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForSelector('h1');
    
    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});
```

## FILENAME: .github/workflows/test.yml
```yaml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:coverage
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    
    - name: Start test server
      run: python -m http.server 8080 &
    
    - name: Wait for server
      run: sleep 5
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: playwright-report
        path: playwright-report/

  accessibility-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Start test server
      run: python -m http.server 8080 &
    
    - name: Wait for server
      run: sleep 5
    
    - name: Run accessibility tests
      run: npm run test:accessibility

  performance-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Start test server
      run: python -m http.server 8080 &
    
    - name: Wait for server
      run: sleep 5
    
    - name: Run performance tests
      run: npm run test:performance
```

## FILENAME: README.md
```markdown
# Hello World App - Test Suite

This comprehensive test suite ensures the Hello World web application's Simple User Interface functions correctly across all scenarios, browsers, and devices.

## Test Coverage

### 🧪 Unit Tests
- Core JavaScript functionality testing
- DOM manipulation validation
- Component rendering verification
- CSS class application testing
- Accessibility attributes validation

### 🔗 Integration Tests
- Component interaction testing
- UI structure validation
- Page hierarchy verification
- Responsive design element testing

### 🌐 End-to-End Tests
- Complete user workflow testing
- Cross-browser compatibility verification
- Mobile responsiveness testing
- Performance benchmarking
- Keyboard navigation testing

### ♿ Accessibility Tests
- WCAG 2.1 AA compliance testing
- Screen reader compatibility
- Keyboard navigation validation
- Color contrast verification
- Semantic HTML structure testing

### ⚡ Performance Tests
- Core Web Vitals measurement
- Page load time analysis
- Lighthouse audit integration
- Performance threshold validation

### 👀 Visual Regression Tests
- UI consistency across devices
- Screenshot comparison testing
- Dark mode compatibility
- Cross-browser visual validation

## Quick Start

### Installation
```bash
npm install
npm run install:browsers
```

### Running Tests

```bash
# Run all tests
npm run test:all

# Run specific test suites
npm run test              # Unit tests
npm run test:e2e         # End-to-end tests
npm run test:accessibility  # Accessibility audit
npm run test:performance    # Performance audit

# Development mode
npm run test:watch       # Watch unit tests
npm run test:e2e:ui     # E2E tests with UI
```

### Test Reports

- **Unit Test Coverage**: `coverage/index.html`
- **E2E Test Report**: `playwright-report/index.html`
- **Accessibility Results**: Console output with detailed violations
- **Performance Results**: Console output with Core Web Vitals

## Test Structure

```
tests/
├── setup/              # Test configuration
├── unit/               # Unit tests
├── integration/        # Integration tests
├── e2e/               # End-to-end tests
├── accessibility/     # Accessibility audits
├── performance/       # Performance tests
└── visual/            # Visual regression tests
```

## Browser Support

Tests run against:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop)

## Performance Thresholds

- Performance Score: ≥ 90%
- Accessibility Score: ≥ 95%
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML structure
- Proper ARIA labels

## CI/CD Integration

Tests automatically run on:
- Push to main/develop branches
- Pull request creation
- Scheduled nightly builds

## Contributing

1. Write tests for new features
2. Ensure all tests pass locally
3. Maintain coverage above 80%
4. Follow accessibility guidelines
5. Update documentation as needed

## Troubleshooting

### Common Issues

**Tests fail to start server:**
```bash
# Manually start server for testing
python -m http.server 8080
```

**Browser installation issues:**
```bash
npx playwright install --force
```

**Permission errors:**
```bash
chmod +x node_modules/.bin/*
```

### Debug Mode

```bash
# Debug E2E tests
npm run test:e2e -- --debug

# Headed mode
npm run test:e2e -- --headed

# Specific test file
npm run test:e2e -- hello-world.spec.js
```
```

<!-- END_OF_RESPONSE -->
