import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Screen from '../components/Screen';
// import Scrollwheel from '../components/Scrollwheel';
import heartless from '../../assets/heartless.mp3';
import { useRef, useState } from 'react';
import playPause from '../../assets/playpause.svg';
import backIcon from '../../assets/back.svg';
import nextIcon from '../../assets/next.svg';

function Hello() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      {/* <Screen song={heartless} /> */}
      <div className="Screen">
        <p>now playing: {heartless} </p>
        <audio ref={audioRef} src={heartless} controls={true} />
      </div>

      {/* <Scrollwheel /> */}
      <div className="Scrollwheel">
        <button className="top">menu</button>
        <button className="bottom" onClick={togglePlayPause}>
          <img src={playPause} />
        </button>
        <button className="center"></button>
        <button className="left">
          <img src={backIcon} />
        </button>
        <button className="right">
          <img src={nextIcon} />
        </button>

        <div className="ScrollwheelBg" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
