import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";

// const TUITIONS_API_URL = import.meta.env.VITE_TUITIONS_API;
const TUITIONS_SUGGESTIONS_API_URL = import.meta.env.VITE_TUITION_SUGGESTIONS_API;
const TUITIONS_API_URL = import.meta.env.VITE_TUITIONS_API;

export default function Tuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [searchTuition, setSearchTuition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newTuition, setNewTuition] = useState({
    tuitionName: "",
    subjects: "",
    mode: "Offline",
    feeAmount: "",
    feeType: "",
    image: "",
    description: ""
  });

  const fetchTuitions = useCallback(async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const resTuitions = await fetch(`${TUITIONS_API_URL}?search=${query}`);
      const tuitionData = await resTuitions.json();

      const resSuggestions = await fetch(TUITIONS_SUGGESTIONS_API_URL);
      let suggestionsData = await resSuggestions.json();
      suggestionsData = suggestionsData.filter(t => t.status === "approved");

      if (query) {
        const lowerQuery = query.toLowerCase();
        suggestionsData = suggestionsData.filter(t => t.tuitionName.toLowerCase().includes(lowerQuery));
      }

      const normalizedSuggestions = suggestionsData.map(t => ({
        id: t._id,
        tuitionName: t.tuitionName,
        subjects: t.subjects,
        mode: t.mode,
        fee: t.fee,
        image: t.image,
        description: t.description
      }));

      const combined = [...tuitionData, ...normalizedSuggestions];
      setTuitions(combined);
    } catch (err) {
      console.error(err);
      setError("Failed to load tuitions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTuitions();
  }, [fetchTuitions]);

  const handleSearchTuitionChange = (e) => {
    setSearchTuition(e.target.value);
    fetchTuitions(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewTuition({ ...newTuition, [e.target.name]: e.target.value });
  };

  const handleAddTuition = async (e) => {
    e.preventDefault();
    if (!newTuition.tuitionName) return alert("Tuition name is required.");

    const tuitionToAdd = {
      tuitionName: newTuition.tuitionName,
      subjects: newTuition.subjects.split(",").map(s => s.trim()).filter(Boolean),
      mode: newTuition.mode,
      fee: {
        amount: Number(newTuition.feeAmount),
        type: newTuition.feeType
      },
      image: newTuition.image,
      description: newTuition.description
    };

    try {
      const res = await fetch(TUITIONS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tuitionToAdd)
      });

      if (!res.ok) throw new Error("Failed to add tuition.");
      await res.json();
      setNewTuition({ tuitionName: "", subjects: "", mode: "Offline", feeAmount: "", feeType: "", image: "", description: "" });
      fetchTuitions(searchTuition);
      alert("Tuition added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSendQuery = (name) => {
    alert(`Query sent for ${name}`);
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: "auto", padding: 20 ,marginTop:"20px",height:"auto"}}>
        <h2 style={{ textAlign: "center" }}>Search Tuitions</h2>
        <div style={{ marginBottom: 20,marginTop:20 }}>
          <input
            type="text"
            placeholder="Search tuition name..."
            value={searchTuition}
            onChange={handleSearchTuitionChange}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : tuitions.length === 0 ? (
          <p>No tuitions found.</p>
        ) : (
          tuitions.map((t) => (
            <div
              key={t.id}
              style={{ display: "flex", gap: 20, marginBottom: 20, border: "1px solid #ddd", borderRadius: 10, padding: 20, alignItems: "center", backgroundColor: "#fff" }}
            >
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={t.image || "https://via.placeholder.com/250x150?text=No+Image"}
                  alt={t.tuitionName}
                  style={{ width: 250, height: 150, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
                />
                <button
                  onClick={() => handleSendQuery(t.tuitionName)}
                  style={sendQueryBtnStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#DC2626"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#DC2626"; }}
                >
                  Send Enquiry
                </button>
              </div>
              <div>
                <h4 style={{ margin: 0 }}>{t.tuitionName}</h4>
                <p style={{ margin: "8px 0", color: "#666" }}>{t.description}</p>
                <p style={{ fontSize: 14, margin: "4px 0" }}><strong>Subjects:</strong> {t.subjects?.join(", ")}</p>
                <p style={{ fontSize: 14, margin: "4px 0" }}><strong>Mode:</strong> {t.mode}</p>
                {t.fee?.amount && (
                  <p style={{ fontSize: 14, margin: "4px 0" }}>
                    <strong>Fee:</strong> ₹{t.fee.amount} ({t.fee.type})
                  </p>
                )}
              </div>
            </div>
          ))
        )}

        <hr style={{ margin: "40px 0" }} />

        <h3 style={{marginLeft:"11.5rem"}}>Add New Tuition</h3>
        <form onSubmit={handleAddTuition}>
          <input type="text" name="tuitionName" placeholder="Tuition Name" value={newTuition.tuitionName} onChange={handleInputChange} style={inputStyle} required />
          <input type="text" name="subjects" placeholder="Subjects (comma-separated)" value={newTuition.subjects} onChange={handleInputChange} style={inputStyle}/>
          <select name="mode" value={newTuition.mode} onChange={handleInputChange} style={inputFieldStyle}>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
          <input type="number" name="feeAmount" placeholder="Fee Amount" value={newTuition.feeAmount} onChange={handleInputChange} style={inputStyle}/>
          <input type="text" name="feeType" placeholder="Fee Type (monthly, hourly...)" value={newTuition.feeType} onChange={handleInputChange} style={inputStyle} />
          <input type="text" name="image" placeholder="Image URL" value={newTuition.image} onChange={handleInputChange} style={inputStyle}/>
          <textarea name="description" placeholder="Description" value={newTuition.description} onChange={handleInputChange} style={inputFieldStyle} />
          <br />
          <button type="submit" 
          style={{ 
            padding: "10px 20px",
            fontWeight: "600",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            marginLeft:"12rem",
            cursor: "pointer"}}>
            Add Tuition
          </button>
        </form>
      </div>
    </>
  );
}

const sendQueryBtnStyle = {
  padding: "10px 20px",
  fontSize: 14,
  borderRadius: 6,
  border: "2px solid #DC2626",
  backgroundColor: "transparent",
  color: "#DC2626",
  cursor: "pointer",
  fontWeight: "300",
   transition: "background-color 0.3s ease, color 0.3s ease"
};

const inputStyle = {
  display: "grid",
  gap: 12,
  padding: "10px 10px",
  margin: "10px",
  borderRadius:"6px",
  width:"100%",
  maxWidth:"500px",
  border:"1px solid #ccc",
  fontSize:"16px"
};

const inputFieldStyle = {
  padding: "10px 10px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width:"100%",
  maxWidth:"500px",
  margin: "10px",
};
