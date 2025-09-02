<!-- AI TEAM BUILDER - FEATURE ITERATION HISTORY -->
<!-- Agent: designer -->
<!-- Timestamp: 2025-09-02T01:52:25+00:00 -->
<!-- Feature: Simple User Interface -->
<!-- Priority: P0 -->
<!-- Build Context: Feature-focused build -->

## FILENAME: design/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World - Design System Showcase</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Main Navigation -->
    <header class="header" role="banner">
        <nav class="nav" role="navigation" aria-label="Main navigation">
            <div class="nav__brand">
                <h1 class="brand__title">Hello World</h1>
                <span class="brand__subtitle">Design System</span>
            </div>
            <ul class="nav__menu" role="menubar">
                <li class="nav__item" role="none">
                    <a href="#showcase" class="nav__link" role="menuitem">Showcase</a>
                </li>
                <li class="nav__item" role="none">
                    <a href="styleguide.html" class="nav__link" role="menuitem">Style Guide</a>
                </li>
                <li class="nav__item" role="none">
                    <a href="#components" class="nav__link" role="menuitem">Components</a>
                </li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <main id="main-content" role="main">
        <section class="hero" id="showcase" aria-labelledby="hero-title">
            <div class="container">
                <div class="hero__content">
                    <h1 class="hero__title" id="hero-title">
                        Modern Design System
                        <span class="hero__highlight">for Hello World</span>
                    </h1>
                    <p class="hero__description">
                        A comprehensive, accessible, and scalable design system built with modern CSS and JavaScript conventions. Clean, professional, and ready to scale beyond simple implementations.
                    </p>
                    <div class="hero__actions">
                        <button class="btn btn--primary btn--large" aria-describedby="primary-action-desc">
                            Get Started
                        </button>
                        <button class="btn btn--secondary btn--large" aria-describedby="secondary-action-desc">
                            View Components
                        </button>
                    </div>
                    <div class="sr-only">
                        <p id="primary-action-desc">Navigate to the getting started guide</p>
                        <p id="secondary-action-desc">Browse the component library</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Grid -->
        <section class="features" aria-labelledby="features-title">
            <div class="container">
                <h2 class="features__title" id="features-title">Design System Features</h2>
                <div class="features__grid">
                    <article class="feature-card">
                        <div class="feature-card__icon" aria-hidden="true">
                            <div class="icon icon--responsive"></div>
                        </div>
                        <h3 class="feature-card__title">Responsive Design</h3>
                        <p class="feature-card__description">
                            Mobile-first approach with fluid typography and flexible grids that work seamlessly across all device sizes.
                        </p>
                    </article>

                    <article class="feature-card">
                        <div class="feature-card__icon" aria-hidden="true">
                            <div class="icon icon--accessible"></div>
                        </div>
                        <h3 class="feature-card__title">Accessibility First</h3>
                        <p class="feature-card__description">
                            WCAG 2.1 AA compliant with proper contrast ratios, semantic markup, and keyboard navigation support.
                        </p>
                    </article>

                    <article class="feature-card">
                        <div class="feature-card__icon" aria-hidden="true">
                            <div class="icon icon--modular"></div>
                        </div>
                        <h3 class="feature-card__title">Modular Components</h3>
                        <p class="feature-card__description">
                            Atomic design principles with reusable components that follow BEM methodology for maintainable CSS.
                        </p>
                    </article>

                    <article class="feature-card">
                        <div class="feature-card__icon" aria-hidden="true">
                            <div class="icon icon--performance"></div>
                        </div>
                        <h3 class="feature-card__title">Performance Optimized</h3>
                        <p class="feature-card__description">
                            Lightweight CSS with modern properties, efficient selectors, and minimal bundle size for fast loading.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <!-- Typography Showcase -->
        <section class="typography-showcase" aria-labelledby="typography-title">
            <div class="container">
                <h2 class="section__title" id="typography-title">Typography System</h2>
                <div class="typography-demo">
                    <div class="typography-demo__scale">
                        <h1 class="text-3xl">Heading 1 - 3rem</h1>
                        <h2 class="text-2xl">Heading 2 - 2rem</h2>
                        <h3 class="text-xl">Heading 3 - 1.5rem</h3>
                        <h4 class="text-lg">Heading 4 - 1.25rem</h4>
                        <p class="text-base">Body Text - 1rem</p>
                        <p class="text-sm">Small Text - 0.875rem</p>
                        <code class="code">Code - JetBrains Mono</code>
                    </div>
                </div>
            </div>
        </section>

        <!-- Color Palette -->
        <section class="color-showcase" aria-labelledby="color-title">
            <div class="container">
                <h2 class="section__title" id="color-title">Color System</h2>
                <div class="color-grid">
                    <div class="color-group">
                        <h3 class="color-group__title">Primary Colors</h3>
                        <div class="color-swatches">
                            <div class="color-swatch color-swatch--primary" aria-label="Primary blue color">
                                <span class="color-swatch__label">Primary</span>
                                <span class="color-swatch__value">#2563eb</span>
                            </div>
                            <div class="color-swatch color-swatch--secondary" aria-label="Secondary slate color">
                                <span class="color-swatch__label">Secondary</span>
                                <span class="color-swatch__value">#64748b</span>
                            </div>
                        </div>
                    </div>

                    <div class="color-group">
                        <h3 class="color-group__title">State Colors</h3>
                        <div class="color-swatches">
                            <div class="color-swatch color-swatch--success" aria-label="Success green color">
                                <span class="color-swatch__label">Success</span>
                                <span class="color-swatch__value">#10b981</span>
                            </div>
                            <div class="color-swatch color-swatch--warning" aria-label="Warning amber color">
                                <span class="color-swatch__label">Warning</span>
                                <span class="color-swatch__value">#f59e0b</span>
                            </div>
                            <div class="color-swatch color-swatch--error" aria-label="Error red color">
                                <span class="color-swatch__label">Error</span>
                                <span class="color-swatch__value">#ef4444</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Interactive Demo -->
        <section class="demo-section" id="components" aria-labelledby="demo-title">
            <div class="container">
                <h2 class="section__title" id="demo-title">Interactive Components</h2>
                <div class="demo-grid">
                    <div class="demo-card">
                        <h3 class="demo-card__title">Buttons</h3>
                        <div class="demo-card__content">
                            <button class="btn btn--primary">Primary</button>
                            <button class="btn btn--secondary">Secondary</button>
                            <button class="btn btn--success">Success</button>
                            <button class="btn btn--warning">Warning</button>
                            <button class="btn btn--error">Error</button>
                        </div>
                    </div>

                    <div class="demo-card">
                        <h3 class="demo-card__title">Form Elements</h3>
                        <div class="demo-card__content">
                            <div class="form-field">
                                <label for="demo-input" class="form-label">Input Label</label>
                                <input type="text" id="demo-input" class="form-input" placeholder="Enter text here">
                            </div>
                            <div class="form-field">
                                <label for="demo-select" class="form-label">Select Label</label>
                                <select id="demo-select" class="form-select">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="demo-card">
                        <h3 class="demo-card__title">Cards</h3>
                        <div class="demo-card__content">
                            <div class="card card--elevated">
                                <div class="card__body">
                                    <h4 class="card__title">Card Title</h4>
                                    <p class="card__text">This is a sample card component with elevation and proper spacing.</p>
                                    <button class="btn btn--primary btn--small">Action</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer__content">
                <div class="footer__section">
                    <h3 class="footer__title">Hello World Design System</h3>
                    <p class="footer__text">Modern, accessible, and scalable design foundation.</p>
                </div>
                <div class="footer__section">
                    <h4 class="footer__heading">Resources</h4>
                    <ul class="footer__links">
                        <li><a href="styleguide.html" class="footer__link">Style Guide</a></li>
                        <li><a href="#components" class="footer__link">Components</a></li>
                        <li><a href="#" class="footer__link">Documentation</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer__bottom">
                <p class="footer__copyright">&copy; 2024 Hello World Design System. Built with modern web standards.</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple interactive demo functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for navigation links
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Button click feedback
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
        });
    </script>
