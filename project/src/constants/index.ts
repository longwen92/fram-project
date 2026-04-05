// ==================== 应用常量 ====================

export const APP_CONFIG = {
  title: '惠农网',
  description: '农产品B2B电商平台',
  version: '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  cdnUrl: import.meta.env.VITE_CDN_URL || '',
} as const;

// ==================== 会员等级常量 ====================

export const MEMBER_LEVELS = {
  1: { name: '注册会员', color: '#8C8C8C', icon: 'user' },
  2: { name: '认证会员', color: '#1890FF', icon: 'badge-check' },
  3: { name: '优选会员', color: '#FFC107', icon: 'star' },
  4: { name: '战略会员', color: '#F5222D', icon: 'crown' },
} as const;

export const MEMBER_LEVEL_OPTIONS = [
  { label: '注册会员', value: 1 },
  { label: '认证会员', value: 2 },
  { label: '优选会员', value: 3 },
  { label: '战略会员', value: 4 },
];

// ==================== 订单状态常量 ====================

export const ORDER_STATUS = {
  PENDING_PAYMENT: { label: '待付款', value: 'PENDING_PAYMENT', color: '#FA8C16', icon: 'clock' },
  PENDING_SHIPMENT: { label: '待发货', value: 'PENDING_SHIPMENT', color: '#1890FF', icon: 'package' },
  PENDING_RECEIPT: { label: '待收货', value: 'PENDING_RECEIPT', color: '#1890FF', icon: 'truck' },
  COMPLETED: { label: '已完成', value: 'COMPLETED', color: '#52C41A', icon: 'check-circle' },
  CANCELLED: { label: '已取消', value: 'CANCELLED', color: '#8C8C8C', icon: 'x-circle' },
  REFUNDING: { label: '退款中', value: 'REFUNDING', color: '#722ED1', icon: 'refresh-cw' },
  REFUNDED: { label: '退款完成', value: 'REFUNDED', color: '#8C8C8C', icon: 'check-circle' },
  AFTERSALE: { label: '售后中', value: 'AFTERSALE', color: '#722ED1', icon: 'life-buoy' },
  AFTERSALE_COMPLETED: { label: '售后完成', value: 'AFTERSALE_COMPLETED', color: '#8C8C8C', icon: 'check-circle' },
} as const;

export const ORDER_STATUS_OPTIONS = [
  { label: '全部订单', value: undefined },
  { label: '待付款', value: 'PENDING_PAYMENT' },
  { label: '待发货', value: 'PENDING_SHIPMENT' },
  { label: '待收货', value: 'PENDING_RECEIPT' },
  { label: '已完成', value: 'COMPLETED' },
  { label: '已取消', value: 'CANCELLED' },
  { label: '退款/售后', value: 'REFUNDING' },
];

// ==================== 认证状态常量 ====================

export const AUTH_STATUS = {
  0: { label: '未认证', color: '#8C8C8C' },
  1: { label: '认证中', color: '#1890FF' },
  2: { label: '已认证', color: '#52C41A' },
  3: { label: '认证失败', color: '#F5222D' },
} as const;

// ==================== 用户角色常量 ====================

export const USER_ROLES = {
  SUPPLIER: { label: '供应商', value: 'SUPPLIER', color: '#52C41A', icon: 'package' },
  PURCHASER: { label: '采购商', value: 'PURCHASER', color: '#1890FF', icon: 'shopping-cart' },
  REGULAR: { label: '普通用户', value: 'REGULAR', color: '#8C8C8C', icon: 'user' },
} as const;

export const USER_ROLE_OPTIONS = [
  { label: '供应商', value: 'SUPPLIER' },
  { label: '采购商', value: 'PURCHASER' },
  { label: '普通用户', value: 'REGULAR' },
] as const;

export const ROLE_STATUS = {
  PENDING: { label: '审核中', color: '#1890FF', icon: 'clock' },
  APPROVED: { label: '已通过', color: '#52C41A', icon: 'check-circle' },
  REJECTED: { label: '已拒绝', color: '#F5222D', icon: 'x-circle' },
} as const;

// 角色权限映射
export const ROLE_PERMISSIONS = {
  SUPPLIER: [
    'supply:create', 'supply:edit', 'supply:delete', 'supply:view',
    'shop:manage', 'order:view', 'order:process', 'analytics:view',
    'promotion:create', 'customer:view',
  ],
  PURCHASER: [
    'purchase:create', 'purchase:edit', 'purchase:delete', 'purchase:view',
    'order:create', 'order:view', 'order:cancel', 'quote:submit',
    'favorite:manage', 'address:manage',
  ],
  REGULAR: [
    'profile:view', 'profile:edit', 'order:view', 'favorite:manage',
    'address:manage', 'notification:view',
  ],
} as const;

