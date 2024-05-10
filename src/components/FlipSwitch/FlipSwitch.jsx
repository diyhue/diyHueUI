import "./flipswitch.scss";

const FlipSwitch = ({ value, onChange, checked, label }) => (
  <>
    <div className="flipSwitch">
      <p>{label}</p>
      <label className="flipSwitchLabel">
        <input
          type="checkbox"
          value={value}
          onChange={(e) => onChange(e.target.checked)}
          checked={checked}
        />
        <span className="slider"></span>
      </label>
    </div>
  </>
);

export default FlipSwitch;
