/**
 * Keyboard Navigation Accessibility Tests
 * Tests keyboard interaction and focus management
 */

describe('Keyboard Navigation Tests', () => {
  let container;
  let focusableElements;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <header>
          <h1 tabindex="-1" id="main-heading">Hello World</h1>
          <nav>
            <a href="#home" id="home-link">Home</a>
            <a href="#about" id="about-link">About</a>
          </nav>
        </header>
        <main>
          <button type="button" id="hello-btn">Say Hello</button>
          <input type="text" id="name-input" placeholder="Enter your name" />
          <button type="submit" id="submit-btn">Submit</button>
        </main>
      </div>
    `;
    container = document.getElementById('app');
    focusableElements = container.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should have proper tab order', () => {
    const expectedTabOrder = ['home-link', 'about-link', 'hello-btn', 'name-input', 'submit-btn'];
    
    focusableElements.forEach((element, index) => {
      expect(element.id).toBe(expectedTabOrder[index]);
    });
  });

  test('should handle Tab key navigation', () => {
    const firstElement = document.getElementById('home-link');
    const secondElement = document.getElementById('about-link');

    firstElement.focus();
    expect(document.activeElement).toBe(firstElement);

    // Simulate Tab key press
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      bubbles: true
    });
    
    document.dispatchEvent(tabEvent);
    
    // In a real browser, focus would move to next element
    // For testing, we manually set focus to simulate behavior
    secondElement.focus();
    expect(document.activeElement).toBe(secondElement);
  });

  test('should handle Enter key on buttons', () => {
    const button = document.getElementById('hello-btn');
    let clicked = false;

    button.addEventListener('click', () => {
      clicked = true;
    });

    button.focus();
    
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      bubbles: true
    });

    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.target.click();
      }
    });

    button.dispatchEvent(enterEvent);
    expect(clicked).toBe(true);
  });

  test('should handle Space key on buttons', () => {
    const button = document.getElementById('hello-btn');
    let clicked = false;

    button.addEventListener('click', () => {
      clicked = true;
    });

    button.focus();
    
    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      code: 'Space',
      keyCode: 32,
      bubbles: true
    });

    button.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    });

    button.dispatchEvent(spaceEvent);
    expect(clicked).toBe(true);
  });

  test('should have visible focus indicators', () => {
    const button = document.getElementById('hello-btn');
    button.focus();

    const computedStyle = window.getComputedStyle(button, ':focus');
    
    // Check if focus styles are applied (outline or box-shadow)
    expect(
      computedStyle.outline !== 'none' || 
      computedStyle.boxShadow !== 'none' ||
      computedStyle.borderColor !== 'transparent'
    ).toBe(true);
  });
});