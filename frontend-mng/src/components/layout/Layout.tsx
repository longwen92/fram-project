import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import TabsBar from './TabsBar';

const Layout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
    <div className="h-screen w-full bg-background-secondary flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Multi-Tabs Bar */}
        <TabsBar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar bg-background-tertiary">
          <div className="max-w-[1600px] mx-auto min-h-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="h-10 border-t border-border-secondary flex items-center justify-center text-12 text-text-tertiary bg-white shrink-0">
          <p>© 2026 惠农网农产品B2B平台 - 后台管理系统 版权所有</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
