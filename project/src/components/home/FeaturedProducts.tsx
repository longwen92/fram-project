import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Truck } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: '优质山东红富士苹果',
      category: '水果',
      price: '¥ 4.8 / 斤',
      origin: '山东烟台',
      rating: 4.8,
      reviews: 128,
      image: '🍎',
      featured: true,
    },
    {
      id: 2,
      name: '东北五常大米',
      category: '粮油',
      price: '¥ 6.5 / 斤',
      origin: '黑龙江五常',
      rating: 4.9,
      reviews: 256,
      image: '🍚',
      featured: true,
    },
    {
      id: 3,
      name: '宁夏枸杞特级',
      category: '中药材',
      price: '¥ 85 / 斤',
      origin: '宁夏中宁',
      rating: 4.7,
      reviews: 89,
      image: '🌿',
      featured: false,
    },
    {
      id: 4,
      name: '阳澄湖大闸蟹',
      category: '水产',
      price: '¥ 128 / 只',
      origin: '江苏苏州',
      rating: 4.9,
      reviews: 342,
      image: '🦀',
      featured: true,
    },
    {
      id: 5,
      name: '云南普洱熟茶',
      category: '茶叶',
      price: '¥ 320 / 饼',
      origin: '云南普洱',
      rating: 4.6,
      reviews: 67,
      image: '🍵',
      featured: false,
    },
    {
      id: 6,
      name: '新疆阿克苏核桃',
      category: '坚果',
      price: '¥ 28 / 斤',
      origin: '新疆阿克苏',
      rating: 4.8,
      reviews: 154,
      image: '🥜',
      featured: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/supply/${product.id}`}
          className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">{product.image}</div>
              <div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="inline-block ml-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    精选
                  </span>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">{product.price}</div>
          </div>

          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{product.origin}</span>
            </div>
            <div className="flex items-center">
              <Truck size={16} className="mr-1" />
              <span className="text-sm">全国发货</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 font-semibold">{product.rating}</span>
              <span className="ml-1 text-gray-500">({product.reviews}评价)</span>
            </div>
            <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-semibold">
              立即采购
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProducts;