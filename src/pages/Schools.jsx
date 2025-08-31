import React, { useEffect, useState } from "react";
const SCHOOLS_API_URL = import.meta.env.VITE_SCHOOLS_API;
const SCHOOLS_SUGGESTIONS_API_URL = import.meta.env.VITE_SCHOOL_SUGGESTIONS_API;

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSchool, setSearchSchool] = useState("");
  const [loading, setLoading] = useState(false);

  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    image: "",
    tags: ""
  });

  const fetchSchools = async (query = "", location = "") => {
    setLoading(true);
    try {
      const resSchools = await fetch(`${SCHOOLS_API_URL}?search=${query}`);
      const schoolsData = await resSchools.json();

      const resSuggestions = await fetch(SCHOOLS_SUGGESTIONS_API_URL);
      let suggestionsData = await resSuggestions.json();

      suggestionsData = suggestionsData.filter(s => s.status === "approved");

      if (query) {
        const lowerQuery = query.toLowerCase();
        suggestionsData = suggestionsData.filter(s => s.name.toLowerCase().includes(lowerQuery));
      }

      const normalizedSuggestions = suggestionsData.map(s => ({
        id: s._id,
        name: s.name,
        address: s.address,
        image: s.image,
        tags: s.tags
      }));

      const combined = [...schoolsData, ...normalizedSuggestions];
      setSchools(combined);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleSearchLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSearchSchoolChange = (e) => {
    setSearchSchool(e.target.value);
    fetchSchools(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewSchool({ ...newSchool, [e.target.name]: e.target.value });
  };

  const handleAddSchool = async (e) => {
    e.preventDefault();
    const schoolToAdd = {
      name: newSchool.name,
      address: newSchool.address,
      image: newSchool.image,
      tags: newSchool.tags.split(",").map(t => t.trim()).filter(t => t)
    };

    try {
      const res = await fetch(SCHOOLS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schoolToAdd),
      });

      if (!res.ok) throw new Error("Failed to add school");
      await res.json();
      fetchSchools(searchSchool);
      setNewSchool({ name: "", address: "", image: "", tags: "" });
      alert("School added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSendQuery = (schoolName) => {
    alert(`Query sent for ${schoolName}`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20, fontWeight: "600" }}>Search by Location / School Name</h2>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div className="search-bar" style={{ flex: 1, display: "flex", alignItems: "center", borderRadius: 30, backgroundColor: "#fff", boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)", padding: "10px 20px", fontSize: 16, color: "#666" }}>
          <span style={{ marginRight: 10 }}>📍</span>
          <input
            type="text"
            placeholder="Enter Location"
            value={searchLocation}
            onChange={handleSearchLocationChange}
            style={{ border: "none", outline: "none", width: "100%", fontSize: 16, color: "#333", backgroundColor: "transparent" }}
          />
        </div>
        <div className="search-bar" style={{ flex: 1, display: "flex", alignItems: "center", borderRadius: 30, backgroundColor: "#fff", boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)", padding: "10px 20px", fontSize: 16, color: "#666" }}>
          <span style={{ marginRight: 10 }}>🔍</span>
          <input
            type="text"
            placeholder="Search schools"
            value={searchSchool}
            onChange={handleSearchSchoolChange}
            style={{ border: "none", outline: "none", width: "100%", fontSize: 16, color: "#333", backgroundColor: "transparent" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
        {["Distance from location (km)", "Extracurricular Activities", "Type", "Languages", "Philosophy", "Counselling Support", "Infrastructure", "Curriculum", "Category"].map((filter) => (
          <button
            key={filter}
            style={{ border: "1px solid #ccc", backgroundColor: "#fff", borderRadius: 50, padding: "6px 16px", cursor: "pointer", fontSize: 14, color: "#333", fontWeight: "500", boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)" }}
          >
            {filter} ▼
          </button>
        ))}
      </div>
      <div>
        <h3 style={{ marginBottom: 20, fontWeight: "300" }}>All Schools</h3>
        {loading ? (
          <p>Loading...</p>
        ) : schools.length === 0 ? (
          <p>No schools found.</p>
        ) : (
          schools.map((school) => (
            <div
              key={school.id}
              style={{ display: "flex", gap: 20, marginBottom: 20, border: "1px solid #ddd", borderRadius: 10, padding: 20, alignItems: "center", backgroundColor: "#fff", boxShadow: "0 2px 6px rgb(0 0 0 / 0.05)", width: "100%" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <img
                  src={school.image || "https://via.placeholder.com/250x150?text=No+Image"}
                  alt={school.name}
                  style={{ width: 250, height: 150, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
                />
                <button
                  onClick={() => handleSendQuery(school.name)}
                  style={sendQueryBtnStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#DC2626"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#DC2626"; }}
                >
                  Send Enquiry
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontWeight: "700", fontSize: 22 }}>{school.name}</h4>
                <p style={{ margin: "8px 0", color: "#666", fontSize: 14 }}>{school.address}</p>
                {school.tags && school.tags.length > 0 && (
                  <span style={{ backgroundColor: "#eee", borderRadius: 20, padding: "4px 12px", fontSize: 13, color: "#555", fontWeight: "600" }}>
                    {school.tags[0]}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <hr style={{ margin: "40px 0" }} />
    </div>
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
