import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const baseUrl = 'http://team-project-service-demo.ue.r.appspot.com/api';

  const username = "admin1";
  const password = "admin123";
  const token = btoa(`${username}:${password}`);
  axios.defaults.headers.common['Authorization'] = `Basic ${token}`;

  const renderResponse = (res) => {
    if (res && typeof res === 'object') {
      return JSON.stringify(res, null, 2);
    }
    return res;
  };

  // Inventories
  const [createInventoryName, setCreateInventoryName] = useState('');
  const [createInventoryResponse, setCreateInventoryResponse] = useState('');

  const [getInventoryId, setGetInventoryId] = useState('');
  const [getInventoryResponse, setGetInventoryResponse] = useState('');

  const [updateInventoryId, setUpdateInventoryId] = useState('');
  const [updateInventoryName, setUpdateInventoryName] = useState('');
  const [updateInventoryResponse, setUpdateInventoryResponse] = useState('');

  const [getInventoryItemsId, setGetInventoryItemsId] = useState('');
  const [getInventoryItemsResponse, setGetInventoryItemsResponse] = useState('');

  // Items
  const [createItemName, setCreateItemName] = useState('');
  const [createItemLocation, setCreateItemLocation] = useState('');
  const [createItemInventoryId, setCreateItemInventoryId] = useState('');
  const [createItemQuantity, setCreateItemQuantity] = useState(0);
  const [createItemPrice, setCreateItemPrice] = useState(0.0);
  const [createItemResponse, setCreateItemResponse] = useState('');

  const [getItemId, setGetItemId] = useState('');
  const [getItemResponse, setGetItemResponse] = useState('');

  // Reservations
  const [reserveItemId, setReserveItemId] = useState('');
  const [reserveQuantity, setReserveQuantity] = useState(0);
  const [reserveDuration, setReserveDuration] = useState(0);
  const [reservationResponse, setReservationResponse] = useState('');

  const [reservationStatusId, setReservationStatusId] = useState('');
  const [reservationStatusResponse, setReservationStatusResponse] = useState('');

  // Users
  const [createUsername, setCreateUsername] = useState('');
  const [createUserResponse, setCreateUserResponse] = useState('');

  const [getUserId, setGetUserId] = useState('');
  const [getUserResponse, setGetUserResponse] = useState('');

  // INVENTORIES - Handlers
  const handleCreateInventory = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/inventories/createInventory`, {
        inventoryName: createInventoryName
      });
      setCreateInventoryResponse(resp.data);
    } catch (err) {
      setCreateInventoryResponse(err.response ? err.response.data : err.toString());
    }
  };

  const handleGetInventoryName = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/inventories/getInventoryName`, {
        params: { inventoryId: getInventoryId }
      });
      setGetInventoryResponse(resp.data);
    } catch (err) {
      setGetInventoryResponse(err.response ? err.response.data : err.toString());
    }
  };

  const handleUpdateInventoryName = async () => {
    try {
      const resp = await axios.patch(`${baseUrl}/inventories/updateInventoryName`, null, {
        params: {
          inventoryId: updateInventoryId,
          newInventoryName: updateInventoryName
        }
      });
      setUpdateInventoryResponse(resp.data);
    } catch (err) {
      setUpdateInventoryResponse(err.response ? err.response.data : err.toString());
    }
  };

  const handleGetInventoryItems = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/inventories/getInventoryItemNames`, {
        params: { inventoryId: getInventoryItemsId }
      });
      setGetInventoryItemsResponse(resp.data);
    } catch (err) {
      setGetInventoryItemsResponse(err.response ? err.response.data : err.toString());
    }
  };

  // ITEMS - Handlers
  const handleCreateItem = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/items/createItem`, {
        itemName: createItemName,
        location: createItemLocation,
        inventoryId: createItemInventoryId,
        quantity: createItemQuantity,
        price: createItemPrice
      });
      setCreateItemResponse(resp.data);
    } catch (err) {
      setCreateItemResponse(err.response ? err.response.data : err.toString());
    }
  };

  const handleGetItemName = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/items/getItemName`, {
        params: { itemId: getItemId }
      });
      setGetItemResponse(resp.data);
    } catch (err) {
      setGetItemResponse(err.response ? err.response.data : err.toString());
    }
  };

  // RESERVATIONS - Handlers
  const handleCreateReservation = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/reservations/create`, null, {
        params: {
          itemId: reserveItemId,
          quantity: reserveQuantity,
          durationInMillis: reserveDuration
        }
      });
      setReservationResponse(resp.data);
    } catch (err) {
      setReservationResponse(err.response ? err.response.data : err.toString());
    }
  };

  const handleGetReservationStatus = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/reservations/status`, {
        params: { itemId: reservationStatusId }
      });
      setReservationStatusResponse(resp.data);
    } catch (err) {
      setReservationStatusResponse(err.response ? err.response.data : err.toString());
    }
  };

  // USERS - Handlers
  const handleCreateUser = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/users/createUser`, null, {
        params: { username: createUsername }
      });
      setCreateUserResponse(resp.data);
    } catch (err) {
      setCreateUserResponse(err.response ? err.response.data : err.toString());
    }
  };

  const handleGetUsername = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/users/getUsername`, {
        params: { userId: getUserId }
      });
      setGetUserResponse(resp.data);
    } catch (err) {
      setGetUserResponse(err.response ? err.response.data : err.toString());
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Homeless Shelter Item Management Client</h1>

      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <h2>Inventories</h2>
        <div>
          <h3>Create Inventory</h3>
          <input
            type="text"
            placeholder="Inventory Name"
            value={createInventoryName}
            onChange={(e) => setCreateInventoryName(e.target.value)}
          />
          <button onClick={handleCreateInventory}>Create</button>
          <pre>Response: {renderResponse(createInventoryResponse)}</pre>
        </div>

        <div>
          <h3>Get Inventory Name</h3>
          <input
            type="text"
            placeholder="Inventory ID"
            value={getInventoryId}
            onChange={(e) => setGetInventoryId(e.target.value)}
          />
          <button onClick={handleGetInventoryName}>Get</button>
          <pre>Response: {renderResponse(getInventoryResponse)}</pre>
        </div>

        <div>
          <h3>Update Inventory Name</h3>
          <input
            type="text"
            placeholder="Inventory ID"
            value={updateInventoryId}
            onChange={(e) => setUpdateInventoryId(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Inventory Name"
            value={updateInventoryName}
            onChange={(e) => setUpdateInventoryName(e.target.value)}
          />
          <button onClick={handleUpdateInventoryName}>Update</button>
          <pre>Response: {renderResponse(updateInventoryResponse)}</pre>
        </div>

        <div>
          <h3>Get Inventory Items</h3>
          <input
            type="text"
            placeholder="Inventory ID"
            value={getInventoryItemsId}
            onChange={(e) => setGetInventoryItemsId(e.target.value)}
          />
          <button onClick={handleGetInventoryItems}>Get Items</button>
          <pre>Response: {renderResponse(getInventoryItemsResponse)}</pre>
        </div>
      </section>

      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <h2>Items</h2>
        <div>
          <h3>Create Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={createItemName}
            onChange={(e) => setCreateItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={createItemLocation}
            onChange={(e) => setCreateItemLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Inventory ID"
            value={createItemInventoryId}
            onChange={(e) => setCreateItemInventoryId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={createItemQuantity}
            onChange={(e) => setCreateItemQuantity(Number(e.target.value))}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={createItemPrice}
            onChange={(e) => setCreateItemPrice(Number(e.target.value))}
          />
          <button onClick={handleCreateItem}>Create</button>
          <pre>Response: {renderResponse(createItemResponse)}</pre>
        </div>

        <div>
          <h3>Get Item Name</h3>
          <input
            type="text"
            placeholder="Item ID"
            value={getItemId}
            onChange={(e) => setGetItemId(e.target.value)}
          />
          <button onClick={handleGetItemName}>Get Item Name</button>
          <pre>Response: {renderResponse(getItemResponse)}</pre>
        </div>
      </section>

      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <h2>Reservations</h2>
        <div>
          <h3>Create Reservation</h3>
          <input
            type="text"
            placeholder="Item ID"
            value={reserveItemId}
            onChange={(e) => setReserveItemId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={reserveQuantity}
            onChange={(e) => setReserveQuantity(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Duration (ms)"
            value={reserveDuration}
            onChange={(e) => setReserveDuration(Number(e.target.value))}
          />
          <button onClick={handleCreateReservation}>Reserve</button>
          <pre>Response: {renderResponse(reservationResponse)}</pre>
        </div>

        <div>
          <h3>Get Reservation Status</h3>
          <input
            type="text"
            placeholder="Item ID"
            value={reservationStatusId}
            onChange={(e) => setReservationStatusId(e.target.value)}
          />
          <button onClick={handleGetReservationStatus}>Check Status</button>
          <pre>Response: {renderResponse(reservationStatusResponse)}</pre>
        </div>
      </section>

      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <h2>Users</h2>
        <div>
          <h3>Create User</h3>
          <input
            type="text"
            placeholder="Username"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
          />
          <button onClick={handleCreateUser}>Create User</button>
          <pre>Response: {renderResponse(createUserResponse)}</pre>
        </div>

        <div>
          <h3>Get Username by UserID</h3>
          <input
            type="text"
            placeholder="User ID"
            value={getUserId}
            onChange={(e) => setGetUserId(e.target.value)}
          />
          <button onClick={handleGetUsername}>Get Username</button>
          <pre>Response: {renderResponse(getUserResponse)}</pre>
        </div>
      </section>
    </div>
  );
}

export default App;