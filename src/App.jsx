/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [universities, setUniversities] = useState([]);
  const [country, setCountry] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching university data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  const searchCountry = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="container">
      <div className="card-container">
        <input placeholder='Search university...' onChange={searchCountry} type="search" />
        <button onClick={fetchData}>Search</button>
      </div>
      <div className="card-wrapper">
        {universities.map((university, index) => (
          <div className="card" key={index}>
            <p className="card-info">Name: {university.name}</p>
            <p className="card-info">Website: {university.web_pages[0]}</p>
            <p className="card-info">Country: {university.country}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
