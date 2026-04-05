<template>

  <view class="security-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">账户安全</text>

        <text class="text-gray-600 block mt-2">保护您的账户安全</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-2xl mx-auto">

        <!-- 安全等级 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">安全等级</text>

          <view class="flex items-center mb-6">

            <view class="flex-1">

              <view class="h-2 bg-gray-200 rounded-full overflow-hidden">

                <view class="h-full bg-green-600 rounded-full" :style="{ width: `${securityLevel}%` }"></view>

              </view>

              <view class="flex justify-between text-sm text-gray-500 mt-2">

                <text>?/text>

                <text>?/text>

                <text>?/text>

              </view>

            </view>

            <text class="ml-6 text-2xl font-bold text-green-700">{{ securityLevel }}%</text>

          </view>

          <text class="text-gray-600">建议您完成以下安全设置以提升账户安全等级</text>

        </view>



        <!-- 安全设置?-->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="space-y-6">

            <!-- 登录密码码 -->

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">登录密码码</text>

                <text class="text-sm text-gray-600">定期修改密码码更安?/text>

              </view>

              <button @tap="changePassword" class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover-bg-green-50">

                修改

              </button>

            </view>



            <!-- 手机号验证码 -->

            <view class="flex items-center justify-between">

              <view>

                <view class="flex items-center">

                  <text class="font-medium mr-2">手机号验证码</text>

                  <text class="text-sm text-green-600">?已绑?/text>

                </view>

                <text class="text-sm text-gray-600">已绑定手机号：138****8888</text>

              </view>

              <button @tap="changePhone" class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover-bg-green-50">

                更换

              </button>

            </view>



            <!-- 邮箱验证码 -->

            <view class="flex items-center justify-between">

              <view>

                <view class="flex items-center">

                  <text class="font-medium mr-2">邮箱验证码</text>

                  <text v-if="emailVerified" class="text-sm text-green-600">?已验?/text>

                  <text v-else class="text-sm text-red-600">未验?/text>

                </view>

                <text class="text-sm text-gray-600">绑定邮箱：{{ email }}</text>

              </view>

              <button

                v-if="!emailVerified"

                @tap="verifyEmail"

                class="px-4 py-2 bg-green-600 text-white rounded-lg hover-bg-green-700"

              >

                验证码

              </button>

              <button v-else @tap="changeEmail" class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover-bg-green-50">

                更换

              </button>

            </view>



            <!-- 支付密码码 -->

            <view class="flex items-center justify-between">

              <view>

                <view class="flex items-center">

                  <text class="font-medium mr-2">支付密码码</text>

                  <text v-if="hasPaymentPassword" class="text-sm text-green-600">?已设?/text>

                  <text v-else class="text-sm text-red-600">未设?/text>

                </view>

                <text class="text-sm text-gray-600">用于支付确认</text>

              </view>

              <button

                v-if="!hasPaymentPassword"

                @tap="setPaymentPassword"

                class="px-4 py-2 bg-green-600 text-white rounded-lg hover-bg-green-700"

              >

                设置

              </button>

              <button v-else @tap="changePaymentPassword" class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover-bg-green-50">

                修改

              </button>

            </view>



            <!-- 登录设备管理 -->

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">登录设备管理</text>

                <text class="text-sm text-gray-600">管理您的登录设备</text>

              </view>

              <button @tap="manageDevices" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50">

                管理

              </button>

            </view>



            <!-- 账户冻结 -->

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">账户冻结</text>

                <text class="text-sm text-gray-600">临时冻结账户</text>

              </view>

              <button @tap="freezeAccount" class="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover-bg-red-50">

                冻结

              </button>

            </view>

          </view>

        </view>



        <!-- 登录记录 -->

        <view class="bg-white rounded-xl shadow-sm p-6">

          <text class="text-xl font-bold mb-4 block">最近登录记?/text>

          <view class="space-y-4">

            <view class="flex items-center justify-between p-3 border rounded-lg">

              <view>

                <text class="font-medium block">iPhone 14 Pro</text>

                <text class="text-sm text-gray-600">北京?· 2026-03-28 14:30:25</text>

              </view>

              <text class="text-green-600 text-sm">当前设备</text>

            </view>

            <view class="flex items-center justify-between p-3 border rounded-lg">

              <view>

                <text class="font-medium block">华为 Mate 50</text>

                <text class="text-sm text-gray-600">上海?· 2026-03-27 09:15:42</text>

              </view>

              <button @tap="logoutDevice" class="text-red-600 hover-text-red-700 text-sm">

                退出登?              </button>

            </view>

          </view>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      securityLevel: 75,

      email: 'zhangsan@example.com',

      emailVerified: false,

      hasPaymentPassword: true,

    };

  },

  methods: {

    changePassword() {

      uni.navigateTo({

        url: '/pages/user/change-password',

      });

    },

    changePhone() {

      uni.navigateTo({

        url: '/pages/user/change-phone',

      });

    },

    verifyEmail() {

      uni.showModal({

        title: '验证码邮箱',

        content: `我们将发送验证码邮件到 ${this.email}`,

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '验证码邮件已发?,

              icon: 'success',

            });

            // 模拟验证码成功

            setTimeout(() => {

              this.emailVerified = true;

              this.securityLevel = 85;

            }, 3000);

          }

        },

      });

    },

    changeEmail() {

      uni.navigateTo({

        url: '/pages/user/change-email',

      });

    },

    setPaymentPassword() {

      uni.navigateTo({

        url: '/pages/user/set-payment-password',

      });

    },

    changePaymentPassword() {

      uni.navigateTo({

        url: '/pages/user/change-payment-password',

      });

    },

    manageDevices() {

      uni.navigateTo({

        url: '/pages/user/devices',

      });

    },

    freezeAccount() {

      uni.showModal({

        title: '冻结账户',

        content: '确定要临时冻结账户吗？冻结期间无法登录和使用',

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '账户已冻?,

              icon: 'success',

            });

            setTimeout(() => {

              uni.reLaunch({

                url: '/pages/index/index',

              });

            }, 2000);

          }

        },

      });

    },

    logoutDevice() {

      uni.showModal({

        title: '退出设?,

        content: '确定要在此设备上退出登录吗?,

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '设备已退?,

              icon: 'success',

            });

          }

        },

      });

    },

  },

};

</script>



<style>

.security-page {

  /* 基础样式 */

}

</style></result>

