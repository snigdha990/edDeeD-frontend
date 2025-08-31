import React, { useEffect, useState } from "react";

const SCHOOL_SUGGESTIONS_API_URL = import.meta.env.VITE_SCHOOL_SUGGESTIONS_API;

export default function AdminApproval() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SCHOOL_SUGGESTIONS_API_URL);
      if (!res.ok) throw new Error("Failed to fetch suggestions");
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${SCHOOL_SUGGESTIONS_API_URL}/approve/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to approve suggestion");
      fetchSuggestions();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this suggestion?")) return;
    try {
      const res = await fetch(`${SCHOOL_SUGGESTIONS_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete suggestion");
      fetchSuggestions();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <h2>Suggested Schools Admin Panel</h2>
      {loading && <p>Loading suggestions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && suggestions.length === 0 && <p>No suggestions found.</p>}
      {!loading && suggestions.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={Style}>Name</th>
              <th style={Style}>Address</th>
              <th style={Style}>Tags</th>
              <th style={Style}>Status</th>
              <th style={Style}>Suggested At</th>
              <th style={Style}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((s) => (
              <tr key={s._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{s.name}</td>
                <td style={tdStyle}>{s.address}</td>
                <td style={tdStyle}>{s.tags.join(", ")}</td>
                <td style={tdStyle}>
                  <strong style={{ color: s.status === "approved" ? "green" : "orange" }}>
                    {s.status}
                  </strong>
                </td>
                <td style={tdStyle}>{new Date(s.suggestedAt).toLocaleString()}</td>
                <td style={tdStyle}>
                  {s.status !== "approved" && (
                    <button onClick={() => handleApprove(s._id)} style={buttonStyleApprove}>
                      Approve
                    </button>
                  )}
                  <button onClick={() => handleDelete(s._id)} style={buttonStyleDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const Style = {
  padding: "12px 8px",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px 8px",
};

const buttonStyleApprove = {
  marginRight: 8,
  padding: "6px 12px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const buttonStyleDelete = {
  padding: "6px 12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
