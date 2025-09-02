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