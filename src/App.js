import React, { useState } from "react";
import Header from "./components/Layout/Header";
import MedicineForm from "./components/Medicines/MedicineForm";
import MedicineList from "./components/Medicines/MedicineList";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";
import './App.css'

function App() {
  const[medicineList,setMedicineList]=useState([]);
  const[isCartOpen,setIsCartOpen]=useState(false);
  
  const cartOpenHandler=()=>{
    setIsCartOpen(true);
  }
  const cartHideHandler=()=>{
    setIsCartOpen(false);
  }
  const medicineListHandler=(data)=>{
   const updatedData=[...medicineList,data];
   setMedicineList(updatedData);
  }
  return (
    <CartProvider>
      <div className={`cart-container ${isCartOpen ? 'cart-open' : ''}`}>
      {isCartOpen && <Cart onHideCart={cartHideHandler} />}
      </div>
      <Header cartOpenHandler={cartOpenHandler} />
      <div>
      <MedicineForm onSaveData={medicineListHandler}/>
      <MedicineList medicines={medicineList}/>
      </div>
    </CartProvider>
  );
}

export default App;
