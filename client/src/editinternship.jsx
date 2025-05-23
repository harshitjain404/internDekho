

import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditInternshipModal = ({ internship, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    profile: "",
    location: "",
    stipend: "",
    duration: "",
  });

  // Update form data when internship prop changes
  useEffect(() => {
    if (internship) {
      setFormData({
        id: internship.id || "",
        profile: internship.profile || "",
        location: internship.location || "",
        stipend: internship.stipend || "",
        duration: internship.duration || "",
      });
    }
  }, [internship]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { id, profile, location, stipend, duration } = formData;

      if (!id) {
        console.error("Internship ID is missing.");
        return;
      }

      const internshipRef = doc(db, "internships", id);
      await updateDoc(internshipRef, {
        profile,
        location,
        stipend,
        duration,
      });

      console.log("Updated internship:", formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating internship:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Edit Internship</h2>
        <TextField
          fullWidth
          label="Profile"
          name="profile"
          value={formData.profile}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stipend"
          name="stipend"
          value={formData.stipend}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditInternshipModal;
