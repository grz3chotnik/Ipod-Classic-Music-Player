import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useRef, useState, useEffect } from 'react';
import Windows from '../components/Windows';
import Player from '../components/Player';
import Test from '../components/Test';

function Hello() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [files, setFiles] = useState([]);
  const audioRef = useRef(null);
  const songRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const wheelRef = useRef(null);
  const lastAngleRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    window.electron.getMusicFiles().then((f) => {
      // console.log("Music files:", f);
      setFiles(f);
    });
  }, []);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    let isDragging = false;

    const getAngle = (x, y, cx, cy) => {
      return Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = wheel.getBoundingClientRect();
      lastAngleRef.current = getAngle(
        e.clientX,
        e.clientY,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const rect = wheel.getBoundingClientRect();
      const angle = getAngle(
        e.clientX,
        e.clientY,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      const delta = angle - lastAngleRef.current;

      if (delta > 15) {
        handleWheel('up');
        lastAngleRef.current = angle;
      } else if (delta < -15) {
        handleWheel('down');
        lastAngleRef.current = angle;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    wheel.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      wheel.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [files]);

  const songForward = () => {
    if (currentSongIndex < files.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const songPrev = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const nowPlaying = files[currentSongIndex] || '';
  const handleWheel = (direction) => {
    setCurrentSongIndex((prev) => {
      if (direction === 'up') return Math.max(prev - 1, 0);
      return Math.min(prev + 1, files.length - 1);
    });
  };

  useEffect(() => {
    if (songRef.current) {
      songRef.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.ontimeupdate = () => setTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);
  }, []);

  return (
    <div>
      {/* <Link to={'/Test'}>TEST</Link> */}
      <Player
        nowPlaying={nowPlaying}
        files={files}
        setCurrentSongIndex={setCurrentSongIndex}
        currentSongIndex={currentSongIndex}
        time={time}
        duration={duration}
        songRef={songRef}
        audioRef={audioRef}
        setTime={setTime}
        wheelRef={wheelRef}
        togglePlayPause={togglePlayPause}
        songForward={songForward}
        songPrev={songPrev}
      />
    </div>
  );
}
<Test/>

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/Windows" element={<Windows />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
  );
}
