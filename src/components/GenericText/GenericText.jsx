import "./genericText.scss";

const GenericText = ({ label, value, placeholder, readOnly, type, onChange, pattern }) => {
    return (<>
        <label>{label}</label>
        <input
            readOnly={readOnly}
            type={type}
            pattern={pattern}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    </>);
};
export default GenericText;