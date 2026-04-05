<template>

  <view class="payment-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">订单支付</text>

        <text class="text-gray-600 block mt-2">请完成支付以确认订单</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-md mx-auto">

        <!-- 订单信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">订单信息</text>

          <view class="space-y-3">

            <view class="flex justify-between">

              <text class="text-gray-600">订单号</text>

              <text class="font-medium">{{ order.orderNo }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">商品数量</text>

              <text class="font-medium">{{ order.itemCount }}件</text>

            </view>

            <view class="flex justify-between border-t pt-3 mt-3">

              <text class="text-lg font-bold">支付金额</text>

              <text class="text-2xl font-bold text-green-700">¥{{ order.amount }}</text>

            </view>

          </view>

        </view>



        <!-- 支付方式 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">选择支付方式</text>

          <view class="space-y-3">

            <label

              v-for="method in paymentMethods"

              :key="method.id"

              class="flex items-center justify-between p-4 border rounded-lg hover-bg-gray-50 cursor-pointer"

              :class="{ 'border-green-500 bg-green-50': selectedMethod === method.id }"

              @tap="selectMethod(method.id)"

            >

              <view class="flex items-center">

                <view :class="`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center mr-3`">

                  <text class="text-xl">{{ method.icon }}</text>

                </view>

                <view>

                  <text class="font-medium block">{{ method.name }}</text>

                  <text class="text-sm text-gray-600">{{ method.description }}</text>

                </view>

              </view>

              <input

                type="radio"

                name="payment"

                :checked="selectedMethod === method.id"

                class="h-5 w-5 text-green-600 focus-ring-green-500 border-gray-300"

              />

            </label>

          </view>

        </view>



        <!-- 支付密码码（如果选择余额支付）-->

        <view v-if="selectedMethod === 'balance'" class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">支付密码码</text>

          <view class="space-y-4">

            <view class="text-center">

              <text class="text-gray-600 block mb-2">请输入支付密码码</text>

              <view class="flex justify-center space-x-2 mb-4">

                <view

                  v-for="i in 6"

                  :key="i"

                  class="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl"

                  :class="{ 'border-green-500': password.length >= i }"

                >

                  <text v-if="password.length >= i">*</text>

                </view>

              </view>

              <input

                type="number"

                :value="password"

                maxlength="6"

                class="absolute opacity-0 w-0 h-0"

                @input="handlePasswordInput"

                ref="passwordInput"

              />

            </view>

            <button @tap="focusPassword" class="w-full py-3 border border-green-600 text-green-600 rounded-lg hover-bg-green-50">

              {{ password.length === 0 ? '输入支付密码码' : '重新输入' }}

            </button>

          </view>

        </view>



        <!-- 优惠券-->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="flex justify-between items-center mb-4">

            <text class="text-xl font-bold">优惠券</text>

            <button @tap="toggleCoupons" class="text-green-600 hover-text-green-700">

              {{ showCoupons ? '隐藏' : '查看可用优惠券' }}

            </button>

          </view>



          <view v-if="selectedCoupon" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">

            <view class="flex justify-between items-center">

              <view>

                <text class="font-bold text-green-700 block">{{ selectedCoupon.name }}</text>

                <text class="text-sm text-green-600">{{ selectedCoupon.description }}</text>

              </view>

              <button @tap="removeCoupon" class="text-red-500 hover-text-red-700">

                移除

              </button>

            </view>

          </view>



          <view v-if="showCoupons" class="space-y-3">

            <view v-for="coupon in availableCoupons" :key="coupon.id" class="flex items-center justify-between p-3 border rounded-lg">

              <view>

                <text class="font-medium block">{{ coupon.name }}</text>

                <text class="text-sm text-gray-600">{{ coupon.description }}</text>

                <text class="text-xs text-gray-500">有效期至 {{ coupon.expiry }}</text>

              </view>

              <button

                @tap="selectCoupon(coupon)"

                class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover-bg-green-50"

              >

                使用

              </button>

            </view>

          </view>

        </view>



        <!-- 支付金额汇总-->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">支付明细</text>

          <view class="space-y-3">

            <view class="flex justify-between">

              <text class="text-gray-600">订单金额</text>

              <text class="font-medium">¥{{ order.amount }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">优惠券</text>

              <text class="text-green-600 font-medium">-¥{{ discountAmount }}</text>

            </view>

            <view class="flex justify-between border-t pt-3 mt-3">

              <text class="text-lg font-bold">实付金额</text>

              <text class="text-2xl font-bold text-green-700">¥{{ actualAmount }}</text>

            </view>

          </view>

        </view>



        <!-- 支付按钮 -->

        <view class="fixed bottom-0 left-0 right-0 bg-white border-t p-4">

          <view class="container mx-auto px-4">

            <button

              @tap="handlePayment"

              :disabled="!selectedMethod"

              :class="`w-full py-4 rounded-lg font-bold text-lg ${selectedMethod ? 'bg-green-600 text-white hover-bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`"

            >

              立即支付 ¥{{ actualAmount }}

            </button>

            <view class="text-center mt-2">

              <text class="text-xs text-gray-500">支付即表示您同意《支付协议》</text>

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

      order: {

        id: 123456,

        orderNo: '20230415123456',

        itemCount: 3,

        amount: '11,200',

      },

      selectedMethod: 'wechat',

      password: '',

      showCoupons: false,

      selectedCoupon: null,

      paymentMethods: [

        {

          id: 'wechat',

          name: '微信支付',

          icon: '💬',

          bgColor: 'bg-green-100',

          description: '推荐微信用户使用',

        },

        {

          id: 'alipay',

          name: '支付宝',

          icon: '💰',

          bgColor: 'bg-blue-100',

          description: '推荐支付宝用户使用',

        },

        {

          id: 'balance',

          name: '余额支付',

          icon: '🏦',

          bgColor: 'bg-purple-100',

          description: '账户余额 ¥5,000',

        },

        {

          id: 'bank',

          name: '银行卡支付',

          icon: '💳',

          bgColor: 'bg-yellow-100',

          description: '支持储蓄卡/信用卡',

        },

      ],

      availableCoupons: [

        {

          id: 1,

          name: '新用户优惠券',

          description: '满¥3000减¥200',

          discount: '200',

          expiry: '2023-12-31',

        },

        {

          id: 2,

          name: '节日大促券',

          description: '全场通用 ¥100',

          discount: '100',

          expiry: '2023-12-31',

        },

        {

          id: 3,

          name: '农产品专享券',

          description: '农产品订单减 ¥50',

          discount: '50',

          expiry: '2023-12-31',

        },

      ],

    };

  },

  computed: {

    discountAmount() {

      if (this.selectedCoupon) {

        return this.selectedCoupon.discount;

      }

      return '0';

    },

    actualAmount() {

      const orderAmount = parseFloat(this.order.amount.replace(',', ''));

      const discount = parseFloat(this.discountAmount.replace(',', '') || 0);

      return (orderAmount - discount).toLocaleString();

    },

  },

  onLoad(options) {

    if (options.orderId) {

      console.log('加载订单支付:', options.orderId);

      // 实际应该根据订单ID加载订单信息

    }

  },

  methods: {

    selectMethod(methodId) {

      this.selectedMethod = methodId;

      if (methodId !== 'balance') {

        this.password = '';

      }

    },

    focusPassword() {

      this.$refs.passwordInput.focus();

      this.password = '';

    },

    handlePasswordInput(e) {

      const value = e.detail.value;

      if (value.length <= 6) {

        this.password = value;

      }

      if (value.length === 6) {

        // 密码码输入完成，自动验证码

        setTimeout(() => {

          this.verifyPassword();

        }, 300);

      }

    },

    verifyPassword() {

      // 模拟密码码验证码

      if (this.password === '123456') {

        uni.showToast({

          title: '密码码验证码成功',

          icon: 'success',

        });

      } else {

        uni.showToast({

          title: '密码码错误，请重试',

          icon: 'none',

        });

        this.password = '';

      }

    },

    toggleCoupons() {

      this.showCoupons = !this.showCoupons;

    },

    selectCoupon(coupon) {

      this.selectedCoupon = coupon;

      this.showCoupons = false;

    },

    removeCoupon() {

      this.selectedCoupon = null;

    },

    handlePayment() {

      if (!this.selectedMethod) {

        uni.showToast({

          title: '请选择支付方式',

          icon: 'none',

        });

        return;

      }



      if (this.selectedMethod === 'balance' && this.password.length !== 6) {

        uni.showToast({

          title: '请输入6位支付密码码',

          icon: 'none',

        });

        return;

      }



      uni.showModal({

        title: '确认支付',

        content: `确认支付 ¥${this.actualAmount} 吗？`,

        success: (res) => {

          if (res.confirm) {

            // 模拟支付处理

            uni.showLoading({

              title: '支付处理中...',

            });



            setTimeout(() => {

              uni.hideLoading();

              uni.showToast({

                title: '支付成功',

                icon: 'success',

              });



              setTimeout(() => {

                uni.redirectTo({

                  url: `/pages/order/detail?id=${this.order.id}`,

                });

              }, 1500);

            }, 2000);

          }

        },

      });

    },

  },

};

</script>



<style>

.payment-page {

  padding-bottom: 140px; /* 给底部支付按钮留出空间*/

}

</style>

