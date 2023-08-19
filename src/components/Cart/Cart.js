/*import React,{useContext} from "react";
import classes from './Cart.module.css'
import CartContext from "../store/cart-context";

const Cart=(props)=>{
    const cartctx=useContext(CartContext);
    
    const cartItems = (
        <div>
          {cartctx.items.map((item) => (
            <div key={item.id} >
            <div>
            
              <h3>{item.name}</h3> 
              <p>price:${item.price}</p>
              <p>quantity X{item.quantity}</p>
              
             
            </div>
            <div className={classes.actions}>
            <p>totalprice:{item.totalPrice}</p>
            </div>
            </div>
          ))}
        </div>
      );
    return(
    <div style={{marginTop:'80px'}}>
    {cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartctx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
    )
}
export default Cart;*/
import React, { useContext, useEffect, useState } from "react";
import classes from './Cart.module.css';
import CartContext from "../store/cart-context";
import axios from "axios";

const Cart = (props) => {
    const cartctx = useContext(CartContext);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("https://crudcrud.com/api/56a662a7f5474ec38197b928fb1620df/orders");
                const cart = response.data;
                const totalAmount = cart.reduce((total, item) => total + item.amount*item.price, 0);
                cartctx.setTotalAmount(totalAmount);
                setCartItems(cart);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const cartItemsElements = cartItems.map((item) => (
        <div key={item.id} className={classes.cartItem}>
            <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.amount}</p>
            </div>
            <div className={classes.actions}>
                <p>Total Price: {item.totalPrice}</p>
            </div>
        </div>
    ));

    useEffect(() => {
        console.log("Fetched cart items:", cartItems);
        console.log("Context total amount:", cartctx.totalAmount);
    }, [cartItems, cartctx.totalAmount]);

    return (
        <div style={{ marginTop: '80px' }}>
            <div className={classes.cartItems}>
                {cartItemsElements}
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{cartctx.totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </div>
    );
}

export default Cart;
