import chalk from 'chalk';

const log = (message: string, breaks: number = 1) => {
  process.stdout.write(`${message}${'\n'.repeat(breaks)}`);
};

const logInfo = (message: string, breaks: number = 1) => {
  log(`${chalk.cyan('→')} ${message}`, breaks);
};

const logSuccess = (message: string, breaks: number = 1) => {
  log(`${chalk.green('✓')} ${message}`, breaks);
};

const logError = (message: string, breaks: number = 1) => {
  log(`${chalk.red('✗')} ${message}`, breaks);
};

export { logInfo, logSuccess, logError };
