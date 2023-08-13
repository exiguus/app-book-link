import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/js-with-babel',
  verbose: true,
  roots: ['<rootDir>'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test|contract).[tj]s?(x)'],
  testPathIgnorePatterns: ['[/\\\\](node_modules|.cache|.vscode|coverage|data|dist)[/\\\\]'],
  coveragePathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage|test|mocks|data|dist)[/\\\\]'
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom'
}

export default config
