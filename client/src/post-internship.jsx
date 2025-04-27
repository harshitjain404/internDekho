


// import React, { useState } from "react";
// import { db } from "./firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// import EmployerNavbar from "./Components/employernavbar";
// import LoginModal from "./Components/LoginModal";

// const InternshipForm = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     profile: "",
//     skills: "",
//     type: "In office",
//     time: "Full-time",
//     openings: "",
//     startDate: "Immediate",
//     duration: "",
//     responsibilities: "",
//     preferences: "",
//     stipend: "Paid",
//     minStipend: "",
//     maxStipend: "",
//     incentivesMin: "",
//     incentivesMax: "",
//     perks: [],
//     ppo: false,
//     availability: "",
//     contactNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await addDoc(collection(db, "internships"), formData);
//       alert("Internship posted successfully!");
//       setFormData({
//         profile: "",
//         skills: "",
//         type: "In office",
//         time: "Full-time",
//         openings: "",
//         startDate: "Immediate",
//         duration: "",
//         responsibilities: "",
//         preferences: "",
//         stipend: "Paid",
//         minStipend: "",
//         maxStipend: "",
//         incentivesMin: "",
//         incentivesMax: "",
//         perks: [],
//         ppo: false,
//         availability: "",
//         contactNumber: "",
//       });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Failed to post internship. Try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <EmployerNavbar setModalOpen={setModalOpen} />
//       <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      
//       <div style={{
//         maxWidth: "800px",
//         margin: "10vh auto",
//         padding: "30px",
//         backgroundColor: "#fff",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         borderRadius: "10px",
//       }}>
//         <h2 style={{
//           fontSize: "28px",
//           fontWeight: "bold",
//           textAlign: "center",
//           marginBottom: "20px",
//           color: "#333",
//         }}>Post an Internship</h2>

//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
//           {/* Internship Profile */}
//           <label style={{ fontWeight: "bold" }}>Internship Profile</label>
//           <input type="text" name="profile" value={formData.profile} onChange={handleChange} placeholder="e.g. Android Developer"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          
//           {/* Skills */}
//           <label style={{ fontWeight: "bold" }}>Skills Required</label>
//           <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Java, React"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           {/* Internship Type */}
//           <label style={{ fontWeight: "bold" }}>Internship Type</label>
//           <div style={{ display: "flex", gap: "20px" }}>
//             {["In office", "Hybrid", "Remote"].map((option) => (
//               <label key={option}>
//                 <input type="radio" name="type" value={option} checked={formData.type === option} onChange={handleChange} />
//                 {" "}{option}
//               </label>
//             ))}
//           </div>

//           {/* Number of Openings */}
//           <label style={{ fontWeight: "bold" }}>Number of Openings</label>
//           <input type="number" name="openings" value={formData.openings} onChange={handleChange} placeholder="e.g. 4"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           {/* Internship Duration */}
//           <label style={{ fontWeight: "bold" }}>Internship Duration</label>
//           <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 3 months"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           {/* Stipend */}
//           <label style={{ fontWeight: "bold" }}>Stipend</label>
//           <div style={{ display: "flex", gap: "20px" }}>
//             {["Paid", "Unpaid"].map((option) => (
//               <label key={option}>
//                 <input type="radio" name="stipend" value={option} checked={formData.stipend === option} onChange={handleChange} />
//                 {" "}{option}
//               </label>
//             ))}
//           </div>

//           {/* Stipend Amount */}
//           {formData.stipend === "Paid" && (
//             <div style={{ display: "flex", gap: "15px" }}>
//               <input type="number" name="minStipend" value={formData.minStipend} onChange={handleChange} placeholder="Min ₹"
//                 style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }} />
//               <input type="number" name="maxStipend" value={formData.maxStipend} onChange={handleChange} placeholder="Max ₹"
//                 style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }} />
//             </div>
//           )}

//           {/* Perks */}
//           {/* <label style={{ fontWeight: "bold" }}>Perks</label>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
//             {["Certificate", "Letter of recommendation", "Flexible work hours"].map((perk) => (
//               <label key={perk}>
//                 <input type="checkbox" name="perks" value={perk} checked={formData.perks.includes(perk)} onChange={handleChange} />
//                 {" "}{perk}
//               </label>
//             ))}
//           </div> */}

//           {/* Contact Info */}
//           <label style={{ fontWeight: "bold" }}>Alternate Mobile Number</label>
//           <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+91 9876543210"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           {/* Submit Button */}
//           <button type="submit" style={{
//             width: "100%",
//             padding: "12px",
//             borderRadius: "5px",
//             backgroundColor: "#007BFF",
//             color: "#fff",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             border: "none",
//           }} disabled={loading}>
//             {loading ? "Posting..." : "Post Internship"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InternshipForm;


