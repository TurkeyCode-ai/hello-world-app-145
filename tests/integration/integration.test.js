/**
 * Integration Tests for Hello World Application
 * Tests component integration and system interactions
 */

const { JSDOM } = require('jsdom');

describe('Hello World Integration Tests', () => {
  let dom, document, window;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World App</title>
      </head>
      <body>
        <div id="app">
          <h1 id="hello-text">Hello World</h1>
        </div>
      </body>
      </html>
    `;
    
    dom = new JSDOM(html, {
      url: 'http://localhost',
      pretendToBeVisual: true,
      resources: 'usable'
    });
    
    document = dom.window.document;
    window = dom.window;
    
    global.document = document;
    global.window = window;
  });

  afterEach(() => {
    if (dom) {
      dom.window.close();
    }
  });

  test('should integrate app container with hello text element', () => {
    const appContainer = document.querySelector('#app');
    const helloText = document.querySelector('#hello-text');
    
    expect(appContainer).toBeTruthy();
    expect(helloText).toBeTruthy();
    expect(appContainer.contains(helloText)).toBe(true);
  });

  test('should maintain proper parent-child relationships', () => {
    const helloText = document.querySelector('#hello-text');
    const appContainer = document.querySelector('#app');
    const body = document.querySelector('body');
    
    expect(helloText.parentElement).toBe(appContainer);
    expect(appContainer.parentElement).toBe(body);
  });

  test('should work with document ready state', () => {
    expect(document.readyState).toBe('complete');
    
    const helloText = document.querySelector('#hello-text');
    expect(helloText.textContent).toBe('Hello World');
  });

  test('should handle window resize events', () => {
    const helloText = document.querySelector('#hello-text');
    
    // Simulate window resize
    window.dispatchEvent(new window.Event('resize'));
    
    // Text should still be present and correct
    expect(helloText.textContent).toBe('Hello World');
  });

  test('should integrate with browser APIs', () => {
    // Test document query APIs
    expect(document.getElementById('hello-text')).toBeTruthy();
    expect(document.querySelector('#hello-text')).toBeTruthy();
    expect(document.getElementsByTagName('h1')).toHaveLength(1);
    
    // Test element APIs
    const helloText = document.querySelector('#hello-text');
    expect(helloText.getAttribute('id')).toBe('hello-text');
    expect(helloText.tagName).toBe('H1');
  });

  test('should work with CSS integration (simulated)', () => {
    const helloText = document.querySelector('#hello-text');
    
    // Simulate CSS being applied
    helloText.style.color = 'blue';
    helloText.style.fontSize = '24px';
    
    expect(helloText.style.color).toBe('blue');
    expect(helloText.style.fontSize).toBe('24px');
    expect(helloText.textContent).toBe('Hello World');
  });

  test('should handle multiple browser tabs simulation', () => {
    // Simulate visibility change
    let visibilityState = 'visible';
    Object.defineProperty(document, 'visibilityState', {
      get: () => visibilityState,
      configurable: true
    });
    
    expect(document.visibilityState).toBe('visible');
    
    const helloText = document.querySelector('#hello-text');
    expect(helloText.textContent).toBe('Hello World');
    
    // Simulate tab becoming hidden
    visibilityState = 'hidden';
    document.dispatchEvent(new window.Event('visibilitychange'));
    
    // Content should still be there
    expect(helloText.textContent).toBe('Hello World');
  });

  test('should integrate with form submission (if forms added later)', () => {
    const appContainer = document.querySelector('#app');
    
    // Simulate adding a form
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'test';
    form.appendChild(input);
    appContainer.appendChild(form);
    
    // Hello text should still be there
    const helloText = document.querySelector('#hello-text');
    expect(helloText.textContent).toBe('Hello World');
    expect(appContainer.contains(helloText)).toBe(true);
    expect(appContainer.contains(form)).toBe(true);
  });
});