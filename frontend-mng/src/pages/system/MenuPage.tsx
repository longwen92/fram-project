import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  LayoutGrid, 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  EyeOff,
  MoveVertical,
  MoreVertical,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import clsx from 'clsx';

const MenuPage: React.FC = () => {
  const [menus] = useState([
    { id: 1, name: '控制台', icon: 'LayoutDashboard', path: '/dashboard', component: 'dashboard/index', sort: 1, visible: true, status: 'active' },
    { 
      id: 2, name: '供应管理', icon: 'Package', path: '/supply', component: 'supply/index', sort: 2, visible: true, status: 'active',
      children: [
        { id: 21, name: '全部供应', icon: 'List', path: '/supply/list', component: 'supply/list', sort: 1, visible: true, status: 'active' },
        { id: 22, name: '发布供应', icon: 'Plus', path: '/supply/publish', component: 'supply/publish', sort: 2, visible: true, status: 'active' },
        { id: 23, name: '品类管理', icon: 'Tag', path: '/supply/category', component: 'supply/category', sort: 3, visible: true, status: 'active' },
      ]
    },
    { id: 3, name: '用户管理', icon: 'Users', path: '/users', component: 'users/index', sort: 3, visible: true, status: 'active' },
    { id: 4, name: '订单管理', icon: 'ClipboardList', path: '/orders', component: 'orders/index', sort: 4, visible: true, status: 'active' },
    { id: 5, name: '系统管理', icon: 'Settings', path: '/system', component: 'system/index', sort: 5, visible: true, status: 'active' },
  ]);

  const [expandedKeys, setExpandedKeys] = useState<number[]>([2]);

  const toggleExpand = (id: number) => {
    setExpandedKeys(prev => 
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">菜单管理</h1>
          <p className="text-text-secondary text-14 mt-1">自定义系统侧边栏导航菜单，包括名称、图标、路径及组件映射。</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} /> 新增菜单
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm">
        <div className="relative group max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索菜单名称、路径..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background-tertiary text-text-tertiary text-12 font-semibold uppercase">
              <th className="px-6 py-4">菜单名称</th>
              <th className="px-6 py-4">图标</th>
              <th className="px-6 py-4">路由地址</th>
              <th className="px-6 py-4">排序</th>
              <th className="px-6 py-4">可见</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {menus.map((menu) => (
              <React.Fragment key={menu.id}>
                <tr className="hover:bg-background-secondary transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {menu.children ? (
                        <button 
                          onClick={() => toggleExpand(menu.id)}
                          className="p-1 hover:bg-background-tertiary rounded transition-colors text-text-placeholder"
                        >
                          {expandedKeys.includes(menu.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      ) : <span className="w-6" />}
                      <span className="text-14 font-bold text-text-primary">{menu.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded bg-background-tertiary flex items-center justify-center text-text-secondary border border-border-primary">
                      <LayoutGrid size={16} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-12 font-mono text-text-tertiary">{menu.path}</span>
                  </td>
                  <td className="px-6 py-4 text-14 text-text-primary">{menu.sort}</td>
                  <td className="px-6 py-4">
                    {menu.visible ? <Eye size={18} className="text-brand-primary" /> : <EyeOff size={18} className="text-text-placeholder" />}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"><Edit size={16} /></button>
                      <button className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 text-text-secondary hover:bg-background-tertiary rounded-lg transition-all"><Plus size={16} /></button>
                    </div>
                  </td>
                </tr>
                {menu.children && expandedKeys.includes(menu.id) && menu.children.map(sub => (
                  <tr key={sub.id} className="bg-background-tertiary/30 hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 pl-8">
                        <span className="w-4 h-px bg-border-primary" />
                        <span className="text-14 text-text-primary ml-1">{sub.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-text-tertiary border border-border-primary">
                        <LayoutGrid size={14} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-12 font-mono text-text-tertiary italic">{sub.path}</span>
                    </td>
                    <td className="px-6 py-4 text-14 text-text-secondary">{sub.sort}</td>
                    <td className="px-6 py-4">
                      {sub.visible ? <Eye size={16} className="text-brand-primary/70" /> : <EyeOff size={16} className="text-text-placeholder" />}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-text-secondary hover:text-brand-primary transition-all"><Edit size={16} /></button>
                        <button className="p-2 text-text-secondary hover:text-error transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuPage;
