import { Routes, Route, Navigate } from 'react-router-dom';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HomePage from '@/pages/home/HomePage';
import SupplyListPage from '@/pages/supply/SupplyListPage';
import SupplyDetailPage from '@/pages/supply/SupplyDetailPage';
import PurchaseListPage from '@/pages/purchase/PurchaseListPage';
import PurchaseDetailPage from '@/pages/purchase/PurchaseDetailPage';
import ShoppingCartPage from '@/pages/cart/ShoppingCartPage';
import ConfirmOrderPage from '@/pages/order/ConfirmOrderPage';
import OrderListPage from '@/pages/order/OrderListPage';
import OrderDetailPage from '@/pages/order/OrderDetailPage';
import PersonalCenterPage from '@/pages/user/PersonalCenterPage';
import ShopHomePage from '@/pages/shop/ShopHomePage';
import NewsListPage from '@/pages/news/NewsListPage';
import NewsDetailPage from '@/pages/news/NewsDetailPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

function App() {
  const { isMobile } = useBreakpoint();

  return (
    <Layout>
      <Routes>
        {/* 首页 */}
        <Route path="/" element={<HomePage />} />

        {/* 供应模块 */}
        <Route path="/supply" element={<SupplyListPage />} />
        <Route path="/supply/:id" element={<SupplyDetailPage />} />

        {/* 采购模块 */}
        <Route path="/purchase" element={<PurchaseListPage />} />
        <Route path="/purchase/:id" element={<PurchaseDetailPage />} />

        {/* 店铺模块 */}
        <Route path="/shop/:id" element={<ShopHomePage />} />

        {/* 购物车 */}
        <Route path="/cart" element={<ShoppingCartPage />} />

        {/* 订单模块 */}
        <Route path="/order/confirm" element={<ConfirmOrderPage />} />
        <Route path="/order" element={<OrderListPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />

        {/* 用户模块 */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <PersonalCenterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 资讯模块 */}
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />

        {/* 404 重定向 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
