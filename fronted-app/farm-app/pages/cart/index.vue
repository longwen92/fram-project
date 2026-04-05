<template>

  <view class="cart-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">购物车</text>

        <text class="text-gray-600 block mt-2">管理您的采购商品</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view v-if="cartItems.length === 0" class="text-center py-16">

        <text class="text-5xl mb-4">🛒</text>

        <text class="text-2xl font-bold text-gray-700 block mb-4"

          >购物车空空如也</text

        >

        <text class="text-gray-600 block mb-8">快去添加心仪的商品吧！</text>

        <button

          @tap="gotoSupply"

          class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium"

        >

          去逛逛

        </button>

      </view>



      <view v-else class="flex flex-col lg-flex-row gap-8">

        <!-- 商品列表 -->

        <view class="lg-w-2-3">

          <!-- 全选工具栏 -->

          <view class="bg-white rounded-xl shadow-sm p-4 mb-4">

            <label class="flex items-center">

              <input

                type="checkbox"

                class="h-5 w-5 text-green-600 focus-ring-green-500 border-gray-300 rounded"

                :checked="selectAll"

                @change="selectAll = $event.target.checked"

              />

              <text class="ml-3 font-medium"

                >全选 ({{ selectedCount }}/{{ cartItems.length }})</text

              >

            </label>

          </view>



          <!-- 商品列表 -->

          <view class="space-y-4">

            <view

              v-for="item in cartItems"

              :key="item.id"

              class="bg-white rounded-xl shadow-sm p-4"

            >

              <view class="flex items-start gap-4">

                <label class="flex items-start">

                  <input

                    type="checkbox"

                    class="h-5 w-5 text-green-600 focus-ring-green-500 border-gray-300 rounded mt-1"

                    :checked="item.selected"

                    @change="item.selected = $event.target.checked"

                  />

                </label>

                <view class="flex-1">

                  <view class="flex items-start justify-between">

                    <view>

                      <text class="font-bold text-lg block mb-1">{{

                        item.name

                      }}</text>

                      <text class="text-gray-600 text-sm block">{{

                        item.spec

                      }}</text>

                      <text class="text-gray-600 text-sm block">{{

                        item.supplier

                      }}</text>

                    </view>

                    <button

                      @tap="removeItem(item.id)"

                      class="text-gray-400 hover-text-red-500"

                    >

                      ?

                    </button>

                  </view>



                  <view class="flex items-center justify-between mt-4">

                    <text class="text-green-700 font-bold text-xl"

                      >¥{{ item.price }}</text

                    >

                    <view class="flex items-center space-x-4">

                      <view

                        class="flex items-center border border-gray-300 rounded-lg"

                      >

                        <button

                          @tap="decreaseQuantity(item)"

                          class="px-3 py-1 text-gray-600 hover-bg-gray-100"

                          :disabled="item.quantity <= 1"

                        >

                          -

                        </button>

                        <text class="px-4 py-1">{{ item.quantity }}</text>

                        <button

                          @tap="increaseQuantity(item)"

                          class="px-3 py-1 text-gray-600 hover-bg-gray-100"

                        >

                          +

                        </button>

                      </view>

                    </view>

                  </view>

                </view>

              </view>

            </view>

          </view>

        </view>



        <!-- 订单摘要 -->

        <view class="lg-w-1-3">

          <view class="bg-white rounded-xl shadow-sm p-6 sticky top-8">

            <text class="text-2xl font-bold mb-6 block">订单摘要</text>



            <view class="space-y-4 mb-6">

              <view class="flex justify-between">

                <text class="text-gray-600">商品总价</text>

                <text class="font-medium">¥{{ totalPrice }}</text>

              </view>

              <view class="flex justify-between">

                <text class="text-gray-600">运费</text>

                <text class="font-medium">¥{{ shippingFee }}</text>

              </view>

              <view class="flex justify-between">

                <text class="text-gray-600">优惠</text>

                <text class="text-green-600 font-medium">-¥{{ discount }}</text>

              </view>

              <view class="border-t pt-4 flex justify-between">

                <text class="text-lg font-bold">合计</text>

                <text class="text-2xl font-bold text-green-700"

                  >¥{{ total }}</text

                >

              </view>

            </view>



            <button

              @tap="gotoCheckout"

              class="w-full py-4 bg-green-600 text-white rounded-lg hover-bg-green-700 font-bold text-lg mb-4"

              :disabled="selectedCount === 0"

              :class="

                selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : ''

              "

            >

              去结算 ({{ selectedCount }}件商品)

            </button>



            <view class="text-sm text-gray-600 space-y-2">

              <text class="block">√ 全场满 ¥5000 包邮</text>

              <text class="block">√ 支持对公转账、线上支付</text>

              <text class="block">√ 7天无理由退货</text>

            </view>

          </view>



          <!-- 优惠券 -->

          <view class="bg-white rounded-xl shadow-sm p-6 mt-6">

            <text class="font-bold mb-4 block">优惠券</text>

            <view class="space-y-3">

              <view

                v-for="coupon in coupons"

                :key="coupon.id"

                class="flex items-center justify-between p-3 border rounded-lg"

              >

                <view>

                  <text class="font-medium block">{{ coupon.name }}</text>

                  <text class="text-sm text-gray-600">{{

                    coupon.description

                  }}</text>

                </view>

                <button

                  @tap="useCoupon(coupon)"

                  class="px-4 py-1 border border-green-600 text-green-600 rounded hover-bg-green-50"

                >

                  使用

                </button>

              </view>

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

      cartItems: [

        {

          id: 1,

          name: '优质大米',

          spec: '10吨/批 · 五常大米',

          supplier: '黑龙江五常粮油有限公司',

          price: '4,800',

          quantity: 1,

          selected: true,

        },

        {

          id: 2,

          name: '新鲜苹果',

          spec: '5吨/批 · 红富士',

          supplier: '山东果蔬合作社',

          price: '3,200',

          quantity: 2,

          selected: true,

        },

        {

          id: 3,

          name: '有机蔬菜',

          spec: '2吨/批 · 混合装',

          supplier: '北京有机农场',

          price: '2,500',

          quantity: 1,

          selected: false,

        },

      ],

      coupons: [

        {

          id: 1,

          name: '新用户优惠券',

          description: '满 ¥3000 减 ¥200',

        },

        {

          id: 2,

          name: '节日大促',

          description: '全场通用 ¥100',

        },

      ],

      shippingFee: '200',

      discount: '0',

    };

  },

  computed: {

    selectedCount () {

      return this.cartItems.filter(item => item.selected).length;

    },

    selectAll: {

      get () {

        return this.cartItems.length > 0 && this.cartItems.every(item => item.selected);

      },

      set (value) {

        this.cartItems.forEach(item => {

          item.selected = value;

        });

      },

    },

    totalPrice () {

      let total = 0;

      this.cartItems.forEach(item => {

        if (item.selected) {

          const price = parseFloat(item.price.replace(',', ''));

          total += price * item.quantity;

        }

      });

      return total.toLocaleString();

    },

    total () {

      const price = parseFloat(this.totalPrice.replace(',', '') || 0);

      const shipping = parseFloat(this.shippingFee.replace(',', '') || 0);

      const discount = parseFloat(this.discount.replace(',', '') || 0);

      return (price + shipping - discount).toLocaleString();

    },

  },

  methods: {

    toggleSelectAll () {

      this.selectAll = !this.selectAll;

    },

    updateSelected () {

      // 计算selectedCount会自动更新
    },

    increaseQuantity(item) {

        item.quantity++;

      },

      decreaseQuantity(item) {

        if (item.quantity > 1) {

          item.quantity--;

        }

      },

      removeItem(id) {

        this.cartItems = this.cartItems.filter(item => item.id !== id);

      },

      useCoupon(coupon) {

        this.discount = coupon.name.includes('200') ? '200' : '100';

        uni.showToast({

          title: `已使用${coupon.name}`,

          icon: 'success',

        });

      },

      gotoSupply() {

        uni.switchTab({

          url: '/pages/supply/index',

        });

      },

      gotoCheckout() {

        if (this.selectedCount === 0) {

          uni.showToast({

            title: '请选择商品',

            icon: 'none',

          });

          return;

        }

        uni.navigateTo({

          url: '/pages/order/confirm',

        });

      },

    },

  };

</script>



<style>

/* 样式 */

</style>

