<template>

  <view class="register-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">注册账号</text>

        <text class="text-gray-600 block mt-2">加入惠农网，开启农产品交易之旅</text>

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

                placeholder="请输入手机号号"

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



            <!-- 密码码 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">密码码</text>

              <input

                type="password"

                placeholder="请输入密码码（6-20位字符）"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.password"

              />

            </view>



            <!-- 确认密码码 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">确认密码码</text>

              <input

                type="password"

                placeholder="请再次输入密码?

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.confirmPassword"

              />

            </view>



            <!-- 用户类型 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-2">注册身份</text>

              <view class="grid grid-cols-2 gap-3">

                <button

                  @tap="form.userType = 'SUPPLIER'"

                  :class="`p-4 border rounded-lg text-center ${form.userType === 'SUPPLIER' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-300 hover-bg-gray-50'}`"

                >

                  <text class="block text-lg mb-1">👨‍?/text>

                  <text class="font-medium">供应?/text>

                </button>

                <button

                  @tap="form.userType = 'PURCHASER'"

                  :class="`p-4 border rounded-lg text-center ${form.userType === 'PURCHASER' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-300 hover-bg-gray-50'}`"

                >

                  <text class="block text-lg mb-1">👨‍?/text>

                  <text class="font-medium">采购?/text>

                </button>

              </view>

            </view>



            <!-- 协议 -->

            <label class="flex items-start mt-4">

              <input

                type="checkbox"

                class="h-4 w-4 text-green-600 focus-ring-green-500 border-gray-300 rounded mt-0.5"

                v-model="form.agreed"

              />

              <text class="ml-2 text-sm text-gray-600">

                我已阅读并同?                <text class="text-green-600 hover-text-green-700" @tap="gotoAgreement">《惠农网用户协议?/text>

                ?                <text class="text-green-600 hover-text-green-700" @tap="gotoPrivacy">《隐私政策?/text>

              </text>

            </label>

          </view>



          <!-- 注册按钮 -->

          <button

            @tap="handleRegister"

            :disabled="!canSubmit"

            :class="`w-full py-4 mt-6 rounded-lg font-bold text-lg ${canSubmit ? 'bg-green-600 text-white hover-bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`"

          >

            注册

          </button>

        </view>



        <!-- 登录链接 -->

        <view class="text-center">

          <text class="text-gray-600">已有账号?/text>

          <button @tap="gotoLogin" class="text-green-600 hover-text-green-700 font-medium ml-1">

            立即登录

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

        code: '',

        password: '',

        confirmPassword: '',

        userType: 'SUPPLIER',

        agreed: false,

      },

      codeCountdown: 0,

    };

  },

  computed: {

    canSubmit() {

      return (

        this.form.phone &&

        this.form.code &&

        this.form.password &&

        this.form.confirmPassword &&

        this.form.agreed

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

    handleRegister() {

      if (!this.canSubmit) {

        return;

      }



      if (this.form.password !== this.form.confirmPassword) {

        uni.showToast({

          title: '两次密码码输入不一?,

          icon: 'none',

        });

        return;

      }



      // 模拟注册成功

      uni.showToast({

        title: '注册成功',

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

    gotoAgreement() {

      uni.navigateTo({

        url: '/pages/agreement/index',

      });

    },

    gotoPrivacy() {

      uni.navigateTo({

        url: '/pages/privacy/index',

      });

    },

  },

};

</script>



<style>

.register-page {

  /* 基础样式 */

}

</style></result>

