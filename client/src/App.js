// import "./index.css";
// import React, { useState } from "react";
// import Navbar from "./Components/Navbar";
// import SideNav from "./Components/SideNav";
// import Home from "./Components/Home";
// import Footer from "./Components/Footer";
// import { Route, Routes } from "react-router-dom";
// import Employer from "./employer";
// import EmployerDashboard from "./employer-dashboard";
// import LoginModal from "./Components/LoginModal";
// import EmployerPricing  from "./employer-pricing"


// function App() {

//   const [isModalOpen, setModalOpen] = useState(false);

//   return (
//     <div className="App">
//       {/* <Navbar /> */}
//       {/* <Navbar setModalOpen={setModalOpen} /> */}
//             <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            
//       <div >
//       <Routes > 
//             <Route path="/" element={<Home />} />
//           <Route path="/internships" element={<SideNav />} />        
//           <Route path="/employer" element={<Employer />} /> 
//           <Route path="/employer-dashboard" element={<EmployerDashboard />} />
//           <Route path="/plans-pricing" element={<EmployerPricing />} /> 
//       </Routes>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

// export default App;

// checking for user type while logging in

import "./index.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SideNav from "./Components/SideNav";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Employer from "./employer";
import PostInternship from "./post-internship";
import LoginModal from "./Components/LoginModal";
import EmployerPricing from "./employer-pricing";
import ProtectedRoute from "./Components/protectedroute";
import EmployerDashboard from "./employer-dashboard";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  // Check for userType on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserType(storedUser.userType);
    }
  }, []);

 
  return (
    <div className="App">
      {/* <Navbar setModalOpen={setModalOpen} /> */}
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<SideNav />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/plans-pricing" element={<EmployerPricing />} />
        <Route path="/post-internship" element={<PostInternship/>} />
        {/* Protected Routes */}
        <Route
          path="/employer-dashboard"
          element={     
            <EmployerDashboard />
          // </ProtectedRoute>
        }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
