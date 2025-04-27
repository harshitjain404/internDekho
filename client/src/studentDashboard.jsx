import React, { useState } from "react";
import "./studentDashboard.css";
import StudentNavbar from "./Components/studentNavbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import LoginModal from "./Components/LoginModal";


const savedInternships = [
  {
    title: "Frontend Developer Intern",
    company: "Google",
    location: "Remote",
    stipend: "₹20,000 /month",
    duration: "6 months",
  },
  {
    title: "Data Analyst Intern",
    company: "Amazon",
    location: "Bangalore",
    stipend: "₹15,000 /month",
    duration: "4 months",
  },
];
    


const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
            <StudentNavbar setModalOpen={setModalOpen} />
            <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    <div className="student-dashboard-container">
          
          {/* <aside className="sidebar">
              
        <h2>Student Panel</h2>
        <nav>
          <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button onClick={() => setActiveTab("saved")}>Saved Internships</button>
          <button onClick={() => setActiveTab("profile")}>Profile</button>
          <button onClick={() => alert("Logged Out!")}>Logout</button>
        </nav>
      </aside> */}

      <main className="main-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-section">
            <h1>Welcome back!</h1>
            <p>Check out new internships and manage your applications.</p>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="saved-internships-section">
            <h1>Saved Internships</h1>
            {savedInternships.length === 0 ? (
              <p>No saved internships yet.</p>
            ) : (
              savedInternships.map((internship, index) => (
                <div className="internship-card" key={index}>
                  <h2>{internship.title}</h2>
                  <p><strong>Company:</strong> {internship.company}</p>
                  <p><strong>Location:</strong> {internship.location}</p>
                  <p><strong>Stipend:</strong> {internship.stipend}</p>
                  <p><strong>Duration:</strong> {internship.duration}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <h1>My Profile</h1>
            <p>Name: John Doe</p>
            <p>Email: johndoe@gmail.com</p>
            <p>College: XYZ University</p>
          </div>
        )}
      </main>
            </div>
            </>            
  );
};

export default StudentDashboard;
