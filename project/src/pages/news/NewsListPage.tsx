import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, Eye, ThumbsUp, MessageSquare, Clock, ChevronRight, Tag, BarChart, TrendingUp, BookOpen } from 'lucide-react';

const NewsListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟资讯分类
  const categories = [
    { id: 'all', name: '全部', count: 156 },
    { id: 'market', name: '市场分析', count: 42 },
    { id: 'policy', name: '政策解读', count: 28 },
    { id: 'tech', name: '种植技术', count: 35 },
    { id: 'ecommerce', name: '电商运营', count: 25 },
    { id: 'trend', name: '行业趋势', count: 18 },
    { id: 'success', name: '成功案例', count: 8 },
  ];

  // 模拟资讯数据
  const newsList = [
    {
      id: '1',
      title: '2024年农产品市场趋势分析：绿色有机产品需求持续增长',
      summary: '随着消费者健康意识的提升，绿色有机农产品市场需求持续扩大，成为行业主要增长点。预计2024年有机农产品市场规模将保持15%以上增速。',
      category: 'market',
      categoryName: '市场分析',
      coverImage: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h-250&fit=crop',
      author: '张农业',
      publishTime: '2024-03-15 14:30',
      readCount: 1248,
      likeCount: 256,
      commentCount: 89,
      tags: ['市场趋势', '有机农业', '农产品'],
      isHot: true,
      isTop: true,
    },
    {
      id: '2',
      title: '有机农业认证标准解读与申请指南',
      summary: '本文详细解读最新的有机农业认证标准，包括申请流程、审核要求、认证周期等关键信息，帮助农业生产者顺利通过认证。',
      category: 'policy',
      categoryName: '政策解读',
      coverImage: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=400&h-250&fit=crop',
      author: '李政策',
      publishTime: '2024-03-14 10:15',
      readCount: 842,
      likeCount: 128,
      commentCount: 45,
      tags: ['有机认证', '政策解读', '申请指南'],
      isHot: true,
      isTop: false,
    },
    {
      id: '3',
      title: '农产品电商运营实战：如何通过直播提升销量',
      summary: '从选品策略到主播培训，从流量获取到转化优化，全面解析农产品直播带货的实战技巧与成功经验。',
      category: 'ecommerce',
      categoryName: '电商运营',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h-250&fit=crop',
      author: '王电商',
      publishTime: '2024-03-13 16:45',
      readCount: 1563,
      likeCount: 312,
      commentCount: 124,
      tags: ['电商运营', '直播带货', '农产品电商'],
      isHot: true,
      isTop: false,
    },
    {
      id: '4',
      title: '2024年春季种植结构调整建议',
      summary: '针对不同地区气候特点和市场需求，提出春季种植结构调整的具体建议，帮助农户提高种植效益。',
      category: 'tech',
      categoryName: '种植技术',
      coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h-250&fit=crop',
      author: '赵技术员',
      publishTime: '2024-03-12 09:20',
      readCount: 723,
      likeCount: 96,
      commentCount: 32,
      tags: ['种植技术', '结构调整', '春季种植'],
      isHot: false,
      isTop: true,
    },
    {
      id: '5',
      title: '乡村振兴背景下农产品品牌建设路径',
      summary: '探讨在乡村振兴战略指导下，如何打造具有地域特色的农产品品牌，提升产品附加值和市场竞争力。',
      category: 'trend',
      categoryName: '行业趋势',
      coverImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h-250&fit=crop',
      author: '周品牌',
      publishTime: '2024-03-11 11:30',
      readCount: 521,
      likeCount: 78,
      commentCount: 21,
      tags: ['品牌建设', '乡村振兴', '农产品品牌'],
      isHot: false,
      isTop: false,
    },
    {
      id: '6',
      title: '智慧农业技术应用案例分享：物联网在温室种植中的应用',
      summary: '详细介绍物联网技术在温室种植中的实际应用案例，包括环境监测、自动控制、数据分析等具体实施方案。',
      category: 'tech',
      categoryName: '种植技术',
      coverImage: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h-250&fit=crop',
      author: '钱智慧',
      publishTime: '2024-03-10 14:15',
      readCount: 932,
      likeCount: 145,
      commentCount: 56,
      tags: ['智慧农业', '物联网', '温室种植'],
      isHot: true,
      isTop: false,
    },
    {
      id: '7',
      title: '农产品国际贸易形势分析与机遇展望',
      summary: '分析当前农产品国际贸易形势，探讨"一带一路"背景下中国农产品的出口机遇与挑战。',
      category: 'market',
      categoryName: '市场分析',
      coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h-250&fit=crop',
      author: '孙国际',
      publishTime: '2024-03-09 16:50',
      readCount: 634,
      likeCount: 89,
      commentCount: 34,
      tags: ['国际贸易', '出口机遇', '一带一路'],
      isHot: false,
      isTop: false,
    },
    {
      id: '8',
      title: '从0到1：一个家庭农场的数字化转型之路',
      summary: '分享一个传统家庭农场如何通过数字化改造，实现生产效率提升和销售渠道拓展的成功经验。',
      category: 'success',
      categoryName: '成功案例',
      coverImage: 'https://images.unsplash.com/photo-1581281664217-73d7e0b5fd0a?w=400&h-250&fit=crop',
      author: '李成功',
      publishTime: '2024-03-08 13:10',
      readCount: 1242,
      likeCount: 201,
      commentCount: 78,
      tags: ['数字化转型', '家庭农场', '成功案例'],
      isHot: true,
      isTop: false,
    },
  ];

  // 热门标签
  const hotTags = [
    { name: '有机农业', count: 42 },
    { name: '市场分析', count: 38 },
    { name: '种植技术', count: 35 },
    { name: '政策解读', count: 28 },
    { name: '电商运营', count: 25 },
    { name: '乡村振兴', count: 22 },
    { name: '智慧农业', count: 19 },
    { name: '农产品', count: 45 },
  ];

  // 热门文章
  const hotArticles = newsList.slice(0, 4);

  // 过滤文章
  const filteredNews = newsList.filter((news) => {
    const matchesCategory = activeCategory === 'all' || news.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题和搜索栏 */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <BookOpen size={32} className="text-green-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">行业资讯</h1>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              获取最新的农业政策、市场分析、种植技术和行业趋势，助力农业发展
            </p>

            {/* 搜索栏 */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索资讯、关键词..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 top-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                搜索
              </button>
            </div>

            {/* 资讯统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-green-700">156</div>
                <div className="text-gray-600">总资讯数</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-blue-700">42</div>
                <div className="text-gray-600">市场分析</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-purple-700">35</div>
                <div className="text-gray-600">种植技术</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold text-orange-700">28</div>
                <div className="text-gray-600">政策解读</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 分类筛选 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <Filter size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">资讯分类</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${activeCategory === category.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${activeCategory === category.id ? 'bg-green-600' : 'bg-gray-300'}`} />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 热门标签 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <Tag size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">热门标签</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {hotTags.map((tag) => (
                  <a
                    key={tag.name}
                    href="#"
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                  >
                    #{tag.name}
                    <span className="text-xs text-gray-500 ml-1">({tag.count})</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 热门文章 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <TrendingUp size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">热门文章</h3>
              </div>
              <div className="space-y-4">
                {hotArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.id}`}
                    className="block p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${article.category === 'market' ? 'bg-blue-100 text-blue-800' :
                          article.category === 'policy' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {article.categoryName}
                      </span>
                      {article.isHot && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">热</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye size={12} className="mr-1" />
                      {article.readCount}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 订阅资讯 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-100 p-6">
              <h3 className="text-lg font-bold mb-3 text-blue-800">订阅资讯</h3>
              <p className="text-gray-600 mb-4 text-sm">
                获取最新的行业资讯和市场分析报告
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="请输入邮箱地址"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                  订阅
                </button>
              </div>
            </div>
          </div>

          {/* 右侧资讯列表 */}
          <div className="lg:col-span-3">
            {/* 列表头部 */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === 'all' ? '最新资讯' : categories.find(c => c.id === activeCategory)?.name}
                  <span className="text-gray-500 font-normal ml-2">({filteredNews.length})</span>
                </h2>
                <p className="text-gray-600 mt-1">
                  为您提供专业、及时的农业行业信息
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">排序:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>最新发布</option>
                  <option>最多阅读</option>
                  <option>最多点赞</option>
                </select>
              </div>
            </div>

            {/* 资讯列表 */}
            <div className="space-y-6">
              {filteredNews.map((news) => (
                <div key={news.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* 封面图片 */}
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <div className="w-full h-full bg-gray-200"></div>
                      {news.isTop && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">
                          置顶
                        </div>
                      )}
                      {news.isHot && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                          热门
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-2 py-1 text-xs rounded ${news.category === 'market' ? 'bg-blue-600 text-white' :
                            news.category === 'policy' ? 'bg-purple-600 text-white' :
                              'bg-green-600 text-white'
                          }`}>
                          {news.categoryName}
                        </span>
                      </div>
                    </div>

                    {/* 内容 */}
                    <div className="md:w-2/3 p-6">
                      <Link to={`/news/${news.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600">
                          {news.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {news.summary}
                      </p>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {news.tags.map((tag, index) => (
                          <a
                            key={index}
                            href="#"
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200"
                          >
                            #{tag}
                          </a>
                        ))}
                      </div>

                      {/* 元信息 */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            {news.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {news.publishTime}
                          </div>
                          <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            {news.readCount}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp size={14} className="mr-1" />
                            {news.likeCount}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare size={14} className="mr-1" />
                            {news.commentCount}
                          </div>
                        </div>

                        <Link
                          to={`/news/${news.id}`}
                          className="flex items-center text-green-600 hover:text-green-700 font-medium"
                        >
                          阅读全文
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页 */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  上一页
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  10
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  下一页
                </button>
              </nav>
            </div>

            {/* 空状态 */}
            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">未找到相关资讯</h3>
                <p className="text-gray-600">请尝试其他搜索关键词或分类</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsListPage;