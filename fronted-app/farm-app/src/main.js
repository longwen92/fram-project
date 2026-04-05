import '../polyfill'
import App from './App'

console.log('Main.js loading...')

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp () {
    console.log('Creating Vue 3 App...')
    const app = createSSRApp(App)
    return {
        app
    }
}
// #endif