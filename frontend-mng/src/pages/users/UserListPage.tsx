import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Mail,
    Phone,
    Shield,
    UserCheck,
    UserX,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Clock
} from 'lucide-react';
import clsx from 'clsx';

const UserListPage: React.FC = () => {
    const [users] = useState([
        { id: 1, name: '张三', role: '农户', phone: '138****8888', email: 'zhangsan@example.com', status: 'active', joinDate: '2026-01-15' },
        { id: 2, name: '李四', role: '批发商', phone: '139****9999', email: 'lisi@example.com', status: 'active', joinDate: '2026-02-10' },
        { id: 3, name: '王五', role: '农户', phone: '137****7777', email: 'wangwu@example.com', status: 'inactive', joinDate: '2026-02-20' },
        { id: 4, name: '赵六', role: '批发商', phone: '136****6666', email: 'zhaoliu@example.com', status: 'active', joinDate: '2026-03-05' },
        { id: 5, name: '孙七', role: '采购商', phone: '135****5555', email: 'sunqi@example.com', status: 'pending', joinDate: '2026-03-12' },
    ]);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-24 font-bold text-text-primary">用户管理</h1>
                    <p className="text-text-secondary text-14 mt-1">管理平台所有注册用户及其权限设置。</p>
                </div>
                <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2 w-fit">
                    <Plus size={18} /> 新增用户
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="搜索用户名、手机号或邮箱..."
                        className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary transition-all cursor-pointer">
                        <option value="">所有角色</option>
                        <option value="farmer">农户</option>
                        <option value="wholesaler">批发商</option>
                        <option value="buyer">采购商</option>
                    </select>
                    <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary transition-all cursor-pointer">
                        <option value="">所有状态</option>
                        <option value="active">正常</option>
                        <option value="inactive">禁用</option>
                        <option value="pending">待审核</option>
                    </select>
                    <button className="p-2 border border-border-primary rounded-lg hover:bg-background-tertiary transition-colors text-text-secondary">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-background-tertiary text-text-tertiary text-12 uppercase font-semibold">
                                <th className="px-6 py-4 border-b border-border-secondary">用户信息</th>
                                <th className="px-6 py-4 border-b border-border-secondary">角色</th>
                                <th className="px-6 py-4 border-b border-border-secondary">联系方式</th>
                                <th className="px-6 py-4 border-b border-border-secondary">加入时间</th>
                                <th className="px-6 py-4 border-b border-border-secondary">状态</th>
                                <th className="px-6 py-4 border-b border-border-secondary text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-secondary">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-background-secondary transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-16">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-14 font-bold text-text-primary">{user.name}</p>
                                                <p className="text-12 text-text-tertiary">ID: {user.id.toString().padStart(6, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-12 font-medium bg-blue-50 text-blue-700">
                                            <Shield size={14} /> {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-12 text-text-secondary">
                                                <Phone size={14} className="text-text-placeholder" /> {user.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-12 text-text-secondary">
                                                <Mail size={14} className="text-text-placeholder" /> {user.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-14 text-text-secondary">{user.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-12 font-medium",
                                            user.status === 'active' ? "bg-green-100 text-green-700" :
                                                user.status === 'inactive' ? "bg-red-100 text-red-700" :
                                                    "bg-yellow-100 text-yellow-700"
                                        )}>
                                            {user.status === 'active' ? <UserCheck size={14} /> : user.status === 'inactive' ? <UserX size={14} /> : <Clock size={14} />}
                                            {user.status === 'active' ? '正常' : user.status === 'inactive' ? '已禁用' : '待审核'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="编辑">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-all" title="删除">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-2 text-text-secondary hover:bg-background-tertiary rounded-lg transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border-secondary flex items-center justify-between">
                    <p className="text-14 text-text-tertiary">显示 1 到 5 条，共 12,458 条记录</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-border-primary rounded-lg text-text-placeholder hover:bg-background-tertiary disabled:opacity-50" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white text-14 font-bold shadow-md">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary text-text-secondary text-14 font-medium">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary text-text-secondary text-14 font-medium">3</button>
                        <span className="text-text-placeholder px-1">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary text-text-secondary text-14 font-medium">2492</button>
                        <button className="p-2 border border-border-primary rounded-lg text-text-secondary hover:bg-background-tertiary">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListPage;
