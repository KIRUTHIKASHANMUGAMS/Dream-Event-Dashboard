module.exports = {
  parser: '@babel/eslint-parser',
  plugins: [ 'simple-import-sort'],
  extends: ['eslint:recommended'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
