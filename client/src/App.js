import "./index.css";
import Navbar from "./Components/Navbar";
import SideNav from "./Components/SideNav";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Employer from "./employer";
import EmployerDashboard from "./employer-dashboard";
function App() {
  return (
    <div className="App">
      <Navbar />
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
