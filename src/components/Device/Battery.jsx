import "./battery.scss";

const Battery = ({ battery }) => {
  let batteryColor = "#fff";
  let textColor = "rgb(88, 88, 88)";

  if (battery <= 20) {
    batteryColor = "#e74c3c";
  } else if (battery <= 40) {
    batteryColor = "#e69e22";
  }

  if (battery < 35) {
    textColor = "white";
  }

  return (
    <div className="batteryContainer">
      <div className="battery">
        <div
          className="fill"
          style={{
            "--battery-level": `${battery}%`, /* Set CSS variable */
            backgroundColor: batteryColor,
          }}
        ></div>
        <div className="text" style={{ color: textColor }}>{battery}</div>
      </div>
      <div className="knob"></div>
    </div>
  );
};

export default Battery;