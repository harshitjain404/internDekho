import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";



const StudentNavbar = ({ setModalOpen }) => {
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    alert("siggning out")
    const auth = getAuth();
    console.log("user signed out")
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("user");
      alert("Student Signed out successfully!");
    
      navigate("/");
    }).catch((error) => {
      console.error("Error signing out: ", error);
      alert("Failed to sign out. Try again.");
    });
    };
     

  return (
    <div className="flex justify-between items-center p-4 shadow-lg bg-white">
      <div className="flex flex-row sm:pl-8">
        <div onClick={() => navigate("/")}>
          <img src="logo.jpg" alt="Logo" className="h-8 sm:h-10 cursor-pointer" />
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-row gap-6 pr-8 items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer text-lg hover:font-bold">
          Home
        </div>
        <div onClick={() => navigate("/internships")} className="cursor-pointer text-lg hover:font-bold">
          Internships
        </div>
        {/* <div onClick={() => navigate("/saved-internships")} className="cursor-pointer text-lg hover:font-bold">
          Saved Internships
        </div>
        <div onClick={() => navigate("/student-dashboard")} className="cursor-pointer text-lg hover:font-bold">
          Dashboard
        </div> */}

        {!user ? (
          <button onClick={() => setModalOpen(true)} className="cursor-pointer text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1">
            Login
          </button>
        ) : (
          <button onClick={handleSignout} className="cursor-pointer text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1">
            Sign Out
          </button>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden cursor-pointer" onClick={() => setHamburger(true)}>
        <MenuIcon className="text-black" style={{ height: "32px", width: "32px" }} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform ${hamburger ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <CloseIcon onClick={() => setHamburger(false)} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-6 items-start pl-6 mt-8">
          <div onClick={() => { navigate("/"); setHamburger(false); }} className="cursor-pointer text-lg hover:font-bold">
            Home
          </div>
          <div onClick={() => { navigate("/internships"); setHamburger(false); }} className="cursor-pointer text-lg hover:font-bold">
            Internships
          </div>
          {/* <div onClick={() => { navigate("/saved-internships"); setHamburger(false); }} className="cursor-pointer text-lg hover:font-bold">
            Saved Internships
          </div> */}
          {/* <div onClick={() => { navigate("/student-dashboard"); setHamburger(false); }} className="cursor-pointer text-lg hover:font-bold">
            Dashboard
          </div> */}
          {!user ? (
            <button
              onClick={() => { setModalOpen(true); setHamburger(false); }}
              className="text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1 mt-2"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => { handleSignout(); setHamburger(false); }}
              className="text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1 mt-2"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar;
