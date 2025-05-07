import React, { useContext } from 'react'
import './Cart.css'
import { Storecontext } from '../../context/Storecontext'
import { food_list } from '../../assets/assets';
import { useNavigate } from 'react-router';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(Storecontext);
    const navigate= useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    // If food available and user place the order, then display in cart too through clicking in basket sign
                    if (cartItems[item._id] > 0) {
                        return (
                             <div key={item._id} className='cart-items-title cart-items-item'>
                             {/* <div className='cart-items-title cart-items-item'>  */}
                                <img src={url+"/images/"+item.image} alt="" />
                                <p>{item.name}</p> 
                                <p>${item.price}</p>
                                {/* return the quantity for the product */}
                                <p>{cartItems[item._id]}</p>
                                {/* Calculates the total price, price*quantity */}
                                <p>${item.price * cartItems[item._id]}</p>
                                <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-buttom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>${2}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Total</p>
                            {/* subtotal + delivery charge */}
                            <p>${getTotalCartAmount()+2}</p>    
                        </div>

                    </div>
                    <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
                    {/* We have use order because in app file we have use order */}
                </div>
            </div>

        </div>
    )
}

export default Cart
