import "./index.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import SideNav from "./Components/SideNav";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Employer from "./employer";
import EmployerDashboard from "./employer-dashboard";
import LoginModal from "./Components/LoginModal";



function App() {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Navbar setModalOpen={setModalOpen} />
            <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            
      <div >
      <Routes > 
            <Route path="/" element={<Home />} />
          <Route path="/internships" element={<SideNav />} />        
          <Route path="/employer" element={<Employer />} /> 
          <Route path="/employer-dashboard" element={<EmployerDashboard />} /> 
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
