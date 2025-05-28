
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://kanto-backend.up.railway.app/users');
        setUsers(response.data);
        setCurrentPage(1); // Reset page when new data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset page when search is changed
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
      .catch(error => console.error('Error updating user status:', error));
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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    else if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg ml-64">
      <h2 className="text-3xl font-bold text-[#860000] mb-4">Users</h2>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          id="search-users"
          value={search}
          placeholder="Search users..."
          onChange={handleSearchChange}
          className="p-3 w-3/4 rounded-full border border-[#860000]"
        />
        <select
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
          className="w-1/4 p-3 ml-4 rounded-full border border-[#860000] text-[#860000]"
        >
          <option value={10}>10 items</option>
          <option value={50}>50 items</option>
          <option value={100}>100 items</option>
        </select>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-6">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">>"}
          </button>
        </div>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div key={user._id} className="bg-[#fff] p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex-grow">
                <p className="font-semibold text-lg text-gray-800">{user.username}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <p className="text-sm text-gray-600">Status: {user.status}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => toggleUserStatus(user._id, user.status)}
                  className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
                >
                  {user.status === 'active' ? 'Ban' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#DC0000]">No users found.</p>
        )}
      </div>

      {/* Pagination Bottom */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-sm font-medium text-[#860000]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">>"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Users;