// 用户中心菜单按角色配置
export const USER_CENTER_MENUS = {
  COMMON: [
    { id: 'profile', label: '个人资料', icon: 'user', roles: ['SUPPLIER', 'PURCHASER', 'REGULAR'] },
    { id: 'security', label: '账户安全', icon: 'shield', roles: ['SUPPLIER', 'PURCHASER', 'REGULAR'] },
    { id: 'notifications', label: '消息通知', icon: 'bell', roles: ['SUPPLIER', 'PURCHASER', 'REGULAR'] },
    { id: 'settings', label: '系统设置', icon: 'settings', roles: ['SUPPLIER', 'PURCHASER', 'REGULAR'] },
  ],
  SUPPLIER: [
    { id: 'supply', label: '我的供应', icon: 'package', roles: ['SUPPLIER'] },
    { id: 'shop', label: '店铺管理', icon: 'store', roles: ['SUPPLIER'] },
    { id: 'orders', label: '销售订单', icon: 'shopping-bag', roles: ['SUPPLIER'] },
    { id: 'analytics', label: '数据分析', icon: 'bar-chart', roles: ['SUPPLIER'] },
    { id: 'promotion', label: '营销推广', icon: 'megaphone', roles: ['SUPPLIER'] },
    { id: 'customers', label: '客户管理', icon: 'users', roles: ['SUPPLIER'] },
  ],
  PURCHASER: [
    { id: 'purchase', label: '我的采购', icon: 'shopping-cart', roles: ['PURCHASER'] },
    { id: 'orders', label: '采购订单', icon: 'clipboard-list', roles: ['PURCHASER'] },
    { id: 'quotes', label: '我的报价', icon: 'dollar-sign', roles: ['PURCHASER'] },
    { id: 'favorites', label: '我的收藏', icon: 'heart', roles: ['PURCHASER', 'REGULAR'] },
    { id: 'address', label: '收货地址', icon: 'map-pin', roles: ['PURCHASER', 'REGULAR'] },
  ],
  REGULAR: [
    { id: 'favorites', label: '我的收藏', icon: 'heart', roles: ['PURCHASER', 'REGULAR'] },
    { id: 'address', label: '收货地址', icon: 'map-pin', roles: ['PURCHASER', 'REGULAR'] },
  ],
} as const;

// ==================== 商品状态常量 ====================

export const GOODS_STATUS = {
  0: { label: '已下架', color: '#8C8C8C' },
  1: { label: '已上架', color: '#52C41A' },
  2: { label: '审核中', color: '#1890FF' },
  3: { label: '审核拒绝', color: '#F5222D' },
} as const;

export const GOODS_STATUS_OPTIONS = [
  { label: '全部', value: undefined },
  { label: '已上架', value: 1 },
  { label: '已下架', value: 0 },
  { label: '审核中', value: 2 },
];

// ==================== 商品标签常量 ====================

export const GOODS_TAGS = {
  NEW: { label: '新品', color: '#1890FF', bg: '#E6F7FF', border: '#91D5FF' },
  HOT: { label: '热销', color: '#F5222D', bg: '#FFF1F0', border: '#FFA39E' },
  PROMOTION: { label: '优惠', color: '#FA8C16', bg: '#FFF7E6', border: '#FFD591' },
  FREE_SHIPPING: { label: '包邮', color: '#52C41A', bg: '#F6FFED', border: '#B7EB8F' },
  LOW_STOCK: { label: '库存紧张', color: '#FA8C16', bg: '#FFF7E6', border: '#FFD591' },
} as const;

// ==================== 配送方式常量 ====================

export const DELIVERY_TYPES = [
  { label: '快递配送', value: 'express', price: 15, days: '3-5' },
  { label: '物流配送', value: 'logistics', price: 12, days: '5-7' },
  { label: '上门自提', value: 'pickup', price: 0, days: '0' },
] as const;

// ==================== 支付方式常量 ====================

export const PAYMENT_TYPES = [
  { label: '微信支付', value: 'wechat', icon: 'wechat' },
  { label: '支付宝', value: 'alipay', icon: 'alipay' },
  { label: '银行卡', value: 'bank', icon: 'credit-card' },
  { label: '余额支付', value: 'balance', icon: 'wallet' },
] as const;

// ==================== 发票类型常量 ====================

export const INVOICE_TYPES = [
  { label: '不开发票', value: 'none' },
  { label: '增值税普通发票', value: 'normal' },
  { label: '增值税专用发票', value: 'special' },
] as const;

export const INVOICE_TITLES = [
  { label: '个人', value: 'personal' },
  { label: '企业', value: 'company' },
] as const;

// ==================== 分页常量 ====================

export const PAGE_SIZES = [10, 20, 50, 100] as const;

export const DEFAULT_PAGE_SIZE = 20 as const;
export const DEFAULT_PAGE = 1 as const;

// ==================== 时间常量 ====================

export const TIME_OPTIONS = [
  { label: '全部时间', value: 'all' },
  { label: '今天', value: 'today' },
  { label: '近一周', value: 'week' },
  { label: '近一月', value: 'month' },
  { label: '近三月', value: 'three_months' },
  { label: '近半年', value: 'half_year' },
] as const;

// ==================== 排序常量 ====================

export const SORT_OPTIONS = {
  goods: [
    { label: '综合排序', value: 'default' },
    { label: '价格从低到高', value: 'price_asc' },
    { label: '价格从高到低', value: 'price_desc' },
    { label: '销量优先', value: 'sales' },
    { label: '最新发布', value: 'time' },
  ],
  purchase: [
    { label: '最新发布', value: 'default' },
    { label: '截止时间', value: 'deadline' },
    { label: '需求量', value: 'quantity' },
  ],
} as const;

