import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    //add to cart
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {             //create new entry for our food products
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {                                //if product is already avaiable and it will increase the value by 1
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {   //cart item is obejct so forin loop
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>

    )
}

export default StorecontextProvider;