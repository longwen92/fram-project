import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Truck, Users } from 'lucide-react';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            连接农产品供需
            <span className="text-green-600"> 构建智慧农业生态</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            惠农网农产品B2B电商平台，为全国农产品供应商与采购商提供高效、安全、便捷的交易服务。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/supply"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <span>查看供应</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/purchase"
              className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
            >
              发布采购
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">为什么选择惠农网</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">高效交易</h3>
            <p className="text-gray-600">
              智能匹配供需，快速达成交易，节省中间环节成本。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">交易保障</h3>
            <p className="text-gray-600">
              资金托管、质量检测、纠纷调解，全方位保障交易安全。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Truck className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">物流配送</h3>
            <p className="text-gray-600">
              全国冷链物流网络，确保农产品新鲜送达。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">庞大用户</h3>
            <p className="text-gray-600">
              已服务超过10万+供应商和采购商，覆盖全国主要产区。
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">热门品类</h2>
          <Link to="/supply" className="text-green-600 hover:text-green-700 flex items-center">
            查看全部
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">精选供应</h2>
          <Link to="/supply" className="text-green-600 hover:text-green-700 flex items-center">
            更多供应
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">立即加入惠农网</h2>
        <p className="text-lg mb-8 opacity-90">
          开启您的农产品B2B电商之旅，连接全国市场，提升交易效率。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 font-semibold"
          >
            免费注册
          </Link>
          <Link
            to="/supply"
            className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10"
          >
            查看平台
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;