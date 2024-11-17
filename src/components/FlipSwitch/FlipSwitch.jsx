import "./flipswitch.scss";

const FlipSwitch = ({ value = '', onChange = undefined, checked = false, label = '', position = undefined, id }) => (
  <>
    <div className="flipSwitch">
      <p>{label}</p>
      <label htmlFor={id} className={`flipSwitchLabel ${position}`}>
        <input
          id={id}
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
