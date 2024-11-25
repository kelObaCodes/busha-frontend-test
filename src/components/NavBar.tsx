import React from "react";
import styled from "styled-components";

const NavbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    max-width: 1200px;
    margin: 0 auto;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ProfileName = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
`;

const CircularDiv = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #e1e4e8;
    color: #000;
    font-weight: bold;
    font-size: 1.2rem;
`;

const Navbar: React.FC = () => {
    const profileName = "Oluwatobi Akindunjoye";
    const firstLetter = profileName.charAt(0).toUpperCase();

    return (
        <NavbarWrapper>
            <Logo>
                <img src="./images/logo.png" alt="Logo" height={30} />
            </Logo>
            <ProfileSection>
                <CircularDiv>{firstLetter}</CircularDiv>
                <ProfileName>{profileName}</ProfileName>
            </ProfileSection>
        </NavbarWrapper>
    );
};

export default Navbar;
