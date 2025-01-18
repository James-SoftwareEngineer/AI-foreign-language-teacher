import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import styled, { createGlobalStyle } from 'styled-components';
import Home from './pages/home';
import ContextProvider from './context';
import Header from './components/header';
import Navbar from './components/navbar';
import Dashboard from './pages/English/dashboard';
import NotFound from './components/404page';
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signUp';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #1a1b1e;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2d2e32;
  }

  ::-webkit-scrollbar-thumb {
    background: #4a4b50;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #64ffda;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a1b1e, #2d2e32);
`;

const MainContent = styled.main`
  // padding-top: 64px; // Adjust based on your navbar height
`;

const App = () => {
  return (
    <ContextProvider>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Header />
          <Navbar />
          <MainContent>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard/:courseName' element={<Dashboard />} />
              <Route path='/404' element={<NotFound />} />
            </Routes>
          </MainContent>
        </Router>
      </AppContainer>
    </ContextProvider>
  );
}

export default App;
