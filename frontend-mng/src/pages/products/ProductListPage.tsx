import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Plus,
    ShoppingBag,
    Package,
    Tag,
    MapPin,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Clock,
    Loader2
} from 'lucide-react';
import clsx from 'clsx';
import { listProducts } from '@/api/product';

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [queryParams, setQueryParams] = useState({
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        category: '',
        status: ''
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await listProducts(queryParams);
            setProducts(res.data.list);
            setTotal(res.data.total);
        } catch (err) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [queryParams.pageNum, queryParams.pageSize]);

    const handleSearch = () => {
        setQueryParams({ ...queryParams, pageNum: 1 });
        fetchProducts();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-24 font-bold text-text-primary">商品管理</h1>
                    <p className="text-text-secondary text-14 mt-1">管理平台所有在售商品，包括库存预警与上架审核。</p>
                </div>
                <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2 w-fit">
                    <Plus size={18} /> 发布新商品
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-12 text-text-tertiary">总商品数</p>
                        <p className="text-20 font-bold text-text-primary">8,245</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-agriculture-gold/10 text-agriculture-gold flex items-center justify-center">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-12 text-text-tertiary">库存预警</p>
                        <p className="text-20 font-bold text-agriculture-gold">12</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-12 text-text-tertiary">待审核商品</p>
                        <p className="text-20 font-bold text-blue-600">42</p>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-border-secondary shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="搜索商品名称、编号或产地..."
                        className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary transition-all cursor-pointer">
                        <option value="">所有分类</option>
                        <option value="fruit">新鲜水果</option>
                        <option value="veg">时令蔬菜</option>
                        <option value="meat">禽畜肉类</option>
                        <option value="grain">粮油干货</option>
                    </select>
                    <select className="px-4 py-2 bg-background-tertiary border border-border-primary rounded-lg text-14 outline-none focus:border-brand-primary transition-all cursor-pointer">
                        <option value="">所有状态</option>
                        <option value="published">已发布</option>
                        <option value="out_of_stock">缺货</option>
                        <option value="review_pending">待审核</option>
                    </select>
                    <button className="p-2 border border-border-primary rounded-lg hover:bg-background-tertiary transition-colors text-text-secondary">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-border-secondary shadow-sm overflow-hidden relative min-h-[400px]">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
                        <Loader2 className="animate-spin text-brand-primary" size={32} />
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-background-tertiary text-text-tertiary text-12 uppercase font-semibold">
                                <th className="px-6 py-4 border-b border-border-secondary">商品详情</th>
                                <th className="px-6 py-4 border-b border-border-secondary">分类/价格</th>
                                <th className="px-6 py-4 border-b border-border-secondary">库存/产地</th>
                                <th className="px-6 py-4 border-b border-border-secondary">最后更新</th>
                                <th className="px-6 py-4 border-b border-border-secondary">状态</th>
                                <th className="px-6 py-4 border-b border-border-secondary text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-secondary">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-background-secondary transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-background-tertiary flex items-center justify-center border border-border-secondary">
                                                <ShoppingBag className="text-text-placeholder" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-14 font-bold text-text-primary">{product.name}</p>
                                                <p className="text-12 text-text-tertiary">No. {product.id.toString().padStart(8, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <span className="inline-flex items-center gap-1 text-12 font-medium text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                                                <Tag size={12} /> {product.category}
                                            </span>
                                            <p className="text-14 font-bold text-agriculture-red">{product.price}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className={clsx(
                                                "text-14 font-medium",
                                                product.stock < 100 ? "text-error" : "text-text-primary"
                                            )}>
                                                库存: {product.stock}
                                            </p>
                                            <p className="text-12 text-text-tertiary flex items-center gap-1">
                                                <MapPin size={12} /> {product.origin}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-14 text-text-secondary">{product.updateDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-12 font-medium",
                                            product.status === 'published' ? "bg-green-100 text-green-700" :
                                                product.status === 'out_of_stock' ? "bg-red-100 text-red-700" :
                                                    "bg-blue-100 text-blue-700"
                                        )}>
                                            {product.status === 'published' ? <CheckCircle2 size={14} /> : product.status === 'out_of_stock' ? <XCircle size={14} /> : <Clock size={14} />}
                                            {product.status === 'published' ? '已上架' : product.status === 'out_of_stock' ? '缺货' : '审核中'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="查看详情">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="编辑">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-all" title="删除">
                                                <Trash2 size={18} />
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
                    <p className="text-14 text-text-tertiary">共 {total} 条记录</p>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 border border-border-primary rounded-lg text-text-placeholder disabled:opacity-50"
                            disabled={queryParams.pageNum <= 1}
                            onClick={() => setQueryParams({ ...queryParams, pageNum: queryParams.pageNum - 1 })}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="text-14 font-medium text-text-primary px-2">第 {queryParams.pageNum} 页</span>
                        <button
                            className="p-2 border border-border-primary rounded-lg text-text-secondary hover:bg-background-tertiary disabled:opacity-50"
                            disabled={products.length < queryParams.pageSize}
                            onClick={() => setQueryParams({ ...queryParams, pageNum: queryParams.pageNum + 1 })}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
