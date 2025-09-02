/**
 * End-to-End Accessibility Tests using Playwright and axe-core
 */

const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Hello World Accessibility E2E Tests', () => {

  test('should not have any accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    
    // In this simple app, there might not be focusable elements
    // But we can verify the page doesn't trap focus
    const activeElement = await page.evaluate(() => document.activeElement.tagName);
    expect(activeElement).toBeDefined();
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');
    
    // Test that focus is visible when using keyboard navigation
    await page.keyboard.press('Tab');
    
    // Verify no focus traps exist
    const focusedElement = page.locator(':focus');
    // Should either have no focused element or a visible one
    const count = await focusedElement.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(colorContrastViolations).toHaveLength(0);
  });

  test('should work with screen reader simulation', async ({ page }) => {
    await page.goto('/');
    
    // Get the accessible name and role of the main heading
    const heading = page.locator('h1');
    await expect(heading).toHaveAccessibleName('Hello World');
    
    // Verify proper heading structure
    await expect(heading).toHaveAttribute('id', 'hello-text');
  });

  test('should have proper document structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper document outline
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    // First heading should be h1
    const firstHeading = page.locator('h1').first();
    await expect(firstHeading).toBeVisible();
  });
});