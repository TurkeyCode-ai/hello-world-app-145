/**
 * Comprehensive Test Runner
 * Orchestrates all test suites and generates reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.testResults = {
      unit: { passed: 0, failed: 0, skipped: 0 },
      integration: { passed: 0, failed: 0, skipped: 0 },
      e2e: { passed: 0, failed: 0, skipped: 0 },
      accessibility: { passed: 0, failed: 0, violations: 0 },
      performance: { passed: 0, failed: 0, scores: {} },
      visual: { passed: 0, failed: 0, skipped: 0 }
    };
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🚀 Starting comprehensive test suite...\n');
    
    try {
      // Run unit tests
      console.log('1️⃣ Running Unit Tests...');
      await this.runUnitTests();
      
      // Run integration tests
      console.log('\n2️⃣ Running Integration Tests...');
      await this.runIntegrationTests();
      
      // Start local server for E2E tests
      console.log('\n🖥️  Starting local server...');
      const server = this.startLocalServer();
      
      // Wait for server to start
      await this.waitForServer();
      
      // Run E2E tests
      console.log('\n3️⃣ Running End-to-End Tests...');
      await this.runE2ETests();
      
      // Run accessibility tests
      console.log('\n4️⃣ Running Accessibility Tests...');
      await this.runAccessibilityTests();
      
      // Run performance tests
      console.log('\n5️⃣ Running Performance Tests...');
      await this.runPerformanceTests();
      
      // Run visual regression tests
      console.log('\n6️⃣ Running Visual Regression Tests...');
      await this.runVisualTests();
      
      // Stop server
      if (server) {
        server.kill();
      }
      
      // Generate comprehensive report
      await this.generateReport();
      
    } catch (error) {
      console.error('💥 Test suite failed:', error);
      process.exit(1);
    }
  }

  async runUnitTests() {
    try {
      const output = execSync('npm run test -- --coverage --json', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const result = JSON.parse(output.split('\n').pop());
      this.testResults.unit = {
        passed: result.numPassedTests,
        failed: result.numFailedTests,
        skipped: result.numPendingTests,
        coverage: result.coverageMap
      };
      
      console.log('✅ Unit tests completed');
    } catch (error) {
      console.log('❌ Unit tests failed');
      this.testResults.unit.failed += 1;
    }
  }

  async runIntegrationTests() {
    try {
      execSync('npm run test -- tests/integration/', { stdio: 'inherit' });
      this.testResults.integration.passed += 1;
      console.log('✅ Integration tests completed');
    } catch (error) {
      console.log('❌ Integration tests failed');
      this.testResults.integration.failed += 1;
    }
  }

  async runE2ETests() {
    try {
      execSync('npm run test:e2e', { stdio: 'inherit' });
      this.testResults.e2e.passed += 1;
      console.log('✅ E2E tests completed');
    } catch (error) {
      console.log('❌ E2E tests failed');
      this.testResults.e2e.failed += 1;
    }
  }

  async runAccessibilityTests() {
    try {
      execSync('npm run test:accessibility', { stdio: 'inherit' });
      this.testResults.accessibility.passed += 1;
      console.log('✅ Accessibility tests completed');
    } catch (error) {
      console.log('❌ Accessibility tests failed');
      this.testResults.accessibility.failed += 1;
    }
  }

  async runPerformanceTests() {
    try {
      execSync('npm run test:performance', { stdio: 'inherit' });
      this.testResults.performance.passed += 1;
      console.log('✅ Performance tests completed');
    } catch (error) {
      console.log('❌ Performance tests failed');
      this.testResults.performance.failed += 1;
    }
  }

  async runVisualTests() {
    try {
      execSync('npx playwright test tests/visual/', { stdio: 'inherit' });
      this.testResults.visual.passed += 1;
      console.log('✅ Visual regression tests completed');
    } catch (error) {
      console.log('❌ Visual regression tests failed');
      this.testResults.visual.failed += 1;
    }
  }

  startLocalServer() {
    try {
      const { spawn } = require('child_process');
      const server = spawn('npx', ['http-server', '.', '-p', '3000'], {
        stdio: 'pipe'
      });
      
      console.log('🖥️  Local server started on port 3000');
      return server;
    } catch (error) {
      console.error('Failed to start local server:', error);
      return null;
    }
  }

  async waitForServer() {
    const http = require('http');
    
    return new Promise((resolve, reject) => {
      const checkServer = () => {
        const req = http.get('http://localhost:3000', (res) => {
          resolve();
        });
        
        req.on('error', () => {
          setTimeout(checkServer, 1000);
        });
      };
      
      setTimeout(checkServer, 2000);
    });
  }

  async generateReport() {
    const endTime = Date.now();
    const duration = Math.round((endTime - this.startTime) / 1000);
    
    const report = {
      summary: {
        totalDuration: `${duration}s`,
        timestamp: new Date().toISOString(),
        overall: this.calculateOverallStatus()
      },
      results: this.testResults,
      recommendations: this.generateRecommendations()
    };
    
    // Write detailed report
    const reportPath = path.join(__dirname, '../test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Print summary
    console.log('\n📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Duration: ${duration}s`);
    console.log(`Overall Status: ${report.summary.overall}`);
    console.log('\nDetailed Results:');
    
    Object.entries(this.testResults).forEach(([suite, results]) => {
      const passed = results.passed || 0;
      const failed = results.failed || 0;
      const status = failed === 0 ? '✅' : '❌';
      console.log(`${status} ${suite}: ${passed} passed, ${failed} failed`);
    });
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => console.log(`- ${rec}`));
    }
    
    console.log(`\n📁 Detailed report saved to: ${reportPath}`);
    
    // Exit with appropriate code
    const overallSuccess = report.summary.overall === 'PASSED';
    process.exit(overallSuccess ? 0 : 1);
  }

  calculateOverallStatus() {
    const hasFailures = Object.values(this.testResults).some(result => 
      result.failed > 0
    );
    return hasFailures ? 'FAILED' : 'PASSED';
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.testResults.unit.failed > 0) {
      recommendations.push('Fix failing unit tests to ensure code reliability');
    }
    
    if (this.testResults.accessibility.failed > 0) {
      recommendations.push('Address accessibility violations for better user experience');
    }
    
    if (this.testResults.performance.failed > 0) {
      recommendations.push('Optimize performance to meet Core Web Vitals standards');
    }
    
    return recommendations;
  }
}

// Run tests if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runAllTests();
}

module.exports = TestRunner;