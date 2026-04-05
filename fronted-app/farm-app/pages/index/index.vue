<template>
  <view class="home-page space-y-8">
    <!-- 顶部搜索栏 -->
    <view class="sticky top-0 z-10 bg-white shadow-sm py-4 px-4">
      <view class="flex items-center justify-between">
        <view class="flex items-center space-x-2">
          <view
            class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center"
          >
            <text class="text-white font-bold text-lg">惠</text>
          </view>
          <text class="text-xl font-bold text-green-700">惠农网</text>
        </view>
        <view class="flex-1 max-w-md mx-4">
          <view class="relative">
            <input
              type="text"
              placeholder="搜索农产品、供应商..."
              class="w-full px-4 py-3 pl-12 bg-gray-100 rounded-full"
              v-model="searchKeyword"
              @confirm="handleSearch"
            />
            <text class="absolute left-4 top-3.5 text-gray-400 text-lg"
              >🔍</text
            >
          </view>
        </view>
        <button
          @tap="gotoUser"
          class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <text class="text-xl">👤</text>
        </button>
      </view>
    </view>

    <!-- 轮播图 -->
    <view class="px-4">
      <swiper
        class="h-64 rounded-2xl overflow-hidden"
        :autoplay="true"
        :interval="3000"
        :duration="500"
        :circular="true"
      >
        <swiper-item v-for="(banner, index) in banners" :key="index">
          <view
            class="w-full h-full flex items-center justify-center"
            :style="{ backgroundColor: banner.bgColor }"
          >
            <view class="text-center text-white px-8">
              <text class="text-3xl font-bold block mb-2">{{
                banner.title
              }}</text>
              <text class="text-lg opacity-90">{{ banner.description }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 快捷入口 -->
    <view class="px-4">
      <view class="bg-white rounded-2xl p-6 shadow-sm">
        <text class="text-2xl font-bold mb-6 block">快捷入口</text>
        <view class="grid-cols-4 gap-6">
          <button
            v-for="entry in quickEntries"
            :key="entry.id"
            @tap="handleQuickEntry(entry)"
            class="flex flex-col items-center"
          >
            <view
              :class="`w-16 h-16 ${entry.bgColor} rounded-2xl flex items-center justify-center mb-3`"
            >
              <text class="text-2xl">{{ entry.icon }}</text>
            </view>
            <text class="font-medium">{{ entry.label }}</text>
          </button>
        </view>
      </view>
    </view>

    <!-- 热门品类 -->
    <view class="px-4">
      <view class="bg-white rounded-2xl p-6 shadow-sm">
        <view class="flex justify-between items-center mb-6">
          <text class="text-2xl font-bold">热门品类</text>
          <button @tap="gotoSupply" class="text-green-600 flex items-center">
            查看全部
            <text class="ml-1">→</text>
          </button>
        </view>
        <view class="grid-cols-4 gap-4">
          <view
            v-for="category in categories"
            :key="category.id"
            class="text-center"
          >
            <view
              class="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-3"
            >
              <text class="text-2xl">{{ category.icon }}</text>
            </view>
            <text class="font-bold block text-sm">{{ category.name }}</text>
            <text class="text-gray-500 text-xs"
              >{{ category.count }}条供应</text
            >
          </view>
        </view>
      </view>
    </view>

    <!-- Features Section -->
    <view>
      <text class="text-3xl font-bold text-center mb-12 block"
        >为什么选择惠农网</text
      >
      <view class="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 gap-6">
        <view class="bg-white p-6 rounded-xl shadow-sm border">
          <view
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"
          >
            <text class="text-green-600 text-xl">📈</text>
          </view>
          <text class="text-xl font-semibold mb-2 block">高效交易</text>
          <text class="text-gray-600 block">
            智能匹配供需，快速达成交易，节省中间环节成本。
          </text>
        </view>
        <view class="bg-white p-6 rounded-xl shadow-sm border">
          <view
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
          >
            <text class="text-blue-600 text-xl">🛡️</text>
          </view>
          <text class="text-xl font-semibold mb-2 block">交易保障</text>
          <text class="text-gray-600 block">
            资金托管、质量检测、纠纷调解，全方位保障交易安全。
          </text>
        </view>
        <view class="bg-white p-6 rounded-xl shadow-sm border">
          <view
            class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4"
          >
            <text class="text-orange-600 text-xl">🚚</text>
          </view>
          <text class="text-xl font-semibold mb-2 block">物流配送</text>
          <text class="text-gray-600 block">
            全国冷链物流网络，确保农产品新鲜送达。
          </text>
        </view>
        <view class="bg-white p-6 rounded-xl shadow-sm border">
          <view
            class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4"
          >
            <text class="text-purple-600 text-xl">👥</text>
          </view>
          <text class="text-xl font-semibold mb-2 block">庞大用户</text>
          <text class="text-gray-600 block">
            已服务超过10万+供应商和采购商，覆盖全国主要产区。
          </text>
        </view>
      </view>
    </view>

    <!-- Categories Section -->
    <view>
      <view class="flex justify-between items-center mb-6">
        <text class="text-3xl font-bold">热门品类</text>
        <button
          @tap="gotoSupply"
          class="text-green-600 active:text-green-700 flex items-center"
        >
          查看全部
          <text class="ml-1">→</text>
        </button>
      </view>
      <view class="grid grid-cols-2 md-grid-cols-4 gap-4">
        <view
          v-for="category in categories"
          :key="category.id"
          class="bg-white p-6 rounded-xl shadow-sm border text-center"
        >
          <view
            class="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4"
          >
            <text class="text-2xl">{{ category.icon }}</text>
          </view>
          <text class="font-bold block">{{ category.name }}</text>
          <text class="text-gray-500 text-sm">{{ category.count }}条供应</text>
        </view>
      </view>
    </view>

    <!-- Featured Products -->
    <view>
      <view class="flex justify-between items-center mb-6">
        <text class="text-3xl font-bold">精选供应</text>
        <button
          @tap="gotoSupply"
          class="text-green-600 active:text-green-700 flex items-center"
        >
          更多供应
          <text class="ml-1">→</text>
        </button>
      </view>
      <view class="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6">
        <view
          v-for="product in featuredProducts"
          :key="product.id"
          class="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <view class="h-48 bg-gray-200"></view>
          <view class="p-6">
            <text class="font-bold text-lg block mb-2">{{ product.name }}</text>
            <text class="text-gray-600 text-sm block mb-2">{{
              product.location
            }}</text>
            <text class="text-gray-600 text-sm block mb-4">{{
              product.spec
            }}</text>
            <view class="flex justify-between items-center">
              <text class="text-green-700 font-bold">{{ product.price }}</text>
              <button
                @tap="viewProduct(product.id)"
                class="px-4 py-2 bg-green-50 text-green-600 rounded-lg active:bg-green-100"
              >
                查看详情
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- CTA Section -->
    <view
      class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white"
    >
      <text class="text-3xl font-bold mb-4 block">立即加入惠农网</text>
      <text class="text-lg mb-8 opacity-90 block">
        开启您的农产品B2B电商之旅，连接全国市场，提升交易效率。
      </text>
      <view class="flex flex-wrap justify-center gap-4">
        <button
          @tap="gotoRegister"
          class="px-8 py-3 bg-white text-green-600 rounded-lg active:bg-gray-100 font-semibold"
        >
          免费注册
        </button>
        <button
          @tap="gotoSupply"
          class="px-8 py-3 border border-white text-white rounded-lg active-bg-white-opacity-10"
        >
          查看平台
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      searchKeyword: '',
      banners: [
        { id: 1, title: '新鲜农产品直供', description: '源头直采，品质保证', bgColor: '#10B981' },
        { id: 2, title: '全国冷链配送', description: '新鲜直达，全程可溯', bgColor: '#059669' },
        { id: 3, title: '千万供应商入驻', description: '海量资源，高效匹配', bgColor: '#047857' },
      ],
      quickEntries: [
        { id: 1, label: '供应大厅', icon: '📦', bgColor: 'bg-green-100', path: '/pages/supply/index' },
        { id: 2, label: '采购需求', icon: '📝', bgColor: 'bg-blue-100', path: '/pages/purchase/index' },
        { id: 3, label: '我的订单', icon: '📋', bgColor: 'bg-yellow-100', path: '/pages/order/list' },
        { id: 4, label: '购物车', icon: '🛒', bgColor: 'bg-purple-100', path: '/pages/cart/index' },
        { id: 5, label: '收藏夹', icon: '❤️', bgColor: 'bg-red-100', path: '/pages/user/favorites' },
        { id: 6, label: '地址管理', icon: '📍', bgColor: 'bg-indigo-100', path: '/pages/user/address' },
        { id: 7, label: '客服中心', icon: '💬', bgColor: 'bg-pink-100', path: '/pages/user/settings' },
        { id: 8, label: '安全中心', icon: '🔒', bgColor: 'bg-gray-100', path: '/pages/user/security' },
      ],
      categories: [
        { id: 1, name: '水果', icon: '🍎', count: '1,284' },
        { id: 2, name: '蔬菜', icon: '🥦', count: '956' },
        { id: 3, name: '粮油', icon: '🌾', count: '743' },
        { id: 4, name: '水产', icon: '🐟', count: '512' },
        { id: 5, name: '畜禽', icon: '🐔', count: '689' },
        { id: 6, name: '茶叶', icon: '🍵', count: '327' },
        { id: 7, name: '中药材', icon: '🌿', count: '421' },
        { id: 8, name: '坚果', icon: '🥜', count: '298' },
      ],
      featuredProducts: [
        { id: 1, name: '优质五常大米', location: '黑龙江五常', spec: '10吨/批 · 一级', price: '¥4,800/吨' },
        { id: 2, name: '山东红富士苹果', location: '山东烟台', spec: '5吨/批 · 特级', price: '¥3,200/吨' },
        { id: 3, name: '内蒙古牛羊肉', location: '内蒙古', spec: '2吨/批 · 新鲜', price: '¥28,000/吨' },
      ],
    };
  },
  methods: {
    handleSearch () {
      if (this.searchKeyword.trim()) {
        uni.navigateTo({
          url: `/pages/supply/index?keyword=${encodeURIComponent(this.searchKeyword)}`,
        });
      } else {
        uni.showToast({
          title: '请输入搜索关键词',
          icon: 'none',
        });
      }
    },
    handleQuickEntry (entry) {
      if (entry.path) {
        if (entry.path.startsWith('/pages/') && entry.path.includes('/index')) {
          uni.switchTab({ url: entry.path });
        } else {
          uni.navigateTo({ url: entry.path });
        }
      }
    },
    gotoUser () {
      uni.switchTab({
        url: '/pages/user/index',
      });
    },
    gotoSupply () {
      uni.switchTab({
        url: '/pages/supply/index',
      });
    },
    gotoPurchase () {
      uni.switchTab({
        url: '/pages/purchase/index',
      });
    },
    gotoRegister () {
      uni.navigateTo({
        url: '/pages/auth/register',
      });
    },
    viewProduct (id) {
      uni.navigateTo({
        url: `/pages/supply/detail?id=${id}`,
      });
    },
  },
  onLoad () {
    // 可以在这里调用API获取首页数据
    console.log('首页加载');
    // this.fetchHomeData();
  },
  onShow () {
    // 页面显示时刷新数据
  },
  onPullDownRefresh () {
    console.log('下拉刷新');
    // 模拟数据刷新
    setTimeout(() => {
      uni.stopPullDownRefresh();
      uni.showToast({
        title: '刷新成功',
        icon: 'success',
      });
    }, 1000);
  },
};
</script>

<style>
/* 添加一些基础样式 */
.home-page {
  padding: 24rpx;
  min-height: 100vh;
  background-color: #f8f8f8;
}

/* 自定义样式 */
.bg-white-opacity-10 {
  background-color: rgba(255, 255, 255, 0.1);
}

.active-bg-white-opacity-10:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.opacity-10 {
  opacity: 0.1;
}

.opacity-90 {
  opacity: 0.9;
}

/* 修复一些可能缺失的样式 */
.space-y-8 > view + view {
  margin-top: 2rem;
}

.grid {
  display: grid;
}

.rounded-full {
  border-radius: 9999px;
}

.sticky {
  position: sticky;
}

.z-10 {
  z-index: 10;
}

.max-w-md {
  max-width: 28rem;
}
</style>