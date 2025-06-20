import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],

  clearMocks: true,
  collectCoverage: true,

  collectCoverageFrom: [
    './src/modules/**/application/services/*.ts',
    './src/modules/**/application/useCases/*.ts',
    '!./src/main.ts',
    '!./src/exceptions.filter.ts',
    './src/modules/**/*Error.ts',
  ],

  coveragePathIgnorePatterns: ['<rootDir>/dist/'],
  coverageDirectory: 'coverage',

  testMatch: ['**/*.test.ts', '**/*.spec.ts'],

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  coverageProvider: 'v8',

  coverageReporters: ['json', 'text', 'lcov', 'clover', 'text-summary'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  testEnvironment: 'node',
  resetMocks: true,
  rootDir: './',
};

export default config;
