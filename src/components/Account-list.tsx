import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from './shared/Loader';
import NetworkError from './shared/Error';

const ListWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddAccountButton = styled.button`
  background-color: transparent;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Error = styled.div`
  text-align: center;
`;

const CenterLoader = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  background: #000;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 10px 20px 0px #8a8a8a80;

  .card-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #fff;
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    color: #555;
  }

  .fallback-avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 20px;
    color: white;
    text-align: center;
    line-height: 40px;
    text-transform: uppercase;
    margin-right: 10px;
  }

  .arrow-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
  }

  .arrow {
    color: #fff;
  }
`;

// Utility function to get a consistent color based on the name
const getColorForName = (name: string): string => {
  const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#a8a8a8'];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return colors[sum % colors.length];
};

interface Account {
  id: string;
  currency: string;
  hold: string;
  pending_balance: string;
  balance: string;
  name: string;
  type: string;
  deposit: boolean;
  payout: boolean;
  imgURL: string;
}

interface AccountListProps {
  onAddAccountClick: () => void;
}

const AccountList: React.FC<AccountListProps> = ({ onAddAccountClick }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async (): Promise<void> => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://my-json-server.typicode.com/bushaHQ/busha-frontend-test/accounts'); // Example URL
      if (!response.ok) {
        setError(true);
      }
      const data: Account[] = await response.json();
      setAccounts(data);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <CenterLoader>
        <Loader width={5} size={60} />
      </CenterLoader>
    );

  if (error)
    return (
      <Error>
        <NetworkError callApi={fetchAccounts} />
      </Error>
    );

  return (
    <ListWrapper>
      <ListHeader>
        <h2>Wallets</h2>
        <AddAccountButton onClick={onAddAccountClick}>+ Add new wallet</AddAccountButton>
      </ListHeader>
      <hr style={{ margin: 0 }} />
      <CardsGrid>
        {accounts.length &&
          accounts.map((account) => (
            <Card key={account.id} onClick={() => console.log('Account Clicked', account.id)}>
              <div className="card-row">
                <div className="card-icon">
                  {!account.imgURL ? (
                    <span>
                      <img src={account.imgURL} alt="currency icon" />
                    </span>
                  ) : (
                    <span
                      className="fallback-avatar"
                      style={{ backgroundColor: getColorForName(account.name) }}
                    >
                      {account.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  {account.name}
                </div>
              </div>
              <div className="card-row">
                <p>
                  {account.balance} {account.currency}
                </p>
              </div>
              <div className="card-row arrow-icon">
                <div className="arrow">
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              </div>
            </Card>
          ))}
      </CardsGrid>
    </ListWrapper>
  );
};

export default AccountList;
