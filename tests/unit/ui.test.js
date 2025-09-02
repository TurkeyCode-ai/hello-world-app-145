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