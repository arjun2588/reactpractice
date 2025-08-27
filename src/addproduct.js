import React,{useState} from 'react';

export default function AddProduct({initialData,handleProductChange,handleParentSubmit,handlePage}) {
    const [isSubmit,setIsSubmit]=useState(false);
    function handleSubmit(e){
        e.preventDefault();
        const newProduct = {
            id:initialData.length + 1,
            name:e.target.name.value,
            price:e.target.price.value
        }
        const mergeData = [...initialData,newProduct];
        handleProductChange(mergeData);
        setIsSubmit(true);
        handleParentSubmit(true);
        handlePage('list');
    }
    return (
        <>
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='name'>Name:</label>
            <input type="text" name='name' placeholder='Enter Name'/>
            <label htmlFor='price'>Price:</label>
            <input type="text" name='price' placeholder='Enter Price'/>
            <button type='submit'>Add Product</button>
        </div>
        </form>
        </>
    );


}