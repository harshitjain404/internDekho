

// import React, { useState, useEffect } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ setModalOpen }) => {
//   let navigate = useNavigate();
//   const [hamburger, setHamburger] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
    
//   console.log(storedUser )
//     if (storedUser) {
//       setUser(storedUser);
//       setUserType(storedUser.userType); // Get userType from storage
//     }
//   }, []);


//   const logOutUser = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setUserType(null);
//     alert("Logged Out");
//     navigate("/");
//   };

//   return (
//     <div className="flex justify-between items-center p-4 shadow-lg bg-white">
//       <div className="flex flex-row sm:pl-8">
//         <div onClick={() => navigate("/")}>
//           <img src="logo.jpg" alt="Logo" className="h-8 sm:h-10" />
//         </div>
//       </div>

//       <div className="hidden md:flex flex-row gap-6 pr-8 items-center">
//         <div onClick={() => navigate("/internships")} className="cursor-pointer text-lg hover:font-bold">
//           Internships
//         </div>
//         <div onClick={() => navigate("/employer")} className="cursor-pointer text-lg hover:font-bold">
//           Employer
//         </div>

//         {/* Employer-Specific Links */}
//         {userType === "employer" && (
//           <>
//             <div onClick={() => navigate("/plans-pricing")} className="cursor-pointer text-lg hover:font-bold">
//               Plans & Pricing
//             </div>
//             <div onClick={() => navigate("/employer-dashboard")} className="cursor-pointer text-lg hover:font-bold">
//               Dashboard
//             </div>
//             <div onClick={() => navigate("/post-internship")} className="cursor-pointer text-lg hover:font-bold">
//               Post Internship
//             </div>
//           </>
//         )}

//         {!user ? (
//           <button onClick={() => setModalOpen(true)} className="cursor-pointer text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1">
//             Login
//           </button>
//         ) : (
//           <button onClick={logOutUser} className="cursor-pointer text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1">
//             Sign Out
//           </button>
//         )}
//       </div>

//       <div className="md:hidden cursor-pointer" onClick={() => setHamburger(true)}>
//         <MenuIcon className="text-black" style={{ height: "32px", width: "32px" }} />
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setModalOpen }) => {
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  // 🔄 Load user on component mount + when localStorage changes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUserType(storedUser.userType); // ✅ Ensure userType is set correctly
    }
  }, []); 

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserType(null);
    alert("Logged Out");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-lg bg-white">
      <div className="flex flex-row sm:pl-8">
        <div onClick={() => navigate("/")}>
          <img src="logo.jpg" alt="Logo" className="h-8 sm:h-10" />
        </div>
      </div>

      <div className="hidden md:flex flex-row gap-6 pr-8 items-center">
        <div onClick={() => navigate("/internships")} className="cursor-pointer text-lg hover:font-bold">
          Internships
        </div>
        <div onClick={() => navigate("/employer")} className="cursor-pointer text-lg hover:font-bold">
          Employer
        </div>

        {/* 🎯 Employer Navbar Links */}
        {userType === "employer" && (
          <>
            <div onClick={() => navigate("/plans-pricing")} className="cursor-pointer text-lg hover:font-bold">
              Plans & Pricing
            </div>
            <div onClick={() => navigate("/employer-dashboard")} className="cursor-pointer text-lg hover:font-bold">
              Dashboard
            </div>
            <div onClick={() => navigate("/post-internship")} className="cursor-pointer text-lg hover:font-bold">
              Post Internship
            </div>
          </>
        )}

        {!user ? (
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1">
            Login
          </button>
        ) : (
          <button onClick={logOutUser} className="cursor-pointer text-lg hover:bg-orange-400 bg-navOrange rounded-md px-4 py-1">
            Sign Out
          </button>
        )}
      </div>

      <div className="md:hidden cursor-pointer" onClick={() => setHamburger(true)}>
        <MenuIcon className="text-black" style={{ height: "32px", width: "32px" }} />
      </div>
    </div>
  );
};

export default Navbar;
