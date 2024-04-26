import "./flipswitch.scss";

const FlipSwitch = ({ value, onChange, checked, defaultChecked, label }) => (<>
  <div className="flipSwitch">
    <p>{label}</p>
  </div>
  <div className="flipSwitch">
    <label className="flipSwitchLabel">
      <input
        type="checkbox"
        value={value}
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className="slider"></span>
    </label>
  </div>
</>);

export default FlipSwitch;