import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  Tag, 
  Image as ImageIcon,
  MoreVertical,
  ChevronLeft
} from 'lucide-react';
import clsx from 'clsx';

const CategoryPage: React.FC = () => {
  const [categories] = useState([
    { 
      id: 1, name: '水果', icon: '🍎', code: 'FRUIT', level: 1, status: 'active', count: 1284,
      children: [
        { id: 11, name: '苹果', icon: '🍎', code: 'APPLE', level: 2, status: 'active', count: 420 },
        { id: 12, name: '柑橘', icon: '🍊', code: 'CITRUS', level: 2, status: 'active', count: 350 },
        { id: 13, name: '葡萄', icon: '🍇', code: 'GRAPE', level: 2, status: 'active', count: 514 },
      ]
    },
    { 
      id: 2, name: '蔬菜', icon: '🥬', code: 'VEGETABLE', level: 1, status: 'active', count: 956,
      children: [
        { id: 21, name: '叶菜类', icon: '🥬', code: 'LEAFY', level: 2, status: 'active', count: 320 },
        { id: 22, name: '根茎类', icon: '🥕', code: 'ROOT', level: 2, status: 'active', count: 280 },
        { id: 23, name: '瓜果类', icon: '🍅', code: 'MELON', level: 2, status: 'active', count: 356 },
      ]
    },
    { id: 3, name: '禽畜', icon: '🥩', code: 'MEAT', level: 1, status: 'active', count: 689 },
    { id: 4, name: '粮油', icon: '🌾', code: 'GRAIN', level: 1, status: 'active', count: 743 },
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
          <h1 className="text-24 font-bold text-text-primary">品类管理</h1>
          <p className="text-text-secondary text-14 mt-1">管理农产品多级分类体系，包括分类图标、排序及状态设置。</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} /> 新增分类
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="搜索分类名称、编码..." 
            className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 text-text-secondary hover:bg-background-secondary transition-colors">
            展开全部
          </button>
          <button className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 text-text-secondary hover:bg-background-secondary transition-colors">
            收起全部
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background-tertiary text-text-tertiary text-12 font-semibold uppercase">
              <th className="px-6 py-4">分类名称</th>
              <th className="px-6 py-4">分类编码</th>
              <th className="px-6 py-4">层级</th>
              <th className="px-6 py-4">商品数量</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {categories.map((cat) => (
              <React.Fragment key={cat.id}>
                <tr className="hover:bg-background-secondary transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {cat.children ? (
                        <button 
                          onClick={() => toggleExpand(cat.id)}
                          className="p-1 hover:bg-background-tertiary rounded transition-colors text-text-placeholder"
                        >
                          {expandedKeys.includes(cat.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      ) : <span className="w-6" />}
                      <span className="text-18">{cat.icon}</span>
                      <span className="text-14 font-bold text-text-primary ml-1">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-12 font-mono text-text-secondary bg-background-tertiary px-2 py-0.5 rounded border border-border-primary">{cat.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-12 text-text-tertiary">一级分类</span>
                  </td>
                  <td className="px-6 py-4 text-14 text-text-primary">{cat.count}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-12 font-medium bg-green-100 text-green-700">正常</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"><Edit size={16} /></button>
                      <button className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 text-text-secondary hover:bg-background-tertiary rounded-lg transition-all"><Plus size={16} /></button>
                    </div>
                  </td>
                </tr>
                {cat.children && expandedKeys.includes(cat.id) && cat.children.map(sub => (
                  <tr key={sub.id} className="bg-background-tertiary/30 hover:bg-background-secondary transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 pl-8">
                        <span className="w-4 h-px bg-border-primary" />
                        <span className="text-16">{sub.icon}</span>
                        <span className="text-14 text-text-primary ml-1">{sub.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-12 font-mono text-text-tertiary px-2 py-0.5 rounded border border-border-primary border-dashed">{sub.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-12 text-text-tertiary">二级分类</span>
                    </td>
                    <td className="px-6 py-4 text-14 text-text-secondary">{sub.count}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-12 font-medium bg-green-50 text-green-600">正常</span>
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
        <div className="p-4 border-t border-border-secondary flex items-center justify-between">
          <p className="text-14 text-text-tertiary">共 {categories.length} 个一级分类，{categories.reduce((acc, curr) => acc + (curr.children?.length || 0), 0)} 个二级分类</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50" disabled><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-primary text-white text-14 font-bold">1</button>
            <button className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50" disabled><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
