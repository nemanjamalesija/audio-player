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
  audio: HTMLAudioElement;
};

const AudioPlayer = ({ audio }: AudioPlayerPropsType) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const animationFrameRef = useRef<number>();
  const [currTime, setCurrTime] = useState('');
  const [percentagePlayed, setPercentagePlayed] = useState(0); // Initialize with 0

  useEffect(() => {
    const animate = () => {
      if (audio.ended) {
        setPlaying(false);
        setCurrTime('00:00');
        setPercentagePlayed(0); // Reset the percentage played to 0
        cancelAnimationFrame(animationFrameRef.current as number);
      } else {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        setCurrTime(formatTime(currentTime)); // Ensure formatTime is defined and works correctly

        setPercentagePlayed((currentTime / duration) * 100);
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
    <div className='fixed bottom-0 w-full cursor-pointer '>
      <div
        className='bg-slate-50 opacity-95 w-full h-4'
        onClick={(e) => {
          const divWidth = e.clientX;
          const windoWidth = window.innerWidth;
          const newDivLenght = divWidth / windoWidth;
          const newAudioLenght = (newDivLenght * 100 * audio.duration) / 100;

          setPercentagePlayed(newDivLenght);
          audio.currentTime = newAudioLenght;
        }}
      >
        <div
          className='opacity-90 h-full cursor-pointer outline-none block focus:outline-none bg-orange-600'
          style={{ width: `${percentagePlayed}%` }}
        ></div>
      </div>

      <div className='px-4 py-10 mx-auto  overflow-hidden  bg-gradient-to-r from-[#434343]  to-[#696969] opacity-90  '>
        <div className='flex items-center h-full'>
          <AudioControls playing={playing} setIsPlaying={setPlaying} />

          {/* audio duration and time left */}
          <div className='flex items-center gap-1 pl-5 text-figmaGrayShade'>
            <span className='text-white text-2xl font-semibold'>
              {currTime ? currTime : '00:00'}{' '}
            </span>
            <span className='text-white font-semibold text-2xl'>/</span>
            <span>
              <span className='text-white font-semibold text-2xl'>
                {isNaN(audio.duration) || !isFinite(audio.duration)
                  ? '0.00'
                  : formatTime(audio.duration)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
