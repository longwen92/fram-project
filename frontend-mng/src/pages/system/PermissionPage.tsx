import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Key, 
  ChevronRight, 
  ChevronDown, 
  ShieldAlert,
  Terminal,
  Layers,
  MoreVertical,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import clsx from 'clsx';

const PermissionPage: React.FC = () => {
  const [permissions] = useState([
    { 
      id: 1, name: '用户管理', code: 'user:manage', type: 'menu', status: 'active',
      children: [
        { id: 11, name: '用户查询', code: 'user:query', type: 'button', status: 'active' },
        { id: 12, name: '用户编辑', code: 'user:edit', type: 'button', status: 'active' },
        { id: 13, name: '用户删除', code: 'user:delete', type: 'button', status: 'active' },
      ]
    },
    { 
      id: 2, name: '商品管理', code: 'product:manage', type: 'menu', status: 'active',
      children: [
        { id: 21, name: '商品发布', code: 'product:add', type: 'button', status: 'active' },
        { id: 22, name: '商品审核', code: 'product:audit', type: 'button', status: 'active' },
      ]
    },
    { id: 3, name: '订单管理', code: 'order:manage', type: 'menu', status: 'active' },
    { id: 4, name: '系统管理', code: 'sys:manage', type: 'menu', status: 'active' },
  ]);

  const [expandedKeys, setExpandedKeys] = useState<number[]>([1, 2]);

  const toggleExpand = (id: number) => {
    setExpandedKeys(prev => 
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">权限管理</h1>
          <p className="text-text-secondary text-14 mt-1">管理系统所有的功能权限点，支持菜单、按钮及接口级别的权限控制。</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} /> 新增权限点
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索权限名称、标识编码..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background-tertiary text-text-tertiary text-12 font-semibold uppercase">
              <th className="px-6 py-4">权限名称</th>
              <th className="px-6 py-4">权限标识</th>
              <th className="px-6 py-4">类型</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {permissions.map((perm) => (
              <React.Fragment key={perm.id}>
                <tr className="hover:bg-background-secondary transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {perm.children ? (
                        <button 
                          onClick={() => toggleExpand(perm.id)}
                          className="p-1 hover:bg-background-tertiary rounded transition-colors text-text-placeholder"
                        >
                          {expandedKeys.includes(perm.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      ) : <span className="w-6" />}
                      <span className="text-14 font-bold text-text-primary">{perm.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-12 font-mono text-text-secondary bg-background-tertiary px-2 py-0.5 rounded border border-border-primary">{perm.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-12 font-medium bg-indigo-50 text-indigo-700">
                      <Layers size={14} /> 菜单权限
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-12 font-medium bg-green-100 text-green-700">启用</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"><Edit size={16} /></button>
                      <button className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 text-text-secondary hover:bg-background-tertiary rounded-lg transition-all"><Plus size={16} /></button>
                    </div>
                  </td>
                </tr>
                {perm.children && expandedKeys.includes(perm.id) && perm.children.map(sub => (
                  <tr key={sub.id} className="bg-background-tertiary/30 hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 pl-8">
                        <span className="w-4 h-px bg-border-primary" />
                        <span className="text-14 text-text-primary ml-1">{sub.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-12 font-mono text-text-tertiary px-2 py-0.5 rounded border border-border-primary border-dashed">{sub.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-12 font-medium bg-blue-50 text-blue-700">
                        <Terminal size={14} /> 按钮权限
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-12 font-medium bg-green-50 text-green-600">启用</span>
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

export default PermissionPage;
