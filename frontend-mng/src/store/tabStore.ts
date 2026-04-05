import { create } from 'zustand';

export interface TabItem {
  key: string;
  label: string;
  path: string;
  closable?: boolean;
}

interface TabState {
  tabs: TabItem[];
  activeTabKey: string;
  addTab: (tab: TabItem) => void;
  removeTab: (targetKey: string) => void;
  setActiveTabKey: (key: string) => void;
}

const DEFAULT_TAB: TabItem = {
  key: '/dashboard',
  label: '控制台',
  path: '/dashboard',
  closable: false,
};

export const useTabStore = create<TabState>((set) => ({
  tabs: [DEFAULT_TAB],
  activeTabKey: '/dashboard',
  
  addTab: (newTab) => set((state) => {
    // If tab already exists, just activate it
    const exists = state.tabs.find(tab => tab.key === newTab.key);
    if (exists) {
      return { activeTabKey: newTab.key };
    }
    return {
      tabs: [...state.tabs, { ...newTab, closable: newTab.closable ?? true }],
      activeTabKey: newTab.key,
    };
  }),
  
  removeTab: (targetKey) => set((state) => {
    const newTabs = state.tabs.filter(tab => tab.key !== targetKey);
    let newActiveKey = state.activeTabKey;
    
    // If we removed the active tab, pick a new one
    if (state.activeTabKey === targetKey) {
      const lastIndex = state.tabs.findIndex(tab => tab.key === targetKey) - 1;
      if (lastIndex >= 0) {
        newActiveKey = state.tabs[lastIndex].key;
      } else if (newTabs.length > 0) {
        newActiveKey = newTabs[0].key;
      }
    }
    
    return {
      tabs: newTabs,
      activeTabKey: newActiveKey,
    };
  }),
  
  setActiveTabKey: (key) => set({ activeTabKey: key }),
}));
