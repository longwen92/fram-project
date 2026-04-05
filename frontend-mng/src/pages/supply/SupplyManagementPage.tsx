import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin,
  MoreVertical,
  Plus,
  Trash2,
  Tag,
  Truck
} from 'lucide-react';
import clsx from 'clsx';

const SupplyManagementPage: React.FC = () => {
  const [supplies] = useState([
    { id: 1, name: '红富士苹果', category: '水果', price: '¥ 4.5/斤', stock: '5000斤', origin: '陕西省洛川县', seller: '洛川果业', status: 'published', date: '2026-04-04 10:25' },
    { id: 2, name: '阳光玫瑰葡萄', category: '水果', price: '¥ 12.5/斤', stock: '1200斤', origin: '湖南省邵阳市', seller: '李村农场', status: 'published', date: '2026-04-04 09:15' },
    { id: 3, name: '赣南脐橙', category: '水果', price: '¥ 8.8/斤', stock: '8000斤', origin: '江西省赣州市', seller: '赣南合作社', status: 'review_pending', date: '2026-04-03 16:30' },
    { id: 4, name: '本地土鸡蛋', category: '禽畜', price: '¥ 1.5/枚', stock: '500枚', origin: '湖南省长沙市', seller: '张家禽业', status: 'published', date: '2026-04-03 14:20' },
    { id: 5, name: '黑猪五花肉', category: '禽畜', price: '¥ 25.8/斤', stock: '100斤', origin: '四川省巴中市', seller: '巴中黑猪养殖场', status: 'out_of_stock', date: '2026-04-02 11:10' },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published': return { label: '已发布', icon: CheckCircle2, color: 'bg-green-100 text-green-700' };
      case 'review_pending': return { label: '审核中', icon: Clock, color: 'bg-blue-100 text-blue-700' };
      case 'out_of_stock': return { label: '缺货', icon: XCircle, color: 'bg-red-100 text-red-700' };
      case 'off_shelf': return { label: '已下架', icon: Tag, color: 'bg-gray-100 text-gray-700' };
      default: return { label: '未知', icon: Clock, color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">供应管理</h1>
          <p className="text-text-secondary text-14 mt-1">管理平台所有在售农产品供应信息，监控货源与价格波动。</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border-primary text-text-secondary px-4 py-2 rounded-lg font-medium hover:bg-background-tertiary transition-all flex items-center gap-2">
            价格监控
          </button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2 w-fit">
            <Plus size={18} /> 新增供应
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <p className="text-12 text-text-tertiary">总供应项</p>
            <p className="text-20 font-bold text-text-primary">8,245</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-12 text-text-tertiary">今日新增</p>
            <p className="text-20 font-bold text-blue-600">156</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-agriculture-gold/10 text-agriculture-gold flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-12 text-text-tertiary">待审核</p>
            <p className="text-20 font-bold text-agriculture-gold">42</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索商品名称、产地或供应商..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none">
            <option value="">所有分类</option>
            <option value="fruit">水果</option>
            <option value="veg">蔬菜</option>
            <option value="meat">禽畜</option>
            <option value="grain">粮油</option>
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
                <th className="px-6 py-4">供应商品</th>
                <th className="px-6 py-4">分类/价格</th>
                <th className="px-6 py-4">库存/产地</th>
                <th className="px-6 py-4">供应商/时间</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {supplies.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                return (
                  <tr key={item.id} className="hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center text-text-placeholder border border-border-secondary">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-14 font-bold text-text-primary">{item.name}</p>
                          <p className="text-12 text-text-tertiary">ID: {item.id.toString().padStart(6, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 text-12 font-medium text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                          <Tag size={12} /> {item.category}
                        </span>
                        <p className="text-14 font-bold text-agriculture-red">{item.price}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-14 text-text-primary">{item.stock}</p>
                        <p className="text-12 text-text-tertiary flex items-center gap-1">
                          <MapPin size={12} /> {item.origin}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-14 text-text-primary">{item.seller}</p>
                        <p className="text-12 text-text-tertiary">{item.date}</p>
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
                        <button className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={18} />
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
          <p className="text-14 text-text-tertiary">显示 1 到 5 条，共 8,245 条记录</p>
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

export default SupplyManagementPage;