</body>
</html>
```

## FILENAME: design/styleguide.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Style Guide - Hello World Design System</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
        .styleguide-section {
            margin-bottom: 4rem;
            padding: 2rem;
            border: 1px solid var(--color-neutral-200);
            border-radius: 8px;
        }
        .component-example {
            padding: 2rem;
            margin: 1rem 0;
            background: var(--color-neutral-50);
            border-radius: 4px;
            border-left: 4px solid var(--color-primary);
        }
        .code-sample {
            background: var(--color-neutral-900);
            color: var(--color-neutral-100);
            padding: 1rem;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.875rem;
            overflow-x: auto;
            margin-top: 1rem;
        }
        .variation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav__brand">
                <h1 class="brand__title">Style Guide</h1>
                <span class="brand__subtitle">Component Library</span>
            </div>
            <ul class="nav__menu">
                <li class="nav__item">
                    <a href="index.html" class="nav__link">Back to Showcase</a>
                </li>
            </ul>
        </nav>
    </header>

    <main class="container" style="padding-top: 2rem;">
        <!-- Typography Section -->
        <section class="styleguide-section">
            <h2>Typography System</h2>
            <p>Our typography system uses Inter for UI elements and JetBrains Mono for code display.</p>
            
            <div class="component-example">
                <h1 class="text-3xl">Heading 1 - Display Large</h1>
                <h2 class="text-2xl">Heading 2 - Display Medium</h2>
                <h3 class="text-xl">Heading 3 - Display Small</h3>
                <h4 class="text-lg">Heading 4 - Title Large</h4>
                <h5 class="text-base font-semibold">Heading 5 - Title Medium</h5>
                <h6 class="text-sm font-semibold">Heading 6 - Title Small</h6>
                <p class="text-base">Body text - Regular paragraph content with good readability.</p>
                <p class="text-sm">Small text - Secondary information and captions.</p>
                <code class="code">Code text - Monospace for technical content</code>
            </div>

            <div class="code-sample">
&lt;h1 class="text-3xl"&gt;Display Large&lt;/h1&gt;
&lt;p class="text-base"&gt;Body text&lt;/p&gt;
&lt;code class="code"&gt;Code text&lt;/code&gt;
            </div>
        </section>

        <!-- Color System -->
        <section class="styleguide-section">
            <h2>Color System</h2>
            <p>Our color system provides consistent colors for all UI states and branding needs.</p>
            
            <div class="component-example">
                <div class="color-grid">
                    <div class="color-group">
                        <h3>Brand Colors</h3>
                        <div class="color-swatches">
                            <div class="color-swatch color-swatch--primary">
                                <span class="color-swatch__label">Primary</span>
                                <span class="color-swatch__value">#2563eb</span>
                            </div>
                            <div class="color-swatch color-swatch--secondary">
                                <span class="color-swatch__label">Secondary</span>
                                <span class="color-swatch__value">#64748b</span>
                            </div>
                        </div>
                    </div>
                    <div class="color-group">
                        <h3>State Colors</h3>
                        <div class="color-swatches">
                            <div class="color-swatch color-swatch--success">
                                <span class="color-swatch__label">Success</span>
                                <span class="color-swatch__value">#10b981</span>
                            </div>
                            <div class="color-swatch color-swatch--warning">
                                <span class="color-swatch__label">Warning</span>
                                <span class="color-swatch__value">#f59e0b</span>
                            </div>
                            <div class="color-swatch color-swatch--error">
                                <span class="color-swatch__label">Error</span>
                                <span class="color-swatch__value">#ef4444</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="code-sample">
/* CSS Custom Properties */
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
            </div>
        </section>

        <!-- Button Components -->
        <section class="styleguide-section">
            <h2>Button Components</h2>
            <p>Buttons are available in multiple variants and sizes for different use cases.</p>
            
            <div class="component-example">
                <h3>Button Variants</h3>
                <div class="variation-grid">
                    <div>
                        <h4>Primary Buttons</h4>
                        <button class="btn btn--primary btn--large">Large Primary</button>
                        <button class="btn btn--primary">Default Primary</button>
                        <button class="btn btn--primary btn--small">Small Primary</button>
                    </div>
                    <div>
                        <h4>Secondary Buttons</h4>
                        <button class="btn btn--secondary btn--large">Large Secondary</button>
                        <button class="btn btn--secondary">Default Secondary</button>
                        <button class="btn btn--secondary btn--small">Small Secondary</button>
                    </div>
                    <div>
                        <h4>State Buttons</h4>
                        <button class="btn btn--success">Success</button>
                        <button class="btn btn--warning">Warning</button>
                        <button class="btn btn--error">Error</button>
                    </div>
                </div>
            </div>

            <div class="code-sample">
&lt;button class="btn btn--primary"&gt;Primary Button&lt;/button&gt;
&lt;button class="btn btn--secondary"&gt;Secondary Button&lt;/button&gt;
&lt;button class="btn btn--primary btn--large"&gt;Large Button&lt;/button&gt;
&lt;button class="btn btn--primary btn--small"&gt;Small Button&lt;/button&gt;
            </div>
        </section>

        <!-- Form Components -->
        <section class="styleguide-section">
            <h2>Form Components</h2>
            <p>Form elements with consistent styling and accessibility features.</p>
            
            <div class="component-example">
                <form class="form-demo" style="max-width: 400px;">
                    <div class="form-field">
                        <label for="input1" class="form-label">Text Input</label>
                        <input type="text" id="input1" class="form-input" placeholder="Enter text">
                    </div>
                    
                    <div class="form-field">
                        <label for="input2" class="form-label">Email Input</label>
                        <input type="email" id="input2" class="form-input" placeholder="your@email.com">
                    </div>
                    
                    <div class="form-field">
                        <label for="select1" class="form-label">Select Dropdown</label>
                        <select id="select1" class="form-select">
                            <option>Choose an option</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                    
                    <div class="form-field">
                        <label for="textarea1" class="form-label">Textarea</label>
                        <textarea id="textarea1" class="form-textarea" rows="3" placeholder="Enter longer text here"></textarea>
                    </div>
                    
                    <div class="form-field">
                        <label class="checkbox-label">
                            <input type="checkbox" class="checkbox">
                            <span class="checkbox-text">I agree to the terms</span>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn--primary">Submit Form</button>
                </form>
            </div>

            <div class="code-sample">
&lt;div class="form-field"&gt;
  &lt;label for="input" class="form-label"&gt;Label&lt;/label&gt;
  &lt;input type="text" id="input" class="form-input" placeholder="Placeholder"&gt;
&lt;/div&gt;
            </div>
        </section>

        <!-- Card Components -->
        <section class="styleguide-section">
            <h2>Card Components</h2>
            <p>Cards for grouping related content with optional elevation and actions.</p>
            
            <div class="component-example">
                <div class="variation-grid">
                    <div class="card">
                        <div class="card__body">
                            <h3 class="card__title">Basic Card</h3>
                            <p class="card__text">This is a basic card with minimal styling.</p>
                        </div>
                    </div>
                    
                    <div class="card card--elevated">
                        <div class="card__body">
                            <h3 class="card__title">Elevated Card</h3>
                            <p class="card__text">This card has elevation shadow for prominence.</p>
                            <button class="btn btn--primary btn--small">Action</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="code-sample">
&lt;div class="card card--elevated"&gt;
  &lt;div class="card__body"&gt;
    &lt;h3 class="card__title"&gt;Card Title&lt;/h3&gt;
    &lt;p class="card__text"&gt;Card content goes here.&lt;/p&gt;
    &lt;button class="btn btn--primary btn--small"&gt;Action&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
            </div>
        </section>

        <!-- Utility Classes -->
        <section class="styleguide-section">
            <h2>Utility Classes</h2>
            <p>Helper classes for spacing, typography, and layout adjustments.</p>
            
            <div class="component-example">
                <h3>Spacing Utilities</h3>
                <div style="background: #f0f0f0; padding: 1rem;">
                    <div class="p-1" style="background: white; margin-bottom: 0.5rem;">Padding 1 (.25rem)</div>
                    <div class="p-2" style="background: white; margin-bottom: 0.5rem;">Padding 2 (.5rem)</div>
                    <div class="p-4" style="background: white; margin-bottom: 0.5rem;">Padding 4 (1rem)</div>
                </div>
                
                <h3>Text Utilities</h3>
                <p class="text-center">Centered text</p>
                <p class="text-right">Right-aligned text</p>
                <p class="font-bold">Bold text</p>
                <p class="font-semibold">Semibold text</p>
                <p class="text-muted">Muted text color</p>
            </div>

            <div class="code-sample">
&lt;!-- Spacing --&gt;
&lt;div class="p-4 m-2"&gt;Padding 4, Margin 2&lt;/div&gt;

&lt;!-- Typography --&gt;
&lt;p class="text-center font-bold"&gt;Centered bold text&lt;/p&gt;
&lt;p class="text-muted"&gt;Muted text&lt;/p&gt;
            </div>
        </section>

        <!-- Responsive Grid -->
        <section class="styleguide-section">
            <h2>Grid System</h2>
            <p>Flexible grid system using CSS Grid with responsive breakpoints.</p>
            
            <div class="component-example">
                <div class="grid grid--2-cols" style="gap: 1rem;">
                    <div style="background: var(--color-primary); color: white; padding: 1rem; border-radius: 4px;">Column 1</div>
                    <div style="background: var(--color-secondary); color: white; padding: 1rem; border-radius: 4px;">Column 2</div>
                </div>
                
                <div class="grid grid--3-cols" style="gap: 1rem; margin-top: 1rem;">
                    <div style="background: var(--color-success); color: white; padding: 1rem; border-radius: 4px;">Column 1</div>
                    <div style="background: var(--color-warning); color: white; padding: 1rem; border-radius: 4px;">Column 2</div>
                    <div style="background: var(--color-error); color: white; padding: 1rem; border-radius: 4px;">Column 3</div>
                </div>
            </div>

            <div class="code-sample">
&lt;div class="grid grid--2-cols"&gt;
  &lt;div&gt;Column 1&lt;/div&gt;
  &lt;div&gt;Column 2&lt;/div&gt;
&lt;/div&gt;

&lt;div class="grid grid--3-cols"&gt;
  &lt;div&gt;Column 1&lt;/div&gt;
  &lt;div&gt;Column 2&lt;/div&gt;
  &lt;div&gt;Column 3&lt;/div&gt;
&lt;/div&gt;
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer__content">
                <div class="footer__section">
                    <h3 class="footer__title">Hello World Style Guide</h3>
                    <p class="footer__text">Complete component library and usage documentation.</p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
```

