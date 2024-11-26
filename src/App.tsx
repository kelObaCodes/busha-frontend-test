import React, { useState, useEffect } from 'react';
import Modal from "./components/shared/Modal";
import styled from 'styled-components';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import AccountList from './components/Account-list';
import AddAccount from './components/Add-wallet';
import Notification from './components/shared/Notifications';

const MainWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  padding: 1rem;

`;

const NavbarWrapper = styled.div`
  background-color: #fff;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box; 
  text-align: center;
  font-size: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 3;
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
    padding: 0;
    margin-bottom: 20px;
  }
`;

interface walletInterface {
  name: string;
  currency: string;
}


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletData, setWalletData] = useState<walletInterface>();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddAccountClick = () => {
    setIsModalOpen(true);
  };

  useEffect(()=>{
    if(walletData?.name) {
      setShowNotification(true); 
    }
  },[walletData?.name])

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
          <AccountList onAddAccountClick={handleAddAccountClick} walletData={walletData} />
          <Modal isOpen={isModalOpen}>
              <AddAccount onClose={() => setIsModalOpen(false)}  addWallet={setWalletData}/>
            </Modal>
          </AccountListWrapper>
          {showNotification && (
        <Notification
          message={`${walletData?.name} Wallet added successfully!`}
          onClose={() => setShowNotification(false)}
        />
      )}
        </ContentWrapper>

      </MainWrapper>
    </>
  );
};

export default App;
