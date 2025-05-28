import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle password visibility
  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Membuat username dengan menggabungkan firstName dan lastName, lalu menambahkan angka acak
    const username = `${firstName}${lastName}`.toLowerCase() + Math.floor(Math.random() * 1000);

    try {
      const response = await axios.post("https://kanto-backend.up.railway.app/admin/create",  // Pastikan endpoint sesuai
        {
          firstName,
          lastName,
          email,
          password,
          username,  // Mengirimkan username yang sudah digenerate
        }
      );

      if (response.data && response.data.message === "Admin created successfully") {
        setMessage("Admin created successfully!");
        history("/login");  // Redirect ke halaman login setelah registrasi
      } else {
        setMessage(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 bg-[#f4f4f9] px-4">
      <div className="flex w-full max-w-screen-lg gap-16">
        {/* Form Register */}
        <div className="w-full md:w-1/2 p-8 rounded-lg">
          <h2 className="text-[48px] font-bold text-center mb-6 text-[#333]">
            Welcome to Kanto
          </h2>
          {message && <p className="text-red-500 text-center">{message}</p>}
          <p className="text-center mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#DC0000]">
              Log in
            </Link>
          </p>
          <form onSubmit={handleRegister}>
            <div className="flex gap-x-4 mb-4 relative">
              {/* First Name Input */}
              <div className="relative w-1/2">
                <input
                  className="w-full h-[41px] p-3 pr-12 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000]"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <FontAwesomeIcon icon={faIdCard} />
                </span>
              </div>

              {/* Last Name Input */}
              <div className="relative w-1/2">
                <input
                  className="w-full h-[41px] p-3 pr-12 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000]"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <FontAwesomeIcon icon={faIdCard} />
                </span>
              </div>
            </div>
            <div className="relative mb-4">
              <input
                className="w-full h-[41px] p-3 mb-6 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000]"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute top-5 right-4 transform -translate-y-1/2">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className="relative mb-6">
              <input
                className="w-full h-[41px] p-3 mb-6 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000]"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-5 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordEye}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <button className="w-full h-[41px] bg-[#fff] text-[#DC0000] border border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-[#fff] focus:outline-none focus:ring-2 focus:ring-[#DC0000]">
              Sign up
            </button>
          </form>
        </div>

        {/* Bagian Kanan untuk Logo dan Deskripsi */}
        <div className="w-[490px] h-[519px] p-8 bg-[#fff] shadow-lg text-white rounded-lg flex flex-col items-center justify-center">
          <img
            src="/icon-red192.png"
            alt="Kanto Logo"
            className="mb-4 w-[150px] mx-auto"
          />
          <h2 className="text-[30px] font-bold mb-2 text-center text-[#333]">Welcome to Kanto</h2>
          <p className="text-center text-[#333]">Your journey starts here</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
