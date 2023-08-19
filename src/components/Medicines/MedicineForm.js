import React,{useState} from "react";
import Card from "../UI/Card";

const MedicineForm=(props)=>{
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState('');

    const nameHandler=(event)=>{
        setName(event.target.value);
    }
    const descriptionHandler=(event)=>{
        setDescription(event.target.value);
    }
    const priceHandler=(event)=>{
        setPrice(event.target.value);
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        const MedicineData={
            id:Math.random().toString(),
            name:name,
            description:description,
            price:price
        }
        props.onSaveData(MedicineData);
        setName('');
        setDescription('');
        setPrice('');
        
    }
    return(
        <div style={{marginTop:'100px'}}>
        <Card>
        <form onSubmit={submitHandler}>
            <label>Medicine Name:</label>
            <input type="text" value={name} onChange={nameHandler}/>
            <label>Description:</label>
            <input type="text" value={description} onChange={descriptionHandler}/>
            <label>Price</label>
            <input type="number" value={price} onChange={priceHandler}/>
            <button>Add Item</button>
        </form>
        </Card>
        </div>
    )
}
export default MedicineForm