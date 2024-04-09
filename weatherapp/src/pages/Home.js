import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [city, setCity] = useState("London"); // Initialize with London
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            units: "metric",
            appid: "bb56965cdb315da09de44254c1d382c6",
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  if(error) {
    toast.error(error.message)
  }

  return (
    <div className="main-section">
      <ToastContainer />

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search Weather</button>
        </form>
      </div>
      {weatherData && (
        <div className="weather-section">
          <h2>{weatherData.name}</h2>
          <p>
            {weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)}
          </p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          {weatherData.weather &&
            weatherData.weather[0] &&
            weatherData.weather[0].icon && (
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt="Weather Icon"
              />
            )}
        </div>
      )}
    </div>
  );
};

export default Home;
