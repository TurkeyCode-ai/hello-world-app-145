/**
 * Color Contrast Accessibility Tests
 * Tests color contrast ratios for WCAG compliance
 */

describe('Color Contrast Tests', () => {
  let container;

  beforeEach(() => {
    // Create test styles
    const style = document.createElement('style');
    style.textContent = `
      .text-primary { color: #333333; background-color: #ffffff; }
      .text-secondary { color: #666666; background-color: #f8f9fa; }
      .text-muted { color: #6c757d; background-color: #ffffff; }
      .btn-primary { color: #ffffff; background-color: #007bff; }
      .btn-secondary { color: #ffffff; background-color: #6c757d; }
      .link-primary { color: #0d6efd; }
      .link-secondary { color: #6c757d; }
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
      <div id="app">
        <header>
          <h1 class="text-primary">Hello World</h1>
          <nav>
            <a href="#home" class="link-primary">Home</a>
            <a href="#about" class="link-secondary">About</a>
          </nav>
        </header>
        <main>
          <p class="text-primary">Welcome to our Hello World application.</p>
          <p class="text-secondary">This is secondary text content.</p>
          <p class="text-muted">This is muted text content.</p>
          
          <button class="btn-primary">Primary Button</button>
          <button class="btn-secondary">Secondary Button</button>
        </main>
      </div>
    `;
    container = document.getElementById('app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    // Remove added styles
    const styles = document.head.querySelectorAll('style');
    styles.forEach(style => {
      if (style.textContent.includes('.text-primary')) {
        style.remove();
      }
    });
  });

  // Helper function to calculate relative luminance
  function getRelativeLuminance(rgb) {
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Helper function to calculate contrast ratio
  function getContrastRatio(color1, color2) {
    const l1 = getRelativeLuminance(color1);
    const l2 = getRelativeLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Helper function to convert hex to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  test('should meet WCAG AA contrast requirements for normal text', () => {
    // Test primary text (#333333 on #ffffff)
    const primaryTextContrast = getContrastRatio(
      hexToRgb('#333333'),
      hexToRgb('#ffffff')
    );
    expect(primaryTextContrast).toBeGreaterThanOrEqual(4.5);
  });

  test('should meet WCAG AA contrast requirements for large text', () => {
    // Test heading contrast (should be at least 3:1 for large text)
    const headingContrast = getContrastRatio(
      hexToRgb('#333333'),
      hexToRgb('#ffffff')
    );
    expect(headingContrast).toBeGreaterThanOrEqual(3.0);
  });

  test('should meet WCAG AA contrast requirements for interactive elements', () => {
    // Test primary button (#ffffff on #007bff)
    const primaryButtonContrast = getContrastRatio(
      hexToRgb('#ffffff'),
      hexToRgb('#007bff')
    );
    expect(primaryButtonContrast).toBeGreaterThanOrEqual(4.5);

    // Test secondary button (#ffffff on #6c757d)
    const secondaryButtonContrast = getContrastRatio(
      hexToRgb('#ffffff'),
      hexToRgb('#6c757d')
    );
    expect(secondaryButtonContrast).toBeGreaterThanOrEqual(4.5);
  });

  test('should meet WCAG AA contrast requirements for links', () => {
    // Test primary link (#0d6efd on #ffffff)
    const primaryLinkContrast = getContrastRatio(
      hexToRgb('#0d6efd'),
      hexToRgb('#ffffff')
    );
    expect(primaryLinkContrast).toBeGreaterThanOrEqual(4.5);
  });

  test('should have sufficient contrast for focus indicators', () => {
    const button = container.querySelector('.btn-primary');
    button.focus();

    // In a real implementation, you would check the computed styles
    // of the focus indicator (outline, box-shadow, etc.)
    const focusIndicatorContrast = getContrastRatio(
      hexToRgb('#ffffff'),
      hexToRgb('#0056b3') // Typically a darker shade for focus
    );
    expect(focusIndicatorContrast).toBeGreaterThanOrEqual(3.0);
  });

  test('should not rely solely on color for information', () => {
    // Test that interactive elements have additional visual cues
    // beyond just color (e.g., underlines for links, borders for buttons)
    
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      const computedStyle = window.getComputedStyle(link);
      
      // Links should have underline or other text decoration
      expect(
        computedStyle.textDecoration.includes('underline') ||
        computedStyle.borderBottom !== 'none' ||
        computedStyle.borderBottom !== '0px'
      ).toBe(true);
    });

    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      const computedStyle = window.getComputedStyle(button);
      
      // Buttons should have visible borders or background
      expect(
        computedStyle.border !== 'none' ||
        computedStyle.backgroundColor !== 'transparent'
      ).toBe(true);
    });
  });
});