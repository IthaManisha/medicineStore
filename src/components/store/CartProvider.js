import React, { useState } from "react";
import CartContext from "./cart-context";
import axios from "axios";


const CartProvider=(props)=>{
    const[cartItems,setCartItems]=useState([]);
    const[totalAmount,setTotalAmount]=useState(0);

    const addItemToCartHandler=(item)=>{
        const existingItem=cartItems.find((cartItem)=>cartItem.id === item.id)

        if(existingItem){
            setCartItems((prevItems)=>
                prevItems.map((cartItem)=>
                cartItem.id === item.id ?
                {...cartItem,
                    quantity:cartItem.quantity+1,
                    totalPrice:parseFloat(cartItem.totalPrice)+parseFloat(cartItem.price)

                }:cartItem)
        );
        }
        else{
            setCartItems((prevItems)=>[...prevItems,{...item,quantity:1,totalPrice:item.price}])
        }

        setTotalAmount((prevAmount)=>prevAmount+item.amount*item.price)

    }
    const updateItemQuantity = async(itemId) => {
        try {
            // eslint-disable-next-line no-template-curly-in-string
            console.log("itemId:", itemId);
            let response=await axios.get(`https://crudcrud.com/api/56a662a7f5474ec38197b928fb1620df/orders/itemId`);
            let cartorder=response.data[0];
            console.log('cart order is:',cartorder)
            cartorder.amount=cartorder.amount+1;
            const res = await axios.put(
                `https://crudcrud.com/api/56a662a7f5474ec38197b928fb1620df/orders/itemId`,
                cartorder
            );
            console.log("Item updated:", res.data);
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, amount: cartorder.amount} : item
            )
        );
            }catch (error) {
                console.error("Error updating item:", error);
            }

        
    };


    const cartContext = {
        items: cartItems,
        totalAmount: totalAmount,
        addItem: addItemToCartHandler,
        setTotalAmount:setTotalAmount,
        updateItemQuantity:updateItemQuantity, 
        };
    
      return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
}
export default CartProvider;

/*import React, { useState, useEffect } from "react";
import CartContext from "./cart-context";
import axios from "axios";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://crudcrud.com/api/d070c74975b3449295ef17e89fc2724e/cart"); // Adjust the API endpoint
      setCartItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const storeCartItems = async () => {
    try {
      const response = await axios.post("https://crudcrud.com/api/d070c74975b3449295ef17e89fc2724e/cart", {
        items: cartItems,
        totalAmount: totalAmount,
      });
      console.log("Cart items stored:", response.data);

      // Optionally, you can fetch updated cart items after storing
      fetchCartItems();

      // Handle success, show confirmation, etc.
    } catch (error) {
      console.error("Error storing cart items:", error);
      // Handle error, show error message, etc.
    }
  };

  const addItemToCartHandler = async (item) => {
    
    const existingItem = cartItems ? cartItems.find((cartItem) => cartItem.id === item.id) : null;

    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: parseFloat(cartItem.totalPrice) + parseFloat(cartItem.price),
            }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      //setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1, totalPrice: item.price }]);
      setCartItems((prevItems) => {
        if (Array.isArray(prevItems)) {
          return [...prevItems, { ...item, quantity: 1, totalPrice: item.price }];
        } else {
          return [{ ...item, quantity: 1, totalPrice: item.price }];
        }
      });
    }

    setTotalAmount((prevAmount) => prevAmount + item.amount * item.price);
  };

  const cartContext = {
    items: cartItems,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    storeCartItems: storeCartItems,
    setTotalAmount:setTotalAmount, 
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;*/


