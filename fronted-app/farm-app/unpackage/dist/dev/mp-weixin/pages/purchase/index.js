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
        minBudget: "",
        maxBudget: "",
        urgent: false,
        longTerm: false
      },
      sortBy: "default",
      currentPage: 1,
      categories: [
        { id: "1", name: "水果", count: 128 },
        { id: "2", name: "蔬菜", count: 95 },
        { id: "3", name: "粮油", count: 74 },
        { id: "4", name: "水产", count: 51 },
        { id: "5", name: "畜禽", count: 68 },
        { id: "6", name: "茶叶", count: 32 },
        { id: "7", name: "中药材", count: 42 },
        { id: "8", name: "坚果", count: 29 }
      ],
      provinces: [
        "北京市",
        "天津市",
        "河北省",
        "山西省",
        "内蒙古自治区",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "上海市",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省"
      ],
      sortOptions: [
        { value: "default", label: "综合排序" },
        { value: "budget_desc", label: "预算从高到低" },
        { value: "budget_asc", label: "预算从低到高" },
        { value: "time", label: "最新发布" },
        { value: "urgent", label: "紧急优先" }
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
        minBudget: "",
        maxBudget: "",
        urgent: false,
        longTerm: false
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
    gotoCreatePurchase() {
      common_vendor.index.navigateTo({
        url: "/pages/purchase/create"
      });
    },
    getQuantity(i) {
      const quantities = ["10", "20", "15", "30", "25", "12", "18", "22", "8"];
      return quantities[i - 1] || "10";
    },
    getBudget(i) {
      const budgets = ["45,000", "32,000", "28,500", "50,000", "38,000", "42,000", "29,500", "55,000", "36,000"];
      return budgets[i - 1] || "45,000";
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
        e: common_vendor.n(`flex justify-between items-center w-full px-3 py-2 rounded-lg text-left ${$data.filters.category === category.id ? "bg-blue-50 text-blue-700" : "hover-bg-gray-50"}`)
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
    h: common_vendor.o([($event) => $data.filters.minBudget = $event.detail.value, ($event) => $options.handleFilterChange("minBudget", $event.target.value)]),
    i: $data.filters.minBudget,
    j: common_vendor.o([($event) => $data.filters.maxBudget = $event.detail.value, ($event) => $options.handleFilterChange("maxBudget", $event.target.value)]),
    k: $data.filters.maxBudget,
    l: common_vendor.o(($event) => $options.handleFilterChange("urgent", $event.target.checked)),
    m: $data.filters.urgent,
    n: common_vendor.o(($event) => $data.filters.urgent = $event.detail.value),
    o: common_vendor.o(($event) => $options.handleFilterChange("longTerm", $event.target.checked)),
    p: $data.filters.longTerm,
    q: common_vendor.o(($event) => $data.filters.longTerm = $event.detail.value),
    r: common_vendor.o((...args) => $options.gotoCreatePurchase && $options.gotoCreatePurchase(...args)),
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
    x: common_vendor.n(`px-4 py-2 ${$data.viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white"}`),
    y: common_vendor.o(($event) => $options.setViewMode("list")),
    z: common_vendor.n(`px-4 py-2 ${$data.viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white"}`),
    A: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    B: common_vendor.f(9, (i, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(i),
        b: i % 3 === 0
      }, i % 3 === 0 ? {} : {}, {
        c: common_vendor.t($options.getQuantity(i)),
        d: common_vendor.t($options.getBudget(i)),
        e: i
      });
    }),
    C: common_vendor.n($data.viewMode === "grid" ? "grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6" : "space-y-6")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
