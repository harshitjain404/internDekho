

// import React, { useState, useEffect } from "react";
// import { auth, db } from "./firebaseConfig";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const EmployerPage = () => {
//     let navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const [internships, setInternships] = useState([]);
//   const [newInternship, setNewInternship] = useState({ title: "", description: "" });

//   useEffect(() => {
//     fetchInternships();
//   }, []);

//   const fetchInternships = async () => {
//     const querySnapshot = await getDocs(collection(db, "internships"));
//     const internshipsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setInternships(internshipsData);
//   };


//   const handleAuth = async () => {
//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
// navigate("/employer-dashboard");
//       } else {
//         // ✅ Ensure auth is defined before calling
//         if (!auth) {
//           console.error("Firebase auth is not initialized");
//           return;
//         }
//         await createUserWithEmailAndPassword(auth, email, password);
//       }
//       alert("Authentication successful!");
//     } catch (error) {
//       console.error("Auth Error:", error);
//       alert(error.message);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-100  p-6">
//       {/* Header */}
//           <div className="EmployerPage"
//         style={{
//           marginTop: "5vh",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//                }}>
//         <div
//           className="EmployerPagedetails"
//           style={{
//             margin: "auto"
            
//           }}
//         >
          
//         <h1 className="text-7xl  text-gray-800">Hire the Best Interns</h1>
//         <p className="text-4xl text-gray-600 mt-2">Post internships for free and find top talent!</p>
//         <img
//           className=""
//           src="https://i.pinimg.com/736x/88/d5/90/88d5900c72c7d0169b09b0ef3bb155d8.jpg"
//             alt="Hiring"
//             style={{
//               height: "40vh",
//               marginTop:"2vh",
//             }}
//           />

//         </div>
//         {/* Authentication Form */}
//         <div
//           className=""
//           style={{
//             margin : "auto"
//             }}
//         >
//         <h2 className="text-xl font-bold text-gray-700">{isLogin ? "Employer Login" : "Sign Up"}</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded-lg p-2 mt-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded-lg p-2 mt-2"
//         />
//         <button
//           onClick={handleAuth}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 mt-4 rounded-lg"
//         >
//           {isLogin ? "Login" : "Sign Up"}
//         </button>
//         <button onClick={() => setIsLogin(!isLogin)} className="mt-2 text-blue-500">
//           {isLogin ? "Switch to Sign Up" : "Switch to Login"}
//             </button>
            
//           </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerPage;

import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
              fontSize: "1rem"
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
        </div>
    );
};

export default EmployerPage;
