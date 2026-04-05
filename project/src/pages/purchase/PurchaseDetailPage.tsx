import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, Package, Users, CheckCircle, ChevronRight, MessageSquare, Phone, FileText, AlertCircle, Star, Truck, Shield } from 'lucide-react';

const PurchaseDetailPage: React.FC = () => {
  const { id } = useParams();
  const [quotePrice, setQuotePrice] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');

  // 模拟数据
  const purchase = {
    id: id || '1',
    title: '采购优质苹果 100吨',
    description: '用于商超供应，要求品质优良，规格统一，果径80mm以上，糖度≥14%，无病虫害，新鲜采摘。',
    category: '水果',
    budget: 450000,
    quantity: 100,
    unit: '吨',
    destination: '北京市',
    deadline: '2024-12-31',
    status: '报价中',
    urgency: '紧急采购',
    quoteCount: 8,
    viewCount: 124,
    publishTime: '2024-03-15 14:30',
    buyer: {
      name: '北京华联超市',
      rating: 4.7,
      isVerified: true,
      memberYears: 3,
      completedPurchases: 156,
      location: '北京市朝阳区',
      contactPerson: '张经理',
    },
    requirements: [
      { label: '品种要求', value: '红富士、嘎啦等优质品种' },
      { label: '果径规格', value: '80mm以上' },
      { label: '糖度要求', value: '≥14%' },
      { label: '包装要求', value: '纸箱包装，每箱10kg' },
      { label: '质检标准', value: '符合GB/T 10651-2008' },
      { label: '产地要求', value: '山东、陕西、甘肃等主产区' },
    ],
    timeline: [
      { time: '2024-03-15', event: '采购需求发布' },
      { time: '2024-03-20', event: '报价截止' },
      { time: '2024-03-25', event: '供应商筛选' },
      { time: '2024-03-30', event: '签订合同' },
      { time: '2024-04-10', event: '完成交货' },
    ],
  };

  const handleSubmitQuote = () => {
    console.log('Submit quote:', { price: quotePrice, message: quoteMessage });
    // 这里实际应该调用API
  };

  const handleContactBuyer = () => {
    console.log('Contact buyer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">首页</a>
          <ChevronRight size={16} className="mx-2" />
          <a href="/purchase" className="hover:text-blue-600">采购大厅</a>
          <ChevronRight size={16} className="mx-2" />
          <a href={`/purchase/${purchase.id}`} className="hover:text-blue-600">{purchase.category}</a>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">{purchase.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧采购信息 */}
          <div className="lg:col-span-2">
            {/* 采购基本信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {purchase.urgency}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {purchase.status}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {purchase.category}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">{purchase.title}</h1>
                  <p className="text-gray-700">{purchase.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-700">¥ {purchase.budget.toLocaleString()}</div>
                  <div className="text-gray-600">采购预算</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center">
                  <Package size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">采购数量</div>
                    <div className="text-lg font-semibold">{purchase.quantity} {purchase.unit}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">收货地区</div>
                    <div className="text-lg font-semibold">{purchase.destination}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">截止时间</div>
                    <div className="text-lg font-semibold">{purchase.deadline}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">已报价</div>
                    <div className="text-lg font-semibold">{purchase.quoteCount}个</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-500">
                  <span>发布时间：{purchase.publishTime}</span>
                  <span className="mx-4">|</span>
                  <span>浏览：{purchase.viewCount}次</span>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <AlertCircle size={18} className="mr-2" />
                  举报采购需求
                </button>
              </div>
            </div>

            {/* 详细要求 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">采购要求</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {purchase.requirements.map((req, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">{req.label}</div>
                      <div className="text-gray-700">{req.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-3">补充说明</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>供应商需提供产品检测报告</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>支持分批发货，但需在截止日期前完成全部交货</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>需提供正规发票</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>交易通过平台担保，保障双方权益</span>
                </li>
              </ul>
            </div>

            {/* 采购时间线 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6">采购进度</h2>
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-6"></div>

                {purchase.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start mb-8">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${index === 0 ? 'bg-blue-600 text-white' : 'bg-white border-2 border-blue-600 text-blue-600'}`}>
                      {index + 1}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{item.event}</h3>
                        <span className="text-gray-600">{item.time}</span>
                      </div>
                      <p className="text-gray-700">
                        {index === 0 && '采购需求已发布，供应商可开始报价'}
                        {index === 1 && '报价截止，采购商将开始筛选供应商'}
                        {index === 2 && '采购商将从报价中选择2-3家优质供应商进行深入洽谈'}
                        {index === 3 && '与最终选定的供应商签订采购合同'}
                        {index === 4 && '供应商完成交货，采购商验收确认'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧操作面板 */}
          <div className="lg:col-span-1">
            {/* 采购商信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-2xl font-bold">企</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold mr-2">{purchase.buyer.name}</h3>
                    {purchase.buyer.isVerified && (
                      <Shield size={18} className="text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Star size={16} className="text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{purchase.buyer.rating}</span>
                    <span className="mx-2">·</span>
                    <span>{purchase.buyer.memberYears}年会员</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">已完成采购</span>
                  <span className="font-semibold">{purchase.buyer.completedPurchases}次</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">所在地</span>
                  <span className="font-semibold">{purchase.buyer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">联系人</span>
                  <span className="font-semibold">{purchase.buyer.contactPerson}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleContactBuyer}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
                >
                  <MessageSquare size={18} className="mr-2" />
                  在线联系
                </button>
                <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  <Phone size={18} />
                </button>
              </div>
            </div>

            {/* 报价操作面板 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">立即报价</h3>

              {/* 报价表单 */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    报价金额 (¥)
                  </label>
                  <div className="relative">
                    <DollarSign size={20} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="number"
                      value={quotePrice}
                      onChange={(e) => setQuotePrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="请输入报价金额"
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    预算范围：¥ {purchase.budget.toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    报价说明
                  </label>
                  <textarea
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请说明您的产品优势、供货能力、配送方案等"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    附件上传
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText size={32} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">点击上传产品图片、检测报告等</p>
                    <p className="text-sm text-gray-500">支持 JPG, PNG, PDF 格式，最大10MB</p>
                    <input type="file" className="hidden" id="file-upload" />
                    <label
                      htmlFor="file-upload"
                      className="inline-block mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      选择文件
                    </label>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmitQuote}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  提交报价
                </button>
                <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  保存草稿
                </button>
                <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  下载采购需求文档
                </button>
              </div>

              {/* 报价提示 */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start mb-3">
                  <Shield size={18} className="text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">报价须知</span>
                    <p>报价后采购商将在3个工作日内回复</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle size={18} className="text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">注意事项</span>
                    <p>请确保报价信息真实有效</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 竞争分析 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">报价竞争情况</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">已报价供应商</span>
                    <span className="font-semibold">{purchase.quoteCount}家</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    竞争程度：中等
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">平均报价</span>
                    <span className="font-semibold">¥ 420,000</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    最低报价：¥ 380,000
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">剩余时间</span>
                    <span className="font-semibold">15天</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    截止：{purchase.deadline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相关采购推荐 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">相关采购需求</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    水果采购
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    紧急
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">采购优质梨子 {item}0吨</h3>
                <p className="text-gray-600 mb-4">用于果汁加工，要求糖度高，无损伤</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-700">¥ {[38, 45, 52][item - 1]}万</div>
                    <div className="text-sm text-gray-500">预算</div>
                  </div>
                  <div>
                    <div className="font-semibold">{[20, 30, 25][item - 1]}吨</div>
                    <div className="text-sm text-gray-500">数量</div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  立即报价
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailPage;