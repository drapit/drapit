/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/tests/**/?(*.)+(spec|test).[tj]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  moduleDirectories: ['node_modules', 'src'],
  verbose: true
};
