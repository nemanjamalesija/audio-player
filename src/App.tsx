import AudioPlayer from './MusicPlayer/AudioPlayer';
import { useState } from 'react';

/* 


peacefull - "http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
rock guitar hero - 'http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg',
rock guitar hero 2 strong - "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg""
galaxy invaders - http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3
magenta - https://assets.codepen.io/296057/fem-bombshell.mp3
*/

function App() {
  const [audio] = useState(
    new Audio(
      'http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg'
    )
  );

  return <AudioPlayer audio={audio} />;
}

export default App;
