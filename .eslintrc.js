module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended','eslint:recommended', ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/no-dupe-keys': 'warn',
    "indent": ["error", 2],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
