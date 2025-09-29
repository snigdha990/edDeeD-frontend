import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function FeatureSchool() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(`${API_URL}/schoolsapi`,{ cache: "no-store" })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setSchools(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error Fetching data:", err);
  //       setError("Failed to load schools.");
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
  // fetch(`${API_URL}/schoolsapi`, { cache: "no-store" })
  fetch(`${API_URL}/schoolsapi`, { cache: "no-store" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      setSchools(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error Fetching data:", err);
      setError("Failed to load schools.");
      setLoading(false);
    });
}, []);

  const featuredSchools = schools.slice(0, 9);

  return (
    <section className="feature-schools">
      <h2>Featured Schools</h2>
      <div className="display-schools">
        {loading && <p>Loading schools...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && featuredSchools.length === 0 && <p>No schools found.</p>}
        {!loading && !error && featuredSchools.map((school) => (
          <div key={school._id} className="school-card">
            <img src={school.image} alt={`${school.name} image`} />
            <div className="school-name">{school.name}</div>
          </div>
        ))}
        {!loading && !error && schools.length > 9 && (
          <div className="browse-card">
            <Link to="/schools" className="browse-schools">Browse More</Link>
          </div>
        )}
      </div>
    </section>
  );
}
