import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ email: "", password: "", phone: "", firstName: "", lastName: "" });
    const [isLogin, setIsLogin] = useState(true);
let navigate = useNavigate();
    // const handleAuth = async () => {
    //     const { email, password, phone, firstName, lastName } = formData;
    //     if (!email || !password) return alert("Email and password are required.");

    //     try {
    //         if (isLogin) {
    //             await signInWithEmailAndPassword(auth, email, password);
    //             alert("Logged in successfully.");
    //             const user = localStorage.setItem("user", JSON.stringify({ email }));
    //             console.log(user);
             
    //             onClose();
    //         } else {
    //             if (!phone || !firstName || !lastName) return alert("Please fill all fields.");

    //             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //             await addDoc(collection(db, "employers"), { uid: userCredential.user.uid, email, phone, firstName, lastName });
    //             onClose();
    //         }
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    const handleAuth = async () => {
        const { email, password, phone, firstName, lastName } = formData;
        if (!email || !password) return alert("Email and password are required.");
    
        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user; // ✅ Get user object from Firebase
                localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
                console.log("User stored:", JSON.parse(localStorage.getItem("user"))); // ✅ Correctly log user
                alert("Logged in successfully.");
                onClose();
            } else {
                if (!phone || !firstName || !lastName) return alert("Please fill all fields.");
    
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user; // ✅ Get user
                await addDoc(collection(db, "employers"), { uid: user.uid, email, phone, firstName, lastName });
                
                localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
                console.log("User stored:", JSON.parse(localStorage.getItem("user")));
                onClose();
            }
        } catch (error) {
            alert(error.message);
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-2xl z-50">
                <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold text-gray-600">&times;</button>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{isLogin ? "Employer Login" : "Employer Sign Up"}</h2>
                <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border p-2 rounded-md mb-2" />
                <button onClick={handleAuth} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 mt-4 rounded-md">{isLogin ? "Login" : "Sign Up"}</button>
            </div>
        </div>
    );
}

export default LoginModal;
