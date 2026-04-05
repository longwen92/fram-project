"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      viewMode: "grid",
      filters: {
        keyword: "",
        category: "",
        province: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        freeShipping: false
      },
      sortBy: "default",
      currentPage: 1,
      categories: [
        { id: "1", name: "水果", count: 1284 },
        { id: "2", name: "蔬菜", count: 956 },
        { id: "3", name: "粮油", count: 743 },
        { id: "4", name: "水产", count: 512 },
        { id: "5", name: "畜禽", count: 689 },
        { id: "6", name: "茶叶", count: 327 },
        { id: "7", name: "中药", count: 421 },
        { id: "8", name: "坚果", count: 298 }
      ],
      provinces: [
        "北京",
        "天津",
        "河北",
        "山西",
        "内蒙古自治区",
        "辽宁",
        "吉林",
        "黑龙江省",
        "上海",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东"
      ],
      sortOptions: [
        { value: "default", label: "综合排序" },
        { value: "price_asc", label: "价格从低到高" },
        { value: "price_desc", label: "价格从高到低" },
        { value: "sales", label: "销量优" },
        { value: "time", label: "最新发" }
      ]
    };
  },
  methods: {
    handleFilterChange(key, value) {
      this.filters[key] = value;
      this.currentPage = 1;
    },
    clearFilters() {
      this.filters = {
        keyword: "",
        category: "",
        province: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        freeShipping: false
      };
    },
    handleSearch() {
      console.log("Search with filters:", this.filters);
    },
    setSortBy(value) {
      this.sortBy = value;
    },
    setViewMode(mode) {
      this.viewMode = mode;
    },
    getPrice(i) {
      const prices = ["4,800", "5,200", "4,500", "5,000", "4,900", "5,100", "4,700", "5,300", "4,600"];
      return prices[i - 1] || "4,800";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.clearFilters && $options.clearFilters(...args)),
    b: $data.filters.keyword,
    c: common_vendor.o(($event) => $data.filters.keyword = $event.detail.value),
    d: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: common_vendor.t(category.count),
        c: category.id,
        d: common_vendor.o(($event) => $options.handleFilterChange("category", category.id), category.id),
        e: common_vendor.n(`flex justify-between items-center w-full px-3 py-2 rounded-lg text-left ${$data.filters.category === category.id ? "bg-green-50 text-green-700" : "active-bg-gray-50"}`)
      };
    }),
    e: common_vendor.f($data.provinces, (province, k0, i0) => {
      return {
        a: common_vendor.t(province),
        b: province,
        c: province
      };
    }),
    f: $data.filters.province,
    g: common_vendor.o(($event) => $options.handleFilterChange("province", $event.target.value)),
    h: common_vendor.o([($event) => $data.filters.minPrice = $event.detail.value, ($event) => $options.handleFilterChange("minPrice", $event.target.value)]),
    i: $data.filters.minPrice,
    j: common_vendor.o([($event) => $data.filters.maxPrice = $event.detail.value, ($event) => $options.handleFilterChange("maxPrice", $event.target.value)]),
    k: $data.filters.maxPrice,
    l: common_vendor.o(($event) => $options.handleFilterChange("inStock", $event.target.checked)),
    m: $data.filters.inStock,
    n: common_vendor.o(($event) => $data.filters.inStock = $event.detail.value),
    o: common_vendor.o(($event) => $options.handleFilterChange("freeShipping", $event.target.checked)),
    p: $data.filters.freeShipping,
    q: common_vendor.o(($event) => $data.filters.freeShipping = $event.detail.value),
    r: common_vendor.f(3, (i, k0, i0) => {
      return {
        a: i
      };
    }),
    s: common_vendor.f($data.sortOptions, (option, k0, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: option.value,
        c: option.value
      };
    }),
    t: $data.sortBy,
    v: common_vendor.o(($event) => $options.setSortBy($event.target.value)),
    w: common_vendor.o(($event) => $options.setViewMode("grid")),
    x: common_vendor.n(`px-4 py-2 ${$data.viewMode === "grid" ? "bg-green-50 text-green-600" : "bg-white"}`),
    y: common_vendor.o(($event) => $options.setViewMode("list")),
    z: common_vendor.n(`px-4 py-2 ${$data.viewMode === "list" ? "bg-green-50 text-green-600" : "bg-white"}`),
    A: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    B: common_vendor.f(9, (i, k0, i0) => {
      return {
        a: common_vendor.t(i),
        b: common_vendor.t($options.getPrice(i)),
        c: i
      };
    }),
    C: common_vendor.n($data.viewMode === "grid" ? "grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6" : "space-y-6")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
