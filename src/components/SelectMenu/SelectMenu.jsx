import Select from "react-select";
import "./selectMenu.scss";

const SelectMenu = ({ label, defaultValue, placeholder, options, onChange, close = true , multie = false}) => {
    return (
        <div className="dropdown">
            <label>{label}</label>
            <Select
                closeMenuOnSelect={close}
                defaultValue={defaultValue}
                isMulti={multie}
                options={options}
                placeholder={placeholder}
                onChange={(e) => onChange(e.value)}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
            />
        </div>);
};
export default SelectMenu;