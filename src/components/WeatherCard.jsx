import React from 'react';

const WeatherCard = ({ weather, units }) => {
  if (!weather) return null;

  const {
    name,
    main,
    weather: weatherDetails,
    wind,
    visibility,
    sys,
  } = weather;

  const icon = weatherDetails[0].icon;
  const description = weatherDetails[0].description;

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-700 text-black rounded-xl shadow-2xl p-6 mt-6 w-full max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold drop-shadow-md text-white">
            {name}, {sys.country}
          </h2>
          <p className="text-sm text-indigo-200">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="text-5xl font-extrabold mt-2 text-white">{Math.round(main.temp)}°</div>
          <p className="capitalize text-indigo-100">
            {description} • Feels like {Math.round(main.feels_like)}°
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather icon"
          className="h-24 w-24 drop-shadow-xl"
        />
      </div>

      {/* Hourly Forecast (STATIC) */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-black">Hourly Forecast</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { time: 'Now', temp: `${Math.round(main.temp)}°`, icon: '☀️', chance: '0%' },
            { time: '3PM', temp: '25°', icon: '☀️', chance: '0%' },
            { time: '4PM', temp: '24°', icon: '🌤️', chance: '10%' },
            { time: '5PM', temp: '22°', icon: '☁️', chance: '20%' },
            { time: '6PM', temp: '19°', icon: '🌧️', chance: '60%' },
            { time: '7PM', temp: '17°', icon: '🌧️', chance: '80%' },
          ].map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-2 text-sm"
            >
              <div>{hour.time}</div>
              <div className="text-xl">{hour.icon}</div>
              <div>{hour.temp}</div>
              <div className="text-xs text-indigo-200">{hour.chance}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast & Weather Details */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {/* 7-Day Forecast (STATIC) */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">7-Day Forecast</h3>
          <div className="space-y-2">
            {[
              { day: 'Today', icon: '☀️', desc: description, high: `${Math.round(main.temp + 3)}°`, low: `${Math.round(main.temp - 5)}°` },
              { day: 'Tomorrow', icon: '⛅', desc: 'Partly Cloudy', high: '26°', low: '16°' },
              { day: 'Sunday', icon: '🌧️', desc: 'Light Rain', high: '22°', low: '14°' },
              { day: 'Monday', icon: '☁️', desc: 'Cloudy', high: '20°', low: '12°' },
              { day: 'Tuesday', icon: '☀️', desc: 'Sunny', high: '24°', low: '15°' },
            ].map((day, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="text-xl">{day.icon}</div>
                  <div>{day.day}</div>
                </div>
                <div>{day.desc}</div>
                <div>{day.high} / {day.low}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Details */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">Weather Details</h3>
          <div className="space-y-3">
            {[
              { label: '💧 Humidity', value: `${main.humidity}%` },
              { label: '🌬️ Wind Speed', value: `${wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}` },
              { label: '🔆 Pressure', value: `${main.pressure} hPa` },
              { label: '👁️ Visibility', value: `${visibility / 1000} km` },
              { label: '🌅 Sunrise', value: formatTime(sys.sunrise) },
              { label: '🌇 Sunset', value: formatTime(sys.sunset) },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
