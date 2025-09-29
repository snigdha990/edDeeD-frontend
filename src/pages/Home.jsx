import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Search from "../components/Search";
import ListSchoolServices from "../components/ListSchoolServices";
import Updates from "../components/Updates";
import FeatureSchool from "../components/FeatureSchool";
import BeyondSchool from "../components/BeyondSchool"
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Search />
      <ListSchoolServices />
      <Updates />
      <FeatureSchool />
      <BeyondSchool />
      <Footer />
    </>
  );
}
