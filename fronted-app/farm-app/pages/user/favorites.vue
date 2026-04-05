<template>

  <view class="favorites-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">我的收藏</text>

        <text class="text-gray-600 block mt-2">您收藏的商品和供应商</text>

      </view>

    </view>



    <!-- 标签切换 -->

    <view class="bg-white border-b">

      <view class="container mx-auto px-4">

        <view class="flex">

          <button

            @tap="activeTab = 'products'"

            :class="`px-6 py-3 border-b-2 font-medium ${activeTab === 'products' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover-text-gray-700'}`"

          >

            商品收藏

          </button>

          <button

            @tap="activeTab = 'suppliers'"

            :class="`px-6 py-3 border-b-2 font-medium ${activeTab === 'suppliers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover-text-gray-700'}`"

          >

            供应商收藏

          </button>

        </view>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <!-- 商品收藏 -->

      <view v-if="activeTab === 'products'">

        <view v-if="productFavorites.length === 0" class="text-center py-16">

          <text class="text-5xl mb-4">❤️</text>

          <text class="text-2xl font-bold text-gray-700 block mb-4">暂无收藏商品</text>

          <text class="text-gray-600 block mb-8">快去发现心仪的商品吧！</text>

          <button @tap="gotoSupply" class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium">

            去逛逛

          </button>

        </view>



        <view v-else class="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6">

          <view v-for="item in productFavorites" :key="item.id" class="bg-white rounded-xl shadow-sm overflow-hidden">

            <view class="h-48 bg-gray-200 relative">

              <button

                @tap="toggleProductFavorite(item.id)"

                class="absolute top-3 right-3 w-10 h-10 bg-white opacity-80 rounded-full flex items-center justify-center hover-bg-white"

              >

                <text class="text-xl text-red-500">❤️</text>

              </button>

            </view>

            <view class="p-4">

              <text class="font-bold text-lg block mb-2">{{ item.name }}</text>

              <text class="text-gray-600 text-sm block mb-2">{{ item.location }}</text>

              <text class="text-gray-600 text-sm block mb-2">{{ item.spec }}</text>

              <view class="flex justify-between items-center">

                <text class="text-green-700 font-bold">{{ item.price }}</text>

                <button @tap="viewProduct(item.id)" class="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover-bg-green-100">

                  查看详情

                </button>

              </view>

            </view>

          </view>

        </view>

      </view>



      <!-- 供应商收藏 -->

      <view v-else>

        <view v-if="supplierFavorites.length === 0" class="text-center py-16">

          <text class="text-5xl mb-4">👥</text>

          <text class="text-2xl font-bold text-gray-700 block mb-4">暂无收藏供应商</text>

          <text class="text-gray-600 block mb-8">快去发现优质供应商吧！</text>

          <button @tap="gotoSupply" class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium">

            去逛逛

          </button>

        </view>



        <view v-else class="space-y-4">

          <view v-for="supplier in supplierFavorites" :key="supplier.id" class="bg-white rounded-xl shadow-sm p-6">

            <view class="flex items-start justify-between">

              <view class="flex items-center">

                <view class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">

                  <text class="text-green-600 font-bold text-xl">公</text>

                </view>

                <view>

                  <text class="font-bold text-lg block mb-1">{{ supplier.name }}</text>

                  <view class="text-sm text-gray-600 mb-2">

                    <text class="mr-4">主营：{{ supplier.business }}</text>

                    <text>地区：{{ supplier.location }}</text>

                  </view>

                  <view class="flex items-center">

                    <text class="text-yellow-400">⭐⭐⭐⭐⭐</text>

                    <text class="ml-2 text-gray-700">{{ supplier.rating }}</text>

                    <text class="ml-4 text-gray-500">成交 {{ supplier.deals }} 笔</text>

                  </view>

                </view>

              </view>



              <view class="flex flex-col items-end">

                <button

                  @tap="toggleSupplierFavorite(supplier.id)"

                  class="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-3 hover-bg-red-100"

                >

                  <text class="text-xl text-red-500">❤️</text>

                </button>

                <button

                  @tap="gotoSupplier(supplier.id)"

                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover-bg-green-700 text-sm"

                >

                  进入店铺

                </button>

              </view>

            </view>



            <!-- 供应商商品预?-->

            <view class="mt-6 pt-6 border-t">

              <text class="font-medium mb-3 block">热销商品</text>

              <scroll-view scroll-x class="flex space-x-4">

                <view v-for="product in supplier.products" :key="product.id" class="flex-shrink-0 w-32">

                  <view class="h-24 bg-gray-200 rounded-lg mb-2"></view>

                  <text class="text-sm font-medium block truncate">{{ product.name }}</text>

                  <text class="text-green-700 text-sm font-bold">{{ product.price }}</text>

                </view>

              </scroll-view>

            </view>

          </view>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data () {

    return {

      activeTab: 'products',

      productFavorites: [

        {

          id: 1,

          name: '优质五常大米',

          location: '黑龙江五?,

          spec: '10??· 一?,

          price: '¥4,800/?,

          image: '',

        },

        {

          id: 2,

          name: '山东红富士苹?,

          location: '山东烟台',

          spec: '5??· 特级',

          price: '¥3,200/?,

          image: '',

        },

        {

          id: 3,

          name: '内蒙古牛羊肉',

          location: '内蒙?,

          spec: '2??· 新鲜',

          price: '¥28,000/?,

          image: '',

        },

        {

          id: 4,

          name: '有机蔬菜套餐',

          location: '北京',

          spec: '1??· 混合?,

          price: '¥2,500/?,

          image: '',

        },

        {

          id: 5,

          name: '福建铁观音茶?,

          location: '福建安溪',

          spec: '100kg/?· 特级',

          price: '¥85,000/?,

          image: '',

        },

        {

          id: 6,

          name: '新疆核桃',

          location: '新疆阿克?,

          spec: '5??· 一?,

          price: '¥12,000/?,

          image: '',

        },

      ],

      supplierFavorites: [

        {

          id: 1,

          name: '黑龙江五常粮油有限公?,

          business: '大米、粮?,

          location: '黑龙江五?,

          rating: '4.9',

          deals: 1284,

          products: [

            { id: 101, name: '五常大米', price: '¥4,800/? },

            { id: 102, name: '东北大豆', price: '¥3,800/? },

            { id: 103, name: '玉米?, price: '¥12, 000/? },

          ],

        },

        {

          id: 2,

          name: '山东果蔬合作?,

          business: '水果、蔬?,

          location: '山东烟台',

          rating: '4.8',

          deals: 956,

          products: [

            { id: 201, name: '红富士苹?, price: '¥3, 200/? },

            { id: 202, name: '烟台樱桃', price: '¥15,000/? },

            { id: 203, name: '有机蔬菜', price: '¥2,500/? },

          ],

        },

        {

          id: 3,

          name: '内蒙古畜牧业集团',

          business: '牛羊肉、奶制品',

          location: '内蒙?,

          rating: '4.9',

          deals: 689,

          products: [

            { id: 301, name: '优质牛肉', price: '¥28,000/? },

            { id: 302, name: '新鲜羊肉', price: '¥25,000/? },

            { id: 303, name: '牛奶', price: '¥4,500/? },

          ],

        },

      ],

    };

  },

  methods: {

    toggleProductFavorite (id) {

      this.productFavorites = this.productFavorites.filter(item => item.id !== id);

      uni.showToast({

        title: '已取消收?,

        icon: 'success',

      });

    },

    toggleSupplierFavorite (id) {

      this.supplierFavorites = this.supplierFavorites.filter(item => item.id !== id);

      uni.showToast({

        title: '已取消收?,

        icon: 'success',

      });

    },

    viewProduct (id) {

      uni.navigateTo({

        url: `/pages/supply/detail?id=${id}`,

      });

    },

    gotoSupplier (id) {

      uni.navigateTo({

        url: `/pages/supplier/index?id=${id}`,

      });

    },

    gotoSupply () {

      uni.switchTab({

        url: '/pages/supply/index',

      });

    },

  },

};

</script>



<style>

.favorites-page {

  /* 基础样式 */

}

</style></result>

