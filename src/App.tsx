import AudioPlayer from './MusicPlayer/AudioPlayer';
import { useState } from 'react';

function App() {
  const [audio] = useState(
    new Audio('https://assets.codepen.io/296057/fem-bombshell.mp3')
  );

  return <AudioPlayer audio={audio} />;
}

export default App;
