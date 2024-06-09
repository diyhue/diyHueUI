import Select from "react-select";
import "./selectMenu.scss";

const SelectMenu = ({ label, defaultValue, placeholder, options, onChange }) => {
    return (
        <div className="dropdown">
            <label>{label}</label>
            <Select
                defaultValue={defaultValue}
                options={options}
                placeholder={placeholder}
                onChange={(e) => onChange(e.value)}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
            />
        </div>);
};
export default SelectMenu;