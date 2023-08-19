import React from "react";

const CartContext=React.createContext({
    items:[],
    quantity:0,
    totalAmount:0,
    addItem:(item)=>{},
    setTotalAmount: (amount) => {}, 
    updateItemQuantity:(id)=>{}

})
export default CartContext;