import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // state halaman saat ini

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://kanto-backend.up.railway.app/users');
        setUsers(response.data);
        setCurrentPage(1); // reset halaman saat data baru dimuat
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  // Reset halaman saat itemsPerPage berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // reset halaman saat search berubah
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

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

  // Filter berdasarkan search
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Ambil data user yang hanya akan ditampilkan pada halaman sekarang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk ganti halaman
  const handlePageChange = (pageNumber) => {
    if(pageNumber < 1) pageNumber = 1;
    else if(pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

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

      {/* Pagination Top */}
      <div className="pagination-wrapper">
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              {"<<"}
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              {"<"}
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              {">"}
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              {">>"}
            </button>
          </div>
        )}
      </div>

      <div id="user-list">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
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

      {/* Pagination Bottom */}
      <div className="pagination-wrapper">
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              {"<<"}
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              {"<"}
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              {">"}
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              {">>"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Users;
