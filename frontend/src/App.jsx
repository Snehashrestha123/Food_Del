import React, { useState, useContext, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import LoginPopup from './components/loginPopup/LoginPopup';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';
import Placeorder from './pages/placeorder/placeorder';
import { Storecontext } from './context/Storecontext';

const App = () => { 
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useContext(Storecontext);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      setShowLogin(true);
      return <Navigate to="/" />;
    }
    return children;
  };

  // Don't show login popup on initial load if token exists
  useEffect(() => {
    if (token) {
      setShowLogin(false);
    }
  }, [token]);

  return ( 
    <>  
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
          } />
          <Route path='/order' element={<Placeorder/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;



