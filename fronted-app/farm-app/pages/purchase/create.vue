<template>

  <view class="create-purchase-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">发布采购需求</text>

        <text class="text-gray-600 block mt-2">填写采购信息，吸引优质供应商</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-2xl mx-auto">

        <!-- 表单 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="space-y-6">

            <!-- 采购品类 -->

            <view>

              <text class="block text-lg font-semibold text-gray-700 mb-2">采购品类</text>

              <view class="grid grid-cols-2 md-grid-cols-4 gap-3">

                <button

                  v-for="category in categories"

                  :key="category.id"

                  @tap="form.category = category.id"

                  :class="`px-4 py-3 rounded-lg border ${form.category === category.id ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover-bg-gray-50'}`"

                >

                  <text class="text-2xl mb-1 block">{{ category.icon }}</text>

                  <text class="text-sm">{{ category.name }}</text>

                </button>

              </view>

            </view>



            <!-- 商品名称 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">商品名称</text>

              <input

                type="text"

                placeholder="例如：优质五常大米"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.name"

              />

            </view>



            <!-- 采购数量 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">采购数量</text>

              <view class="flex items-center gap-2">

                <input

                  type="number"

                  placeholder="0"

                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  v-model="form.quantity"

                />

                <select

                  class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  :value="form.unit"

                  @change="form.unit = $event.target.value"

                >

                  <option value="吨">吨</option>

                  <option value="公斤">公斤</option>

                  <option value="箱">箱</option>

                  <option value="袋">袋</option>

                  <option value="件">件</option>

                </select>

              </view>

            </view>



            <!-- 预算范围 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">预算范围（元）</text>

              <view class="flex items-center gap-2">

                <input

                  type="number"

                  placeholder="最低预算"

                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  v-model="form.minBudget"

                />

                <text class="text-gray-500">-</text>

                <input

                  type="number"

                  placeholder="最高预算"

                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  v-model="form.maxBudget"

                />

              </view>

            </view>



            <!-- 期望产地 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">期望产地</text>

              <select

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                :value="form.origin"

                @change="form.origin = $event.target.value"

              >

                <option value="">不限产地</option>

                <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>

              </select>

            </view>



            <!-- 详细描述 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">详细描述</text>

              <textarea

                placeholder="请详细描述您的采购需求，包括规格要求、质量要求、交货时间等"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                rows="5"

                v-model="form.description"

              />

            </view>



            <!-- 紧急程度-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-2">紧急程度</text>

              <view class="flex gap-3">

                <button

                  @tap="form.urgency = 'normal'"

                  :class="`px-6 py-3 rounded-lg ${form.urgency === 'normal' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover-bg-gray-200'}`"

                >

                  普通                </button>

                <button

                  @tap="form.urgency = 'urgent'"

                  :class="`px-6 py-3 rounded-lg ${form.urgency === 'urgent' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover-bg-gray-200'}`"

                >

                  紧急                </button>

                <button

                  @tap="form.urgency = 'very_urgent'"

                  :class="`px-6 py-3 rounded-lg ${form.urgency === 'very_urgent' ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover-bg-gray-200'}`"

                >

                  非常紧急                </button>

              </view>

            </view>



            <!-- 采购类型 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-2">采购类型</text>

              <view class="flex gap-3">

                <label class="flex items-center">

                  <input

                    type="radio"

                    name="purchaseType"

                    value="one_time"

                    :checked="form.purchaseType === 'one_time'" @change="form.purchaseType = 'one_time'"

                    class="h-4 w-4 text-green-600 focus-ring-green-500 border-gray-300"

                  />

                  <text class="ml-2">一次性采购</text>

                </label>

                <label class="flex items-center">

                  <input

                    type="radio"

                    name="purchaseType"

                    value="long_term"

                    :checked="form.purchaseType === 'long_term'" @change="form.purchaseType = 'long_term'"

                    class="h-4 w-4 text-green-600 focus-ring-green-500 border-gray-300"

                  />

                  <text class="ml-2">长期采购</text>

                </label>

              </view>

            </view>



            <!-- 联系方式 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">联系方式</text>

              <input

                type="tel"

                placeholder="请输入手机号号"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.contactPhone"

              />

              <text class="text-sm text-gray-500 mt-1 block">供应商将通过此联系方式与您联系</text>

            </view>



            <!-- 公开/私密码 -->

            <view>

              <label class="flex items-center">

                <input

                  type="checkbox"

                  class="h-4 w-4 text-green-600 focus-ring-green-500 border-gray-300 rounded"

                  v-model="form.isPublic"

                />

                <text class="ml-2">公开采购需求（所有供应商可见）</text>

              </label>

              <text class="text-sm text-gray-500 mt-1 block">若设为私密需求，仅平台推荐的优质供应商可见</text>

            </view>

          </view>

        </view>



        <!-- 操作按钮 -->

        <view class="flex justify-end space-x-4">

          <button @tap="goBack" class="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50">

            取消

          </button>

          <button

            @tap="submitPurchase"

            class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium"

          >

            发布采购需求          </button>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      form: {

        category: '',

        name: '',

        quantity: '',

        unit: '吨',

        minBudget: '',

        maxBudget: '',

        origin: '',

        description: '',

        urgency: 'normal',

        purchaseType: 'one_time',

        contactPhone: '',

        isPublic: true,

      },

      categories: [

        { id: '1', name: '水果', icon: '🍎' },

        { id: '2', name: '蔬菜', icon: '🥦' },

        { id: '3', name: '粮油', icon: '🌾' },

        { id: '4', name: '水产', icon: '🐟' },

        { id: '5', name: '畜禽', icon: '🐔' },

        { id: '6', name: '茶叶', icon: '🍵' },

        { id: '7', name: '中药', icon: '🌿' },

        { id: '8', name: '坚果', icon: '🥜' },

      ],

      provinces: [

        '北京', '天津', '河北', '山西', '内蒙古自治区',

        '辽宁', '吉林', '黑龙江省', '上海', '江苏',

        '浙江', '安徽', '福建', '江西', '山东',

        '河南', '湖北', '湖南', '广东', '广西壮族自治区',

        '海南', '重庆', '四川', '贵州', '云南',

        '西藏自治区', '陕西', '甘肃', '青海', '宁夏回族自治区',

        '新疆维吾尔自治区', '台湾', '香港特别行政区', '澳门特别行政区',

      ],

    };

  },

  methods: {

    submitPurchase() {

      // 简单验证      if (!this.form.category) {

        uni.showToast({

          title: '请选择采购品类',

          icon: 'none',

        });

        return;

      },

      if (!this.form.name) {

        uni.showToast({

          title: '请输入商品名称',

          icon: 'none',

        });

        return;

      },

      if (!this.form.quantity) {

        uni.showToast({

          title: '请输入采购数量',

          icon: 'none',

        });

        return;

      },


      uni.showModal({

        title: '确认发布',

        content: '确认发布采购需求吗？',

        success: (res) => {

          if (res.confirm) {

            uni.showToast({

              title: '发布成功',

              icon: 'success',

            });

            // 模拟发布成功，跳转到采购列表

            setTimeout(() => {

              uni.switchTab({

                url: '/pages/purchase/index',

              });

            }, 1500);

          }

        },

      });

    },

    goBack() {

      uni.navigateBack();

    },

  },

};

</script>



<style>

.create-purchase-page {

  /* 基础样式 */

}

</style>

