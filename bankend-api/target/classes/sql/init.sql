-- 银行后端管理系统数据库初始化脚本
-- 数据库名: farm_mng_db
-- 字符集: UTF8MB4

-- 创建数据库
CREATE DATABASE IF NOT EXISTS farm_mng_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE farm_mng_db;

-- 用户表 (扩展基础用户信息)
CREATE TABLE IF NOT EXISTS sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    real_name VARCHAR(50) COMMENT '真实姓名',
    phone VARCHAR(20) COMMENT '手机号',
    email VARCHAR(100) COMMENT '邮箱',
    avatar VARCHAR(255) COMMENT '头像',
    gender TINYINT DEFAULT 0 COMMENT '性别: 0-未知, 1-男, 2-女',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常, 2-待审核',
    last_login_time DATETIME COMMENT '最后登录时间',
    last_login_ip VARCHAR(50) COMMENT '最后登录IP',
    role_id BIGINT COMMENT '角色ID',
    dept_id BIGINT COMMENT '部门ID',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除: 0-未删除, 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_username (username),
    INDEX idx_phone (phone),
    INDEX idx_status (status),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统用户表';

-- 角色表
CREATE TABLE IF NOT EXISTS sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID',
    role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
    role_code VARCHAR(50) NOT NULL UNIQUE COMMENT '角色编码',
    description VARCHAR(255) COMMENT '描述',
    data_scope TINYINT DEFAULT 1 COMMENT '数据权限范围: 1-全部, 2-本部门, 3-本部门及子部门, 4-仅本人',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用',
    sort_order INT DEFAULT 0 COMMENT '排序',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_role_code (role_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 权限表 (支持树形结构)
CREATE TABLE IF NOT EXISTS sys_permission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '权限ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父权限ID',
    permission_name VARCHAR(50) NOT NULL COMMENT '权限名称',
    permission_code VARCHAR(100) NOT NULL UNIQUE COMMENT '权限标识',
    permission_type TINYINT DEFAULT 1 COMMENT '类型: 1-菜单, 2-按钮, 3-接口',
    path VARCHAR(255) COMMENT '路由路径',
    component VARCHAR(255) COMMENT '组件路径',
    icon VARCHAR(50) COMMENT '图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    visible TINYINT DEFAULT 1 COMMENT '是否可见: 0-隐藏, 1-显示',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_permission_code (permission_code),
    INDEX idx_permission_type (permission_type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- 角色权限关联表
CREATE TABLE IF NOT EXISTS sys_role_permission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    permission_id BIGINT NOT NULL COMMENT '权限ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_role_permission (role_id, permission_id),
    INDEX idx_role_id (role_id),
    INDEX idx_permission_id (permission_id),
    FOREIGN KEY (role_id) REFERENCES sys_role(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES sys_permission(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- 菜单表 (与权限表关联，独立存储菜单配置)
CREATE TABLE IF NOT EXISTS sys_menu (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '菜单ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父菜单ID',
    menu_name VARCHAR(50) NOT NULL COMMENT '菜单名称',
    menu_type TINYINT DEFAULT 1 COMMENT '菜单类型: 1-目录, 2-菜单, 3-按钮',
    path VARCHAR(255) COMMENT '路由地址',
    component VARCHAR(255) COMMENT '组件路径',
    icon VARCHAR(50) COMMENT '图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    visible TINYINT DEFAULT 1 COMMENT '是否显示: 0-隐藏, 1-显示',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用',
    perms VARCHAR(100) COMMENT '权限标识',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_menu_type (menu_type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统菜单表';

-- 部门表 (组织架构)
CREATE TABLE IF NOT EXISTS sys_dept (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '部门ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父部门ID',
    dept_name VARCHAR(50) NOT NULL COMMENT '部门名称',
    dept_code VARCHAR(50) COMMENT '部门编码',
    leader VARCHAR(50) COMMENT '负责人',
    phone VARCHAR(20) COMMENT '联系电话',
    email VARCHAR(100) COMMENT '邮箱',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-停用, 1-启用',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_dept_code (dept_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门表';

-- 内容分类表
CREATE TABLE IF NOT EXISTS cms_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父分类ID',
    category_name VARCHAR(50) NOT NULL COMMENT '分类名称',
    category_code VARCHAR(50) COMMENT '分类编码',
    description VARCHAR(255) COMMENT '描述',
    icon VARCHAR(50) COMMENT '图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_category_code (category_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='内容分类表';

-- 内容/文章表
CREATE TABLE IF NOT EXISTS cms_content (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '内容ID',
    title VARCHAR(200) NOT NULL COMMENT '标题',
    content LONGTEXT COMMENT '内容',
    summary VARCHAR(500) COMMENT '摘要',
    category_id BIGINT COMMENT '分类ID',
    author VARCHAR(50) COMMENT '作者',
    cover_image VARCHAR(255) COMMENT '封面图',
    views INT DEFAULT 0 COMMENT '浏览量',
    likes INT DEFAULT 0 COMMENT '点赞数',
    comments INT DEFAULT 0 COMMENT '评论数',
    status TINYINT DEFAULT 0 COMMENT '状态: 0-草稿, 1-待审核, 2-已发布, 3-已拒绝',
    publish_time DATETIME COMMENT '发布时间',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (category_id),
    INDEX idx_status (status),
    INDEX idx_publish_time (publish_time),
    FOREIGN KEY (category_id) REFERENCES cms_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='内容表';

-- 商品分类表
CREATE TABLE IF NOT EXISTS product_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父分类ID',
    category_name VARCHAR(50) NOT NULL COMMENT '分类名称',
    category_code VARCHAR(50) COMMENT '分类编码',
    icon VARCHAR(50) COMMENT '图标',
    description VARCHAR(255) COMMENT '描述',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_category_code (category_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品分类表';

-- 商品表
CREATE TABLE IF NOT EXISTS product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
    product_name VARCHAR(100) NOT NULL COMMENT '商品名称',
    product_code VARCHAR(50) COMMENT '商品编码',
    category_id BIGINT COMMENT '分类ID',
    price DECIMAL(10,2) COMMENT '价格',
    stock INT DEFAULT 0 COMMENT '库存',
    unit VARCHAR(20) COMMENT '单位',
    origin VARCHAR(100) COMMENT '产地',
    description TEXT COMMENT '描述',
    images TEXT COMMENT '图片(JSON数组)',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-已发布, 2-缺货, 3-待审核, 4-下架',
    sort_order INT DEFAULT 0 COMMENT '排序',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (category_id),
    INDEX idx_product_code (product_code),
    INDEX idx_status (status),
    FOREIGN KEY (category_id) REFERENCES product_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表';

-- 订单表
CREATE TABLE IF NOT EXISTS order_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单编号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    total_amount DECIMAL(10,2) COMMENT '订单总额',
    discount_amount DECIMAL(10,2) DEFAULT 0 COMMENT '优惠金额',
    actual_amount DECIMAL(10,2) COMMENT '实付金额',
    payment_method TINYINT COMMENT '支付方式: 1-微信, 2-支付宝, 3-银行转账',
    payment_status TINYINT DEFAULT 0 COMMENT '支付状态: 0-待支付, 1-已支付, 2-支付失败',
    order_status VARCHAR(20) COMMENT '订单状态: pending_payment, pending_shipment, shipped, completed, cancelled',
    consignee VARCHAR(50) COMMENT '收货人',
    phone VARCHAR(20) COMMENT '联系电话',
    address VARCHAR(255) COMMENT '收货地址',
    remark VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_order_no (order_no),
    INDEX idx_user_id (user_id),
    INDEX idx_order_status (order_status),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 订单商品明细表
CREATE TABLE IF NOT EXISTS order_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    order_id BIGINT NOT NULL COMMENT '订单ID',
    product_id BIGINT COMMENT '商品ID',
    product_name VARCHAR(100) COMMENT '商品名称',
    quantity INT COMMENT '数量',
    unit_price DECIMAL(10,2) COMMENT '单价',
    total_price DECIMAL(10,2) COMMENT '总价',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (order_id) REFERENCES order_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单商品明细表';

-- 供应表
CREATE TABLE IF NOT EXISTS supply (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '供应ID',
    supply_name VARCHAR(100) NOT NULL COMMENT '供应商品',
    category_id BIGINT COMMENT '分类ID',
    price DECIMAL(10,2) COMMENT '价格',
    stock DECIMAL(10,2) COMMENT '库存',
    unit VARCHAR(20) COMMENT '单位',
    origin VARCHAR(100) COMMENT '产地',
    supplier VARCHAR(100) COMMENT '供应商',
    description TEXT COMMENT '描述',
    images TEXT COMMENT '图片',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-已发布, 2-待审核, 3-缺货, 4-下架',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (category_id),
    INDEX idx_supplier (supplier),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='供应表';

-- 采购表
CREATE TABLE IF NOT EXISTS purchase (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '采购ID',
    purchase_name VARCHAR(100) NOT NULL COMMENT '采购需求',
    category_id BIGINT COMMENT '分类ID',
    budget_min DECIMAL(10,2) COMMENT '最低预算',
    budget_max DECIMAL(10,2) COMMENT '最高预算',
    quantity DECIMAL(10,2) COMMENT '需求量',
    unit VARCHAR(20) COMMENT '单位',
    origin VARCHAR(100) COMMENT '期望产地',
    buyer VARCHAR(100) COMMENT '采购商',
    description TEXT COMMENT '描述',
    urgent TINYINT DEFAULT 0 COMMENT '是否紧急: 0-否, 1-是',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-进行中, 2-待审核, 3-已关闭',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (category_id),
    INDEX idx_buyer (buyer),
    INDEX idx_status (status),
    INDEX idx_urgent (urgent)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='采购表';

-- 操作日志表
CREATE TABLE IF NOT EXISTS sys_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '日志ID',
    user_id BIGINT COMMENT '用户ID',
    username VARCHAR(50) COMMENT '用户名',
    operation VARCHAR(100) COMMENT '操作',
    method VARCHAR(255) COMMENT '方法',
    params TEXT COMMENT '参数',
    ip VARCHAR(50) COMMENT 'IP地址',
    location VARCHAR(255) COMMENT '操作地点',
    browser VARCHAR(100) COMMENT '浏览器',
    os VARCHAR(100) COMMENT '操作系统',
    status TINYINT DEFAULT 1 COMMENT '操作状态: 0-失败, 1-成功',
    error_msg TEXT COMMENT '错误信息',
    execute_time BIGINT COMMENT '执行时间(毫秒)',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_user_id (user_id),
    INDEX idx_operation (operation),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统操作日志表';

-- 文件表
CREATE TABLE IF NOT EXISTS sys_file (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '文件ID',
    file_name VARCHAR(255) NOT NULL COMMENT '文件名',
    original_name VARCHAR(255) COMMENT '原始文件名',
    file_path VARCHAR(500) NOT NULL COMMENT '文件路径',
    file_size BIGINT COMMENT '文件大小(字节)',
    file_type VARCHAR(50) COMMENT '文件类型',
    upload_user VARCHAR(50) COMMENT '上传用户',
    upload_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '上传时间',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除',
    INDEX idx_file_type (file_type),
    INDEX idx_upload_time (upload_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文件表';

-- ========== 初始化数据 ==========

-- 初始化超级管理员角色
INSERT INTO sys_role (role_name, role_code, description, data_scope, status, sort_order) VALUES
('超级管理员', 'SUPER_ADMIN', '系统超级管理员，拥有所有权限', 1, 1, 1),
('系统管理员', 'ADMIN', '系统管理员', 1, 1, 2),
('普通用户', 'USER', '普通用户', 4, 1, 3),
('农户', 'FARMER', '农户角色', 4, 1, 4),
('批发商', 'WHOLESALER', '批发商角色', 4, 1, 5),
('采购商', 'BUYER', '采购商角色', 4, 1, 6);

-- 初始化管理员用户 (密码: admin123)
INSERT INTO sys_user (username, password, real_name, phone, email, status, role_id) VALUES
('admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.QL33.e0qWjZvJ6UZMb9BQJ6', '系统管理员', '13888888888', 'admin@example.com', 1, 1);

-- 初始化系统菜单
INSERT INTO sys_menu (parent_id, menu_name, menu_type, path, component, icon, sort_order, visible, status, perms) VALUES
(0, '系统管理', 1, '/system', 'Layout', 'Settings', 100, 1, 1, ''),
(1, '用户管理', 2, 'user', 'system/user/index', 'User', 101, 1, 1, 'system:user:list'),
(1, '角色管理', 2, 'role', 'system/role/index', 'Shield', 102, 1, 1, 'system:role:list'),
(1, '权限管理', 2, 'permission', 'system/permission/index', 'Key', 103, 1, 1, 'system:permission:list'),
(1, '菜单管理', 2, 'menu', 'system/menu/index', 'Menu', 104, 1, 1, 'system:menu:list'),
(1, '部门管理', 2, 'dept', 'system/dept/index', 'Building', 105, 1, 1, 'system:dept:list'),
(1, '操作日志', 2, 'log', 'system/log/index', 'FileText', 106, 1, 1, 'system:log:list'),

(0, '内容管理', 1, '/content', 'Layout', 'FileText', 200, 1, 1, ''),
(8, '内容列表', 2, 'list', 'content/list/index', 'List', 201, 1, 1, 'content:list'),
(8, '内容分类', 2, 'category', 'content/category/index', 'Folder', 202, 1, 1, 'content:category'),

(0, '商品管理', 1, '/product', 'Layout', 'Package', 300, 1, 1, ''),
(11, '商品列表', 2, 'list', 'product/list/index', 'List', 301, 1, 1, 'product:list'),
(11, '商品分类', 2, 'category', 'product/category/index', 'Folder', 302, 1, 1, 'product:category'),
(11, '发布商品', 2, 'publish', 'product/publish/index', 'PlusCircle', 303, 1, 1, 'product:publish'),

(0, '供应链管理', 1, '/supply', 'Layout', 'Truck', 400, 1, 1, ''),
(15, '供应列表', 2, 'list', 'supply/list/index', 'List', 401, 1, 1, 'supply:list'),
(15, '采购需求', 2, 'purchase', 'supply/purchase/index', 'ShoppingCart', 402, 1, 1, 'supply:purchase'),

(0, '订单管理', 1, '/order', 'Layout', 'ShoppingBag', 500, 1, 1, ''),
(18, '订单列表', 2, 'list', 'order/list/index', 'List', 501, 1, 1, 'order:list'),

(0, '仪表板', 2, '/dashboard', 'dashboard/index', 'LayoutDashboard', 1, 1, 1, '');

-- 初始化内容分类
INSERT INTO cms_category (parent_id, category_name, category_code, description, sort_order, status) VALUES
(0, '市场分析', 'MARKET_ANALYSIS', '农产品市场行情分析', 1, 1),
(0, '政策解读', 'POLICY_INTERPRETATION', '农业相关政策解读', 2, 1),
(0, '电商运营', 'E_COMMERCE', '农产品电商运营技巧', 3, 1),
(0, '种植技术', 'PLANTING_TECH', '农作物种植技术', 4, 1),
(0, '平台公告', 'PLATFORM_NOTICE', '平台公告通知', 5, 1);

-- 初始化商品分类
INSERT INTO product_category (parent_id, category_name, category_code, icon, description, sort_order, status) VALUES
(0, '水果', 'FRUIT', '🍎', '各类水果', 1, 1),
(0, '蔬菜', 'VEGETABLE', '🥦', '新鲜蔬菜', 2, 1),
(0, '禽畜', 'LIVESTOCK', '🐔', '家禽牲畜', 3, 1),
(0, '粮油', 'GRAIN_OIL', '🌾', '粮食油脂', 4, 1),
(1, '苹果', 'APPLE', '', '苹果类', 101, 1),
(1, '柑橘', 'CITRUS', '', '柑橘类', 102, 1),
(2, '叶菜类', 'LEAFY_VEGETABLE', '', '叶菜类蔬菜', 201, 1),
(2, '根茎类', 'ROOT_VEGETABLE', '', '根茎类蔬菜', 202, 1);

COMMIT;