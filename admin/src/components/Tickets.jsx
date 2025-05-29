import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tickets = () => {
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState([]); // Initialize as an empty array
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('https://kanto-backend.up.railway.app/tickets');
      if (response.data && Array.isArray(response.data.tickets)) {
        setTickets(response.data.tickets); // Akses array tiket dari objek 'tickets'
      } else {
        console.error('Expected array under "tickets" but got:', response.data);
        setTickets([]); // Set to an empty array if response is not as expected
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
    }
  };

  useEffect(() => {
    fetchTickets(); // Fetch data when component mounts
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset page when search is changed
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const filteredTickets = tickets.filter(ticket => {
    const username = ticket.username ? ticket.username.toLowerCase() : '';  // Cek apakah username ada
    const email = ticket.userId && ticket.userId.email ? ticket.userId.email.toLowerCase() : '';  // Cek apakah email ada
    return username.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    else if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg lg:ml-64">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#860000] mb-6">Tickets</h2>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          id="search"
          value={search}
          placeholder="Search tickets..."
          onChange={handleSearchChange}
          className="h-8 md:h-10 lg:h-12 p-3 w-3/4 rounded-full border text-[10px] md:text-sm lg:text-base border-[#860000]"
        />
        <select
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
          className="h-8 md:h-10 lg:h-12 w-1/4 p-1 ml-4 rounded-full border border-[#860000] text-[10px] md:text-sm lg:text-base text-[#860000]"
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
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-[10px] lg:text-sm font-medium text-[#860000]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">>"}
          </button>
        </div>
      )}
      <div className="space-y-4">
        {currentTickets.length > 0 ? (
          currentTickets.map((ticket) => (
            <div key={ticket._id} className="bg-[#fff] p-2 lg:p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex-grow">
                <p className="font-semibold text-[12px] md:text-sm lg:text-lg text-gray-800">{ticket.userId?.username}</p> {/* Menampilkan email */}
                <p className="text-[10px] md:text-[12px] lg:text-sm text-gray-600">Destination = {ticket.destinationId?.name}</p> {/* Menampilkan nama destinasi */}
                <p className="text-[10px] md:text-[12px] lg:text-sm text-gray-600">Jumlah Ticket = {ticket.ticketQuantity}</p>
                <p className="text-[10px] md:text-[12px] lg:text-sm text-gray-600">Booking Date: {new Date(ticket.bookingDate).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#DC0000]">No tickets found.</p>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {"<"}
          </button>
          <span className="text-[10px] lg:text-sm font-medium text-[#860000]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 lg:px-4 py-0 lg:py-2 bg-transparent border border-[#860000] text-[#860000] rounded-md hover:bg-[#860000] hover:text-white transition-all"
          >
            {">>"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Tickets;
