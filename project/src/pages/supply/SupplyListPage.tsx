import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Truck, Calendar, ChevronDown, Grid, List } from 'lucide-react';
import ProductCard from '@/components/supply/ProductCard';
import FilterSidebar from '@/components/supply/FilterSidebar';
import Pagination from '@/components/common/Pagination';

const SupplyListPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    province: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    freeShipping: false,
  });
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: '1', name: '水果', count: 1284 },
    { id: '2', name: '蔬菜', count: 956 },
    { id: '3', name: '粮油', count: 743 },
    { id: '4', name: '水产', count: 512 },
    { id: '5', name: '畜禽', count: 689 },
    { id: '6', name: '茶叶', count: 327 },
    { id: '7', name: '中药材', count: 421 },
    { id: '8', name: '坚果', count: 298 },
  ];

  const provinces = [
    '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
    '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',
    '浙江省', '安徽省', '福建省', '江西省', '山东省',
  ];

  const sortOptions = [
    { value: 'default', label: '综合排序' },
    { value: 'price_asc', label: '价格从低到高' },
    { value: 'price_desc', label: '价格从高到低' },
    { value: 'sales', label: '销量优先' },
    { value: 'time', label: '最新发布' },
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // 重置到第一页
  };

  const handleSearch = () => {
    console.log('Search with filters:', filters);
    // 这里实际应该调用API
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      province: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      freeShipping: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">供应大厅</h1>
          <p className="text-lg opacity-90 max-w-3xl">
            发现全国优质农产品供应信息，连接产地与市场，助力农产品高效流通
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 筛选侧边栏 */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">筛选条件</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  清除所有
                </button>
              </div>

              {/* 搜索框 */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索商品、供应商..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.keyword}
                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  />
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>
              </div>

              {/* 分类筛选 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Filter size={18} className="mr-2" />
                  商品分类
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleFilterChange('category', category.id)}
                      className={`flex justify-between items-center w-full px-3 py-2 rounded-lg text-left ${filters.category === category.id ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 地区筛选 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <MapPin size={18} className="mr-2" />
                  地区
                </h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={filters.province}
                  onChange={(e) => handleFilterChange('province', e.target.value)}
                >
                  <option value="">全部地区</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {/* 价格筛选 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">价格区间</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="最低价"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <span className="self-center">-</span>
                  <input
                    type="number"
                    placeholder="最高价"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              {/* 其他筛选 */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                  <span className="ml-2">仅显示有货</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={filters.freeShipping}
                    onChange={(e) => handleFilterChange('freeShipping', e.target.checked)}
                  />
                  <span className="ml-2">仅显示包邮</span>
                </label>
              </div>
            </div>

            {/* 特色供应商 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold mb-4">优质供应商</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">优</span>
                    </div>
                    <div>
                      <div className="font-medium">山东果蔬合作社</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Star size={12} className="mr-1 text-yellow-500 fill-current" />
                        4.9 · 98%好评
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:w-3/4">
            {/* 工具栏 */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-2xl font-bold">农产品供应</div>
                  <div className="text-gray-600 mt-1">
                    共 <span className="font-semibold text-green-600">1,284</span> 条供应信息
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  {/* 排序选择 */}
                  <div className="relative">
                    <select
                      className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                  </div>

                  {/* 视图切换 */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-green-50 text-green-600' : 'bg-white'}`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 ${viewMode === 'list' ? 'bg-green-50 text-green-600' : 'bg-white'}`}
                    >
                      <List size={20} />
                    </button>
                  </div>

                  {/* 搜索按钮 */}
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    搜索
                  </button>
                </div>
              </div>
            </div>

            {/* 商品列表 */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <ProductCard key={i} viewMode={viewMode} />
              ))}
            </div>

            {/* 分页 */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* 快速导航 */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">找不到想要的？</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="text-green-600 font-bold mb-2">发布采购需求</div>
                  <div className="text-sm text-gray-600">让供应商主动联系您</div>
                </button>
                <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="text-green-600 font-bold mb-2">联系客服推荐</div>
                  <div className="text-sm text-gray-600">专业客服帮您匹配</div>
                </button>
                <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
                  <div className="text-green-600 font-bold mb-2">查看热门品类</div>
                  <div className="text-sm text-gray-600">发现更多商机</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyListPage;