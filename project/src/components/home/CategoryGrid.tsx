import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid: React.FC = () => {
  const categories = [
    { id: 1, name: '水果', icon: '🍎', count: 1284, color: 'bg-red-50 text-red-600' },
    { id: 2, name: '蔬菜', icon: '🥬', count: 956, color: 'bg-green-50 text-green-600' },
    { id: 3, name: '粮油', icon: '🌾', count: 743, color: 'bg-yellow-50 text-yellow-600' },
    { id: 4, name: '水产', icon: '🐟', count: 512, color: 'bg-blue-50 text-blue-600' },
    { id: 5, name: '畜禽', icon: '🐷', count: 689, color: 'bg-pink-50 text-pink-600' },
    { id: 6, name: '茶叶', icon: '🍵', count: 327, color: 'bg-emerald-50 text-emerald-600' },
    { id: 7, name: '中药材', icon: '🌿', count: 421, color: 'bg-purple-50 text-purple-600' },
    { id: 8, name: '坚果', icon: '🥜', count: 298, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/supply?category=${category.id}`}
          className={`${category.color} rounded-xl p-6 hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl">{category.icon}</div>
            <span className="text-sm opacity-75">{category.count}条供应</span>
          </div>
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <p className="text-sm opacity-75 mt-1">查看全部供应</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;