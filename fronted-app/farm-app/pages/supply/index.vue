<template>

  <view class="supply-page min-h-screen bg-gray-50">

    <!-- Hero Section -->

    <view class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">

      <view class="container mx-auto px-4">

        <text class="text-4xl font-bold mb-4">供应大厅</text>

        <text class="text-lg opacity-90 max-w-3xl block">

          发现全国优质农产品供应信息，连接产地与市场，助力农产品高效流<        </text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="flex flex-col lg-flex-row gap-8">

        <!-- 筛选侧边栏 -->

        <view class="lg-w-1-4">

          <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

            <view class="flex items-center justify-between mb-6">

              <text class="text-xl font-bold">筛选条件</text>

              <button @tap="clearFilters" class="text-sm text-green-600 active-text-green-700">

                清除所有

              </button>

            </view>



            <!-- 搜索<-->

            <view class="mb-6">

              <view class="relative">

                <input

                  type="text"

                  placeholder="搜索商品、供应商..."

                  class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg"

                  v-model="filters.keyword"

                />

                <!-- 搜索图标，使用uni-icons或图<-->

                <text class="absolute left-4 top-3.5 text-gray-400">🔍</text>

              </view>

            </view>



            <!-- 分类筛<-->

            <view class="mb-6">

              <text class="font-semibold mb-3 flex items-center">

                <text class="mr-2">📂</text>

                商品分类

              </text>

              <view class="space-y-2">

                <button

                  v-for="category in categories"

                  :key="category.id"

                  @tap="handleFilterChange('category', category.id)"

                  :class="`flex justify-between items-center w-full px-3 py-2 rounded-lg text-left ${filters.category === category.id ? 'bg-green-50 text-green-700' : 'active-bg-gray-50'}`"

                >

                  <text>{{ category.name }}</text>

                  <text class="text-sm text-gray-500">{{ category.count }}</text>

                </button>

              </view>

            </view>



            <!-- 地区筛<-->

            <view class="mb-6">

              <text class="font-semibold mb-3 flex items-center">

                <text class="mr-2">📍</text>

                地区

              </text>

              <select

                class="w-full px-3 py-2 border border-gray-300 rounded-lg"

                :value="filters.province"

                @change="handleFilterChange('province', $event.target.value)"

              >

                <option value="">全部地区</option>

                <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>

              </select>

            </view>



            <!-- 价格筛<-->

            <view class="mb-6">

              <text class="font-semibold mb-3">价格区间</text>

              <view class="flex gap-2">

                <input

                  type="number"

                  placeholder="最低价"

                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg"

                  v-model="filters.minPrice"

                  @input="handleFilterChange('minPrice', $event.target.value)"

                />

                <text class="self-center">-</text>

                <input

                  type="number"

                  placeholder="最高价"

                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg"

                  v-model="filters.maxPrice"

                  @input="handleFilterChange('maxPrice', $event.target.value)"

                />

              </view>

            </view>



            <!-- 其他筛<-->

            <view class="space-y-3">

              <label class="flex items-center">

                <input

                  type="checkbox"

                  class="h-4 w-4 text-green-600 border-gray-300 rounded"

                  v-model="filters.inStock"

                  @change="handleFilterChange('inStock', $event.target.checked)"

                />

                <text class="ml-2">仅显示有</text>

              </label>

              <label class="flex items-center">

                <input

                  type="checkbox"

                  class="h-4 w-4 text-green-600 border-gray-300 rounded"

                  v-model="filters.freeShipping"

                  @change="handleFilterChange('freeShipping', $event.target.checked)"

                />

                <text class="ml-2">仅显示包</text>

              </label>

            </view>

          </view>



          <!-- 特色供应<-->

          <view class="bg-white rounded-xl shadow-sm p-6">

            <text class="font-bold mb-4 block">优质供应</text>

            <view class="space-y-4">

              <view v-for="i in 3" :key="i" class="flex items-center p-3 border rounded-lg active:bg-gray-50">

                <view class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">

                  <text class="text-green-600 font-bold"></text>

                </view>

                <view>

                  <text class="font-medium">山东果蔬合作</text>

                  <view class="text-sm text-gray-500 flex items-center">

                    <text class="mr-1"></text>

                    4.9 · 98%好评

                  </view>

                </view>

              </view>

            </view>

          </view>

        </view>



        <!-- 主内容区 -->

        <view class="lg-w-3-4">

          <!-- 工具<-->

          <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

            <view class="flex flex-col md-flex-row justify-between items-start md-items-center gap-4">

              <view>

                <text class="text-2xl font-bold">农产品供</text>

                <text class="text-gray-600 mt-1 block">

                  <<text class="font-semibold text-green-600">1,284</text> 条供应信 </text>

              </view>



              <view class="flex flex-col sm:flex-row gap-4 w-full md-w-auto">

                <!-- 排序选择 -->

                <view class="relative">

                  <select

                    class="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg"

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

                    :class="`px-4 py-2 ${viewMode === 'grid' ? 'bg-green-50 text-green-600' : 'bg-white'}`"

                  >

                    <text>网格</text>

                  </button>

                  <button

                    @tap="setViewMode('list')"

                    :class="`px-4 py-2 ${viewMode === 'list' ? 'bg-green-50 text-green-600' : 'bg-white'}`"

                  >

                    <text>列表</text>

                  </button>

                </view>



                <!-- 搜索按钮 -->

                <button

                  @tap="handleSearch"

                  class="px-6 py-2 bg-green-600 text-white rounded-lg active:bg-green-700 font-medium"

                >

                  搜索

                </button>

              </view>

            </view>

          </view>



          <!-- 商品列表 -->

          <view :class="viewMode === 'grid' ? 'grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6' : 'space-y-6'">

            <view v-for="i in 9" :key="i" class="bg-white rounded-xl shadow-sm p-4">

              <view class="h-48 bg-gray-200 rounded-lg mb-4"></view>

              <text class="font-bold text-lg block mb-2">优质大米 {{ i }}</text>

              <text class="text-gray-600 text-sm block mb-2">产地：黑龙江五常</text>

              <view class="flex justify-between items-center">

                <text class="text-green-700 font-bold">¥{{ getPrice(i) }}/</text>

                <button class="text-green-600 active:text-green-800">查看详情</button>

              </view>

            </view>

          </view>



          <!-- 分页 -->

          <view class="mt-8 flex justify-center">

            <view class="flex space-x-2">

              <button class="px-3 py-1 border rounded">上一</button>

              <button class="px-3 py-1 bg-green-600 text-white rounded">1</button>

              <button class="px-3 py-1 border rounded">2</button>

              <button class="px-3 py-1 border rounded">3</button>

              <button class="px-3 py-1 border rounded">下一</button>

            </view>

          </view>



          <!-- 快速导<-->

          <view class="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">

            <text class="text-xl font-bold mb-4 block">找不到想要的</text>

            <view class="grid grid-cols-1 md-grid-cols-3 gap-4">

              <button class="bg-white p-4 rounded-lg shadow-sm hover-shadow-md transition-shadow text-left">

                <text class="text-green-600 font-bold mb-2 block">发布采购需</text>

                <text class="text-sm text-gray-600">让供应商主动联系</text>

              </button>

              <button class="bg-white p-4 rounded-lg shadow-sm hover-shadow-md transition-shadow text-left">

                <text class="text-green-600 font-bold mb-2 block">联系客服推荐</text>

                <text class="text-sm text-gray-600">专业客服帮您匹配</text>

              </button>

              <button class="bg-white p-4 rounded-lg shadow-sm hover-shadow-md transition-shadow text-left">

                <text class="text-green-600 font-bold mb-2 block">查看热门品类</text>

                <text class="text-sm text-gray-600">发现更多商机</text>

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

        minPrice: '',

        maxPrice: '',

        inStock: false,

        freeShipping: false,

      },

      sortBy: 'default',

      currentPage: 1,

      categories: [

        { id: '1', name: '水果', count: 1284 },

        { id: '2', name: '蔬菜', count: 956 },

        { id: '3', name: '粮油', count: 743 },

        { id: '4', name: '水产', count: 512 },

        { id: '5', name: '畜禽', count: 689 },

        { id: '6', name: '茶叶', count: 327 },

        { id: '7', name: '中药', count: 421 },

        { id: '8', name: '坚果', count: 298 },

      ],

      provinces: [

        '北京', '天津', '河北', '山西', '内蒙古自治区',

        '辽宁', '吉林', '黑龙江省', '上海', '江苏',

        '浙江', '安徽', '福建', '江西', '山东',

      ],

      sortOptions: [

        { value: 'default', label: '综合排序' },

        { value: 'price_asc', label: '价格从低到高' },

        { value: 'price_desc', label: '价格从高到低' },

        { value: 'sales', label: '销量优' },

        { value: 'time', label: '最新发' },

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

        minPrice: '',

        maxPrice: '',

        inStock: false,

        freeShipping: false,

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

    getPrice (i) {

      const prices = ['4,800', '5,200', '4,500', '5,000', '4,900', '5,100', '4,700', '5,300', '4,600'];

      return prices[i - 1] || '4,800';

    },

  },

};

</script>



<style>

/* 引入Tailwind类似的工具类，但uni-app不支持Tailwind，这里使用内联样式或全局样式 */

/* 实际项目中需要配置uni-app支持Tailwind或使用类似样<*/

.supply-page {

  /* 基础样式 */

}

</style>

