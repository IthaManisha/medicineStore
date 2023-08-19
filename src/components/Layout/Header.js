import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css'



const Header=(props)=>{
    return(
        <>
        <header className={classes.header}>
          
          <h1>ReactMedicines</h1>
          
          <HeaderCartButton cartOpenHandler={props.cartOpenHandler}/>
          
        </header>
        
        </>
    )
}
export default Header;