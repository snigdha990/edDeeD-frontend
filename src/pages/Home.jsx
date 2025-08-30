import { useState } from "react";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import HeroSection from "../components/HeroSection";
import Search from "../components/Search";
import ListSchoolServices from "../components/ListSchoolServices";
import Updates from "../components/Updates";
import FeatureSchool from "../components/FeatureSchool";
import BeyondSchool from "../components/BeyondSchool"

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openSignIn = () => {
    setShowSignIn(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowSignIn(false);
  };

  return (
    <>
      <Navbar onSignInClick={openSignIn} onRegisterClick={openRegister} />
      {showSignIn && (
        <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SignIn
              onClose={() => setShowSignIn(false)}
              onSwitchToRegister={openRegister}
            />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Register onSwitchToSignIn={openSignIn} />
          </div>
        </div>
      )}
      <HeroSection />
      <Search />
      <ListSchoolServices />
      <Updates />
      <FeatureSchool />
      <BeyondSchool />
    </>
  );
}
