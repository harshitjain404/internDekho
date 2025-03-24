

import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";

import EmployerNavbar from "./Components/employernavbar";
import LoginModal from "./Components/LoginModal";


const InternshipForm = () => {

      const [isModalOpen, setModalOpen] = useState(false);
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
    <>
      <EmployerNavbar setModalOpen={setModalOpen} />
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
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
      </>
  );
};

export default InternshipForm;
