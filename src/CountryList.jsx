import React, { useState, useEffect } from 'react';
import './CountryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // API Call to fetch countries data
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error); // API Error Handling
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="country-list-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="country-list">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="country-item">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <p className="country-name">{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
