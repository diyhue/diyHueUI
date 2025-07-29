import Select from "react-select";
import "./selectMenu.scss";

const SelectMenu = ({ label, value, placeholder, options, onChange }) => {
    return (
        <div className="dropdown">
            <label>{label}</label>
            <Select
                defaultValue={value}
                options={options}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                className="generic-text-container"
                classNamePrefix="generic-text"
            />
        </div>);
};
export default SelectMenu;