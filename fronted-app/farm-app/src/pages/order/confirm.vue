<template>

  <view class="confirm-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">确认订单</text>

        <text class="text-gray-600 block mt-2">请核对订单信?/text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-2xl mx-auto">

        <!-- 收货地址 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="flex justify-between items-start mb-4">

            <text class="text-xl font-bold">收货地址</text>

            <button @tap="gotoAddress" class="text-green-600 hover-text-green-700">

              管理地址

            </button>

          </view>



          <view class="border border-green-500 rounded-lg p-4 bg-green-50">

            <view class="flex items-start">

              <view class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">

                <text class="text-green-600 text-xl">📍</text>

              </view>

              <view class="flex-1">

                <view class="flex items-center mb-1">

                  <text class="font-bold">张先?/text>

                  <text class="ml-4 text-gray-600">138****8888</text>

                </view>

                <text class="text-gray-700">

                  北京市朝阳区建国门外大街1号国贸大厦A?001?                </text>

              </view>

            </view>

          </view>

        </view>



        <!-- 商品列表 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">商品信息</text>

          <view class="space-y-4">

            <view v-for="item in items" :key="item.id" class="flex items-center border-b pb-4 last:border-0">

              <view class="w-20 h-20 bg-gray-200 rounded-lg mr-4"></view>

              <view class="flex-1">

                <text class="font-bold block mb-1">{{ item.name }}</text>

                <text class="text-gray-600 text-sm block">{{ item.spec }}</text>

                <text class="text-gray-600 text-sm block">{{ item.supplier }}</text>

              </view>

              <view class="text-right">

                <text class="text-green-700 font-bold block">¥{{ item.price }}</text>

                <text class="text-gray-500 text-sm">x{{ item.quantity }}</text>

              </view>

            </view>

          </view>

        </view>



        <!-- 订单信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">订单信息</text>

          <view class="space-y-3">

            <view class="flex justify-between">

              <text class="text-gray-600">商品总价</text>

              <text class="font-medium">¥{{ summary.totalPrice }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">运费</text>

              <text class="font-medium">¥{{ summary.shippingFee }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">优惠?/text>

              <text class="text-green-600 font-medium">-¥{{ summary.discount }}</text>

            </view>

            <view class="flex justify-between border-t pt-3 mt-3">

              <text class="text-lg font-bold">实付金额</text>

              <text class="text-2xl font-bold text-green-700">¥{{ summary.total }}</text>

            </view>

          </view>

        </view>



        <!-- 支付方式 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">支付方式</text>

          <view class="space-y-3">

            <label class="flex items-center justify-between p-3 border rounded-lg hover-bg-gray-50">

              <view class="flex items-center">

                <view class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">

                  <text class="text-blue-600 text-xl">💰</text>

                </view>

                <view>

                  <text class="font-medium block">线上支付</text>

                  <text class="text-sm text-gray-600">支付宝、微信支?/text>

                </view>

              </view>

              <input

                type="radio"

                name="payment"

                checked

                class="h-5 w-5 text-green-600 focus-ring-green-500 border-gray-300"

              />

            </label>

            <label class="flex items-center justify-between p-3 border rounded-lg hover-bg-gray-50">

              <view class="flex items-center">

                <view class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">

                  <text class="text-green-600 text-xl">🏦</text>

                </view>

                <view>

                  <text class="font-medium block">对公转账</text>

                  <text class="text-sm text-gray-600">银行转账，需上传凭证</text>

                </view>

              </view>

              <input

                type="radio"

                name="payment"

                class="h-5 w-5 text-green-600 focus-ring-green-500 border-gray-300"

              />

            </label>

          </view>

        </view>



        <!-- 发票信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="flex justify-between items-center mb-4">

            <text class="text-xl font-bold">发票信息</text>

            <button @tap="toggleInvoice" class="text-green-600 hover-text-green-700">

              {{ showInvoice ? '不需要发? : '需要发? }}

            </button>

          </view>



          <view v-if="showInvoice" class="space-y-4">

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">发票类型</text>

              <view class="flex gap-2">

                <button

                  @tap="invoice.type = 'personal'"

                  :class="`px-4 py-2 rounded-lg ${invoice.type === 'personal' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`"

                >

                  个人

                </button>

                <button

                  @tap="invoice.type = 'company'"

                  :class="`px-4 py-2 rounded-lg ${invoice.type === 'company' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`"

                >

                  公司

                </button>

              </view>

            </view>



            <view v-if="invoice.type === 'company'">

              <text class="block text-sm font-medium text-gray-700 mb-1">公司名称</text>

              <input

                type="text"

                placeholder="请输入公司名?

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="invoice.companyName"

              />

            </view>



            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">发票抬头</text>

              <input

                type="text"

                :placeholder="invoice.type === 'personal' ? '请输入个人姓? : '请输入发票抬?"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="invoice.title"

              />

            </view>

          </view>

        </view>



        <!-- 提交订单 -->

        <view class="fixed bottom-0 left-0 right-0 bg-white border-t p-4">

          <view class="container mx-auto px-4">

            <view class="flex items-center justify-between">

              <view>

                <text class="text-gray-600 text-sm">应付金额</text>

                <text class="text-2xl font-bold text-green-700 block">¥{{ summary.total }}</text>

              </view>

              <button

                @tap="submitOrder"

                class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-bold text-lg"

              >

                提交订单

              </button>

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

      items: [

        {

          id: 1,

          name: '优质大米',

          spec: '10??· 五常大米',

          supplier: '黑龙江五常粮油有限公?,

          price: '4,800',

          quantity: 1,

        },

        {

          id: 2,

          name: '新鲜苹果',

          spec: '5??· 红富?,

          supplier: '山东果蔬合作?,

          price: '3,200',

          quantity: 2,

        },

      ],

      summary: {

        totalPrice: '11,200',

        shippingFee: '200',

        discount: '200',

        total: '11,200',

      },

      showInvoice: false,

      invoice: {

        type: 'personal',

        companyName: '',

        title: '',

      },

    };

  },

  computed: {

    bottomPadding() {

      return this.showInvoice ? 'pb-32' : 'pb-24';

    },

  },

  methods: {

    gotoAddress() {

      uni.navigateTo({

        url: '/pages/user/address',

      });

    },

    toggleInvoice() {

      this.showInvoice = !this.showInvoice;

    },

    submitOrder() {

      uni.showModal({

        title: '确认订单',

        content: `确认支付 ¥${this.summary.total} 吗？`,

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '订单提交成功',

              icon: 'success',

            });



            setTimeout(() => {

              uni.navigateTo({

                url: '/pages/order/detail?id=123',

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

.confirm-page {

  padding-bottom: 120px; /* 给底部提交按钮留出空?*/

}

</style></result>

