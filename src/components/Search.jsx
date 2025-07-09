import React from "react";

export default function Search({ query, setQuery }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value.trim();
    if (city) {
      setQuery(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
      <input
        type="text"
        name="city"
        defaultValue={query}
        placeholder="Enter city name"
        className="flex-1 px-4 py-2 rounded-md text-white border-2"
      />
      <button
        type="submit"
        className="bg-white hover:bg-blue-200 px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}
