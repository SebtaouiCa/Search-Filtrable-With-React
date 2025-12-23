import { useState } from 'react'
import './App.css'

function FilterableProductTable(){
  const [searchText, setSearchText] = useState('');
  const [inStock, setInStock] = useState(false);
  return (
    <>
      <form> 
          <input type="text" name="search" id="search-input" value={searchText} placeholder='Search...' onChange={(e)=>{
            setSearchText(e.target.value)
          }} />
          <div>
            <input type="checkbox" name="showInStock" id="showInStock-input" onChange={(e)=>{
              setInStock(e.target.checked);
            }} />
            <span>Only show products in stock</span>
          </div>
      </form>

      <div>
        <ProductsTable searchText={searchText} inStock={inStock} />
      </div>
    </>
  ); 


}


function ProductCategoryRow({category}){
  return (
    <tr>
      <td colSpan={2}> <b>{category}</b></td>
    </tr>
  )
}
function ProductRow({ name, price, stocked }){
  return (
          <tr style={{color: !stocked && 'red'}}>
            <td>{name}</td>
            <td>{price}</td>
            <td>{stocked ? 'Yes' : 'No'}</td>
          </tr>
    );
  
}

function ProductsTable({searchText, inStock}) {
  
  const data = [
      { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
      { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
      { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
      { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
      { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
      { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
    ];
  const rows = [];
 
  const filteredProducts = data.filter(product => {
    if (inStock && !product.stocked) return false;
    if (
      searchText &&
      !product.name.toLowerCase().includes(searchText.toLowerCase())
    ) return false;
    return true;
  });
  let lastCategory = null;

  filteredProducts.forEach(product => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />
      );
    }

  rows.push(
      <ProductRow
        key={product.name}
        name={product.name}
        price={product.price}
        stocked={product.stocked}
      />
    );

    lastCategory = product.category;
  });




  return (
    <table>
      <thead>
        <tr>
              <th><b>Name</b></th>
              <th><b>Price</b></th>
              <th><b>In Stock</b></th>

        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  
  )
}

function App() {
  
  return (
    <>
      <h1>Search Element</h1>
      <hr />
      <FilterableProductTable />
    </>
  )
}

export default App
