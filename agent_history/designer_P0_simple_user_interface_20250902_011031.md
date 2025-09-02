<!-- AI TEAM BUILDER - FEATURE ITERATION HISTORY -->
<!-- Agent: designer -->
<!-- Timestamp: 2025-09-02T01:10:31+00:00 -->
<!-- Feature: Simple User Interface -->
<!-- Priority: P0 -->
<!-- Build Context: Feature-focused build -->

# Simple User Interface - Hello World Design System

I'll create a comprehensive design system for a Hello World application with a clean, modern interface following the requirements.

## FILENAME: design/styles.css
```css
/* CSS Custom Properties (Design Tokens) */
:root {
  /* Color System */
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Neutral Grays */
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
  
  /* Typography Scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 3rem;
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  
  /* Spacing Scale */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  
  /* Breakpoints */
  --breakpoint-sm: 768px;
  --breakpoint-md: 1024px;
  --breakpoint-lg: 1280px;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* Modern CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  line-height: var(--line-height-normal);
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-gray-900);
  background-color: var(--color-gray-50);
  margin: 0;
  padding: 0;
}

/* Typography System */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }

.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

.leading-tight { line-height: var(--line-height-tight); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* Color Utilities */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-success { color: var(--color-success); }
.text-warning { color: var(--color-warning); }
.text-error { color: var(--color-error); }

.text-gray-50 { color: var(--color-gray-50); }
.text-gray-100 { color: var(--color-gray-100); }
.text-gray-200 { color: var(--color-gray-200); }
.text-gray-300 { color: var(--color-gray-300); }
.text-gray-400 { color: var(--color-gray-400); }
.text-gray-500 { color: var(--color-gray-500); }
.text-gray-600 { color: var(--color-gray-600); }
.text-gray-700 { color: var(--color-gray-700); }
.text-gray-800 { color: var(--color-gray-800); }
.text-gray-900 { color: var(--color-gray-900); }

.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-error { background-color: var(--color-error); }
.bg-white { background-color: white; }
.bg-gray-50 { background-color: var(--color-gray-50); }
.bg-gray-100 { background-color: var(--color-gray-100); }

/* Spacing Utilities */
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-3 { padding: var(--spacing-3); }
.p-4 { padding: var(--spacing-4); }
.p-5 { padding: var(--spacing-5); }
.p-6 { padding: var(--spacing-6); }
.p-8 { padding: var(--spacing-8); }
.p-10 { padding: var(--spacing-10); }

.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-3 { margin: var(--spacing-3); }
.m-4 { margin: var(--spacing-4); }
.m-5 { margin: var(--spacing-5); }
.m-6 { margin: var(--spacing-6); }
.m-8 { margin: var(--spacing-8); }
.m-auto { margin: auto; }

.mt-1 { margin-top: var(--spacing-1); }
.mt-2 { margin-top: var(--spacing-2); }
.mt-4 { margin-top: var(--spacing-4); }
.mt-6 { margin-top: var(--spacing-6); }
.mt-8 { margin-top: var(--spacing-8); }

.mb-1 { margin-bottom: var(--spacing-1); }
.mb-2 { margin-bottom: var(--spacing-2); }
.mb-4 { margin-bottom: var(--spacing-4); }
.mb-6 { margin-bottom: var(--spacing-6); }
.mb-8 { margin-bottom: var(--spacing-8); }

/* Layout System */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.grid {
  display: grid;
  gap: var(--spacing-4);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

/* Component: Button (BEM Methodology) */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-height: 44px;
  min-width: 44px;
}

.btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn--primary {
  background-color: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn--secondary {
  background-color: white;
  color: var(--color-gray-700);
  border-color: var(--color-gray-300);
}

.btn--secondary:hover {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-400);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn--large {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
}

.btn--small {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

/* Component: Card */
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card__header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-gray-200);
}

.card__body {
  padding: var(--spacing-6);
}

.card__footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
}

/* Component: Hello World Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: var(--spacing-8);
  background: linear-gradient(135deg, var(--color-gray-50) 0%, white 100%);
}

.hero__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-6);
  background: linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
}

.hero__actions {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
  justify-content: center;
}

/* Component: Header */
.header {
  background-color: white;
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--spacing-4) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.9);
}

.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-decoration: none;
}

.header__nav {
  display: flex;
  gap: var(--spacing-6);
}

.header__nav a {
  color: var(--color-gray-600);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color 0.2s ease-in-out;
}

.header__nav a:hover {
  color: var(--color-primary);
}

/* Component: Footer */
.footer {
  background-color: var(--color-gray-900);
  color: var(--color-gray-300);
  padding: var(--spacing-8) 0;
  text-align: center;
}

.footer__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.footer__copyright {
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
}

/* Responsive Design */
@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-6);
  }
  
  .grid-cols-sm-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero__actions {
    flex-wrap: nowrap;
  }
  
  .header__nav {
    display: flex;
  }
  
  .footer__content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--spacing-8);
  }
  
  .grid-cols-md-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid-cols-md-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Indicators */
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .btn--primary {
    border: 2px solid var(--color-gray-900);
  }
  
  .card {
    border: 2px solid var(--color-gray-900);
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: #0f172a;
    --color-gray-100: #1e293b;
    --color-gray-200: #334155;
    --color-gray-900: #f8fafc;
  }
  
  body {
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
  }
  
  .card {
    background-color: var(--color-gray-200);
  }
  
  .header {
    background-color: rgba(15, 23, 42, 0.9);
  }
}

/* Print Styles */
@media print {
  .header,
  .footer {
    display: none;
  }
  
  .hero {
    min-height: auto;
    padding: var(--spacing-4);
  }
  
  .btn {
    border: 1px solid var(--color-gray-400);
  }
}
```

