<template>

  <view class="detail-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">订单详情</text>

        <text class="text-gray-600 block mt-2">查看订单详细信息</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-2xl mx-auto">

        <!-- 订单状态卡?-->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="flex justify-between items-center mb-4">

            <view>

              <text class="text-2xl font-bold block">{{ orderStatusText }}</text>

              <text class="text-gray-600">{{ order.createTime }}</text>

            </view>

            <view :class="`px-4 py-2 rounded-full font-bold ${getStatusColor(order.status)}`">

              {{ getStatusText(order.status) }}

            </view>

          </view>



          <!-- 订单进度?-->

          <view class="mt-6">

            <view class="flex justify-between mb-2">

              <text class="text-sm text-gray-600">下单</text>

              <text class="text-sm text-gray-600">支付</text>

              <text class="text-sm text-gray-600">发货</text>

              <text class="text-sm text-gray-600">收货</text>

              <text class="text-sm text-gray-600">完成</text>

            </view>

            <view class="h-2 bg-gray-200 rounded-full overflow-hidden">

              <view :class="`h-full ${getProgressBarClass(order.status)}`" :style="{ width: getProgressWidth(order.status) }"></view>

            </view>

            <view class="flex justify-between mt-1">

              <text class="text-xs text-gray-500">{{ order.createTime }}</text>

              <text v-if="order.payTime" class="text-xs text-gray-500">{{ order.payTime }}</text>

              <text v-if="order.shipTime" class="text-xs text-gray-500">{{ order.shipTime }}</text>

              <text v-if="order.receiveTime" class="text-xs text-gray-500">{{ order.receiveTime }}</text>

              <text v-if="order.completeTime" class="text-xs text-gray-500">{{ order.completeTime }}</text>

            </view>

          </view>

        </view>



        <!-- 收货信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">收货信息</text>

          <view class="space-y-2">

            <view class="flex">

              <text class="text-gray-600 w-24">收货人：</text>

              <text class="font-medium">{{ order.address.name }}</text>

            </view>

            <view class="flex">

              <text class="text-gray-600 w-24">联系电话?/text>

              <text class="font-medium">{{ order.address.phone }}</text>

            </view>

            <view class="flex">

              <text class="text-gray-600 w-24">收货地址?/text>

              <text class="font-medium">{{ order.address.fullAddress }}</text>

            </view>

          </view>

        </view>



        <!-- 商品信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">商品信息</text>

          <view class="space-y-4">

            <view v-for="item in order.items" :key="item.id" class="flex items-center border-b pb-4 last:border-0">

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

              <text class="text-gray-600">订单?/text>

              <text class="font-medium">{{ order.orderNo }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">创建时间</text>

              <text class="font-medium">{{ order.createTime }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">支付时间</text>

              <text class="font-medium">{{ order.payTime || '--' }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">支付方式</text>

              <text class="font-medium">{{ order.paymentMethod }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">发票信息</text>

              <text class="font-medium">{{ order.invoice || '不需要发? }}</text>

            </view>

          </view>

        </view>



        <!-- 价格明细 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">价格明细</text>

          <view class="space-y-3">

            <view class="flex justify-between">

              <text class="text-gray-600">商品总价</text>

              <text class="font-medium">¥{{ order.summary.totalPrice }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">运费</text>

              <text class="font-medium">¥{{ order.summary.shippingFee }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">优惠?/text>

              <text class="text-green-600 font-medium">-¥{{ order.summary.discount }}</text>

            </view>

            <view class="flex justify-between border-t pt-3 mt-3">

              <text class="text-lg font-bold">实付金额</text>

              <text class="text-2xl font-bold text-green-700">¥{{ order.summary.total }}</text>

            </view>

          </view>

        </view>



        <!-- 物流信息 -->

        <view v-if="order.shipping" class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-4 block">物流信息</text>

          <view class="space-y-4">

            <view class="flex justify-between">

              <text class="text-gray-600">物流公司</text>

              <text class="font-medium">{{ order.shipping.company }}</text>

            </view>

            <view class="flex justify-between">

              <text class="text-gray-600">运单?/text>

              <text class="font-medium">{{ order.shipping.trackingNo }}</text>

            </view>

            <button @tap="viewTracking" class="w-full py-3 border border-green-600 text-green-600 rounded-lg hover-bg-green-50">

              查看物流跟踪

            </button>

          </view>

        </view>



        <!-- 操作按钮 -->

        <view v-if="order.actions.length > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t p-4">

          <view class="container mx-auto px-4">

            <view class="flex space-x-3">

              <button

                v-for="action in order.actions"

                :key="action.id"

                @tap="handleAction(action)"

                :class="`flex-1 py-3 rounded-lg font-medium ${action.type === 'primary' ? 'bg-green-600 text-white hover:bg-green-700' : 'border border-gray-300 text-gray-700 hover-bg-gray-50'}`"

              >

                {{ action.label }}

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

      order: {

        id: 123456,

        orderNo: '20230415123456',

        status: 'shipped', // pending_payment, pending_shipment, shipped, completed, cancelled

        createTime: '2023-04-15 14:30:22',

        payTime: '2023-04-15 14:35:10',

        shipTime: '2023-04-16 09:15:33',

        receiveTime: '',

        completeTime: '',

        paymentMethod: '微信支付',

        invoice: '个人发票 - 张先?,

        address: {

          name: '张先?,

          phone: '138****8888',

          fullAddress: '北京市朝阳区建国门外大街1号国贸大厦A?001?,

        },

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

        shipping: {

          company: '顺丰速运',

          trackingNo: 'SF1234567890',

        },

        actions: [

          { id: 'contact', label: '联系客服', type: 'secondary' },

          { id: 'cancel', label: '取消订单', type: 'secondary' },

          { id: 'pay', label: '立即支付', type: 'primary' },

          { id: 'confirm', label: '确认收货', type: 'primary' },

          { id: 'comment', label: '评价订单', type: 'primary' },

          { id: 'delete', label: '删除订单', type: 'secondary' },

        ].filter(action => this.shouldShowAction(action.id)),

      },

    };

  },

  computed: {

    orderStatusText() {

      const statusMap = {

        pending_payment: '待付?,

        pending_shipment: '待发?,

        shipped: '已发?,

        completed: '已完?,

        cancelled: '已取?,

      };

      return statusMap[this.order.status] || '未知状?;

    },

  },

  onLoad(options) {

    if (options.id) {

      // 实际应该根据ID加载订单数据

      console.log('加载订单ID:', options.id);

    }

    // 根据订单状态筛选显示的操作按钮

    this.filterActions();

  },

  methods: {

    getStatusColor(status) {

      const colors = {

        pending_payment: 'bg-red-100 text-red-800',

        pending_shipment: 'bg-blue-100 text-blue-800',

        shipped: 'bg-green-100 text-green-800',

        completed: 'bg-gray-100 text-gray-800',

        cancelled: 'bg-gray-100 text-gray-800',

      };

      return colors[status] || 'bg-gray-100 text-gray-800';

    },

    getStatusText(status) {

      const texts = {

        pending_payment: '待付?,

        pending_shipment: '待发?,

        shipped: '已发?,

        completed: '已完?,

        cancelled: '已取?,

      };

      return texts[status] || '未知';

    },

    getProgressBarClass(status) {

      const classes = {

        pending_payment: 'bg-red-500',

        pending_shipment: 'bg-blue-500',

        shipped: 'bg-green-500',

        completed: 'bg-green-600',

        cancelled: 'bg-gray-400',

      };

      return classes[status] || 'bg-gray-400';

    },

    getProgressWidth(status) {

      const widths = {

        pending_payment: '20%',

        pending_shipment: '40%',

        shipped: '60%',

        completed: '100%',

        cancelled: '100%',

      };

      return widths[status] || '0%';

    },

    shouldShowAction(actionId) {

      const status = this.order.status;

      const actionRules = {

        contact: true, // 总是可以联系客服

        cancel: ['pending_payment', 'pending_shipment'].includes(status),

        pay: status === 'pending_payment',

        confirm: status === 'shipped',

        comment: status === 'completed',

        delete: ['completed', 'cancelled'].includes(status),

      };

      return actionRules[actionId] || false;

    },

    filterActions() {

      this.order.actions = [

        { id: 'contact', label: '联系客服', type: 'secondary' },

        { id: 'cancel', label: '取消订单', type: 'secondary' },

        { id: 'pay', label: '立即支付', type: 'primary' },

        { id: 'confirm', label: '确认收货', type: 'primary' },

        { id: 'comment', label: '评价订单', type: 'primary' },

        { id: 'delete', label: '删除订单', type: 'secondary' },

      ].filter(action => this.shouldShowAction(action.id));

    },

    handleAction(action) {

      switch (action.id) {

        case 'contact':

          uni.navigateTo({

            url: '/pages/chat/index',

          });

          break;

        case 'cancel':

          this.cancelOrder();

          break;

        case 'pay':

          this.payOrder();

          break;

        case 'confirm':

          this.confirmReceipt();

          break;

        case 'comment':

          this.gotoComment();

          break;

        case 'delete':

          this.deleteOrder();

          break;

      }

    },

    viewTracking() {

      uni.showToast({

        title: '跳转到物流跟踪页?,

        icon: 'none',

      });

      // 实际应该跳转到物流跟踪页?    },

    cancelOrder() {

      uni.showModal({

        title: '取消订单',

        content: '确定要取消此订单吗？',

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '订单已取?,

              icon: 'success',

            });

            // 实际应该调用API

            setTimeout(() => {

              uni.navigateBack();

            }, 1500);

          }

        },

      });

    },

    payOrder() {

      uni.navigateTo({

        url: `/pages/payment/index?orderId=${this.order.id}`,

      });

    },

    confirmReceipt() {

      uni.showModal({

        title: '确认收货',

        content: '请确认已收到商品且无?,

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '收货确认成功',

              icon: 'success',

            });

            // 实际应该调用API

            this.order.status = 'completed';

            this.filterActions();

          }

        },

      });

    },

    gotoComment() {

      uni.navigateTo({

        url: `/pages/order/comment?id=${this.order.id}`,

      });

    },

    deleteOrder() {

      uni.showModal({

        title: '删除订单',

        content: '确定要删除此订单吗？删除后不可恢?,

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '订单已删?,

              icon: 'success',

            });

            // 实际应该调用API

            setTimeout(() => {

              uni.navigateBack();

            }, 1500);

          }

        },

      });

    },

  },

};

</script>



<style>

.detail-page {

  padding-bottom: 100px; /* 给底部操作按钮留出空?*/

}

</style>

