const config = require('./jest.config');
config.testMatch = ['<rootDir>/src/**/*.test.ts'];
config.setupFilesAfterEnv = ['<rootDir>/src/config/jest-setup.ts'];
config.displayName = 'end2end-test';

module.exports = config;
