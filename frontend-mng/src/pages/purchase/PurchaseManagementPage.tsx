import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin,
  MoreVertical,
  Plus,
  Trash2,
  Tag,
  AlertTriangle,
  DollarSign
} from 'lucide-react';
import clsx from 'clsx';

const PurchaseManagementPage: React.FC = () => {
  const [purchases] = useState([
    { id: 1, name: '优质红富士苹果', category: '水果', budget: '¥ 4.0-5.0/斤', quantity: '50吨', origin: '不限', buyer: '永辉超市', status: 'active', date: '2026-04-04 10:25', urgent: true },
    { id: 2, name: '新鲜西兰花', category: '蔬菜', budget: '¥ 2.5-3.0/斤', quantity: '10吨', origin: '山东省', buyer: '百果园', status: 'active', date: '2026-04-04 09:15', urgent: false },
    { id: 3, name: '散养土鸡蛋', category: '禽畜', budget: '¥ 1.2-1.4/枚', quantity: '50000枚', origin: '湖南省', buyer: '每日优鲜', status: 'review_pending', date: '2026-04-03 16:30', urgent: true },
    { id: 4, name: '长粒香大米', category: '粮油', budget: '¥ 3.5-4.0/斤', quantity: '100吨', origin: '黑龙江', buyer: '中粮集团', status: 'active', date: '2026-04-03 14:20', urgent: false },
    { id: 5, name: '冷冻黑猪肉', category: '禽畜', budget: '¥ 20-22/斤', quantity: '5吨', origin: '不限', buyer: '双汇发展', status: 'closed', date: '2026-04-02 11:10', urgent: false },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active': return { label: '进行中', icon: CheckCircle2, color: 'bg-green-100 text-green-700' };
      case 'review_pending': return { label: '待审核', icon: Clock, color: 'bg-blue-100 text-blue-700' };
      case 'closed': return { label: '已关闭', icon: XCircle, color: 'bg-gray-100 text-gray-700' };
      case 'urgent': return { label: '急购', icon: AlertTriangle, color: 'bg-red-100 text-red-700' };
      default: return { label: '未知', icon: Clock, color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">采购管理</h1>
          <p className="text-text-secondary text-14 mt-1">管理平台所有采购需求，协助大宗交易撮合与供应商匹配。</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2 w-fit">
          <Plus size={18} /> 发布采购需求
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4 border-l-4 border-l-brand-primary">
          <div className="w-12 h-12 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-12 text-text-tertiary">活动中采购</p>
            <p className="text-20 font-bold text-text-primary">1,245</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-12 text-text-tertiary">紧急采购项</p>
            <p className="text-20 font-bold text-red-600">86</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-12 text-text-tertiary">今日报价数</p>
            <p className="text-20 font-bold text-blue-600">562</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索采购标题、买家名称或期望产地..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none">
            <option value="">所有分类</option>
            <option value="fruit">水果</option>
            <option value="veg">蔬菜</option>
            <option value="meat">禽畜</option>
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
                <th className="px-6 py-4">采购需求</th>
                <th className="px-6 py-4">预算/数量</th>
                <th className="px-6 py-4">采购商/时间</th>
                <th className="px-6 py-4">期望产地</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {purchases.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                return (
                  <tr key={item.id} className="hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center text-text-placeholder border border-border-secondary relative">
                          <ShoppingCart size={20} />
                          {item.urgent && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div>
                          <p className="text-14 font-bold text-text-primary">{item.name}</p>
                          <p className="text-12 text-text-tertiary">ID: {item.id.toString().padStart(6, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-14 font-bold text-agriculture-red">{item.budget}</p>
                        <p className="text-12 text-text-secondary">需求量: {item.quantity}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-14 text-text-primary">{item.buyer}</p>
                        <p className="text-12 text-text-tertiary">{item.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-14 text-text-secondary flex items-center gap-1">
                        <MapPin size={14} className="text-text-placeholder" /> {item.origin}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-12 font-medium",
                        item.urgent && item.status === 'active' ? getStatusInfo('urgent').color : statusInfo.color
                      )}>
                        {item.urgent && item.status === 'active' ? <AlertTriangle size={14} /> : <statusInfo.icon size={14} />}
                        {item.urgent && item.status === 'active' ? '急购中' : statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="查看报价">
                          <DollarSign size={18} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="编辑">
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
          <p className="text-14 text-text-tertiary">显示 1 到 5 条，共 342 条记录</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white text-14 font-bold">1</button>
            <button className="p-2 border border-border-primary rounded-lg text-text-secondary hover:bg-background-tertiary">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseManagementPage;
