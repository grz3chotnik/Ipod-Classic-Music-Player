import path from 'path';
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
}) {
  return (
    <div className="Screen">
      {/* <ClickWheel/> */}
      <p>now playing: {nowPlaying.replace('/Users/grz3chotnik/Music/', '')} </p>

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
                    currentSongIndex === index ? 'rgba(51, 163, 255, 0.82)' : 'transparent',
                  color: currentSongIndex === index ? 'white' : 'black',
                }}
              >
                {/* {song.replace('/Users/grz3chotnik/Music/', '')} */}
                {song.replace('/Users/grz3chotnik/Music/', '').split('/').pop()}
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

      <div className="musicbardiv">
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
    </div>
  );
}
