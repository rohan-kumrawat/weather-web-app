// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('Mumbai');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${city}&aqi=no`
        );

        // Validate API response
        if(!response.data.location || !response.data.current) {
          throw new Error('Invalid API response');
        }

        setWeather({
          city: response.data.location.name,
          temp: response.data.current.temp_c,
          condition: response.data.current.condition.text,
          icon: response.data.current.condition.icon,
          humidity: response.data.current.humidity,
          wind: response.data.current.wind_kph,
          feelsLike: response.data.current.feelslike_c
        });

      } catch (err) {
        setError(err.response?.data?.error?.message || 'Invalid city or API error');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    if(city) fetchWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCity = e.target.elements.city.value.trim();
    if(newCity) setCity(newCity);
  };

  return (
    <div className="container">
      <h1>🌤️ Weather App</h1>
      
      <form onSubmit={handleSubmit} className="search-box">
        <input
          type="text"
          name="city"
          placeholder="Search city..."
          autoComplete="off"
        />
        <button type="submit">
          {loading ? '🔍 Searching...' : 'Search'}
        </button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      {error && <div className="error-box">⚠️ {error}</div>}

      {weather && (
        <div className="weather-card">
          <div className="header">
            <h2>{weather.city}</h2>
            <img src={weather.icon} alt="Weather icon" className="weather-icon" />
          </div>
          
          <div className="main-temp">
            <p className="temperature">{weather.temp}°C</p>
            <p className="condition">{weather.condition}</p>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span>Feels Like</span>
              <span>{weather.feelsLike}°C</span>
            </div>
            <div className="detail-item">
              <span>Humidity</span>
              <span>{weather.humidity}%</span>
            </div>
            <div className="detail-item">
              <span>Wind Speed</span>
              <span>{weather.wind} km/h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;