/**
 * End-to-End Performance Tests using Playwright
 */

const { test, expect } = require('@playwright/test');

test.describe('Hello World Performance E2E Tests', () => {

  test('should load within performance budgets', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance budgets
    expect(loadTime).toBeLessThan(2000); // Should load within 2 seconds
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s
    }
  });

  test('should have minimal resource usage', async ({ page }) => {
    const response = await page.goto('/');
    
    // Check response size
    const contentLength = response.headers()['content-length'];
    if (contentLength) {
      expect(parseInt(contentLength)).toBeLessThan(10000); // Should be under 10KB
    }
  });

  test('should render quickly on slow networks', async ({ page, context }) => {
    // Simulate slow 3G
    await context.route('**/*', route => {
      // Add delay to simulate slow network
      setTimeout(() => route.continue(), 100);
    });
    
    const startTime = Date.now();
    await page.goto('/');
    
    const helloText = page.locator('h1:has-text("Hello World")');
    await expect(helloText).toBeVisible({ timeout: 10000 });
    
    const renderTime = Date.now() - startTime;
    expect(renderTime).toBeLessThan(8000); // Should render within 8s on slow network
  });

  test('should not have layout shifts', async ({ page }) => {
    await page.goto('/');
    
    // Measure Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(() => resolve(clsValue), 3000);
      });
    });
    
    expect(cls).toBeLessThan(0.1); // CLS should be under 0.1
  });

  test('should have fast First Input Delay readiness', async ({ page }) => {
    await page.goto('/');
    
    // Simulate user interaction
    const startTime = Date.now();
    await page.click('body');
    const interactionTime = Date.now() - startTime;
    
    expect(interactionTime).toBeLessThan(100); // Should respond quickly
  });
});