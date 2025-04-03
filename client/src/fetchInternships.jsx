import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditInternshipModal from "./editinternship"; // Adjust the import path as necessary

const FetchInternships = () => {
  const [internships, setInternships] = useState([]);
 const [isModalOpen, setModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [selectedInternship, setSelectedInternship] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const handleEditClick = (internship) => {
    setSelectedInternship(internship);
    setEditOpen(true);
  };
  
  const handleSaveChanges = (updatedInternship) => {
    setInternships((prev) =>
      prev.map((internship) =>
        internship.id === updatedInternship.id ? updatedInternship : internship
      )
    );
  };

  // Fetch internships
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "internships"));
        const internshipsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInternships(internshipsList);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };

    fetchInternships();
  }, []);

  // Delete internship
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await deleteDoc(doc(db, "internships", id));
        setInternships((prev) => prev.filter((internship) => internship.id !== id));
      } catch (error) {
        console.error("Error deleting internship:", error);
      }
    }
  };

  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: "80%",
      margin: "auto",
     
    }}>
  

      {internships.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#555" }}>No internships posted yet.</p>
      ) : (
        <Table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#007BFF", color: "white" }}>
              <TableCell style={{  fontSize: "1.5rem",fontWeight: "bold", padding: "12px", color: "white" }}>Title</TableCell>
              <TableCell style={{ fontWeight: "bold",  fontSize: "1.5rem",padding: "12px", color: "white" }}>Location</TableCell>
              <TableCell style={{  fontSize: "1.5rem",fontWeight: "bold", padding: "12px", color: "white" }}>Stipend</TableCell>
              <TableCell style={{ fontSize: "1.5rem", fontWeight: "bold", padding: "12px", color: "white" }}>Duration</TableCell>
              <TableCell style={{  fontSize: "1.5rem" ,fontWeight: "bold", padding: "12px", color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships.map((internship) => (
              <TableRow key={internship.id} style={{  fontSize: "1rem" , borderBottom: "1px solid #ddd", textAlign: "center" }}>
                <TableCell style={{  fontSize: "1rem" ,padding: "10px", color: "#333" }}>{internship.profile}</TableCell>
                <TableCell style={{ fontSize: "1rem" , padding: "10px", color: "#333" }}>{internship.location}</TableCell>
                <TableCell style={{  fontSize: "1rem" ,padding: "10px", color: internship.stipend ? "#007BFF" : "red" }}>
                  {internship.stipend || "Unpaid"}
                </TableCell>
                <TableCell style={{  fontSize: "1rem" ,padding: "10px", color: "#333" }}>{internship.duration}</TableCell>
                <TableCell style={{ fontSize: "1rem" , padding: "10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(internship)}
                    style={{ marginRight: "8px", padding: "6px 12px" }}
                  >
                    Edit
                  </Button>
                  
<EditInternshipModal
  internship={selectedInternship}
  open={editOpen}
  onClose={() => setEditOpen(false)}
  onSave={handleSaveChanges}
/>;
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(internship.id)}
                    style={{ padding: "6px 12px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default FetchInternships;
