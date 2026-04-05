import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, User, Eye, EyeOff, Building } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'PERSONAL' | 'COMPANY'>('PERSONAL');
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeToTerms: false,
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 模拟注册并自动登录
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = {
      userId: 'user_' + Date.now().toString().slice(-6),
      userType: userType,
      userName: formData.username,
      phone: formData.phone,
      nickname: formData.username,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + formData.username,
      email: formData.username + '@example.com',
      realName: '',
      companyName: userType === 'COMPANY' ? formData.companyName : '',
      authStatus: 0 as const, // 未认证
      memberLevel: 1 as const, // 注册会员
      createTime: new Date().toISOString().split('T')[0],
      updateTime: new Date().toISOString().split('T')[0],
      status: 1 as const,
      shopId: undefined,
      roles: [
        { role: 'REGULAR' as const, status: 'APPROVED' as const },
      ],
      activeRole: 'REGULAR' as const,
    };

    // 调用登录方法
    login(mockToken, mockUser);

    // 跳转到首页
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">惠</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            注册惠农网账号
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            已有账号？{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              立即登录
            </Link>
          </p>
        </div>

        {/* 用户类型选择 */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setUserType('PERSONAL')}
              className={`flex-1 py-3 px-4 rounded-lg text-center ${userType === 'PERSONAL' ? 'bg-green-50 border-2 border-green-500 text-green-700' : 'bg-gray-50 border border-gray-200 text-gray-700'}`}
            >
              <User className="h-6 w-6 mx-auto mb-2" />
              <span className="font-medium">个人用户</span>
              <p className="text-sm mt-1 opacity-75">个人采购/供应</p>
            </button>
            <button
              type="button"
              onClick={() => setUserType('COMPANY')}
              className={`flex-1 py-3 px-4 rounded-lg text-center ${userType === 'COMPANY' ? 'bg-green-50 border-2 border-green-500 text-green-700' : 'bg-gray-50 border border-gray-200 text-gray-700'}`}
            >
              <Building className="h-6 w-6 mx-auto mb-2" />
              <span className="font-medium">企业用户</span>
              <p className="text-sm mt-1 opacity-75">企业采购/供应</p>
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="用户名"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                手机号
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {userType === 'COMPANY' && (
              <div>
                <label htmlFor="companyName" className="sr-only">
                  公司名称
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required={userType === 'COMPANY'}
                    className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="公司名称"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="密码（至少8位，包含字母和数字）"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                确认密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="确认密码"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              required
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
              我已阅读并同意{' '}
              <Link to="/terms" className="text-green-600 hover:text-green-500">
                《用户协议》
              </Link>{' '}
              和{' '}
              <Link to="/privacy" className="text-green-600 hover:text-green-500">
                《隐私政策》
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              注册账号
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            注册即代表您同意惠农网的{' '}
            <Link to="/terms" className="text-green-600 hover:text-green-500">
              服务条款
            </Link>{' '}
            和{' '}
            <Link to="/privacy" className="text-green-600 hover:text-green-500">
              隐私政策
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;