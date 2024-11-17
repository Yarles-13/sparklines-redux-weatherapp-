import React, { useState } from "react";
import { useDispatch } from "react-redux";
import fetchWeather from "../actions/weatherActions";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      dispatch(fetchWeather(city)); 
      setCity("");
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="City name"
        value={city}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
