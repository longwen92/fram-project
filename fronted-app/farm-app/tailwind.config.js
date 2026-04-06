/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './*.vue',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 禁用 preflight，避免与小程序样式冲突
  corePlugins: {
    preflight: false,
  },
}
