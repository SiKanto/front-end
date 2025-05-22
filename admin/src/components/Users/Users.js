import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://kanto-backend.up.railway.app/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, [itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Update jumlah item per halaman
  };

  // 🔁 Fungsi toggle status aktif/banned
  const toggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    axios.put(`https://kanto-backend.up.railway.app/users/${userId}`, { status: newStatus })
      .then(() => {
        const updatedUsers = users.map(user =>
          user._id === userId ? { ...user, status: newStatus } : user
        );
        setUsers(updatedUsers);
      })
      .catch(error => console.error(`Error updating user status:`, error));
  };

  const handleDelete = (userId) => {
    axios.delete(`https://kanto-backend.up.railway.app/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="users">
      <h2>Users</h2>
      <div className='search-sort'>
        <input
          type="text"
          id="search-users"
          value={search}
          placeholder="Search users..."
          onChange={handleSearchChange}
        />
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={10}>10 items</option>
          <option value={50}>50 items</option>
          <option value={100}>100 items</option>
        </select>
      </div>
      <div id="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-card">
              <p><strong>{user.username}</strong></p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Status: {user.status}</p>
              <div className="user-actions">
                <button onClick={() => toggleUserStatus(user._id, user.status)}>
                  {user.status === 'active' ? 'Ban' : 'Activate'}
                </button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </section>
  );
};

export default Users;
