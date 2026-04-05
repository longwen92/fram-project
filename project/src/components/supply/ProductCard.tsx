import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Truck, Calendar, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ viewMode }) => {
  // 模拟数据
  const product = {
    id: 1,
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
    },
    tags: ['NEW', 'FREE_SHIPPING'],
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
        {/* 标签 */}
        <div className="flex justify-between items-start p-4">
          <div className="flex gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                新品
              </span>
            )}
            {product.isFreeShipping && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                包邮
              </span>
            )}
            {product.isHot && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                热销
              </span>
            )}
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart size={20} />
          </button>
        </div>

        {/* 商品图片 */}
        <div className="px-4">
          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
            <div className="text-6xl">🍎</div>
          </div>
        </div>

        {/* 商品信息 */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                {product.category}
              </span>
              <h3 className="font-semibold text-lg line-clamp-2">
                <Link to={`/supply/${product.id}`} className="hover:text-green-600">
                  {product.name}
                </Link>
              </h3>
            </div>
          </div>

          {/* 价格 */}
          <div className="mb-3">
            <div className="text-2xl font-bold text-green-600">
              ¥ {product.price.toFixed(2)} / {product.unit}
            </div>
            <div className="text-sm text-gray-500">
              起订量：{product.minOrder} {product.unit}
            </div>
          </div>

          {/* 产地和物流 */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-2" />
              <span>{product.origin}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Truck size={16} className="mr-2" />
              <span>{product.deliveryTime}送达</span>
              {product.isFreeShipping && <span className="ml-2 text-green-600">· 包邮</span>}
            </div>
          </div>

          {/* 供应商信息 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-green-600 text-sm font-bold">优</span>
              </div>
              <div>
                <div className="text-sm font-medium">{product.supplier.name}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Star size={12} className="mr-1 text-yellow-500 fill-current" />
                  {product.supplier.rating}
                  {product.supplier.isVerified && (
                    <span className="ml-1 px-1 bg-green-100 text-green-700 rounded text-xs">认证</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center">
              <ShoppingCart size={18} className="mr-2" />
              立即采购
            </button>
            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
              询价
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 列表视图
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* 商品图片 */}
        <div className="md:w-1/4 p-4">
          <div className="w-full h-48 md:h-full bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
            <div className="text-6xl">🍎</div>
          </div>
        </div>

        {/* 商品信息 */}
        <div className="md:w-3/4 p-4">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {product.category}
                  </span>
                  {product.isNew && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      新品
                    </span>
                  )}
                  {product.isFreeShipping && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      包邮
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link to={`/supply/${product.id}`} className="hover:text-green-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  优质红富士苹果，果形端正，色泽鲜艳，口感脆甜，产地直供，支持一件代发。
                </p>
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <Heart size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">价格</div>
                <div className="text-2xl font-bold text-green-600">
                  ¥ {product.price.toFixed(2)} / {product.unit}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">起订量</div>
                <div className="text-lg font-semibold">
                  {product.minOrder} {product.unit}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">库存</div>
                <div className="text-lg font-semibold">{product.stock.toLocaleString()} {product.unit}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{product.origin}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Truck size={16} className="mr-2" />
                  <span>{product.deliveryTime}送达</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="mr-1 text-yellow-500 fill-current" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="ml-1 text-gray-500">({product.reviews}评价)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                  联系供应商
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  立即采购
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;