## FILENAME: design/styles.css
```css
/* ===================================
   CSS RESET & BASE STYLES
   =================================== */

/* Modern CSS Reset */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
}

body {
    margin: 0;
    font-family: var(--font-sans);
    line-height: var(--line-height-base);
    color: var(--color-text-primary);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Remove list styles on ul, ol elements */
ul,
ol {
    list-style: none;
}

/* Set core root defaults */
html:focus-within {
    scroll-behavior: smooth;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
    html:focus-within {
        scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* ===================================
   CSS CUSTOM PROPERTIES (DESIGN TOKENS)
   =================================== */

:root {
    /* Color System */
    --color-primary: #2563eb;
    --color-primary-hover: #1d4ed8;
    --color-primary-light: #3b82f6;
    --color-secondary: #64748b;
    --color-secondary-hover: #475569;
    --color-success: #10b981;
    --color-success-hover: #059669;
    --color-warning: #f59e0b;
    --color-warning-hover: #d97706;
    --color-error: #ef4444;
    --color-error-hover: #dc2626;
    
    /* Neutral Colors */
    --color-neutral-50: #f8fafc;
    --color-neutral-100: #f1f5f9;
    --color-neutral-200: #e2e8f0;
    --color-neutral-300: #cbd5e1;
    --color-neutral-400: #94a3b8;
    --color-neutral-500: #64748b;
    --color-neutral-600: #475569;
    --color-neutral-700: #334155;
    --color-neutral-800: #1e293b;
    --color-neutral-900: #0f172a;
    
    /* Semantic Colors */
    --color-background: #ffffff;
    --color-surface: #f8fafc;
    --color-text-primary: #0f172a;
    --color-text-secondary: #475569;
    --color-text-muted: #64748b;
    --color-border: #e2e8f0;
    --color-border-hover: #cbd5e1;
    
    /* Typography */
    --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, monospace;
    
    /* Font Sizes */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 2rem;
    --text-4xl: 3rem;
    
    /* Font Weights */
    --font-regular: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    
    /* Line Heights */
    --line-height-tight: 1.2;
    --line-height-base: 1.5;
    --line-height-relaxed: 1.7;
    
    /* Spacing Scale */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    
    /* Border Radius */
    --radius-sm: 0.125rem;
    --radius-base: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-full: 9999px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Transitions */
    --transition-fast: 150ms ease-in-out;
    --transition-base: 200ms ease-in-out;
    --transition-slow: 300ms ease-in-out;
    
    /* Breakpoints */
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
}

/* ===================================
   TYPOGRAPHY SYSTEM
   =================================== */

/* Typography Scale Classes */
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { 
    font-size: var(--text-2xl);
    line-height: var(--line-height-tight);
}
.text-3xl { 
    font-size: var(--text-3xl);
    line-height: var(--line-height-tight);
    font-weight: var(--font-bold);
}
.text-4xl { 
    font-size: var(--text-4xl);
    line-height: var(--line-height-tight);
    font-weight: var(--font-bold);
}

/* Font Weight Classes */
.font-regular { font-weight: var(--font-regular); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }

/* Text Alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Text Colors */
.text-muted { color: var(--color-text-muted); }
.text-secondary { color: var(--color-text-secondary); }

/* Code Styling */
.code {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    background: var(--color-neutral-100);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-base);
    color: var(--color-error);
}

/* ===================================
   LAYOUT SYSTEM
   =================================== */

/* Container */
.container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 var(--space-4);
}

@media (min-width: 640px) {
    .container {
        padding: 0 var(--space-6);
    }
}

@media (min-width: 1024px) {
    .container {
        padding: 0 var(--space-8);
    }
}

/* Grid System */
.grid {
    display: grid;
    gap: var(--space-4);
}

.grid--2-cols {
    grid-template-columns: repeat(2, 1fr);
}

.grid--3-cols {
    grid-template-columns: repeat(3, 1fr);
}

.grid--4-cols {
    grid-template-columns: repeat(4, 1fr);
}

/* Responsive Grid */
@media (max-width: 768px) {
    .grid--2-cols,
    .grid--3-cols,
    .grid--4-cols {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .grid--3-cols,
    .grid--4-cols {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Flexbox Utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

/* ===================================
   SPACING UTILITIES
   =================================== */

/* Padding */
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

/* Margin */
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-3 { margin: var(--space-3); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }

/* ===================================
   BUTTON COMPONENTS
   =================================== */

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3) var(--space-6);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    line-height: 1;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    background: none;
    white-space: nowrap;
    user-select: none;
    min-height: 44px; /* Touch-friendly minimum size */
}

.btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

/* Button Variants */
.btn--primary {
    background-color: var(--color-primary);
    color: white;
}

.btn--primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn--secondary {
    background-color: transparent;
    color: var(--color-secondary);
    border-color: var(--color-border);
}

.btn--secondary:hover:not(:disabled) {
    background-color: var(--color-neutral-50);
    border-color: var(--color-border-hover);
    color: var(--color-secondary-hover);
}

.btn--success {
    background-color: var(--color-success);
    color: white;
}

.btn--success:hover:not(:disabled) {
    background-color: var(--color-success-hover);
}

.btn--warning {
    background-color: var(--color-warning);
    color: white;
}

.btn--warning:hover:not(:disabled) {
    background-color: var(--color-warning-hover);
}

.btn--error {
    background-color: var(--color-error);
    color: white;
}

.btn--error:hover:not(:disabled) {
    background-color: var(--color-error-hover);
}

/* Button Sizes */
.btn--small {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    min-height: 32px;
}

.btn--large {
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-lg);
    min-height: 52px;
}

/* ===================================
   FORM COMPONENTS
   =================================== */

.form-field {
    margin-bottom: var(--space-4);
}

.form-label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text-primary);
    margin-bottom: var(--space-2);
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: var(--space-3);
    font-size: var(--text-base);
    font-family: var(--font-sans);
    color: var(--color-text-primary);
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    min-height: 44px;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input::placeholder {
    color: var(--color-text-muted);
}

.form-textarea {
    resize: vertical;
    min-height: auto;
}

/* Checkbox Styling */
.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: var(--text-sm);
}

.checkbox {
    margin-right: var(--space-2);
    width: 18px;
    height: 18px;
}

.checkbox-text {
    color: var(--color-text-secondary);
}

/* ===================================
   CARD COMPONENTS
   =================================== */

.card {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-base);
}

.card--elevated {
    box-shadow: var(--shadow-base);
}

.card--elevated:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

.card__body {
    padding: var(--space-6);
}

.card__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-2);
}

.card__text {
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-4);
}

.card__text:last-child {
    margin-bottom: 0;
}

/* ===================================
   NAVIGATION COMPONENTS
   =================================== */

.header {
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) 0;
    max-width: 1280px;
    margin: 0 auto;
    padding-left: var(--space-4);
    padding-right: var(--space-4);
}

.nav__brand {
    display: flex;
    flex-direction: column;
}

.brand__title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--color-text-primary);
    line-height: 1;
}

.brand__subtitle {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-top: var(--space-1);
}

.nav__menu {
    display: flex;
    align-items: center;
    gap: var(--space-6);
}

.nav__link {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-base);
}

.nav__link:hover {
    color: var(--color-primary);
    background-color: var(--color-neutral-50);
}

/* Responsive Navigation */
@media (max-width: 768px) {
    .nav {
        padding-left: var(--space-4);
        padding-right: var(--space-4);
    }
    
    .nav__menu {
        gap: var(--space-4);
    }
    
    .nav__link {
        font-size: var(--text-xs);
        padding: var(--space-1) var(--space-2);
    }
}

/* ===================================
   SECTION COMPONENTS
   =================================== */

.hero {
    padding: var(--space-16) 0 var(--space-12);
    background: linear-gradient(135deg, var(--color-neutral-50) 0%, var(--color-background) 100%);
    text-align: center;
}

.hero__content {
    max-width: 768px;
    margin: 0 auto;
}

.hero__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: var(--font-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text-primary);
    margin-bottom: var(--space-6);
}

.hero__highlight {
    color: var(--color-primary);
    display: block;
}

.hero__description {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero__actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
}

.features {
    padding: var(--space-16) 0;
}

.features__title {
    text-align: center;
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-12);
}

.features__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-8);
}

.feature-card {
    text-align: center;
    padding: var(--space-6);
}

.feature-card__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto var(--space-4);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    border-radius: var(--radius-xl);
}

.feature-card__title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
}

.feature-card__description {
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
}

.section__title {
    text-align: center;
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-12);
}

/* ===================================
   COLOR SYSTEM COMPONENTS
   =================================== */

.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
}

.color-group {
    text-align: center;
}

.color-group__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-4);
}

.color-swatches {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.color-swatch {
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    color: white;
    text-align: center;
}

.color-swatch--primary { background-color: var(--color-primary); }
.color-swatch--secondary { background-color: var(--color-secondary); }
.color-swatch--success { background-color: var(--color-success); }
.color-swatch--warning { background-color: var(--color-warning); }
.color-swatch--error { background-color: var(--color-error); }

.color-swatch__label {
    display: block;
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-1);
}

.color-swatch__value {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    opacity: 0.9;
}

/* ===================================
   DEMO COMPONENTS
   =================================== */

.typography-showcase {
    padding: var(--space-16) 0;
    background-color: var(--color-surface);
}

.typography-demo {
    text-align: center;
}

.typography-demo__scale > * {
    margin-bottom: var(--space-4);
}

.color-showcase {
    padding: var(--space-16) 0;
}

.demo-section {
    padding: var(--space-16) 0;
    background-color: var(--color-surface);
}

.demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
}

.demo-card {
    background-color: var(--color-background);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
}

.demo-card__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
}

.demo-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.demo-card__content .btn {
    align-self: flex-start;
}

/* ===================================
   FOOTER COMPONENT
   =================================== */

.footer {
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-300);
    padding: var(--space-12) 0 var(--space-6);
}

.footer__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-8);
    margin-bottom: var(--space-8);
}

.footer__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: white;
    margin-bottom: var(--space-3);
}

.footer__text {
    color: var(--color-neutral-400);
    line-height: var(--line-height-relaxed);
}

.footer__heading {
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    color: white;
    margin-bottom: var(--space-3);
}

.footer__links {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.footer__link {
    color: var(--color-neutral-400);
    text-decoration: none;
    transition: color var(--transition-fast);
}

.footer__link:hover {
    color: var(--color-primary);
}

.footer__bottom {
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-neutral-800);
    text-align: center;
}

.footer__copyright {
    color: var(--color-neutral-500);
    font-size: var(--text-sm);
}

/* ===================================
   ACCESSIBILITY UTILITIES
   =================================== */

/* Screen reader only content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Skip to main content link */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-primary);
    color: white;
    padding: var(--space-2) var(--space-4);
    text-decoration: none;
    border-radius: var(--radius-base);
    z-index: 1000;
}

.skip-link:focus {
    top: 6px;
}

/* ===================================
   ICON SYSTEM (CSS-only icons)
   =================================== */

.icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    background-color: currentColor;
}

.icon--responsive::before {
    content: '📱';
    font-size: 24px;
}

.icon--accessible::before {
    content: '♿';
    font-size: 24px;
}

.icon--modular::before {
    content: '🧩';
    font-size: 24px;
}

.icon--performance::before {
    content: '⚡';
    font-size: 24px;
}

/* ===================================
   RESPONSIVE DESIGN BREAKPOINTS
   =================================== */

/* Mobile First Approach */
@media (min-width: 640px) {
    .hero {
        padding: var(--space-20) 0 var(--space-16);
    }
    
    .features__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .features__grid {
        grid-template-columns: repeat(4, 1fr);
    }
    
    .hero__actions {
        flex-wrap: nowrap;
    }
}

/* Print Styles */
@media print {
    .header,
    .footer {
        display: none;
    }
    
    .hero {
        padding: var(--space-4) 0;
    }
    
    * {
        color: black !important;
        background: white !important;
    }
}
```

