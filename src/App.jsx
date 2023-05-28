/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [universities, setUniversities] = useState([]);
  const [region, setRegion] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (region === "") {
      return;
    }

    setLoading(true); // Set loading state to true before fetching data

    fetch(`https://universitiesapi.onrender.com/v1/api/universities/${region}`)
      .then((response) => response.json())
      .then((data) => {
        setUniversities(data);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch(() => {
        setError("An error occurred while fetching universities.");
        setLoading(false); // Set loading state to false in case of error
      });
  }, [region]);

  return (
    <div className="main-content">
      <h1>Hello and welcome to the university portal!</h1>

      <div className="search-bar">
        <label htmlFor="region">Country: </label>
        <input
          placeholder="Enter country to search...."
          type="text"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button
          style={{ backgroundColor: "#b15d80", color: "black" }}
          // onClick={handleSearch}
        >
          Search
        </button>
        <button
          style={{ backgroundColor: "#d9e1ed", color: "black" }}
          onClick={() => setRegion("")}
        >
          Clear
        </button>
      </div>

      {error && <p>{error}</p>}

      {loading ? (
        <p>Loading universities...</p>
      ) : (
        <>
          <h3 className="">
            Number of universities found: {universities.length}
          </h3>
          <div className="grid-container">
            {universities.map((university, index) => (
              <div
                className="card"
                key={university.web_pages[0] + index}
              >
                <h3>{university.name}</h3>
                <p>{university.country}</p>
                <p>{university.web_pages[0]}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
