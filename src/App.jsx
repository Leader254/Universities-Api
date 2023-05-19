import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [universities, setUniversities] = useState([]);
  const [region, setRegion] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setError(null);
  };

  useEffect(() => {
    if (region === "") {
      return;
    }

    fetch(`http://universities.hipolabs.com/search?country=${region}`)
      .then((response) => response.json())
      .then((data) => {
        setUniversities(data);
      })
      .catch(() => {
        setError("An error occurred while fetching universities.");
      });
  }, [region]);

  return (
    <div className="main-content">
      <h1>Hello and welcome to the university portal!</h1>

      <div className="search-bar">
        <label htmlFor="region">Region:</label>
        <input
          type="text"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setRegion("")}>Clear</button>
      </div>

      {error && <p>{error}</p>}

      <div className="grid-container">
        {universities.map((university, index) => (
          <div className="card" key={university.web_pages[0] + index}>
            <h3>{university.name}</h3>
            <p>{university.country}</p>
            <p>{university.web_pages[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
