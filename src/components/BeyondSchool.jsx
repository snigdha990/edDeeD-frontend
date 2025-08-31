import React, { useEffect, useState } from "react";

const TUITIONS_API_URL = import.meta.env.VITE_TUITIONS_API;

export default function BeyondSchool() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(TUITIONS_API_URL)
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
        setError("Failed to load tuitions.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="feature-schools">
      <h2>Beyond Schools</h2>
      <div className="display-schools">
        {loading && <p>Loading tuitions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && tuitions.length === 0 && (
          <p>No tuitions found.</p>
        )}
        {!loading &&
          !error &&
          tuitions.map((tuition) =>
            tuition._id ? (
              <div key={tuition._id} className="school-card">
                <img src={tuition.image} alt={tuition.title} />
                <div className="school-name">{tuition.title}</div>
                <div className="school-name">{tuition.tuitionName}</div>
              </div>
            ) : null
          )}
        {!loading && !error && tuitions.length > 0 && (
          <div className="browse-card">
            <div className="browse-schools">Browse More</div>
          </div>
        )}
      </div>
    </section>
  );
}
