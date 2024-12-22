import React from "react";
import Form from "../components/Form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [flag, setFlag] = useState({
    country: "",
    capital: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

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
      await axios.post("http://localhost:8000/flags", formData);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div>
      <Form
        country="Country"
        capital="Capital"
        imageUpload={handleFileInput}
        handleClick={handleClick}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Add;
