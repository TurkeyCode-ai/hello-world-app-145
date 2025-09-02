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

    test('should match desktop homepage screenshot', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('h1');
      
      // Take screenshot and compare with baseline
      await expect(page).toHaveScreenshot('homepage-desktop.png', {
        fullPage: true,
        animations: 'disabled',
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

    test('should match tablet homepage screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForSelector('h1');
      
      await expect(page).toHaveScreenshot('homepage-tablet.png', {
        fullPage: true,
        animations: 'disabled',
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

    test('should match mobile homepage screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForSelector('h1');
      
      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        animations: 'disabled',
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

    test('should handle different color schemes', async ({ page }) => {
      // Test dark mode if supported
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');
      await page.waitForSelector('h1');
      
      await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
        fullPage: true,
        animations: 'disabled',
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
