import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';
import type { PluginAPI } from 'tailwindcss/types/config';

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    screens: { // ui breakpoint / mobile-first
      'mobile' : '280px', // 갤럭시폴드 가로사이즈 280
      'tablet' : '744px',
      'desktop' : '1920px',
    },
    // 기존 클래스를 대체 하고 싶다면 extend 바깥에 설정.
    extend: { // extend 아래에서 설정하면 Tailwind의 클래스를 유지하면서 내가 설정한 값만 변경합니다.
      fontFamily: {
        'pretendard-light': ['Pretendard Light', 'sans-serif'],
        'pretendard-regular': ['Pretendard Regular', 'sans-serif'],
        'pretendard-medium': ['Pretendard Medium', 'sans-serif'],
        'pretendard-semibold': ['Pretendard SemiBold', 'sans-serif'],
        'pretendard-bold': ['Pretendard Bold', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      colors: {
        primary: {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700],
        },
        secondary: {
          light: colors.slate[300],
          DEFAULT: colors.slate[500],
          dark: colors.slate[700],
        },
        'text-primary': {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700],
        },
        'text-secondary': {
          light: colors.slate[300],
          DEFAULT: colors.slate[500],
          dark: colors.slate[700],
        },
        'bg-primary': {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700],
        },
        'bg-secondary': {
          light: colors.slate[300],
          DEFAULT: colors.slate[500],
          dark: colors.slate[700],
        },
        success: '#63C714',
        info: '#2D9AFF',
        warning: '#F5A020',
        error: '#F6403F',
        link: colors.blue[50],
        highlight: colors.blue[50],
        active: colors.blue[300],
        inactive: colors.slate[100],
        hover1: colors.blue[200],
        hover2: colors.slate[200],
        focus1: colors.blue[100],
        focus2: colors.slate[100],
        blue: { //기존 기획 컬러, tailwind
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
      },
    },
  },
  plugins: [
    plugin(function({ addComponents, addUtilities }: PluginAPI) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a',
          },
        },
      });
      addUtilities(
        {
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
