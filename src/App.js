import React,{useEffect, useState} from 'react';
import ProductList from './ProductList';
import AddProduct from './addproduct';
import UpdateProduct from './updateproduct';
import DataFetcher from './loadingdata';
import Weather from './weather';

function App() {
  const storedData =  [];
  const [productData, setProductData] = useState(storedData);
  
  const initialData = [
    { id: 1, name: 'Apple', price: '$10' },
    { id: 2, name: 'Samsung', price: '$20' },
    { id: 3, name: 'Redmi', price: '$30' }
  ];
  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://mocki.io/v1/0818e961-3960-4976-859e-2955c3c2a417');
      const storedData = await response.json();
      setProductData(storedData);
      // localStorage.setItem('productData', JSON.stringify(storedData));
    }
    // const storedData = localStorage.getItem('productData');
    // if (!storedData) {
    //   localStorage.setItem('productData', JSON.stringify(initialData));
    // }
    fetchData();
  },[]);
  // const storedData = JSON.parse(localStorage.getItem('productData')) || initialData;
  // const [productData, setProductData] = useState(storedData);
  const [page,setPage] = useState('list');
  const [isSubmit,setIsSubmitParent] = useState(false);
  const [isUpdateSubmit,setIsUpdateSubmitParent] = useState(false);
  const [updateId,setUpdatedId] = useState(null);
  const [colorCode,setColorCode]=useState('#000000');

  function handleColorChange(color){
    setColorCode(color);
  }

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
    <div className="App" style={{  width:'60%',margin: 'auto'}}>
      {page === 'list' && <ProductList initialData={storedData}  data={productData} handleFilterProductChange={handleFilterProductChange} handlePage={handlePage} isSubmit={isSubmit} isUpdateSubmit={isUpdateSubmit} handleProductChange={handleProductChange} />}
      {/* {page == 'add' &&  <AddProduct initialData={storedData} handleProductChange={handleProductChange} handleParentSubmit={handleParentSubmit} handlePage={handlePage} />} */}
      {/* {page === 'update' && <UpdateProduct data={productData} handleProductChange={handleProductChange} updateId={updateId} handleParentUpdateSubmit={handleParentUpdateSubmit} handlePage={handlePage} />} */}
      {<Weather />}
    </div>
  );
}

export default App;
