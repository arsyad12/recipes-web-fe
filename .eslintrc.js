module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs,jsx}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    '@stylistic/js',
    '@stylistic/jsx'
  ],
  rules: {
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    'no-tabs': ['warn', { allowIndentationTabs: true }],
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'no-unused-vars': 'warn',
    'multiline-ternary': ['warn', 'always-multiline']
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53'
    }
  }
}
