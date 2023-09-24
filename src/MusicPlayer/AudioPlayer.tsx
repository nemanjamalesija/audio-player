import { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';

function formatTime(time: number) {
  const minutes = Math.round(time / 60);
  const secs = Math.round(time % 60);

  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
  const paddedSeconds = secs < 10 ? '0' + secs : secs.toString();

  return paddedMinutes + ':' + paddedSeconds;
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
  const animationFrameRef = useRef<number>();
  const [currTime, setCurrTime] = useState('');

  useEffect(() => {
    const animate = () => {
      if (audio.ended) {
        setPlaying(false);
        setTrackProgress(0);
        setCurrTime('00:00');
        cancelAnimationFrame(animationFrameRef.current as number);
      } else {
        setCurrTime(formatTime(audio.currentTime));
        setTrackProgress(audio.currentTime);
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const startPlayback = () => {
      try {
        audio.play();
        setPlaying(true);
        animationFrameRef.current = requestAnimationFrame(animate);
      } catch (error) {
        console.error('Error playing audio:', error);
        setPlaying(false);
      }
    };

    if (playing) {
      startPlayback();
    } else {
      audio.pause();
      setPlaying(false);
      cancelAnimationFrame(animationFrameRef.current as number);
    }

    // Cleanup function
    return () => {
      audio.pause();
      cancelAnimationFrame(animationFrameRef.current as number);
    };
  }, [playing, audio]);

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
          <span>{currTime ? currTime : '00:00'} </span>
          <span>/</span>
          <span>
            <span>
              {isNaN(audio.duration) || !isFinite(audio.duration)
                ? '0.00'
                : audio.duration}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