// import React, { useState } from "react";
// import { db } from "./firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import EmployerNavbar from "./Components/employernavbar";
// import LoginModal from "./Components/LoginModal";

// const InternshipForm = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [formData, setFormData] = useState({
//     profile: "",
//     skills: "",
//     type: "In office",
//     time: "Full-time",
//     openings: "",
//     startDate: "Immediate",
//     duration: "",
//     responsibilities: "",
//     preferences: "",
//     stipend: "Paid",
//     minStipend: "",
//     maxStipend: "",
//     incentivesMin: "",
//     incentivesMax: "",
//     perks: [],
//     ppo: false,
//     availability: "",
//     contactNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "perks") {
//       // Perks array update logic
//       const updatedPerks = checked
//         ? [...formData.perks, value]
//         : formData.perks.filter((p) => p !== value);

//       setFormData((prev) => ({
//         ...prev,
//         perks: updatedPerks,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || user.userType !== "employer") {
//       alert("Only logged-in employers can post internships.");
//       return;
//     }

//     setLoading(true);

//     try {
//       await addDoc(collection(db, "internships"), {
//         ...formData,
//         employerEmail: user.email,
//         createdAt: new Date(),
//       });

//       alert("Internship posted successfully!");

//       setFormData({
//         profile: "",
//         skills: "",
//         type: "In office",
//         time: "Full-time",
//         openings: "",
//         startDate: "Immediate",
//         duration: "",
//         responsibilities: "",
//         preferences: "",
//         stipend: "Paid",
//         minStipend: "",
//         maxStipend: "",
//         incentivesMin: "",
//         incentivesMax: "",
//         perks: [],
//         ppo: false,
//         availability: "",
//         contactNumber: "",
//       });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Failed to post internship. Try again.");
//     }

//     setLoading(false);
//   };

//   // Block unauthorized access
//   if (!user || user.userType !== "employer") {
//     console.log("User is not an employer or not logged in.");
//     return (
//       <>
//         <EmployerNavbar setModalOpen={setModalOpen} />
//         <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//         <div style={{ textAlign: "center", marginTop: "20vh", fontSize: "20px", color: "red" }}>
//           ⚠️ You must be logged in as an <strong>employer</strong> to post an internship.

//           <button
//             style={{
//               marginTop: "20px",
//               padding: "10px 20px",
//               backgroundColor: "#007BFF",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//             onClick={() => setModalOpen(true)}
//           >
//             Employer Login
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <EmployerNavbar setModalOpen={setModalOpen} />
//       <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

//       <div style={{
//         maxWidth: "800px",
//         margin: "10vh auto",
//         padding: "30px",
//         backgroundColor: "#fff",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         borderRadius: "10px",
//       }}>
//         <h2 style={{
//           fontSize: "28px",
//           fontWeight: "bold",
//           textAlign: "center",
//           marginBottom: "20px",
//           color: "#333",
//         }}>Post an Internship</h2>

//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//           {/* Your form elements remain the same... */}
//           <label style={{ fontWeight: "bold" }}>Internship Profile</label>
//           <input type="text" name="profile" value={formData.profile} onChange={handleChange} placeholder="e.g. Android Developer"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />

//           <label style={{ fontWeight: "bold" }}>Skills Required</label>
//           <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Java, React"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           <label style={{ fontWeight: "bold" }}>Internship Type</label>
//           <div style={{ display: "flex", gap: "20px" }}>
//             {["In office", "Hybrid", "Remote"].map((option) => (
//               <label key={option}>
//                 <input type="radio" name="type" value={option} checked={formData.type === option} onChange={handleChange} />
//                 {" "}{option}
//               </label>
//             ))}
//           </div>

//           <label style={{ fontWeight: "bold" }}>Number of Openings</label>
//           <input type="number" name="openings" value={formData.openings} onChange={handleChange} placeholder="e.g. 4"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           <label style={{ fontWeight: "bold" }}>Internship Duration</label>
//           <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 3 months"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           <label style={{ fontWeight: "bold" }}>Stipend</label>
//           <div style={{ display: "flex", gap: "20px" }}>
//             {["Paid", "Unpaid"].map((option) => (
//               <label key={option}>
//                 <input type="radio" name="stipend" value={option} checked={formData.stipend === option} onChange={handleChange} />
//                 {" "}{option}
//               </label>
//             ))}
//           </div>

//           {formData.stipend === "Paid" && (
//             <div style={{ display: "flex", gap: "15px" }}>
//               <input type="number" name="minStipend" value={formData.minStipend} onChange={handleChange} placeholder="Min ₹"
//                 style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }} />
//               <input type="number" name="maxStipend" value={formData.maxStipend} onChange={handleChange} placeholder="Max ₹"
//                 style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }} />
//             </div>
//           )}

