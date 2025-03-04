import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
 
   // onTestBegin(test: TestCase) {
   //     console.log(`========================================`);
   //     console.log(`Starting test: ${test.title}`);
   // }
 
    onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status === 'passed' ? 'PASSED' : 'FAILED';
    console.log(`Test ${test.title} ${status}`);
    console.log(`========================================`);
  }

  onEnd() {
    console.log('All tests finished');
  }
}

export default CustomReporter;