import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, RotateCw, LayoutGrid } from 'lucide-react';
import clsx from 'clsx';
import { useTabStore } from '@/store/tabStore';

const TabsBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tabs, activeTabKey, setActiveTabKey, removeTab, addTab } = useTabStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Synchronize URL with active tab and add tab if it doesn't exist
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/') return; // Handled by Navigate in App.tsx

        const menuItems = [
            { path: '/dashboard', label: '控制台概览' },
            { path: '/users', label: '用户管理' },
            { path: '/supply', label: '全部供应' },
            { path: '/supply/publish', label: '发布供应' },
            { path: '/supply/category', label: '品类管理' },
            { path: '/purchase', label: '采购管理' },
            { path: '/orders', label: '订单管理' },
            { path: '/content', label: '内容管理' },
            { path: '/reports', label: '数据报表' },
            { path: '/system/role', label: '角色管理' },
            { path: '/system/permission', label: '权限管理' },
            { path: '/system/menu', label: '菜单管理' },
            { path: '/settings', label: '系统设置' },
        ];

        const menuItem = menuItems.find(item => item.path === currentPath);
        if (menuItem) {
            addTab({
                key: menuItem.path,
                label: menuItem.label,
                path: menuItem.path,
            });
        }

        if (currentPath !== activeTabKey) {
            setActiveTabKey(currentPath);
        }
    }, [location.pathname, activeTabKey, setActiveTabKey, addTab]);

    const handleTabClick = (path: string) => {
        setActiveTabKey(path);
        navigate(path);
    };

    const handleCloseTab = (e: React.MouseEvent, key: string) => {
        e.stopPropagation();
        removeTab(key);
        // If we're closing the current tab, we need to navigate to the new active tab
        const currentTabs = useTabStore.getState().tabs;
        const currentActiveKey = useTabStore.getState().activeTabKey;
        if (currentActiveKey !== activeTabKey) {
            navigate(currentActiveKey);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white border-b border-border-secondary flex items-center h-10 px-2 sticky top-16 z-10 shadow-sm overflow-hidden">
            {/* Scroll Left Button */}
            <button
                onClick={() => scroll('left')}
                className="w-8 h-full flex items-center justify-center text-text-tertiary hover:bg-background-tertiary transition-colors border-r border-border-secondary shrink-0"
            >
                <ChevronLeft size={16} />
            </button>

            {/* Tabs List */}
            <div
                ref={scrollRef}
                className="flex-1 flex items-center h-full overflow-x-auto no-scrollbar scroll-smooth"
            >
                {tabs.map((tab) => (
                    <div
                        key={tab.key}
                        onClick={() => handleTabClick(tab.path)}
                        className={clsx(
                            "flex items-center h-full px-4 border-r border-border-secondary cursor-pointer transition-all min-w-fit whitespace-nowrap group",
                            activeTabKey === tab.key
                                ? "bg-brand-primary/5 text-brand-primary border-b-2 border-b-brand-primary"
                                : "text-text-secondary hover:bg-background-tertiary hover:text-brand-primary"
                        )}
                    >
                        <span className="text-12 font-medium">{tab.label}</span>
                        {tab.closable !== false && (
                            <button
                                onClick={(e) => handleCloseTab(e, tab.key)}
                                className={clsx(
                                    "ml-2 p-0.5 rounded-full hover:bg-brand-primary/20 transition-all opacity-0 group-hover:opacity-100",
                                    activeTabKey === tab.key && "opacity-100"
                                )}
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center h-full shrink-0 border-l border-border-secondary">
                <button
                    onClick={() => scroll('right')}
                    className="w-8 h-full flex items-center justify-center text-text-tertiary hover:bg-background-tertiary transition-colors"
                >
                    <ChevronRight size={16} />
                </button>
                <button
                    className="w-8 h-full flex items-center justify-center text-text-tertiary hover:bg-background-tertiary transition-colors"
                    title="刷新页面"
                >
                    <RotateCw size={14} />
                </button>
                <button
                    className="w-8 h-full flex items-center justify-center text-text-tertiary hover:bg-background-tertiary transition-colors"
                    title="全部关闭"
                >
                    <LayoutGrid size={14} />
                </button>
            </div>
        </div>
    );
};

export default TabsBar;
