import React, { useState } from 'react';
import Modal from "./components/shared/Modal";
import styled from 'styled-components';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

const MainWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
`;

const NavbarWrapper = styled.div`
  background-color: #fff;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box; 
  text-align: center;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;

// Sidebar styling
const SidebarWrapper = styled.div`
  box-sizing: border-box;
  width: 22%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Account List styling
const AccountListWrapper = styled.div`
  width: 75%; 
  padding: 1rem 0 0 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <NavbarWrapper>
      <NavBar />
      </NavbarWrapper>

      <MainWrapper>
        <ContentWrapper>
          <SidebarWrapper>
          <SideBar/>
          </SidebarWrapper>

          <AccountListWrapper>
            <Modal isOpen={isModalOpen}>
            </Modal>
          </AccountListWrapper>
       
        </ContentWrapper>

      </MainWrapper>
    </>
  );
};

export default App;
