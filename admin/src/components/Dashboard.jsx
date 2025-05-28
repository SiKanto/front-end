import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDestinations: 0,
    totalUsers: 0,
    totalTickets: 0,
    destinationsData: []
  });

  const fetchData = async () => {
    try {
      const destinationsResponse = await axios.get('https://kanto-backend.up.railway.app/destinations');
      const usersResponse = await axios.get('https://kanto-backend.up.railway.app/users');
      const ticketsResponse = await axios.get('https://kanto-backend.up.railway.app/tickets');
      console.log(usersResponse.data)

      // Ambil jumlah destinasi, pengguna, dan tiket
      const destinationsCount = destinationsResponse.data.length;
      const usersCount = usersResponse.data.length;
      const ticketsCount = Array.isArray(ticketsResponse.data.tickets) ? ticketsResponse.data.tickets.length : 0;

      // Misalnya data destinationsData diambil dari API dan dihitung berdasarkan jumlah peminat
      const destinationsData = destinationsResponse.data.map(destination => ({
        name: destination.name, // Nama destinasi
        popularity: destination.visitor // Jumlah pengunjung
      }));

      // Urutkan data berdasarkan popularitas secara menurun dan ambil 10 teratas
      const topDestinations = destinationsData
        .sort((a, b) => b.popularity - a.popularity) // Urutkan berdasarkan popularity
        .slice(0, 10); // Ambil 10 teratas

      setStats({
        totalDestinations: destinationsCount ? destinationsCount : 0,
        totalUsers: usersCount ? usersCount : 0,
        totalTickets: ticketsCount ? ticketsCount : 0,
        destinationsData: topDestinations
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Menyiapkan data untuk grafik
  const chartData = {
    labels: stats.destinationsData.map(data => data.name),
    datasets: [
      {
        label: 'Popularitas Destinasi',
        data: stats.destinationsData.map(data => data.popularity),
        backgroundColor: '#DC0000',
        borderColor: '#DC0000',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg ml-64">
      <h2 className="text-3xl font-bold text-[#860000] mb-6">Dashboard</h2>
      <div className="flex justify-between gap-5">
        <div className="bg-[#DC0000] text-white p-6 rounded-lg shadow-md w-1/3 hover:scale-105 hover:shadow-xl transition-all">
          <h3 className="text-lg font-semibold mb-4">Total Destinations</h3>
          <p className="text-2xl font-bold">{stats.totalDestinations}</p>
        </div>
        <div className="bg-[#DC0000] text-white p-6 rounded-lg shadow-md w-1/3 hover:scale-105 hover:shadow-xl transition-all">
          <h3 className="text-lg font-semibold mb-4">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-[#DC0000] text-white p-6 rounded-lg shadow-md w-1/3 hover:scale-105 hover:shadow-xl transition-all">
          <h3 className="text-lg font-semibold mb-4">Total Tickets Sold</h3>
          <p className="text-2xl font-bold">{stats.totalTickets}</p>
        </div>
      </div>

      {/* Grafik Popularitas Destinasi */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-[#860000]">Destinations Popularity</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
