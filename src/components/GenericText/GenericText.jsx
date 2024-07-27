import "./genericText.scss";

const GenericText = ({ label = '', value = '', placeholder = '', readOnly = false, type = 'text', onChange = undefined, pattern = '', autoComplete = '' }) => {
    return (<>
        <label>{label}</label>
        <input
            readOnly={readOnly}
            type={type}
            pattern={pattern}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            autoComplete={autoComplete}
        />
    </>);
};
export default GenericText;