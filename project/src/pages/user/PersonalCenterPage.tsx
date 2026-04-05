import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Settings, CreditCard, MapPin, Bell, Shield, Store, ShoppingBag, BarChart, Megaphone, Users, ShoppingCart, ClipboardList, DollarSign, ChevronDown, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { USER_ROLES, USER_CENTER_MENUS, ROLE_STATUS } from '@/constants';

const PersonalCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // 获取用户信息和角色
  const { user, activeRole, hasRole, setActiveRole } = useAuthStore();

  // 图标映射
  const iconMap: Record<string, React.ComponentType<any>> = {
    user: User,
    package: Package,
    heart: Heart,
    settings: Settings,
    'credit-card': CreditCard,
    'map-pin': MapPin,
    bell: Bell,
    shield: Shield,
    store: Store,
    'shopping-bag': ShoppingBag,
    'bar-chart': BarChart,
    megaphone: Megaphone,
    users: Users,
    'shopping-cart': ShoppingCart,
    'clipboard-list': ClipboardList,
    'dollar-sign': DollarSign,
  };

  // 生成菜单项
  const menuItems = useMemo(() => {
    const commonMenus = USER_CENTER_MENUS.COMMON;
    const roleSpecificMenus: any[] = [];

    // 根据用户角色添加特定菜单
    if (hasRole('SUPPLIER')) {
      roleSpecificMenus.push(...USER_CENTER_MENUS.SUPPLIER);
    }
    if (hasRole('PURCHASER')) {
      roleSpecificMenus.push(...USER_CENTER_MENUS.PURCHASER);
    }

    // 合并菜单并去重
    const allMenus = [...commonMenus, ...roleSpecificMenus];
    const uniqueMenus = allMenus.filter((menu, index, self) =>
      self.findIndex(m => m.id === menu.id) === index
    );

    return uniqueMenus;
  }, [hasRole]);

  // 获取用户拥有的角色（已批准的）
  const approvedRoles = useMemo(() => {
    if (!user) return [];
    return user.roles.filter(role => role.status === 'APPROVED').map(role => role.role);
  }, [user]);

  // 获取用户正在申请的角色
  const pendingRoles = useMemo(() => {
    if (!user) return [];
    return user.roles.filter(role => role.status === 'PENDING').map(role => role.role);
  }, [user]);

  // 角色状态图标
  const getRoleStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'REJECTED':
        return <XCircle size={16} className="text-red-500" />;
      case 'PENDING':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

  // 处理角色切换
  const handleRoleChange = (role: string) => {
    if (approvedRoles.includes(role as any)) {
      setActiveRole(role as any);
    }
  };

  // 如果没有用户数据，显示加载或空状态
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">请先登录</div>
          <p className="text-gray-600 mb-6">登录后查看个人中心</p>
          <div className="flex items-center justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 font-medium"
            >
              登录
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              注册
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 页面标题和角色切换器 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
          <div className="text-sm text-gray-500 mt-1">
            最后登录: 今天 14:30 • IP: 192.168.1.1
          </div>
        </div>

        {/* 角色切换器 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="text-sm text-gray-600">当前角色:</div>
          <div className="flex flex-wrap gap-2">
            {approvedRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeRole === role
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {USER_ROLES[role].label}
                {activeRole === role && (
                  <CheckCircle size={16} className="inline ml-2" />
                )}
              </button>
            ))}

            {pendingRoles.length > 0 && (
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                有 {pendingRoles.length} 个角色申请审核中
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左侧导航栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {Icon && <Icon size={20} />}
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* 用户信息卡片 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border p-6 mt-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.userName} className="w-16 h-16 rounded-full" />
                ) : (
                  <User size={32} className="text-green-600" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{user.nickname || user.userName}</h3>
                <p className="text-gray-600">{USER_ROLES[activeRole].label}</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">75%</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">再消费 ¥1,200 升级为钻石会员</p>
              </div>
            </div>

            {/* 角色状态 */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 mb-2">角色状态:</div>
              {user.roles.map((roleInfo, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{USER_ROLES[roleInfo.role].label}</span>
                  <div className="flex items-center gap-2">
                    {getRoleStatusIcon(roleInfo.status)}
                    <span className={roleInfo.status === 'APPROVED' ? 'text-green-600' :
                      roleInfo.status === 'REJECTED' ? 'text-red-600' : 'text-blue-600'}>
                      {ROLE_STATUS[roleInfo.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 退出登录按钮 */}
            <button
              onClick={() => {
                const { logout } = useAuthStore.getState();
                logout();
                window.location.href = '/';
              }}
              className="w-full mt-6 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 font-medium"
            >
              退出登录
            </button>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="lg:col-span-3">
          {/* 根据当前角色显示不同的欢迎信息 */}
          {activeRole === 'SUPPLIER' && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">供应商中心</h2>
              <p className="text-gray-600">
                欢迎回来！您有 <span className="font-bold text-blue-600">3</span> 个新订单，
                <span className="font-bold text-green-600"> 12</span> 条询盘等待回复。
              </p>
            </div>
          )}

          {activeRole === 'PURCHASER' && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">采购商中心</h2>
              <p className="text-gray-600">
                欢迎回来！您有 <span className="font-bold text-green-600">2</span> 个待付款订单，
                <span className="font-bold text-blue-600"> 5</span> 个采购需求等待报价。
              </p>
            </div>
          )}

          {activeRole === 'REGULAR' && (
            <div className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">普通用户中心</h2>
              <p className="text-gray-600">
                欢迎回来！升级为供应商或采购商可享受更多专属功能。
              </p>
            </div>
          )}

          {/* 选项卡内容 */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">个人资料</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      defaultValue={user.realName || user.userName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">手机号码</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      defaultValue={user.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      defaultValue={user.email || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      defaultValue={user.companyName || ''}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    保存修改
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">账户概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <div className="text-3xl font-bold text-green-700">¥12,580</div>
                    <p className="text-gray-600 mt-2">账户余额</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <div className="text-3xl font-bold text-blue-700">28</div>
                    <p className="text-gray-600 mt-2">进行中订单</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                    <div className="text-3xl font-bold text-purple-700">156</div>
                    <p className="text-gray-600 mt-2">收藏商品</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {activeRole === 'SUPPLIER' ? '销售订单' : '采购订单'}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">订单号</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">商品</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">金额</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">状态</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((order) => (
                      <tr key={order} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">ORD2023040{order}</td>
                        <td className="py-4 px-4">新鲜苹果 10吨</td>
                        <td className="py-4 px-4">¥{order === 1 ? '45,000' : order === 2 ? '32,000' : '28,500'}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${order === 1
                              ? 'bg-green-100 text-green-800'
                              : order === 2
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                            {order === 1 ? '已完成' : order === 2 ? '待发货' : '已发货'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-green-600 hover:text-green-800 font-medium">
                            查看详情
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">我的收藏</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-bold text-lg mb-2">优质大米 {item}号</h3>
                    <p className="text-gray-600 text-sm mb-2">产地：黑龙江五常</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-bold">¥{item === 1 ? '4,800' : item === 2 ? '5,200' : '4,500'}/吨</span>
                      <button className="text-red-500 hover:text-red-700">
                        取消收藏
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 其他选项卡的内容可以类似实现 */}
          {activeTab !== 'profile' && activeTab !== 'orders' && activeTab !== 'favorites' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600">此功能正在开发中，敬请期待...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalCenterPage;