import React, { useState } from 'react';

const API_BASE_URL = 'PLACEHOLDER/api';

const InventoryManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('items');
  const [message, setMessage] = useState('');
  
  const [itemForm, setItemForm] = useState({
    itemName: '',
    location: '',
    quantity: '',
    price: '',
  });
  
  const [searchForm, setSearchForm] = useState({
    itemId: '',
    inventoryId: ''
  });
  
  const [updateForm, setUpdateForm] = useState({
    itemId: '',
    newName: '',
    newQuantity: '',
    newLocation: '',
    newPrice: ''
  });
  
  const [reservationForm, setReservationForm] = useState({
    itemId: '',
    quantity: '',
    duration: ''
  });
  
  const [searchResults, setSearchResults] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('${API_BASE_URL}/items/createItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemName: itemForm.itemName,
          location: itemForm.location,
          quantity: parseInt(itemForm.quantity),
          price: parseFloat(itemForm.price)
        })
      });

      if (response.ok) {
        showMessage('Item created successfully!');
        setItemForm({ itemName: '', location: '', quantity: '', price: '' });
      } else {
        showMessage('Failed to create item');
      }
    } catch (error) {
      showMessage('Error creating item');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let results = {};
      
      if (searchForm.itemId) {
        const nameResponse = await fetch(`${API_BASE_URL}/items/getItemName?itemId=${searchForm.itemId}`);
        if (nameResponse.ok) {
          results.name = await nameResponse.text();
        }

        const quantityResponse = await fetch(`${API_BASE_URL}/items/getItemQuantity?itemId=${searchForm.itemId}`);
        if (quantityResponse.ok) {
          results.quantity = await quantityResponse.text();
        }

        const locationResponse = await fetch(`${API_BASE_URL}/items/getItemLocation?itemId=${searchForm.itemId}`);
        if (locationResponse.ok) {
          results.location = await locationResponse.text();
        }

        const priceResponse = await fetch(`${API_BASE_URL}/items/getItemPrice?itemId=${searchForm.itemId}`);
        if (priceResponse.ok) {
          results.price = await priceResponse.text();
        }
      }

      if (searchForm.inventoryId) {
        const inventoryResponse = await fetch(`${API_BASE_URL}/inventories/getInventoryItems?inventoryId=${searchForm.inventoryId}`);
        if (inventoryResponse.ok) {
          results.inventoryItems = await inventoryResponse.text();
        }
      }

      setSearchResults(results);
      showMessage('Search completed');
    } catch (error) {
      showMessage('Error searching');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updates = [];

      if (updateForm.newName) {
        const response = await fetch(`${API_BASE_URL}/items/updateItemName?itemId=${updateForm.itemId}&newItemName=${updateForm.newName}`, {
          method: 'PATCH'
        });
        if (response.ok) updates.push('name');
      }

      if (updateForm.newQuantity) {
        const response = await fetch(`${API_BASE_URL}/items/updateItemQuantity?itemId=${updateForm.itemId}&newQuantity=${updateForm.newQuantity}`, {
          method: 'PATCH'
        });
        if (response.ok) updates.push('quantity');
      }

      if (updateForm.newLocation) {
        const response = await fetch(`${API_BASE_URL}/items/updateItemLocation?itemId=${updateForm.itemId}&newLocation=${updateForm.newLocation}`, {
          method: 'PATCH'
        });
        if (response.ok) updates.push('location');
      }

      if (updateForm.newPrice) {
        const response = await fetch(`${API_BASE_URL}/items/updateItemPrice?itemId=${updateForm.itemId}&newPrice=${updateForm.newPrice}`, {
          method: 'PATCH'
        });
        if (response.ok) updates.push('price');
      }

      showMessage(`Updated: ${updates.join(', ')}`);
      setUpdateForm({ itemId: '', newName: '', newQuantity: '', newLocation: '', newPrice: '' });
    } catch (error) {
      showMessage('Error updating item');
    }
  };

  const handleCreateReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/create?itemId=${reservationForm.itemId}&quantity=${reservationForm.quantity}&durationInMillis=${parseInt(reservationForm.duration) * 60000}`, {
        method: 'POST'
      });

      if (response.ok) {
        showMessage('Reservation created successfully!');
        setReservationForm({ itemId: '', quantity: '', duration: '' });
      } else {
        showMessage('Failed to create reservation');
      }
    } catch (error) {
      showMessage('Error creating reservation');
    }
  };

  const handleCancelReservation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/cancel?itemId=${reservationForm.itemId}&quantity=${reservationForm.quantity}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showMessage('Reservation cancelled successfully');
        setReservationForm({ itemId: '', quantity: '', duration: '' });
      } else {
        showMessage('Failed to cancel reservation');
      }
    } catch (error) {
      showMessage('Error cancelling reservation');
    }
  };

  const commonInputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    marginRight: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Inventory Management System</h1>
      
      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {['items', 'search', 'update', 'reservations'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...buttonStyle,
              backgroundColor: activeTab === tab ? '#1976d2' : '#e0e0e0',
              color: activeTab === tab ? 'white' : 'black',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'items' && (
        <form onSubmit={handleCreateItem}>
          <input
            style={commonInputStyle}
            value={itemForm.itemName}
            onChange={(e) => setItemForm({...itemForm, itemName: e.target.value})}
            placeholder="Item Name"
            required
          />
          <input
            style={commonInputStyle}
            value={itemForm.location}
            onChange={(e) => setItemForm({...itemForm, location: e.target.value})}
            placeholder="Location"
            required
          />
          <input
            style={commonInputStyle}
            type="number"
            value={itemForm.quantity}
            onChange={(e) => setItemForm({...itemForm, quantity: e.target.value})}
            placeholder="Quantity"
            required
            min="0"
          />
          <input
            style={commonInputStyle}
            type="number"
            value={itemForm.price}
            onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
            placeholder="Price"
            required
            min="0"
            step="0.01"
          />
          <button type="submit" style={buttonStyle}>Create Item</button>
        </form>
      )}

      {activeTab === 'search' && (
        <div>
          <form onSubmit={handleSearch}>
            <input
              style={commonInputStyle}
              value={searchForm.itemId}
              onChange={(e) => setSearchForm({...searchForm, itemId: e.target.value})}
              placeholder="Item ID"
            />
            <input
              style={commonInputStyle}
              value={searchForm.inventoryId}
              onChange={(e) => setSearchForm({...searchForm, inventoryId: e.target.value})}
              placeholder="Inventory ID"
            />
            <button type="submit" style={buttonStyle}>Search</button>
          </form>

          {searchResults && (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <h3>Search Results:</h3>
              {searchResults.name && <p>Name: {searchResults.name}</p>}
              {searchResults.quantity && <p>Quantity: {searchResults.quantity}</p>}
              {searchResults.location && <p>Location: {searchResults.location}</p>}
              {searchResults.price && <p>Price: ${searchResults.price}</p>}
              {searchResults.inventoryItems && <p>Inventory Items: {searchResults.inventoryItems}</p>}
            </div>
          )}
        </div>
      )}

      {activeTab === 'update' && (
        <form onSubmit={handleUpdate}>
          <input
            style={commonInputStyle}
            value={updateForm.itemId}
            onChange={(e) => setUpdateForm({...updateForm, itemId: e.target.value})}
            placeholder="Item ID"
            required
          />
          <input
            style={commonInputStyle}
            value={updateForm.newName}
            onChange={(e) => setUpdateForm({...updateForm, newName: e.target.value})}
            placeholder="New Name"
          />
          <input
            style={commonInputStyle}
            type="number"
            value={updateForm.newQuantity}
            onChange={(e) => setUpdateForm({...updateForm, newQuantity: e.target.value})}
            placeholder="New Quantity"
            min="0"
          />
          <input
            style={commonInputStyle}
            value={updateForm.newLocation}
            onChange={(e) => setUpdateForm({...updateForm, newLocation: e.target.value})}
            placeholder="New Location"
          />
          <input
            style={commonInputStyle}
            type="number"
            value={updateForm.newPrice}
            onChange={(e) => setUpdateForm({...updateForm, newPrice: e.target.value})}
            placeholder="New Price"
            min="0"
            step="0.01"
          />
          <button type="submit" style={buttonStyle}>Update Item</button>
        </form>
      )}

      {activeTab === 'reservations' && (
        <div>
          <form onSubmit={handleCreateReservation}>
            <input
              style={commonInputStyle}
              value={reservationForm.itemId}
              onChange={(e) => setReservationForm({...reservationForm, itemId: e.target.value})}
              placeholder="Item ID"
              required
            />
            <input
              style={commonInputStyle}
              type="number"
              value={reservationForm.quantity}
              onChange={(e) => setReservationForm({...reservationForm, quantity: e.target.value})}
              placeholder="Quantity"
              required
              min="1"
            />
            <input
              style={commonInputStyle}
              type="number"
              value={reservationForm.duration}
              onChange={(e) => setReservationForm({...reservationForm, duration: e.target.value})}
              placeholder="Duration (minutes)"
              required
              min="1"
            />
            <button type="submit" style={buttonStyle}>Create Reservation</button>
          </form>
          
          {reservationForm.itemId && (
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={handleCancelReservation} 
                style={{...buttonStyle, backgroundColor: '#d32f2f'}}
              >
                Cancel Reservation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryManagementSystem;