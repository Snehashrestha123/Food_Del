import React, { useContext } from 'react'
import './Placeorder.css'
import { Storecontext } from '../../context/Storecontext'

const Placeorder = () => {
    const {getTotalCartAmount}= useContext(Storecontext);
    
    return (
        <form className="place-order">
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name' />
                    <input type="text" placeholder='Last Name' />
                </div>
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='Address' />
            </div>
            <div className="place-order-right">
            <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>Rs.{2}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>Rs.{getTotalCartAmount()+2}</p>    
                        </div>

                    </div>
                    <button>Proceed to payment</button>
                </div>

            </div>

        </form>
    )
}

export default Placeorder
