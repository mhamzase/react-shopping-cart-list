import React, { useState } from 'react'
import './App.css';
import { FaChevronRight, FaChevronLeft, FaCircle, FaCheckCircle, FaPlus } from 'react-icons/fa'
const App = () => {

  const [items, setItems] = useState([
    { itemName: 'Apple', quantity: 5, isSelected: false },
  ])


  const [inputItem, setInputItem] = useState("")
  const [totalCountQuantities, setTotalCountQuantities] = useState(5)




  const handleAddItemClick = () => {
    const newItem = {
      itemName: inputItem,
      quantity: 1,
      isSelected: false
    }

    const newItemsArray = [...items, newItem]

    setItems(newItemsArray)
    setInputItem('')
    calculateTotal()
    
  }

  const toggleItemComplete = (index) =>{
    const newItemsArray = [...items];

    newItemsArray[index].isSelected = !newItemsArray[index].isSelected;

    setItems(newItemsArray);
  }


  const handleIncreaseQuantity = (index) =>{
    const newItemsArray = [...items];
    newItemsArray[index].quantity++;
    setItems(newItemsArray)
    calculateTotal()
  }


  function hanldeDecreaseQuantity(index){
    const newItemsArray = [...items];

    if(newItemsArray[index].quantity > 0)
    {
      newItemsArray[index].quantity--;
    }
    setItems(newItemsArray)
    calculateTotal()
  }

  const calculateTotal = () =>{
    const totalItemsCount = items.reduce((total,item) => {
      return total + item.quantity;
    }, 0)

    setTotalCountQuantities(totalItemsCount);
  }

  return (
    <div className='app-background'>
      <div className='main-container'>
        <div className='add-item-box'>
          <input value={inputItem} onChange={(event) => setInputItem(event.target.value)} className='add-item-input' placeholder='Add an item...' />
          <FaPlus onClick={() => handleAddItemClick()} style={{cursor:'pointer'}} />
        </div>
        <div className='item-list'>
          {items.map((item,index) =>
            <div className='item-container'>
              <div className='item-name' onClick={() => toggleItemComplete(index)}>

                {item.isSelected ? (
                  <>
                    <FaCheckCircle className="icon-tick" />
                    <span className='completed'>{item.itemName}</span>
                  </>
                ) : (
                    <>
                      <FaCircle />
                      <span>{item.itemName}</span>
                    </>
                  )}
              </div>
              <div className='quantity'>
                <button>
                  <FaChevronLeft onClick={()=> hanldeDecreaseQuantity(index)}/>
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FaChevronRight onClick={() => handleIncreaseQuantity(index)}/>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='total'>Total Items : {totalCountQuantities}</div>
      </div>
    </div>
  );
}

export default App;
