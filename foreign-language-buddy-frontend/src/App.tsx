import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/home';
import ContextProvider from './context';
import Header from './components/header';
import Navbar from './components/navbar';
import Dashboard from './pages/English/dashboard';
import NotFound from './components/404page';
import Login from './pages/authentcation/login';
import SignUp from './pages/authentcation/signUp';


const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard/:courseName' element={<Dashboard />}></Route>
          <Route path='/404' element={<NotFound />}></Route>
        </Routes>
      </Router>
    </ContextProvider>

  );
}

export default App;
