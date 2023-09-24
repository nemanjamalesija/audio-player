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
    <div className='fixed bottom-0 w-full '>
      <div className='h-3 bg-slate-50 opacity-95 w-full'>
        <div
          style={{ width: `${percentagePlayed}%` }}
          className='mt-20 bg-teal-500 opacity-90 h-full'
        ></div>
      </div>
      <div className='px-4 py-8 mx-auto  overflow-hidden  bg-black opacity-80 '>
        <div className='flex items-center h-full'>
          <AudioControls playing={playing} setIsPlaying={setPlaying} />

          {/* audio duration and time left */}
          <div className='flex items-center gap-1 pl-5 text-figmaGrayShade'>
            <span className='text-teal-500 text-xl font-semibold'>
              {currTime ? currTime : '00:00'}{' '}
            </span>
            <span>/</span>
            <span>
              <span className='text-teal-500 font-semibold text-xl'>
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
