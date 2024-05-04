import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6eabe4ec2842432f940200358242702&q=${city}`);
            console.log("Error")
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
          alert(error.message);  // Show the alert
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
      setWeather(null)
        if (city) {
            fetchWeather();
        }
    };

    return (
        <div className="weather-app">
            <SearchBar setCity={setCity} handleSearch={handleSearch} />
            {loading && <p>Loading data...</p>}
            {weather && <WeatherDisplay weather={weather} />}
        </div>
    );
};

const SearchBar = ({ setCity, handleSearch }) => {
    return (
        <div>
            <input type="text" placeholder="Enter city name" onChange={(e) => setCity(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

const WeatherDisplay = ({ weather }) => {
    return (
        <div className="weather-cards">
            <div className="weather-card">
                <p>Temperature: {weather.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
                <p>Humidity: {weather.current.humidity}%</p>
            </div>
            <div className="weather-card">
                <p>Condition: {weather.current.condition.text}</p>
            </div>
            <div className="weather-card">
                <p>Wind Speed: {weather.current.wind_kph} kph</p>
            </div>
        </div>
    );
};

export default WeatherApp;
