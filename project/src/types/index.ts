// ==================== 用户相关类型 ====================

export type UserType = 'PERSONAL' | 'COMPANY';

export type UserRole = 'SUPPLIER' | 'PURCHASER' | 'REGULAR';

export type AuthStatus = 'UNAUTHENTICATED' | 'AUTHENTICATED' | 'LOADING';

export type RealNameStatus = 0 | 1 | 2 | 3; // 0-未认证 1-认证中 2-已认证 3-认证失败

export type MemberLevel = 1 | 2 | 3 | 4; // 1-注册 2-认证 3-优选 4-战略

export interface UserRoleInfo {
  role: UserRole;
  appliedAt?: string;
  approvedAt?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applicationNote?: string;
  rejectionReason?: string;
}

export interface User {
  userId: string;
  userType: UserType;
  userName: string;
  phone: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  realName?: string;
  companyName?: string;
  businessLicense?: string;
  authStatus: RealNameStatus;
  memberLevel: MemberLevel;
  createTime: string;
  updateTime: string;
  status: 0 | 1; // 0-禁用 1-正常
  shopId?: string;
  roles: UserRoleInfo[];
  activeRole: UserRole;
}

export interface UserProfile {
  user: User;
  wallet: {
    balance: number;
    frozen: number;
    pending: number;
  };
  stats: {
    orderCount: number;
    couponCount: number;
    points: number;
    collectCount: number;
  };
}

// ==================== 商品相关类型 ====================

export interface Goods {
  goodsId: string;
  goodsName: string;
  goodsNo?: string;
  categoryId: string;
  userId: string; // 商家ID
  price: number;
  unit: string;
  minOrder: number;
  stock: number;
  province: string;
  city: string;
  district?: string;
  goodsImage: string[];
  goodsVideo?: string;
  goodsDesc?: string;
  status: 0 | 1 | 2 | 3; // 0-下架 1-上架 2-审核中 3-审核拒绝
  sales: number;
  collectCount: number;
  viewCount: number;
  createTime: string;
  updateTime: string;
  // 扩展字段
  tags?: GoodsTag[];
  specifications?: string;
  grade?: string;
  isFreeShipping?: boolean;
  isNew?: boolean;
  isHot?: boolean;
}

export type GoodsTag = 'NEW' | 'HOT' | 'PROMOTION' | 'FREE_SHIPPING' | 'LOW_STOCK';

export interface GoodsCategory {
  categoryId: string;
  categoryName: string;
  parentId?: string;
  level: 1 | 2 | 3;
  icon?: string;
  sort: number;
  children?: GoodsCategory[];
}

export interface GoodsFilter {
  keyword?: string;
  categoryId?: string;
  province?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  freeShipping?: boolean;
  sortBy?: 'default' | 'price_asc' | 'price_desc' | 'sales' | 'time';
  page: number;
  pageSize: number;
}

