const fs = require('fs-extra');
const path = require('path');
const CleanCSS = require('clean-css');

async function buildCSS() {
    console.log('Building CSS...');
    
    try {
        // Ensure dist directory exists
        await fs.ensureDir('dist');
        
        // Read the main CSS file
        const cssContent = await fs.readFile('styles.css', 'utf8');
        
        // Minify CSS for production
        const minified = new CleanCSS({
            level: 2,
            returnPromise: true
        }).minify(cssContent);
        
        const result = await minified;
        
        if (result.errors.length > 0) {
            console.error('CSS build errors:', result.errors);
            process.exit(1);
        }
        
        // Write minified CSS to dist
        await fs.writeFile('dist/styles.css', result.styles);
        
        console.log('✅ CSS build completed');
        console.log(`   Original size: ${cssContent.length} bytes`);
        console.log(`   Minified size: ${result.styles.length} bytes`);
        console.log(`   Savings: ${((cssContent.length - result.styles.length) / cssContent.length * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ CSS build failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    buildCSS();
}

module.exports = buildCSS;