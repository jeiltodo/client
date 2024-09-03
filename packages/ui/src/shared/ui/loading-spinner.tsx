export const LoadingSpinner = () => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-32 h-16 rounded-lg flex items-center justify-center'>
      <div className='h-16 text-center'>
        <h1
          className='text-5xl font-black h-[160px] text-white/20 animate-wave'
          style={{
            backgroundSize: '101% 100%',
            backgroundPosition: 'left 0px bottom -80px',
            backgroundRepeat: 'repeat-x',
            WebkitBackgroundClip: 'text',
            MozBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 360' preserveAspectRatio='none'%3E%3Crect x='0' y='0' width='240' height='360' style='stroke: none; fill: rgb(59,130,246);' /%3E%3Cpath d='M0,260 C80,180 160,340 240,260 L240,360 L0,360 Z' style='stroke: none; fill: rgb(0,0,0);'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        >
          JTODO
        </h1>
      </div>
    </div>
  );
};