## FILENAME: design/components/README.md
```markdown
# Hello World Design System Components

This folder contains documentation and examples for individual components in the Hello World Design System.

## Component Structure

Each component follows atomic design principles:

- **Atoms**: Basic building blocks (buttons, inputs, icons)
- **Molecules**: Simple combinations (form fields, navigation items)
- **Organisms**: Complex combinations (headers, forms, card grids)
- **Templates**: Page-level layouts
- **Pages**: Specific implementations

## Component Documentation

### Button Component

**Usage:**
```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary btn--large">Large Secondary</button>
```

**Modifiers:**
- `btn--primary` - Primary action button
- `btn--secondary` - Secondary action button
- `btn--success` - Success state button
- `btn--warning` - Warning state button
- `btn--error` - Error state button
- `btn--small` - Small size variant
- `btn--large` - Large size variant

### Form Components

**Input Field:**
```html
<div class="form-field">
  <label for="input" class="form-label">Label Text</label>
  <input type="text" id="input" class="form-input" placeholder="Placeholder">
</div>
```

**Select Dropdown:**
```html
<div class="form-field">
  <label for="select" class="form-label">Select Label</label>
  <select id="select" class="form-select">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

### Card Components

**Basic Card:**
```html
<div class="card">
  <div class="card__body">
    <h3 class="card__title">Card Title</h3>
    <p class="card__text">Card content goes here.</p>
  </div>
</div>
```

**Elevated Card:**
```html
<div class="card card--elevated">
  <div class="card__body">
    <h3 class="card__title">Elevated Card</h3>
    <p class="card__text">This card has shadow elevation.</p>
    <button class="btn btn--primary btn--small">Action</button>
  </div>
</div>
```

## CSS Naming Convention

The design system uses BEM (Block Element Modifier) methodology:

- **Block**: `.card`
- **Element**: `.card__body`, `.card__title`
- **Modifier**: `.card--elevated`, `.btn--primary`

## Responsive Guidelines

- **Mobile First**: All components start with mobile styles
- **Breakpoints**: 
  - Small: 640px+
  - Medium: 768px+
  - Large: 1024px+
  - Extra Large: 1280px+

## Accessibility Features

All components include:
- Proper semantic markup
- ARIA labels where appropriate
- Focus states with visible indicators
- Color contrast ratios meeting WCAG 2.1 AA
- Touch-friendly sizing (44px minimum)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- CSS Custom Properties for theming
- Minimal specificity
- No framework dependencies
- Optimized for CSS minification
- Tree-shakable utility classes
```

<!-- END_OF_RESPONSE -->
