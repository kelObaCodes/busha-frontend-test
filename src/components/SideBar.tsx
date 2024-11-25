import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div.attrs<{ isOpen: boolean }>((props) => ({
  'aria-hidden': !props.isOpen,
}))<{ isOpen: boolean }>`
  max-width: 100%;
  background-color: #fff;
  padding: 1rem 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: absolute;
    left: ${(props) => (props.isOpen ? '0' : '-250px')};
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li<{ isActive: boolean }>`
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#f6f7fa' : 'transparent')};
  
  &:hover {
    background-color: #ddd;
  }
`;

const ToggleButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.8rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0); // Track active menu item

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (index: number) => {
    setActiveMenu(index); // Set the active menu item
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </ToggleButton>

      <SidebarWrapper isOpen={isOpen}>
        <Menu>
          <MenuItem isActive={activeMenu === 0} onClick={() => handleMenuClick(0)}>
           Wallets
          </MenuItem>
          <MenuItem isActive={activeMenu === 1} onClick={() => handleMenuClick(1)}>
           Prices
          </MenuItem>
          <MenuItem isActive={activeMenu === 2} onClick={() => handleMenuClick(2)}>
            Peer2Peer
          </MenuItem>
          <MenuItem isActive={activeMenu === 3} onClick={() => handleMenuClick(3)}>
            Activity
          </MenuItem>
          <MenuItem isActive={activeMenu === 4} onClick={() => handleMenuClick(4)}>
            Settings
          </MenuItem>
        </Menu>
      </SidebarWrapper>
    </>
  );
};

export default SideBar;