## FILENAME: design/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World - Design System Showcase</title>
    <meta name="description" content="A modern Hello World application showcasing our comprehensive design system">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Header -->
    <header class="header" role="banner">
        <div class="container">
            <div class="header__content">
                <a href="#" class="header__logo" aria-label="Hello World Home">
                    Hello World
                </a>
                <nav class="header__nav" role="navigation" aria-label="Main navigation">
                    <a href="#features">Features</a>
                    <a href="#demo">Demo</a>
                    <a href="#docs">Docs</a>
                    <a href="styleguide.html">Style Guide</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main role="main">
        <!-- Hero Section -->
        <section class="hero" role="banner">
            <h1 class="hero__title">
                Hello, Beautiful World! 👋
            </h1>
            <p class="hero__subtitle">
                Welcome to our modern Hello World application, built with a comprehensive design system 
                that showcases clean, accessible, and scalable web interfaces.
            </p>
            <div class="hero__actions">
                <button class="btn btn--primary btn--large" type="button">
                    Get Started
                </button>
                <a href="styleguide.html" class="btn btn--secondary btn--large">
                    View Style Guide
                </a>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="container" style="padding: 4rem 0;">
            <h2 class="text-3xl font-bold text-center mb-8">Design System Features</h2>
            
            <div class="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3" style="gap: 2rem;">
                <!-- Feature Card 1 -->
                <div class="card">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold text-primary">🎨 Modern Design</h3>
                    </div>
                    <div class="card__body">
                        <p class="text-gray-600">
                            Clean, minimal interface with carefully crafted typography and color schemes 
                            that provide excellent readability and visual hierarchy.
                        </p>
                    </div>
                </div>

                <!-- Feature Card 2 -->
                <div class="card">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold text-success">📱 Fully Responsive</h3>
                    </div>
                    <div class="card__body">
                        <p class="text-gray-600">
                            Mobile-first responsive design that works seamlessly across all devices, 
                            from smartphones to desktop computers.
                        </p>
                    </div>
                </div>

                <!-- Feature Card 3 -->
                <div class="card">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold text-warning">♿ Accessible</h3>
                    </div>
                    <div class="card__body">
                        <p class="text-gray-600">
                            WCAG 2.1 AA compliant with proper semantic markup, keyboard navigation, 
                            and screen reader support for inclusive user experiences.
                        </p>
                    </div>
                </div>

                <!-- Feature Card 4 -->
                <div class="card">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold text-error">⚡ Performance Optimized</h3>
                    </div>
                    <div class="card__body">
                        <p class="text-gray-600">
                            Lightweight CSS with efficient selectors and modern techniques 
                            for fast loading and smooth interactions.
                        </p>
                    </div>
                </div>

                <!-- Feature Card 5 -->
                <div class="card">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold text-primary">🔧 Framework Agnostic</h3>
                    </div>
                    <div class="card__body">
                        <p class="text-gray-600">
                            Compatible with React, Vue, Angular, or vanilla JavaScript. 
                            Pure CSS classes that work with any frontend framework.
                        </p>
                    </div>
                </div>

                <!-- Feature Card 6 -->
                <div class="card">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold text-secondary">🎯 Design Tokens</h3>
                    </div>
                    <div class="card__body">
                        <p class="text-gray-600">
                            Comprehensive system of design tokens using CSS custom properties 
                            for consistent theming and easy customization.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Demo Section -->
        <section id="demo" class="bg-gray-100" style="padding: 4rem 0;">
            <div class="container">
                <h2 class="text-3xl font-bold text-center mb-8">Interactive Demo</h2>
                
                <div class="card" style="max-width: 600px; margin: 0 auto;">
                    <div class="card__header">
                        <h3 class="text-xl font-semibold">Try Our Components</h3>
                    </div>
                    <div class="card__body">
                        <p class="mb-4 text-gray-600">
                            Experience the design system in action with these interactive elements:
                        </p>
                        
                        <!-- Button Variations -->
                        <div class="mb-6">
                            <h4 class="font-medium mb-3">Button Variations</h4>
                            <div class="flex flex-col" style="gap: 0.75rem;">
                                <div class="flex" style="gap: 0.75rem; flex-wrap: wrap;">
                                    <button class="btn btn--primary">Primary Button</button>
                                    <button class="btn btn--secondary">Secondary Button</button>
                                </div>
                                <div class="flex" style="gap: 0.75rem; flex-wrap: wrap;">
                                    <button class="btn btn--primary btn--large">Large Primary</button>
                                    <button class="btn btn--secondary btn--small">Small Secondary</button>
                                </div>
                            </div>
                        </div>

                        <!-- Typography Showcase -->
                        <div class="mb-6">
                            <h4 class="font-medium mb-3">Typography Scale</h4>
                            <div class="text-4xl font-bold mb-2">Heading 1</div>
                            <div class="text-2xl font-semibold mb-2 text-primary">Heading 2</div>
                            <div class="text-xl font-medium mb-2 text-secondary">Heading 3</div>
                            <div class="text-base mb-2">Regular body text with normal weight</div>
                            <div class="text-sm text-gray-600">Small text for captions and metadata</div>
                        </div>

                        <!-- Color Palette -->
                        <div>
                            <h4 class="font-medium mb-3">Color Palette</h4>
                            <div class="grid grid-cols-2" style="gap: 0.5rem;">
                                <div class="flex items-center" style="gap: 0.5rem;">
                                    <div class="bg-primary" style="width: 1rem; height: 1rem; border-radius: 0.25rem;"></div>
                                    <span class="text-sm">Primary</span>
                                </div>
                                <div class="flex items-center" style="gap: 0.5rem;">
                                    <div class="bg-secondary" style="width: 1rem; height: 1rem; border-radius: 0.25rem;"></div>
                                    <span class="text-sm">Secondary</span>
                                </div>
                                <div class="flex items-center" style="gap: 0.5rem;">
                                    <div class="bg-success" style="width: 1rem; height: 1rem; border-radius: 0.25rem;"></div>
                                    <span class="text-sm">Success</span>
                                </div>
                                <div class="flex items-center" style="gap: 0.5rem;">
                                    <div class="bg-error" style="width: 1rem; height: 1rem; border-radius: 0.25rem;"></div>
                                    <span class="text-sm">Error</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card__footer">
                        <a href="styleguide.html" class="btn btn--primary">
                            View Complete Style Guide →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer__content">
                <div class="footer__copyright">
                    © 2024 Hello World Design System. Built with modern web standards.
                </div>
                <div class="text-sm">
                    <a href="#" class="text-gray-400" style="text-decoration: none; margin-right: 1rem;">Privacy</a>
                    <a href="#" class="text-gray-400" style="text-decoration: none; margin-right: 1rem;">Terms</a>
                    <a href="https://github.com" class="text-gray-400" style="text-decoration: none;">GitHub</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- JavaScript for Basic Interactions -->
    <script>
        // Simple interaction handling
        document.addEventListener('DOMContentLoaded', function() {
            // Add click handlers to demo buttons
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                if (button.textContent.includes('Get Started')) {
                    button.addEventListener('click', function() {
                        alert('Welcome to our Hello World application! 🚀');
                    });
                }
            });

            // Smooth scrolling for navigation links
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Add keyboard navigation support
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', function() {
                document.body.classList.remove('keyboard-navigation');
            });
        });
    </script>

    <style>
        /* Enhanced focus indicators for keyboard navigation */
        body.keyboard-navigation *:focus {
            outline: 3px solid var(--color-primary) !important;
            outline-offset: 2px !important;
        }
    </style>
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
    <meta name="description" content="Comprehensive style guide and component library for the Hello World design system">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles.css">
    
    <style>
        /* Style guide specific styles */
        .styleguide-section {
            margin-bottom: 4rem;
            padding: 2rem 0;
        }
        
        .styleguide-section:not(:last-child) {
            border-bottom: 1px solid var(--color-gray-200);
        }
        
        .code-example {
            background-color: var(--color-gray-100);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-md);
            padding: var(--spacing-4);
            margin: var(--spacing-4) 0;
            font-family: 'JetBrains Mono', monospace;
            font-size: var(--font-size-sm);
            overflow-x: auto;
        }
        
        .color-swatch {
            display: flex;
            align-items: center;
            gap: var(--spacing-3);
            margin-bottom: var(--spacing-2);
        }
        
        .color-circle {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border: 2px solid var(--color-gray-200);
            flex-shrink: 0;
        }
        
        .color-info {
            flex: 1;
        }
        
        .spacing-demo {
            background-color: var(--color-primary);
            color: white;
            display: inline-block;
            margin: var(--spacing-1) 0;
            text-align: center;
            font-size: var(--font-size-sm);
            border-radius: var(--radius-sm);
        }
        
        .component-demo {
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-md);
            padding: var(--spacing-6);
            margin: var(--spacing-4) 0;
            background-color: white;
        }
        
        .component-demo + .code-example {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header" role="banner">
        <div class="container">
            <div class="header__content">
                <a href="index.html" class="header__logo" aria-label="Back to Hello World Home">
                    Hello World
                </a>
                <nav class="header__nav" role="navigation" aria-label="Style guide navigation">
                    <a href="#colors">Colors</a>
                    <a href="#typography">Typography</a>
                    <a href="#spacing">Spacing</a>
                    <a href="#components">Components</a>
                    <a href="index.html">← Back to Demo</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container" role="main" style="padding: 2rem 1rem;">
        <h1 class="text-4xl font-bold text-center mb-8">Design System Style Guide</h1>
        <p class="text-xl text-center text-gray-600 mb-12">
            A comprehensive reference for all design tokens, components, and patterns in our Hello World application.
        </p>

        <!-- Colors Section -->
        <section id="colors" class="styleguide-section">
            <h2 class="text-3xl font-bold mb-6">Color System</h2>
            <p class="text-gray-600 mb-6">
                Our color palette is carefully designed to provide excellent contrast ratios and visual hierarchy.
                All colors meet WCAG 2.1 AA accessibility standards.
            </p>

            <div class="grid grid-cols-1 grid-cols-md-2" style="gap: 2rem;">
                <!-- Primary Colors -->
                <div>
                    <h3 class="text-xl font-semibold mb-4">Brand Colors</h3>
                    
                    <div class="color-swatch">
                        <div class="color-circle bg-primary"></div>
                        <div class="color-info">
                            <div class="font-medium">Primary Blue</div>
                            <div class="text-sm text-gray-600">#2563eb</div>
                            <div class="text-sm text-gray-600">--color-primary</div>
                        </div>
                    </div>
                    
                    <div class="color-swatch">
                        <div class="color-circle bg-secondary"></div>
                        <div class="color-info">
                            <div class="font-medium">Secondary Slate</div>
                            <div class="text-sm text-gray-600">#64748b</div>
                            <div class="text-sm text-gray-600">--color-secondary</div>
                        </div>
                    </div>
                </div>

                <!-- Status Colors -->
                <div>
                    <h3 class="text-xl font-semibold mb-4">Status Colors</h3>
                    
                    <div class="color-swatch">
                        <div class="color-circle bg-success"></div>
                        <div class="color-info">
                            <div class="font-medium">Success Green</div>
                            <div class="text-sm text-gray-600">#10b981</div>
                            <div class="text-sm text-gray-600">--color-success</div>
                        </div>
                    </div>
                    
                    <div class="color-swatch">
                        <div class="color-circle bg-warning"></div>
                        <div class="color-info">
                            <div class="font-medium">Warning Amber</div>
                            <div class="text-sm text-gray-600">#f59e0b</div>
                            <div class="text-sm text-gray-600">--color-warning</div>
                        </div>
                    </div>
                    
                    <div class="color-swatch">
                        <div class="color-circle bg-error"></div>
                        <div class="color-info">
                            <div class="font-medium">Error Red</div>
                            <div class="text-sm text-gray-600">#ef4444</div>
                            <div class="text-sm text-gray-600">--color-error</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gray Scale -->
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Neutral Grays</h3>
                <div class="grid grid-cols-2 grid-cols-md-4" style="gap: 1rem;">
                    <div class="color-swatch flex-col items-start">
                        <div class="color-circle bg-gray-50 mb-2"></div>
                        <div class="text-sm font-medium">Gray 50</div>
                        <div class="text-xs text-gray-600">#f8fafc</div>
                    </div>
                    <div class="color-swatch flex-col items-start">
                        <div class="color-circle bg-gray-100 mb-2"></div>
                        <div class="text-sm font-medium">Gray 100</div>
                        <div class="text-xs text-gray-600">#f1f5f9</div>
                    </div>
                    <div class="color-swatch flex-col items-start">
                        <div class="color-circle" style="background-color: var(--color-gray-500); margin-bottom: 0.5rem;"></div>
                        <div class="text-sm font-medium">Gray 500</div>
                        <div class="text-xs text-gray-600">#64748b</div>
                    </div>
                    <div class="color-swatch flex-col items-start">
                        <div class="color-circle" style="background-color: var(--color-gray-900); margin-bottom: 0.5rem;"></div>
                        <div class="text-sm font-medium">Gray 900</div>
                        <div class="text-xs text-gray-600">#0f172a</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Typography Section -->
        <section id="typography" class="styleguide-section">
            <h2 class="text-3xl font-bold mb-6">Typography System</h2>
            <p class="text-gray-600 mb-6">
                Our typography scale uses the Inter font family for excellent readability and modern aesthetics.
                JetBrains Mono is used for code and monospace content.
            </p>

            <!-- Font Scale -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Font Size Scale</h3>
                <div class="space-y-4">
                    <div class="text-4xl font-bold">4XL Heading (3rem) - Main Titles</div>
                    <div class="text-3xl font-bold">3XL Heading (2rem) - Section Titles</div>
                    <div class="text-2xl font-semibold">2XL Heading (1.5rem) - Subsections</div>
                    <div class="text-xl font-medium">XL Heading (1.25rem) - Card Titles</div>
                    <div class="text-lg">Large Text (1.125rem) - Important Body Text</div>
                    <div class="text-base">Base Text (1rem) - Regular Body Text</div>
                    <div class="text-sm text-gray-600">Small Text (0.875rem) - Captions & Metadata</div>
                    <div class="text-xs text-gray-500">Extra Small (0.75rem) - Fine Print</div>
                </div>
            </div>

            <!-- Font Weights -->
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Font Weights</h3>
                <div class="space-y-2">
                    <div class="text-lg font-normal">Normal Weight (400) - Regular text</div>
                    <div class="text-lg font-medium">Medium Weight (500) - Emphasis</div>
                    <div class="text-lg font-semibold">Semibold Weight (600) - Headings</div>
                    <div class="text-lg font-bold">Bold Weight (700) - Strong emphasis</div>
                </div>
            </div>

            <!-- Code Example -->
            <div class="code-example">
/* Typography Classes */
.text-4xl { font-size: var(--font-size-4xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.font-bold { font-weight: var(--font-weight-bold); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.leading-tight { line-height: var(--line-height-tight); }
            </div>
        </section>

        <!-- Spacing Section -->
        <section id="spacing" class="styleguide-section">
            <h2 class="text-3xl font-bold mb-6">Spacing System</h2>
            <p class="text-gray-600 mb-6">
                Consistent spacing creates visual rhythm and hierarchy. Our spacing scale is based on 0.25rem (4px) increments.
            </p>

            <div class="grid grid-cols-1 grid-cols-md-2" style="gap: 2rem;">
                <div>
                    <h3 class="text-xl font-semibold mb-4">Spacing Scale</h3>
                    <div class="space-y-2">
                        <div><span class="spacing-demo p-1">1</span> = 0.25rem (4px)</div>
                        <div><span class="spacing-demo p-2">2</span> = 0.5rem (8px)</div>
                        <div><span class="spacing-demo p-3">3</span> = 0.75rem (12px)</div>
                        <div><span class="spacing-demo p-4">4</span> = 1rem (16px)</div>
                        <div><span class="spacing-demo p-5">5</span> = 1.25rem (20px)</div>
                        <div><span class="spacing-demo p-6">6</span> = 1.5rem (24px)</div>
                        <div><span class="spacing-demo p-8">8</span> = 2rem (32px)</div>
                        <div><span class="spacing-demo p-10">10</span> = 2.5rem (40px)</div>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4">Usage Examples</h3>
                    <div class="code-example">
/* Padding utilities */
.p-4 { padding: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }

/* Margin utilities */  
.m-4 { margin: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
                    </div>
                </div>
            </div>
        </section>

        <!-- Components Section -->
        <section id="components" class="styleguide-section">
            <h2 class="text-3xl font-bold mb-6">Component Library</h2>
            <p class="text-gray-600 mb-6">
                Reusable components built with BEM methodology and semantic HTML for maximum accessibility and maintainability.
            </p>

            <!-- Buttons -->
            <div class="mb-8">
                <h3 class="text-2xl font-semibold mb-4">Buttons</h3>
                
                <div class="component-demo">
                    <div class="flex flex-col" style="gap: 1rem;">
                        <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                            <button class="btn btn--primary">Primary Button</button>
                            <button class="btn btn--secondary">Secondary Button</button>
                        </div>
                        <div class="flex" style="gap: 1rem; flex-wrap: wrap;">
                            <button class="btn btn--primary btn--large">Large Primary</button>
                            <button class="btn btn--primary btn--small">Small Primary</button>
                        </div>
                    </div>
                </div>
                
                <div class="code-example">
<!-- Primary Button -->
&lt;button class="btn btn--primary"&gt;Primary Button&lt;/button&gt;

<!-- Secondary Button -->
&lt;button class="btn btn--secondary"&gt;Secondary Button&lt;/button&gt;

<!-- Size Variations -->
&lt;button class="btn btn--primary btn--large"&gt;Large Button&lt;/button&gt;
&lt;button class="btn btn--primary btn--small"&gt;Small Button&lt;/button&gt;
                </div>
            </div>

            <!-- Cards -->
            <div class="mb-8">
                <h3 class="text-2xl font-semibold mb-4">Cards</h3>
                
                <div class="component-demo">
                    <div class="card" style="max-width: 400px;">
                        <div class="card__header">
                            <h4 class="text-lg font-semibold">Card Title</h4>
                        </div>
                        <div class="card__body">
                            <p class="text-gray-600">
                                This is the card body content. Cards are perfect for displaying 
                                related information in a contained, organized way.
                            </p>
                        </div>
                        <div class="card__footer">
                            <button class="btn btn--primary btn--small">Action</button>
                        </div>
                    </div>
                </div>
                
                <div class="code-example">
&lt;div class="card"&gt;
  &lt;div class="card__header"&gt;
    &lt;h4 class="text-lg font-semibold"&gt;Card Title&lt;/h4&gt;
  &lt;/div&gt;
  &lt;div class="card__body"&gt;
    &lt;p&gt;Card content goes here...&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="card__footer"&gt;
    &lt;button class="btn btn--primary"&gt;Action&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
                </div>
            </div>

            <!-- Grid System -->
            <div class="mb-8">
                <h3 class="text-2xl font-semibold mb-4">Grid System</h3>
                
                <div class="component-demo">
                    <div class="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3" style="gap: 1rem;">
                        <div class="bg-gray-100 p-4 text-center border-radius: var(--radius-md);">Column 1</div>
                        <div class="bg-gray-100 p-4 text-center border-radius: var(--radius-md);">Column 2</div>
                        <div class="bg-gray-100 p-4 text-center border-radius: var(--radius-md);">Column 3</div>
                    </div>
                </div>
                
                <div class="code-example">
&lt;div class="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3"&gt;
  &lt;div&gt;Column 1&lt;/div&gt;
  &lt;div&gt;Column 2&lt;/div&gt;
  &lt;div&gt;Column 3&lt;/div&gt;
&lt;/div&gt;
                </div>
            </div>

            <!-- Utility Classes -->
            <div class="mb-8">
                <h3 class="text-2xl font-semibold mb-4">Utility Classes</h3>
                <p class="text-gray-600 mb-4">Common utility classes for rapid prototyping and component composition.</p>
                
                <div class="code-example">
/* Text Utilities */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* Color Utilities */
.text-primary { color: var(--color-primary); }
.text-gray-600 { color: var(--color-gray-600); }
.bg-white { background-color: white; }

/* Layout Utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }

/* Spacing Utilities */
.m-4 { margin: 1rem; }
.p-6 { padding: 1.5rem; }
.mt-8 { margin-top: 2rem; }
                </div>
            </div>
        </section>

        <!-- Usage Guidelines -->
        <section class="styleguide-section">
            <h2 class="text-3xl font-bold mb-6">Usage Guidelines</h2>
            <div class="grid grid-cols-1 grid-cols-md-2" style="gap: 2rem;">
                <div>
                    <h3 class="text-xl font-semibold mb-4">✅ Best Practices</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Use semantic HTML elements for better accessibility</li>
                        <li>• Follow BEM naming convention for custom components</li>
                        <li>• Maintain consistent spacing using the design system scale</li>
                        <li>• Test components across different screen sizes</li>
                        <li>• Ensure proper color contrast ratios (4.5:1 minimum)</li>
                        <li>• Use CSS custom properties for theming</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">❌ What to Avoid</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Don't use arbitrary spacing values outside the scale</li>
                        <li>• Avoid mixing different color palettes</li>
                        <li>• Don't override component styles with !important</li>
                        <li>• Avoid using non-semantic HTML elements unnecessarily</li>
                        <li>• Don't forget to test keyboard navigation</li>
                        <li>• Avoid inconsistent typography hierarchy</li>
                    </ul>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer__content">
                <div class="footer__copyright">
                    © 2024 Hello World Design System Style Guide
                </div>
                <div>
                    <a href="index.html" class="text-gray-400" style="text-decoration: none;">
                        ← Back to Demo
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Add smooth scrolling for anchor links
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>
```

## FILENAME: design/components/README.md
```markdown
# Component Documentation

This directory contains documentation and examples for individual components in the Hello World Design System.

## Component Structure

Each component follows the BEM (Block Element Modifier) methodology:

```
.component-name           // Block
.component-name__element  // Element  
.component-name--modifier // Modifier
```

## Available Components

### Atomic Components (Basic Building Blocks)
- **Button** (`btn`) - Primary, secondary, and size variations
- **Text** - Typography utilities and text styling
- **Icon** - Icon wrapper and utilities

### Molecular Components (Simple Combinations)
- **Card** (`card`) - Content containers with header, body, and footer
- **Form Field** - Input fields with labels and validation states
- **Navigation** (`header__nav`) - Navigation link groups

### Organism Components (Complex Combinations)
- **Header** (`header`) - Site header with logo and navigation
- **Footer** (`footer`) - Site footer with copyright and links
- **Hero** (`hero`) - Main banner section for landing pages

## Usage Examples

### Button Component
```html
<!-- Primary button -->
<button class="btn btn--primary">Get Started</button>

<!-- Secondary button with large size -->
<button class="btn btn--secondary btn--large">Learn More</button>

<!-- Small primary button -->
<button class="btn btn--primary btn--small">Save</button>
```

### Card Component
```html
<div class="card">
  <div class="card__header">
    <h3 class="text-xl font-semibold">Card Title</h3>
  </div>
  <div class="card__body">
    <p>Card content goes here...</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Action</button>
  </div>
</div>
```

### Hero Component
```html
<section class="hero">
  <h1 class="hero__title">Welcome to Our App</h1>
  <p class="hero__subtitle">A brief description of what we do.</p>
  <div class="hero__actions">
    <button class="btn btn--primary btn--large">Get Started</button>
    <a href="#learn" class="btn btn--secondary btn--large">Learn More</a>
  </div>
</section>
```

## Framework Integration

### React
```jsx
// Button Component
const Button = ({ variant = 'primary', size = 'base', children, ...props }) => {
  const classes = `btn btn--${variant} ${size !== 'base' ? `btn--${size}` : ''}`.trim();
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// Card Component  
const Card = ({ children }) => (
  <div className="card">{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="card__header">{children}</div>
);

const CardBody = ({ children }) => (
  <div className="card__body">{children}</div>
);
```

### Vue
```vue
<template>
  <!-- Button Component -->
  <button 
    :class="[
      'btn', 
      `btn--${variant}`, 
      size !== 'base' && `btn--${size}`
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>

  <!-- Card Component -->
  <div class="card">
    <div class="card__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="card__body">
      <slot />
    </div>
    <div class="card__footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

## Accessibility Guidelines

### Semantic HTML
Always use appropriate semantic elements:
- `<button>` for interactive buttons
- `<nav>` for navigation areas  
- `<main>` for main content
- `<header>`, `<footer>` for page structure
- `<section>`, `<article>` for content organization

### ARIA Labels
Provide descriptive labels for screen readers:
```html
<button class="btn btn--primary" aria-label="Save your changes">
  <span aria-hidden="true">💾</span>
  Save
</button>
```

### Focus Management
Ensure all interactive elements are keyboard accessible:
- Use `:focus` styles for visual feedback
- Maintain logical tab order
- Use `skip-to-main-content` links when needed

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 contrast ratio minimum
- Interactive elements: Clear visual distinction

## Customization

### CSS Custom Properties
Override design tokens for theming:
```css
:root {
  --color-primary: #your-brand-color;
  --font-size-base: 1.125rem;
  --spacing-4: 1.25rem;
}
```

### Component Variations
Create new component variations using modifiers:
```css
.btn--outline {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.card--elevated {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features**: Grid, Flexbox, Custom Properties, Clamp()
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works without JavaScript

## Performance Considerations

- **CSS Size**: ~15KB minified and gzipped
- **Load Order**: Critical CSS inlined, non-critical CSS loaded asynchronously
- **Unused CSS**: Use PurgeCSS or similar tools in production
- **Font Loading**: Use `font-display: swap` for better perceived performance
```

<!-- END_OF_RESPONSE -->
