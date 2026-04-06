<template>

  <view class="settings-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">设置</text>

        <text class="text-gray-600 block mt-2">个性化您的体验</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-2xl mx-auto">

        <!-- 通知设置 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">通知设置</text>

          <view class="space-y-4">

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">订单通知</text>

                <text class="text-sm text-gray-600">订单状态变更提醒</text>

              </view>

              <input

                type="checkbox"

                class="h-6 w-11 rounded-full bg-gray-200 appearance-none cursor-pointer checked:bg-green-600 transition-colors relative"

                :checked="settings.orderNotifications"

                @change="settings.orderNotifications = !settings.orderNotifications"

              />

            </view>



            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">营销通知</text>

                <text class="text-sm text-gray-600">促销活动、新品上线</text>

              </view>

              <input

                type="checkbox"

                class="h-6 w-11 rounded-full bg-gray-200 appearance-none cursor-pointer checked:bg-green-600 transition-colors relative"

                :checked="settings.marketingNotifications"

                @change="settings.marketingNotifications = !settings.marketingNotifications"

              />

            </view>



            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">系统通知</text>

                <text class="text-sm text-gray-600">系统公告、安全提醒</text>

              </view>

              <input

                type="checkbox"

                class="h-6 w-11 rounded-full bg-gray-200 appearance-none cursor-pointer checked:bg-green-600 transition-colors relative"

                :checked="settings.systemNotifications"

                @change="settings.systemNotifications = !settings.systemNotifications"

              />

            </view>

          </view>

        </view>



        <!-- 隐私设置 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">隐私设置</text>

          <view class="space-y-4">

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">显示联系方式</text>

                <text class="text-sm text-gray-600">向供应商显示您的联系方式</text>

              </view>

              <input

                type="checkbox"

                class="h-6 w-11 rounded-full bg-gray-200 appearance-none cursor-pointer checked:bg-green-600 transition-colors relative"

                :checked="settings.showContactInfo"

                @change="settings.showContactInfo = !settings.showContactInfo"

              />

            </view>



            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">显示购买记录</text>

                <text class="text-sm text-gray-600">在商品页显示您的购买记录</text>

              </view>

              <input

                type="checkbox"

                class="h-6 w-11 rounded-full bg-gray-200 appearance-none cursor-pointer checked:bg-green-600 transition-colors relative"

                :checked="settings.showPurchaseHistory"

                @change="settings.showPurchaseHistory = !settings.showPurchaseHistory"

              />

            </view>



            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">个性化推荐</text>

                <text class="text-sm text-gray-600">基于您的浏览记录推荐商品</text>

              </view>

              <input

                type="checkbox"

                class="h-6 w-11 rounded-full bg-gray-200 appearance-none cursor-pointer checked:bg-green-600 transition-colors relative"

                :checked="settings.personalizedRecommendations"

                @change="settings.personalizedRecommendations = !settings.personalizedRecommendations"

              />

            </view>

          </view>

        </view>



        <!-- 通用设置 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">通用设置</text>

          <view class="space-y-4">

            <!-- 语言 -->

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">语言</text>

                <text class="text-sm text-gray-600">应用显示语言</text>

              </view>

              <select

                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                :value="settings.language"

                @change="settings.language = $event.target.value"

              >

                <option value="zh-CN">简体中文</option>

                <option value="en-US">English</option>

              </select>

            </view>



            <!-- 主题 -->

            <view class="flex items-center justify-between">

              <view>

                <text class="font-medium block mb-1">主题</text>

                <text class="text-sm text-gray-600">应用主题颜色</text>

              </view>

              <view class="flex gap-2">

                <button

                  @tap="settings.theme = 'light'"

                  :class="`px-4 py-2 rounded-lg ${settings.theme === 'light' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`"

                >

                  浅色

                </button>

                <button

                  @tap="settings.theme = 'dark'"

                  :class="`px-4 py-2 rounded-lg ${settings.theme === 'dark' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`"

                >

                  深色

                </button>

                <button

                  @tap="settings.theme = 'auto'"

                  :class="`px-4 py-2 rounded-lg ${settings.theme === 'auto' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`"

                >

                  自动

                </button>

              </view>

            </view>



            <!-- 字体大小 -->

            <view>

              <view class="flex justify-between mb-2">

                <text class="font-medium">字体大小</text>

                <text class="text-sm text-gray-600">{{ fontSizeLabel }}</text>

              </view>

              <input

                type="range"

                min="14"

                max="20"

                step="1"

                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"

                :value="settings.fontSize" @input="settings.fontSize = $event.target.value"

              />

            </view>



            <!-- 缓存清理 -->

            <view class="flex items-center justify-between pt-4 border-t">

              <view>

                <text class="font-medium block mb-1">缓存清理</text>

                <text class="text-sm text-gray-600">当前缓存 {{ settings.cacheSize }}</text>

              </view>

              <button @tap="clearCache" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50">

                清理缓存

              </button>

            </view>

          </view>

        </view>



        <!-- 关于 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">关于</text>

          <view class="space-y-4">

            <button @tap="gotoAbout" class="flex items-center justify-between w-full py-3 border-b last:border-0">

              <text class="font-medium">关于惠农网</text>

              <text class="text-gray-400">></text>

            </button>

            <button @tap="gotoFeedback" class="flex items-center justify-between w-full py-3 border-b last:border-0">

              <text class="font-medium">意见反馈</text>

              <text class="text-gray-400">></text>

            </button>

            <button @tap="gotoHelp" class="flex items-center justify-between w-full py-3 border-b last:border-0">

              <text class="font-medium">帮助中心</text>

              <text class="text-gray-400">></text>

            </button>

            <button @tap="gotoAgreement" class="flex items-center justify-between w-full py-3 border-b last:border-0">

              <text class="font-medium">用户协议</text>

              <text class="text-gray-400">></text>

            </button>

            <button @tap="gotoPrivacy" class="flex items-center justify-between w-full py-3">

              <text class="font-medium">隐私政策</text>

              <text class="text-gray-400">></text>

            </button>

          </view>

        </view>



        <!-- 版本信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6">

          <view class="text-center">

            <text class="text-5xl mb-4">🌾</text>

            <text class="text-2xl font-bold text-gray-900 block mb-2">惠农网</text>

            <text class="text-gray-600 block mb-4">农产品B2B电商平台</text>

            <text class="text-gray-500">版本 {{ settings.version }}</text>

          </view>

        </view>



        <!-- 退出登?-->

        <button

          @tap="handleLogout"

          class="w-full px-4 py-4 mt-6 bg-red-50 text-red-600 border border-red-200 rounded-lg hover-bg-red-100 font-medium"

        >

          退出登录        </button>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      settings: {

        orderNotifications: true,

        marketingNotifications: true,

        systemNotifications: true,

        showContactInfo: true,

        showPurchaseHistory: false,

        personalizedRecommendations: true,

        language: 'zh-CN',

        theme: 'light',

        fontSize: 16,

        cacheSize: '125.8 MB',

        version: '1.0.0',

      },

    };

  },

  computed: {

    fontSizeLabel() {

      const labels = {

        14: '小',

        16: '标准',

        18: '大',

        20: '特大',

      };

      return labels[this.settings.fontSize] || '标准';

    },

  },

  methods: {

    clearCache() {

      uni.showModal({

        title: '清理缓存',

        content: '确定要清理缓存吗？',

        success: (res) => {

          if (res.confirm) {

            this.settings.cacheSize = '0 MB';

            uni.showToast({

              title: '缓存已清理',

              icon: 'success',

            });

          }

        },

      });

    },

    gotoAbout() {

      uni.navigateTo({

        url: '/pages/about/index',

      });

    },

    gotoFeedback() {

      uni.navigateTo({

        url: '/pages/feedback/index',

      });

    },

    gotoHelp() {

      uni.navigateTo({

        url: '/pages/help/index',

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

    handleLogout() {

      uni.showModal({

        title: '确认退出',

        content: '确定要退出登录吗？',

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '已退出登录',

              icon: 'success',

            });

            setTimeout(() => {

              uni.reLaunch({

                url: '/pages/index/index',

              });

            }, 1500);

          }

        },

      });

    },

  },

};

</script>



<style>

.settings-page {

  /* 基础样式 */

}



/* 自定义复选框样式 */

input[type="checkbox"] {

  position: relative;

  outline: none;

}



input[type="checkbox"]:before {

  content: "";

  position: absolute;

  top: 2px;

  left: 2px;

  width: 18px;

  height: 18px;

  background: white;

  border-radius: 50%;

  transition: transform 0.2s;

}



input[type="checkbox"]:checked:before {

  transform: translateX(18px);

}

</style></result>

