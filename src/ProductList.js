import React,{useState} from 'react';

export default function ProductList({initialData,data,handleFilterProductChange,handlePage,isSubmit,handleProductChange,isUpdateSubmit}) {
  const [filterText,setFilterText] = useState('')
  const [isLoading,setIsLoading] = useState(true);
  const [iserror,setIserror] = useState(false);
  const tableStyle = {
    border: '1px solid #000',
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  }
  const cellStyle={
    border: '1px solid #000',
    padding: '8px'
  }
  const headStyle={
    ...cellStyle,
    backgroundColor: '#f2f2f2'
  }

  function filterProduct(value){
    if(value !== ''){
      let filteredProductData = data.filter(product => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      })
      handleFilterProductChange(filteredProductData);
    }else{
      handleFilterProductChange(initialData);
    }  
  }

  function deleteProduct(id){
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if(confirmDelete === false) return;
    const nonDeletedProduct = data.filter((product) => {
      return product.id !== id;
    })
    handleProductChange(nonDeletedProduct)
  }

  function updateProduct(id){
    handlePage('update',id)
  }


  return (
    <>
      <h1>Product List</h1>
      <p>This is the product list page.</p>
      { isSubmit && <label style={{color:'green'}}>Product add successfully.</label>}
      { isUpdateSubmit && <label style={{color:'green'}}>Product Updated successfully.</label>}
      <p><input type='text' style={{marginBottomm:'10px'}} value={filterText} onChange={(e) => {setFilterText(e.target.value);filterProduct(e.target.value);}} placeholder='type for filter..' />
      <button onClick={()=>handlePage('add')}>Add Product</button></p>
      <br />
      
      {data.length > 0 &&
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headStyle}>Id</th>
            <th style={headStyle}>Product</th>
            <th style={headStyle}>Price</th>
            <th style={headStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          data.map((product)=>{
            return(
              <tr key={product.id}>
                <td style={cellStyle}>{product.id}</td>
                <td style={cellStyle}>{product.name}</td>
                <td style={cellStyle}>{product.price}</td>
                <td><button onClick={() => updateProduct(product.id)}>edit</button>|
                <button onClick={() => deleteProduct(product.id)}>delete</button></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>}
      {data.length === 0 && <p>No Product Found</p>}
    </>
  );
}