import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { login } from '@/api/auth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        
        try {
            const res = await login(formData);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(user));
            navigate('/dashboard');
        } catch (err: any) {
            setErrorMsg(err.message || '登录失败，请检查用户名或密码');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-tertiary flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-agriculture-gold/5 rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="w-full max-w-md z-10">
                {/* Logo and Welcome Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-brand-primary/10">
                        <ShoppingBag className="text-brand-primary" size={40} />
                    </div>
                    <h1 className="text-32 font-bold text-text-primary mb-2">欢迎回来</h1>
                    <p className="text-text-secondary">惠农网农产品B2B平台 - 后台管理系统</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-border-secondary p-8 md:p-10">
                    {errorMsg && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-14 rounded-lg flex items-center gap-2">
                            <Lock size={16} />
                            {errorMsg}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-14 font-medium text-text-secondary pl-1">用户名</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-placeholder group-focus-within:text-brand-primary transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:text-text-placeholder"
                                    placeholder="请输入管理员用户名"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center pl-1">
                                <label className="text-14 font-medium text-text-secondary">密码</label>
                                <button type="button" className="text-12 text-brand-primary hover:underline">忘记密码?</button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-placeholder group-focus-within:text-brand-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-11 pr-12 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:text-text-placeholder"
                                    placeholder="请输入登录密码"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-placeholder hover:text-text-secondary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center pl-1">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-brand-primary border-border-primary rounded focus:ring-brand-primary transition-all cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-14 text-text-secondary cursor-pointer">
                                记住登录状态
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={clsx(
                                "w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    立即登录
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-12 text-text-tertiary">
                    <p>© 2026 惠农网 版权所有</p>
                    <div className="mt-2 flex justify-center gap-4">
                        <a href="#" className="hover:text-brand-primary transition-colors">技术支持</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">隐私政策</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
