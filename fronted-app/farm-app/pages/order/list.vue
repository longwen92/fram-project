<template>

  <view class="order-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">我的订单</text>

        <text class="text-gray-600 block mt-2">管理您的所有订单</text>

      </view>

    </view>



    <!-- 订单状态筛?-->

    <view class="bg-white border-b">

      <view class="container mx-auto px-4">

        <scroll-view scroll-x class="flex whitespace-nowrap py-3">

          <button

            v-for="tab in tabs"

            :key="tab.id"

            @tap="switchTab(tab.id)"

            :class="`px-4 py-2 rounded-full mr-2 ${activeTab === tab.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover-bg-gray-200'}`"

          >

            {{ tab.label }}

            <text v-if="tab.count" class="ml-1">({{ tab.count }})</text>

          </button>

        </scroll-view>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view v-if="filteredOrders.length === 0" class="text-center py-16">

        <text class="text-5xl mb-4">📋</text>

        <text class="text-2xl font-bold text-gray-700 block mb-4">暂无订单</text>

        <text class="text-gray-600 block mb-8">快去选购商品吧！</text>

        <button @tap="gotoSupply" class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium">

          去逛?        </button>

      </view>



      <view v-else class="space-y-4">

        <view v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-xl shadow-sm overflow-hidden">

          <!-- 订单头部 -->

          <view class="border-b p-4">

            <view class="flex justify-between items-center">

              <view>

                <text class="font-bold">订单号：{{ order.orderNo }}</text>

                <text class="text-gray-500 text-sm block mt-1">{{ order.createTime }}</text>

              </view>

              <view :class="`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`">

                {{ getStatusText(order.status) }}

              </view>

            </view>

          </view>



          <!-- 商品列表 -->

          <view class="p-4">

            <view v-for="item in order.items" :key="item.id" class="flex items-center mb-4 last:mb-0">

              <view class="w-16 h-16 bg-gray-200 rounded-lg mr-3"></view>

              <view class="flex-1">

                <text class="font-medium block mb-1">{{ item.name }}</text>

                <text class="text-gray-600 text-sm block">{{ item.spec }}</text>

              </view>

              <view class="text-right">

                <text class="text-gray-700 block">¥{{ item.price }}</text>

                <text class="text-gray-500 text-sm">x{{ item.quantity }}</text>

              </view>

            </view>

          </view>



          <!-- 订单合计 -->

          <view class="bg-gray-50 p-4 border-t">

            <view class="flex justify-between items-center">

              <text class="text-gray-600">{{ order.itemCount }} 件商品</text>

              <view class="text-right">

                <text class="text-gray-600 text-sm block">合计</text>

                <text class="text-xl font-bold text-green-700">¥{{ order.total }}</text>

              </view>

            </view>

          </view>



          <!-- 操作按钮 -->

          <view class="border-t p-4">

            <view class="flex justify-end space-x-3">

              <button

                v-if="order.status === 'pending_payment'"

                @tap="gotoPay(order.id)"

                class="px-4 py-2 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium"

              >

                立即支付

              </button>

              <button

                v-if="order.status === 'shipped'"

                @tap="confirmReceipt(order.id)"

                class="px-4 py-2 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium"

              >

                确认收货

              </button>

              <button

                v-if="order.status === 'completed' && !order.commented"

                @tap="gotoComment(order.id)"

                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover-bg-blue-700 font-medium"

              >

                评价

              </button>

              <button

                @tap="viewOrderDetail(order.id)"

                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50"

              >

                查看详情

              </button>

              <button

                v-if="order.status === 'pending_payment'"

                @tap="cancelOrder(order.id)"

                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50"

              >

                取消订单

              </button>

            </view>

          </view>

        </view>

      </view>



      <!-- 分页 -->

      <view v-if="filteredOrders.length > 0" class="mt-8 flex justify-center">

        <view class="flex space-x-2">

          <button class="px-4 py-2 border rounded-lg hover-bg-gray-50">上一?/button>

          <button class="px-4 py-2 bg-green-600 text-white rounded-lg">1</button>

          <button class="px-4 py-2 border rounded-lg hover-bg-gray-50">2</button>

          <button class="px-4 py-2 border rounded-lg hover-bg-gray-50">3</button>

          <button class="px-4 py-2 border rounded-lg hover-bg-gray-50">下一?/button>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      activeTab: 'all',

      tabs: [

        { id: 'all', label: '全部', count: 12 },

        { id: 'pending_payment', label: '待付?, count: 2 },

        { id: 'pending_shipment', label: '待发?, count: 3 },

        { id: 'shipped', label: '已发?, count: 4 },

        { id: 'completed', label: '已完?, count: 3 },

        { id: 'cancelled', label: '已取?, count: 0 },

      ],

      orders: [

        {

          id: 1,

          orderNo: 'HN202603280001',

          createTime: '2026-03-28 14:30:25',

          status: 'pending_payment',

          itemCount: 2,

          total: '11,200',

          commented: false,

          items: [

            {

              id: 101,

              name: '优质大米',

              spec: '10??· 五常大米',

              price: '4,800',

              quantity: 1,

            },

            {

              id: 102,

              name: '新鲜苹果',

              spec: '5??· 红富?,

              price: '3,200',

              quantity: 2,

            },

          ],

        },

        {

          id: 2,

          orderNo: 'HN202603270015',

          createTime: '2026-03-27 09:15:42',

          status: 'pending_shipment',

          itemCount: 1,

          total: '4,800',

          commented: false,

          items: [

            {

              id: 103,

              name: '有机蔬菜',

              spec: '2??· 混合?,

              price: '2,500',

              quantity: 1,

            },

          ],

        },

        {

          id: 3,

          orderNo: 'HN202603250008',

          createTime: '2026-03-25 16:20:33',

          status: 'shipped',

          itemCount: 3,

          total: '8,900',

          commented: false,

          items: [

            {

              id: 104,

              name: '五常大米',

              spec: '5??· 特级',

              price: '5,200',

              quantity: 1,

            },

          ],

        },

        {

          id: 4,

          orderNo: 'HN202603200012',

          createTime: '2026-03-20 11:45:18',

          status: 'completed',

          itemCount: 1,

          total: '3,200',

          commented: true,

          items: [

            {

              id: 105,

              name: '红富士苹?,

              spec: '2??· 一?,

              price: '3,200',

              quantity: 1,

            },

          ],

        },

      ],

    };

  },

  computed: {

    filteredOrders() {

      if (this.activeTab === 'all') {

        return this.orders;

      }

      return this.orders.filter(order => order.status === this.activeTab);

    },

  },

  methods: {

    switchTab(tabId) {

      this.activeTab = tabId;

    },

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

      return texts[status] || status;

    },

    viewOrderDetail(id) {

      uni.navigateTo({

        url: `/pages/order/detail?id=${id}`,

      });

    },

    gotoPay(id) {

      uni.navigateTo({

        url: `/pages/payment/index?orderId=${id}`,

      });

    },

    confirmReceipt(id) {

      uni.showModal({

        title: '确认收货',

        content: '确认收到商品吗？',

        success: (res) => {

          if (res.confirm) {

            // 更新订单状?            const order = this.orders.find(o => o.id === id);

            if (order) {

              order.status = 'completed';

            }

            uni.showToast({

              title: '收货成功',

              icon: 'success',

            });

          }

        },

      });

    },

    gotoComment(id) {

      uni.navigateTo({

        url: `/pages/order/comment?id=${id}`,

      });

    },

    cancelOrder(id) {

      uni.showModal({

        title: '取消订单',

        content: '确定要取消该订单吗？',

        success: (res) => {

          if (res.confirm) {

            // 更新订单状?            const order = this.orders.find(o => o.id === id);

            if (order) {

              order.status = 'cancelled';

            }

            uni.showToast({

              title: '订单已取?,

              icon: 'success',

            });

          }

        },

      });

    },

    gotoSupply() {

      uni.switchTab({

        url: '/pages/supply/index',

      });

    },

  },

};

</script>



<style>

.order-page {

  /* 基础样式 */

}

</style></result>

