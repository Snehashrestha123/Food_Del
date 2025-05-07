import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])  //fetching the data of the menu from the database

    //add to cart
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {             //create new entry for our food products
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {                                //if product is already avaiable and it will increase the value by 1
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {             //this means that the user is logged in
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
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

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: (token) });
        setCartItems(response.data.CartData);
    }

    useEffect(() => {
        // to run the above fetchFoodList when the webpage is loading
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {             //when the webpage is refreshed, the user won't get logged out.
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }

        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>

    )
}

export default StorecontextProvider;