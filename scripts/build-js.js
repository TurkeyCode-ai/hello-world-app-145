const fs = require('fs-extra');
const path = require('path');
const UglifyJS = require('uglify-js');

async function buildJS() {
    console.log('Building JavaScript...');
    
    try {
        // Ensure dist directory exists
        await fs.ensureDir('dist');
        
        // Read the main JS file
        const jsContent = await fs.readFile('app.js', 'utf8');
        
        // Minify JavaScript for production
        const result = UglifyJS.minify(jsContent, {
            compress: {
                drop_console: process.env.NODE_ENV === 'production',
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'],
            },
            mangle: {
                toplevel: true,
            },
            output: {
                comments: false,
            },
        });
        
        if (result.error) {
            console.error('JavaScript build error:', result.error);
            process.exit(1);
        }
        
        // Write minified JS to dist
        await fs.writeFile('dist/app.js', result.code);
        
        // Copy index.html to dist and update references
        let htmlContent = await fs.readFile('index.html', 'utf8');
        
        // Update script and style references for production
        htmlContent = htmlContent.replace('styles.css', 'styles.css');
        htmlContent = htmlContent.replace('app.js', 'app.js');
        
        await fs.writeFile('dist/index.html', htmlContent);
        
        console.log('✅ JavaScript build completed');
        console.log(`   Original size: ${jsContent.length} bytes`);
        console.log(`   Minified size: ${result.code.length} bytes`);
        console.log(`   Savings: ${((jsContent.length - result.code.length) / jsContent.length * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ JavaScript build failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    buildJS();
}

module.exports = buildJS;