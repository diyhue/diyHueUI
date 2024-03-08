import React, { useState } from 'react';


const MenuItem = ({ label, icon, onClick, isActive, children, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (children) {
      setIsOpen(!isOpen);
    } else {
      onClick();
    }
  };

  return (
    <a href={link}>
        <li className={isActive ? 'active' : ''} onClick={handleClick}>
            <div className='menuEntry'>
                {icon}
                <p>{label}</p>
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