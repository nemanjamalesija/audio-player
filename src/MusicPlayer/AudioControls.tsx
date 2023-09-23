import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

type AudioControlsType = {
  playing: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  recording?: boolean;
  handleStopRecording?: () => void;
};

const AudioControls = ({ playing, setIsPlaying }: AudioControlsType) => {
  const stopPlayingHandler = () => {
    setIsPlaying(false);
  };

  const startPlayingHandler = () => {
    setIsPlaying(true);
  };

  return (
    <div className='rounded-lg overflow-hidden pr-7'>
      <div className='col-start-1'>
        {playing && <FaPauseCircle onClick={stopPlayingHandler} />}
        {!playing && <FaPlayCircle onClick={startPlayingHandler} />}
      </div>
    </div>
  );
};

export default AudioControls;
