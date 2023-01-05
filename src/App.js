import React from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage'
import Startuppage from './components/Startuppage/Startuppage'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './components/Login/Login'
import SignUp from './components/signup/Signup'
import UserRegistration from './components/userRegisteration/UserRegistration'
import Objectives from './components/Objectives/Objectives'
import Investor from './components/InvestorPage/InvestorPage'
import InvestorLogin from './components/Login/InvestorLogin'
import InvestorRegistration from './components/userRegisteration/InvestorRegistration'
const App = () => {
  return (
    <div className='app'>
      {" "}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/startup" element={<Startuppage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ilogin" element={<InvestorLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/register" element={<UserRegistration />} />
          <Route path="/investor/register" element={<InvestorRegistration />} />
          <Route path="/objectives" element={<Objectives />} />
          <Route path="/investors" element={<Investor />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
