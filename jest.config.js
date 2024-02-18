const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/app/components/$1",
    "^@/pages/(.*)$": "<rootDir>/app/pages/$1",
    "^@/styles/(.*)$": "<rootDir>/app/styles/$1",
    "^@/utils/(.*)$": "<rootDir>/app/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/app/hooks/$1",
    "^@/lib/(.*)$": "<rootDir>/app/lib/$1",
    "^@/types/(.*)$": "<rootDir>/app/types/$1",
    "^@/config$": "<rootDir>/config",
  },
  setupFiles: ["jest-fetch-mock/setupJest"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
