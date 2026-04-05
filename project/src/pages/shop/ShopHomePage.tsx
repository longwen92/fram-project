import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Truck, Package, Users, Shield, CheckCircle, ChevronRight, Grid, List, Heart, ShoppingCart, MessageSquare, Phone, Award, TrendingUp } from 'lucide-react';

const ShopHomePage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 模拟数据
  const shop = {
    id: id || '1',
    name: '山东果蔬合作社',
    description: '专业从事优质水果种植、加工、销售一体化服务的农业合作社，拥有标准化种植基地2000亩，年产量5000吨。',
    rating: 4.9,
    reviews: 1248,
    memberYears: 5,
    location: '山东烟台',
    responseRate: '98%',
    responseTime: '2小时内',
    totalTransactions: 5248,
    isVerified: true,
    isGoldSupplier: true,
    categories: ['水果', '蔬菜', '坚果', '粮油'],
    stats: {
      totalProducts: 156,
      monthlySales: 248,
      customerSatisfaction: '96%',
      repeatCustomers: '65%',
    },
  };

  const products = [
    { id: 1, name: '优质山东红富士苹果', price: 4.8, unit: '斤', image: '🍎', category: '水果', sales: 1248, rating: 4.8 },
    { id: 2, name: '烟台大樱桃', price: 28.5, unit: '斤', image: '🍒', category: '水果', sales: 842, rating: 4.9 },
    { id: 3, name: '莱阳梨', price: 3.2, unit: '斤', image: '🍐', category: '水果', sales: 621, rating: 4.7 },
    { id: 4, name: '金乡大蒜', price: 2.8, unit: '斤', image: '🧄', category: '蔬菜', sales: 432, rating: 4.6 },
    { id: 5, name: '优质花生油', price: 18.5, unit: '升', image: '🫒', category: '粮油', sales: 356, rating: 4.8 },
    { id: 6, name: '核桃仁', price: 32.0, unit: '斤', image: '🌰', category: '坚果', sales: 289, rating: 4.7 },
    { id: 7, name: '有机菠菜', price: 4.2, unit: '斤', image: '🥬', category: '蔬菜', sales: 198, rating: 4.5 },
    { id: 8, name: '红枣', price: 12.8, unit: '斤', image: '🍎', category: '水果', sales: 567, rating: 4.8 },
  ];

  const reviews = [
    { id: 1, author: '采购商张总', rating: 5, time: '2024-03-15', content: '苹果品质非常好，包装专业，物流也很快，合作很愉快！', images: [] },
    { id: 2, author: '超市李经理', rating: 4, time: '2024-03-10', content: '樱桃新鲜度很好，客户反馈不错，会继续合作。', images: [] },
    { id: 3, author: '餐饮王老板', rating: 5, time: '2024-03-05', content: '长期合作供应商，产品稳定，服务专业，推荐！', images: [] },
  ];

  const handleContactShop = () => {
    console.log('Contact shop');
  };

  const handleFollowShop = () => {
    console.log('Follow shop');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-green-600">首页</a>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{shop.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 店铺头部 */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 店铺logo和信息 */}
            <div className="md:w-1/4">
              <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <div className="text-6xl">🏪</div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleContactShop}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  联系卖家
                </button>
                <button
                  onClick={handleFollowShop}
                  className="flex-1 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                >
                  关注店铺
                </button>
              </div>
            </div>

            {/* 店铺详细信息 */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                    {shop.isVerified && (
                      <Shield size={24} className="text-green-600" />
                    )}
                    {shop.isGoldSupplier && (
                      <Award size={24} className="text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-6">
                      <Star size={20} className="text-yellow-500 fill-current mr-1" />
                      <span className="text-2xl font-bold">{shop.rating}</span>
                      <span className="ml-2 text-gray-600">({shop.reviews}条评价)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2" />
                      {shop.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">店铺等级</div>
                  <div className="text-2xl font-bold text-green-600">金牌卖家</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{shop.description}</p>

              {/* 店铺数据统计 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{shop.stats.totalProducts}</div>
                  <div className="text-sm text-gray-600">在售商品</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{shop.stats.monthlySales}</div>
                  <div className="text-sm text-gray-600">月销量</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">{shop.stats.customerSatisfaction}</div>
                  <div className="text-sm text-gray-600">客户满意度</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-700">{shop.stats.repeatCustomers}</div>
                  <div className="text-sm text-gray-600">回头客率</div>
                </div>
              </div>

              {/* 店铺标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {shop.categories.map((category, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {category}
                  </span>
                ))}
              </div>

              {/* 店铺保障 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">企业认证 · {shop.memberYears}年会员</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">响应率 {shop.responseRate} · {shop.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">成交 {shop.totalTransactions.toLocaleString()} 次</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">平台担保交易</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 店铺内容区域 */}
        <div>
          {/* 标签页导航 */}
          <div className="bg-white rounded-xl shadow-sm border mb-6">
            <div className="flex flex-wrap border-b">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium ${activeTab === 'products' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                全部商品
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-6 py-4 font-medium ${activeTab === 'categories' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                商品分类
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium ${activeTab === 'reviews' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                店铺评价
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 font-medium ${activeTab === 'about' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                店铺介绍
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-4 font-medium ${activeTab === 'contact' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                联系卖家
              </button>
            </div>
          </div>

          {/* 工具栏 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold">店铺商品</div>
              <div className="text-gray-600">共 {shop.stats.totalProducts} 个商品</div>
            </div>
            <div className="flex items-center gap-4">
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
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>综合排序</option>
                <option>销量优先</option>
                <option>价格从低到高</option>
                <option>价格从高到低</option>
              </select>
            </div>
          </div>

          {/* 商品列表 */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-6'}>
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
                {/* 商品图片 */}
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Heart size={20} />
                  </button>
                </div>

                {/* 商品信息 */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    </div>
                  </div>

                  {/* 价格和评分 */}
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-green-600">
                      ¥ {product.price.toFixed(2)} / {product.unit}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star size={14} className="text-yellow-500 fill-current mr-1" />
                      {product.rating} · 销量{product.sales}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center">
                      <ShoppingCart size={18} className="mr-2" />
                      采购
                    </button>
                    <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                      询价
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 分页 */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${page === 1 ? 'bg-green-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 店铺评价摘要 */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-6">店铺评价</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 评分概览 */}
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">{shop.rating}</div>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${star <= Math.floor(shop.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'} mr-1`}
                  />
                ))}
              </div>
              <div className="text-gray-600">{shop.reviews}条评价</div>
            </div>

            {/* 评价分布 */}
            <div className="md:col-span-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-2">
                  <span className="w-8 text-gray-600">{rating}星</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${[80, 15, 3, 1, 1][5 - rating]}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="w-12 text-gray-600 text-right">{[80, 15, 3, 1, 1][5 - rating]}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 最新评价 */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">最新评价</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} mr-1`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 店铺联系信息 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MessageSquare size={20} className="mr-2" />
              在线联系
            </h3>
            <p className="text-gray-600 mb-4">
              有任何问题或合作意向，欢迎随时联系我们
            </p>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                在线咨询
              </button>
              <button className="w-full px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium">
                留言反馈
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Phone size={20} className="mr-2" />
              联系方式
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">联系电话</div>
                <div className="font-medium">0531-88888888</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">联系地址</div>
                <div className="font-medium">山东省烟台市农业示范区88号</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">营业时间</div>
                <div className="font-medium">周一至周日 8:00-18:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;