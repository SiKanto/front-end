import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';  // Import Modal
import './Destinations.css';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Importing icons for edit, delete, and add

const Destinations = () => {
  const [search, setSearch] = useState(""); // State untuk pencarian
  const [destinations, setDestinations] = useState([]); // State untuk menyimpan destinasi
  const [filteredDestinations, setFilteredDestinations] = useState([]); // State untuk destinasi yang sudah difilter
  const [showModal, setShowModal] = useState(false); // Untuk kontrol visibilitas modal
  const [currentDestination, setCurrentDestination] = useState(null); // Untuk menyimpan destinasi yang sedang diedit
  const [itemsPerPage, setItemsPerPage] = useState(10); // State untuk kontrol jumlah data yang ditampilkan

  // Mengambil data destinasi dari API
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await axios.get('https://kanto-backend.up.railway.app/destinations');
        setDestinations(response.data); // Simpan data ke state destinations
        setFilteredDestinations(response.data.slice(0, itemsPerPage)); // Setel filteredDestinations dengan data awal
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    }

    fetchDestinations();
  }, [itemsPerPage]); // Mengupdate ketika jumlah item per halaman berubah

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // Filter destinasi berdasarkan pencarian
    const filtered = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchTerm) ||
        dest.location.toLowerCase().includes(searchTerm)
    );
    setFilteredDestinations(filtered.slice(0, itemsPerPage)); // Update filteredDestinations
  };

  // Fungsi untuk menampilkan modal
  const handleAddDestination = () => {
    setShowModal(true); // Menampilkan modal untuk menambah destinasi
    setCurrentDestination(null); // Pastikan modal kosong untuk menambah
  };

  // Fungsi untuk menampilkan modal dengan data destinasi yang akan diedit
  const handleEditDestination = (destination) => {
    setShowModal(true); // Menampilkan modal untuk edit destinasi
    setCurrentDestination(destination); // Set data destinasi yang akan diedit
  };

  // Fungsi untuk menutup modal setelah destinasi ditambahkan atau diupdate
  const closeModal = () => {
    setShowModal(false);
  };

  // Fungsi untuk memperbarui destinasi setelah di edit
  const updateDestination = (updatedDestination) => {
    const updatedDestinations = destinations.map((destination) =>
      destination._id === updatedDestination._id ? updatedDestination : destination
    );
    setDestinations(updatedDestinations);
    setFilteredDestinations(updatedDestinations);
  };

  const addNewDestination = (newDestination) => {
    setDestinations([...destinations, newDestination]);
    setFilteredDestinations([...filteredDestinations, newDestination]);
  };

  // Fungsi untuk menangani perubahan jumlah destinasi yang ditampilkan
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Update jumlah item per halaman
  };

  // Fungsi untuk menghapus destinasi
  const handleDelete = (id) => {
    // Hapus destinasi dari backend
    axios.delete(`https://kanto-backend.up.railway.app/destinations/${id}`)
      .then((response) => {
        setDestinations(destinations.filter(dest => dest._id !== id));  // Update state destinasi
        setFilteredDestinations(filteredDestinations.filter(dest => dest._id !== id));  // Update filteredDestinations
        console.log('Destination deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting destination:', error);
      });
  };

  return (
    <section id="destinations">
      <h2>Destinations</h2>
      <div className="search-sort">
        <input
          type="text"
          id="search"
          value={search}
          placeholder="Search destinations..."
          onChange={handleSearchChange}
        />
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={10}>10 items</option>
          <option value={50}>50 items</option>
          <option value={100}>100 items</option>
        </select>
        {/* Add Destination Button */}
        <button className="add-destination-btn" onClick={handleAddDestination}>
          <FaPlus />
        </button>
      </div>
      <div id="destination-list">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <div key={destination._id} className="destination-card">
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
                <p>{destination.city}</p>
                <p>Rating: {destination.rating}</p>
              </div>
              <div className="destination-actions">
                <button className='btn-dst' onClick={() => handleEditDestination(destination)}>
                  <FaEdit />
                </button>
                <button className='btn-dst' onClick={() => handleDelete(destination._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-destination">No destinations found.</p>
        )}
      </div>
      {/* Render modal */}
      {showModal && <Modal type={currentDestination ? 'edit' : 'add'} destination={currentDestination} onClose={closeModal} updateDestination={updateDestination} addNewDestination={addNewDestination} />}
    </section>
  );
};

export default Destinations;
