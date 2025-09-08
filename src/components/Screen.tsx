import path from 'path-browserify';
import Play from '../../assets/Play.svg';
import Pause from '../../assets/Pause.svg';
import Player from './Player';
import { useState } from 'react';

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Screen({
  nowPlaying,
  files,
  setCurrentSongIndex,
  currentSongIndex,
  time,
  duration,
  songRef,
  audioRef,
  setTime,
  songForward,
  isPlaying,
}) {
  const [isLooped, setIsLooped] = useState(false);

  return (
    <div className="Screen">
      {/* <ClickWheel/> */}
      {/* <p>now playing: {nowPlaying.replace('/Users/grz3chotnik/Music/', '')} </p> */}
      <p>now playing: {path.basename(nowPlaying)}</p>

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
                    currentSongIndex === index
                      ? 'rgba(51, 163, 255, 0.82)'
                      : 'transparent',
                  color: currentSongIndex === index ? 'white' : 'black',
                }}
              >
                {/* {song.replace('/Users/grz3chotnik/Music/', '')} */}
                {song.replace('path.basename(nowPlaying)', '').split('/').pop()}
              </li>
            </button>
          );
        })}
      </ul>

      <audio
        ref={audioRef}
        src={`file://${files[currentSongIndex]}`}
        // controls
        autoPlay={isPlaying}
        onEnded={songForward}
        loop={isLooped}
      />

      <div className="musicbardiv">
        <button>
          <img
            src={isPlaying === false ? Play : Pause}
            alt="play"
            height="25px"
          />
        </button>

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
          {`${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')} / ${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`}
        </p>
      </div>

      {/* <div className="debugstuff"> */}
      {/*   <br /> */}
      {/*   <p className="debug">is playing??? {isPlaying.toString()}</p> */}
      {/*   <p className="debug">is looped?? {isLooped.toString()}</p> */}
      {/*   /!* <p>now playing: {nowPlaying.split('/').pop()}</p> *!/ */}
      {/*   /!* <p>fixed: {path.basename(nowPlaying)}</p> *!/ */}

      {/*   <button */}
      {/*     className="debug" */}
      {/*     onClick={() => console.log('IS PLAYING?? ' + isPlaying)} */}
      {/*   > */}
      {/*     testbutton */}
      {/*   </button> */}
      {/*   <br /> */}
      {/*   <button */}
      {/*     onClick={() => */}
      {/*       setCurrentSongIndex(generateRandomNumber(0, files.length)) */}
      {/*     } */}
      {/*     className="debug" */}
      {/*   > */}
      {/*     rand */}
      {/*   </button> */}
      {/*   <br /> */}
      {/*   <button className="debug" onClick={() => setIsLooped(!isLooped)}> */}
      {/*     looping: {isLooped} */}
      {/*   </button> */}
      {/*   <br /> */}
      {/*   <button className="debug" onClick={() => console.log(isLooped)}> */}
      {/*     console log islooped */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  );
}
