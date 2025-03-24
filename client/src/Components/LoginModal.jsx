
// import React, { useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";

// function LoginModal({ isOpen, onClose }) {
//     const [formData, setFormData] = useState({
//         email: "", password: "", phone: "", firstName: "", lastName : "" , userType: "student" ,
//     });
//     const [isLogin, setIsLogin] = useState(true);

//     const handleAuth = async () => {
//         const { email, password, phone, firstName, lastName, userType } = formData;
//         if (!email || !password) return alert("Email and password are required.");

//         try {
//             if (isLogin) {
//                 // Login
//                 const userCredential = await signInWithEmailAndPassword(auth, email, password);
//                 const user = userCredential.user;

//                 // Store user role in localStorage
//                 localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, userType }));
//                 alert("Logged in successfully.");
//                 onClose();
//             } else {
//                 // Sign Up
//                 if (!phone || !firstName || !lastName) return alert("Please fill all fields.");

//                 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//                 const user = userCredential.user;

//                 // Determine collection based on userType
//                 const collectionName = userType === "employer" ? "employers" : "students";

//                 // Save to Firestore
//                 await addDoc(collection(db, collectionName), {
//                     uid: user.uid, email, phone, firstName, lastName, userType
//                 });

//                 localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, userType }));
//                 alert("Signup successful!");
//                 onClose();
//             }
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-2xl z-50">
//                 <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold text-gray-600">&times;</button>
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

//                 {/* User Type Selection */}
//                 {!isLogin && (
//                     <select
//                         value={formData.userType}
//                         onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
//                         className="w-full border p-2 rounded-md mb-2"
//                     >
//                         <option value="student">Student/Intern</option>
//                         <option value="employer">Employer</option>
//                     </select>
//                 )}

//                 {/* Signup Fields (Only for New Users) */}
//                 {!isLogin && (
//                     <>
//                         <input type="text" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
//                         <input type="text" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
//                         <input type="tel" placeholder="Phone Number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
//                     </>
//                 )}

//                 <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
//                 <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border p-2 rounded-md mb-2" />

//                 <button onClick={handleAuth} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 mt-4 rounded-md">
//                     {isLogin ? "Login" : "Sign Up"}
//                 </button>

//                 <button onClick={() => setIsLogin(!isLogin)} className="mt-3 text-blue-500 text-center w-full block">
//                     {isLogin ? "Switch to Sign Up" : "Switch to Login"}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default LoginModal;


import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
const navigate = useNavigate();

    const [formData, setFormData] = useState
        ({
            email: "",
            password: "",
            phone: "",
            firstName: "",
            lastName: "",
            userType: "student"
        });
    const [isLogin, setIsLogin] = useState(true);
console.log(formData.userType + "this is the user type from login modal");
    const handleAuth = async () => {
        const { email, password, phone, firstName, lastName, userType } = formData;
        if (!email || !password) return alert("Email and password are required.");

        try {
            if (isLogin) {
                // 🔹 Logging In: Fetch userType from Firestore
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const q = query(collection(db, "users"), where("uid", "==", userCredential.user.uid));
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    localStorage.setItem("user", JSON.stringify({ email, userType: userData.userType }));
                }
                if (userType === "employer") {
                 navigate ("/employer-dashboard");
                }
                else {
                 navigate ("/internships");
                }
                alert("Logged in successfully.");
                onClose();
            } else {
                // 🔹 Signing Up: Store userType in Firestore
                if (!phone || !firstName || !lastName) return alert("Please fill all fields.");

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await addDoc(collection(db, "users"), { 
                    uid: userCredential.user.uid, 
                    email, 
                    phone, 
                    firstName, 
                    lastName, 
                    userType // Store userType (student/employer)
                });

                localStorage.setItem("user", JSON.stringify({ email, userType }));
                onClose();
                window.location.reload(); // ✅ Refresh Navbar after Sign Up
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-2xl">
                <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold text-gray-600">&times;</button>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{isLogin ? "Employer / Student Login" : "Sign Up"}</h2>
                
                {/* User Type Selector */}
               
                    <select 
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })} 
                        className="w-full border p-2 rounded-md mb-2"
                    >
                        <option value="student">Student</option>
                        <option value="employer">Employer</option>
                    </select>
               

                <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
                <button onClick={handleAuth} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 mt-4 rounded-md">
                    {isLogin ? "Login" : "Sign Up"}
                </button>

                
                 <button onClick={() => setIsLogin(!isLogin)} className="mt-3 text-blue-500 text-center w-full block">
                    {isLogin ? "Switch to Sign Up" : "Switch to Login"}
                    </button>
            </div>
        </div>
    );
}

export default LoginModal;
