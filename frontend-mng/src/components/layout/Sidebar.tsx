import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    Settings,
    ChevronLeft,
    LogOut,
    ShoppingBag,
    ClipboardList,
    FileText,
    BarChart3,
    ChevronDown,
    Tag,
    ShieldCheck,
    Key,
    LayoutGrid,
    PlusCircle
} from 'lucide-react';
import clsx from 'clsx';
import { useTabStore } from '@/store/tabStore';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

interface MenuItem {
    icon: any;
    label: string;
    path?: string;
    children?: { label: string; path: string; icon?: any }[];
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const addTab = useTabStore((state) => state.addTab);
    const location = useLocation();
    const [openMenus, setOpenMenus] = React.useState<string[]>(['/supply', '/system']);

    const menuGroups: { group: string; items: MenuItem[] }[] = [
        {
            group: '首页',
            items: [
                { icon: LayoutDashboard, label: '控制台概览', path: '/dashboard' },
            ]
        },
        {
            group: '业务管理',
            items: [
                {
                    icon: Package,
                    label: '供应管理',
                    children: [
                        { label: '全部供应', path: '/supply', icon: Package },
                        { label: '发布供应', path: '/supply/publish', icon: PlusCircle },
                        { label: '品类管理', path: '/supply/category', icon: Tag },
                    ]
                },
                { icon: ShoppingBag, label: '采购管理', path: '/purchase' },
                { icon: ClipboardList, label: '订单管理', path: '/orders' },
                { icon: Users, label: '用户管理', path: '/users' },
            ]
        },
        {
            group: '运营管理',
            items: [
                { icon: FileText, label: '内容管理', path: '/content' },
                { icon: BarChart3, label: '数据报表', path: '/reports' },
            ]
        },
        {
            group: '系统设置',
            items: [
                {
                    icon: Settings,
                    label: '系统管理',
                    children: [
                        { label: '角色管理', path: '/system/role', icon: ShieldCheck },
                        { label: '权限管理', path: '/system/permission', icon: Key },
                        { label: '菜单管理', path: '/system/menu', icon: LayoutGrid },
                    ]
                },
                { icon: Settings, label: '系统设置', path: '/settings' },
            ]
        }
    ];

    const toggleMenu = (label: string) => {
        setOpenMenus(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    const handleMenuClick = (label: string, path: string) => {
        addTab({
            key: path,
            label: label,
            path: path,
        });
    };

    return (
        <aside
            className={clsx(
                "bg-white border-r border-border-primary transition-all duration-300 flex flex-col h-screen sticky top-0 z-20",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-border-secondary shrink-0">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-primary/20">
                    <ShoppingBag size={20} />
                </div>
                {!collapsed && (
                    <span className="ml-3 font-bold text-lg text-brand-primary whitespace-nowrap overflow-hidden">
                        惠农网后管系统
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto custom-scrollbar">
                {menuGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                        {!collapsed && (
                            <p className="px-4 text-12 font-bold text-text-placeholder uppercase tracking-wider">
                                {group.group}
                            </p>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item, iIdx) => {
                                const isSubmenuOpen = openMenus.includes(item.label);
                                const hasChildren = item.children && item.children.length > 0;
                                const isActive = item.path === location.pathname ||
                                    (hasChildren && item.children?.some(child => child.path === location.pathname));

                                return (
                                    <div key={iIdx} className="space-y-1">
                                        {hasChildren ? (
                                            <>
                                                <button
                                                    onClick={() => !collapsed && toggleMenu(item.label)}
                                                    className={clsx(
                                                        "w-full flex items-center px-3 py-2.5 rounded-xl transition-all group",
                                                        isActive && !isSubmenuOpen ? "bg-brand-primary/5 text-brand-primary" : "text-text-secondary hover:bg-background-secondary hover:text-brand-primary"
                                                    )}
                                                >
                                                    <item.icon size={20} className="shrink-0" />
                                                    {!collapsed && (
                                                        <>
                                                            <span className="ml-3 font-medium flex-1 text-left">{item.label}</span>
                                                            <ChevronDown
                                                                size={16}
                                                                className={clsx("transition-transform duration-300", isSubmenuOpen && "rotate-180")}
                                                            />
                                                        </>
                                                    )}
                                                </button>
                                                {!collapsed && isSubmenuOpen && (
                                                    <div className="ml-4 pl-4 border-l border-border-secondary space-y-1 py-1">
                                                        {item.children?.map((child, cIdx) => (
                                                            <NavLink
                                                                key={cIdx}
                                                                to={child.path}
                                                                onClick={() => handleMenuClick(child.label, child.path)}
                                                                className={({ isActive }) => clsx(
                                                                    "flex items-center px-3 py-2 rounded-lg text-13 transition-all",
                                                                    isActive
                                                                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                                                                        : "text-text-tertiary hover:bg-background-secondary hover:text-brand-primary"
                                                                )}
                                                            >
                                                                {child.icon && <child.icon size={16} className="mr-2" />}
                                                                {child.label}
                                                            </NavLink>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <NavLink
                                                to={item.path!}
                                                onClick={() => handleMenuClick(item.label, item.path!)}
                                                className={({ isActive }) => clsx(
                                                    "flex items-center px-3 py-2.5 rounded-xl transition-all group",
                                                    isActive
                                                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                                                        : "text-text-secondary hover:bg-background-secondary hover:text-brand-primary"
                                                )}
                                            >
                                                <item.icon size={20} className="shrink-0" />
                                                {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
                                            </NavLink>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer Area */}
            <div className="p-4 border-t border-border-secondary bg-background-tertiary/50">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center px-3 py-2.5 text-text-secondary hover:bg-white hover:text-brand-primary hover:shadow-sm rounded-xl transition-all"
                >
                    <ChevronLeft
                        size={20}
                        className={clsx("transition-transform duration-300", collapsed && "rotate-180")}
                    />
                    {!collapsed && <span className="ml-3 font-medium">收起侧边栏</span>}
                </button>
                <button className="w-full mt-2 flex items-center px-3 py-2.5 text-error hover:bg-red-50 rounded-xl transition-all">
                    <LogOut size={20} />
                    {!collapsed && <span className="ml-3 font-medium">退出登录</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
