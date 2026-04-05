import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full" />
              <span className="text-xl font-bold">惠农网</span>
            </div>
            <p className="text-gray-400 mb-6">
              专注于农产品B2B交易的电商平台，连接全国农产品供应商与采购商，推动农业产业数字化转型。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/supply" className="text-gray-400 hover:text-white">
                  供应大厅
                </Link>
              </li>
              <li>
                <Link to="/purchase" className="text-gray-400 hover:text-white">
                  采购需求
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white">
                  行业资讯
                </Link>
              </li>
              <li>
                <Link to="/user" className="text-gray-400 hover:text-white">
                  个人中心
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">平台服务</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">供应商入驻</li>
              <li className="text-gray-400">采购商认证</li>
              <li className="text-gray-400">物流配送</li>
              <li className="text-gray-400">金融服务</li>
              <li className="text-gray-400">质量检测</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400" />
                <span className="text-gray-400">400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-green-400" />
                <span className="text-gray-400">service@huinong.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-400 mt-1" />
                <span className="text-gray-400">
                  北京市海淀区中关村科技园
                  <br />
                  数字农业大厦18层
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} 惠农网农产品B2B电商平台. 保留所有权利. |
            <a href="#" className="mx-2 hover:text-white">隐私政策</a> |
            <a href="#" className="mx-2 hover:text-white">用户协议</a> |
            <a href="#" className="mx-2 hover:text-white">法律声明</a>
          </p>
          <p className="mt-2 text-sm">
            京ICP备12345678号 | 京公网安备11010802012345号
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;