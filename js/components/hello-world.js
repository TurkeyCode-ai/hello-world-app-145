/**
 * Hello World Component
 * Handles the display and animation of the Hello World text with multi-language support
 * and interactive greeting functionality
 */

class HelloWorldComponent {
  constructor(elementIdOrOptions = {}) {
    // Handle backwards compatibility - can accept either elementId string or options object
    if (typeof elementIdOrOptions === 'string') {
      this.element = document.getElementById(elementIdOrOptions);
      this.options = {
        containerSelector: `#${elementIdOrOptions}`,
        messageSelector: '#hello-message',
        greetButtonSelector: '#greet-btn',
        resetButtonSelector: '#reset-btn',
        nameInputSelector: '#name-input',
        animationDuration: 500
      };
    } else {
      this.options = {
        containerSelector: '#hello-world-section',
        messageSelector: '#hello-message',
        greetButtonSelector: '#greet-btn',
        resetButtonSelector: '#reset-btn',
        nameInputSelector: '#name-input',
        animationDuration: 500,
        ...elementIdOrOptions
      };
      this.element = document.querySelector(this.options.containerSelector);
    }
    
    this.textElement = null;
    this.animationElement = null;
    this.isVisible = false;
    // New multi-language properties
    this.greetings = new Map();
    this.currentLanguage = 'en';
    this.supportedLanguages = ['en', 'es', 'fr', 'de', 'it'];
    this.languageSelect = null;
    this.updateButton = null;
    this.outputElement = null;
    // Interactive functionality state
    this.state = {
      currentMessage: 'Welcome to our Hello World application!',
      userName: '',
      isAnimating: false,
      greetingCount: 0
    };
    this.elements = {};
    this.boundMethods = {};
    this.defaultGreeting = 'Hello, World!';
    this.isInitialized = false;
    this.hideTimeout = null;
    this.initializeGreetings();
    this.init();
  }
  
  /**
   * Initialize multi-language greetings
   */
  initializeGreetings() {
    // Multi-language support for better accessibility
    this.greetings.set('en', {
      hello: 'Hello World',
      description: 'A friendly greeting to the world',
      welcome: 'Welcome to our accessible application'
    });
    this.greetings.set('es', {
      hello: 'Hola Mundo',
      description: 'Un saludo amigable al mundo',
      welcome: 'Bienvenido a nuestra aplicación accesible'
    });
    this.greetings.set('fr', {
      hello: 'Bonjour le Monde',
      description: 'Une salutation amicale au monde',
      welcome: 'Bienvenue dans notre application accessible'
    });
    this.greetings.set('de', {
      hello: 'Hallo Welt',
      description: 'Ein freundlicher Gruß an die Welt',
      welcome: 'Willkommen in unserer barrierefreien Anwendung'
    });
    this.greetings.set('it', {
      hello: 'Ciao Mondo',
      description: 'Un saluto amichevole al mondo',
      welcome: 'Benvenuto nella nostra applicazione accessibile'
    });
  }

  /**
   * Initialize the component
   */
  init() {
    if (!this.element) {
      console.error('Hello World component element not found');
      return;
    }

    try {
      this.textElement = this.element.querySelector('.hello-world__text');
      this.animationElement = this.element.querySelector('.hello-world__pulse');
      
      // Bind interactive elements
      this.bindElements();
      this.bindMethods();
      
      // Check if language controls need to be rendered
      this.renderLanguageControls();
      this.setupEventListeners();
      this.setupAccessibility();
      this.animate();
      
      this.isInitialized = true;
      
      // Log initialization if Helpers is available
      if (typeof Helpers !== 'undefined') {
        Helpers.log('HelloWorld component initialized');
        Helpers.EventEmitter.emit('component:initialized', { component: 'HelloWorld' });
      }
    } catch (error) {
      console.error('Failed to initialize HelloWorld component:', error);
    }
  }

