<template>

  <view class="address-edit-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">{{ isEdit ? '编辑地址' : '新增地址' }}</text>

        <text class="text-gray-600 block mt-2">管理您的收货地址</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-md mx-auto">

        <!-- 表单 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="space-y-4">

            <!-- 收货?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">收货人</text>

              <input

                type="text"

                placeholder="请输入收货人姓名"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.name"

              />

            </view>



            <!-- 手机号?-->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">手机号</text>

              <input

                type="tel"

                placeholder="请输入手机号号"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                v-model="form.phone"

              />

            </view>



            <!-- 地区选择 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">所在地区</text>

              <view class="flex gap-2">

                <select

                  class="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  :value="form.province"

                  @change="handleProvinceChange"

                >

                  <option value="">请选择省份</option>

                  <option v-for="province in provinces" :key="province.code" :value="province.name">{{ province.name }}</option>

                </select>

                <select

                  class="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  :value="form.city"

                  :disabled="!form.province"

                  @change="form.city = $event.target.value"

                >

                  <option value="">请选择城市</option>

                  <option v-for="city in cities" :key="city.code" :value="city.name">{{ city.name }}</option>

                </select>

                <select

                  class="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  :value="form.district"

                  :disabled="!form.city"

                  @change="form.district = $event.target.value"

                >

                  <option value="">请选择区县</option>

                  <option v-for="district in districts" :key="district.code" :value="district.name">{{ district.name }}</option>

                </select>

              </view>

            </view>



            <!-- 详细地址 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">详细地址</text>

              <textarea

                placeholder="请输入详细地址，如街道、小区、门牌号?

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                rows="3"

                v-model="form.detail"

              ></textarea>

            </view>



            <!-- 标签 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1">地址标签</text>

              <view class="flex flex-wrap gap-2">

                <button

                  v-for="tag in addressTags"

                  :key="tag"

                  @tap="form.tag = tag"

                  :class="`px-4 py-2 rounded-lg ${form.tag === tag ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover-bg-gray-200'}`"

                >

                  {{ tag }}

                </button>

                <input

                  type="text"

                  placeholder="自定义标?

                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-green-500"

                  v-model="form.customTag"

                  @input="handleCustomTagInput"

                />

              </view>

            </view>



            <!-- 设为默认 -->

            <label class="flex items-center">

              <input

                type="checkbox"

                class="h-5 w-5 text-green-600 focus-ring-green-500 border-gray-300 rounded"

                v-model="form.isDefault"

              />

              <text class="ml-2 text-gray-700">设为默认收货地址</text>

            </label>

          </view>



          <!-- 保存按钮 -->

          <button

            @tap="handleSave"

            :disabled="!canSave"

            :class="`w-full py-4 mt-6 rounded-lg font-bold text-lg ${canSave ? 'bg-green-600 text-white hover-bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`"

          >

            {{ isEdit ? '保存修改' : '保存地址' }}

          </button>

        </view>



        <!-- 删除按钮（编辑模式下?-->

        <button

          v-if="isEdit"

          @tap="handleDelete"

          class="w-full py-4 bg-red-50 text-red-600 border border-red-200 rounded-xl hover-bg-red-100 font-medium"

        >

          删除此地址

        </button>



        <!-- 提示信息 -->

        <view class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">

          <text class="text-blue-800 text-sm block">

            <text class="font-bold">提示</text>

            请确保收货信息准确无误，以免影响商品配送          </text>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      isEdit: false,

      addressId: null,

      form: {

        name: '',

        phone: '',

        province: '',

        city: '',

        district: '',

        detail: '',

        tag: '家庭',

        customTag: '',

        isDefault: false,

      },

      addressTags: ['家庭', '公司', '学校', '其他'],

      provinces: [

        { code: '11', name: '北京' },

        { code: '12', name: '天津' },

        { code: '13', name: '河北' },

        { code: '14', name: '山西' },

        { code: '15', name: '内蒙古自治区' },

        { code: '21', name: '辽宁' },

        { code: '22', name: '吉林' },

        { code: '23', name: '黑龙江省' },

        { code: '31', name: '上海' },

        { code: '32', name: '江苏' },

        { code: '33', name: '浙江' },

        { code: '34', name: '安徽' },

        { code: '35', name: '福建' },

        { code: '36', name: '江西' },

        { code: '37', name: '山东' },

        { code: '41', name: '河南' },

        { code: '42', name: '湖北' },

        { code: '43', name: '湖南' },

        { code: '44', name: '广东' },

        { code: '45', name: '广西壮族自治区' },

        { code: '46', name: '海南' },

        { code: '50', name: '重庆' },

        { code: '51', name: '四川' },

        { code: '52', name: '贵州' },

        { code: '53', name: '云南' },

        { code: '54', name: '西藏自治区' },

        { code: '61', name: '陕西' },

        { code: '62', name: '甘肃' },

        { code: '63', name: '青海' },

        { code: '64', name="宁夏回族自治区" },

        { code: '65', name="新疆维吾尔自治区" },

      ],

      cities: [],

      districts: [],

      // 模拟城市数据（实际应该根据省份动态加载）

      cityData: {

        '北京': [

          { code: '1101', name: '北京' },

        ],

        '上海': [

          { code: '3101', name: '上海' },

        ],

        '广东': [

          { code: '4401', name: '广州' },

          { code: '4403', name: '深圳' },

          { code: '4404', name: '珠海' },

          { code: '4405', name: '汕头' },

          { code: '4406', name: '佛山' },

        ],

        '江苏': [

          { code: '3201', name: '南京' },

          { code: '3202', name: '无锡' },

          { code: '3203', name: '徐州' },

          { code: '3204', name: '常州' },

          { code: '3205', name: '苏州' },

        ],

        '浙江': [

          { code: '3301', name: '杭州' },

          { code: '3302', name: '宁波' },

          { code: '3303', name: '温州' },

          { code: '3304', name: '嘉兴' },

          { code: '3305', name: '湖州' },

        ],

      },

      // 模拟区县数据

      districtData: {

        '广州': [

          { code: '440103', name: '荔湾区' },

          { code: '440104', name: '越秀区' },

          { code: '440105', name: '海珠区' },

          { code: '440106', name: '天河区' },

          { code: '440111', name: '白云区' },

        ],

        '深圳': [

          { code: '440303', name: '罗湖区' },

          { code: '440304', name: '福田区' },

          { code: '440305', name: '南山区' },

          { code: '440306', name: '宝安区' },

          { code: '440307', name: '龙岗区' },

        ],

        '杭州': [

          { code: '330102', name: '上城区' },

          { code: '330103', name: '下城区' },

          { code: '330104', name: '江干区' },

          { code: '330105', name: '拱墅区' },

          { code: '330106', name: '西湖区' },

        ],

      },

    };

  },

  computed: {

    canSave() {

      return (

        this.form.name &&

        this.form.phone &&

        this.form.province &&

        this.form.city &&

        this.form.district &&

        this.form.detail

      );

    },

    finalTag() {

      return this.form.customTag || this.form.tag;

    },

  },

  onLoad(options) {

    if (options.id) {

      this.isEdit = true;

      this.addressId = options.id;

      this.loadAddress(options.id);

    } else {

      // 新增地址模式

      this.isEdit = false;

    }

  },

  methods: {

    loadAddress(id) {

      // 模拟加载地址数据

      console.log('加载地址ID:', id);

      setTimeout(() => {

        this.form = {

          name: '张先生',

          phone: '13800138000',

          province: '广东',

          city: '广州',

          district: '天河区',

          detail: '珠江新城华夏10号富力中心大厦',

          tag: '公司',

          customTag: '',

          isDefault: true,

        };

        this.handleProvinceChange();

      }, 300);

    },

    handleProvinceChange() {

      if (this.form.province) {

        this.cities = this.cityData[this.form.province] || [];

        if (this.cities.length > 0 && !this.form.city) {

          this.form.city = this.cities[0].name;

        }

        this.handleCityChange();

      } else {

        this.cities = [];

        this.districts = [];

        this.form.city = '';

        this.form.district = '';

      }

    },

    handleCityChange() {

      if (this.form.city) {

        this.districts = this.districtData[this.form.city] || [];

        if (this.districts.length > 0 && !this.form.district) {

          this.form.district = this.districts[0].name;

        }

      } else {

        this.districts = [];

        this.form.district = '';

      }

    },

    handleCustomTagInput() {

      if (this.form.customTag) {

        this.form.tag = '';

      }

    },

    handleSave() {

      if (!this.canSave) {

        return;

      }



      // 验证手机号      const phoneRegex = /^1[3-9]\d{9}$/;

      if (!phoneRegex.test(this.form.phone)) {

        uni.showToast({

          title: '请输入正确的手机号',

          icon: 'none',

        });

        return;

      }



      const addressData = {

        ...this.form,

        tag: this.finalTag,

      };



      // 模拟保存

      uni.showLoading({

        title: '保存中...',

      });



      setTimeout(() => {

        uni.hideLoading();

        uni.showToast({

          title: this.isEdit ? '地址修改成功' : '地址添加成功',

          icon: 'success',

        });



        setTimeout(() => {

          uni.navigateBack();

        }, 1500);

      }, 1000);

    },

    handleDelete() {

      uni.showModal({

        title: '删除地址',

        content: '确定要删除此收货地址吗？',

        success: (res) => {

          if (res.confirm) {

            // 模拟删除

            uni.showLoading({

              title: '删除中...',

            });



            setTimeout(() => {

              uni.hideLoading();

              uni.showToast({

                title: '地址删除成功',

                icon: 'success',

              });



              setTimeout(() => {

                uni.navigateBack();

              }, 1500);

            }, 1000);

          }

        },

      });

    },

  },

};

</script>



<style>

.address-edit-page {

  /* 基础样式 */

}

</style>

