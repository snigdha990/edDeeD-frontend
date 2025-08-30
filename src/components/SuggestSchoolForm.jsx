import React, { useState } from "react";
const SCHOOLS_SUGGESTIONS_API_URL = import.meta.env.VITE_SCHOOL_SUGGESTIONS_API;
export default function SuggestSchoolForm() {
  const [suggestedSchool, setSuggestedSchool] = useState({
    name: "",
    address: "",
    image: "",
    tags: ""
  });

  const handleChange = (e) => {
    setSuggestedSchool({ ...suggestedSchool, [e.target.name]: e.target.value });
  };

  const handleSuggest = async (e) => {
    e.preventDefault();

    const suggestionToSend = {
      name: suggestedSchool.name,
      address: suggestedSchool.address,
      image: suggestedSchool.image,
      tags: suggestedSchool.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      status: "pending" 
    };

    try {
      const res = await fetch(SCHOOLS_SUGGESTIONS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suggestionToSend)
      });

      if (!res.ok) throw new Error("Failed to submit suggestion");

      alert("School suggestion submitted! It will be reviewed by the admin.");
      setSuggestedSchool({ name: "", address: "", image: "", tags: "" });
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 20 }}>Suggest a School</h2>
      <form onSubmit={handleSuggest}>
        <input
          type="text"
          name="name"
          placeholder="School Name"
          value={suggestedSchool.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={suggestedSchool.address}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={suggestedSchool.image}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={suggestedSchool.tags}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            padding: "14px 40px",
            fontSize: 16,
            borderRadius: 6,
            border: "none",
            backgroundColor: "#DC2626",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Submit Suggestion
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: 12,
  padding: 14,
  fontSize: 16,
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none"
};