export interface GoodsListResponse {
  list: Goods[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== 店铺相关类型 ====================

export interface Shop {
  shopId: string;
  userId: string;
  shopName: string;
  shopAvatar?: string;
  shopBanner?: string;
  shopType: 'PERSONAL' | 'COMPANY';
  authStatus: RealNameStatus;
  creditScore: number;
  descriptionScore: number;
  deliveryScore: number;
  serviceScore: number;
  fansCount: number;
  goodsCount: number;
  mainCategory?: string;
  foundedTime?: string;
  description?: string;
  address?: string;
  phone?: string;
  wechat?: string;
  isPreferred?: boolean;
  isEnterprise?: boolean;
}

// ==================== 订单相关类型 ====================

export type OrderStatus =
  | 'PENDING_PAYMENT' // 待付款
  | 'PENDING_SHIPMENT' // 待发货
  | 'PENDING_RECEIPT' // 待收货
  | 'COMPLETED' // 已完成
  | 'CANCELLED' // 已取消
  | 'REFUNDING' // 退款中
  | 'REFUNDED' // 退款完成
  | 'AFTERSALE' // 售后中
  | 'AFTERSALE_COMPLETED'; // 售后完成

export interface Order {
  orderId: string;
  orderNo: string;
  userId: string; // 买家ID
  sellerId: string; // 卖家ID
  orderStatus: OrderStatus;
  goodsAmount: number;
  freightAmount: number;
  discountAmount: number;
  orderAmount: number;
  payAmount: number;
  receiverName: string;
  receiverPhone: string;
  receiverProvince: string;
  receiverCity: string;
  receiverDistrict?: string;
  receiverAddress: string;
  deliveryType: string;
  expressNo?: string;
  expressCompany?: string;
  payType?: string;
  payTime?: string;
  shipTime?: string;
  receiveTime?: string;
  orderRemark?: string;
  createTime: string;
  updateTime: string;
  // 扩展字段
  items: OrderItem[];
  shop?: Shop;
  canCancel?: boolean;
  canPay?: boolean;
  canConfirm?: boolean;
  canRefund?: boolean;
  cancelReason?: string;
  countdown?: number; // 倒计时秒数
}

export interface OrderItem {
  itemId: string;
  orderId: string;
  goodsId: string;
  goodsName: string;
  goodsImage: string;
  price: number;
  quantity: number;
  amount: number;
  specifications?: string;
}

export interface OrderFilter {
  status?: OrderStatus;
  keyword?: string;
  startTime?: string;
  endTime?: string;
  page: number;
  pageSize: number;
}

// ==================== 购物车相关类型 ====================

export interface CartItem {
  cartId: string;
  userId: string;
  goodsId: string;
  sellerId: string;
  shopName?: string;
  goodsName: string;
  goodsImage: string;
  price: number;
  quantity: number;
  specifications?: string;
  stock: number;
  minOrder: number;
  selected: boolean;
  updateTime: string;
}

export interface CartSummary {
  totalQuantity: number;
  totalAmount: number;
  freightAmount: number;
  discountAmount: number;
  payableAmount: number;
}

// ==================== 收货地址相关类型 ====================

export interface Address {
  addressId: string;
  userId: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  district?: string;
  detailAddress: string;
  isDefault: boolean;
  createTime: string;
  updateTime: string;
}

// ==================== 采购需求相关类型 ====================

export interface Purchase {
  purchaseId: string;
  userId: string;
  purchaseTitle: string;
  categoryId?: string;
  description?: string;
  goodsName?: string;
  specifications?: string;
  qualityRequirements?: string;
  quantity: number;
  minOrder?: number;
  unit: string;
  expectedMinPrice?: number;
  expectedMaxPrice?: number;
  expectedPrice?: number;
  expectedProvince?: string;
  expectedCity?: string;
  deliveryLocation?: string;
  expectedDeliveryDate?: string;
  deadline: string;
  paymentMethod?: string;
  paymentCycle?: string;
  isUrgent?: boolean;
  contactVisible: 'ALL' | 'LOGGED_IN' | 'NONE';
  status: 0 | 1 | 2; // 0-草稿 1-发布 2-关闭
  viewCount: number;
  quoteCount: number;
  createTime: string;
  updateTime: string;
  // 扩展字段
  user?: {
    avatar?: string;
    userName: string;
    creditScore?: number;
  };
  tags?: PurchaseTag[];
}

export type PurchaseTag = 'URGENT' | 'LONG_TERM';

export interface PurchaseFilter {
  keyword?: string;
  categoryId?: string;
  province?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  urgent?: boolean;
  deadlineStart?: string;
  deadlineEnd?: string;
  sortBy?: 'default' | 'deadline' | 'quantity';
  page: number;
  pageSize: number;
}

// ==================== 资讯相关类型 ====================

export interface News {
  newsId: string;
  title: string;
  summary?: string;
  coverImage?: string;
  content: string;
  categoryId?: string;
  categoryName?: string;
  author?: string;
  source?: string;
  tags?: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isHot?: boolean;
  isTop?: boolean;
  publishTime: string;
  createTime: string;
}

export interface NewsCategory {
  categoryId: string;
  categoryName: string;
  sort: number;
  newsCount: number;
}

export interface PriceData {
  commodityId: string;
  commodityName: string;
  category?: string;
  province: string;
  city?: string;
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  changeRate: number; // 涨跌百分比
  publishTime: string;
}

// ==================== 消息相关类型 ====================

export type MessageType = 'SYSTEM' | 'ORDER' | 'QUOTE' | 'SERVICE' | 'INTERACTION';

export interface Message {
  messageId: string;
  userId: string;
  messageType: MessageType;
  title: string;
  content: string;
  link?: string;
  isRead: boolean;
  createTime: string;
}

// ==================== 优惠券相关类型 ====================

export interface Coupon {
  couponId: string;
  couponName: string;
  couponType: 'MONEY_OFF' | 'PERCENT_OFF' | 'NO_THRESHOLD';
  discountValue: number;
  minAmount: number;
  maxDiscount?: number;
  totalQuantity: number;
  receivedQuantity: number;
  status: 0 | 1 | 2; // 0-未开始 1-进行中 2-已结束
  startTime: string;
  endTime: string;
  applicableCategories?: string[];
  description?: string;
  // 用户优惠券状态
  userStatus?: 'UNUSED' | 'USED' | 'EXPIRED';
  receiveTime?: string;
  useTime?: string;
}

// ==================== 通用类型 ====================

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  page?: {
    total: number;
    pageNo: number;
    pageSize: number;
    totalPages: number;
  };
  timestamp: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type Size = 'small' | 'medium' | 'large';
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface LoadingState {
  loading: boolean;
  error?: Error | null;
}

export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: Option[];
}
