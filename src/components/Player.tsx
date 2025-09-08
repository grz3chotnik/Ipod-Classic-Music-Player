import Screen from './Screen';
import Scrollwheel from './Scrollwheel';

export default function Player({
  nowPlaying,
  files,
  setCurrentSongIndex,
  currentSongIndex,
  time,
  duration,
  songRef,
  audioRef,
  setTime,
  wheelRef,
  togglePlayPause,
  songForward,
  songPrev,
  isPlaying,
}) {
  return (
    <div className="player">
      <Screen
        nowPlaying={nowPlaying}
        files={files}
        setCurrentSongIndex={setCurrentSongIndex}
        currentSongIndex={currentSongIndex}
        time={time}
        duration={duration}
        songRef={songRef}
        audioRef={audioRef}
        setTime={setTime}
        songForward={songForward}
        isPlaying={isPlaying}
      />
      <Scrollwheel
        wheelRef={wheelRef}
        togglePlayPause={togglePlayPause}
        songForward={songForward}
        songPrev={songPrev}
      />
    </div>
  );
}
