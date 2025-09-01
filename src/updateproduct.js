import React,{useState,useEffect} from 'react';

export default function UpdateProduct({updateId, data, handleProductChange,handleParentUpdateSubmit,handlePage}) {
    const [isUpdateSubmit,setIsUpdateSubmit] = useState(false);
    const [formData,setFormData] = useState({name:'',price:''});
    const product = data.find(data => data.id === updateId);
    
    useEffect(()=>{
     setFormData({name:product.name,price:product.price});   
    },[product])

    function handleInputChange(e){
        const {name,value} = e.target;
        setFormData(prevState => {
            return {...prevState,[name]:value};
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const updatedProducts = data.map(product => {
            if(product.id === updateId){
                return {...product,...formData}
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
                <input 
                type="text" 
                name='name' 
                placeholder='Enter Name' 
                value={formData.name} 
                onChange={handleInputChange}
                />
                <label htmlFor='price'>Price:</label>
                <input 
                type="text" 
                name='price' 
                placeholder='Enter Price' 
                value={formData.price} 
                onChange={handleInputChange}
                />
                <button type='submit'>Update Product</button>
            </div>
        </form>
        </>
    );


}