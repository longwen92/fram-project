"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      banners: [
        { id: 1, title: "新鲜农产品直供", description: "源头直采，品质保证", bgColor: "#10B981" },
        { id: 2, title: "全国冷链配送", description: "新鲜直达，全程可溯", bgColor: "#059669" },
        { id: 3, title: "千万供应商入驻", description: "海量资源，高效匹配", bgColor: "#047857" }
      ],
      quickEntries: [
        { id: 1, label: "供应大厅", icon: "📦", bgColor: "bg-green-100", path: "/pages/supply/index" },
        { id: 2, label: "采购需求", icon: "📝", bgColor: "bg-blue-100", path: "/pages/purchase/index" },
        { id: 3, label: "我的订单", icon: "📋", bgColor: "bg-yellow-100", path: "/pages/order/list" },
        { id: 4, label: "购物车", icon: "🛒", bgColor: "bg-purple-100", path: "/pages/cart/index" },
        { id: 5, label: "收藏夹", icon: "❤️", bgColor: "bg-red-100", path: "/pages/user/favorites" },
        { id: 6, label: "地址管理", icon: "📍", bgColor: "bg-indigo-100", path: "/pages/user/address" },
        { id: 7, label: "客服中心", icon: "💬", bgColor: "bg-pink-100", path: "/pages/user/settings" },
        { id: 8, label: "安全中心", icon: "🔒", bgColor: "bg-gray-100", path: "/pages/user/security" }
      ],
      categories: [
        { id: 1, name: "水果", icon: "🍎", count: "1,284" },
        { id: 2, name: "蔬菜", icon: "🥦", count: "956" },
        { id: 3, name: "粮油", icon: "🌾", count: "743" },
        { id: 4, name: "水产", icon: "🐟", count: "512" },
        { id: 5, name: "畜禽", icon: "🐔", count: "689" },
        { id: 6, name: "茶叶", icon: "🍵", count: "327" },
        { id: 7, name: "中药材", icon: "🌿", count: "421" },
        { id: 8, name: "坚果", icon: "🥜", count: "298" }
      ],
      featuredProducts: [
        { id: 1, name: "优质五常大米", location: "黑龙江五常", spec: "10吨/批 · 一级", price: "¥4,800/吨" },
        { id: 2, name: "山东红富士苹果", location: "山东烟台", spec: "5吨/批 · 特级", price: "¥3,200/吨" },
        { id: 3, name: "内蒙古牛羊肉", location: "内蒙古", spec: "2吨/批 · 新鲜", price: "¥28,000/吨" }
      ]
    };
  },
  methods: {
    handleSearch() {
      if (this.searchKeyword.trim()) {
        common_vendor.index.navigateTo({
          url: `/pages/supply/index?keyword=${encodeURIComponent(this.searchKeyword)}`
        });
      } else {
        common_vendor.index.showToast({
          title: "请输入搜索关键词",
          icon: "none"
        });
      }
    },
    handleQuickEntry(entry) {
      if (entry.path) {
        if (entry.path.startsWith("/pages/") && entry.path.includes("/index")) {
          common_vendor.index.switchTab({ url: entry.path });
        } else {
          common_vendor.index.navigateTo({ url: entry.path });
        }
      }
    },
    gotoUser() {
      common_vendor.index.switchTab({
        url: "/pages/user/index"
      });
    },
    gotoSupply() {
      common_vendor.index.switchTab({
        url: "/pages/supply/index"
      });
    },
    gotoPurchase() {
      common_vendor.index.switchTab({
        url: "/pages/purchase/index"
      });
    },
    gotoRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/auth/register"
      });
    },
    viewProduct(id) {
      common_vendor.index.navigateTo({
        url: `/pages/supply/detail?id=${id}`
      });
    }
  },
  onLoad() {
    console.log("首页加载");
  },
  onShow() {
  },
  onPullDownRefresh() {
    console.log("下拉刷新");
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
      common_vendor.index.showToast({
        title: "刷新成功",
        icon: "success"
      });
    }, 1e3);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    b: $data.searchKeyword,
    c: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    d: common_vendor.o((...args) => $options.gotoUser && $options.gotoUser(...args)),
    e: common_vendor.f($data.banners, (banner, index, i0) => {
      return {
        a: common_vendor.t(banner.title),
        b: common_vendor.t(banner.description),
        c: banner.bgColor,
        d: index
      };
    }),
    f: common_vendor.f($data.quickEntries, (entry, k0, i0) => {
      return {
        a: common_vendor.t(entry.icon),
        b: common_vendor.n(`w-16 h-16 ${entry.bgColor} rounded-2xl flex items-center justify-center mb-3`),
        c: common_vendor.t(entry.label),
        d: entry.id,
        e: common_vendor.o(($event) => $options.handleQuickEntry(entry), entry.id)
      };
    }),
    g: common_vendor.o((...args) => $options.gotoSupply && $options.gotoSupply(...args)),
    h: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.icon),
        b: common_vendor.t(category.name),
        c: common_vendor.t(category.count),
        d: category.id
      };
    }),
    i: common_vendor.o((...args) => $options.gotoSupply && $options.gotoSupply(...args)),
    j: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.icon),
        b: common_vendor.t(category.name),
        c: common_vendor.t(category.count),
        d: category.id
      };
    }),
    k: common_vendor.o((...args) => $options.gotoSupply && $options.gotoSupply(...args)),
    l: common_vendor.f($data.featuredProducts, (product, k0, i0) => {
      return {
        a: common_vendor.t(product.name),
        b: common_vendor.t(product.location),
        c: common_vendor.t(product.spec),
        d: common_vendor.t(product.price),
        e: common_vendor.o(($event) => $options.viewProduct(product.id), product.id),
        f: product.id
      };
    }),
    m: common_vendor.o((...args) => $options.gotoRegister && $options.gotoRegister(...args)),
    n: common_vendor.o((...args) => $options.gotoSupply && $options.gotoSupply(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
