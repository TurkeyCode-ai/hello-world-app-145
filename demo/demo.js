/**
 * Hello World Web Application Demo
 * Interactive JavaScript functionality for the demo showcase
 */

class HelloWorldDemo {
    constructor() {
        this.greetings = {
            en: { text: "Hello, World!", subtitle: "Welcome to our interactive demonstration" },
            es: { text: "¡Hola, Mundo!", subtitle: "Bienvenido a nuestra demostración interactiva" },
            fr: { text: "Bonjour, le Monde!", subtitle: "Bienvenue dans notre démonstration interactive" },
            de: { text: "Hallo, Welt!", subtitle: "Willkommen zu unserer interaktiven Demonstration" },
            it: { text: "Ciao, Mondo!", subtitle: "Benvenuto nella nostra dimostrazione interattiva" },
            pt: { text: "Olá, Mundo!", subtitle: "Bem-vindo à nossa demonstração interativa" },
            ru: { text: "Привет, Мир!", subtitle: "Добро пожаловать на нашу интерактивную демонстрацию" },
            ja: { text: "こんにちは、世界！", subtitle: "インタラクティブなデモンストレーションへようこそ" },
            zh: { text: "你好，世界！", subtitle: "欢迎来到我们的互动演示" },
            ar: { text: "مرحبا بالعالم!", subtitle: "مرحبا بكم في عرضنا التفاعلي" }
        };

        this.timeGreetings = {
            en: {
                morning: "Good Morning, World!",
                afternoon: "Good Afternoon, World!",
                evening: "Good Evening, World!",
                night: "Good Night, World!"
            },
            es: {
                morning: "¡Buenos Días, Mundo!",
                afternoon: "¡Buenas Tardes, Mundo!",
                evening: "¡Buenas Tardes, Mundo!",
                night: "¡Buenas Noches, Mundo!"
            },
            fr: {
                morning: "Bonjour, le Monde!",
                afternoon: "Bon Après-midi, le Monde!",
                evening: "Bonsoir, le Monde!",
                night: "Bonne Nuit, le Monde!"
            }
        };

        this.currentLanguage = 'en';
        this.currentTheme = 'modern';
        this.currentAnimation = 'fade';
        
        this.stats = {
            greetingCount: 0,
            languageSwitches: 0,
            themeChanges: 0,
            sessionStartTime: Date.now()
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeStats();
        this.startSessionTimer();
        this.setInitialTimeGreeting();
        this.handleAccessibility();
    }

    setupEventListeners() {
        // Language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Theme selector
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.changeTheme(e.target.value);
            });
        }

        // Animation selector
        const animationSelect = document.getElementById('animation-select');
        if (animationSelect) {
            animationSelect.addEventListener('change', (e) => {
                this.changeAnimation(e.target.value);
            });
        }

        // Action buttons
        const randomizeBtn = document.getElementById('randomize-btn');
        if (randomizeBtn) {
            randomizeBtn.addEventListener('click', () => {
                this.randomizeGreeting();
            });
        }

        const timeGreetingBtn = document.getElementById('time-greeting-btn');
        if (timeGreetingBtn) {
            timeGreetingBtn.addEventListener('click', () => {
                this.showTimeBasedGreeting();
            });
        }

        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetDemo();
            });
        }

        // Code toggle
        const toggleCodeBtn = document.getElementById('toggle-code');
        if (toggleCodeBtn) {
            toggleCodeBtn.addEventListener('click', () => {
                this.toggleCodeSection();
            });
        }

        // Code tabs
        const codeTabs = document.querySelectorAll('.code-tab');
        codeTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchCodeTab(e.target.dataset.tab);
            });
        });

        // Fullscreen button
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        // Share button
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareDemo();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Visibility change handler for pause/resume
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    changeLanguage(language) {
        this.showLoading();
        
        setTimeout(() => {
            this.currentLanguage = language;
            const greeting = this.greetings[language];
            
            if (greeting) {
                this.updateGreeting(greeting.text, greeting.subtitle);
                this.stats.languageSwitches++;
                this.updateStats();
                
                // Handle RTL languages
                if (language === 'ar') {
                    document.body.style.direction = 'rtl';
                } else {
                    document.body.style.direction = 'ltr';
                }
            }
            
            this.hideLoading();
        }, 500);
    }

    changeTheme(theme) {
        this.showLoading();
        
        setTimeout(() => {
            this.currentTheme = theme;
            document.body.dataset.theme = theme;
            
            // Apply theme-specific styling
            const helloContainer = document.querySelector('.hello-container');
            if (helloContainer) {
                helloContainer.className = `hello-container theme-${theme}`;
            }
            
            this.stats.themeChanges++;
            this.updateStats();
            this.hideLoading();
        }, 300);
    }

    changeAnimation(animation) {
        this.currentAnimation = animation;
        const helloText = document.getElementById('hello-text');
        
        if (helloText) {
            // Remove existing animation classes
            helloText.className = 'hello-text';
            
            // Add new animation class
            switch (animation) {
                case 'fade':
                    helloText.classList.add('animate-fade');
                    break;
                case 'slide':
                    helloText.classList.add('animate-slide');
                    break;
                case 'bounce':
                    helloText.classList.add('animate-bounce');
                    break;
                case 'typewriter':
                    helloText.classList.add('typewriter-effect');
                    break;
                case 'pulse':
                    helloText.classList.add('animate-pulse');
                    break;
                case 'rotate':
                    helloText.style.animation = 'rotate 0.6s ease-out';
                    break;
            }
        }
    }

    updateGreeting(text, subtitle, timeInfo = '') {
        const helloText = document.getElementById('hello-text');
        const helloSubtitle = document.getElementById('hello-subtitle');
        const greetingTime = document.getElementById('greeting-time');

        if (helloText) {
            helloText.textContent = text;
            helloText.setAttribute('aria-label', `Greeting: ${text}`);
            this.changeAnimation(this.currentAnimation);
        }

        if (helloSubtitle) {
            helloSubtitle.textContent = subtitle;
        }

        if (greetingTime) {
            greetingTime.textContent = timeInfo;
        }

        this.stats.greetingCount++;
        this.updateStats();
    }

    randomizeGreeting() {
        const languages = Object.keys(this.greetings);
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
        
        // Update language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = randomLanguage;
        }
        
        this.changeLanguage(randomLanguage);
    }

    showTimeBasedGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let timeOfDay;

        if (hour >= 5 && hour < 12) {
            timeOfDay = 'morning';
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'afternoon';
        } else if (hour >= 17 && hour < 21) {
            timeOfDay = 'evening';
        } else {
            timeOfDay = 'night';
        }

        const timeGreeting = this.timeGreetings[this.currentLanguage]?.[timeOfDay] || 
                           this.timeGreetings.en[timeOfDay];
        
        const timeInfo = `Current time: ${now.toLocaleTimeString()} - ${timeOfDay}`;
        const subtitle = this.greetings[this.currentLanguage]?.subtitle || 
                        this.greetings.en.subtitle;

        this.updateGreeting(timeGreeting, subtitle, timeInfo);
    }

    setInitialTimeGreeting() {
        this.showTimeBasedGreeting();
    }

    resetDemo() {
        this.showLoading();
        
        setTimeout(() => {
            // Reset to defaults
            this.currentLanguage = 'en';
            this.currentTheme = 'modern';
            this.currentAnimation = 'fade';
            
            // Reset UI
            document.getElementById('language-select').value = 'en';
            document.getElementById('theme-select').value = 'modern';
            document.getElementById('animation-select').value = 'fade';
            
            // Reset theme
            document.body.dataset.theme = 'modern';
            document.body.style.direction = 'ltr';
            
            // Reset greeting
            const defaultGreeting = this.greetings.en;
            this.updateGreeting(defaultGreeting.text, defaultGreeting.subtitle);
            
            this.hideLoading();
        }, 500);
    }

    toggleCodeSection() {
        const codeContent = document.getElementById('code-content');
        const toggleBtn = document.getElementById('toggle-code');
        
        if (codeContent) {
            const isVisible = codeContent.classList.contains('show');
            
            if (isVisible) {
                codeContent.classList.remove('show');
                toggleBtn.textContent = 'View Code';
                toggleBtn.setAttribute('aria-expanded', 'false');
                codeContent.setAttribute('aria-hidden', 'true');
            } else {
                codeContent.classList.add('show');
                toggleBtn.textContent = 'Hide Code';
                toggleBtn.setAttribute('aria-expanded', 'true');
                codeContent.setAttribute('aria-hidden', 'false');
            }
        }
    }

    switchCodeTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.code-tab').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Update panels
        document.querySelectorAll('.code-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tab}-panel`).classList.add('active');
    }

    toggleFullscreen() {
        const helloShowcase = document.getElementById('hello-showcase');
        
        if (!document.fullscreenElement) {
            if (helloShowcase.requestFullscreen) {
                helloShowcase.requestFullscreen();
            } else if (helloShowcase.webkitRequestFullscreen) {
                helloShowcase.webkitRequestFullscreen();
            } else if (helloShowcase.msRequestFullscreen) {
                helloShowcase.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    shareDemo() {
        if (navigator.share) {
            navigator.share({
                title: 'Hello World Web Application Demo',
                text: 'Check out this interactive Hello World demo with multiple languages and themes!',
                url: window.location.href
            });
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('Demo URL copied to clipboard!');
            });
        }
    }

    handleKeyboardShortcuts(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'r':
                    event.preventDefault();
                    this.randomizeGreeting();
                    break;
                case 't':
                    event.preventDefault();
                    this.showTimeBasedGreeting();
                    break;
                case 'h':
                    event.preventDefault();
                    this.resetDemo();
                    break;
                case 'f':
                    event.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        }
    }

    handleResize() {
        // Adjust layout for responsive design
        const helloText = document.getElementById('hello-text');
        if (helloText && window.innerWidth < 768) {
            helloText.style.fontSize = 'clamp(1.5rem, 10vw, 3rem)';
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            document.body.style.animationPlayState = 'paused';
        } else {
            // Resume animations when tab becomes visible
            document.body.style.animationPlayState = 'running';
        }
    }

    handleAccessibility() {
        // Announce changes to screen readers
        this.createAriaLiveRegion();
        
        // Handle prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }
        
        // Handle high contrast mode
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }
    }

    createAriaLiveRegion() {
        if (!document.getElementById('aria-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'aria-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('show');
            loadingOverlay.setAttribute('aria-hidden', 'false');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
            loadingOverlay.setAttribute('aria-hidden', 'true');
        }
    }

    showNotification(message) {
        // Create and show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-heavy);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    initializeStats() {
        this.updateStats();
    }

    updateStats() {
        const greetingCountEl = document.getElementById('greeting-count');
        const languageSwitchesEl = document.getElementById('language-switches');
        const themeChangesEl = document.getElementById('theme-changes');
        
        if (greetingCountEl) {
            greetingCountEl.textContent = this.stats.greetingCount.toLocaleString();
        }
        
        if (languageSwitchesEl) {
            languageSwitchesEl.textContent = this.stats.languageSwitches.toLocaleString();
        }
        
        if (themeChangesEl) {
            themeChangesEl.textContent = this.stats.themeChanges.toLocaleString();
        }
    }

    startSessionTimer() {
        setInterval(() => {
            const sessionTimeEl = document.getElementById('session-time');
            if (sessionTimeEl) {
                const elapsedMs = Date.now() - this.stats.sessionStartTime;
                const minutes = Math.floor(elapsedMs / 60000);
                const seconds = Math.floor((elapsedMs % 60000) / 1000);
                sessionTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
}

// Additional CSS animations for dynamic injection
const additionalStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.reduce-motion *,
.reduce-motion *::before,
.reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

.high-contrast {
    filter: contrast(2);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the demo when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.helloWorldDemo = new HelloWorldDemo();
});

// Service Worker registration for offline functionality (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/demo/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HelloWorldDemo;
}