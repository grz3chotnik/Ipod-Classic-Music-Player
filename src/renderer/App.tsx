import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// import Screen from '../components/Screen';
import { useRef, useState, useEffect } from 'react';
import playPause from '../../assets/playpause.svg';
import backIcon from '../../assets/back.svg';
import nextIcon from '../../assets/next.svg';
import { app } from 'electron';
import Windows from '../components/Windows';
import Screen from '../components/Screen';

function Hello() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [files, setFiles] = useState([]);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const songRef = useRef();
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
      else return Math.min(prev + 1, files.length - 1);
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

  // useEffect(() => {
  //   const handleKeyDown = () => {};
  // }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.ontimeupdate = () => setTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);
  }, []);

  return (
    <div className="player">
      <div className="Screen">
        {/* <ClickWheel/> */}
        <p>
          now playing:{' '}
          {nowPlaying.replace('/Users/grz3chotnik/Music/', '')}{' '}
        </p>

        <ul>
          {files.map((song, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setCurrentSongIndex(index);
                }}
              >
                <li
                  ref={index === currentSongIndex ? songRef : null}
                  style={{
                    backgroundColor:
                      currentSongIndex === index ? 'gray' : 'transparent',
                    color: currentSongIndex === index ? 'white' : 'black',
                  }}
                >
                  {song.replace(
                    "/Users/grz3chotnik/Music/2008 - 808's & Heartbreak/",
                    '',
                  )}
                </li>
              </button>
            );
          })}
        </ul>

        <audio
          ref={audioRef}
          src={`file://${files[currentSongIndex]}`}
          // controls
          autoPlay
          onEnded={songForward}
        />
        <input
          type="range"
          value={time}
          onChange={(e) => {
            const newTime = e.target.value;
            audioRef.current.currentTime = newTime;
            setTime(newTime);
          }}
          max={duration}
          className="musicbar"
        />
        <p>
          {Math.floor(time)} / {Math.floor(duration)}
        </p>
      </div>
      <div className="Scrollwheel" ref={wheelRef}>
        {/* <Link to="/Windows">test button</Link> */}

        <button className="top" type="button">
          MENU
        </button>
        <button className="bottom" onClick={togglePlayPause} type="button">
          <img src={playPause} alt="play/pause" />
        </button>
        <button className="center" type="button" />
        <button className="left" onClick={songPrev} type="button">
          <img src={backIcon} alt="prev song" />
        </button>
        <button className="right" onClick={songForward} type="button">
          <img src={nextIcon} alt="next song" />
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
        <Route path="/Windows" element={<Windows />} />
      </Routes>
    </Router>
  );
}
