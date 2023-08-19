import React,{useContext,useEffect,useState} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import CartContext from "../store/cart-context";


const HeaderCartButton=(props)=>{
    const cartctx=useContext(CartContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);

    useEffect(() => {
        if (cartctx.items) { // Check if cartctx.items is defined
          const totalItems = cartctx.items.reduce((total, item) => {
            return total + item.quantity;
          }, 0);
          setNumOfCartItems(totalItems);
        }
      }, [cartctx.items]);
   
    
    return(
        <>
        <button className={classes.button} onClick={props.cartOpenHandler}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
        </>
    )
}
export default HeaderCartButton
/*import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {
  const cartctx = useContext(CartContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  useEffect(() => {
    const totalItems = cartctx.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setNumOfCartItems(totalItems);
  }, [cartctx.items]);

  return (
    <button className={classes.button} onClick={props.cartOpenHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;*/