// ==================== 分类常量 ====================

export const PRIMARY_CATEGORIES = [
  { id: '1', name: '水果', icon: 'apple', children: [
    { id: '1-1', name: '苹果' },
    { id: '1-2', name: '橙子' },
    { id: '1-3', name: '梨' },
    { id: '1-4', name: '葡萄' },
    { id: '1-5', name: '草莓' },
  ]},
  { id: '2', name: '蔬菜', icon: 'leaf', children: [
    { id: '2-1', name: '白菜' },
    { id: '2-2', name: '萝卜' },
    { id: '2-3', name: '土豆' },
    { id: '2-4', name: '西红柿' },
    { id: '2-5', name: '黄瓜' },
  ]},
  { id: '3', name: '粮油米面', icon: 'wheat', children: [
    { id: '3-1', name: '大米' },
    { id: '3-2', name: '面粉' },
    { id: '3-3', name: '食用油' },
    { id: '3-4', name: '杂粮' },
  ]},
  { id: '4', name: '肉类', icon: 'beef', children: [
    { id: '4-1', name: '猪肉' },
    { id: '4-2', name: '牛肉' },
    { id: '4-3', name: '羊肉' },
    { id: '4-4', name: '禽肉' },
  ]},
  { id: '5', name: '禽畜', icon: 'poultry', children: [
    { id: '5-1', name: '鸡蛋' },
    { id: '5-2', name: '鸭蛋' },
  ]},
  { id: '6', name: '水产', icon: 'fish', children: [
    { id: '6-1', name: '淡水鱼' },
    { id: '6-2', name: '海鲜' },
    { id: '6-3', name: '虾蟹' },
  ]},
  { id: '7', name: '苗木花卉', icon: 'flower', children: [
    { id: '7-1', name: '苗木' },
    { id: '7-2', name: '花卉' },
    { id: '7-3', name: '种子' },
  ]},
  { id: '8', name: '农资农机', icon: 'tractor', children: [
    { id: '8-1', name: '化肥' },
    { id: '8-2', name: '农药' },
    { id: '8-3', name: '农机' },
  ]},
] as const;

// ==================== 地区常量 ====================

export const PROVINCES = [
  '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
  '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',
  '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区',
  '海南省', '重庆市', '四川省', '贵州省', '云南省',
  '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区',
  '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区',
] as const;

// ==================== 热门搜索常量 ====================

export const HOT_SEARCHES = [
  '红富士苹果',
  '烟台大樱桃',
  '赣南脐橙',
  '新疆香梨',
  '海南芒果',
  '陕西猕猴桃',
  '山东大蒜',
  '东北大米',
  '有机蔬菜',
  '土鸡蛋',
] as const;

// ==================== 快捷入口常量 ====================

export const QUICK_ENTRIES = [
  { id: '1', name: '物流服务', icon: 'truck', color: '#1890FF', link: '/logistics' },
  { id: '2', name: '交易保障', icon: 'shield', color: '#52C41A', link: '/guarantee' },
  { id: '3', name: '金融服务', icon: 'credit-card', color: '#FA8C16', link: '/finance' },
  { id: '4', name: '行情数据', icon: 'bar-chart', color: '#722ED1', link: '/market' },
  { id: '5', name: '农技学堂', icon: 'book', color: '#1890FF', link: '/academy' },
  { id: '6', name: '直播带货', icon: 'video', color: '#F5222D', link: '/live' },
] as const;

// ==================== 客服时间常量 ====================

export const SERVICE_TIME = {
  online: '7×24小时在线',
  phone: '工作日 9:00-18:00',
} as const;

// ==================== 文件上传常量 ====================

export const UPLOAD_CONFIG = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: 'image/jpeg,image/jpg,image/png,image/webp',
    limit: 9,
  },
  video: {
    maxSize: 100 * 1024 * 1024, // 100MB
    accept: 'video/mp4,video/webm',
    limit: 1,
    duration: 60, // 60秒
  },
  avatar: {
    maxSize: 2 * 1024 * 1024, // 2MB
    accept: 'image/jpeg,image/jpg,image/png',
  },
  certificate: {
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: 'image/jpeg,image/jpg,image/png,application/pdf',
  },
} as const;

// ==================== 表单验证正则 ====================

export const REGEX = {
  phone: /^1[3-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  idCard: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  url: /^https?:\/\/.+/,
  number: /^\d+(\.\d+)?$/,
  positiveNumber: /^[1-9]\d*(\.\d+)?$/,
  money: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
} as const;

// ==================== 响应式断点常量 ====================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ==================== 本地存储键常量 ====================

export const STORAGE_KEYS = {
  TOKEN: 'huinong_token',
  USER_INFO: 'huinong_user_info',
  CART_COUNT: 'huinong_cart_count',
  SEARCH_HISTORY: 'huinong_search_history',
  VIEW_HISTORY: 'huinong_view_history',
} as const;
