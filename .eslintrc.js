// 基于AlloyTeam ESLint 规则进行修改：@beisen/eslint-config-beisenux
module.exports = {
  plugins: ['react-hooks'],
  extends: [
    '@beisen/eslint-config-beisenux/react', //react规则
    // "@beisen/eslint-config-beisenux/typescript-react", //ts react规则
    // "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // jQuery: false,
    // $: false
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    'no-return-assign': 0
  },
  settings: {
    react: {
      version: 'latest' // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    }
  }
};
