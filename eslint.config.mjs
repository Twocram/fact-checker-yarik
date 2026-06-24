import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  vue: true,
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
  ],
}, {
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'style/semi': ['error', 'always'],
  },
}, {
  files: ['apps/bot/src/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
});
