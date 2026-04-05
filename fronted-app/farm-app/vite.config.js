import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

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