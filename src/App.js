import React,{useEffect, useState} from 'react';
import ProductList from './ProductList';
import AddProduct from './addproduct';
import UpdateProduct from './updateproduct';

function App() {
  const initialData = [
    { id: 1, name: 'Apple', price: '$10' },
    { id: 2, name: 'Samsung', price: '$20' },
    { id: 3, name: 'Redmi', price: '$30' }
  ];
  useEffect(() => {
    const storedData = localStorage.getItem('productData');
    if (!storedData) {
      localStorage.setItem('productData', JSON.stringify(initialData));
    }
  });
  const storedData = JSON.parse(localStorage.getItem('productData')) || initialData;
  const [productData, setProductData] = useState(storedData);
  const [page,setPage] = useState('list');
  const [isSubmit,setIsSubmitParent] = useState(false);
  const [isUpdateSubmit,setIsUpdateSubmitParent] = useState(false);
  const [updateId,setUpdatedId] = useState(null);

  function handleFilterProductChange(filteredProduct){
    setProductData(filteredProduct);
  }

  function handleProductChange(filteredProduct){
    setProductData(filteredProduct);
    localStorage.setItem('productData', JSON.stringify(filteredProduct));
  }
  function handlePage(value,id=null){
    setPage(value);
    setUpdatedId(id);
  }
  function handleParentSubmit(value){
    setIsSubmitParent(value);
  }
  function handleParentUpdateSubmit(value){
    setIsUpdateSubmitParent(value);
  }
  return (
    <>
      {page === 'list' && <ProductList initialData={storedData}  data={productData} handleFilterProductChange={handleFilterProductChange} handlePage={handlePage} isSubmit={isSubmit} isUpdateSubmit={isUpdateSubmit} handleProductChange={handleProductChange} />}
      {page == 'add' &&  <AddProduct initialData={storedData} handleProductChange={handleProductChange} handleParentSubmit={handleParentSubmit} handlePage={handlePage} />}
      {page === 'update' && <UpdateProduct data={productData} handleProductChange={handleProductChange} updateId={updateId} handleParentUpdateSubmit={handleParentUpdateSubmit} handlePage={handlePage} />}
    </>
  );
}

export default App;
