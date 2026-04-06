import { defineConfig } from 'vite'
// uni-app 插件使用 CommonJS，需要用 require
const uni = require('@dcloudio/vite-plugin-uni').default

// 临时修复 global.uniPlugin 未定义
if (typeof global !== 'undefined' && !global.uniPlugin) {
  global.uniPlugin = {
    options: {},
    preprocess: {},
    platforms: []
  }
}

export default defineConfig({
  plugins: [uni()]
})
