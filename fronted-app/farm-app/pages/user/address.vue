<template>

  <view class="address-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">收货地址</text>

        <text class="text-gray-600 block mt-2">管理您的收货地址</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <!-- 地址列表 -->

      <view v-if="addressList.length === 0" class="text-center py-16">

        <text class="text-5xl mb-4">📍</text>

        <text class="text-2xl font-bold text-gray-700 block mb-4">暂无收货地址</text>

        <text class="text-gray-600 block mb-8">添加地址，方便购物</text>

        <button @tap="gotoAddAddress" class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium">

          添加地址

        </button>

      </view>



      <view v-else class="space-y-4">

        <view

          v-for="address in addressList"

          :key="address.id"

          class="bg-white rounded-xl shadow-sm p-6"

          :class="address.isDefault ? 'border-2 border-green-500' : ''"

        >

          <view class="flex justify-between items-start mb-4">

            <view class="flex items-center">

              <text class="font-bold mr-3">{{ address.name }}</text>

              <text class="text-gray-600">{{ address.phone }}</text>

              <view v-if="address.isDefault" class="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">

                默认

              </view>

            </view>

            <view class="flex space-x-3">

              <button @tap="editAddress(address.id)" class="text-green-600 hover-text-green-700">

                编辑

              </button>

              <button @tap="deleteAddress(address.id)" class="text-red-600 hover-text-red-700">

                删除

              </button>

            </view>

          </view>



          <text class="text-gray-700 block mb-4">{{ address.fullAddress }}</text>



          <view class="flex justify-between items-center">

            <label class="flex items-center">

              <input

                type="checkbox"

                class="h-4 w-4 text-green-600 focus-ring-green-500 border-gray-300 rounded"

                :checked="address.isDefault"

                @change="setDefaultAddress(address.id)"

              />

              <text class="ml-2 text-sm text-gray-600">设为默认地址</text>

            </label>



            <button

              v-if="!address.isDefault"

              @tap="setDefaultAddress(address.id)"

              class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover-bg-green-50 text-sm"

            >

              设为默认

            </button>

          </view>

        </view>

      </view>



      <!-- 添加地址按钮 -->

      <view v-if="addressList.length > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t p-4">

        <view class="container mx-auto px-4">

          <button

            @tap="gotoAddAddress"

            class="w-full py-4 bg-green-600 text-white rounded-lg hover-bg-green-700 font-bold text-lg"

          >

            添加新地址

          </button>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data() {

    return {

      addressList: [

        {

          id: 1,

          name: '张先?,

          phone: '138****8888',

          fullAddress: '北京市朝阳区建国门外大街1号国贸大厦A?001?,

          province: '北京?,

          city: '北京?,

          district: '朝阳?,

          detail: '国贸大厦A?001?,

          isDefault: true,

        },

        {

          id: 2,

          name: '李女?,

          phone: '139****9999',

          fullAddress: '上海市浦东新区陆家嘴环路1000号上海中心大?,

          province: '上海?,

          city: '上海?,

          district: '浦东新区',

          detail: '上海中心大厦',

          isDefault: false,

        },

        {

          id: 3,

          name: '王先?,

          phone: '136****6666',

          fullAddress: '广东省深圳市南山区科技园科技中一路腾讯大?,

          province: '广东?,

          city: '深圳?,

          district: '南山?,

          detail: '腾讯大厦',

          isDefault: false,

        },

      ],

    };

  },

  computed: {

    bottomPadding() {

      return this.addressList.length > 0 ? 'pb-24' : '';

    },

  },

  methods: {

    gotoAddAddress() {

      uni.navigateTo({

        url: '/pages/user/address-edit',

      });

    },

    editAddress(id) {

      uni.navigateTo({

        url: `/pages/user/address-edit?id=${id}`,

      });

    },

    deleteAddress(id) {

      uni.showModal({

        title: '删除地址',

        content: '确定要删除这个地址吗？',

        success: (res) => {

          if (res.confirm) {

            this.addressList = this.addressList.filter(address => address.id !== id);

            uni.showToast({

              title: '删除成功',

              icon: 'success',

            });

          }

        },

      });

    },

    setDefaultAddress(id) {

      this.addressList.forEach(address => {

        address.isDefault = address.id === id;

      });

      uni.showToast({

        title: '已设为默认地址',

        icon: 'success',

      });

    },

  },

};

</script>



<style>

.address-page {

  padding-bottom: 120px; /* 给底部按钮留出空?*/

}

</style></result>

