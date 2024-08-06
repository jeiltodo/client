export const button = {
  base: 'font-pretendard-medium text-base h-12 transition-all duration-300 ease-in-out',
  variants: {
    variant: {
      default:
        'bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-800',
      primary:
        'bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-800',
      outline:
        'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
      'outline-date':
        'bg-transparent text-blue-500 border border-blue-500 rounded-[8px] hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
      'rounded-white':
        'text-slate-700 rounded-full bg-white hover:text-slate-800',
      'rounded-outline-blue':
        'border border-[1px] border-blue-500 rounded-full text-blue-500 hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
      'text-gray': 'text-slate-600 hover:text-slate-700 active:text-slate-800',
      'text-blue':
        'text-blue-500 hover:text-blue-600 active:text-blue-800 active:border-none',
    },
    status: {
      success:
        'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white',
      warning:
        'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white',
      error:
        'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white',
    },
  },
} as const;
