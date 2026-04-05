import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 品牌色
        brand: {
          primary: '#2B8C44',       // 丰收绿 - 主品牌色
          light: '#52C41A',         // 成长绿 - 辅助品牌色
          dark: '#1E6B34',          // 深绿 - 悬停状态
          secondary: '#8B4513',     // 土壤棕 - 辅助品牌色
        },
        // 功能色
        success: '#52C41A',
        warning: '#FA8C16',
        error: '#F5222D',
        info: '#1890FF',

        // 农业特色色
        agriculture: {
          gold: '#FFC107',      // 麦穗金 - 促销/推荐
          red: '#FF6B6B',       // 果实红 - 热销/紧急
          blue: '#4DABF7',      // 天空蓝 - 冷链/信息
          brown: '#A0522D',     // 土地褐 - 产地/农业
        },

        // 中性色 - 文字
        text: {
          primary: '#262626',
          secondary: '#595959',
          tertiary: '#8C8C8C',
          placeholder: '#BFBFBF',
          disabled: '#BFBFBF',
        },

        // 中性色 - 边框
        border: {
          primary: '#D9D9D9',
          secondary: '#F0F0F0',
          light: '#F5F5F5',
          dark: '#BFBFBF',
        },

        // 中性色 - 背景
        background: {
          primary: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F5F5F5',
          card: '#FFFFFF',
          overlay: 'rgba(0, 0, 0, 0.45)',
        },
      },
      fontSize: {
        '10': ['0.625rem', '1.4'],
        '12': ['0.75rem', '1.5'],
        '14': ['0.875rem', '1.5'],
        '16': ['1rem', '1.5'],
        '18': ['1.125rem', '1.5'],
        '20': ['1.25rem', '1.4'],
        '24': ['1.5rem', '1.3'],
        '32': ['2rem', '1.25'],
        '40': ['2.5rem', '1.2'],
      },
      fontFamily: {
        base: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        number: ['Inter', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        'slide-in-up': 'slideInUp 0.25s ease-out',
        'slide-out-down': 'slideOutDown 0.2s ease-in',
        'scale-in': 'scaleIn 0.15s ease-out',
        'scale-out': 'scaleOut 0.15s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      zIndex: {
        'modal': 1000,
        'overlay': 2000,
        'toast': 3000,
        'tooltip': 4000,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
