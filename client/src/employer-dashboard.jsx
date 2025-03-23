// import React , {useState , useEffect} from 'react'
// import { auth, db } from "./firebaseConfig";
// import { collection, addDoc, getDocs } from "firebase/firestore";


// function EmployerDashboard() {

//       const [internships, setInternships] = useState([]);
//     const [newInternship, setNewInternship] = useState({ title: "", description: "" });
//     useEffect(() => {
//         fetchInternships();
//     }, []);

//     const fetchInternships = async () => {
//         const querySnapshot = await getDocs(collection(db, "internships"));
//         const internshipsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setInternships(internshipsData);
//     };

//       const postInternship = async () => {
//     if (!newInternship.title || !newInternship.description) {
//       alert("Please fill in all fields");
//       return;
//     }
//     await addDoc(collection(db, "internships"), newInternship);
//     setNewInternship({ title: "", description: "" });
//     fetchInternships();
//   };

    
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center ",
//         alignContent:"center",
//         height: "100vh",
//         margin: " auto",
//         marginTop: "5vh",
//     }}
//     >
          
          
//       {/* Post Internship */}
//       <div  className="mt-8 bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
//         <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center ",
//           alignContent:"center",
//           height: "40vh",
//           margin: " auto",
//           marginTop: "5vh",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
//             borderRadius: "10px",
//           padding: "20px",
//           // justifyContent: "center",
//         }}  className="internship_post">
          
      
//         <h2 className="text-xl font-bold text-gray-700">Post an Internship</h2>
//         <input
//           type="text"
//           placeholder="Internship Title"
//           value={newInternship.title}
//           onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
//           className="w-full border rounded-lg p-2 mt-2"
//         />
//         <textarea
//           placeholder="Internship Description"
//           value={newInternship.description}
//           onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
//           className="w-full border rounded-lg p-2 mt-2"
//         />
//         <button
//           onClick={postInternship}
//           className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 mt-4 rounded-lg"
//         >
//           Post Internship
//         </button>
//       </div>
//       </div>
//       {/* Display Internships */}
//        <div className="mt-8 bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
//         <h2 className="text-xl font-bold text-gray-700">Your Internships</h2>
//         {internships.length === 0 ? (
//           <p className="text-gray-500 mt-2">No internships posted yet.</p>
//         ) : (
//           <ul className="mt-4 space-y-3">
//             {internships.map((internship) => (
//               <li key={internship.id} className="border p-3 rounded-lg shadow-sm">
//                 <strong className="text-lg">{internship.title}</strong>
//                 <p className="text-gray-600">{internship.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }

// export default EmployerDashboard
import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";

const InternshipForm = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        perks: checked ? [...prev.perks, value] : prev.perks.filter((p) => p !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "internships"), formData);
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
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        marginTop: "10vh",
        padding: "20px",
      }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2
        style={{
          // display: "inline-block",
          fontSize: "3.5rem",
          textAlign: "center",
          marginBottom: "10vh",
          
        }}
        className="text-2xl font-bold mb-4">Internship Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Internship Profile */}
        <label className="block">
          <span className="">Internship Profile</span>
          <input
            type="text"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. Android App Development"
            required
          />
        </label>

        {/* Skills Required */}
        <label className="block">
          <span className="">Skills Required</span>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. Java, React"
          />
        </label>

        {/* Internship Type */}
        <fieldset>
          <span className="">Internship Type</span>
          <div className="flex space-x-4">
            {["In office", "Hybrid", "Remote"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={formData.type === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Part-time / Full-time */}
        <fieldset>
          <span className="">Part-time/Full-time</span>
          <div className="flex space-x-4">
            {["Part-time", "Full-time"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="time"
                  value={option}
                  checked={formData.time === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Number of Openings */}
        <label className="block">
          <span className="">Number of Openings</span>
          <input
            type="number"
            name="openings"
            value={formData.openings}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. 4"
          />
        </label>

        {/* Internship Start Date */}
        <fieldset>
          <span className="">Internship Start Date</span>
          <div className="flex space-x-4">
            {["Immediate", "Later"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="startDate"
                  value={option}
                  checked={formData.startDate === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Internship Duration */}
        <label className="block">
          <span className="">Internship Duration</span>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. 3 months"
          />
        </label>

        {/* Stipend */}
        <fieldset>
          <span className="">Stipend</span>
          <div className="flex space-x-4">
            {["Paid", "Unpaid"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="stipend"
                  value={option}
                  checked={formData.stipend === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Fixed Stipend */}
        {formData.stipend === "Paid" && (
          <div className="flex space-x-4">
            <input
              type="number"
              name="minStipend"
              value={formData.minStipend}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded mt-1"
              placeholder="Min ₹"
            />
            <input
              type="number"
              name="maxStipend"
              value={formData.maxStipend}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded mt-1"
              placeholder="Max ₹"
            />
          </div>
        )}

        {/* Perks */}
        <fieldset>
          <span className="">Perks</span>
          <div className="flex flex-wrap gap-4">
            {["Certificate", "Letter of recommendation", "Flexible work hours", "Free snacks & beverages"].map((perk) => (
              <label key={perk}>
                <input
                  type="checkbox"
                  name="perks"
                  value={perk}
                  checked={formData.perks.includes(perk)}
                  onChange={handleChange}
                />
                {perk}
              </label>
            ))}
          </div>
        </fieldset>

        {/* PPO */}
        <label className="block">
          <input
            type="checkbox"
            name="ppo"
            checked={formData.ppo}
            onChange={(e) => setFormData({ ...formData, ppo: e.target.checked })}
          />
          <span className="ml-2">Does this internship come with a pre-placement offer (PPO)?</span>
        </label>

        {/* Contact Info */}
        <label className="block">
          <span className="">Alternate Mobile Number</span>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="+91 9876543210"
          />
        </label>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Post Internship
        </button>
      </form>
    </div>
  );
};

export default InternshipForm;
