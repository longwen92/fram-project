import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  CreditCard,
  MoreVertical,
  Download
} from 'lucide-react';
import clsx from 'clsx';

const OrdersManagementPage: React.FC = () => {
  const [orders] = useState([
    { id: 'ORD202604040001', buyer: '张三', seller: '李村农场', amount: '¥ 1,250.00', status: 'pending_payment', date: '2026-04-04 10:25', items: '红富士苹果 500斤' },
    { id: 'ORD202604040002', buyer: '永辉超市', seller: '王大伯果园', amount: '¥ 8,800.00', status: 'shipped', date: '2026-04-04 09:15', items: '阳光玫瑰葡萄 200斤' },
    { id: 'ORD202604030045', buyer: '王五', seller: '陈记蔬菜基地', amount: '¥ 450.00', status: 'completed', date: '2026-04-03 16:30', items: '本地大白菜 300斤' },
    { id: 'ORD202604030022', buyer: '盒马鲜生', seller: '刘氏水产', amount: '¥ 12,400.00', status: 'pending_shipment', date: '2026-04-03 14:20', items: '阳澄湖大闸蟹 50对' },
    { id: 'ORD202604020015', buyer: '李四', seller: '张家禽业', amount: '¥ 2,100.00', status: 'cancelled', date: '2026-04-02 11:10', items: '散养土鸡 30只' },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending_payment': return { label: '待付款', icon: CreditCard, color: 'bg-yellow-100 text-yellow-700' };
      case 'pending_shipment': return { label: '待发货', icon: Clock, color: 'bg-blue-100 text-blue-700' };
      case 'shipped': return { label: '已发货', icon: Truck, color: 'bg-indigo-100 text-indigo-700' };
      case 'completed': return { label: '已完成', icon: CheckCircle2, color: 'bg-green-100 text-green-700' };
      case 'cancelled': return { label: '已取消', icon: XCircle, color: 'bg-gray-100 text-gray-700' };
      default: return { label: '未知', icon: Clock, color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">订单管理</h1>
          <p className="text-text-secondary text-14 mt-1">监控平台所有交易流水，处理异常订单与售后申请。</p>
        </div>
        <button className="bg-white border border-border-primary text-text-secondary px-4 py-2 rounded-lg font-medium hover:bg-background-tertiary transition-all flex items-center gap-2">
          <Download size={18} /> 导出订单
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '今日成交额', value: '¥ 125,840', color: 'bg-brand-primary' },
          { label: '待发货订单', value: '42', color: 'bg-blue-500' },
          { label: '退款/售后', value: '3', color: 'bg-red-500' },
          { label: '累计订单量', value: '15,682', color: 'bg-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm">
            <p className="text-12 text-text-tertiary">{stat.label}</p>
            <p className="text-20 font-bold text-text-primary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索订单号、买家或卖家姓名..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none">
            <option value="">所有状态</option>
            <option value="pending_payment">待付款</option>
            <option value="pending_shipment">待发货</option>
            <option value="shipped">已发货</option>
            <option value="completed">已完成</option>
          </select>
          <button className="p-2 border border-border-primary rounded-lg hover:bg-background-tertiary">
            <Filter size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background-tertiary text-text-tertiary text-12 font-semibold uppercase">
                <th className="px-6 py-4">订单信息</th>
                <th className="px-6 py-4">买家/卖家</th>
                <th className="px-6 py-4">金额/时间</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <tr key={order.id} className="hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center text-text-placeholder">
                          <ClipboardList size={20} />
                        </div>
                        <div>
                          <p className="text-14 font-bold text-text-primary">{order.id}</p>
                          <p className="text-12 text-text-tertiary line-clamp-1">{order.items}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-14 text-text-primary"><span className="text-text-tertiary">买:</span> {order.buyer}</p>
                        <p className="text-14 text-text-primary"><span className="text-text-tertiary">卖:</span> {order.seller}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-14 font-bold text-agriculture-red">{order.amount}</p>
                        <p className="text-12 text-text-tertiary">{order.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-12 font-medium",
                        statusInfo.color
                      )}>
                        <statusInfo.icon size={14} />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-text-secondary hover:bg-background-tertiary rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border-secondary flex items-center justify-between">
          <p className="text-14 text-text-tertiary">显示 1 到 5 条，共 1,245 条记录</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white text-14 font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary text-text-secondary text-14">2</button>
            <button className="p-2 border border-border-primary rounded-lg text-text-secondary hover:bg-background-tertiary">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagementPage;