//           <label style={{ fontWeight: "bold" }}>Alternate Mobile Number</label>
//           <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+91 9876543210"
//             style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

//           <button type="submit" style={{
//             width: "100%",
//             padding: "12px",
//             borderRadius: "5px",
//             backgroundColor: "#007BFF",
//             color: "#fff",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             border: "none",
//           }} disabled={loading}>
//             {loading ? "Posting..." : "Post Internship"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InternshipForm;


import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EmployerNavbar from "./Components/employernavbar";
import LoginModal from "./Components/LoginModal";

const InternshipForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const handleSignout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("user");
      alert("Signed out successfully!");
    }).catch((error) => {
      console.error("Error signing out: ", error);
      alert("Failed to sign out. Try again.");
    });
  };


  const [formData, setFormData] = useState({
    profile: "",
    skills: "",
    type: "In office",
    time: "Full-time",
    openings: "",
    startDate: "Immediate",
    duration: "",
    responsibilities: "",
    preferences: "",
    stipend: "Paid",
    minStipend: "",
    maxStipend: "",
    incentivesMin: "",
    incentivesMax: "",
    perks: [],
    ppo: false,
    availability: "",
    contactNumber: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("You must be logged in to post an internship.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "internships"), {
        ...formData,
        employerId: user.uid,
        employerEmail: user.email,
        postedAt: new Date(),
      });

      alert("Internship posted successfully!");
      setFormData({
        profile: "",
        skills: "",
        type: "In office",
        time: "Full-time",
        openings: "",
        startDate: "Immediate",
        duration: "",
        responsibilities: "",
        preferences: "",
        stipend: "Paid",
        minStipend: "",
        maxStipend: "",
        incentivesMin: "",
        incentivesMax: "",
        perks: [],
        ppo: false,
        availability: "",
        contactNumber: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post internship. Try again.");
    }

    setLoading(false);
  };

  if (!authChecked) {
    
    return <div> <div style={{ textAlign: "center", marginTop: "50px" }}>
        <EmployerNavbar setModalOpen={setModalOpen} />
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      Checking authentication...</div>;
      </div>
  }

  if (!user) {
    return <div>
      <EmployerNavbar setModalOpen={setModalOpen} />
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>You must be logged in to post internships.</div>;
      </div>
  }

  return (
    <>
      <EmployerNavbar setModalOpen={setModalOpen} />
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div style={{
        maxWidth: "800px",
        margin: "10vh auto",
        padding: "30px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}>Post an Internship</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          {/* Internship Profile */}
          <label style={{ fontWeight: "bold" }}>Internship Profile</label>
          <input type="text" name="profile" value={formData.profile} onChange={handleChange} placeholder="e.g. Android Developer"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />

          {/* Skills */}
          <label style={{ fontWeight: "bold" }}>Skills Required</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Java, React"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

          {/* Internship Type */}
          <label style={{ fontWeight: "bold" }}>Internship Type</label>
          <div style={{ display: "flex", gap: "20px" }}>
            {["In office", "Hybrid", "Remote"].map((option) => (
              <label key={option}>
                <input type="radio" name="type" value={option} checked={formData.type === option} onChange={handleChange} />
                {" "}{option}
              </label>
            ))}
          </div>

          {/* Number of Openings */}
          <label style={{ fontWeight: "bold" }}>Number of Openings</label>
          <input type="number" name="openings" value={formData.openings} onChange={handleChange} placeholder="e.g. 4"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

          {/* Internship Duration */}
          <label style={{ fontWeight: "bold" }}>Internship Duration</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 3 months"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

          {/* Stipend */}
          <label style={{ fontWeight: "bold" }}>Stipend</label>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Paid", "Unpaid"].map((option) => (
              <label key={option}>
                <input type="radio" name="stipend" value={option} checked={formData.stipend === option} onChange={handleChange} />
                {" "}{option}
              </label>
            ))}
          </div>

          {/* Stipend Amount */}
          {formData.stipend === "Paid" && (
            <div style={{ display: "flex", gap: "15px" }}>
              <input type="number" name="minStipend" value={formData.minStipend} onChange={handleChange} placeholder="Min ₹"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }} />
              <input type="number" name="maxStipend" value={formData.maxStipend} onChange={handleChange} placeholder="Max ₹"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }} />
            </div>
          )}

          {/* Contact Info */}
          <label style={{ fontWeight: "bold" }}>Alternate Mobile Number</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+91 9876543210"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />

          {/* Submit Button */}
          <button type="submit" style={{
            width: "100%",
            padding: "12px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
          }} disabled={loading}>
            {loading ? "Posting..." : "Post Internship"}
          </button>
          {/* <button onClick={handleSignout}>
            Sign out
          </button> */}
        </form>
      </div>
    </>
  );
};

export default InternshipForm;
