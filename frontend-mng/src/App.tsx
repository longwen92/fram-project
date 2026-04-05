import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UserListPage from '@/pages/users/UserListPage';
import ProductListPage from '@/pages/products/ProductListPage';
import OrdersManagementPage from '@/pages/orders/OrdersManagementPage';
import ContentManagementPage from '@/pages/content/ContentManagementPage';
import SupplyManagementPage from '@/pages/supply/SupplyManagementPage';
import PurchaseManagementPage from '@/pages/purchase/PurchaseManagementPage';
import CategoryPage from '@/pages/products/category/CategoryPage';
import PublishProductPage from '@/pages/products/publish/PublishProductPage';
import RolePage from '@/pages/system/RolePage';
import PermissionPage from '@/pages/system/PermissionPage';
import MenuPage from '@/pages/system/MenuPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="supply" element={<SupplyManagementPage />} />
        <Route path="purchase" element={<PurchaseManagementPage />} />
        <Route path="supply/category" element={<CategoryPage />} />
        <Route path="supply/publish" element={<PublishProductPage />} />
        <Route path="orders" element={<OrdersManagementPage />} />
        <Route path="content" element={<ContentManagementPage />} />
        <Route path="system/role" element={<RolePage />} />
        <Route path="system/permission" element={<PermissionPage />} />
        <Route path="system/menu" element={<MenuPage />} />
        <Route path="reports" element={<div className="p-8 bg-white rounded-xl border border-border-secondary shadow-sm">数据报表页面开发中...</div>} />
        <Route path="settings" element={<div className="p-8 bg-white rounded-xl border border-border-secondary shadow-sm">系统设置页面开发中...</div>} />
      </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