  /**
   * Bind DOM elements to component for interactive functionality
   */
  bindElements() {
    this.elements = {
      container: this.element,
      message: this.element.querySelector(this.options.messageSelector) || this.textElement,
      greetButton: this.element.querySelector(this.options.greetButtonSelector),
      resetButton: this.element.querySelector(this.options.resetButtonSelector),
      nameInput: this.element.querySelector(this.options.nameInputSelector)
    };

    // Support for alternative element IDs from new functionality
    if (!this.elements.message) {
      this.elements.message = document.getElementById('greeting') || document.getElementById('messageDisplay');
    }
    if (!this.elements.nameInput) {
      this.elements.nameInput = document.getElementById('nameInput');
    }
    if (!this.elements.greetButton) {
      this.elements.greetButton = document.getElementById('greetButton');
    }

    // Only validate if we have interactive elements
    if (this.elements.greetButton || this.elements.resetButton || this.elements.nameInput) {
      const requiredElements = ['greetButton', 'resetButton', 'nameInput'];
      const missingElements = requiredElements.filter(key => !this.elements[key]);
      
      if (missingElements.length > 0) {
        if (typeof Helpers !== 'undefined') {
          Helpers.log(`Missing interactive elements: ${missingElements.join(', ')}`, 'warn');
        } else {
          console.warn(`Missing interactive elements: ${missingElements.join(', ')}`);
        }
      }
    }

    // Validate required elements exist (enhanced validation)
    const criticalElements = ['message'];
    const missingCritical = criticalElements.filter(key => !this.elements[key]);
    if (missingCritical.length > 0) {
      throw new Error(`Required DOM elements not found: ${missingCritical.join(', ')}`);
    }
  }

  /**
   * Bind methods to maintain proper context
   */
  bindMethods() {
    this.boundMethods = {
      handleGreetClick: this.handleGreetClick.bind(this),
      handleResetClick: this.handleResetClick.bind(this),
      handleNameInput: typeof Helpers !== 'undefined' 
        ? Helpers.debounce(this.handleNameInput.bind(this), 300)
        : this.debounce(this.handleNameInput.bind(this), 300),
      handleKeyPress: this.handleKeyPress.bind(this),
      handleInputChange: this.handleInputChange.bind(this)
    };
  }

  /**
   * Simple debounce implementation if Helpers is not available
   */
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Render language controls if they don't exist
   */
  renderLanguageControls() {
    // Only add language controls if they don't already exist
    if (!this.element.querySelector('#hello-world-language-select')) {
      const currentGreeting = this.greetings.get(this.currentLanguage);
      const languageControlsHTML = `
        <div class="hello-world__language-controls">
          <div class="hello-world__controls">
            <label for="hello-world-language-select" class="hello-world__label">
              Choose Language:
            </label>
            <select id="hello-world-language-select" 
                    class="hello-world__select" 
                    aria-describedby="hello-world-language-help">
              ${this.supportedLanguages.map(lang => 
                `<option value="${lang}" ${lang === this.currentLanguage ? 'selected' : ''}>
                  ${this.getLanguageName(lang)}
                </option>`
              ).join('')}
            </select>
            <div id="hello-world-language-help" class="hello-world__help">
              Select a language to change the greeting
            </div>
          </div>
          <div class="hello-world__output" 
               role="status" 
               aria-live="polite" 
               aria-atomic="true"
               id="hello-world-greeting-output">
            ${currentGreeting.welcome}
          </div>
          <button type="button" 
                  class="hello-world__update-button btn btn--primary"
                  aria-describedby="hello-world-button-help">
            Update Greeting
          </button>
          <div id="hello-world-button-help" class="sr-only">
            Click to refresh the greeting in the selected language
          </div>
        </div>
      `;
      
      this.element.insertAdjacentHTML('beforeend', languageControlsHTML);
      
      // Cache references to new elements
      this.languageSelect = this.element.querySelector('#hello-world-language-select');
      this.updateButton = this.element.querySelector('.hello-world__update-button');
      this.outputElement = this.element.querySelector('#hello-world-greeting-output');
    }
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Handle intersection observer for performance
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    }

    // Handle click interactions
    this.element.addEventListener('click', this.handleClick.bind(this));
    
