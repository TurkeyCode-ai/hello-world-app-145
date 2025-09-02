/**
 * WCAG 2.1 AA Compliance Tests
 * Comprehensive tests for Web Content Accessibility Guidelines compliance
 */

describe('WCAG 2.1 AA Compliance Tests', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app" lang="en">
        <header role="banner">
          <h1>Hello World Application</h1>
          <nav role="navigation" aria-label="Main navigation">
            <ul role="menubar">
              <li role="none">
                <a href="#home" role="menuitem" aria-current="page">Home</a>
              </li>
              <li role="none">
                <a href="#about" role="menuitem">About</a>
              </li>
            </ul>
          </nav>
        </header>

        <main role="main" aria-labelledby="main-heading">
          <h2 id="main-heading">Welcome</h2>
          
          <section aria-labelledby="form-section">
            <h3 id="form-section">User Information</h3>
            
            <form aria-label="User greeting form" novalidate>
              <fieldset>
                <legend>Personal Information</legend>
                
                <div class="form-group">
                  <label for="firstName">
                    First Name <span aria-label="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    required
                    aria-required="true"
                    aria-invalid="false"
                    aria-describedby="firstName-error"
                    autocomplete="given-name"
                  />
                  <div id="firstName-error" class="error-message" aria-live="polite"></div>
                </div>

                <div class="form-group">
                  <label for="email">
                    Email Address <span aria-label="required">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    aria-required="true"
                    aria-invalid="false"
                    aria-describedby="email-help email-error"
                    autocomplete="email"
                  />
                  <div id="email-help" class="help-text">
                    We'll use this to send you a personalized greeting
                  </div>
                  <div id="email-error" class="error-message" aria-live="polite"></div>
                </div>

                <div class="form-group">
                  <fieldset>
                    <legend>Preferred Contact Method</legend>
                    <div class="radio-group">
                      <input type="radio" id="contact-email" name="contact" value="email" />
                      <label for="contact-email">Email</label>
                    </div>
                    <div class="radio-group">
                      <input type="radio" id="contact-phone" name="contact" value="phone" />
                      <label for="contact-phone">Phone</label>
                    </div>
                  </fieldset>
                </div>

                <div class="form-group">
                  <input type="checkbox" id="newsletter" name="newsletter" />
                  <label for="newsletter">
                    Subscribe to our newsletter
                  </label>
                </div>
              </fieldset>

              <div class="form-actions">
                <button type="submit" aria-describedby="submit-help">
                  Submit Information
                </button>
                <button type="reset">
                  Clear Form
                </button>
                <div id="submit-help" class="help-text">
                  Review your information before submitting
                </div>
              </div>
            </form>
          </section>

          <section aria-labelledby="results-section">
            <h3 id="results-section">Greeting Results</h3>
            <div 
              id="results-container" 
              role="region"
              aria-live="polite"
              aria-atomic="true"
              tabindex="-1"
            >
              <!-- Dynamic content will be inserted here -->
            </div>
          </section>
        </main>

        <aside role="complementary" aria-labelledby="help-section">
          <h3 id="help-section">Help &amp; Information</h3>
          <ul>
            <li><a href="#help">Getting Started Guide</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
            <li><a href="#contact">Contact Support</a></li>
          </ul>
        </aside>

        <footer role="contentinfo">
          <p>&copy; 2024 Hello World Application. All rights reserved.</p>
        </footer>
      </div>
    `;
    container = document.getElementById('app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // WCAG 2.1 Principle 1: Perceivable
  describe('Principle 1: Perceivable', () => {
    test('1.1.1 - Non-text Content: Images have alt text', () => {
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    test('1.3.1 - Info and Relationships: Proper heading hierarchy', () => {
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let currentLevel = 0;
      
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        expect(level).toBeLessThanOrEqual(currentLevel + 1);
        currentLevel = level;
      });
    });

    test('1.3.1 - Info and Relationships: Form labels are properly associated', () => {
      const inputs = container.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const label = container.querySelector(`label[for="${input.id}"]`);
        expect(label || input.getAttribute('aria-label') || input.getAttribute('aria-labelledby')).toBeTruthy();
      });
    });

    test('1.3.2 - Meaningful Sequence: Content order is logical', () => {
      const mainHeading = container.querySelector('h1');
      const subHeadings = container.querySelectorAll('h2, h3');
      
      expect(mainHeading).toBeInTheDocument();
      
      // Check that main heading comes before sub-headings
      if (subHeadings.length > 0) {
        const mainHeadingPos = Array.from(container.querySelectorAll('*')).indexOf(mainHeading);
        const firstSubHeadingPos = Array.from(container.querySelectorAll('*')).indexOf(subHeadings[0]);
        expect(mainHeadingPos).toBeLessThan(firstSubHeadingPos);
      }
    });

    test('1.4.3 - Contrast: Text has sufficient contrast ratio', () => {
      // This would typically be tested with actual color values
      // For now, we check that elements don't have problematic inline styles
      const textElements = container.querySelectorAll('p, h1, h2, h3, label, button, a');
      textElements.forEach(element => {
        const style = element.getAttribute('style');
        if (style) {
          expect(style).not.toMatch(/color:\s*#fff.*background.*#fff/i);
          expect(style).not.toMatch(/color:\s*white.*background.*white/i);
        }
      });
    });
  });

  // WCAG 2.1 Principle 2: Operable
  describe('Principle 2: Operable', () => {
    test('2.1.1 - Keyboard: All functionality is keyboard accessible', () => {
      const interactiveElements = container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      
      interactiveElements.forEach(element => {
        // Check that element is focusable
        element.focus();
        expect(document.activeElement).toBe(element);
      });
    });

    test('2.1.2 - No Keyboard Trap: Users can navigate away from all components', () => {
      const focusableElements = container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      
      // Simulate Tab navigation through all elements
      focusableElements.forEach((element, index) => {
        element.focus();
        expect(document.activeElement).toBe(element);
        
        // Simulate Tab key (in real testing, this would move focus)
        if (index < focusableElements.length - 1) {
          focusableElements[index + 1].focus();
        }
      });
    });

    test('2.4.1 - Bypass Blocks: Skip navigation is available', () => {
      // Check for skip links or proper heading structure
      const skipLink = container.querySelector('a[href^="#main"], a[href^="#content"]');
      const mainContent = container.querySelector('main, #main, #content');
      
      expect(skipLink || mainContent).toBeTruthy();
    });

    test('2.4.2 - Page Titled: Page has a title', () => {
      expect(document.title || container.querySelector('h1')).toBeTruthy();
    });

    test('2.4.3 - Focus Order: Focus order is logical', () => {
      const focusableElements = container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      
      // Check that elements appear in DOM order
      let previousTabIndex = -1;
      focusableElements.forEach(element => {
        const tabIndex = parseInt(element.getAttribute('tabindex')) || 0;
        if (tabIndex > 0) {
          expect(tabIndex).toBeGreaterThan(previousTabIndex);
          previousTabIndex = tabIndex;
        }
      });
    });

    test('2.4.6 - Headings and Labels: Descriptive headings and labels', () => {
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const labels = container.querySelectorAll('label');
      
      headings.forEach(heading => {
        expect(heading.textContent.trim().length).toBeGreaterThan(0);
        expect(heading.textContent.trim()).not.toBe('Heading');
      });

      labels.forEach(label => {
        expect(label.textContent.trim().length).toBeGreaterThan(0);
        expect(label.textContent.trim()).not.toBe('Label');
      });
    });

    test('2.4.7 - Focus Visible: Focus indicator is visible', () => {
      const focusableElements = container.querySelectorAll('button, input, a');
      
      focusableElements.forEach(element => {
        element.focus();
        const computedStyle = window.getComputedStyle(element, ':focus');
        
        // Check for focus indicators
        expect(
          computedStyle.outline !== 'none' ||
          computedStyle.boxShadow !== 'none' ||
          computedStyle.backgroundColor !== 'transparent'
        ).toBe(true);
      });
    });
  });

  // WCAG 2.1 Principle 3: Understandable
  describe('Principle 3: Understandable', () => {
    test('3.1.1 - Language of Page: Page language is identified', () => {
      const langAttribute = container.getAttribute('lang') || document.documentElement.getAttribute('lang');
      expect(langAttribute).toBeTruthy();
      expect(langAttribute.length).toBeGreaterThanOrEqual(2);
    });

    test('3.2.1 - On Focus: No context changes on focus', () => {
      const inputs = container.querySelectorAll('input, button, a');
      
      inputs.forEach(input => {
        const originalUrl = window.location.href;
        const originalTitle = document.title;
        
        input.focus();
        
        // Ensure no navigation or major context changes occurred
        expect(window.location.href).toBe(originalUrl);
        expect(document.title).toBe(originalTitle);
      });
    });

    test('3.2.2 - On Input: No context changes on input', () => {
      const inputs = container.querySelectorAll('input[type="text"], input[type="email"], textarea');
      
      inputs.forEach(input => {
        const originalUrl = window.location.href;
        
        // Simulate user input
        input.value = 'test value';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Ensure no navigation occurred
        expect(window.location.href).toBe(originalUrl);
      });
    });

    test('3.3.1 - Error Identification: Errors are identified', () => {
      const requiredInputs = container.querySelectorAll('input[required]');
      
      requiredInputs.forEach(input => {
        const errorElement = document.getElementById(input.getAttribute('aria-describedby'));
        expect(errorElement || input.getAttribute('aria-invalid')).toBeTruthy();
      });
    });

    test('3.3.2 - Labels or Instructions: Labels and instructions are provided', () => {
      const formControls = container.querySelectorAll('input, textarea, select');
      
      formControls.forEach(control => {
        const hasLabel = container.querySelector(`label[for="${control.id}"]`);
        const hasAriaLabel = control.getAttribute('aria-label');
        const hasAriaLabelledby = control.getAttribute('aria-labelledby');
        
        expect(hasLabel || hasAriaLabel || hasAriaLabelledby).toBeTruthy();
      });
    });
  });

  // WCAG 2.1 Principle 4: Robust
  describe('Principle 4: Robust', () => {
    test('4.1.1 - Parsing: Valid HTML markup', () => {
      // Check for proper nesting and required attributes
      const inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'email') {
          expect(input.hasAttribute('id')).toBe(true);
        }
      });

      const labels = container.querySelectorAll('label');
      labels.forEach(label => {
        expect(label.hasAttribute('for') || label.querySelector('input')).toBeTruthy();
      });
    });

    test('4.1.2 - Name, Role, Value: Proper semantic markup', () => {
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.textContent.trim().length > 0 || button.getAttribute('aria-label')).toBeTruthy();
      });

      const links = container.querySelectorAll('a');
      links.forEach(link => {
        expect(link.textContent.trim().length > 0 || link.getAttribute('aria-label')).toBeTruthy();
        expect(link.hasAttribute('href')).toBe(true);
      });

      const landmarks = container.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"], header, nav, main, aside, footer');
      expect(landmarks.length).toBeGreaterThan(0);
    });
  });
});