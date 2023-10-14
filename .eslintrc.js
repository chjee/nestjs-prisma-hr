export const parser = '@typescript-eslint/parser';
export const parserOptions = {
  project: 'tsconfig.json',
  tsconfigRootDir: __dirname,
  sourceType: 'module',
};
export const plugins = ['@typescript-eslint/eslint-plugin'];
export const extendsArr = [
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
];
export const root = true;
export const env = {
  node: true,
  jest: true,
};
export const ignorePatterns = ['.eslintrc.js'];
export const rules = {
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
};
