module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/.*\\.(test|spec)\\.tsx?$',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
