import React from 'react';
import {
    Users,
    Package,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Bell,
    Clock,
    ExternalLink
} from 'lucide-react';
import clsx from 'clsx';

const DashboardPage: React.FC = () => {
    const stats = [
        { label: '总用户数', value: '12,458', change: '+12.5%', trend: 'up', icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { label: '在售商品', value: '8,245', change: '+5.2%', trend: 'up', icon: Package, color: 'bg-green-50 text-green-600 border-green-100' },
        { label: '今日成交额', value: '¥ 125,840', change: '+18.4%', trend: 'up', icon: DollarSign, color: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' },
        { label: '待处理订单', value: '42', change: '-2.4%', trend: 'down', icon: Clock, color: 'bg-agriculture-gold/10 text-agriculture-gold border-agriculture-gold/20' },
    ];

    const recentActivities = [
        { id: 1, user: '张三', action: '上架了新商品', target: '阳光玫瑰葡萄', time: '10分钟前', status: 'completed' },
        { id: 2, user: '李四', action: '注册了新账号', target: '农户端', time: '25分钟前', status: 'new' },
        { id: 3, user: '王五', action: '申请了实名认证', target: '批发商角色', time: '45分钟前', status: 'pending' },
        { id: 4, user: '赵六', action: '完成了大宗交易', target: '20吨富士苹果', time: '1小时前', status: 'completed' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Page Title & Breadcrumb */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-24 font-bold text-text-primary">控制台概览</h1>
                    <p className="text-text-secondary text-14 mt-1">欢迎回来，这是您今日的业务数据概况。</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-border-primary rounded-lg text-14 font-medium text-text-secondary hover:bg-background-tertiary transition-colors flex items-center gap-2">
                        导出数据 <ExternalLink size={16} />
                    </button>
                    <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-14 font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all">
                        刷新数据
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-border-secondary shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center border", stat.color)}>
                                <stat.icon size={24} />
                            </div>
                            <div className={clsx(
                                "flex items-center gap-1 text-12 font-bold px-2 py-1 rounded-full",
                                stat.trend === 'up' ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                            )}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-text-tertiary text-14">{stat.label}</p>
                            <h3 className="text-24 font-bold text-text-primary mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border-secondary shadow-sm flex flex-col">
                    <div className="p-6 border-b border-border-secondary flex items-center justify-between">
                        <h3 className="text-18 font-bold text-text-primary">近期动态</h3>
                        <button className="text-14 text-brand-primary font-medium hover:underline">查看全部</button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-background-tertiary text-text-tertiary text-12 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">用户</th>
                                    <th className="px-6 py-4 font-semibold">动作</th>
                                    <th className="px-6 py-4 font-semibold">目标内容</th>
                                    <th className="px-6 py-4 font-semibold">时间</th>
                                    <th className="px-6 py-4 font-semibold">状态</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-secondary">
                                {recentActivities.map((activity) => (
                                    <tr key={activity.id} className="hover:bg-background-secondary transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-12">
                                                    {activity.user[0]}
                                                </div>
                                                <span className="text-14 font-medium text-text-primary">{activity.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-14 text-text-secondary">{activity.action}</td>
                                        <td className="px-6 py-4 text-14 text-text-primary font-medium">{activity.target}</td>
                                        <td className="px-6 py-4 text-14 text-text-tertiary">{activity.time}</td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-12 font-medium",
                                                activity.status === 'completed' ? "bg-green-100 text-green-700" :
                                                    activity.status === 'new' ? "bg-blue-100 text-blue-700" :
                                                        "bg-yellow-100 text-yellow-700"
                                            )}>
                                                {activity.status === 'completed' ? '已完成' : activity.status === 'new' ? '新加入' : '处理中'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions & System Info */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-border-secondary shadow-sm p-6">
                        <h3 className="text-18 font-bold text-text-primary mb-6">快捷操作</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border-secondary hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                    <Package size={20} />
                                </div>
                                <span className="text-14 font-medium text-text-secondary group-hover:text-brand-primary transition-colors">发布通知</span>
                            </button>
                            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border-secondary hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-agriculture-gold/10 text-agriculture-gold flex items-center justify-center group-hover:bg-agriculture-gold group-hover:text-white transition-colors">
                                    <ShoppingBag size={20} />
                                </div>
                                <span className="text-14 font-medium text-text-secondary group-hover:text-brand-primary transition-colors">大宗审核</span>
                            </button>
                            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border-secondary hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Users size={20} />
                                </div>
                                <span className="text-14 font-medium text-text-secondary group-hover:text-brand-primary transition-colors">实名审核</span>
                            </button>
                            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border-secondary hover:border-brand-primary hover:bg-brand-primary/5 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <Bell size={20} />
                                </div>
                                <span className="text-14 font-medium text-text-secondary group-hover:text-brand-primary transition-colors">系统预警</span>
                            </button>
                        </div>
                    </div>

                    {/* System Announcements */}
                    <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        <h3 className="text-16 font-bold text-brand-primary flex items-center gap-2 mb-4">
                            <Bell size={18} /> 系统公告
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/50 p-3 rounded-lg border border-white/50 hover:bg-white transition-colors cursor-pointer">
                                <p className="text-14 font-medium text-text-primary line-clamp-1">关于 2026 年清明节假期平台运营安排的通知</p>
                                <p className="text-12 text-text-tertiary mt-1">2026-04-01</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg border border-white/50 hover:bg-white transition-colors cursor-pointer">
                                <p className="text-14 font-medium text-text-primary line-clamp-1">冷链物流专区正式上线运营说明</p>
                                <p className="text-12 text-text-tertiary mt-1">2026-03-28</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 text-14 text-brand-primary font-bold hover:text-brand-dark transition-colors">查看更多公告</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
