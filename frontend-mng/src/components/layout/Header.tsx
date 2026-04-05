import React from 'react';
import { User, Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ setCollapsed, collapsed }) => {
  return (
    <header className="h-16 bg-white border-b border-border-secondary px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Toggle Sidebar Button (Only visible on mobile or when collapsed) */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden p-2 text-text-secondary hover:bg-background-secondary rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center gap-3 bg-background-tertiary px-4 py-2 rounded-full border border-border-secondary group transition-colors hover:border-brand-primary">
          <Search size={18} className="text-text-placeholder group-hover:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="搜索..." 
            className="bg-transparent border-none outline-none text-14 text-text-primary placeholder:text-text-placeholder w-40 lg:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-text-secondary hover:bg-background-secondary rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-4 border-l border-border-secondary">
          <div className="text-right hidden sm:block">
            <p className="text-14 font-semibold text-text-primary leading-tight">管理员</p>
            <p className="text-12 text-text-secondary">超级管理员</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
