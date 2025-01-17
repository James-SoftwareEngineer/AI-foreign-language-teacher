import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useUser from "../hooks/useUser";
import useLoading from "../hooks/useLoding";

const NavbarContainer = styled.div`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 12%;
`;

const NavbarLink = styled.div`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;
  &:hover {
    color: #ccc;
  }
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, logOut, getUserData } = useUser();
  const { isInitializeLodingTrue, isInitializeLodingFalse } = useLoading();

  const handleLogOut = () => {
    logOut();
    navigate('/login');
  }

  useEffect(() => {
    isInitializeLodingTrue();
    getUserData();
    isInitializeLodingFalse();
  }, []);

  return (
    <NavbarContainer>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
        <li><NavbarLink onClick={() => navigate('/')}>Home</NavbarLink></li>
        <li><NavbarLink onClick={() => navigate('/about')}>About</NavbarLink></li>
        <li><NavbarLink onClick={() => navigate('/')}>course-list</NavbarLink></li>
      </ul>
    {userData ? (
      <>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
        <li><NavbarLink>{userData.name}</NavbarLink></li>
        <li><NavbarLink>{userData.userLevel}</NavbarLink></li>
        <li><NavbarLink onClick={handleLogOut}>Logout</NavbarLink></li>
      </ul>
      </>
    ) : (
      <>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
        <li><NavbarLink onClick={() => navigate('/sign-up')}>Sign Up</NavbarLink></li>
        <li><NavbarLink onClick={() => navigate('/login')}>Login</NavbarLink></li>
      </ul>
      </>
    )}
    </NavbarContainer>
  );
};

export default Navbar