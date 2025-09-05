import playPause from '../../assets/playpause.svg';
import backIcon from '../../assets/back.svg';
import nextIcon from '../../assets/next.svg';

export default function Scrollwheel({
  wheelRef,
  togglePlayPause,
  songForward,
  songPrev,
}) {
  return (
    <div className="Scrollwheel" ref={wheelRef}>
      {/* <Link to="/Windows">test button</Link> */}

      <button className="top" type="button">
        MENU
      </button>
      <button className="bottom" onClick={togglePlayPause} type="button">
        <img src={playPause} alt="play/pause" />
      </button>
      <button
        className="center"
        onClick={() => console.log('center cliked')}
        type="button"
      />
      <button className="left" onClick={songPrev} type="button">
        <img src={backIcon} alt="prev song" />
      </button>
      <button className="right" onClick={songForward} type="button">
        <img src={nextIcon} alt="next song" />
      </button>

      <div className="ScrollwheelBg" />
    </div>
  );
}
