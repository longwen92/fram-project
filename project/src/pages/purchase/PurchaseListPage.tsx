import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Calendar, ChevronDown, Grid, List, Package } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

const PurchaseListPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    province: '',
    minBudget: '',
    maxBudget: '',
    urgent: false,
    hasQuotes: false,
  });
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: '1', name: '水果', count: 342 },
    { id: '2', name: '蔬菜', count: 278 },
    { id: '3', name: '粮油', count: 156 },
    { id: '4', name: '水产', count: 89 },
    { id: '5', name: '畜禽', count: 124 },
    { id: '6', name: '茶叶', count: 67 },
    { id: '7', name: '中药材', count: 92 },
    { id: '8', name: '坚果', count: 54 },
  ];

  const provinces = [
    '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
    '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',
    '浙江省', '安徽省', '福建省', '江西省', '山东省',
  ];

  const sortOptions = [
    { value: 'default', label: '综合排序' },
    { value: 'budget_asc', label: '预算从低到高' },
    { value: 'budget_desc', label: '预算从高到低' },
    { value: 'urgent', label: '紧急采购优先' },
    { value: 'time', label: '最新发布' },
    { value: 'deadline', label: '截止时间最近' },
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const handleSearch = () => {
    console.log('Search with filters:', filters);
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      province: '',
      minBudget: '',
      maxBudget: '',
      urgent: false,
      hasQuotes: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">采购需求大厅</h1>
          <p className="text-lg opacity-90 max-w-3xl">
            发现全国农产品采购需求，为您的产品寻找精准买家，提升销售效率
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
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  清除所有
                </button>
              </div>

              {/* 搜索框 */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索采购需求、采购商..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  采购品类
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleFilterChange('category', category.id)}
                      className={`flex justify-between items-center w-full px-3 py-2 rounded-lg text-left ${filters.category === category.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
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
                  采购地区
                </h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* 预算筛选 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <DollarSign size={18} className="mr-2" />
                  预算范围（万元）
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="最低预算"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.minBudget}
                    onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                  />
                  <span className="self-center">-</span>
                  <input
                    type="number"
                    placeholder="最高预算"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.maxBudget}
                    onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                  />
                </div>
              </div>

              {/* 其他筛选 */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={filters.urgent}
                    onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                  />
                  <span className="ml-2">仅显示紧急采购</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={filters.hasQuotes}
                    onChange={(e) => handleFilterChange('hasQuotes', e.target.checked)}
                  />
                  <span className="ml-2">仅显示已报价需求</span>
                </label>
              </div>
            </div>

            {/* 快速发布采购 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm p-6 border border-blue-100">
              <h3 className="font-bold mb-4 text-blue-800">发布采购需求</h3>
              <p className="text-sm text-gray-600 mb-4">
                找不到合适供应？发布您的采购需求，让供应商主动联系您
              </p>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                发布采购需求
              </button>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:w-3/4">
            {/* 工具栏 */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-2xl font-bold">采购需求</div>
                  <div className="text-gray-600 mt-1">
                    共 <span className="font-semibold text-blue-600">892</span> 条采购需求
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  {/* 排序选择 */}
                  <div className="relative">
                    <select
                      className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white'}`}
                    >
                      <List size={20} />
                    </button>
                  </div>

                  {/* 搜索按钮 */}
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    搜索
                  </button>
                </div>
              </div>
            </div>

            {/* 采购需求列表 */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6' : 'space-y-6'}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {i % 3 === 0 ? '紧急采购' : i % 3 === 1 ? '长期采购' : '招标采购'}
                        </span>
                        {i % 4 === 0 && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            已报价
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        采购优质苹果 {i}0吨
                      </h3>
                      <p className="text-gray-600">用于商超供应，要求品质优良，规格统一</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-700">¥{i === 1 ? '45' : i === 2 ? '68' : i === 3 ? '32' : i === 4 ? '85' : i === 5 ? '56' : '72'}万</div>
                      <div className="text-sm text-gray-500">预算</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center">
                      <Package size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">数量</div>
                        <div className="font-medium">{i}0吨</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">收货地</div>
                        <div className="font-medium">北京市</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">截止时间</div>
                        <div className="font-medium">2024-0{i}-{15 + i}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">已报价</div>
                        <div className="font-medium">{i * 2}个</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600 font-bold">企</span>
                      </div>
                      <div>
                        <div className="font-medium">北京华联超市</div>
                        <div className="text-sm text-gray-500">采购商 · 认证企业</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      立即报价
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页 */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={8}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* 功能引导 */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800">如何高效参与采购？</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Search className="text-blue-600" size={20} />
                  </div>
                  <div className="font-bold mb-2">精准筛选</div>
                  <div className="text-sm text-gray-600">使用筛选条件找到匹配您产品的采购需求</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <div className="font-bold mb-2">快速报价</div>
                  <div className="text-sm text-gray-600">对合适需求立即报价，抢占商机</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Package className="text-purple-600" size={20} />
                  </div>
                  <div className="font-bold mb-2">关注竞标</div>
                  <div className="text-sm text-gray-600">关注已报价需求的进展，及时跟进</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseListPage;