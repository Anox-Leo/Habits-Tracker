module.exports = {
  displayName: 'habit-tracker-post-audit',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/habit-tracker-post-audit',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/../../node_modules/@nx/react/plugins/jest',
  },
};
