import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sunnyweather from "../assets/sunnyweather.mp4";
import rain from "../assets/rain.mp4";
import sunnypng from "../assets/sunnypng.jpg";
import rainypng from "../assets/rainypng.jpg";
import rainV2 from "../assets/rainV2.mp4"

const Home = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const errorToastShownRef = useRef(false);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            units: "metric",
            appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
          },
        }
      );
      setWeatherData(response.data);
      setError(null); // Reset error if request succeeds
      errorToastShownRef.current = false; // Reset the flag for error toast
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  useEffect(() => {
    if (error && !errorToastShownRef.current) {
      toast.error(error.message);
      errorToastShownRef.current = true;
    }
  }, [error]);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  console.log(weatherData);

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
          <button type="submit">Search city</button>
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
          {weatherData.weather[0].main === "Clear" && (
            <div className="background-video">
              <video autoPlay loop muted src={sunnyweather}>
                {/* <img src={sunnypng} alt="Sunny Weather" /> */}
                Your browser does not support the video tag.
              </video>
              <p>{weatherData.weather[0].main}</p>
            </div>
          )}
          {weatherData.weather[0].main !== "Clear" && (
            <div className="background-video">
              <video autoPlay loop muted src={rainV2}>
                {/* <img src={rainypng} alt="Rainy Weather" /> */}
                Your browser does not support the video tag.
              </video>
              {/* <p>{weatherData.weather[0].main}</p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
