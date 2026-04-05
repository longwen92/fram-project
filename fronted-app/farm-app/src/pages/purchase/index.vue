<template>

  <view class="purchase-page min-h-screen bg-gray-50">

    <!-- Hero Section -->

    <view class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">

      <view class="container mx-auto px-4">

        <text class="text-4xl font-bold mb-4">采购需求</text>

        <text class="text-lg opacity-90 max-w-3xl block">

          发布您的采购需求，让全国优质供应商主动联系您，快速匹配最合适的货源

        </text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="flex flex-col lg-flex-row gap-8">

        <!-- 筛选侧边栏 -->

        <view class="lg-w-1-4">

          <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

            <view class="flex items-center justify-between mb-6">

              <text class="text-xl font-bold">筛选条件</text>

              <button @tap="clearFilters" class="text-sm text-blue-600 hover-text-blue-700">

                清除所有

              </button>

            </view>



            <!-- 搜索框 -->

            <view class="mb-6">

              <view class="relative">

                <input

                  type="text"

                  placeholder="搜索采购需求、品类..."

                  class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-blue-500"

                  v-model="filters.keyword"

                />

                <text class="absolute left-4 top-3.5 text-gray-400">🔍</text>

              </view>

            </view>



            <!-- 分类筛选 -->

            <view class="mb-6">

              <text class="font-semibold mb-3 flex items-center">

                <text class="mr-2">📂</text>

                采购品类

              </text>

              <view class="space-y-2">

                <button

                  v-for="category in categories"

                  :key="category.id"

                  @tap="handleFilterChange('category', category.id)"

                  :class="`flex justify-between items-center w-full px-3 py-2 rounded-lg text-left ${filters.category === category.id ? 'bg-blue-50 text-blue-700' : 'hover-bg-gray-50'}`"

                >

                  <text>{{ category.name }}</text>

                  <text class="text-sm text-gray-500">{{ category.count }}</text>

                </button>

              </view>

            </view>



            <!-- 地区筛选 -->

            <view class="mb-6">

              <text class="font-semibold mb-3 flex items-center">

                <text class="mr-2">📍</text>

                采购地区

              </text>

              <select

                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-blue-500"

                :value="filters.province"

                @change="handleFilterChange('province', $event.target.value)"

              >

                <option value="">全部地区</option>

                <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>

              </select>

            </view>



            <!-- 预算筛选 -->

            <view class="mb-6">

              <text class="font-semibold mb-3">预算范围</text>

              <view class="flex gap-2">

                <input

                  type="number"

                  placeholder="最低预算"

                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-blue-500"

                  v-model="filters.minBudget"

                  @input="handleFilterChange('minBudget', $event.target.value)"

                />

                <text class="self-center">-</text>

                <input

                  type="number"

                  placeholder="最高预算"

                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-blue-500"

                  v-model="filters.maxBudget"

                  @input="handleFilterChange('maxBudget', $event.target.value)"

                />

              </view>

            </view>



            <!-- 其他筛选 -->

            <view class="space-y-3">

              <label class="flex items-center">

                <input

                  type="checkbox"

                  class="h-4 w-4 text-blue-600 focus-ring-blue-500 border-gray-300 rounded"

                  v-model="filters.urgent"

                  @change="handleFilterChange('urgent', $event.target.checked)"

                />

                <text class="ml-2">仅显示紧急采购</text>

              </label>

              <label class="flex items-center">

                <input

                  type="checkbox"

                  class="h-4 w-4 text-blue-600 focus-ring-blue-500 border-gray-300 rounded"

                  v-model="filters.longTerm"

                  @change="handleFilterChange('longTerm', $event.target.checked)"

                />

                <text class="ml-2">仅显示长期采</text>

              </label>

            </view>

          </view>



          <!-- 快速发布采?-->

          <view class="bg-white rounded-xl shadow-sm p-6">

            <text class="font-bold mb-4 block">快速发布采</text>

            <view class="space-y-4">

              <button @tap="gotoCreatePurchase" class="w-full py-3 bg-blue-600 text-white rounded-lg hover-bg-blue-700">

                发布采购需?              </button>

              <view class="text-sm text-gray-600">

                <text class="block mb-2">发布采购需求后，系统将为您匹配优质供应商</text>

                <text class="block">审核通过后，您的需求将展示在采购大厅</text>

              </view>

            </view>

          </view>

        </view>



        <!-- 主要内容?-->

        <view class="lg-w-3-4">

          <view class="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col md-flex-row md-items-center justify-between gap-4">

              <view>

                <text class="text-2xl font-bold">采购需求大</text>

                <text class="text-gray-600 mt-1 block">

                  <text class="font-semibold text-blue-600">356</text> 条采购需                </text>

              </view>



              <view class="flex flex-col sm:flex-row gap-4 w-full md-w-auto">

                <!-- 排序选择 -->

                <view class="relative">

                  <select

                    class="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-blue-500"

                    :value="sortBy"

                    @change="setSortBy($event.target.value)"

                  >

                    <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>

                  </select>

                  <text class="absolute right-3 top-2.5 text-gray-400 pointer-events-none"></text>

                </view>



                <!-- 视图切换 -->

                <view class="flex border border-gray-300 rounded-lg overflow-hidden">

                  <button

                    @tap="setViewMode('grid')"

                    :class="`px-4 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`"

                  >

                    <text>网格</text>

                  </button>

                  <button

                    @tap="setViewMode('list')"

                    :class="`px-4 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`"

                  >

                    <text>列表</text>

                  </button>

                </view>



                <!-- 搜索按钮 -->

                <button

                  @tap="handleSearch"

                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover-bg-blue-700 font-medium"

                >

                  搜索

                </button>

              </view>

            </view>




          <!-- 采购需求列?-->

          <view :class="viewMode === 'grid' ? 'grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6' : 'space-y-6'">

            <view v-for="i in 9" :key="i" class="bg-white rounded-xl shadow-sm p-4">

              <view class="flex items-center justify-between mb-3">

                <text class="font-bold text-lg">采购{{ i }}号：优质大米</text>

                <text v-if="i % 3 === 0" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">紧</text>

              </view>

              <text class="text-gray-600 text-sm block mb-2">需求方：北京餐饮集</text>

              <text class="text-gray-600 text-sm block mb-2">采购量：{{ getQuantity(i) }}</text>

              <text class="text-gray-600 text-sm block mb-2">期望产地：黑龙江</text>

              <view class="flex justify-between items-center mt-4">

                <text class="text-blue-700 font-bold">预算：¥{{ getBudget(i) }}</text>

                <button class="text-blue-600 hover-text-blue-800">我要报价</button>

              </view>

            </view>

          </view>



          <!-- 分页 -->

          <view class="mt-8 flex justify-center">

            <view class="flex space-x-2">

              <button class="px-3 py-1 border rounded">上一</button>

              <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>

              <button class="px-3 py-1 border rounded">2</button>

              <button class="px-3 py-1 border rounded">3</button>

              <button class="px-3 py-1 border rounded">下一</button>

            </view>

          </view>



          <!-- 快速导?-->

          <view class="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">

            <text class="text-xl font-bold mb-4 block">如何高效采购</text>

            <view class="grid grid-cols-1 md-grid-cols-3 gap-4">

              <button class="bg-white p-4 rounded-lg shadow-sm hover-shadow-md transition-shadow text-left">

                <text class="text-blue-600 font-bold mb-2 block">发布采购需</text>

                <text class="text-sm text-gray-600">详细描述需求，吸引供应商报</text>

              </button>

              <button class="bg-white p-4 rounded-lg shadow-sm hover-shadow-md transition-shadow text-left">

                <text class="text-blue-600 font-bold mb-2 block">智能匹配推荐</text>

                <text class="text-sm text-gray-600">系统根据需求智能推荐供应商</text>

              </button>

              <button class="bg-white p-4 rounded-lg shadow-sm hover-shadow-md transition-shadow text-left">

                <text class="text-blue-600 font-bold mb-2 block">查看供应大厅</text>

                <text class="text-sm text-gray-600">主动寻找优质供应</text>

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

  data () {

    return {

      viewMode: 'grid',

      filters: {

        keyword: '',

        category: '',

        province: '',

        minBudget: '',

        maxBudget: '',

        urgent: false,

        longTerm: false,

      },

      sortBy: 'default',

      currentPage: 1,

      categories: [

        { id: '1', name: '水果', count: 128 },

        { id: '2', name: '蔬菜', count: 95 },

        { id: '3', name: '粮油', count: 74 },

        { id: '4', name: '水产', count: 51 },

        { id: '5', name: '畜禽', count: 68 },

        { id: '6', name: '茶叶', count: 32 },

        { id: '7', name: '中药材', count: 42 },

        { id: '8', name: '坚果', count: 29 },

      ],

      provinces: [

        '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',

        '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',

        '浙江省', '安徽省', '福建省', '江西省', '山东省',

      ],

      sortOptions: [

        { value: 'default', label: '综合排序' },

        { value: 'budget_desc', label: '预算从高到低' },

        { value: 'budget_asc', label: '预算从低到高' },

        { value: 'time', label: '最新发布' },

        { value: 'urgent', label: '紧急优先' },

      ],

    };

  },

  methods: {

    handleFilterChange (key, value) {

      this.filters[key] = value;

      this.currentPage = 1;

    },

    clearFilters () {

      this.filters = {

        keyword: '',

        category: '',

        province: '',

        minBudget: '',

        maxBudget: '',

        urgent: false,

        longTerm: false,

      };

    },

    handleSearch () {

      console.log('Search with filters:', this.filters);

      // 实际调用API

    },

    setSortBy (value) {

      this.sortBy = value;

    },

    setViewMode (mode) {

      this.viewMode = mode;

    },

    gotoCreatePurchase () {

      uni.navigateTo({

        url: '/pages/purchase/create',

      });

    },

    getQuantity (i) {

      const quantities = ['10', '20', '15', '30', '25', '12', '18', '22', '8'];

      return quantities[i - 1] || '10';

    },

    getBudget (i) {

      const budgets = ['45,000', '32,000', '28,500', '50,000', '38,000', '42,000', '29,500', '55,000', '36,000'];

      return budgets[i - 1] || '45,000';

    },

  },

};

</script>



<style>

/* 样式 */

</style>

