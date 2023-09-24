import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

type AudioControlsType = {
  playing: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const AudioControls = ({ playing, setIsPlaying }: AudioControlsType) => {
  return (
    <div className='rounded-lg overflow-hidden '>
      <div
        className='text-white h-10 w-10 cursor-pointer  color-white
'
      >
        {playing && (
          <FaPauseCircle
            className='h-full w-full text-white'
            onClick={() => setIsPlaying(false)}
          />
        )}
        {!playing && (
          <FaPlayCircle
            className='h-full w-full text-white fill-white'
            onClick={() => setIsPlaying(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AudioControls;
