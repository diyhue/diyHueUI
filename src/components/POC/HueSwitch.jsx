import "./hueSwitch.scss";

const HueSwitch = () => {
  return (
    <div className="hueSwitch">
      <div className="inner">
        <div className="button top"></div>
        <div className="spacer"></div>
        <div className="button"></div>
        <div className="button"></div>
        <div className="spacer"></div>
        <div className="button bottom"></div>
      </div>
    </div>
  );
};

export default HueSwitch;