    // Handle keyboard interactions
    this.element.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Handle focus events
    this.element.addEventListener('focus', this.handleFocus.bind(this));
    this.element.addEventListener('blur', this.handleBlur.bind(this));
    
    // Setup language control event listeners
    this.setupLanguageEventListeners();
    
    // Attach interactive functionality event listeners
    this.attachInteractiveEventListeners();
  }

  /**
   * Attach event listeners for interactive functionality
   */
  attachInteractiveEventListeners() {
    if (this.elements.greetButton) {
      this.elements.greetButton.addEventListener('click', this.boundMethods.handleGreetClick);
    }
    
    if (this.elements.resetButton) {
      this.elements.resetButton.addEventListener('click', this.boundMethods.handleResetClick);
    }
    
    if (this.elements.nameInput) {
      this.elements.nameInput.addEventListener('input', this.boundMethods.handleNameInput);
      this.elements.nameInput.addEventListener('keypress', this.boundMethods.handleKeyPress);
      // Add input change handler for enhanced functionality
      this.elements.nameInput.addEventListener('input', this.boundMethods.handleInputChange);
    }

    // Listen for custom events if EventEmitter is available
    if (typeof Helpers !== 'undefined' && Helpers.EventEmitter) {
      Helpers.EventEmitter.on('greeting:update', (data) => {
        this.updateMessage(data.message, data.animated);
      });
    }
  }

  /**
   * Setup event listeners for language controls
   */
  setupLanguageEventListeners() {
    if (this.languageSelect) {
      this.languageSelect.addEventListener('change', (e) => {
        this.currentLanguage = e.target.value;
        this.updateGreeting();
        this.announceLanguageChange();
      });
      
      // Keyboard navigation enhancement
      this.languageSelect.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.languageSelect.click();
        }
      });
    }
    
    if (this.updateButton) {
      this.updateButton.addEventListener('click', () => {
        this.refreshGreeting();
      });
      
      // Add keyboard support for Enter key
      this.updateButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.refreshGreeting();
        }
      });
    }
  }

  /**
   * Set up intersection observer for performance optimization
   */
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          this.updateAnimationState();
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(this.element);
  }

  /**
   * Set up accessibility features
   */
  setupAccessibility() {
    // Make the component focusable
    this.element.setAttribute('tabindex', '0');
    this.element.setAttribute('role', 'button');
    this.element.setAttribute('aria-label', 'Hello World interactive component');
    
    // Add live region for screen readers (existing functionality)
    if (!this.element.querySelector('.hello-world-live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only hello-world-live-region';
      liveRegion.style.cssText = `
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
      this.element.appendChild(liveRegion);
      this.liveRegion = liveRegion;
    }

    // Add global ARIA live region for language announcements
    if (!document.getElementById('hello-world-announcer')) {
      const announcer = document.createElement('div');
      announcer.id = 'hello-world-announcer';
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
      this.globalAnnouncer = announcer;
    }

    // Setup accessibility for interactive elements
    if (this.elements.greetButton) {
      this.elements.greetButton.setAttribute('aria-describedby', 'hello-message');
    }
    if (this.elements.nameInput) {
      this.elements.nameInput.setAttribute('aria-describedby', 'name-help');
    }

    // Set initial ARIA live region for message element
    if (this.elements.message && this.elements.message !== this.textElement) {
      this.elements.message.setAttribute('aria-live', 'polite');
      this.elements.message.setAttribute('aria-atomic', 'true');
    }
  }

  /**
   * Handle click events
   */
  handleClick(event) {
    event.preventDefault();
    this.triggerSpecialAnimation();
    this.announceToScreenReader('Hello World component activated');
  }

  /**
   * Handle keyboard events
   */
  handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  /**
   * Handle focus events
   */
  handleFocus() {
    this.element.classList.add('hello-world--focused');
  }

  /**
   * Handle blur events
   */
  handleBlur() {
    this.element.classList.remove('hello-world--focused');
  }

  /**
   * Handle greet button click
   */
  async handleGreetClick() {
    if (this.state.isAnimating) return;

    try {
      this.state.isAnimating = true;
      this.elements.greetButton.disabled = true;
      
      const name = this.elements.nameInput.value.trim();
      const validation = this.validateInput(name);
      
      if (!validation.isValid) {
        this.showError(validation.errors.join(', '));
        return;
      }

      const greeting = name.length > 0 
        ? this.formatGreeting(name)
        : this.getRandomGreeting();

      await this.updateMessage(greeting, true);
      
      // Enhanced functionality: show personalized message
      this.showMessage(name);
      
      this.state.greetingCount++;
      this.state.userName = name;

      if (typeof Helpers !== 'undefined') {
        Helpers.log(`Greeting generated: "${greeting}"`);
        if (Helpers.EventEmitter) {
          Helpers.EventEmitter.emit('greeting:generated', { 
            greeting, 
            name, 
            count: this.state.greetingCount 
          });
        }
      }

      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    } catch (error) {
      const errorMessage = `Error in handleGreetClick: ${error.message}`;
      if (typeof Helpers !== 'undefined') {
        Helpers.log(errorMessage, 'error');
      } else {
        console.error(errorMessage);
      }
      this.showError('Something went wrong. Please try again.');
    } finally {
      this.state.isAnimating = false;
      this.elements.greetButton.disabled = false;
    }
  }

  /**
   * Handle reset button click
   */
  async handleResetClick() {
    try {
      this.elements.resetButton.disabled = true;
      
      // Clear input
      this.elements.nameInput.value = '';
      this.elements.nameInput.focus();
      
      // Reset message
      const defaultMessage = 'Welcome to our Hello World application!';
      await this.updateMessage(defaultMessage, true);
      
      // Reset greeting to default
      this.resetGreeting();
      
      // Hide any messages
      this.hideMessage();
      
      // Reset state
      this.state.currentMessage = defaultMessage;
      this.state.userName = '';

      if (typeof Helpers !== 'undefined') {
        Helpers.log('Component reset');
        if (Helpers.EventEmitter) {
          Helpers.EventEmitter.emit('component:reset', { component: 'HelloWorld' });
        }
      }
    } catch (error) {
      const errorMessage = `Error in handleResetClick: ${error.message}`;
      if (typeof Helpers !== 'undefined') {
        Helpers.log(errorMessage, 'error');
      } else {
        console.error(errorMessage);
      }
    } finally {
      this.elements.resetButton.disabled = false;
    }
  }

  /**
   * Handle name input changes
   */
  handleNameInput(event) {
    const value = event.target.value;
    const validation = this.validateInput(value);
    
    if (!validation.isValid) {
      this.elements.nameInput.setAttribute('aria-invalid', 'true');
      this.showInputError(validation.errors[0]);
    } else {
      this.elements.nameInput.setAttribute('aria-invalid', 'false');
      this.clearInputError();
    }

    // Update button text based on input
    if (this.elements.greetButton) {
      const buttonText = value.trim().length > 0 
        ? `Say Hello to ${value.trim().split(' ')[0]}!`
        : 'Say Hello';
      this.elements.greetButton.textContent = buttonText;
    }
  }

  /**
   * Handle keypress events for input field (enhanced functionality)
   * @param {KeyboardEvent} event 
   */
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.boundMethods.handleGreetClick();
    }
  }

  /**
   * Handle input change events (from new functionality)
   * @param {Event} event 
   */
  handleInputChange(event) {
    const value = event.target.value.trim();
    
    // Reset to default if input is empty
    if (value === '') {
      this.resetGreeting();
      this.hideMessage();
    }
  }

  /**
   * Update animation state based on visibility
   */
  updateAnimationState() {
    if (this.animationElement) {
      if (this.isVisible) {
        this.animationElement.style.animationPlayState = 'running';
      } else {
        this.animationElement.style.animationPlayState = 'paused';
      }
    }
  }

  /**
   * Trigger special animation on interaction
   */
  triggerSpecialAnimation() {
    this.element.classList.add('hello-world--special');
    setTimeout(() => {
      this.element.classList.remove('hello-world--special');
    }, 1000);
  }

  /**
   * Announce message to screen readers (existing functionality)
   */
  announceToScreenReader(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
      // Clear the message after announcement
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Announce message to global screen reader announcer (new functionality)
   */
  announceToGlobalScreenReader(message) {
    const announcer = document.getElementById('hello-world-announcer');
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    }
  }

  /**
   * Start the main animation
   */
  animate() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Add entrance animation class
    setTimeout(() => {
      this.element.classList.add('hello-world--loaded');
    }, 100);
  }

  /**
   * Update the text content (enhanced with language support)
   */
  updateText(newText) {
    if (this.textElement) {
      this.textElement.textContent = newText;
      this.announceToScreenReader(`Text updated to: ${newText}`);
    }
  }

  /**
   * Update the main message with optional animation
   */
  async updateMessage(message, animated = false) {
    return new Promise((resolve) => {
      const sanitizedMessage = this.sanitizeInput(message);
      const targetElement = this.elements.message || this.textElement;
      
      if (!targetElement) {
        resolve();
        return;
      }

      if (animated && !this.prefersReducedMotion()) {
        // Add animation class
        targetElement.classList.add('updated');
        
        setTimeout(() => {
          targetElement.textContent = sanitizedMessage;
          this.state.currentMessage = sanitizedMessage;
          
          setTimeout(() => {
            targetElement.classList.remove('updated');
            resolve();
          }, this.options.animationDuration);
        }, this.options.animationDuration / 2);
      } else {
        targetElement.textContent = sanitizedMessage;
        this.state.currentMessage = sanitizedMessage;
        resolve();
      }
    });
  }

  /**
   * Update greeting based on current language
   */
  updateGreeting() {
    const currentGreeting = this.greetings.get(this.currentLanguage);
    
    // Update main text element if it exists
    if (this.textElement) {
      this.textElement.style.opacity = '0.5';
      setTimeout(() => {
        this.textElement.textContent = currentGreeting.hello;
        this.textElement.style.opacity = '1';
      }, 150);
    }

    // Update output element if it exists
    if (this.outputElement) {
      this.outputElement.style.opacity = '0.5';
      setTimeout(() => {
        this.outputElement.textContent = currentGreeting.welcome;
        this.outputElement.style.opacity = '1';
        // Announce to screen readers
        this.announceToGlobalScreenReader(`Greeting updated to ${currentGreeting.hello}`);
      }, 150);
    }
  }

  /**
   * Refresh greeting with timestamp
   */
  refreshGreeting() {
    const currentGreeting = this.greetings.get(this.currentLanguage);
    
    if (this.outputElement) {
      // Add loading state
      this.outputElement.classList.add('loading');
      this.outputElement.setAttribute('aria-busy', 'true');
      
      // Simulate refresh with accessibility announcement
      setTimeout(() => {
        this.outputElement.textContent = `${currentGreeting.welcome} (Updated at ${new Date().toLocaleTimeString()})`;
        this.outputElement.classList.remove('loading');
        this.outputElement.setAttribute('aria-busy', 'false');
        this.announceToGlobalScreenReader('Greeting refreshed successfully');
      }, 500);
    }
  }

  /**
   * Get language name from code
   */
  getLanguageName(languageCode) {
    const languageNames = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano'
    };
    return languageNames[languageCode] || languageCode;
  }

  /**
   * Announce language change
   */
  announceLanguageChange() {
    const languageName = this.getLanguageName(this.currentLanguage);
    this.announceToGlobalScreenReader(`Language changed to ${languageName}`);
  }

  /**
   * Show error message to user
   */
  showError(message) {
    const errorMessage = `⚠️ ${message}`;
    this.updateMessage(errorMessage, true);
    
    // Reset to previous message after delay
    setTimeout(() => {
      this.updateMessage(this.state.currentMessage, false);
    }, 3000);
  }

  /**
   * Show input validation error
   */
  showInputError(message) {
    let errorElement = document.getElementById('name-input-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'name-input-error';
      errorElement.className = 'input-error';
      errorElement.setAttribute('role', 'alert');
      errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      `;
      this.elements.nameInput.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    this.elements.nameInput.setAttribute('aria-describedby', 'name-help name-input-error');
  }

  /**
   * Clear input validation error
   */
  clearInputError() {
    const errorElement = document.getElementById('name-input-error');
    if (errorElement) {
      errorElement.remove();
      this.elements.nameInput.setAttribute('aria-describedby', 'name-help');
    }
  }

  /**
   * Sanitize user input (enhanced implementation)
   * @param {string} input 
   * @returns {string}
   */
  sanitizeInput(input) {
    if (typeof Helpers !== 'undefined' && Helpers.sanitizeInput) {
      return Helpers.sanitizeInput(input);
    }
    // Enhanced fallback sanitization
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>\"'&]/g, '') // Remove potentially harmful characters
      .substring(0, 50) // Limit length
      .trim();
  }

  /**
   * Validate input - fallback implementation
   */
  validateInput(input) {
    if (typeof Helpers !== 'undefined' && Helpers.validateInput) {
      return Helpers.validateInput(input);
    }
    
    // Fallback validation
    const errors = [];
    
    if (input && input.length > 50) {
      errors.push('Name is too long (maximum 50 characters)');
    }
    
    if (input && /<[^>]*>/.test(input)) {
      errors.push('HTML tags are not allowed');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Format greeting - enhanced implementation
   */
  formatGreeting(name) {
    if (typeof Helpers !== 'undefined' && Helpers.formatGreeting) {
      return Helpers.formatGreeting(name);
    }
    
    // Enhanced fallback greeting formatting with current language
    const currentGreeting = this.greetings.get(this.currentLanguage);
    const cleanName = this.sanitizeInput(name);
    return `${currentGreeting.hello.replace('World', cleanName)}!`;
  }

  /**
   * Get random greeting - fallback implementation
   */
  getRandomGreeting() {
    if (typeof Helpers !== 'undefined' && Helpers.getRandomGreeting) {
      return Helpers.getRandomGreeting();
    }
    
    // Enhanced fallback random greeting with current language
    const currentGreeting = this.greetings.get(this.currentLanguage);
    const greetings = [
      currentGreeting.hello,
      `${currentGreeting.hello}!`,
      currentGreeting.welcome,
      'Welcome!',
      'Greetings!',
      'Hi there!',
      'Good day!'
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * Show success message (from new functionality)
   * @param {string} name 
   */
  showMessage(name) {
    if (!this.elements.message) return;

    const message = name 
      ? `Nice to meet you, ${name}! 👋`
      : 'Hello there! Enter your name above to get a personalized greeting. 😊';

    // Create or update message display
    let messageDisplay = document.getElementById('messageDisplay');
    if (!messageDisplay) {
      messageDisplay = document.createElement('div');
      messageDisplay.id = 'messageDisplay';
      messageDisplay.className = 'hello-world__message';
      this.elements.message.parentNode.appendChild(messageDisplay);
    }

    messageDisplay.textContent = message;
    messageDisplay.className = 'hello-world__message hello-world__message--visible hello-world__message--success';

    // Auto-hide message after 5 seconds
    this.autoHideMessage();
  }

  /**
   * Hide the message display (from new functionality)
   */
  hideMessage() {
    const messageDisplay = document.getElementById('messageDisplay');
    if (!messageDisplay) return;

    messageDisplay.className = 'hello-world__message';
    setTimeout(() => {
      messageDisplay.textContent = '';
    }, 250);
  }

  /**
   * Auto-hide message after delay (from new functionality)
   */
  autoHideMessage() {
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hideMessage();
    }, 5000);
  }

  /**
   * Reset greeting to default (from new functionality)
   */
  resetGreeting() {
    if (this.textElement) {
      // Add a smooth transition effect
      this.textElement.style.opacity = '0.5';
      
      setTimeout(() => {
        this.textElement.textContent = this.defaultGreeting;
        this.textElement.style.opacity = '1';
      }, 150);
    }
  }

  /**
   * Check for reduced motion preference
   */
  prefersReducedMotion() {
    if (typeof Helpers !== 'undefined' && Helpers.prefersReducedMotion) {
      return Helpers.prefersReducedMotion();
    }
    // Fallback reduced motion check
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get current text content
   */
  getText() {
    return this.textElement ? this.textElement.textContent : '';
  }

  /**
   * Set language programmatically
   */
  setLanguage(languageCode) {
    if (this.supportedLanguages.includes(languageCode)) {
      this.currentLanguage = languageCode;
      if (this.languageSelect) {
        this.languageSelect.value = languageCode;
      }
      this.updateGreeting();
      this.announceLanguageChange();
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }

  /**
   * Get current component state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update component state
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (typeof Helpers !== 'undefined' && Helpers.EventEmitter) {
      Helpers.EventEmitter.emit('state:updated', { 
        component: 'HelloWorld', 
        state: this.state 
      });
    }
  }

  /**
   * Get component status (enhanced from new functionality)
   * @returns {object}
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      elementsFound: !!(this.elements.message && this.elements.nameInput && this.elements.greetButton),
      currentGreeting: this.elements.message?.textContent || this.textElement?.textContent || '',
      hasInput: !!(this.elements.nameInput?.value.trim()),
      currentLanguage: this.currentLanguage,
      greetingCount: this.state.greetingCount,
      isAnimating: this.state.isAnimating,
      userName: this.state.userName
    };
  }

  /**
   * Destroy the component and clean up
   */
  destroy() {
    if (!this.isInitialized) return;

    try {
      // Remove event listeners
      this.element.removeEventListener('click', this.handleClick);
      this.element.removeEventListener('keydown', this.handleKeydown);
      this.element.removeEventListener('focus', this.handleFocus);
      this.element.removeEventListener('blur', this.handleBlur);

      // Remove language control event listeners
      if (this.languageSelect) {
        this.languageSelect.removeEventListener('change', this.updateGreeting);
        this.languageSelect.removeEventListener('keydown', this.handleKeydown);
      }
      if (this.updateButton) {
        this.updateButton.removeEventListener('click', this.refreshGreeting);
        this.updateButton.removeEventListener('keydown', this.handleKeydown);
      }

      // Remove interactive functionality event listeners
      if (this.elements.greetButton) {
        this.elements.greetButton.removeEventListener('click', this.boundMethods.handleGreetClick);
      }
      if (this.elements.resetButton) {
        this.elements.resetButton.removeEventListener('click', this.boundMethods.handleResetClick);
      }
      if (this.elements.nameInput) {
        this.elements.nameInput.removeEventListener('input', this.boundMethods.handleNameInput);
        this.elements.nameInput.removeEventListener('keypress', this.boundMethods.handleKeyPress);
        this.elements.nameInput.removeEventListener('input', this.boundMethods.handleInputChange);
      }

      // Remove added attributes
      this.element.removeAttribute('tabindex');
      this.element.removeAttribute('role');
      this.element.removeAttribute('aria-label');

      // Remove live regions
      if (this.liveRegion) {
        this.liveRegion.remove();
      }

      const globalAnnouncer = document.getElementById('hello-world-announcer');
      if (globalAnnouncer) {
        globalAnnouncer.remove();
      }

      // Clear timeouts
      clearTimeout(this.hideTimeout);

      // Clear references
      this.isInitialized = false;

      if (typeof Helpers !== 'undefined') {
        Helpers.log('HelloWorld component destroyed');
        if (Helpers.EventEmitter) {
          Helpers.EventEmitter.emit('component:destroyed', { component: 'HelloWorld' });
        }
      }

      console.log('HelloWorld component destroyed');
    } catch (error) {
      console.error('Error destroying HelloWorld component:', error);
    }
  }
}

// Export for use in main.js and other modules
window.HelloWorldComponent = HelloWorldComponent;

// Also support CommonJS exports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelloWorldComponent;
}
