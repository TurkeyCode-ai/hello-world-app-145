/**
 * Main Application Entry Point
 * Initializes the Hello World application with accessibility features
 */

(function() {
  'use strict';
  
  let helloWorldComponent = null;
  let accessibleApp = null;
  let mainApp = null;

  // Enhanced application state
  const AppState = {
    initialized: false,
    components: {},
    config: {
      version: '1.0.0',
      name: 'Hello World App',
      debug: false
    },
    browserInfo: null
  };

  /**
   * Main Hello World Application Class
   * Manages global app state, components, and application lifecycle
   */
  class HelloWorldApp {
    constructor() {
      this.components = {};
      this.state = {
        isInitialized: false,
        theme: 'light',
        lastActivity: Date.now()
      };
      this.announcer = null;
    }
    
    /**
     * Initialize the application
     */
    async init() {
      try {
        if (window.HelperUtils) {
          HelperUtils.log('Initializing Hello World Application');
        }

        // Log application start with enhanced details
        console.log(`🚀 Initializing ${AppState.config.name} v${AppState.config.version}`);
        
        // Get browser information
        AppState.browserInfo = window.AppUtils?.getBrowserInfo() || window.HelperUtils?.getBrowserInfo() || {};
        console.log('Browser Info:', AppState.browserInfo);
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
          });
        }

        // Initialize components and features
        this.initializeComponents();
        this.setupGlobalEventListeners();
        this.setupAccessibility();
        this.setupPerformanceMonitoring();
        this.setupErrorHandling();
        this.performAccessibilityChecks();

        // Mark app as initialized
        this.state.isInitialized = true;
        AppState.initialized = true;

        if (window.HelperUtils) {
          HelperUtils.log('Hello World Application initialized successfully');
        }
        console.log('✅ Application initialized successfully');

        // Dispatch custom event for initialization complete
        document.dispatchEvent(new CustomEvent('app:initialized', {
          detail: {
            timestamp: Date.now(),
            config: AppState.config,
            browserInfo: AppState.browserInfo
          }
        }));

        // Show welcome message after initialization
        this.showWelcomeMessage();
      } catch (error) {
        if (window.HelperUtils) {
          HelperUtils.log(`Failed to initialize application: ${error.message}`, 'error');
        }
        console.error('❌ Failed to initialize application:', error);
        this.handleInitializationError(error);
      }
    }

    /**
     * Initialize all components
     */
    initializeComponents() {
      try {
        // Initialize HelloWorld component
        if (window.HelloWorldComponent) {
          this.components.helloWorld = new HelloWorldComponent('helloWorldComponent');
          if (typeof this.components.helloWorld.init === 'function') {
            this.components.helloWorld.init();
          }
          console.log('✅ HelloWorld component initialized');
        } else {
          console.warn('⚠️ HelloWorld component not found');
        }

        // Initialize accessible app features
        if (window.AccessibleHelloWorldApp || AccessibleHelloWorldApp) {
          this.components.accessibleApp = new AccessibleHelloWorldApp();
          console.log('✅ Accessible app features initialized');
        }

        // Update AppState components
        AppState.components = this.components;

        if (window.HelperUtils) {
          HelperUtils.log('All components initialized');
        }
      } catch (error) {
        if (window.HelperUtils) {
          HelperUtils.log(`Component initialization failed: ${error.message}`, 'error');
        }
        throw error;
      }
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEventListeners() {
      // Handle window resize for responsive adjustments
      let handleResize;
      if (window.HelperUtils) {
        handleResize = HelperUtils.debounce(() => {
          this.handleWindowResize();
        }, 250);
      } else if (window.AppUtils) {
        handleResize = AppUtils.debounce(() => {
          this.handleWindowResize();
        }, 250);
      } else {
        handleResize = this.debounce(() => {
          this.handleWindowResize();
        }, 250);
      }
      
      window.addEventListener('resize', handleResize);

      // Handle visibility change for performance optimization
      document.addEventListener('visibilitychange', () => {
        this.handleVisibilityChange();
      });

      // Handle beforeunload for cleanup
      window.addEventListener('beforeunload', () => {
        this.handleBeforeUnload();
      });

      // Handle keyboard navigation
      document.addEventListener('keydown', (event) => {
        this.handleGlobalKeydown(event);
      });

      // Update last activity timestamp
      const updateActivity = () => {
        this.state.lastActivity = Date.now();
      };

      ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, updateActivity, { passive: true });
      });

      // Handle global errors
      window.addEventListener('error', (event) => {
        console.error('Global error caught:', event.error);
        this.handleGlobalError(event.error);
      });

      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        this.handleGlobalError(event.reason);
      });

      // Handle orientation changes
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          this.handleOrientationChange();
        }, 100);
      });

      // Setup component event listeners
      this.setupComponentEventListeners();
    }

    /**
     * Setup component-specific event listeners
     */
    setupComponentEventListeners() {
      // Listen to custom events if EventEmitter is available
      if (window.HelperUtils && window.HelperUtils.EventEmitter) {
        HelperUtils.EventEmitter.on('greeting:generated', (data) => {
          this.trackUserInteraction('greeting_generated', data);
        });

        HelperUtils.EventEmitter.on('component:reset', (data) => {
          this.trackUserInteraction('component_reset', data);
        });

        HelperUtils.EventEmitter.on('component:error', (data) => {
          if (window.HelperUtils) {
            HelperUtils.log(`Component error: ${data.error}`, 'error');
          }
        });
      }

      // Listen for app-specific events
      document.addEventListener('app:escape', () => {
        this.handleEscapeKey();
      });

      document.addEventListener('app:resize', (event) => {
        // Dispatch to components
        Object.values(this.components).forEach(component => {
          if (component && typeof component.handleResize === 'function') {
            component.handleResize(event.detail);
          }
        });
      });
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
      // Add skip link for keyboard navigation
      this.addSkipLink();
      
      // Setup focus management
      this.setupFocusManagement();
      
      // Setup ARIA live regions
      this.setupAriaLiveRegions();

      if (window.HelperUtils) {
        HelperUtils.log('Accessibility features initialized');
      }
    }

    /**
     * Add skip link for keyboard navigation
     */
    addSkipLink() {
      // Check if skip link already exists
      if (document.querySelector('.skip-link')) return;

      const skipLink = document.createElement('a');
      skipLink.href = '#hello-world-section, #main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
      `;

      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
      });

      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });

      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
      let lastFocusedElement = null;

      document.addEventListener('focusin', (event) => {
        lastFocusedElement = event.target;
      });

      // Store reference for potential focus restoration
      this.restoreFocus = () => {
        if (lastFocusedElement && document.contains(lastFocusedElement)) {
          lastFocusedElement.focus();
        }
      };
    }

    /**
     * Setup ARIA live regions for dynamic announcements
     */
    setupAriaLiveRegions() {
      // Check if announcer already exists from AccessibleHelloWorldApp
      let announcer = document.getElementById('app-announcer');
      
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'app-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        `;
        document.body.appendChild(announcer);
      }

      this.announcer = announcer;
      this.announce = (message) => {
        this.announcer.textContent = message;
        setTimeout(() => {
          this.announcer.textContent = '';
        }, 1000);
      };
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
      // Monitor page load performance
      if ('performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
              const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
              if (window.HelperUtils) {
                HelperUtils.log(`Page load time: ${loadTime}ms`);
              }
            }
          }, 0);
        });
      }

      // Monitor memory usage (if available)
      if ('memory' in performance) {
        setInterval(() => {
          const memInfo = performance.memory;
          if (memInfo.usedJSHeapSize > memInfo.jsHeapSizeLimit * 0.9) {
            if (window.HelperUtils) {
              HelperUtils.log('High memory usage detected', 'warn');
            }
          }
        }, 30000); // Check every 30 seconds
      }
    }

    /**
     * Setup global error handling
     */
    setupErrorHandling() {
      window.addEventListener('error', (event) => {
        if (window.HelperUtils) {
          HelperUtils.log(`Global error: ${event.error?.message || event.message}`, 'error');
        }
        this.handleGlobalError(event.error);
      });

      window.addEventListener('unhandledrejection', (event) => {
        if (window.HelperUtils) {
          HelperUtils.log(`Unhandled promise rejection: ${event.reason}`, 'error');
        }
        this.handleGlobalError(event.reason);
      });
    }

    /**
     * Perform basic accessibility checks
     */
    performAccessibilityChecks() {
      const checks = [];
      
      // Check for images without alt text
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        checks.push(`Found ${images.length} images without alt text`);
      }
      
      // Check for buttons without accessible names
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      const buttonsWithoutText = Array.from(buttons).filter(btn => !btn.textContent.trim());
      if (buttonsWithoutText.length > 0) {
        checks.push(`Found ${buttonsWithoutText.length} buttons without accessible names`);
      }
      
      // Check for form inputs without labels
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      const inputsWithoutLabels = Array.from(inputs).filter(input => {
        const id = input.id;
        return !id || !document.querySelector(`label[for="${id}"]`);
      });
      if (inputsWithoutLabels.length > 0) {
        checks.push(`Found ${inputsWithoutLabels.length} inputs without proper labels`);
      }
      
      if (checks.length > 0) {
        console.warn('⚠️ Accessibility issues found:', checks);
        if (window.HelperUtils) {
          HelperUtils.log('Accessibility issues found: ' + checks.join(', '), 'warn');
        }
      } else {
        console.log('✅ Basic accessibility checks passed');
      }
    }

    /**
     * Handle window resize events
     */
    handleWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (window.HelperUtils) {
        HelperUtils.log(`Window resized: ${width}x${height}`);
        
        if (HelperUtils.EventEmitter) {
          HelperUtils.EventEmitter.emit('window:resize', { width, height });
        }
      }

      console.log('Window resized:', { width, height });
      
      // Dispatch resize event for components
      document.dispatchEvent(new CustomEvent('app:resize', {
        detail: { width, height }
      }));

      // Handle mobile menu closure for accessibility
      if (width >= 768) {
        const navToggle = document.querySelector('.nav__toggle');
        if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
          if (this.components.accessibleApp && this.components.accessibleApp.toggleNavigation) {
            this.components.accessibleApp.toggleNavigation();
          }
        }
      }

      // Update responsive elements
      this.updateResponsiveElements();

      // Delegate to existing resize handler if available
      if (typeof handleWindowResize === 'function') {
        handleWindowResize();
      }
    }

    /**
     * Handle visibility change events
     */
    handleVisibilityChange() {
      if (document.hidden) {
        if (window.HelperUtils) {
          HelperUtils.log('App became hidden');
          if (HelperUtils.EventEmitter) {
            HelperUtils.EventEmitter.emit('app:hidden');
          }
        }
        console.log('📱 App hidden');
        this.pauseAnimations();
      } else {
        if (window.HelperUtils) {
          HelperUtils.log('App became visible');
          if (HelperUtils.EventEmitter) {
            HelperUtils.EventEmitter.emit('app:visible');
          }
        }
        console.log('👁️ App visible');
        this.resumeAnimations();
      }

      // Delegate to existing visibility change handler if available
      if (typeof handleVisibilityChange === 'function') {
        handleVisibilityChange();
      }
    }

    /**
     * Handle orientation changes
     */
    handleOrientationChange() {
      this.updateResponsiveElements();
      if (window.HelperUtils) {
        HelperUtils.log('Orientation changed');
      }
    }

    /**
     * Handle global keyboard events
     */
    handleGlobalKeydown(event) {
      // Skip navigation (for screen readers)
      if (event.key === 'Tab' && event.altKey) {
        const skipLink = document.querySelector('[href="#main-content"], [href*="#hello-world-section"]');
        if (skipLink) {
          skipLink.focus();
          event.preventDefault();
        }
      }

      // Handle escape key to reset focus or state
      if (event.key === 'Escape') {
        this.handleEscapeKey(event);
        // Dispatch escape event for components
        document.dispatchEvent(new CustomEvent('app:escape'));
      }

      // Handle keyboard shortcuts
      if (event.ctrlKey || event.metaKey) {
        this.handleKeyboardShortcuts(event);
      }

      // Alt + H shortcut for HelloWorld component focus
      if (event.altKey && event.key === 'h') {
        if (this.components.helloWorld && this.components.helloWorld.element) {
          this.components.helloWorld.element.focus();
          event.preventDefault();
        }
      }

      // Development debug shortcut
      if (AppState.config.debug && event.ctrlKey && event.shiftKey && event.key === 'S') {
        console.log('App Status:', this.getAppStatus());
        event.preventDefault();
      }

      // Delegate to existing global keydown handler if available
      if (typeof handleGlobalKeydown === 'function') {
        handleGlobalKeydown(event);
      }
    }

    /**
     * Handle escape key press
     */
    handleEscapeKey(event) {
      // Clear any active states
      if (this.components.helloWorld) {
        const nameInput = document.getElementById('user-name') || document.getElementById('name-input');
        if (nameInput && document.activeElement === nameInput) {
          nameInput.blur();
        }
      }

      // Close any open modals or dropdowns
      const openModals = document.querySelectorAll('[aria-expanded="true"]');
      openModals.forEach(modal => {
        if (modal.click) {
          modal.click();
        }
      });

      // Reset component state
      this.resetComponentState();
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
      switch (event.key.toLowerCase()) {
        case 'h':
          if (event.altKey) {
            event.preventDefault();
            const greetBtn = document.getElementById('hello-btn') || document.getElementById('greet-btn');
            if (greetBtn) greetBtn.click();
          }
          break;
          
        case 'r':
          if (event.altKey) {
            event.preventDefault();
            document.getElementById('reset-btn')?.click();
          }
          break;
      }
    }

    /**
     * Handle before unload
     */
    handleBeforeUnload() {
      if (window.HelperUtils) {
        HelperUtils.log('Application unloading');
      }
      console.log('🧹 Cleaning up application...');
      this.cleanup();

      // Delegate to existing cleanup if available
      if (typeof cleanup === 'function') {
        cleanup();
      }
    }

    /**
     * Update responsive elements
     */
    updateResponsiveElements() {
      // Force reflow for responsive calculations
      if (this.components.helloWorld && this.components.helloWorld.element) {
        this.components.helloWorld.element.style.display = 'none';
        this.components.helloWorld.element.offsetHeight; // Force reflow
        this.components.helloWorld.element.style.display = '';
      }
    }

    /**
     * Pause animations for performance
     */
    pauseAnimations() {
      document.body.classList.add('animations-paused');
    }

    /**
     * Resume animations
     */
    resumeAnimations() {
      document.body.classList.remove('animations-paused');
    }

    /**
     * Reset component state
     */
    resetComponentState() {
      if (this.components.helloWorld && this.components.helloWorld.element) {
        this.components.helloWorld.element.classList.remove('hello-world--special', 'hello-world--focused');
      }

      // Delegate to existing reset function if available
      if (typeof resetComponentState === 'function') {
        resetComponentState();
      }
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
      if (this.announce) {
        this.announce('Hello World application loaded successfully');
      }
    }

    /**
     * Track user interactions for analytics
     */
    trackUserInteraction(action, data = {}) {
      const event = {
        action,
        timestamp: Date.now(),
        data: data,
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      if (window.HelperUtils) {
        HelperUtils.log(`User interaction: ${action}`, 'info');
      }

      // Here you could send to analytics service
      // analytics.track(event);
    }

    /**
     * Handle global errors
     */
    handleGlobalError(error) {
      // Log error details
      const errorInfo = {
        message: error?.message || 'Unknown error',
        stack: error?.stack || 'No stack trace',
        timestamp: Date.now()
      };

      // Log for debugging
      if (window.AppUtils?.Logger) {
        window.AppUtils.Logger.error('Global error:', error);
      }

      // Show user-friendly error message
      if (this.components.helloWorld && this.components.helloWorld.showError) {
        this.components.helloWorld.showError('Something went wrong. Please refresh the page.');
      }

      // Send error to monitoring service (if available)
      // errorReporting.log(errorInfo);
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
      this.showErrorFallback(error);
    }

    /**
     * Show error fallback UI
     */
    showErrorFallback(error) {
      // Show user-friendly error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'app-error';
      errorMessage.innerHTML = `
        <div class="app-error__container">
          <h2>⚠️ Oops! Something went wrong</h2>
          <p>We're having trouble loading the Hello World application. Please try refreshing the page.</p>
          <button onclick="window.location.reload()" class="app-error__button">
            🔄 Refresh Page
          </button>
        </div>
      `;
      
      // Add error styles
      const errorStyles = document.createElement('style');
      errorStyles.textContent = `
        .app-error {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .app-error__container {
          text-align: center;
          max-width: 400px;
          padding: 2rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .app-error__button {
          background: #6366f1;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 1rem;
          transition: background-color 0.2s;
        }
        .app-error__button:hover {
          background: #4f46e5;
        }
        .app-error__button:focus {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
      `;
      
      document.head.appendChild(errorStyles);
      document.body.appendChild(errorMessage);

      // Focus the button for accessibility
      setTimeout(() => {
        const button = errorMessage.querySelector('.app-error__button');
        if (button) button.focus();
      }, 100);
    }

    /**
     * Get application state
     */
    getState() {
      return {
        ...this.state,
        components: Object.keys(this.components)
      };
    }

    /**
     * Get application status
     */
    getAppStatus() {
      return {
        initialized: this.state.isInitialized,
        version: AppState.config.version,
        name: AppState.config.name,
        components: Object.keys(this.components).map(key => ({
          name: key,
          status: this.components[key]?.getStatus?.() || 'unknown'
        })),
        browserInfo: AppState.browserInfo,
        timestamp: Date.now()
      };
    }

    /**
     * Cleanup application resources
     */
    cleanup() {
      // Destroy all components
      Object.values(this.components).forEach(component => {
        if (component.destroy) {
          component.destroy();
        }
      });

      // Reset state
      this.state.isInitialized = false;
      AppState.initialized = false;

      if (window.HelperUtils) {
        HelperUtils.log('Application cleanup completed');
      }
      console.log('✅ Cleanup complete');
    }

    /**
     * Simple debounce implementation for fallback
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }

  /**
   * Accessible Hello World Application Class
   * Handles accessibility features and user interactions
   */
  class AccessibleHelloWorldApp {
    constructor() {
      this.currentUser = '';
      this.greetingStyle = 'formal';
      this.settings = {
        reducedMotion: false,
        highContrast: false,
        fontSize: 'medium'
      };
      this.init();
    }

    init() {
      this.setupEventListeners();
      this.loadSettings();
      this.setupKeyboardNavigation();
    }

    setupEventListeners() {
      // Hello button
      const helloBtn = document.getElementById('hello-btn');
      if (helloBtn) {
        helloBtn.addEventListener('click', this.handleHelloClick.bind(this));
      }

      // Navigation toggle
      const navToggle = document.querySelector('.nav__toggle');
      const navMenu = document.querySelector('.nav__menu');
      
      if (navToggle && navMenu) {
        navToggle.addEventListener('click', this.toggleNavigation.bind(this));
        
        // Close menu on escape key (enhanced with existing global handler)
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
            this.toggleNavigation();
            navToggle.focus();
          }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navToggle.getAttribute('aria-expanded') === 'true') {
              this.toggleNavigation();
            }
          }
        });
      }

      // Form submission
      const inputForm = document.querySelector('.input-form');
      if (inputForm) {
        inputForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Real-time validation
        const nameInput = document.getElementById('user-name');
        if (nameInput) {
          nameInput.addEventListener('input', this.validateNameInput.bind(this));
          nameInput.addEventListener('blur', this.validateNameInput.bind(this));
        }
        
        // Radio button changes
        const radioButtons = inputForm.querySelectorAll('input[name="greeting-style"]');
        radioButtons.forEach(radio => {
          radio.addEventListener('change', this.handleGreetingStyleChange.bind(this));
        });
      }

      // Settings
      this.setupSettingsListeners();
      
      // Smooth scrolling for internal links
      document.addEventListener('click', this.handleSmoothScroll.bind(this));
    }

    setupSettingsListeners() {
      // Reduced motion toggle
      const reducedMotionToggle = document.getElementById('reduced-motion');
      if (reducedMotionToggle) {
        reducedMotionToggle.addEventListener('change', (e) => {
          this.settings.reducedMotion = e.target.checked;
          this.applyReducedMotion(e.target.checked);
          this.saveSettings();
          this.announceSettingChange('Reduced motion', e.target.checked ? 'enabled' : 'disabled');
        });
      }

      // High contrast toggle
      const highContrastToggle = document.getElementById('high-contrast');
      if (highContrastToggle) {
        highContrastToggle.addEventListener('change', (e) => {
          this.settings.highContrast = e.target.checked;
          this.applyHighContrast(e.target.checked);
          this.saveSettings();
          this.announceSettingChange('High contrast mode', e.target.checked ? 'enabled' : 'disabled');
        });
      }

      // Font size selection
      const fontSizeSelect = document.getElementById('font-size');
      if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
          this.settings.fontSize = e.target.value;
          this.applyFontSize(e.target.value);
          this.saveSettings();
          this.announceSettingChange('Font size changed to', e.target.value);
        });
      }
    }

    setupKeyboardNavigation() {
      // Handle keyboard navigation for custom elements
      const radioGroups = document.querySelectorAll('[role="radiogroup"]');
      radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        radios.forEach((radio, index) => {
          radio.addEventListener('keydown', (e) => {
            let targetIndex;
            
            switch (e.key) {
              case 'ArrowDown':
              case 'ArrowRight':
                e.preventDefault();
                targetIndex = (index + 1) % radios.length;
                radios[targetIndex].checked = true;
                radios[targetIndex].focus();
                radios[targetIndex].dispatchEvent(new Event('change'));
                break;
                
              case 'ArrowUp':
              case 'ArrowLeft':
                e.preventDefault();
                targetIndex = (index - 1 + radios.length) % radios.length;
                radios[targetIndex].checked = true;
                radios[targetIndex].focus();
                radios[targetIndex].dispatchEvent(new Event('change'));
                break;
            }
          });
        });
      });

      // Handle navigation menu keyboard interaction
      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (index + 1) % navLinks.length;
            navLinks[nextIndex].focus();
          } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
            navLinks[prevIndex].focus();
          }
        });
      });
    }

    handleHelloClick() {
      this.showLoading();
      
      // Simulate processing time
      setTimeout(() => {
        this.updateHelloMessage();
        this.hideLoading();
      }, 800);
    }

    handleFormSubmit(e) {
      e.preventDefault();
      const nameInput = document.getElementById('user-name');
      const name = nameInput ? nameInput.value.trim() : '';
      
      if (this.validateNameInput()) {
        this.currentUser = name;
        this.updateHelloMessage();
        this.announceUpdate('Greeting updated successfully');
      }
    }

    validateNameInput() {
      const nameInput = document.getElementById('user-name');
      const errorElement = document.getElementById('name-error');
      const name = nameInput ? nameInput.value.trim() : '';
      
      if (!nameInput || !errorElement) return true;

      // Clear previous error
      errorElement.textContent = '';
      nameInput.setAttribute('aria-invalid', 'false');

      // Basic validation (allow empty as it's optional)
      if (name && name.length < 2) {
        const errorMessage = 'Name must be at least 2 characters long';
        errorElement.textContent = errorMessage;
        nameInput.setAttribute('aria-invalid', 'true');
        return false;
      }

      if (name && !/^[a-zA-Z\s'-]+$/.test(name)) {
        const errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        errorElement.textContent = errorMessage;
        nameInput.setAttribute('aria-invalid', 'true');
        return false;
      }

      return true;
    }

    handleGreetingStyleChange(e) {
      this.greetingStyle = e.target.value;
      this.updateHelloMessage();
      this.announceUpdate(`Greeting style changed to ${e.target.value}`);
    }

    updateHelloMessage() {
      const messageElement = document.getElementById('hello-message');
      if (!messageElement) return;

      const greetings = {
        formal: {
          anonymous: 'Good day! Welcome to our accessible Hello World application.',
          named: (name) => `Good day, ${name}! Welcome to our accessible Hello World application.`
        },
        casual: {
          anonymous: 'Hey there! Welcome to our Hello World app!',
          named: (name) => `Hey ${name}! Welcome to our Hello World app!`
        },
        enthusiastic: {
          anonymous: 'Hello there! We\'re so excited you\'re here! Welcome to our amazing Hello World app!',
          named: (name) => `Hello ${name}! We\'re so excited you\'re here! Welcome to our amazing Hello World app!`
        }
      };

      const greeting = this.currentUser 
        ? greetings[this.greetingStyle].named(this.currentUser)
        : greetings[this.greetingStyle].anonymous;

      messageElement.textContent = greeting;
    }

    toggleNavigation() {
      const navToggle = document.querySelector('.nav__toggle');
      const navMenu = document.querySelector('.nav__menu');
      
      if (!navToggle || !navMenu) return;

      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.setAttribute('aria-expanded', !isExpanded);

      // Focus management
      if (!isExpanded) {
        // Menu is being opened
        const firstLink = navMenu.querySelector('.nav__link');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      }
    }

    handleSmoothScroll(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: this.settings.reducedMotion ? 'auto' : 'smooth'
        });
        
        // Focus the target element for keyboard users
        targetElement.focus();
        
        // Close mobile menu if open
        const navToggle = document.querySelector('.nav__toggle');
        if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
          this.toggleNavigation();
        }
      }
    }

    showLoading() {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.setAttribute('aria-hidden', 'false');
        this.announceUpdate('Loading new greeting...');
      }
    }

    hideLoading() {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.setAttribute('aria-hidden', 'true');
      }
    }

    applyReducedMotion(enabled) {
      if (enabled) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    }

    applyHighContrast(enabled) {
      if (enabled) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    }

    applyFontSize(size) {
      // Remove all font size classes
      document.body.classList.remove('font-size-small', 'font-size-large', 'font-size-extra-large');
      
      // Add the selected font size class
      if (size !== 'medium') {
        document.body.classList.add(`font-size-${size}`);
      }
    }

    loadSettings() {
      try {
        const savedSettings = localStorage.getItem('accessibilitySettings');
        if (savedSettings) {
          this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
          this.applyLoadedSettings();
        }
      } catch (error) {
        console.warn('Could not load accessibility settings:', error);
      }
    }

    saveSettings() {
      try {
        localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
      } catch (error) {
        console.warn('Could not save accessibility settings:', error);
      }
    }

    applyLoadedSettings() {
      // Apply reduced motion
      const reducedMotionToggle = document.getElementById('reduced-motion');
      if (reducedMotionToggle) {
        reducedMotionToggle.checked = this.settings.reducedMotion;
        this.applyReducedMotion(this.settings.reducedMotion);
      }

      // Apply high contrast
      const highContrastToggle = document.getElementById('high-contrast');
      if (highContrastToggle) {
        highContrastToggle.checked = this.settings.highContrast;
        this.applyHighContrast(this.settings.highContrast);
      }

      // Apply font size
      const fontSizeSelect = document.getElementById('font-size');
      if (fontSizeSelect) {
        fontSizeSelect.value = this.settings.fontSize;
        this.applyFontSize(this.settings.fontSize);
      }
    }

    announceUpdate(message) {
      // Create or update a live region for screen reader announcements
      let announcer = document.getElementById('app-announcer');
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'app-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        `;
        document.body.appendChild(announcer);
      }

      // Clear and set new message
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    }

    announceSettingChange(settingName, value) {
      this.announceUpdate(`${settingName} ${value}`);
    }

    // Method to get current user for integration with existing component
    getCurrentUser() {
      return this.currentUser;
    }

    // Method to get current greeting style
    getGreetingStyle() {
      return this.greetingStyle;
    }

    // Method to get component status
    getStatus() {
      return {
        initialized: true,
        currentUser: this.currentUser,
        greetingStyle: this.greetingStyle,
        settings: this.settings
      };
    }

    // Method for cleanup
    destroy() {
      // Remove event listeners and cleanup resources
      console.log('AccessibleHelloWorldApp destroyed');
    }
  }

  /**
   * Initialize the application
   */
  function initApp() {
    try {
      // Initialize main app
      mainApp = new HelloWorldApp();
      mainApp.init();

      // Initialize Hello World component (will be handled by mainApp)
      helloWorldComponent = mainApp.components.helloWorld;

      // Initialize accessible app features (will be handled by mainApp)
      accessibleApp = mainApp.components.accessibleApp;

      // Set up global event listeners (now handled by mainApp)
      setupGlobalEventListeners();

      // Log successful initialization
      if (window.HelperUtils) {
        HelperUtils.log('Application initialized successfully');
      }

      // Announce to screen readers that the app is ready
      announceAppReady();
    } catch (error) {
      console.error('Error initializing Hello World app:', error);
      showErrorFallback();
    }
  }

  /**
   * Set up global event listeners
   */
  function setupGlobalEventListeners() {
    // Handle window resize with debouncing
    let debouncedResize;
    if (window.HelperUtils) {
      debouncedResize = HelperUtils.debounce(handleWindowResize, 250);
    } else if (window.AppUtils) {
      debouncedResize = AppUtils.debounce(handleWindowResize, 250);
    } else {
      debouncedResize = debounceFunction(handleWindowResize, 250);
    }
    
    window.addEventListener('resize', debouncedResize);

    // Handle visibility change for performance optimization
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle orientation change on mobile devices
    window.addEventListener('orientationchange', handleOrientationChange);

    // Handle keyboard navigation (enhanced with accessible app features)
    document.addEventListener('keydown', handleGlobalKeydown);
  }

  /**
   * Handle window resize events
   */
  function handleWindowResize() {
    if (window.HelperUtils) {
      const viewport = HelperUtils.getViewportDimensions();
      HelperUtils.log(`Window resized to: ${viewport.width}x${viewport.height}`);
    }

    // Update any responsive elements if needed
    updateResponsiveElements();

    // Handle mobile menu closure for accessibility app
    if (accessibleApp && window.innerWidth >= 768) {
      const navToggle = document.querySelector('.nav__toggle');
      if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
        accessibleApp.toggleNavigation();
      }
    }
  }

  /**
   * Handle page visibility changes
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden - pause animations for performance
      pauseAnimations();
    } else {
      // Page is visible - resume animations
      resumeAnimations();
    }
  }

  /**
   * Handle orientation changes on mobile
   */
  function handleOrientationChange() {
    // Small delay to allow for orientation change to complete
    setTimeout(() => {
      updateResponsiveElements();
      if (window.HelperUtils) {
        HelperUtils.log('Orientation changed');
      }
    }, 100);
  }

  /**
   * Handle global keyboard shortcuts
   */
  function handleGlobalKeydown(event) {
    // Handle escape key to reset component state
    if (event.key === 'Escape') {
      resetComponentState();
    }

    // Handle accessibility shortcuts
    if (event.altKey && event.key === 'h') {
      // Alt + H to focus Hello World component
      if (helloWorldComponent && helloWorldComponent.element) {
        helloWorldComponent.element.focus();
        event.preventDefault();
      }
    }
  }

  /**
   * Update responsive elements
   */
  function updateResponsiveElements() {
    // Force reflow for responsive calculations
    if (helloWorldComponent && helloWorldComponent.element) {
      helloWorldComponent.element.style.display = 'none';
      helloWorldComponent.element.offsetHeight; // Force reflow
      helloWorldComponent.element.style.display = '';
    }
  }

  /**
   * Pause animations for performance
   */
  function pauseAnimations() {
    document.body.classList.add('animations-paused');
  }

  /**
   * Resume animations
   */
  function resumeAnimations() {
    document.body.classList.remove('animations-paused');
  }

  /**
   * Reset component state
   */
  function resetComponentState() {
    if (helloWorldComponent && helloWorldComponent.element) {
      helloWorldComponent.element.classList.remove('hello-world--special', 'hello-world--focused');
    }
  }

  /**
   * Announce that the app is ready to screen readers
   */
  function announceAppReady() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    announcement.textContent = 'Hello World application loaded and ready';
    document.body.appendChild(announcement);

    // Remove announcement after it's been read
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 2000);
  }

  /**
   * Show error fallback UI
   */
  function showErrorFallback() {
    const container = document.querySelector('.hello-world-container');
    if (container) {
      container.innerHTML = `
        <div class="error-fallback" role="alert">
          <h1>Hello World</h1>
          <p>The application encountered an error, but here's your Hello World message!</p>
          <button onclick="window.location.reload()" style="
            background: #007cba;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1rem;
          ">
            Reload Page
          </button>
        </div>
      `;
    } else {
      // Fallback to full page error
      document.body.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        ">
          <div>
            <h1>⚠️ Application Error</h1>
            <p>Sorry, the Hello World application failed to load properly.</p>
            <button onclick="window.location.reload()" style="
              background: white;
              color: #333;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              font-size: 1rem;
              cursor: pointer;
              margin-top: 1rem;
            ">
              🔄 Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }

  /**
   * Simple debounce function for fallback
   */
  function debounceFunction(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Clean up resources before page unload
   */
  function cleanup() {
    if (helloWorldComponent && helloWorldComponent.destroy) {
      helloWorldComponent.destroy();
    }

    if (mainApp && mainApp.cleanup) {
      mainApp.cleanup();
    }

    if (window.HelperUtils) {
      HelperUtils.log('Application cleaned up');
    }
  }

  // Initialize when DOM is ready
  if (window.HelperUtils) {
    HelperUtils.onDOMReady(initApp);
  } else if (window.AppUtils && window.AppUtils.domReady) {
    window.AppUtils.domReady(initApp);
  } else {
    // Fallback if utilities are not available
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }
  }

  // Clean up on page unload
  window.addEventListener('beforeunload', cleanup);

  // Handle browser back/forward navigation
  window.addEventListener('popstate', (e) => {
    // Re-focus appropriate element after navigation
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => target.focus(), 100);
      }
    }
  });

  // Expose app instances for debugging (development only)
  if (typeof window !== 'undefined') {
    window.HelloWorldApp = {
      mainApp: () => mainApp,
      component: () => helloWorldComponent,
      accessibleApp: () => accessibleApp,
      reinitialize: initApp,
      cleanup: cleanup
    };

    // Enhanced app interface for debugging
    window.App = {
      getStatus: () => mainApp ? mainApp.getAppStatus() : { initialized: false },
      cleanup,
      initialized: () => AppState.initialized,
      version: AppState.config.version,
      config: AppState.config
    };
  }

  // Development helpers
  if (AppState.config.debug) {
    window.DEBUG = true;
    console.log('🐛 Debug mode enabled');
    
    // Add keyboard shortcut for status
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        console.log('App Status:', mainApp ? mainApp.getAppStatus() : AppState);
        event.preventDefault();
      }
    });
  }

})();
