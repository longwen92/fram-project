import React from 'react';
import { useParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, DollarSign, User, Phone, MessageSquare, ChevronRight, Printer, Download } from 'lucide-react';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();

  // 模拟数据
  const order = {
    id: id || 'ORD20230401',
    status: '已发货',
    statusColor: 'bg-blue-100 text-blue-800',
    createdAt: '2024-03-15 14:30:22',
    paidAt: '2024-03-15 14:35:10',
    shippedAt: '2024-03-16 09:15:33',
    estimatedDelivery: '2024-03-20',
    shippingMethod: '快递配送',
    trackingNumber: 'SF1234567890',
    paymentMethod: '在线支付',
    subtotal: 48000,
    shippingFee: 0,
    total: 48000,
    discount: 0,
    buyer: {
      name: '张先生',
      phone: '13800138000',
      address: '北京市朝阳区建国门外大街1号',
    },
    supplier: {
      name: '山东果蔬合作社',
      phone: '0531-88888888',
      rating: 4.9,
    },
    items: [
      {
        id: 1,
        name: '优质山东红富士苹果',
        image: '🍎',
        price: 4.8,
        unit: '斤',
        quantity: 10000,
        subtotal: 48000,
        specifications: '果径80mm以上，糖度≥14%',
      },
    ],
    logistics: [
      { time: '2024-03-16 09:15:33', location: '山东烟台', description: '已发货' },
      { time: '2024-03-16 14:20:10', location: '烟台分拨中心', description: '已揽收' },
      { time: '2024-03-17 08:30:45', location: '济南转运中心', description: '运输中' },
      { time: '2024-03-18 16:15:22', location: '北京转运中心', description: '已抵达' },
      { time: '2024-03-19 09:00:00', location: '北京朝阳区', description: '派送中' },
    ],
  };

  const statusSteps = [
    { key: 'pending', label: '待付款', active: false },
    { key: 'paid', label: '已付款', active: false },
    { key: 'shipped', label: '已发货', active: false },
    { key: 'delivered', label: '已送达', active: false },
    { key: 'completed', label: '已完成', active: false },
  ];

  // 根据当前状态设置步骤激活状态
  if (order.status === '已发货') {
    statusSteps[0].active = true;
    statusSteps[1].active = true;
    statusSteps[2].active = true;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-green-600">首页</a>
          <ChevronRight size={16} className="mx-2" />
          <a href="/order" className="hover:text-green-600">我的订单</a>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-medium">订单详情 {order.id}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 订单状态卡片 */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">订单号：{order.id}</h1>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
                <span className="ml-4 text-gray-600">创建时间：{order.createdAt}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Printer size={18} className="mr-2" />
                打印订单
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Download size={18} className="mr-2" />
                下载发票
              </button>
            </div>
          </div>

          {/* 状态进度条 */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.active ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step.active ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  <span className="text-sm">{step.label}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
              <div className="absolute top-5 left-0 h-0.5 bg-green-600" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* 预计送达时间 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 flex items-center">
            <Clock size={24} className="text-green-600 mr-4" />
            <div>
              <div className="font-medium">预计送达时间</div>
              <div className="text-lg font-bold text-green-700">{order.estimatedDelivery}</div>
              <div className="text-sm text-gray-600">物流公司：顺丰速运 | 运单号：{order.trackingNumber}</div>
            </div>
            <button className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              查看物流详情
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧信息 */}
          <div className="lg:col-span-2">
            {/* 收货信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MapPin size={20} className="mr-2" />
                收货信息
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">收货人</div>
                  <div className="font-medium">{order.buyer.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">联系电话</div>
                  <div className="font-medium">{order.buyer.phone}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500 mb-1">收货地址</div>
                  <div className="font-medium">{order.buyer.address}</div>
                </div>
              </div>
            </div>

            {/* 商品信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Package size={20} className="mr-2" />
                商品信息
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">商品</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">单价</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">数量</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">小计</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-4 text-3xl">
                              {item.image}
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.specifications}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          ¥ {item.price.toFixed(2)}/{item.unit}
                        </td>
                        <td className="py-4 px-4">
                          {item.quantity.toLocaleString()} {item.unit}
                        </td>
                        <td className="py-4 px-4 font-medium">
                          ¥ {item.subtotal.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 物流跟踪 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Truck size={20} className="mr-2" />
                物流跟踪
              </h2>
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-6"></div>

                {order.logistics.map((log, index) => (
                  <div key={index} className="relative flex items-start mb-8">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${index === 0 ? 'bg-green-600 text-white' : 'bg-white border-2 border-green-600 text-green-600'}`}>
                      <Truck size={20} />
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{log.description}</h3>
                        <span className="text-gray-600">{log.time}</span>
                      </div>
                      <p className="text-gray-700">{log.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="lg:col-span-1">
            {/* 订单金额 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <DollarSign size={20} className="mr-2" />
                订单金额
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">商品金额</span>
                  <span>¥ {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">运费</span>
                  <span className="text-green-600">{order.shippingFee === 0 ? '包邮' : `¥ ${order.shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">优惠</span>
                  <span>-¥ {order.discount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>实付金额</span>
                    <span className="text-green-600">¥ {order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <div className="flex justify-between mb-1">
                  <span>支付方式</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>支付时间</span>
                  <span>{order.paidAt}</span>
                </div>
              </div>
            </div>

            {/* 供应商信息 */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <User size={20} className="mr-2" />
                供应商信息
              </h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">优</span>
                </div>
                <div>
                  <div className="font-bold">{order.supplier.name}</div>
                  <div className="text-sm text-gray-500">评分：{order.supplier.rating}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">联系电话</span>
                  <span className="font-medium">{order.supplier.phone}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center">
                  <Phone size={18} className="mr-2" />
                  联系供应商
                </button>
                <button className="px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>

            {/* 订单操作 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold mb-4">订单操作</h3>
              <div className="space-y-3">
                {order.status === '已发货' && (
                  <>
                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                      确认收货
                    </button>
                    <button className="w-full px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium">
                      申请售后
                    </button>
                  </>
                )}
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  取消订单
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  再次购买
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;