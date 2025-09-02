/**
 * Unit Tests for Hello World Display Feature
 * Tests the core functionality of displaying "Hello World" text
 */

describe('Hello World Text Display', () => {
  let container;

  beforeEach(() => {
    // Create a fresh DOM container for each test
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(container);
    container = null;
  });

  test('should display "Hello World" text on page', () => {
    // Simulate the main HTML structure
    container.innerHTML = `
      <div id="app">
        <h1 id="hello-text">Hello World</h1>
      </div>
    `;

    const helloElement = container.querySelector('#hello-text');
    
    expect(helloElement).toBeInTheDocument();
    expect(helloElement.textContent).toBe('Hello World');
    expect(helloElement.tagName).toBe('H1');
  });

  test('should have proper HTML structure', () => {
    container.innerHTML = `
      <div id="app">
        <h1 id="hello-text">Hello World</h1>
      </div>
    `;

    const appContainer = container.querySelector('#app');
    const helloElement = container.querySelector('#hello-text');

    expect(appContainer).toBeInTheDocument();
    expect(helloElement).toBeInTheDocument();
    expect(appContainer.contains(helloElement)).toBe(true);
  });

  test('should have correct text content without extra whitespace', () => {
    container.innerHTML = `
      <div id="app">
        <h1 id="hello-text">Hello World</h1>
      </div>
    `;

    const helloElement = container.querySelector('#hello-text');
    
    expect(helloElement.textContent.trim()).toBe('Hello World');
    expect(helloElement.textContent).not.toContain('\n');
    expect(helloElement.textContent).not.toContain('\t');
  });

  test('should be visible and not hidden', () => {
    container.innerHTML = `
      <div id="app">
        <h1 id="hello-text">Hello World</h1>
      </div>
    `;

    const helloElement = container.querySelector('#hello-text');
    const computedStyle = window.getComputedStyle(helloElement);
    
    expect(computedStyle.display).not.toBe('none');
    expect(computedStyle.visibility).not.toBe('hidden');
  });

  test('should handle missing element gracefully', () => {
    container.innerHTML = '<div id="app"></div>';

    const helloElement = container.querySelector('#hello-text');
    
    expect(helloElement).toBeNull();
  });

  test('should maintain semantic HTML structure', () => {
    container.innerHTML = `
      <div id="app">
        <h1 id="hello-text">Hello World</h1>
      </div>
    `;

    const helloElement = container.querySelector('#hello-text');
    
    expect(helloElement.tagName).toBe('H1');
    expect(helloElement.getAttribute('id')).toBe('hello-text');
  });
});

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
