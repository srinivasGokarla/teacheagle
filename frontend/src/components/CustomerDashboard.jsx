import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
const CustomerDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const navigation = useNavigate();


  useEffect(() => {
    
    fetch('http://localhost:5000/user/inventory')
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error('Error fetching inventory:', error));

  
  }, []);
  const handleLogout = () => {
   
    localStorage.removeItem('authToken');
   
    navigation('/login');
  };
  


  return (
    <div className="container" >
      <h2>Customer Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
     
      <div className='grid'>
        {inventory.map((product) => (
          <div key={product._id}>
            <img src={product.image} alt="" />
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Weight: {product.weight}</p>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CustomerDashboard;
