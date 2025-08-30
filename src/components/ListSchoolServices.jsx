import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListSchoolServices() {
  const navigate = useNavigate();

  return (
    <div className="list-school-services">
      <button
        className="list-button"
        onClick={() => navigate("/schools")}
      >
        List the Schools
      </button>
      <button
        className="list-button"
        onClick={() => navigate("/services")}
      >
        List the Services
      </button>
    </div>
  );
}
