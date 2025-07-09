import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

const API_KEY = '97937ba315f03c96d708dc5e87131959';

export default function App() {
  const [query, setQuery] = useState('Badnapur');
  const [units, setUnits] = useState('metric'); // metric = Celsius, imperial = Fahrenheit
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-black flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg text-white">Weather App</h1>

      <Search query={query} setQuery={setQuery} />

      <button
        onClick={toggleUnits}
        className="bg-gray-800 text-white hover:bg-gray-500 px-4 py-2 rounded-md mt-4 shadow-md"
      >
        Show in {units === 'metric' ? '°F' : '°C'}
      </button>

      {loading && <Loader />}

      {error && (
        <p className="mt-6 text-red-300 font-semibold text-lg drop-shadow-md">
          {error}
        </p>
      )}

      {weather && !loading && (
        <WeatherCard weather={weather} units={units} />
      )}
    </div>
  );
}
