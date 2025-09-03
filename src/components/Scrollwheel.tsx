import backIcon from '../../assets/back.svg';
import nextIcon from '../../assets/next.svg';
import playPause from '../../assets/playpause.svg';

export default function Scrollwheel() {

  const handlePlay = () => {}
  return (
    <div className="Scrollwheel">
      <button className="top">menu</button>
      <button className="bottom"
      onClick={handlePlay}>
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
  );
}
