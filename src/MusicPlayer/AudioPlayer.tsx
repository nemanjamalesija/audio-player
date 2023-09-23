import { useState, useEffect } from 'react';
import AudioControls from './AudioControls';

function formatTime(time: number) {
  let minutes = Math.round(time / 60);
  let secs = Math.round(time % 60);

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (secs < 10) {
    secs = '0' + secs;
  }

  return minutes + ':' + secs;
}

type AudioPlayerPropsType = {
  audioSrc: string;
};

const AudioPlayer = ({ audioSrc }: AudioPlayerPropsType) => {
  const [audio] = useState(
    new Audio('https://assets.codepen.io/296057/fem-bombshell.mp3')
  );
  const [playing, setPlaying] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(0);

  useEffect(() => {
    const startTimer = () => {
      const interval = setInterval(() => {
        if (audio.ended) {
          clearInterval(interval); // Clear the interval when audio ends
          setTrackProgress(0);
        } else {
          setTrackProgress(audio.currentTime);
        }
      }, 1000);
    };

    let interval: any;

    if (playing) {
      audio.play();
      interval = startTimer();
    } else {
      clearInterval(interval); // Clear the interval when not playing
      audio.pause();
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return (
    <div className='px-4 py-6 mx-auto mb-3 overflow-hidden rounded-lg w-[500px] bg-slate-300 mt-40'>
      <audio src={audioSrc}></audio>

      <div className='flex items-center h-full'>
        <AudioControls playing={playing} setIsPlaying={setPlaying} />
        <input
          type='range'
          value={trackProgress}
          readOnly
          step='0.01'
          min='0'
          max={isNaN(audio.duration) ? '0.00' : audio.duration}
          className='w-full h-[2px] bg-figmaGrayShade rounded-lg appearance-none custom-range-input"'
        />
        {/* audio duration and time left */}
        <div className='flex items-center gap-1 pl-5 text-figmaGrayShade'>
          <span>{formatTime(audio.currentTime)}</span>
          <span>/</span>
          <span>
            <span>
              {isNaN(audio.duration) || !isFinite(audio.duration)
                ? '0.00'
                : formatTime(audio.duration)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
