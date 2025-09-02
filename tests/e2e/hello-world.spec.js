/**
 * End-to-End Tests for Hello World Application
 * Tests complete user scenarios in real browser environments
 */

const { test, expect } = require('@playwright/test');

test.describe('Hello World Application E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Page Load and Structure', () => {
    test('should load page and display Hello World text', async ({ page }) => {
      // Wait for the page to load
      await page.waitForLoadState('networkidle');
      
      // Check that Hello World text is visible
      const helloText = page.locator('h1:has-text("Hello World")');
      await expect(helloText).toBeVisible();
      await expect(helloText).toHaveText('Hello World');
    });

    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Hello World/);
    });

    test('should display Hello World in correct HTML structure', async ({ page }) => {
      // Check for proper semantic structure
      const h1Element = page.locator('h1#hello-text');
      await expect(h1Element).toBeVisible();
      await expect(h1Element).toHaveText('Hello World');
      
      // Verify it's inside the app container
      const appContainer = page.locator('#app');
      await expect(appContainer).toBeVisible();
      await expect(appContainer.locator('h1')).toHaveText('Hello World');
    });

    test('should have proper HTML structure', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('main, #app, .container')).toBeVisible();
    });

    test('should display Hello World message with generic selector', async ({ page }) => {
      // Alternative test approach from new functionality - using more generic selectors
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Hello World');
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile devices', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      const helloText = page.locator('h1:has-text("Hello World")');
      await expect(helloText).toBeVisible();
      await expect(helloText).toContainText('Hello World');
      
      // Ensure text is not cut off
      const boundingBox = await helloText.boundingBox();
      expect(boundingBox.width).toBeLessThanOrEqual(375);
    });

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

    test('should be responsive with content overflow check', async ({ page }) => {
      // Enhanced mobile test from new functionality
      await page.setViewportSize({ width: 375, height: 667 });
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      // Check if content is not overflowing
      const boundingBox = await heading.boundingBox();
      expect(boundingBox.width).toBeLessThanOrEqual(375);
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

    test('should be accessible via keyboard navigation with focus visibility', async ({ page }) => {
      // Enhanced keyboard navigation test from new functionality
      await page.keyboard.press('Tab');
      
      // Check if focusable elements are properly focused
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should have proper language attribute', async ({ page }) => {
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe('en');
    });
  });

  test.describe('Performance and Error Handling', () => {
    test('should load without JavaScript errors', async ({ page }) => {
      const consoleErrors = [];
      page.on('console', message => {
        if (message.type() === 'error') {
          consoleErrors.push(message.text());
        }
      });

      await page.waitForLoadState('networkidle');
      
      expect(consoleErrors).toHaveLength(0);
    });

    test('should load without console errors on reload', async ({ page }) => {
      // Additional console error test from new functionality with page reload
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.reload();
      expect(consoleErrors).toHaveLength(0);
    });

    test('should load quickly (performance check)', async ({ page }) => {
      const startTime = Date.now();
      
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    });

    test('should load quickly with content-based timing', async ({ page }) => {
      // Alternative performance test from new functionality
      const startTime = Date.now();
      await page.goto('/');
      
      // Wait for the main content to be visible
      await page.locator('h1').waitFor();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    });

    test('should have minimal JavaScript errors', async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error));
      
      await page.waitForTimeout(1000); // Wait for any async errors
      
      expect(errors).toHaveLength(0);
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    test('should work across different browsers', async ({ page, browserName }) => {
      const helloText = page.locator('h1:has-text("Hello World")');
      await expect(helloText).toBeVisible();
      await expect(helloText).toHaveText('Hello World');
      
      // Browser-specific checks could be added here
      console.log(`Test passed in ${browserName}`);
    });

    test('should display correctly in all browsers', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Hello World');
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot('hello-world-page.png');
    });
  });

  test.describe('User Interactions', () => {
    test('should maintain Hello World text after page interactions', async ({ page }) => {
      const helloText = page.locator('h1:has-text("Hello World")');
      await expect(helloText).toBeVisible();
      
      // Simulate some user interactions
      await page.click('body');
      await page.keyboard.press('Tab');
      await page.mouse.move(100, 100);
      
      // Text should still be there
      await expect(helloText).toBeVisible();
      await expect(helloText).toHaveText('Hello World');
    });
  });
});
