type AudioControlsType = {
  playing: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const AudioControls = ({ playing, setIsPlaying }: AudioControlsType) => {
  return (
    <div className='rounded-lg overflow-hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[35%]'>
      <div>
        <button className='h-14 w-14 mr-2 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#fff '
            className='h-full w-full hover:stroke-orange-500 transition-all duration-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z'
            />
          </svg>
        </button>
        {playing && (
          <button
            className='h-14 w-14  rounded-full'
            onClick={() => setIsPlaying(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#fff '
              className='h-full w-full hover:stroke-orange-500 transition-all duration-200'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>
        )}
        {!playing && (
          <button
            className='h-14 w-14 rounded-full'
            onClick={() => setIsPlaying(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#fff'
              className='w-full h-full hover:stroke-orange-500 transition-all duration-200'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
              />
            </svg>
          </button>
        )}
        <button className='h-14 w-14  ml-2 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#fff'
            className='w-full h-full hover:stroke-orange-500 transition-all duration-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AudioControls;
