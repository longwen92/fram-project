<template>
  <view class="purchase-detail-page min-h-screen bg-gray-50">
    <!-- 头部信息 -->
    <view class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
      <view class="container mx-auto px-4">
        <view class="flex justify-between items-start">
          <view>
            <text class="text-3xl font-bold mb-2 block">{{ purchaseData.name }}</text>
            <view class="flex items-center space-x-4">
              <text class="text-lg opacity-90">{{ getCategoryName(purchaseData.category) }}</text>
              <view :class="`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyClass(purchaseData.urgency)}`">
                {{ getUrgencyText(purchaseData.urgency) }}
              </view>
            </view>
          </view>
          <view class="text-right">
            <text class="text-2xl font-bold block">¥{{ formatBudget(purchaseData.minBudget) }}-{{ formatBudget(purchaseData.maxBudget) }}</text>
            <text class="text-sm opacity-90">预算范围</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 主要信息卡片 -->
    <view class="container mx-auto px-4 py-6 -mt-8">
      <view class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <!-- 基本信息 -->
        <text class="text-xl font-bold mb-6 block">采购信息</text>
        <view class="space-y-4">
          <view class="grid grid-cols-1 md-grid-cols-2 gap-4">
            <view class="flex items-center">
              <text class="text-gray-500 w-24">采购品类</text>
              <text class="flex-1 font-medium">{{ getCategoryName(purchaseData.category) }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">商品名称</text>
              <text class="flex-1 font-medium">{{ purchaseData.name }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">采购数量</text>
              <text class="flex-1 font-medium">{{ purchaseData.quantity }} {{ purchaseData.unit }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">预算范围</text>
              <text class="flex-1 font-medium">¥{{ formatBudget(purchaseData.minBudget) }}-{{ formatBudget(purchaseData.maxBudget) }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">期望产地</text>
              <text class="flex-1 font-medium">{{ purchaseData.origin || '不限产地' }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">采购类型</text>
              <text class="flex-1 font-medium">{{ getPurchaseTypeText(purchaseData.purchaseType) }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">紧急程度</text>
              <text :class="`flex-1 font-medium ${getUrgencyTextColor(purchaseData.urgency)}`">
                {{ getUrgencyText(purchaseData.urgency) }}
              </text>
            </view>
            <view class="flex items-center">
              <text class="text-gray-500 w-24">公开状态</text>
              <text class="flex-1 font-medium">{{ purchaseData.isPublic ? '公开' : '私密' }}</text>
            </view>
          </view>

          <!-- 详细描述 -->
          <view class="mt-6">
            <text class="text-gray-500 block mb-2">详细描述</text>
            <view class="bg-gray-50 rounded-lg p-4">
              <text class="text-gray-700 whitespace-pre-line">{{ purchaseData.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 需求方信息 -->
      <view class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <text class="text-xl font-bold mb-6 block">需求方信息</text>
        <view class="flex items-center">
          <view class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <text class="text-blue-600 text-2xl">👤</text>
          </view>
          <view class="flex-1">
            <text class="font-bold text-lg block">{{ purchaserData.name }}</text>
            <view class="text-gray-600 space-y-1 mt-2">
              <view class="flex items-center">
                <text class="mr-2">🏢</text>
                <text>{{ purchaserData.company }}</text>
              </view>
              <view class="flex items-center">
                <text class="mr-2">📍</text>
                <text>{{ purchaserData.location }}</text>
              </view>
              <view class="flex items-center">
                <text class="mr-2">📞</text>
                <text>{{ purchaseData.contactPhone }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="grid grid-cols-3 gap-4 mt-6 text-center">
          <view>
            <text class="text-2xl font-bold block">{{ purchaserData.purchaseCount }}</text>
            <text class="text-sm text-gray-500">历史采购</text>
          </view>
          <view>
            <text class="text-2xl font-bold block">{{ purchaserData.completionRate }}%</text>
            <text class="text-sm text-gray-500">已完成</text>
          </view>
          <view>
            <text class="text-2xl font-bold block">{{ purchaserData.rating }}</text>
            <text class="text-sm text-gray-500">信用评分</text>
          </view>
        </view>
      </view>

      <!-- 报价信息 -->
      <view class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <view class="flex justify-between items-center mb-6">
          <text class="text-xl font-bold">供应商报价</text>
          <text class="text-blue-600 font-medium">{{ quotationCount }} 个报价</text>
        </view>
        <view v-if="quotations.length > 0" class="space-y-4">
          <view v-for="(quote, index) in quotations.slice(0, 3)" :key="index" class="border rounded-lg p-4">
            <view class="flex justify-between items-start mb-2">
              <text class="font-medium">{{ quote.supplierName }}</text>
              <text class="text-green-700 font-bold">¥{{ formatBudget(quote.price) }}/{{ purchaseData.unit }}</text>
            </view>
            <text class="text-gray-600 text-sm block mb-2">{{ quote.description }}</text>
            <view class="flex justify-between items-center text-sm text-gray-500">
              <text>{{ quote.location }}</text>
              <text>{{ formatTime(quote.createTime) }}</text>
            </view>
          </view>
          <button v-if="quotations.length > 3" @tap="viewAllQuotations" class="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover-bg-blue-50">
            查看全部 {{ quotations.length }} 个报价
          </button>
        </view>
        <view v-else class="text-center py-8">
          <text class="text-5xl mb-4">📝</text>
          <text class="text-xl font-bold text-gray-700 block mb-2">暂无报价</text>
          <text class="text-gray-600">成为第一个报价的供应商</text>
        </view>
      </view>

      <!-- 发布时间和状态 -->
      <view class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <view class="grid grid-cols-2 gap-4">
          <view>
            <text class="text-gray-500 block mb-1">发布时间</text>
            <text class="font-medium">{{ formatTime(purchaseData.createTime) }}</text>
          </view>
          <view>
            <text class="text-gray-500 block mb-1">状态</text>
            <text :class="`font-medium ${getStatusClass(purchaseData.status)}`">
              {{ getStatusText(purchaseData.status) }}
            </text>
          </view>
          <view>
            <text class="text-gray-500 block mb-1">浏览量</text>
            <text class="font-medium">{{ purchaseData.viewCount || 0 }}</text>
          </view>
          <view>
            <text class="text-gray-500 block mb-1">收藏数</text>
            <text class="font-medium">{{ purchaseData.favoriteCount || 0 }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center space-x-4">
      <button @tap="toggleFavorite" class="p-3" :class="isFavorite ? 'text-red-500' : 'text-gray-500'">
        <text class="text-2xl">{{ isFavorite ? '❤️' : '🤍' }}</text>
      </button>
      <button @tap="sharePurchase" class="p-3 text-gray-500">
        <text class="text-2xl">📤</text>
      </button>
      <button @tap="gotoChat" class="flex-1 py-3 bg-blue-600 text-white rounded-lg hover-bg-blue-700 font-medium">
        立即报价
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      purchaseId: '',
      purchaseData: {
        id: '1',
        category: '3',
        name: '优质五常大米',
        quantity: '10',
        unit: '吨',
        minBudget: '40000',
        maxBudget: '50000',
        origin: '黑龙江',
        description: '需要优质五常大米，要求颗粒饱满，色泽清白透明，真空包装。\n交货时间15天内\n质量标准：一级大米，符合国家食品安全标准',
        urgency: 'urgent',
        purchaseType: 'one_time',
        contactPhone: '13800138000',
        isPublic: true,
        status: 'active',
        createTime: '2026-04-03 14:30:00',
        viewCount: 156,
        favoriteCount: 23,
      },
      purchaserData: {
        name: '北京餐饮集团',
        company: '北京餐饮集团有限公司',
        location: '北京市朝阳区',
        purchaseCount: 128,
        completionRate: 95,
        rating: 4.8,
      },
      quotations: [
        {
          id: '1',
          supplierName: '黑龙江五常粮油有限公司',
          price: '45000',
          description: '提供正宗五常大米，一级品质，真空包装，可15天内交货',
          location: '黑龙江哈尔滨',
          createTime: '2026-04-03 15:20:00',
        },
        {
          id: '2',
          supplierName: '吉林大米贸易公司',
          price: '42000',
          description: '优质东北大米，符合国家标准，量大优惠',
          location: '吉林长春',
          createTime: '2026-04-03 16:45:00',
        },
      ],
      isFavorite: false,
      quotationCount: 2,
    };
  },
  onLoad(options) {
    this.purchaseId = options.id;
    console.log('采购需求ID:', this.purchaseId);
    this.fetchPurchaseDetail();
  },
  methods: {
    fetchPurchaseDetail() {
      console.log('获取采购详情:', this.purchaseId);
    },
    getCategoryName(categoryId) {
      const categories = {
        '1': '水果',
        '2': '蔬菜',
        '3': '粮油',
        '4': '水产',
        '5': '畜禽',
        '6': '茶叶',
        '7': '中药',
        '8': '坚果',
      };
      return categories[categoryId] || '其他';
    },
    getUrgencyClass(urgency) {
      const classes = {
        normal: 'bg-gray-100 text-gray-700',
        urgent: 'bg-red-100 text-red-700',
        very_urgent: 'bg-red-200 text-red-800',
      };
      return classes[urgency] || classes.normal;
    },
    getUrgencyText(urgency) {
      const texts = {
        normal: '普通',
        urgent: '紧急',
        very_urgent: '非常紧急',
      };
      return texts[urgency] || '普通';
    },
    getUrgencyTextColor(urgency) {
      const colors = {
        normal: 'text-gray-700',
        urgent: 'text-red-600',
        very_urgent: 'text-red-700',
      };
      return colors[urgency] || colors.normal;
    },
    getPurchaseTypeText(type) {
      return type === 'long_term' ? '长期采购' : '一次性采购';
    },
    getStatusClass(status) {
      const classes = {
        active: 'text-green-600',
        completed: 'text-blue-600',
        cancelled: 'text-gray-500',
        expired: 'text-yellow-600',
      };
      return classes[status] || 'text-gray-600';
    },
    getStatusText(status) {
      const texts = {
        active: '进行中',
        completed: '已完成',
        cancelled: '已取消',
        expired: '已过期',
      };
      return texts[status] || '未知';
    },
    formatBudget(amount) {
      if (!amount) return '0';
      return Number(amount).toLocaleString('zh-CN');
    },
    formatTime(time) {
      if (!time) return '';
      return time;
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      uni.showToast({
        title: this.isFavorite ? '已收藏' : '已取消收藏',
        icon: 'success',
      });
    },
    sharePurchase() {
      uni.showToast({
        title: '分享功能开发中',
        icon: 'none',
      });
    },
    gotoChat() {
      console.log('跳转到报价页面，采购ID:', this.purchaseId);
      uni.showToast({
        title: '跳转到报价页面',
        icon: 'none',
      });
    },
    viewAllQuotations() {
      uni.showToast({
        title: '查看全部报价',
        icon: 'none',
      });
    },
  },
};
</script>

<style>
.purchase-detail-page {
  padding-bottom: 80px;
}
</style>
