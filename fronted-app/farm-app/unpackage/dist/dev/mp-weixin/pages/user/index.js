"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      user: {
        avatar: "",
        nickname: "张先生",
        userName: "zhangsan",
        roles: [
          { role: "SUPPLIER", status: "APPROVED" },
          { role: "PURCHASER", status: "APPROVED" }
        ]
      },
      activeRole: "SUPPLIER",
      isAuthenticated: true,
      menuItems: [
        {
          id: "profile",
          label: "个人资料",
          icon: "👤",
          bgColor: "bg-blue-100",
          page: "/pages/user/profile"
        },
        {
          id: "orders",
          label: "我的订单",
          icon: "📋",
          bgColor: "bg-green-100",
          page: "/pages/order/list"
        },
        {
          id: "favorites",
          label: "我的收藏",
          icon: "❤️",
          bgColor: "bg-red-100",
          page: "/pages/user/favorites"
        },
        {
          id: "address",
          label: "收货地址",
          icon: "📍",
          bgColor: "bg-yellow-100",
          page: "/pages/user/address"
        },
        {
          id: "security",
          label: "账户安全",
          icon: "🔒",
          bgColor: "bg-gray-100",
          page: "/pages/user/security"
        },
        {
          id: "settings",
          label: "设置",
          icon: "⚙️",
          bgColor: "bg-purple-100",
          page: "/pages/user/settings"
        }
      ],
      roleLabels: {
        SUPPLIER: "供应商",
        PURCHASER: "采购商",
        REGULAR: "普通用户"
      }
    };
  },
  computed: {
    approvedRoles() {
      return this.user.roles.filter((role) => role.status === "APPROVED").map((role) => role.role);
    },
    userRoleLabel() {
      return this.roleLabels[this.activeRole] || "普通用户";
    }
  },
  methods: {
    handleMenuClick(item) {
      if (item.page) {
        common_vendor.index.navigateTo({
          url: item.page
        });
      }
    },
    gotoLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/auth/login"
      });
    },
    gotoRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/auth/register"
      });
    },
    gotoOrders() {
      common_vendor.index.navigateTo({
        url: "/pages/order/list"
      });
    },
    gotoOrderStatus(status) {
      common_vendor.index.navigateTo({
        url: `/pages/order/list?status=${status}`
      });
    },
    handleLogout() {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            this.isAuthenticated = false;
            this.user = {};
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }, 1500);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.user.avatar
  }, !$data.user.avatar ? {} : {
    b: $data.user.avatar
  }, {
    c: common_vendor.t($data.user.nickname || $data.user.userName || "请登录"),
    d: common_vendor.t($options.userRoleLabel),
    e: $data.isAuthenticated
  }, $data.isAuthenticated ? {} : {}, {
    f: !$data.isAuthenticated
  }, !$data.isAuthenticated ? {
    g: common_vendor.o((...args) => $options.gotoLogin && $options.gotoLogin(...args)),
    h: common_vendor.o((...args) => $options.gotoRegister && $options.gotoRegister(...args))
  } : common_vendor.e({
    i: common_vendor.o((...args) => $options.gotoOrders && $options.gotoOrders(...args)),
    j: common_vendor.o(($event) => $options.gotoOrderStatus("pending_payment")),
    k: common_vendor.o(($event) => $options.gotoOrderStatus("pending_shipment")),
    l: common_vendor.o(($event) => $options.gotoOrderStatus("shipped")),
    m: common_vendor.o(($event) => $options.gotoOrderStatus("completed")),
    n: common_vendor.f($data.menuItems, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.n(`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center`),
        c: common_vendor.t(item.label),
        d: item.id,
        e: common_vendor.o(($event) => $options.handleMenuClick(item), item.id)
      };
    }),
    o: $options.approvedRoles.length > 0
  }, $options.approvedRoles.length > 0 ? {
    p: common_vendor.f($options.approvedRoles, (role, k0, i0) => {
      return {
        a: common_vendor.t($data.roleLabels[role]),
        b: role,
        c: common_vendor.n(`px-4 py-2 rounded-lg font-medium ${$data.activeRole === role ? "bg-green-600 text-white" : "bg-white text-gray-700 border"}`)
      };
    })
  } : {}, {
    q: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args))
  }));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
