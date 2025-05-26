import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = ({ type, onClose, addNewDestination, updateDestination, destination }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    facilities: '',
    price: '',
    openingHours: '',
    closingHours: '',
    description: '',
    city: '',
    rating: '',
    lat: '',
    lon: ''
  });

  // Pre-fill the modal with the existing data when it's in edit mode
  useEffect(() => {
    if (type === 'edit' && destination) {
      setFormData({
        name: destination.name,
        location: destination.location,
        facilities: destination.facilities.join(', '),  // assuming facilities is an array
        price: destination.price,
        openingHours: destination.openingHours,
        closingHours: destination.closingHours,
        description: destination.description,
        city: destination.city,
        rating: destination.rating,
        lat: destination.lat,
        lon: destination.lon
      });
    }
  }, [type, destination]);  // Only trigger if `type` or `destination` changes

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure lat and lon are properly formatted as numbers
    const destinationData = {
      name: formData.name,
      location: formData.location,
      facilities: formData.facilities.split(",").map(item => item.trim()),
      price: Number(formData.price),
      openingHours: formData.openingHours,
      closingHours: formData.closingHours,
      description: formData.description,
      city: formData.city,
      rating: Number(formData.rating),
      lat: parseFloat(formData.lat.toString().replace(",", ".")),
      lon: parseFloat(formData.lon.toString().replace(",", "."))
    };

    try {
      if (type === 'edit') {
        // Perform PUT request to update destination
        const response = await axios.put(`https://kanto-backend.up.railway.app/destinations/${destination._id}`, destinationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          updateDestination(response.data); // Update the destination in the parent component
          onClose(); // Close modal after successful update
        } else {
          console.error('Failed to update destination:', response.data);
        }
      } else {
        // If it's not an edit, it's an add request, perform POST request
        const response = await axios.post('https://kanto-backend.up.railway.app/destinations', destinationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          console.log('Destination added:', response.data);
          addNewDestination(response.data); // Add the new destination to state
          onClose(); // Close modal after successful add
        } else {
          console.error('Failed to add destination:', response.data);
        }
      }
    } catch (error) {
      console.error('Error adding/updating destination:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{type === 'add' ? 'Add New Destination' : 'Edit Destination'}</h2>
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Destination Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <div className="locacity">
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                placeholder="Destination Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                placeholder="Destination City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="facilities">Facilities:</label>
          <input
            type="text"
            id="facilities"
            placeholder="Toilet, Parking, etc."
            value={formData.facilities}
            onChange={handleChange}
            required
          />

          <div className="priour">
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="openingHours">Open:</label>
              <input
                type="time"
                id="openingHours"
                value={formData.openingHours}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="closingHours">Close:</label>
              <input
                type="time"
                id="closingHours"
                value={formData.closingHours}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Destination Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <div className="ratlolat">
            <div>
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                step="0.1"
                min="1"
                max="5"
                placeholder="4.5"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lat">Latitude:</label>
              <input
                type="text"
                id="lat"
                placeholder="Destination Latitude"
                value={formData.lat}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lon">Longitude:</label>
              <input
                type="text"
                id="lon"
                placeholder="Destination Longitude"
                value={formData.lon}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">{type === 'add' ? 'Add Destination' : 'Update Destination'}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
