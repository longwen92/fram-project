<template>

  <view class="detail-page min-h-screen bg-gray-50">

    <!-- 商品图片轮播 -->

    <view class="h-96 bg-gray-200 relative">

      <view class="absolute bottom-4 right-4 bg-black opacity-50 text-white px-3 py-1 rounded-full text-sm">

        1/3

      </view>

    </view>



    <!-- 商品信息 -->

    <view class="bg-white p-6">

      <text class="text-2xl font-bold block mb-2">优质五常大米</text>

      <text class="text-green-700 text-2xl font-bold block mb-4">¥4,800/吨</text>



      <view class="space-y-3">

        <view class="flex items-center">

          <text class="text-gray-500 w-20">产地</text>

          <text class="flex-1">黑龙江五常</text>

        </view>

        <view class="flex items-center">

          <text class="text-gray-500 w-20">规格</text>

          <text class="flex-1">10吨/批 · 一级</text>

        </view>

        <view class="flex items-center">

          <text class="text-gray-500 w-20">库存</text>

          <text class="flex-1 text-green-600">充足</text>

        </view>

        <view class="flex items-center">

          <text class="text-gray-500 w-20">发货</text>

          <text class="flex-1">全国包邮 · 48小时内发货</text>

        </view>

        <view class="flex items-center">

          <text class="text-gray-500 w-20">销量</text>

          <text class="flex-1">已售 1,284 笔</text>

        </view>

      </view>

    </view>



    <!-- 供应商信息 -->

    <view class="bg-white mt-4 p-6">

      <view class="flex items-center justify-between mb-4">

        <view class="flex items-center">

          <view class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">

            <text class="text-green-600 font-bold">公</text>

          </view>

          <view>

            <text class="font-bold block">黑龙江五常粮油有限公司</text>

            <view class="text-sm text-gray-500 flex items-center">

              <text class="mr-1">⭐</text>

              4.9 · 98%好评

            </view>

          </view>

        </view>

        <button @tap="gotoSupplier" class="text-green-600 hover-text-green-700">

          进入店铺 >

        </button>

      </view>



      <view class="grid grid-cols-3 gap-4 text-center">

        <view>

          <text class="text-2xl font-bold block">98%</text>

          <text class="text-sm text-gray-500">好评率</text>

        </view>

        <view>

          <text class="text-2xl font-bold block">5年</text>

          <text class="text-sm text-gray-500">供应商年限</text>

        </view>

        <view>

          <text class="text-2xl font-bold block">24h</text>

          <text class="text-sm text-gray-500">平均响应</text>

        </view>

      </view>

    </view>



    <!-- 商品详情 -->

    <view class="bg-white mt-4 p-6">

      <text class="text-xl font-bold mb-4 block">商品详情</text>

      <view class="space-y-4 text-gray-700">

        <text class="block">五常大米是黑龙江省五常市特产，中国国家地理标志产品。米粒饱满坚硬，色泽清白透明，饭粒油亮，香味浓郁。</text>

        <text class="block">本品为 2026年新米，真空包装，保质期12个月。</text>

        <text class="block">主要特点：</text>

        <view class="pl-4 space-y-2">

          <text class="block">1. 颗粒饱满，质地坚硬</text>

          <text class="block">2. 色泽清白透明</text>

          <text class="block">3. 饭粒油亮，香味浓郁</text>

          <text class="block">4. 剩饭不回生</text>

        </view>

      </view>

    </view>



    <!-- 用户评价 -->

    <view class="bg-white mt-4 p-6">

      <view class="flex justify-between items-center mb-4">

        <text class="text-xl font-bold">用户评价 (1,284)</text>

        <button @tap="gotoReviews" class="text-green-600 hover-text-green-800">

          查看全部 >

        </button>

      </view>



      <view class="space-y-4">

        <view class="border-b pb-4">

          <view class="flex items-center mb-2">

            <text class="text-yellow-400 text-lg">⭐⭐⭐⭐?/text>

            <text class="ml-2 font-medium">张先?/text>

            <text class="ml-auto text-gray-500 text-sm">2026-03-15</text>

          </view>

          <text class="text-gray-700">大米质量非常好，煮出来香气扑鼻，家人很喜欢。会继续回购?/text>

        </view>

        <view class="border-b pb-4">

          <view class="flex items-center mb-2">

            <text class="text-yellow-400 text-lg">⭐⭐⭐⭐</text>

            <text class="ml-2 font-medium">李女?/text>

            <text class="ml-auto text-gray-500 text-sm">2026-03-10</text>

          </view>

          <text class="text-gray-700">包装很结实，物流很快。米粒饱满，口感不错?/text>

        </view>

      </view>

    </view>



    <!-- 底部操作?-->

    <view class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center space-x-4">

      <button @tap="gotoCart" class="p-3 relative">

        <text class="text-2xl">🛒</text>

        <view v-if="cartCount > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">

          {{ cartCount }}

        </view>

      </button>

      <button @tap="toggleFavorite" class="p-3" :class="isFavorite ? 'text-red-500' : 'text-gray-500'">

        <text class="text-2xl">{{ isFavorite ? '❤️' : '🤍' }}</text>

      </button>

      <button @tap="gotoChat" class="flex-1 py-3 bg-blue-600 text-white rounded-lg hover-bg-blue-700 font-medium">

        联系供应?      </button>

      <button @tap="addToCart" class="flex-1 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium">

        加入采购?      </button>

    </view>

  </view>

</template>



<script>

export default {

  data () {

    return {

      cartCount: 3,

      isFavorite: false,

    };

  },

  onLoad (options) {

    const id = options.id;

    console.log('商品ID:', id);

    // 根据ID获取商品详情

  },

  methods: {

    toggleFavorite () {

      this.isFavorite = !this.isFavorite;

      uni.showToast({

        title: this.isFavorite ? '已收? : '已取消收?,

        icon: 'success',

      });

    },

    addToCart () {

      uni.showToast({

        title: '已加入采购车',

        icon: 'success',

      });

      this.cartCount++;

    },

    gotoCart () {

      uni.switchTab({

        url: '/pages/cart/index',

      });

    },

    gotoChat () {

      uni.navigateTo({

        url: '/pages/chat/index',

      });

    },

    gotoSupplier () {

      uni.navigateTo({

        url: '/pages/supplier/index',

      });

    },

    gotoReviews () {

      uni.navigateTo({

        url: '/pages/reviews/index',

      });

    },

  },

};

</script>



<style>

.detail-page {

  padding-bottom: 80px; /* 给底部操作栏留出空间 */

}

</style></result>

