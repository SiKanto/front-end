// src/components/Destinations/Destinations.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [displayedDestinations, setDisplayedDestinations] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedDestinations(filteredDestinations.slice(startIndex, endIndex));
  }, [filteredDestinations, currentPage, itemsPerPage]);

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
    <section id="destinations" className="p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-[#860000] mb-4">Destinations</h2>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          id="search"
          value={search}
          placeholder="Search destinations..."
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

      {/* Destinations List */}
      <div className="space-y-4">
        {displayedDestinations.length > 0 ? (
          displayedDestinations.map((destination) => (
            <div key={destination._id} className="bg-[#ffff] p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.location}</p>
                <p className="text-sm text-gray-600">{destination.city}</p>
                <p className="text-sm text-gray-600">Rating: {destination.rating}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No destinations found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition-all"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition-all"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white transition-all"
          >
            {">>"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Destinations;
