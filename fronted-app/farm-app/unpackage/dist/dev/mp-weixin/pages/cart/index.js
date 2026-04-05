"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: "优质大米",
          spec: "10吨/批 · 五常大米",
          supplier: "黑龙江五常粮油有限公司",
          price: "4,800",
          quantity: 1,
          selected: true
        },
        {
          id: 2,
          name: "新鲜苹果",
          spec: "5吨/批 · 红富士",
          supplier: "山东果蔬合作社",
          price: "3,200",
          quantity: 2,
          selected: true
        },
        {
          id: 3,
          name: "有机蔬菜",
          spec: "2吨/批 · 混合装",
          supplier: "北京有机农场",
          price: "2,500",
          quantity: 1,
          selected: false
        }
      ],
      coupons: [
        {
          id: 1,
          name: "新用户优惠券",
          description: "满 ¥3000 减 ¥200"
        },
        {
          id: 2,
          name: "节日大促",
          description: "全场通用 ¥100"
        }
      ],
      shippingFee: "200",
      discount: "0"
    };
  },
  computed: {
    selectedCount() {
      return this.cartItems.filter((item) => item.selected).length;
    },
    selectAll: {
      get() {
        return this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
      },
      set(value) {
        this.cartItems.forEach((item) => {
          item.selected = value;
        });
      }
    },
    totalPrice() {
      let total = 0;
      this.cartItems.forEach((item) => {
        if (item.selected) {
          const price = parseFloat(item.price.replace(",", ""));
          total += price * item.quantity;
        }
      });
      return total.toLocaleString();
    },
    total() {
      const price = parseFloat(this.totalPrice.replace(",", "") || 0);
      const shipping = parseFloat(this.shippingFee.replace(",", "") || 0);
      const discount = parseFloat(this.discount.replace(",", "") || 0);
      return (price + shipping - discount).toLocaleString();
    }
  },
  methods: {
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
    },
    updateSelected() {
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
    useCoupon(coupon) {
      this.discount = coupon.name.includes("200") ? "200" : "100";
      common_vendor.index.showToast({
        title: `已使用${coupon.name}`,
        icon: "success"
      });
    },
    gotoSupply() {
      common_vendor.index.switchTab({
        url: "/pages/supply/index"
      });
    },
    gotoCheckout() {
      if (this.selectedCount === 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/order/confirm"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.cartItems.length === 0
  }, $data.cartItems.length === 0 ? {
    b: common_vendor.o((...args) => $options.gotoSupply && $options.gotoSupply(...args))
  } : {
    c: $options.selectAll,
    d: common_vendor.o(($event) => $options.selectAll = $event.target.checked),
    e: common_vendor.t($options.selectedCount),
    f: common_vendor.t($data.cartItems.length),
    g: common_vendor.f($data.cartItems, (item, k0, i0) => {
      return {
        a: item.selected,
        b: common_vendor.o(($event) => item.selected = $event.target.checked, item.id),
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.spec),
        e: common_vendor.t(item.supplier),
        f: common_vendor.o(($event) => $options.removeItem(item.id), item.id),
        g: common_vendor.t(item.price),
        h: common_vendor.o(($event) => $options.decreaseQuantity(item), item.id),
        i: item.quantity <= 1,
        j: common_vendor.t(item.quantity),
        k: common_vendor.o(($event) => $options.increaseQuantity(item), item.id),
        l: item.id
      };
    }),
    h: common_vendor.t($options.totalPrice),
    i: common_vendor.t($data.shippingFee),
    j: common_vendor.t($data.discount),
    k: common_vendor.t($options.total),
    l: common_vendor.t($options.selectedCount),
    m: common_vendor.o((...args) => $options.gotoCheckout && $options.gotoCheckout(...args)),
    n: $options.selectedCount === 0,
    o: common_vendor.n($options.selectedCount === 0 ? "opacity-50 cursor-not-allowed" : ""),
    p: common_vendor.f($data.coupons, (coupon, k0, i0) => {
      return {
        a: common_vendor.t(coupon.name),
        b: common_vendor.t(coupon.description),
        c: common_vendor.o(($event) => $options.useCoupon(coupon), coupon.id),
        d: coupon.id
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
