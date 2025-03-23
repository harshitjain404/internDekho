import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const EmployerPage = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",

        phone: "",
        firstName: "",
        lastName: "",
    });

    const [isLogin, setIsLogin] = useState(true);
    const [internships, setInternships] = useState([]);
    const [newInternship, setNewInternship] = useState({ title: "", description: "" });

  

    const handleAuth = async () => {
        const { email, password, phone, firstName, lastName } = formData;
        
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }
        
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/employer-dashboard");
            } else {
                if (  !phone || !firstName || !lastName) {
                    alert("Please fill all fields.");
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Store additional user info in Firestore
                await addDoc(collection(db, "employers"), {
                    uid: user.uid,
                    email,
           
                    phone,
                    firstName,
                    lastName,
                });

                alert("Signup successful!");
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert(error.message);
        }
    };
    const SignOut = async () => {
        // const navigate = useNavigate();
      alert("Signing out...");
        try {
          await signOut(auth); // Firebase sign-out
          alert("Successfully signed out!");
          navigate("/"); // Redirect to login page after sign-out
        } catch (error) {
          console.error("Sign Out Error:", error);
          alert("Error signing out. Please try again.");
        }
      };
      const handleClick = () => {
        const user = auth.currentUser; // Get the current logged-in user
        if (user) {
          navigate("/employer-dashboard"); // Redirect to dashboard if logged in
        } else {
        alert("Please Sign in to Post InternShip")// Redirect to login if not logged in
        }
      };
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header Section */}
        <div
          style={{
            marginTop: "5vh",
          }}
          className="EmployerPage flex flex-col md:flex-row justify-between items-center">
          <div
            style={{
              margin: "auto"
            }}
            className="EmployerPagedetails text-center md:text-left">
                    <h1 className="text-5xl font-bold text-gray-800">Hire the Best Interns</h1>
                    <p className="text-2xl text-gray-600 mt-2">Post internships for free and find top talent!</p>
                    <img
              style={{
                height: "50vh",
                marginTop: "2vh",
                width: "70vh"
              }}  
                        src="https://i.pinimg.com/736x/88/d5/90/88d5900c72c7d0169b09b0ef3bb155d8.jpg"
                        alt="Hiring"
                        className="h-60 mt-4 mx-auto md:mx-0"
                    />
                </div>

                {/* Authentication Form */}
          <div
                 style={{
              margin: "auto",
              height: "40vh",
              textAlign: "center",
              padding: '2vh',
              marginTop: "10vh" ,
              fontSize: "1rem",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)"
            }}
            className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <h2 className="text-4xl font-semibold text-gray-700 mb-4">
                {isLogin ? "Employer Login" : "Employer Sign Up"}
                </h2>

                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full border p-2 rounded-md mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full border p-2 rounded-md mb-2"
                            />
                         
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border p-2 rounded-md mb-2"
                            />
                        </>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border p-2 rounded-md mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border p-2 rounded-md mb-2"
                    />

                    <button
                        onClick={handleAuth}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 mt-4 rounded-md"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="mt-3 text-blue-500 text-center w-full block"
                    >
                        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
                    </button>
                </div>
            </div>
            <div className="employer-details-sec">
                <div className="employer-details"
                    style={{
                        margin: "auto",
                        padding: '2vh',
                        marginTop: "10vh" ,
                        fontSize: "1rem",
                        
                    }}
                >
                    <h1 className="text-5xl font-bold text-gray-800">Why Post Internships On InternDekho</h1>
                    <p className="text-2xl text-gray-600 mt-2">
                        Post your intern requirements & Build Your Dream Team
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent:"space-around",
                        padding: '2vh',
                        marginTop: "10vh" ,
                        fontSize: "1rem",
                        width: "80vw",
                        height: "20vh",
                        margin: "auto",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                        
                }}
                >
                   <div>
                        <h3
                            style={{
                                fontSize: "2.5rem",
                                color: "#fb923c"
                        }}
                        >10K +</h3>
                        <h5
                        style={{
                            fontSize: "1.5rem",
                         
                    }}>Candidates Looking for InternShips</h5>
                    </div>
                    <div>
                        <h3
                            style={{
                                fontSize: "2.5rem",
                                   color: "#fb923c"
                        }}>1K +</h3>
                        <h5
                        style={{
                            fontSize: "1.5rem",
                            
                    }}>Interns Hired</h5>
                    </div> 
                    <div>
                        <h3
                            style={{
                                fontSize: "2.5rem",
                                   color: "#fb923c"
                        }}>100+</h3>
                        <h5
                        style={{
                            fontSize: "1.5rem",
                 
                    }}>Job Profiles</h5>
                    </div>
                    <div>
                        <h3
                          style={{
                                fontSize: "2.5rem",
                                 color: "#fb923c"
                        }}>3K+</h3>
                        <h5
                        style={{
                            fontSize: "1.5rem",
                   
                    }}>Companies Hiring for Interns</h5>
                    </div>
                </div>
                <div
                    style={{
                        width: "90vw",      
                        margin: "auto",
                        padding: '5vh',
                        marginTop: "2.5%",
                        fontSize: "3rem",
                        textAlign: "center",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                        backgroundColor: "#fb923c", 
                        color: "white",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }} 
                    
                >
                    <h2>Start Posting Internships NOW </h2>
                     
                    <button
                        style={{
                            padding: "1vh 2vh",
                            fontSize: "1.5rem",
                            backgroundColor: "#2563eb",
                            color: "white",
                            borderRadius: "10px",
                            border: "none",

                        }}
                        onClick={() => handleClick()}
                    >POST FOR FREE</button>
                </div>
            </div>
        </div>
    );
};

export default EmployerPage;
