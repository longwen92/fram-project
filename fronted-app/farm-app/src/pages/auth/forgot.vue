<template>

  <view class="forgot-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">忘记密码码</text>

        <text class="text-gray-600 block mt-2">重置您的账户密码码</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-md mx-auto">

        <!-- 表单 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="space-y-4">

            <!-- 手机号?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">手机号?/text>

              <input

                type="tel"

                placeholder="请输入注册手机号号"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.phone"

              />

            </view>



            <!-- 验证码?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">验证码?/text>

              <view class="flex gap-2">

                <input

                  type="text"

                  placeholder="请输入验证码码"

                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  v-model="form.code"

                />

                <button

                  @tap="sendCode"

                  :disabled="codeCountdown > 0"

                  :class="`px-4 py-3 rounded-lg ${codeCountdown > 0 ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover-bg-green-700'}`"

                >

                  {{ codeCountdown > 0 ? `${codeCountdown}s后重试` : '获取验证码? }}

                </button>

              </view>

            </view>



            <!-- 新密码?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">新密码?/text>

              <input

                type="password"

                placeholder="请输入新密码码?-20位字符）"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.newPassword"

              />

            </view>



            <!-- 确认新密码?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">确认新密码?/text>

              <input

                type="password"

                placeholder="请再次输入新密码码"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.confirmPassword"

              />

            </view>

          </view>



          <!-- 重置按钮 -->

          <button

            @tap="handleReset"

            :disabled="!canSubmit"

            :class="`w-full py-4 mt-6 rounded-lg font-bold text-lg ${canSubmit ? 'bg-green-600 text-white hover-bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`"

          >

            重置密码码

          </button>



          <!-- 返回登录 -->

          <view class="mt-6 pt-6 border-t text-center">

            <button @tap="gotoLogin" class="text-green-600 hover-text-green-700 font-medium">

              ?返回登录

            </button>

          </view>

        </view>



        <!-- 提示信息 -->

        <view class="bg-blue-50 border border-blue-200 rounded-xl p-4">

          <text class="text-blue-800 text-sm block">

            <text class="font-bold">提示?/text>

            请输入注册时使用的手机号号，系统将发送验证码码到该手机号号?          </text>

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

        code: '',

        newPassword: '',

        confirmPassword: '',

      },

      codeCountdown: 0,

    };

  },

  computed: {

    canSubmit() {

      return (

        this.form.phone &&

        this.form.code &&

        this.form.newPassword &&

        this.form.confirmPassword

      );

    },

  },

  methods: {

    sendCode() {

      if (!this.form.phone) {

        uni.showToast({

          title: '请输入手机号号',

          icon: 'none',

        });

        return;

      }



      // 模拟发送验证码码

      uni.showToast({

        title: '验证码码已发?,

        icon: 'success',

      });



      this.codeCountdown = 60;

      const timer = setInterval(() => {

        this.codeCountdown--;

        if (this.codeCountdown <= 0) {

          clearInterval(timer);

        }

      }, 1000);

    },

    handleReset() {

      if (!this.canSubmit) {

        return;

      }



      if (this.form.newPassword !== this.form.confirmPassword) {

        uni.showToast({

          title: '两次密码码输入不一?,

          icon: 'none',

        });

        return;

      }



      if (this.form.newPassword.length < 6) {

        uni.showToast({

          title: '密码码长度至少6?,

          icon: 'none',

        });

        return;

      }



      // 模拟重置成功

      uni.showToast({

        title: '密码码重置成功',

        icon: 'success',

      });



      setTimeout(() => {

        uni.navigateTo({

          url: '/pages/auth/login',

        });

      }, 1500);

    },

    gotoLogin() {

      uni.navigateTo({

        url: '/pages/auth/login',

      });

    },

  },

};

</script>



<style>

.forgot-page {

  /* 基础样式 */

}

</style>

