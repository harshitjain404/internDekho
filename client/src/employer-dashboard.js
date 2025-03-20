import React , {useState , useEffect} from 'react'
import { auth, db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";


function EmployerDashboard() {

      const [internships, setInternships] = useState([]);
    const [newInternship, setNewInternship] = useState({ title: "", description: "" });
    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        const querySnapshot = await getDocs(collection(db, "internships"));
        const internshipsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setInternships(internshipsData);
    };

      const postInternship = async () => {
    if (!newInternship.title || !newInternship.description) {
      alert("Please fill in all fields");
      return;
    }
    await addDoc(collection(db, "internships"), newInternship);
    setNewInternship({ title: "", description: "" });
    fetchInternships();
  };

    
  return (
      <div>Employer Dashboard
          
          
      {/* Post Internship */}
      <div className="mt-8 bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-700">Post an Internship</h2>
        <input
          type="text"
          placeholder="Internship Title"
          value={newInternship.title}
          onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
          className="w-full border rounded-lg p-2 mt-2"
        />
        <textarea
          placeholder="Internship Description"
          value={newInternship.description}
          onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
          className="w-full border rounded-lg p-2 mt-2"
        />
        <button
          onClick={postInternship}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 mt-4 rounded-lg"
        >
          Post Internship
        </button>
      </div> 

      {/* Display Internships */}
       <div className="mt-8 bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-700">Your Internships</h2>
        {internships.length === 0 ? (
          <p className="text-gray-500 mt-2">No internships posted yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {internships.map((internship) => (
              <li key={internship.id} className="border p-3 rounded-lg shadow-sm">
                <strong className="text-lg">{internship.title}</strong>
                <p className="text-gray-600">{internship.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default EmployerDashboard