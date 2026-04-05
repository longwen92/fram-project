import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthStatus, UserRole } from '@/types';
import { STORAGE_KEYS, ROLE_PERMISSIONS } from '@/constants';
import { setStorage, removeStorage } from '@/utils';

interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  activeRole: UserRole;
  setStatus: (status: AuthStatus) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setActiveRole: (role: UserRole) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (role: UserRole) => boolean;
  getCurrentRolePermissions: () => string[];
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      status: 'UNAUTHENTICATED',
      user: null,
      token: null,
      activeRole: 'REGULAR',

      setStatus: (status) => set({ status }),

      setUser: (user) => set({ user }),

      setToken: (token) => {
        set({ token });
        if (token) {
          setStorage(STORAGE_KEYS.TOKEN, token);
        } else {
          removeStorage(STORAGE_KEYS.TOKEN);
        }
      },

      setActiveRole: (role) => {
        const { user } = get();
        if (user && user.roles.some(r => r.role === role && r.status === 'APPROVED')) {
          set({ activeRole: role });
          // 更新用户的activeRole
          const updatedUser = { ...user, activeRole: role };
          set({ user: updatedUser });
        }
      },

      login: (token, user) => {
        set({
          token,
          user,
          status: 'AUTHENTICATED',
        });
        setStorage(STORAGE_KEYS.TOKEN, token);
      },

      logout: () => {
        set({
          token: null,
          user: null,
          status: 'UNAUTHENTICATED',
        });
        removeStorage(STORAGE_KEYS.TOKEN);
        removeStorage(STORAGE_KEYS.USER_INFO);
      },

      isAuthenticated: () => {
        const { token, user } = get();
        return !!(token && user);
      },

      hasRole: (role: UserRole) => {
        const { user } = get();
        if (!user) return false;
        return user.roles.some(r => r.role === role && r.status === 'APPROVED');
      },

      getCurrentRolePermissions: () => {
        const { activeRole } = get();
        return ROLE_PERMISSIONS[activeRole] || [];
      },
    }),
    {
      name: STORAGE_KEYS.USER_INFO,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        activeRole: state.activeRole,
      }),
    }
  )
);
