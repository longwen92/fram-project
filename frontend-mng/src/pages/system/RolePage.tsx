import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  Users,
  Settings,
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import clsx from 'clsx';

const RolePage: React.FC = () => {
  const [roles] = useState([
    { id: 1, name: '超级管理员', code: 'SUPER_ADMIN', desc: '拥有系统所有权限，不可删除', status: 'active', userCount: 2, createTime: '2026-01-01' },
    { id: 2, name: '运营专员', code: 'OPERATOR', desc: '负责商品审核、订单处理、内容发布', status: 'active', userCount: 8, createTime: '2026-01-15' },
    { id: 3, name: '财务经理', code: 'FINANCE', desc: '负责平台资金结算、提现审核', status: 'active', userCount: 3, createTime: '2026-02-10' },
    { id: 4, name: '客服人员', code: 'CUSTOMER_SERVICE', desc: '负责用户咨询、纠纷仲裁', status: 'active', userCount: 12, createTime: '2026-02-20' },
    { id: 5, name: '测试账号', code: 'TESTER', desc: '仅供功能测试使用', status: 'inactive', userCount: 0, createTime: '2026-03-05' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">角色管理</h1>
          <p className="text-text-secondary text-14 mt-1">定义系统角色并分配功能权限，实现灵活的权限控制体系。</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} /> 新增角色
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索角色名称、编码..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
        <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none">
          <option value="">所有状态</option>
          <option value="active">启用</option>
          <option value="inactive">禁用</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background-tertiary text-text-tertiary text-12 font-semibold uppercase">
              <th className="px-6 py-4">角色名称</th>
              <th className="px-6 py-4">角色编码</th>
              <th className="px-6 py-4">关联用户数</th>
              <th className="px-6 py-4">描述</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-background-secondary transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                      <Shield size={18} />
                    </div>
                    <span className="text-14 font-bold text-text-primary">{role.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-12 font-mono text-text-secondary bg-background-tertiary px-2 py-0.5 rounded border border-border-primary">{role.code}</span>
                </td>
                <td className="px-6 py-4 text-14 text-text-primary flex items-center gap-2">
                  <Users size={16} className="text-text-placeholder" /> {role.userCount}
                </td>
                <td className="px-6 py-4 text-14 text-text-tertiary max-w-xs truncate">{role.desc}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-12 font-medium",
                    role.status === 'active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {role.status === 'active' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {role.status === 'active' ? '启用' : '禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="分配权限">
                      <Lock size={18} />
                    </button>
                    <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="编辑">
                      <Edit size={18} />
                    </button>
                    <button 
                      className={clsx(
                        "p-2 text-text-secondary transition-all",
                        role.code === 'SUPER_ADMIN' ? "opacity-30 cursor-not-allowed" : "hover:text-error hover:bg-red-50 rounded-lg"
                      )} 
                      disabled={role.code === 'SUPER_ADMIN'}
                      title="删除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-border-secondary flex items-center justify-between">
          <p className="text-14 text-text-tertiary">显示 1 到 5 条，共 12 条角色信息</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50" disabled><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white text-14 font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary text-text-secondary text-14">2</button>
            <button className="p-2 border border-border-primary rounded-lg text-text-secondary hover:bg-background-tertiary"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
