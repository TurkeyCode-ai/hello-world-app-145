// Hello World App - Client-side JavaScript
(function() {
    'use strict';
    
    // DOM elements
    const fetchBtn = document.getElementById('fetchBtn');
    const healthBtn = document.getElementById('healthBtn');
    const response = document.getElementById('response');
    const environmentSpan = document.getElementById('environment');
    const statusSpan = document.getElementById('status');
    
    // State management
    let isLoading = false;
    
    // Utility functions
    function updateStatus(status, className = '') {
        statusSpan.textContent = status;
        statusSpan.className = `status-indicator ${className}`;
    }
    
    function showResponse(data, type = 'info') {
        response.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        response.className = `response show ${type}`;
        response.setAttribute('aria-label', `API Response: ${type}`);
    }
    
    function setLoading(loading) {
        isLoading = loading;
        fetchBtn.disabled = loading;
        healthBtn.disabled = loading;
        
        if (loading) {
            updateStatus('Loading...', 'status-loading');
        } else {
            updateStatus('Ready', 'status-ready');
        }
    }
    
    // API functions
    async function fetchApiData(endpoint, buttonText = 'Loading...') {
        if (isLoading) return;
        
        setLoading(true);
        const originalText = fetchBtn.textContent;
        fetchBtn.textContent = buttonText;
        
        try {
            const res = await fetch(endpoint);
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            const data = await res.json();
            showResponse(data, 'success');
            
            // Update environment if we got it from the API
            if (data.environment && endpoint === '/api/hello') {
                environmentSpan.textContent = data.environment;
            }
            
        } catch (error) {
            console.error('API Error:', error);
            showResponse(`Error: ${error.message}`, 'error');
            updateStatus('Error', 'status-error');
        } finally {
            setLoading(false);
            fetchBtn.textContent = originalText;
            healthBtn.textContent = 'Health Check';
        }
    }
    
    async function checkHealth() {
        if (isLoading) return;
        
        const originalText = healthBtn.textContent;
        healthBtn.textContent = 'Checking...';
        
        await fetchApiData('/health', 'Checking...');
    }
    
    // Event listeners
    fetchBtn.addEventListener('click', () => {
        fetchApiData('/api/hello', 'Fetching...');
    });
    
    healthBtn.addEventListener('click', checkHealth);
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === fetchBtn || e.target === healthBtn) {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Initialize app
    function init() {
        console.log('Hello World App initialized');
        updateStatus('Ready', 'status-ready');
        environmentSpan.textContent = 'Unknown';
        
        // Initial health check
        setTimeout(() => {
            checkHealth();
        }, 1000);
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Error handling for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        showResponse(`Unhandled error: ${event.reason}`, 'error');
        updateStatus('Error', 'status-error');
    });
    
})();