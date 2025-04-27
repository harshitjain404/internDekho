

import React,{useState , useEffect} from "react";
import EmployerNavbar from "./Components/employernavbar";
  import LoginModal from "./Components/LoginModal";
import FetchInternship from "./fetchInternships";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const EmployerDashboard = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  
  const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  
   useEffect(() => {
     const auth = getAuth();
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       setUser(user);
      //  console.log(user.email)  
       setAuthChecked(true);
     });
     return () => unsubscribe();
   }, []);
  
  
    useEffect(() => {
      const fetchInternships = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "internships"));
          const internshipData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setInternships(internshipData);
        } catch (error) {
          console.error("Error fetching internships: ", error);
        }
        setLoading(false);
      };
  
      fetchInternships();
    }, []);
  
    if (loading) {
      return <p className="text-center text-lg font-semibold">Loading internships...</p>;
    }

  
  if (!user) {
 
      return <div>
        <EmployerNavbar setModalOpen={setModalOpen} />
        <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
  
        <div style={{
          textAlign: "center",
          height: "80vh",
          color: "red",
          margin: "auto",
          alignItems: "center",
          
        }}>You must be logged in to view Dashboard.
           <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          >
            Employer Login
          </button>

        </div>;
        </div>
    }
  
    return (
      <div
        style={{
          height: "100vh",
          margin: "auto",
        }}
      >
         <EmployerNavbar setModalOpen={setModalOpen} />
         <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    <div className="bg-gray-50  p-6">
      {/* Top Banner */}
      <div
                    style={{
                        width: "80%",
                        margin: "auto",
                        fontSize: "30px",
                    }}
                    className="bg-blue-500 text-white p-4 rounded-lg flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            Free Job Post Added to your Account!
          </h2>
          <p className="text-sm">Don't miss out! 30Mn+ job-ready candidates await.</p>
        </div>
            <button
              style={{
                backgroundColor: "#fb923c ",
        }}
              className=" font-semibold px-4 py-2 rounded-lg">
          Post InterShip for Free
        </button>
      </div>

      {/* Info Box */}
                <div
        style={{
            width: "80%",
            margin: "auto",
            marginTop: "20px",
            padding: "20px",
                        
            
                    }}
                    className="bg-white p-4 mt-4 rounded-lg ">
        <p className="text-md">
          Post unlimited listings and get access to features like boosted visibility, 
          applicant contact numbers, etc., with <b>InternDekho Premium</b>. 
              <a
                style={{
                  color: "#fb923c",
                  fontWeight: "bold",
                }}
                href="/plans-pricing" className="">
            View Premium Plans now
          </a>
        </p>
      </div>
          <h2 style={{ 
            marginTop: "20px",
            marginBottom: "20px",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#fb923c ",
          }}>
              Your Posted Internships
            </h2>

      {/* Tab Navigation */}
                <div
                   
                   style={{
                    width: "80%",
                        margin: "auto",
                        fontSize: "2rem",
                        marginTop: "20px",
                        textAlign: "center",
                    }}
                    className="flex mt-6 border-b">
        <button className="pb-2 px-4 font-medium border-b-2 border-blue-500 text-blue-500">
          Internships
        </button>
        <button className="pb-2 px-4 font-medium text-gray-500">Jobs</button>
      </div>

      {/* Job Listing Table */}
          
            </div>
<FetchInternship/>
      </div> 
  );
};

export default EmployerDashboard;
