import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = (setShowLogin) => {

    const [currState, setCurrState] = useState("Login")
  return (
    <div className='login-popup'> 
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input type="text" placeholder='Your name' required />}
            <input type="email" placeholder='Your email' required />
            <input type="password" placeholder='Your password' required />
        </div>
        <button>{currState==="Sign up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree the terms and policies</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click Here!</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        }
        {/* State of login- 1st code, state of signup- 2nd code */}        
      </form>
    </div>
  )
}

export default LoginPopup
