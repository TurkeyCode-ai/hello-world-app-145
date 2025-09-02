import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests with axe-core', () => {
  let container;

  beforeEach(() => {
    // Create a basic Hello World HTML structure for testing
    document.body.innerHTML = `
      <div id="app">
        <header role="banner">
          <h1>Hello World</h1>
          <nav role="navigation" aria-label="Main navigation">
            <ul>
              <li><a href="#home" aria-current="page">Home</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
        </header>
        <main role="main">
          <section>
            <h2>Welcome</h2>
            <p>This is a Hello World application.</p>
            <button type="button" aria-label="Say Hello">Click Me</button>
            <input type="text" id="name" aria-label="Enter your name" />
            <label for="name">Name</label>
          </section>
        </main>
        <footer role="contentinfo">
          <p>&copy; 2024 Hello World App</p>
        </footer>
      </div>
    `;
    container = document.getElementById('app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should not have any accessibility violations', async () => {
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper heading hierarchy', async () => {
    const results = await axe(container, {
      rules: {
        'heading-order': { enabled: true }
      }
    });
    expect(results).toHaveNoViolations();
  });

  test('should have proper ARIA labels', async () => {
    const results = await axe(container, {
      rules: {
        'aria-valid-attr': { enabled: true },
        'aria-valid-attr-value': { enabled: true },
        'button-name': { enabled: true }
      }
    });
    expect(results).toHaveNoViolations();
  });

  test('should have proper form labels', async () => {
    const results = await axe(container, {
      rules: {
        'label': { enabled: true },
        'label-title-only': { enabled: true }
      }
    });
    expect(results).toHaveNoViolations();
  });

  test('should have proper landmarks', async () => {
    const results = await axe(container, {
      rules: {
        'landmark-one-main': { enabled: true },
        'landmark-complementary-is-top-level': { enabled: true },
        'landmark-no-duplicate-banner': { enabled: true },
        'landmark-no-duplicate-contentinfo': { enabled: true }
      }
    });
    expect(results).toHaveNoViolations();
  });
});