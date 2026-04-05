<template>

  <view class="profile-page min-h-screen bg-gray-50">

    <!-- 头部 -->

    <view class="bg-white shadow-sm py-4">

      <view class="container mx-auto px-4">

        <text class="text-3xl font-bold">个人资料</text>

        <text class="text-gray-600 block mt-2">管理您的个人信息</text>

      </view>

    </view>



    <view class="container mx-auto px-4 py-8">

      <view class="max-w-2xl mx-auto">

        <!-- 头像 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <view class="flex items-center justify-between mb-6">

            <text class="text-xl font-bold">头像</text>

            <button

              @tap="changeAvatar"

              class="text-green-600 hover-text-green-700"

            >

              更换

            </button>

          </view>

          <view class="flex items-center">

            <view

              class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"

            >

              <text v-if="!form.avatar" class="text-4xl">👤</text>

              <image v-else :src="form.avatar" class="w-24 h-24 rounded-full" />

            </view>

            <view class="ml-6">

              <text class="text-gray-600 block mb-2"

                >建议尺寸 200x200 像素</text

              >

              <text class="text-gray-600">支持 JPG、PNG 格式</text>

            </view>

          </view>

        </view>



        <!-- 基本信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-6 block">基本信息</text>

          <view class="space-y-4">

            <!-- 昵称 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >昵称</text

              >

              <input

                type="text"

                placeholder="请输入昵称"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                v-model="form.nickname"

              />

            </view>



            <!-- 手机号号 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >手机号号</text

              >

              <view class="flex items-center">

                <input

                  type="tel"

                  placeholder="请输入手机号号"

                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                  v-model="form.phone"

                  :disabled="true"

                />

                <button

                  @tap="changePhone"

                  class="ml-3 text-green-600 hover-text-green-700 whitespace-nowrap"

                >

                  更换手机号

                </button>

              </view>

            </view>



            <!-- 邮箱 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >邮箱</text

              >

              <view class="flex items-center">

                <input

                  type="email"

                  placeholder="请输入邮箱"

                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                  v-model="form.email"

                />

                <button

                  v-if="!form.emailVerified"

                  @tap="verifyEmail"

                  class="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover-bg-green-700 whitespace-nowrap"

                >

                  验证码邮箱

                </button>

                <text v-else class="ml-3 text-green-600">√ 已验证码</text>

              </view>

            </view>



            <!-- 性别 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-2"

                >性别</text

              >

              <view class="flex gap-3">

                <button

                  @tap="form.gender = 'male'"

                  :class="`px-6 py-3 rounded-lg ${

                    form.gender === 'male'

                      ? 'bg-green-600 text-white'

                      : 'bg-gray-100 text-gray-700 hover-bg-gray-200'

                  }`"

                >

                  男

                </button>

                <button

                  @tap="form.gender = 'female'"

                  :class="`px-6 py-3 rounded-lg ${

                    form.gender === 'female'

                      ? 'bg-green-600 text-white'

                      : 'bg-gray-100 text-gray-700 hover-bg-gray-200'

                  }`"

                >

                  女

                </button>

                <button

                  @tap="form.gender = 'unknown'"

                  :class="`px-6 py-3 rounded-lg ${

                    form.gender === 'unknown'

                      ? 'bg-green-600 text-white'

                      : 'bg-gray-100 text-gray-700 hover-bg-gray-200'

                  }`"

                >

                  保密码

                </button>

              </view>

            </view>



            <!-- 出生日期 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >出生日期</text

              >

              <input

                type="date"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                v-model="form.birthday"

              />

            </view>

          </view>

        </view>



        <!-- 公司信息 -->

        <view class="bg-white rounded-xl shadow-sm p-6 mb-6">

          <text class="text-xl font-bold mb-6 block">公司信息</text>

          <view class="space-y-4">

            <!-- 公司名称 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >公司名称</text

              >

              <input

                type="text"

                placeholder="请输入公司名称"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                v-model="form.companyName"

              />

            </view>



            <!-- 职位 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >职位</text

              >

              <input

                type="text"

                placeholder="请输入职位"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                v-model="form.position"

              />

            </view>



            <!-- 公司地址 -->

            <view>

              <text class="block text-sm font-medium text-gray-700 mb-1"

                >公司地址</text

              >

              <textarea

                placeholder="请输入公司地址"

                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-green-500"

                rows="3"

                v-model="form.companyAddress"

              />

            </view>

          </view>

        </view>



        <!-- 保存按钮 -->

        <view class="flex justify-end space-x-4">

          <button

            @tap="gotoBack"

            class="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50"

          >

            取消

          </button>

          <button

            @tap="saveProfile"

            class="px-8 py-3 bg-green-600 text-white rounded-lg hover-bg-green-700 font-medium"

          >

            保存修改

          </button>

        </view>

      </view>

    </view>

  </view>

</template>



<script>

export default {

  data () {

    return {

      form: {

        avatar: '',

        nickname: '张先?,

        phone: '138****8888',

        email: 'zhangsan@example.com',

        emailVerified: false,

        gender: 'male',

        birthday: '1985-06-15',

        companyName: '北京农产品贸易有限公?,

        position: '采购经理',

        companyAddress: '北京市朝阳区建国门外大街1号国贸大?,

      },

    };

  },

  methods: {

    changeAvatar () {

      uni.chooseImage({

        count: 1,

        success: (res) => {

          const tempFilePaths = res.tempFilePaths;

          this.form.avatar = tempFilePaths[0];

          uni.showToast({

            title: '头像已更?,

            icon: 'success',

          });

        },

      });

    },

    changePhone () {

      uni.navigateTo({

        url: '/pages/user/change-phone',

      });

    },

    verifyEmail () {

      uni.showModal({

        title: '验证码邮箱',

        content: `我们将发送验证码邮件到 ${this.form.email}`,

        success: (res) => {

          if (res.confirm) {

            // 发送验证码邮?            uni.showToast({

            title: '验证码邮件已发?,

            icon: 'success',

            });

      // 模拟验证码成功

      setTimeout(() => {

        this.form.emailVerified = true;

      }, 3000);

    }

  },

});

    },

saveProfile() {

  uni.showToast({

    title: '保存成功',

    icon: 'success',

  });

  setTimeout(() => {

    uni.navigateBack();

  }, 1500);

},

gotoBack() {

  uni.navigateBack();

},

  },

};

</script>



<style>

.profile-page {

  /* 基础样式 */

}

</style></result>

