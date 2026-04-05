import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  Plus,
  Trash2,
  Tag
} from 'lucide-react';
import clsx from 'clsx';

const ContentManagementPage: React.FC = () => {
  const [news] = useState([
    { id: 1, title: '2024年农产品市场趋势分析：绿色有机产品需求持续增长', category: '市场分析', author: '张农业', date: '2024-03-15 14:30', views: 1248, status: 'published' },
    { id: 2, title: '有机农业认证标准解读与申请指南', category: '政策解读', author: '李政策', date: '2024-03-14 10:15', views: 842, status: 'published' },
    { id: 3, title: '农产品电商运营实战：如何通过直播提升销量', category: '电商运营', author: '王电商', date: '2024-03-13 16:45', views: 1563, status: 'published' },
    { id: 4, title: '2024年春季种植结构调整建议', category: '种植技术', author: '赵技术员', date: '2024-03-12 09:20', views: 723, status: 'review_pending' },
    { id: 5, title: '关于 2026 年清明节假期平台运营安排的通知', category: '平台公告', author: '系统管理员', date: '2026-04-01 11:30', views: 521, status: 'published' },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published': return { label: '已发布', icon: CheckCircle2, color: 'bg-green-100 text-green-700' };
      case 'review_pending': return { label: '待审核', icon: Clock, color: 'bg-blue-100 text-blue-700' };
      case 'draft': return { label: '草稿', icon: FileText, color: 'bg-gray-100 text-gray-700' };
      case 'rejected': return { label: '驳回', icon: XCircle, color: 'bg-red-100 text-red-700' };
      default: return { label: '未知', icon: AlertCircle, color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-24 font-bold text-text-primary">内容管理</h1>
          <p className="text-text-secondary text-14 mt-1">发布与管理平台资讯、市场分析、政策解读及系统公告。</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2 w-fit">
          <Plus size={18} /> 发布内容
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-secondary">
        <button className="px-6 py-3 text-14 font-bold text-brand-primary border-b-2 border-brand-primary">全部内容</button>
        <button className="px-6 py-3 text-14 font-medium text-text-tertiary hover:text-brand-primary transition-colors">资讯文章</button>
        <button className="px-6 py-3 text-14 font-medium text-text-tertiary hover:text-brand-primary transition-colors">系统公告</button>
        <button className="px-6 py-3 text-14 font-medium text-text-tertiary hover:text-brand-primary transition-colors">广告轮播</button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索文章标题、作者或关键词..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none">
            <option value="">所有分类</option>
            <option value="market">市场分析</option>
            <option value="policy">政策解读</option>
            <option value="tech">种植技术</option>
            <option value="announcement">系统公告</option>
          </select>
          <button className="p-2 border border-border-primary rounded-lg hover:bg-background-tertiary transition-colors">
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
                <th className="px-6 py-4">内容标题</th>
                <th className="px-6 py-4">分类/作者</th>
                <th className="px-6 py-4">发布时间</th>
                <th className="px-6 py-4">数据统计</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {news.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                return (
                  <tr key={item.id} className="hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4 max-w-xs xl:max-w-md">
                      <p className="text-14 font-bold text-text-primary line-clamp-1">{item.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 text-12 font-medium text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                          <Tag size={12} /> {item.category}
                        </span>
                        <p className="text-12 text-text-tertiary">{item.author}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-14 text-text-secondary">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-14 text-text-secondary">
                        <Eye size={16} className="text-text-placeholder" /> {item.views}
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
                        <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="查看">
                          <Eye size={18} />
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border-secondary flex items-center justify-between">
          <p className="text-14 text-text-tertiary">显示 1 到 5 条，共 156 条记录</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white text-14 font-bold shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary text-text-secondary text-14 font-medium">2</button>
            <button className="p-2 border border-border-primary rounded-lg text-text-secondary hover:bg-background-tertiary">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
