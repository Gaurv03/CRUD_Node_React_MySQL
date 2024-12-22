import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../components/Form";

function Update() {
  const [flag, setFlag] = useState({
    country: "",
    capital: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFlag((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("country", flag.country);
    formData.append("capital", flag.capital);
    formData.append("file", selectedFile);
    try {
      await axios.put(
        "http://localhost:8000/flags/" + location.pathname.split("/")[2],
        formData
      );
      navigate("/");
    } catch (error) {}
  };
  return (
    <div>
      <Form
        country="Edit Country"
        capital="Edit Capital"
        handleClick={handleClick}
        handleChange={handleChange}
        imageUpload={handleFileInput}
      />
    </div>
  );
}

export default Update;
