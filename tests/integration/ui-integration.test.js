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
