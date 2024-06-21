import { useState } from "react";

import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

const MenuItem = ({ label, icon, onClick, isActive, children, link, items, currentElement }) => {
  const [isOpen, setIsOpen] = useState(false);

  const submenuActive = () => {
    if (label === "DiyHue" || label === "Addons") {
      for (let x = 0; x < items.length; x++) {
        if (items[x]["label"] === label) {
          const subItems = items[x].subItems
          for (let i = 0; i < subItems.length; i++) {
            if (subItems[i].link === currentElement) {
              setIsOpen(true);
            }
          }
        }
      }
    }
  }


  const handleParentClick = (e) => {
    if (children) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  const handleChildClick = (e) => {
    if (!children) {
      e.stopPropagation();
      onClick();
    }
  };

  const menuItemContent = (
    <li className={isActive ? "active" : ""} onClick={handleParentClick}>
      <div className="menuEntry">
        {icon}
        <p>{label}</p>
        <motion.div
          animate={{ rotate: (isOpen || submenuActive()) ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="submenuIcon"
        >
          {children && <FaAngleDown />}
        </motion.div>
      </div>
      <div className="submenu">{(isOpen || submenuActive()) && children}</div>
    </li>
  );

  return children ? menuItemContent : (
    <a href={link} onClick={handleChildClick}>
      {menuItemContent}
    </a>
  );
};

const IconColor = (items, item) => {
  const Icon = item.icon;
  for (let i = 0; i < items.length; i++) {
    if (items[i]["label"] === item.label) {
      return (
        <Icon
          style={{ color: "hsl(" + (360 / items.length) * i + ", 50%, 50%)" }}
        />
      );
    }
  }
};

const SubMenu = ({ items, currentElement, itemClicked }) => (
  <ul>
    {items.map((item) => (
      <MenuItem
        key={item.label}
        label={item.label}
        icon={IconColor(items, item)}
        onClick={() => itemClicked(item.link)}
        isActive={currentElement === item.link}
        link={item.link}
        items={items}
        currentElement={currentElement}
      >
        {item.subItems && (
          <SubMenu
            items={item.subItems}
            currentElement={currentElement}
            itemClicked={itemClicked}
          />
        )}
      </MenuItem>
    ))}
  </ul>
);

export { MenuItem, SubMenu };
