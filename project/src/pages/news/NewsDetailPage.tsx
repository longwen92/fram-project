import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, Share2, ChevronRight, Tag, MessageSquare, ThumbsUp, Bookmark } from 'lucide-react';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams();

  // 模拟数据
  const article = {
    id: id || '1',
    title: '2024年农产品市场趋势分析：绿色有机产品需求持续增长',
    category: '市场分析',
    author: '张农业',
    publishTime: '2024-03-15 14:30',
    readCount: 1248,
    likeCount: 256,
    commentCount: 89,
    tags: ['市场趋势', '有机农业', '农产品', '行业分析'],
    content: `
      <p>随着消费者健康意识的提升和消费升级的推动，2024年农产品市场呈现明显的结构性变化。绿色有机农产品需求持续增长，成为市场的主要增长点。</p>

      <h2>一、市场概况</h2>
      <p>根据农业农村部最新数据显示，2023年我国有机农产品市场规模达到1200亿元，同比增长18.5%，预计2024年将保持15%以上的增速。</p>

      <h2>二、主要趋势</h2>
      <h3>1. 绿色有机产品需求旺盛</h3>
      <p>消费者对食品安全和健康的关注度不断提高，有机蔬菜、绿色水果、无公害粮油等产品的市场需求持续扩大。特别是在一线城市，有机农产品已经成为中高端消费群体的首选。</p>

      <h3>2. 产地直供模式普及</h3>
      <p>随着冷链物流技术的发展，产地直供模式逐渐成为主流。这种模式减少了中间环节，既保证了产品新鲜度，又提高了农民收入。</p>

      <h3>3. 数字化营销成为新常态</h3>
      <p>直播带货、社群营销、电商平台等数字化渠道已经成为农产品销售的重要途径。2023年，农产品线上销售额占比达到28%，预计2024年将突破35%。</p>

      <h2>三、区域特色</h2>
      <p>不同地区农产品呈现出明显的地域特色：</p>
      <ul>
        <li><strong>华北地区</strong>：以优质小麦、玉米、苹果为主，有机认证面积不断扩大</li>
        <li><strong>华东地区</strong>：蔬菜、水果、水产养殖发达，智慧农业应用广泛</li>
        <li><strong>华南地区</strong>：热带水果、特色蔬菜优势明显，出口增长迅速</li>
        <li><strong>西部地区</strong>：中药材、特色杂粮、有机牛羊肉发展潜力巨大</li>
      </ul>

      <h2>四、发展建议</h2>
      <p>针对当前市场趋势，建议农产品生产者和经营者：</p>
      <ol>
        <li>加强品牌建设，提升产品附加值</li>
        <li>拓展线上销售渠道，拥抱数字化营销</li>
        <li>注重产品质量认证，建立可追溯体系</li>
        <li>发展订单农业，降低市场风险</li>
      </ol>

      <p>总体来看，2024年农产品市场机遇与挑战并存。只有紧跟市场趋势，不断创新经营模式，才能在激烈的市场竞争中占据有利位置。</p>
    `,
    relatedArticles: [
      { id: 2, title: '有机农业认证标准解读与申请指南', category: '政策解读', readCount: 842 },
      { id: 3, title: '农产品电商运营实战：如何通过直播提升销量', category: '电商运营', readCount: 1563 },
      { id: 4, title: '2024年春季种植结构调整建议', category: '种植技术', readCount: 723 },
    ],
    comments: [
      { id: 1, author: '农场主李', time: '2024-03-16 09:30', content: '分析很到位，我们合作社正在转型有机种植，这篇文章提供了很好的参考。', likeCount: 24 },
      { id: 2, author: '农业技术员', time: '2024-03-16 11:15', content: '数字化营销确实是大势所趋，我们最近尝试了直播带货，效果还不错。', likeCount: 18 },
      { id: 3, author: '采购商张总', time: '2024-03-16 14:45', content: '市场需求变化很快，这篇文章帮我们把握了方向，感谢分享！', likeCount: 12 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">首页</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/news" className="hover:text-blue-600">行业资讯</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{article.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 文章内容 */}
          <div className="lg:col-span-2">
            {/* 文章头部 */}
            <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                {article.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>{article.publishTime}</span>
                </div>
                <div className="flex items-center">
                  <Eye size={18} className="mr-2" />
                  <span>{article.readCount} 阅读</span>
                </div>
              </div>

              {/* 文章操作栏 */}
              <div className="flex items-center justify-between py-4 border-t border-b mb-8">
                <div className="flex items-center gap-4">
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <ThumbsUp size={20} className="mr-2" />
                    {article.likeCount}
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <MessageSquare size={20} className="mr-2" />
                    {article.commentCount}
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <Bookmark size={20} className="mr-2" />
                    收藏
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <Share2 size={20} className="mr-2" />
                    分享
                  </button>
                </div>
              </div>

              {/* 文章内容 */}
              <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* 标签 */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <Tag size={18} className="mr-2 text-gray-600" />
                  <span className="text-gray-700">标签：</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* 文章底部操作栏 */}
              <div className="flex items-center justify-between py-6 border-t">
                <div className="flex items-center gap-4">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center">
                    <ThumbsUp size={18} className="mr-2" />
                    点赞 ({article.likeCount})
                  </button>
                  <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                    写评论
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  最后更新：{article.publishTime}
                </div>
              </div>
            </div>

            {/* 评论区域 */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-6">评论 ({article.commentCount})</h2>

              {/* 评论列表 */}
              <div className="space-y-6 mb-8">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">
                            {comment.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-gray-500">{comment.time}</div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <ThumbsUp size={18} />
                        <span className="ml-1 text-sm">{comment.likeCount}</span>
                      </button>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* 发表评论 */}
              <div>
                <h3 className="text-lg font-bold mb-4">发表评论</h3>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  rows={4}
                  placeholder="请输入您的评论..."
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    请遵守评论规范，文明发言
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    提交评论
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            {/* 作者信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mr-4">
                  <User size={32} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{article.author}</h3>
                  <p className="text-gray-600">农业分析师</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                专注于农产品市场分析、农业政策研究，拥有10年行业经验，发表专业文章200余篇。
              </p>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                关注作者
              </button>
            </div>

            {/* 相关文章 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">相关文章</h3>
              <div className="space-y-4">
                {article.relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/news/${related.id}`}
                    className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {related.category}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-2 line-clamp-2">{related.title}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye size={14} className="mr-1" />
                      {related.readCount} 阅读
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 热门标签 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-4">热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {['有机农业', '市场分析', '种植技术', '政策解读', '电商运营', '农产品', '乡村振兴', '智慧农业'].map(
                  (tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      #{tag}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* 订阅资讯 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-100 p-6 mt-6">
              <h3 className="text-xl font-bold mb-3 text-blue-800">订阅资讯</h3>
              <p className="text-gray-600 mb-4">
                获取最新的行业资讯和市场分析报告
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="请输入邮箱地址"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  订阅
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;