// src/components/Tickets/Tickets.jsx
import React from 'react';

const Tickets = () => {
  return (
    <section className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Tickets</h2>
      <div id="ticket-list" className="mt-4">
        {/* Daftar tiket akan ditampilkan di sini */}
      </div>
    </section>
  );
};

export default Tickets;
