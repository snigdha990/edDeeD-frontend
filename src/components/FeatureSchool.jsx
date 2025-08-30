import React, { useEffect, useState } from "react";

export default function FeatureSchool() {
  const [tuition, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/schoolsapi")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setTuitions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error Fetching data:", err);
        setError("Failed to load schools.");
        setLoading(false);
      });
  }, []);

  const featuredSchools = tuition.slice(0, 9); 

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
        {!loading && !error && tuition.length > 9 && (
          <div className="browse-card">
            <div className="browse-schools">Browse More</div>
          </div>
        )}
      </div>
    </section>
  );
}
