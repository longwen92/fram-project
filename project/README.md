# 惠农网农产品B2B电商平台

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.2.12-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.4-06B6D4?logo=tailwindcss)

惠农网农产品B2B电商平台是一个专注于农产品供应链的在线交易平台，连接全国农产品供应商与采购商，提供高效、安全、便捷的交易服务。

## ✨ 功能特性

### 核心功能
- **供应大厅** - 农产品供应商发布供应信息
- **采购需求** - 采购商发布采购需求，供应商报价
- **智能匹配** - 基于品类、地区、价格智能匹配供需
- **店铺系统** - 供应商个人/企业店铺展示
- **购物车** - 多商品合并下单
- **订单管理** - 全流程订单跟踪与管理
- **支付系统** - 多种支付方式集成
- **物流跟踪** - 实时物流信息查询

### 用户服务
- **用户认证** - 个人/企业双认证体系
- **会员体系** - 多层次会员权益
- **消息中心** - 站内信、交易提醒
- **客服系统** - 在线客服、纠纷处理
- **数据看板** - 交易数据统计分析

### 平台管理
- **商品管理** - 商品上架、审核、分类
- **订单管理** - 订单处理、发货、售后
- **用户管理** - 用户审核、权限管理
- **内容管理** - 资讯发布、广告管理
- **数据报表** - 交易统计、财务报表

## 🛠️ 技术栈

### 前端框架
- **React 18** - 用于构建用户界面的 JavaScript 库
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite 5** - 下一代前端构建工具，极速开发体验

### 状态管理
- **Zustand** - 轻量、可扩展的状态管理库
- **React Query** - 服务器状态管理，数据同步

### 路由与UI
- **React Router DOM 6** - 声明式路由管理
- **TailwindCSS 3** - 原子化CSS框架
- **Lucide React** - 精美图标库
- **clsx** - 条件类名合并工具

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **PostCSS** - CSS处理工具
- **Autoprefixer** - 自动添加浏览器前缀

## 📁 项目结构

```
huinong-b2b-platform/
├── src/
│   ├── api/                    # API接口定义
│   │   ├── index.ts           # API基础配置
│   │   ├── auth.ts            # 认证相关API
│   │   └── ...
│   ├── assets/                # 静态资源
│   │   ├── images/            # 图片资源
│   │   ├── fonts/             # 字体文件
│   │   └── styles/            # 全局样式
│   ├── components/            # 可复用组件
│   │   ├── layout/            # 布局组件
│   │   │   ├── Layout.tsx     # 主布局
│   │   │   ├── Header.tsx     # 顶部导航
│   │   │   └── Footer.tsx     # 底部信息
│   │   ├── home/              # 首页组件
│   │   │   ├── FeaturedProducts.tsx
│   │   │   └── CategoryGrid.tsx
│   │   └── ...
│   ├── constants/             # 常量定义
│   │   └── index.ts           # 应用常量
│   ├── hooks/                 # 自定义Hooks
│   │   ├── useBreakpoint.ts   # 响应式断点
│   │   ├── useDebounce.ts     # 防抖Hook
│   │   ├── useLocalStorage.ts # 本地存储Hook
│   │   └── ...
│   ├── pages/                 # 页面组件
│   │   ├── home/              # 首页
│   │   ├── auth/              # 认证页面
│   │   │   ├── LoginPage.tsx  # 登录页
│   │   │   └── RegisterPage.tsx # 注册页
│   │   ├── supply/            # 供应模块
│   │   ├── purchase/          # 采购模块
│   │   ├── cart/              # 购物车模块
│   │   ├── order/             # 订单模块
│   │   ├── user/              # 用户模块
│   │   ├── shop/              # 店铺模块
│   │   ├── news/              # 资讯模块
│   │   └── ...
│   ├── store/                 # 状态管理
│   │   ├── index.ts           # store导出
│   │   ├── authStore.ts       # 认证状态
│   │   ├── cartStore.ts       # 购物车状态
│   │   ├── favoriteStore.ts   # 收藏状态
│   │   └── uiStore.ts         # UI状态
│   ├── types/                 # TypeScript类型定义
│   │   └── index.ts           # 类型导出
│   ├── utils/                 # 工具函数
│   │   └── index.ts           # 工具函数导出
│   ├── App.tsx                # 根组件
│   ├── main.tsx               # 应用入口
│   └── index.css              # 全局样式
├── public/                    # 静态资源
├── .eslintrc.cjs              # ESLint配置
├── index.html                 # HTML模板
├── package.json               # 项目依赖
├── postcss.config.js          # PostCSS配置
├── tailwind.config.ts         # Tailwind配置
├── tsconfig.json              # TypeScript配置
├── tsconfig.node.json         # Node TypeScript配置
├── vite.config.ts             # Vite配置
└── README.md                  # 项目文档
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 或更高版本
- npm 9+ 或 yarn 1.22+ 或 pnpm 8+

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn

# 使用 pnpm
pnpm install
```

### 开发环境启动

```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
```

开发服务器将在 http://localhost:5173 启动，支持热重载。

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 代码质量检查

```bash
# 代码格式检查
npm run lint

# TypeScript类型检查
npm run type-check
```

## 📦 可用脚本

| 脚本 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | 运行ESLint代码检查 |
| `npm run type-check` | 运行TypeScript类型检查 |

## 🔧 配置说明

### 环境变量

创建 `.env` 文件配置环境变量：

```env
# API基础URL
VITE_API_BASE_URL=http://localhost:3000/api

# CDN地址
VITE_CDN_URL=https://cdn.example.com

# 其他配置...
```

### TailwindCSS配置

`tailwind.config.ts` 包含了项目的主题配置、颜色方案和响应式断点。

### TypeScript配置

`tsconfig.json` 配置了TypeScript编译选项和路径别名：
- `@/*` -> `./src/*`
- `@/components/*` -> `./src/components/*`
- 其他路径别名...

## 🎨 开发指南

### 组件开发规范

1. **组件命名**：使用PascalCase，如 `UserProfile.tsx`
2. **Props类型**：使用TypeScript接口定义props类型
3. **样式规范**：使用TailwindCSS类名，避免内联样式
4. **代码组织**：按功能模块组织组件

### 状态管理指南

1. **全局状态**：使用Zustand store管理跨组件状态
2. **服务器状态**：使用React Query管理异步数据
3. **本地状态**：使用React useState管理组件内部状态

### API调用规范

1. **API层**：所有API调用集中在 `src/api/` 目录
2. **错误处理**：统一在axios拦截器中处理错误
3. **类型安全**：为所有API请求/响应定义TypeScript类型

## 📱 响应式设计

项目采用移动优先的响应式设计策略：

- **移动端** (< 768px)：简化布局，优化触控体验
- **平板端** (768px - 1024px)：适配中等屏幕
- **桌面端** (> 1024px)：完整功能展示

使用 `useBreakpoint` hook获取当前设备信息：

```typescript
const { isMobile, isTablet, isDesktop } = useBreakpoint();
```

## 🔌 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 许可证

本项目基于 MIT 许可证开源。详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/huinong-b2b-platform/issues)
- 邮箱：support@huinong.com

---

**惠农网农产品B2B电商平台** © 2024 - 连接农产品供需，构建智慧农业生态