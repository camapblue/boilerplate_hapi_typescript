module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/__jest__/setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFiles: ['dotenv/config'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.(interface|constant|type|validator|redisClient|index).{ts,js}',
    '!src/**/(interface|constant|type|validator|redisClient|index).{ts,js}',
    '!**/__mocks__/**',
    '!**/node_modules/**',
    '!**/internalAdapter/**',
    '!**/tracking/**'
  ]
};
