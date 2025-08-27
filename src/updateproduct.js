import React,{useState} from 'react';

export default function UpdateProduct({updateId, data, handleProductChange,handleParentUpdateSubmit,handlePage}) {
    const [isUpdateSubmit,setIsUpdateSubmit] = useState(false);
    const product = data.find(data => data.id === updateId);
    function handleSubmit(e){
        e.preventDefault();
        const productData = {
            name:e.target.name.value,
            price:e.target.price.value
        }
        const updatedProducts = data.map(product => {
            if(product.id === updateId){
                return {...product,...productData}
            }
            return product;
        })
        handleProductChange(updatedProducts);
        setIsUpdateSubmit(true);
        handleParentUpdateSubmit(true);
        handlePage('list');
    }
    return (
        <>
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Name:</label>
                <input type="text" name='name' placeholder='Enter Name' defaultValue={product.name} />
                <label htmlFor='price'>Price:</label>
                <input type="text" name='price' placeholder='Enter Price' defaultValue={product.price} />
                <button type='submit'>Update Product</button>
            </div>
        </form>
        </>
    );


}