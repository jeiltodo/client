import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Omit<Config, 'content'> = {
  mode: 'jit',
  safelist: [{ pattern: /^gap-x-/ }],
  theme: {
    screens: {
      mobile: '280px',
      tablet: '480px',
      modal_sm: '640px',
      desktop: '1024px',
      'max-tablet': { max: '480px' },
    },

    extend: {
      fontFamily: {
        'pretendard-light': ['Pretendard Light', 'sans-serif'],
        'pretendard-regular': ['Pretendard Regular', 'sans-serif'],
        'pretendard-medium': ['Pretendard Medium', 'sans-serif'],
        'pretendard-semibold': ['Pretendard SemiBold', 'sans-serif'],
        'pretendard-bold': ['Pretendard Bold', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      padding: {
        base: '24px',
        mobile: '16px',
      },
      colors: {
        error: '#D32F2F',
        blue: {
          // 기획 컬러, tailwind
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        black: {
          500: '#3A4354',
        },
        group: {
          1: '#B07100',
          2: '#FF284F',
          3: '#FF7020',
          4: '#FFAD29',
          5: '#FFEB3E',
          6: '#FF769C',
          7: '#AE3BF6',
          8: '#BBC4DE',
          9: '#6E7089',
          10: '#6A3B0C',
          11: '#27F15D',
          12: '#17BF43',
          13: '#0D6000',
          14: '#044109',
          15: '#870E02',
          16: '#3BE0F6',
          17: '#356EFF',
          18: '#00639D',
          19: '#231476',
          20: '#000132',
        },
      },
      backgroundImage: {
        'avatar-background': "url('/assets/avatar-background.png')",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(94,166,219) white',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(94,166,219)',
            borderRadius: '20px',
            border: '1px solid white',
          },
        },
        '.scrollbar-medium': {
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(217,217,217)',
            borderRadius: '20px',
            border: '1px solid white',
          },
        },
      });
    }),
  ],
};
export default config;
