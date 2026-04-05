import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Truck, Calendar, ShoppingCart, Heart, Package, Shield, Users, CheckCircle, ChevronRight, Share2, Phone, MessageSquare, AlertCircle } from 'lucide-react';

const SupplyDetailPage: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(50);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // 模拟数据
  const product = {
    id: id || '1',
    name: '优质山东红富士苹果',
    category: '水果',
    price: 4.8,
    unit: '斤',
    origin: '山东烟台',
    rating: 4.8,
    reviews: 128,
    stock: 1250,
    minOrder: 50,
    deliveryTime: '3-5天',
    isFreeShipping: true,
    isNew: true,
    isHot: false,
    supplier: {
      name: '山东果蔬合作社',
      rating: 4.9,
      isVerified: true,
      memberYears: 5,
      totalTransactions: 1248,
      responseRate: '98%',
      responseTime: '2小时内',
      location: '山东烟台',
    },
    tags: ['NEW', 'FREE_SHIPPING'],
    description: '优质红富士苹果，果形端正，色泽鲜艳，口感脆甜，糖度≥14%，单果重250-300g。产地直供，支持一件代发，保证新鲜直达。',
    specifications: [
      { label: '品种', value: '红富士' },
      { label: '规格', value: '单果重250-300g' },
      { label: '糖度', value: '≥14%' },
      { label: '包装', value: '纸箱装，每箱20斤' },
      { label: '保质期', value: '常温30天，冷藏60天' },
      { label: '产地', value: '山东烟台' },
    ],
    images: [
      '🍎', '📦', '🌳', '🚚'
    ],
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= product.minOrder && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.unit} to cart`);
    // 这里实际应该调用API
  };

  const handleContactSupplier = () => {
    console.log('Contact supplier');
  };

  const handleInquiry = () => {
    console.log('Send inquiry');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-green-600">首页</a>
          <ChevronRight size={16} className="mx-2" />
          <a href="/supply" className="hover:text-green-600">供应大厅</a>
          <ChevronRight size={16} className="mx-2" />
          <a href={`/supply/${product.id}`} className="hover:text-green-600">{product.category}</a>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧商品信息 */}
          <div className="lg:col-span-2">
            {/* 商品图片区 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* 主图 */}
                <div className="md:w-2/3">
                  <div className="w-full h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-8xl">{product.images[selectedImage]}</div>
                  </div>
                  {/* 缩略图 */}
                  <div className="flex gap-3">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg flex items-center justify-center text-3xl ${selectedImage === index ? 'ring-2 ring-green-500 ring-offset-2' : 'bg-gray-100'}`}
                      >
                        {img}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 商品基本信息 */}
                <div className="md:w-1/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full mb-3">
                        {product.category}
                      </span>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <Star size={18} className="text-yellow-500 fill-current mr-1" />
                          <span className="font-semibold">{product.rating}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-gray-600">{product.reviews}条评价</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2 rounded-full ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'}`}
                    >
                      <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* 价格区域 */}
                  <div className="mb-6 p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">批发价</div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-bold text-green-600">¥ {product.price.toFixed(2)}</span>
                      <span className="ml-2 text-gray-600">/{product.unit}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      起订量：<span className="font-semibold">{product.minOrder} {product.unit}</span>
                    </div>
                  </div>

                  {/* 库存信息 */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-700">库存</span>
                      <span className="font-semibold">{product.stock.toLocaleString()} {product.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (product.stock / 2000) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {product.stock > 1000 ? '库存充足' : product.stock > 100 ? '库存紧张' : '仅剩少量'}
                    </div>
                  </div>

                  {/* 配送信息 */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <MapPin size={18} className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">发货地</div>
                        <div className="font-medium">{product.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Truck size={18} className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">配送</div>
                        <div className="font-medium">
                          {product.deliveryTime}送达
                          {product.isFreeShipping && <span className="ml-2 text-green-600">· 包邮</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 分享按钮 */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <Share2 size={18} className="mr-2" />
                      分享
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <AlertCircle size={18} className="mr-2" />
                      举报
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 商品详情标签页 */}
            <div className="bg-white rounded-xl shadow-sm border">
              {/* 标签页导航 */}
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  <button className="py-4 border-b-2 border-green-600 text-green-600 font-medium">
                    商品详情
                  </button>
                  <button className="py-4 text-gray-600 hover:text-gray-900 font-medium">
                    规格参数
                  </button>
                  <button className="py-4 text-gray-600 hover:text-gray-900 font-medium">
                    评价 ({product.reviews})
                  </button>
                  <button className="py-4 text-gray-600 hover:text-gray-900 font-medium">
                    成交记录
                  </button>
                </div>
              </div>

              {/* 详情内容 */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">商品描述</h2>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <h3 className="text-lg font-bold mb-3">产品规格</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-gray-600 w-32">{spec.label}：</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold mb-3">配送说明</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>全国大部分地区支持配送，偏远地区需咨询客服</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>下单后24小时内发货，物流信息可通过订单页面查询</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>支持退换货，具体政策请查看售后保障</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 右侧操作面板 */}
          <div className="lg:col-span-1">
            {/* 供应商信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 text-2xl font-bold">优</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold mr-2">{product.supplier.name}</h3>
                    {product.supplier.isVerified && (
                      <Shield size={18} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Star size={16} className="text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{product.supplier.rating}</span>
                    <span className="mx-2">·</span>
                    <span>{product.supplier.memberYears}年会员</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">成交数</span>
                  <span className="font-semibold">{product.supplier.totalTransactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">响应率</span>
                  <span className="font-semibold">{product.supplier.responseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">响应时间</span>
                  <span className="font-semibold">{product.supplier.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">所在地</span>
                  <span className="font-semibold">{product.supplier.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleContactSupplier}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center"
                >
                  <Phone size={18} className="mr-2" />
                  联系供应商
                </button>
                <button className="px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>

            {/* 采购操作面板 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">立即采购</h3>

              {/* 数量选择 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700">采购数量</span>
                  <span className="text-sm text-gray-500">
                    最小起订量：{product.minOrder} {product.unit}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-10)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <div className="flex-1 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full text-center focus:outline-none"
                      min={product.minOrder}
                      max={product.stock}
                    />
                    <span className="ml-2 text-gray-600">{product.unit}</span>
                  </div>
                  <button
                    onClick={() => handleQuantityChange(10)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>增加</span>
                  <span>10{product.unit}/步</span>
                </div>
              </div>

              {/* 价格计算 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">商品单价</span>
                  <span>¥ {product.price.toFixed(2)}/{product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">采购数量</span>
                  <span>{quantity} {product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">运费</span>
                  <span className="text-green-600">{product.isFreeShipping ? '包邮' : '¥ 0.00'}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>合计</span>
                    <span className="text-green-600">¥ {(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  加入采购车
                </button>
                <button
                  onClick={handleInquiry}
                  className="w-full px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium"
                >
                  立即询价
                </button>
                <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  快速下单
                </button>
              </div>

              {/* 保障提示 */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start mb-3">
                  <Shield size={18} className="text-green-600 mr-2 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">交易保障</span>
                    <p>平台担保交易，资金安全有保障</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package size={18} className="text-green-600 mr-2 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">品质保障</span>
                    <p>品质问题支持退换货</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 推荐商品 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">同类推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-5xl">{['🍎', '🍐', '🍊', '🍇'][item - 1]}</div>
                </div>
                <h3 className="font-semibold mb-2">优质水果 {item}号</h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">¥ {[4.5, 5.2, 3.8, 6.1][item - 1].toFixed(1)}/斤</span>
                  <button className="text-sm text-green-600 hover:text-green-800">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyDetailPage;