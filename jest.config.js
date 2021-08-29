/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/tests/**/?(*.)+(spec|test).ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  moduleDirectories: ['node_modules', 'src'],
  verbose: true
};
