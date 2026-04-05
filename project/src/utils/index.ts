// ==================== 通用工具函数 ====================

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 延迟函数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 生成唯一ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * 深度克隆
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        (clonedObj as any)[key] = deepClone((obj as any)[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * 对象深比较
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

// ==================== 字符串处理 ====================

/**
 * 截断文本
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
}

/**
 * 首字母大写
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 驼峰转横线
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 横线转驼峰
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * 脱敏手机号
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 11) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 脱敏身份证号
 */
export function maskIdCard(idCard: string): string {
  if (!idCard || idCard.length < 18) return idCard;
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
}

/**
 * 脱敏银行卡号
 */
export function maskBankCard(cardNo: string): string {
  if (!cardNo || cardNo.length < 16) return cardNo;
  return cardNo.replace(/(\d{4})\d+(\d{4})/, '$1 **** **** $2');
}

// ==================== 数字处理 ====================

/**
 * 格式化金额
 */
export function formatMoney(
  amount: number,
  options: {
    symbol?: string;
    decimals?: number;
    thousandsSeparator?: boolean;
  } = {}
): string {
  const {
    symbol = '¥',
    decimals = 2,
    thousandsSeparator = true,
  } = options;

  let value = amount.toFixed(decimals);

  if (thousandsSeparator) {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    value = parts.join('.');
  }

  return `${symbol}${value}`;
}

/**
 * 格式化数字（添加千分位）
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 格式化百分比
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * 格式化数量（大数转换）
 */
export function formatQuantity(num: number): string {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}亿`;
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return num.toString();
}

// ==================== 日期时间处理 ====================

/**
 * 格式化日期
 */
export function formatDate(
  date: string | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取相对时间
 */
export function getRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 30) return `${days}天前`;
  if (months < 12) return `${months}个月前`;
  return `${years}年前`;
}

/**
 * 获取倒计时
 */
export function getCountdown(endTime: string | Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
  const now = new Date();
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

/**
 * 判断是否为今天
 */
export function isToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

/**
 * 判断是否为本周
 */
export function isThisWeek(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return d.getTime() >= oneWeekAgo.getTime() && d.getTime() <= now.getTime();
}

// ==================== 数组处理 ====================

/**
 * 数组去重
 */
export function unique<T>(arr: T[], key?: keyof T): T[] {
  if (!key) return Array.from(new Set(arr));
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * 数组分组
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * 数组分块
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * 数组求和
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * 数组平均值
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

// ==================== URL处理 ====================

/**
 * 构建查询字符串
 */
export function buildQuery(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
}

/**
 * 解析查询字符串
 */
export function parseQuery(query: string): Record<string, string> {
  const result: Record<string, string> = {};
  const pairs = query.startsWith('?') ? query.slice(1) : query;
  pairs.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      result[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  });
  return result;
}

/**
 * 添加查询参数
 */
export function addQuery(url: string, params: Record<string, any>): string {
  const [path, query] = url.split('?');
  const existing = query ? parseQuery(query) : {};
  return `${path}${buildQuery({ ...existing, ...params })}`;
}

// ==================== 本地存储 ====================

/**
 * 获取本地存储
 */
export function getStorage<T = any>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

/**
 * 设置本地存储
 */
export function setStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage set error:', error);
  }
}

/**
 * 删除本地存储
 */
export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Storage remove error:', error);
  }
}

/**
 * 清空本地存储
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Storage clear error:', error);
  }
}

/**
 * 获取会话存储
 */
export function getSession<T = any>(key: string): T | null {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

/**
 * 设置会话存储
 */
export function setSession(key: string, value: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Session set error:', error);
  }
}

// ==================== Cookie处理 ====================

/**
 * 设置Cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  } = {}
): void {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    const expires =
      options.expires instanceof Date
        ? options.expires.toUTCString()
        : new Date(Date.now() + options.expires * 1000).toUTCString();
    cookie += `; expires=${expires}`;
  }

  if (options.path) cookie += `; path=${options.path}`;
  if (options.domain) cookie += `; domain=${options.domain}`;
  if (options.secure) cookie += '; secure';
  if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

  document.cookie = cookie;
}

/**
 * 获取Cookie
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (decodeURIComponent(key) === name) {
      return value ? decodeURIComponent(value) : '';
    }
  }
  return null;
}

/**
 * 删除Cookie
 */
export function removeCookie(name: string, options: { path?: string; domain?: string } = {}): void {
  setCookie(name, '', { ...options, expires: new Date(0) });
}

// ==================== 文件处理 ====================

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
}

/**
 * 检查文件类型
 */
export function getFileType(filename: string): 'image' | 'video' | 'document' | 'other' {
  const ext = getFileExtension(filename);
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoExts = ['mp4', 'webm', 'mov', 'avi'];
  const documentExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];

  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  if (documentExts.includes(ext)) return 'document';
  return 'other';
}

/**
 * 下载文件
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement('a');
  link.href = url;
  if (filename) link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 复制到剪贴板
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // 降级方案
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
}

// ==================== 验证函数 ====================

/**
 * 验证手机号
 */
export function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * 验证邮箱
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 验证身份证号
 */
export function isValidIdCard(idCard: string): boolean {
  return /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(idCard);
}

/**
 * 验证密码强度
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 6) return 'weak';
  if (password.length < 8) return 'weak';

  let score = 0;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return 'weak';
  if (score <= 2) return 'medium';
  return 'strong';
}

// ==================== 环境判断 ====================

/**
 * 判断是否为移动端
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * 判断是否为微信浏览器
 */
export function isWeChat(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent);
}

/**
 * 判断是否为Safari浏览器
 */
export function isSafari(): boolean {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
