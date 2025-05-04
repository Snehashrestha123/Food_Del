import React, { useState } from 'react';
import Navbar from './components/Navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import LoginPopup from './components/loginPopup/LoginPopup';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';
import Placeorder from './pages/placeorder/placeorder';

const App = () => { 

  const [showLogin,setShowLogin] = useState(false)
  return ( 
    <>  
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<Placeorder/>} />
        </Routes>
      </div>
      <Footer />
    </>  //this is needed because we are returning two elements: app and footer. So use fragmet or single div.
  );
};

export default App;



