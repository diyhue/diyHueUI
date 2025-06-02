import "./battery.scss";

const Battery = ({ battery }) => {
  let batteryColor = "#fff";

  if (battery <= 20) {
    batteryColor = "#e74c3c";
  } else if (battery <= 40) {
    batteryColor = "#e69e22";
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
        <div className="text">{battery}</div>
      </div>
      <div className="knob"></div>
    </div>
  );
};

export default Battery;