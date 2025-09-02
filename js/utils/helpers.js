/**
 * Utility functions for the Hello World application
 */

const HelperUtils = {
  
  /**
   * Debounce function to limit the rate of function calls
   * @param {Function} func - The function to debounce
   * @param {number} wait - The delay in milliseconds
   * @param {boolean} immediate - Whether to trigger on the leading edge
   * @returns {Function} The debounced function
   */
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  },

  /**
   * Throttle function to limit the rate of function execution
   * @param {Function} func - The function to throttle
   * @param {number} limit - The time limit in milliseconds
   * @returns {Function}
   */
  throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  },

  /**
   * Check if device supports touch
   * @returns {boolean} True if touch is supported
   */
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  /**
   * Check if user prefers reduced motion
   * @returns {boolean} True if reduced motion is preferred
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Get viewport dimensions
   * @returns {Object} Object with width and height
   */
  getViewportDimensions() {
    return {
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
  },

  /**
   * Check if element is in viewport
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} True if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Get browser information
   * @returns {object}
   */
  getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.indexOf('Chrome') > -1) {
      browser = 'Chrome';
    } else if (ua.indexOf('Firefox') > -1) {
      browser = 'Firefox';
    } else if (ua.indexOf('Safari') > -1) {
      browser = 'Safari';
    } else if (ua.indexOf('Edge') > -1) {
      browser = 'Edge';
    }
    
    return {
      browser,
      userAgent: ua,
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      isTouch: this.isTouchDevice()
    };
  },

  /**
   * Add event listener with automatic cleanup
   * @param {HTMLElement} element - The element to add listener to
   * @param {string} event - The event type
   * @param {Function} handler - The event handler
   * @param {Object} options - Event listener options
   * @returns {Function} Cleanup function
   */
  addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    // Return cleanup function
    return () => {
      element.removeEventListener(event, handler, options);
    };
  },

  /**
   * Wait for DOM to be ready
   * @param {Function} callback - Function to call when DOM is ready
   */
  onDOMReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  },

  /**
   * DOM ready helper (alias for consistency with new functionality)
   * @param {Function} callback - Function to execute when DOM is ready
   */
  domReady(callback) {
    return this.onDOMReady(callback);
  },

  /**
   * Simple feature detection
   * @param {string} feature - Feature to detect
   * @returns {boolean} True if feature is supported
   */
  supportsFeature(feature) {
    const features = {
      intersectionObserver: 'IntersectionObserver' in window,
      customProperties: CSS && CSS.supports && CSS.supports('color', 'var(--test)'),
      grid: CSS && CSS.supports && CSS.supports('display', 'grid'),
      flexbox: CSS && CSS.supports && CSS.supports('display', 'flex'),
      backdropFilter: CSS && CSS.supports && CSS.supports('backdrop-filter', 'blur(1px)'),
      webGL: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
          return false;
        }
      })()
    };
    return features[feature] || false;
  },

  /**
   * Generate unique ID
   * @param {string} prefix - Optional prefix for the ID
   * @returns {string} Unique ID
   */
  generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Log messages with timestamp (development only)
   * @param {string} message - Message to log
   * @param {string} level - Log level (info, warn, error)
   */
  log(message, level = 'info') {
    if (typeof process !== 'undefined' && process?.env?.NODE_ENV === 'production') return;
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] Hello World App: ${message}`;
    
    switch (level) {
      case 'warn':
        console.warn(logMessage);
        break;
      case 'error':
        console.error(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  },

  /**
   * Simple logger with different levels
   */
  Logger: {
    info: (message, ...args) => {
      console.log(`[INFO] ${message}`, ...args);
    },
    warn: (message, ...args) => {
      console.warn(`[WARN] ${message}`, ...args);
    },
    error: (message, ...args) => {
      console.error(`[ERROR] ${message}`, ...args);
    },
    debug: (message, ...args) => {
      if (window.DEBUG) {
        console.log(`[DEBUG] ${message}`, ...args);
      }
    }
  },

  /**
   * Local Storage wrapper with error handling
   */
  Storage: {
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        HelperUtils.Logger.error('Error getting from localStorage:', error);
        return defaultValue;
      }
    },
    
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        HelperUtils.Logger.error('Error setting localStorage:', error);
        return false;
      }
    },
    
    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        HelperUtils.Logger.error('Error removing from localStorage:', error);
        return false;
      }
    },
    
    clear: () => {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        HelperUtils.Logger.error('Error clearing localStorage:', error);
        return false;
      }
    }
  },

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - Raw user input
   * @returns {string} Sanitized input
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Format greeting message with proper capitalization
   * @param {string} name - User's name
   * @returns {string} Formatted greeting
   */
  formatGreeting(name) {
    if (!name || typeof name !== 'string') {
      return 'Hello, World!';
    }
    
    const sanitizedName = this.sanitizeInput(name.trim());
    if (sanitizedName.length === 0) {
      return 'Hello, World!';
    }
    
    // Capitalize first letter of each word
    const formattedName = sanitizedName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return `Hello, ${formattedName}!`;
  },

  /**
   * Format name for display
   * @param {string} name - Name to format
   * @returns {string}
   */
  formatName(name) {
    if (!name || typeof name !== 'string') return '';
    
    return name
      .trim()
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Add CSS class with animation support
   * @param {Element} element - DOM element
   * @param {string} className - CSS class to add
   * @param {number} duration - Animation duration (optional)
   */
  addClassWithAnimation(element, className, duration = 500) {
    if (!element || !className) return;
    
    element.classList.add(className);
    
    if (duration > 0) {
      setTimeout(() => {
        element.classList.remove(className);
      }, duration);
    }
  },

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Element or selector to scroll to
   */
  smoothScrollTo(target) {
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
      
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  },

  /**
   * Generate random greeting variations
   * @returns {string} Random greeting
   */
  getRandomGreeting() {
    const greetings = [
      'Hello, World!',
      'Welcome to our amazing app!',
      'Greetings from the digital world!',
      'Hi there, wonderful user!',
      'Salutations and good day!',
      'Hello and welcome aboard!',
      'Greetings, fellow human!',
      'Welcome to the future of web apps!'
    ];
    
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  },

  /**
   * Validate input length and content
   * @param {string} input - Input to validate
   * @param {number} maxLength - Maximum allowed length
   * @returns {object} Validation result
   */
  validateInput(input, maxLength = 50) {
    const result = {
      isValid: true,
      errors: []
    };
    
    if (typeof input !== 'string') {
      result.isValid = false;
      result.errors.push('Input must be a string');
      return result;
    }
    
    if (input.length > maxLength) {
      result.isValid = false;
      result.errors.push(`Input must be less than ${maxLength} characters`);
    }
    
    // Check for potentially harmful content
    const harmful = /<script|javascript:|data:|vbscript:/i;
    if (harmful.test(input)) {
      result.isValid = false;
      result.errors.push('Invalid content detected');
    }
    
    return result;
  },

  /**
   * Simple event emitter for component communication
   */
  EventEmitter: {
    events: {},
    
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
    
    emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(callback => callback(data));
      }
    },
    
    off(event, callback) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      }
    }
  },

  // Accessibility utility functions
  accessibility: {
    /**
     * Announce message to screen readers
     * @param {string} message - Message to announce
     * @param {string} priority - 'polite' or 'assertive'
     */
    announce(message, priority = 'polite') {
      const announcer = this.getOrCreateAnnouncer(priority);
      
      // Clear and set message with small delay for better screen reader detection
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    },

    /**
     * Create or get existing live region for announcements
     * @param {string} priority - Priority level
     * @returns {HTMLElement} - The announcer element
     */
    getOrCreateAnnouncer(priority = 'polite') {
      const id = `announcer-${priority}`;
      let announcer = document.getElementById(id);
      
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = id;
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = 'position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;';
        document.body.appendChild(announcer);
      }
      
      return announcer;
    },

    /**
     * Focus element with proper error handling and timeout
     * @param {HTMLElement|string} elementOrSelector - Element or CSS selector
     * @param {number} delay - Delay in milliseconds
     */
    focusElement(elementOrSelector, delay = 0) {
      const element = typeof elementOrSelector === 'string' 
        ? document.querySelector(elementOrSelector)
        : elementOrSelector;
        
      if (!element) {
        console.warn('Focus target not found:', elementOrSelector);
        return;
      }

      const focusAction = () => {
        try {
          // Make element focusable if it isn't already
          if (!element.hasAttribute('tabindex') && !this.isNaturallyFocusable(element)) {
            element.setAttribute('tabindex', '-1');
          }
          
          element.focus();
          
          // Scroll into view if needed
          if (!this.isElementInViewport(element)) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'center'
            });
          }
        } catch (error) {
          console.warn('Failed to focus element:', error);
        }
      };

      if (delay > 0) {
        setTimeout(focusAction, delay);
      } else {
        focusAction();
      }
    },

    /**
     * Check if element is naturally focusable
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - True if naturally focusable
     */
    isNaturallyFocusable(element) {
      const focusableElements = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'iframe'
      ];
      
      return focusableElements.some(selector => element.matches(selector));
    },

    /**
     * Check if element is in viewport (accessibility-specific implementation)
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - True if in viewport
     */
    isElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    /**
     * Get all focusable elements within a container
     * @param {HTMLElement} container - Container element
     * @returns {Array<HTMLElement>} - Array of focusable elements
     */
    getFocusableElements(container = document) {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        'iframe',
        'details[open] summary',
      ].join(', ');
      
      return Array.from(container.querySelectorAll(focusableSelectors))
        .filter(element => this.isVisible(element));
    },

    /**
     * Check if element is visible (not hidden via CSS)
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - True if visible
     */
    isVisible(element) {
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && 
             style.visibility !== 'hidden' && 
             style.opacity !== '0' &&
             element.offsetParent !== null;
    },

    /**
     * Trap focus within a container (useful for modals)
     * @param {HTMLElement} container - Container to trap focus within
     * @param {HTMLElement} trigger - Element that triggered the trap (for restoration)
     * @returns {Function} Cleanup function
     */
    trapFocus(container, trigger = null) {
      const focusableElements = this.getFocusableElements(container);
      
      if (focusableElements.length === 0) {
        container.setAttribute('tabindex', '-1');
        container.focus();
        return () => {};
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus first element
      firstElement.focus();

      const handleKeyDown = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      container.addEventListener('keydown', handleKeyDown);

      // Return cleanup function
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
        if (trigger && this.isVisible(trigger)) {
          trigger.focus();
        }
      };
    },

    /**
     * Setup keyboard navigation for a group of elements
     * @param {Array<HTMLElement>} elements - Elements to navigate between
     * @param {Object} options - Navigation options
     */
    setupKeyboardNavigation(elements, options = {}) {
      const {
        wrap = true,
        orientation = 'both', // 'horizontal', 'vertical', or 'both'
        activateOnFocus = false
      } = options;

      elements.forEach((element, index) => {
        element.addEventListener('keydown', (e) => {
          let targetIndex;
          const isHorizontal = orientation === 'horizontal' || orientation === 'both';
          const isVertical = orientation === 'vertical' || orientation === 'both';

          switch (e.key) {
            case 'ArrowRight':
              if (!isHorizontal) return;
              e.preventDefault();
              targetIndex = wrap ? (index + 1) % elements.length : Math.min(index + 1, elements.length - 1);
              break;
              
            case 'ArrowLeft':
              if (!isHorizontal) return;
              e.preventDefault();
              targetIndex = wrap ? (index - 1 + elements.length) % elements.length : Math.max(index - 1, 0);
              break;

            case 'ArrowDown':
              if (!isVertical) return;
              e.preventDefault();
              targetIndex = wrap ? (index + 1) % elements.length : Math.min(index + 1, elements.length - 1);
              break;

            case 'ArrowUp':
              if (!isVertical) return;
              e.preventDefault();
              targetIndex = wrap ? (index - 1 + elements.length) % elements.length : Math.max(index - 1, 0);
              break;

            case 'Home':
              e.preventDefault();
              targetIndex = 0;
              break;

            case 'End':
              e.preventDefault();
              targetIndex = elements.length - 1;
              break;

            default:
              return;
          }

          if (targetIndex !== undefined) {
            elements[targetIndex].focus();
            
            if (activateOnFocus) {
              elements[targetIndex].click();
            }
          }
        });
      });
    },

    /**
     * Validate color contrast ratio
     * @param {string} foreground - Foreground color (hex, rgb, etc.)
     * @param {string} background - Background color (hex, rgb, etc.)
     * @returns {Object} - Contrast ratio and compliance info
     */
    checkContrast(foreground, background) {
      const getLuminance = (color) => {
        const rgb = this.parseColor(color);
        const [r, g, b] = rgb.map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const l1 = getLuminance(foreground);
      const l2 = getLuminance(background);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      return {
        ratio: Math.round(ratio * 100) / 100,
        AA: ratio >= 4.5,
        AAA: ratio >= 7,
        AALarge: ratio >= 3
      };
    },

    /**
     * Parse color string to RGB array
     * @param {string} color - Color string
     * @returns {Array<number>} - RGB values
     */
    parseColor(color) {
      // Create a temporary element to parse the color
      const temp = document.createElement('div');
      temp.style.color = color;
      document.body.appendChild(temp);
      const computed = window.getComputedStyle(temp).color;
      document.body.removeChild(temp);

      const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
    },

    /**
     * Check if user prefers high contrast
     * @returns {boolean} - True if high contrast is preferred
     */
    prefersHighContrast() {
      return window.matchMedia('(prefers-contrast: high)').matches;
    },

    /**
     * Check if user prefers dark color scheme
     * @returns {boolean} - True if dark mode is preferred
     */
    prefersDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.HelperUtils = HelperUtils;
  // Maintain backward compatibility with the Helpers alias
  window.Helpers = HelperUtils;
  
  // Also export as AppUtils for consistency with new functionality
  window.AppUtils = {
    debounce: HelperUtils.debounce.bind(HelperUtils),
    throttle: HelperUtils.throttle.bind(HelperUtils),
    isInViewport: HelperUtils.isInViewport.bind(HelperUtils),
    getBrowserInfo: HelperUtils.getBrowserInfo.bind(HelperUtils),
    Logger: HelperUtils.Logger,
    Storage: HelperUtils.Storage,
    domReady: HelperUtils.domReady.bind(HelperUtils),
    isValidEmail: HelperUtils.isValidEmail.bind(HelperUtils),
    formatName: HelperUtils.formatName.bind(HelperUtils)
  };
}

// Module export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelperUtils;
}
