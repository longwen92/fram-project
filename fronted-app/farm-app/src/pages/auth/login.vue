<template>

  <view class="login-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">登录账号</text>

        <text class="text-gray-600 block mt-2">欢迎回到惠农网</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-md mx-auto">

        <!-- 表单 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="space-y-4">

            <!-- 手机号?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">手机号</text>

              <input

                type="tel"

                placeholder="请输入手机号号"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.phone"

              />

            </view>



            <!-- 密码码 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">密码码</text>

              <input

                type="password"

                placeholder="请输入密码?

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.password"

              />

            </view>



            <!-- 记住?-->

            <view class="flex items-center justify-between">

              <label class="flex items-center">

                <input

                  type="checkbox"

                  class="h-4 w-4 text-green-600 focus-ring-green-500 border-gray-300 rounded"

                  v-model="form.remember"

                />

                <text class="ml-2 text-sm text-gray-600">记住</text>

              </label>

              <button @tap="gotoForgotPassword" class="text-sm text-green-600 hover-text-green-700">

                忘记密码码?              </button>

            </view>

          </view>



          <!-- 登录按钮 -->

          <button

            @tap="handleLogin"

            :disabled="!form.phone || !form.password"

            :class="`w-full py-4 mt-6 rounded-lg font-bold text-lg ${form.phone && form.password ? 'bg-green-600 text-white hover-bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`"

          >

            登录

          </button>



          <!-- 快捷登录 -->

          <view class="mt-6 pt-6 border-t">

            <text class="block text-sm text-gray-600 text-center mb-4">快捷登录</text>

            <view class="flex justify-center space-x-4">

              <button class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover-bg-blue-200">

                <text class="text-xl">💬</text>

              </button>

              <button class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hover-bg-green-200">

                <text class="text-xl">💰</text>

              </button>

              <button class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center hover-bg-red-200">

                <text class="text-xl">🍎</text>

              </button>

            </view>

          </view>

        </view>



        <!-- 注册链接 -->

        <view class="text-center">

          <text class="text-gray-600">还没有账号？</text>

          <button @tap="gotoRegister" class="text-green-600 hover-text-green-700 font-medium ml-1">

            立即注册

          </button>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      form: {

        phone: '',

        password: '',

        remember: false,

      },

    };

  },

  methods: {

    handleLogin() {

      if (!this.form.phone || !this.form.password) {

        return;

      }



      // 模拟登录成功

      uni.showToast({

        title: '登录成功',

        icon: 'success',

      });



      setTimeout(() => {

        uni.switchTab({

          url: '/pages/index/index',

        });

      }, 1500);

    },

    gotoRegister() {

      uni.navigateTo({

        url: '/pages/auth/register',

      });

    },

    gotoForgotPassword() {

      uni.navigateTo({

        url: '/pages/auth/forgot',

      });

    },

  },

};

</script>



<style>

.login-page {

  /* 基础样式 */

}

</style></result>

