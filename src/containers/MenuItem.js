import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { motion } from 'framer-motion';

const MenuItem = ({ label, icon, onClick, isActive, children, link }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <a href={link} onClick={handleChildClick}>
      <li className={isActive ? 'active' : ''} onClick={handleParentClick}>
        <div className='menuEntry'>
          {icon}
          <p>{label}</p>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className='submenuIcon'>{children && 
              <FaAngleDown />
          }</motion.div> 
        </div>
        <div className='submenu'>
          {isOpen && children}
        </div>
      </li>
    </a>
  );
};

const SubMenu = ({ items, currentElement, itemClicked }) => (
  <ul>
    {items.map(item => (
      <MenuItem
        key={item.label}
        label={item.label}
        icon={item.icon}
        onClick={() => itemClicked(item.link)}
        isActive={currentElement === item.link}
        link={item.link}
      >
        {item.subItems && <SubMenu items={item.subItems} currentElement={currentElement} itemClicked={itemClicked} />}
      </MenuItem>
    ))}
  </ul>
);

export { MenuItem, SubMenu };