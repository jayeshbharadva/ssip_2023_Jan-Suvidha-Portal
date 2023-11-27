import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GovLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the provided credentials match the allowed values
    if (username === "a@gmail.com" && password === "1234") {
      // Navigate to "/listscheme" on successful login
      navigate("/listscheme");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-green-200 font-sans">
      <div className="mx-auto bg-white p-5 w-1/3 rounded shadow-md text-center">
        <h2 className="m-auto text-3xl font-medium mb-10">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className="m-2 p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className="m-2 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="p-2 m-2 bg-[#19514F] text-white rounded cursor-pointer hover:bg-[#379683] hover:text-[#ffffff]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default GovLogin;
