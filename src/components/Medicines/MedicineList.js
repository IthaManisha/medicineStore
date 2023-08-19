/*import React,{useContext} from "react";
import Card from "../UI/Card";
import CartContext from "../store/cart-context";
import axios from "axios";

const MedicineList=(props)=>{
    const cartctx=useContext(CartContext);

    const AddItemHandler = async (medicine) => {
        const existingItem = cartctx.items.find((item) => item.id === medicine.id);

        if (existingItem) {
            // Item with the same id already exists, update the quantity
            cartctx.updateItemQuantity(medicine.id, existingItem.quantity + 1);
        } else {
            // Item doesn't exist in the cart, add it with quantity 1
            const itemToAdd = {
                id: medicine.id,
                name: medicine.name,
                amount: 1,
                price: medicine.price,
                totalPrice: medicine.price,
            };
            cartctx.addItem(itemToAdd);
        }

        try {
            const response = await axios.post(
                "https://crudcrud.com/api/d070c74975b3449295ef17e89fc2724e/cart",
                itemToAdd
            );
            console.log("post response:", response);
        } catch (error) {
            console.error("Error creating item:", error);
        }
    };

    

    return(
        <Card>
        {props.medicines.map((medicine)=>
        <div key={medicine.id}>
         <h3 style={{ paddingLeft: '70px' }}>MedicineName:{medicine.name}</h3>
         <h3 style={{ paddingLeft: '70px' }}>Description:{medicine.description}</h3>
         <h3 style={{ paddingLeft: '70px',paddingRight:'70px' }}>Price:{medicine.price}</h3>
         <button onClick={()=>AddItemHandler(medicine)}>AddItem</button>
        </div>
        )}
        </Card>
    )
}
export default MedicineList*/
import React, { useContext } from "react";
import Card from "../UI/Card";
import CartContext from "../store/cart-context";
import axios from "axios";

const MedicineList = (props) => {
    const cartctx = useContext(CartContext);

    const AddItemHandler = async (medicine) => {
        console.log("medicine:",medicine);
        const existingItem = cartctx.items.find((item) => item.id === medicine.id);
    
        let itemToAdd = null;
    
        if (existingItem) {
            // Item with the same id already exists, update the quantity
            cartctx.updateItemQuantity(medicine.id);
        } else {
            // Item doesn't exist in the cart, add it with quantity 1
            itemToAdd = {
                id: medicine.id,
                name: medicine.name,
                amount: 1,
                price: medicine.price,
                totalPrice: medicine.price,
            };
            
            try {
                const response = await axios.post(
                    "https://crudcrud.com/api/56a662a7f5474ec38197b928fb1620df/orders",
                    itemToAdd,
                    {
                        headers: {
                            "Content-Type": "application/json", // Set the appropriate content type
                        },
                    }
                );
                console.log("post response:", response);
            } catch (error) {
                console.error("Error creating item:", error);
            }
        }
    
        if (itemToAdd) {
            // If itemToAdd is defined, add it to the context
            cartctx.addItem(itemToAdd);
        }
    };
    
    

    return (
        <Card>
            {props.medicines.map((medicine) => (
                <div key={medicine.id}>
                    <h3 style={{ paddingLeft: '70px' }}>MedicineName: {medicine.name}</h3>
                    <h3 style={{ paddingLeft: '70px' }}>Description: {medicine.description}</h3>
                    <h3 style={{ paddingLeft: '70px', paddingRight: '70px' }}>Price: {medicine.price}</h3>
                    <button onClick={() => AddItemHandler(medicine)}>Add Item</button>
                </div>
            ))}
        </Card>
    );
};

export default MedicineList;

