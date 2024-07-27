import "./flipswitch.scss";

const FlipSwitch = ({ value = '', onChange = undefined, checked = false, label = '', position = undefined }) => (
  <>
    <div className="flipSwitch">
      <p>{label}</p>
      <label className={`flipSwitchLabel ${position}`}>
        <input
          id={label}
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
