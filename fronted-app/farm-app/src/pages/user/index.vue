<template>

  <view class="user-page min-h-screen bg-gray-50">

    <!-- 用户信息头部 -->

    <view class="bg-gradient-to-r from-green-600 to-emerald-600 text-white pt-12 pb-8">

      <view class="container mx-auto px-4">

        <view class="flex items-center space-x-4 mb-4">

          <view class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">

            <text v-if="!user.avatar" class="text-3xl">👤</text>

            <image v-else :src="user.avatar" class="w-20 h-20 rounded-full" />

          </view>

          <view>

            <text class="text-2xl font-bold block">{{ user.nickname || user.userName || '请登录' }}</text>

            <text class="opacity-90">{{ userRoleLabel }}</text>

          </view>

        </view>

        <view v-if="isAuthenticated" class="flex space-x-4">

          <view class="text-center">

            <text class="text-2xl font-bold block">12</text>

            <text class="text-sm opacity-90">收藏</text>

          </view>

          <view class="text-center">

            <text class="text-2xl font-bold block">5</text>

            <text class="text-sm opacity-90">订单</text>

          </view>

          <view class="text-center">

            <text class="text-2xl font-bold block">2</text>

            <text class="text-sm opacity-90">优惠券</text>

          </view>

        </view>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view v-if="!isAuthenticated" class="text-center py-12">

        <text class="text-2xl font-bold text-gray-900 block mb-4">请先登录</text>

        <text class="text-gray-600 block mb-8">登录后查看个人中心</text>

        <view class="flex justify-center space-x-4">

          <button @tap="gotoLogin" class="px-6 py-3 text-green-600 border border-green-600 rounded-lg hover-bg-green-50 font-medium">

            登录

          </button>

          <button @tap="gotoRegister" class="px-6 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium">

            注册

          </button>

        </view>

      </view>



      <view v-else class="space-y-6">

        <!-- 订单状态 -->

        <view class="bg-white rounded-xl shadow-sm p-6">

          <view class="flex justify-between items-center mb-6">

            <text class="text-xl font-bold">我的订单</text>

            <button @tap="gotoOrders" class="text-green-600 hover-text-green-700 text-sm">

              查看全部 >

            </button>

          </view>

          <view class="grid grid-cols-4 gap-4 text-center">

            <button @tap="gotoOrderStatus('pending_payment')" class="flex flex-col items-center">

              <view class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">

                <text class="text-2xl">💰</text>

              </view>

              <text class="text-sm">待付款</text>

            </button>

            <button @tap="gotoOrderStatus('pending_shipment')" class="flex flex-col items-center">

              <view class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">

                <text class="text-2xl">🚚</text>

              </view>

              <text class="text-sm">待发货</text>

            </button>

            <button @tap="gotoOrderStatus('shipped')" class="flex flex-col items-center">

              <view class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">

                <text class="text-2xl">📦</text>

              </view>

              <text class="text-sm">已发货</text>

            </button>

            <button @tap="gotoOrderStatus('completed')" class="flex flex-col items-center">

              <view class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">

                <text class="text-2xl">✅</text>

              </view>

              <text class="text-sm">已完成</text>

            </button>

          </view>

        </view>



        <!-- 功能菜单 -->

        <view class="bg-white rounded-xl shadow-sm p-6">

          <view class="space-y-4">

            <button

              v-for="item in menuItems"

              :key="item.id"

              @tap="handleMenuClick(item)"

              class="flex items-center justify-between w-full px-4 py-3 rounded-lg hover-bg-gray-50"

            >

              <view class="flex items-center space-x-3">

                <view :class="`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center`">

                  <text class="text-lg">{{ item.icon }}</text>

                </view>

                <text class="font-medium">{{ item.label }}</text>

              </view>

              <text class="text-gray-400">></text>

            </button>

          </view>

        </view>



        <!-- 角色卡片 -->

        <view v-if="approvedRoles.length > 0" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border p-6">

          <text class="font-bold mb-4 block">我的角色</text>

          <view class="flex flex-wrap gap-2 mb-4">

            <view

              v-for="role in approvedRoles"

              :key="role"

              :class="`px-4 py-2 rounded-lg font-medium ${activeRole === role ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'}`"

            >

              {{ roleLabels[role] }}

            </view>

          </view>

          <text class="text-sm text-gray-600 block">切换角色以查看不同的功能模块</text>

        </view>



        <!-- 账户概览 -->

        <view class="bg-white rounded-xl shadow-sm p-6">

          <text class="text-xl font-bold mb-6 block">账户概览</text>

          <view class="grid grid-cols-2 md-grid-cols-4 gap-4">

            <view class="bg-green-50 p-4 rounded-lg border border-green-100">

              <text class="text-2xl font-bold text-green-700 block">¥12,580</text>

              <text class="text-gray-600 text-sm">账户余额</text>

            </view>

            <view class="bg-blue-50 p-4 rounded-lg border border-blue-100">

              <text class="text-2xl font-bold text-blue-700 block">28</text>

              <text class="text-gray-600 text-sm">进行中订单</text>

            </view>

            <view class="bg-purple-50 p-4 rounded-lg border border-purple-100">

              <text class="text-2xl font-bold text-purple-700 block">156</text>

              <text class="text-gray-600 text-sm">收藏商品</text>

            </view>

            <view class="bg-orange-50 p-4 rounded-lg border border-orange-100">

              <text class="text-2xl font-bold text-orange-700 block">12</text>

              <text class="text-gray-600 text-sm">优惠券</text>

            </view>

          </view>

        </view>



        <!-- 退出登录 -->

        <button

          @tap="handleLogout"

          class="w-full px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover-bg-red-100 font-medium"

        >

          退出登录
        </button>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      user: {

        avatar: '',

        nickname: '张先生',

        userName: 'zhangsan',

        roles: [

          { role: 'SUPPLIER', status: 'APPROVED' },

          { role: 'PURCHASER', status: 'APPROVED' },

        ],

      },

      activeRole: 'SUPPLIER',

      isAuthenticated: true,

      menuItems: [

        {

          id: 'profile',

          label: '个人资料',

          icon: '👤',

          bgColor: 'bg-blue-100',

          page: '/pages/user/profile',

        },

        {

          id: 'orders',

          label: '我的订单',

          icon: '📋',

          bgColor: 'bg-green-100',

          page: '/pages/order/list',

        },

        {

          id: 'favorites',

          label: '我的收藏',

          icon: '❤️',

          bgColor: 'bg-red-100',

          page: '/pages/user/favorites',

        },

        {

          id: 'address',

          label: '收货地址',

          icon: '📍',

          bgColor: 'bg-yellow-100',

          page: '/pages/user/address',

        },

        {

          id: 'security',

          label: '账户安全',

          icon: '🔒',

          bgColor: 'bg-gray-100',

          page: '/pages/user/security',

        },

        {

          id: 'settings',

          label: '设置',

          icon: '⚙️',

          bgColor: 'bg-purple-100',

          page: '/pages/user/settings',

        },

      ],

      roleLabels: {

        SUPPLIER: '供应商',

        PURCHASER: '采购商',

        REGULAR: '普通用户',

      },

    };

  },

  computed: {

    approvedRoles() {

      return this.user.roles.filter(role => role.status === 'APPROVED').map(role => role.role);

    },

    userRoleLabel() {

      return this.roleLabels[this.activeRole] || '普通用户';

    },

  },

  methods: {

    handleMenuClick(item) {

      if (item.page) {

        uni.navigateTo({

          url: item.page,

        });

      }

    },

    gotoLogin() {

      uni.navigateTo({

        url: '/pages/auth/login',

      });

    },

    gotoRegister() {

      uni.navigateTo({

        url: '/pages/auth/register',

      });

    },

    gotoOrders() {

      uni.navigateTo({

        url: '/pages/order/list',

      });

    },

    gotoOrderStatus(status) {

      uni.navigateTo({

        url: `/pages/order/list?status=${status}`,

      });

    },

    handleLogout() {

      uni.showModal({

        title: '确认退出',

        content: '确定要退出登录吗？',

        success: (res) => {

          if (res.confirm) {

            this.isAuthenticated = false;

            this.user = {};

            uni.showToast({

              title: '已退出登录',

              icon: 'success',

            });

            // 实际应该清除token
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

/* 样式 */

</style>

