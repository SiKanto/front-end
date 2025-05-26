import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Destinations.css';

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [displayedDestinations, setDisplayedDestinations] = useState([]); // untuk data yang dipagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Ambil data dari API
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await axios.get('https://ml-kanto.up.railway.app/destinations');
        const data = response.data;

        if (Array.isArray(data.destinations)) {
          const fetchedDestinations = data.destinations;

          const existingDestinationsResponse = await axios.get('https://kanto-backend.up.railway.app/destinations');
          const existingDestinations = existingDestinationsResponse.data;

          const newDestinations = fetchedDestinations.filter(
            (dest) => !existingDestinations.some((exist) => exist.name === dest.name)
          );

          if (newDestinations.length > 0) {
            await axios.post('https://kanto-backend.up.railway.app/add-destinations', {
              destinations: newDestinations,
            });
            console.log("New destinations added to MongoDB!");
          }

          const allDestinations = [...existingDestinations, ...newDestinations];
          setDestinations(allDestinations);
          setFilteredDestinations(allDestinations);
          setCurrentPage(1);
        } else {
          console.error('Destinations data is not an array:', data.destinations);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    }

    fetchDestinations();
  }, []);

  // Pagination: update displayedDestinations ketika filteredDestinations, currentPage, atau itemsPerPage berubah
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedDestinations(filteredDestinations.slice(startIndex, endIndex));
  }, [filteredDestinations, currentPage, itemsPerPage]);

  // Scroll ke atas setiap kali currentPage berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filtered = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchTerm) ||
        dest.location.toLowerCase().includes(searchTerm)
    );

    setFilteredDestinations(filtered);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
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
      </div>
      {/* Pagination Wrapper */}
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
      <div id="destination-list">
        {displayedDestinations.length > 0 ? (
          displayedDestinations.map((destination) => (
            <div key={destination._id} className="destination-card">
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
                <p>{destination.city}</p>
                <p>Rating: {destination.rating}</p>
              </div>
              {/* Tidak ada tombol aksi */}
            </div>
          ))
        ) : (
          <p className="no-destination">No destinations found.</p>
        )}
      </div>

      {/* Pagination Wrapper */}
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

export default Destinations;
