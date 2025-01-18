import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useUser from "../hooks/useUser";
import useLoading from "../hooks/useLoading";

const NavbarContainer = styled.div`
  background: #1a1b1e;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavbarLink = styled.div`
  color: #E0E0E0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(100, 255, 218, 0.1),
      rgba(72, 187, 120, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    border: 1px solid rgba(100, 255, 218, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    &::before {
      opacity: 1;
    }
  }
`;

const UserInfo = styled(NavbarLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(100, 255, 218, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(100, 255, 218, 0.2);
  }
`;

const UserLevel = styled.span`
  background: linear-gradient(135deg, #64ffda, #48bb78);
  color: #1a1b1e;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(100, 255, 218, 0.3);

    &::before {
      opacity: 1;
    }
  }
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
      <NavList>
        <li><NavbarLink onClick={() => navigate('/')}>Home</NavbarLink></li>
        <li><NavbarLink onClick={() => navigate('/about')}>About</NavbarLink></li>
        <li><NavbarLink onClick={() => navigate('/')}>Courses</NavbarLink></li>
      </NavList>
      {userData ? (
        <NavList>
          <li><UserInfo>{userData.name}</UserInfo></li>
          <li><UserLevel>{userData.userLevel}</UserLevel></li>
          <li><NavbarLink onClick={handleLogOut}>Logout</NavbarLink></li>
        </NavList>
      ) : (
        <NavList>
          <li><NavbarLink onClick={() => navigate('/signup')}>Sign Up</NavbarLink></li>
          <li><NavbarLink onClick={() => navigate('/login')}>Login</NavbarLink></li>
        </NavList>
      )}
    </NavbarContainer>
  );
};

export default Navbar