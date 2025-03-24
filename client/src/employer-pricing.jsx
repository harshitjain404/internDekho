import React , {useState} from "react";
import EmployerNavbar from "./Components/employernavbar";
import LoginModal from "./Components/LoginModal";


const Pricing = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    
  return (
    <>
    <EmployerNavbar setModalOpen={setModalOpen} />
    <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          <div
              style={{
                    height: "100%",
                    margin  : "10vh 0 ",
      }}    
              className="bg-blue-600 text-white py-16 px-4 text-center">
      <h2 className="text-5xl ">Now save BIG on your hiring budget</h2>
      <p className="text-6xl text-gray py-10">Post <span className="underline">unlimited</span> premium internships and jobs</p>

      <div className="flex flex-col md:flex-row justify-center gap-8 mt-10">
                  <div
                         style={{
                            height: "100%",
                            margin: "10vh 0 ",
                            textAlign: "initial",
                            alignContent: "center",
                            alignItems: "center",
                              
                       }} 
                      className="bg-white text-black p-6 rounded-lg shadow-lg w-80">
                      <span
                          style={{
                              float: "left",
                              
                          }}
                          className="bg-yellow-400 text-black px-3 py-1 text-sm  rounded">Popular</span>
                      <h3
                       style={{   
                        clear: "left",
                      fontSize: "1.5rem",
                        color: "gray",
                        marginBottom: "5vh",

      }}         className="text-xl  mt-2">1 Month Plan</h3>
                      <p
                            style={{    
                                fontSize: "2.5rem",
                                color: "black",
                                marginRight: "70%",
                          }}
                          className="text-3xl mt-2">₹8,999</p>
          <p 
           style={{
            fontSize: "1.5rem",
                              color: "gray",
                              marginTop: "1.5vh",
                              
        }}
                          className="text-gray-500 line-through">₹14,999</p>
          {/* <p className="bg-green-200 text-green-800 text-sm inline-block px-2 py-1 rounded">Save 20%+25%</p> */}
          {/* <p className="text-gray-700 text-sm mt-2">First time user discount</p> */}
                      <button
           style={{
                              width: "100%",
                                marginTop: "10%",
                          }}
                          className="bg-orange-500 text-white px-4 py-2 rounded mt-4">Buy now</button>
        </div>

                     
                  <div
                      style={{
                          height: "100%",
                          margin: "10vh 0",
                          textAlign: "initial",
                          alignContent: "center",
                          alignItems: "center",
                            
                     }} 
                      className="bg-white text-black p-6 rounded-lg shadow-lg w-80">
          <span
            style={{
                              opacity: "0",
                                float: "left",
               
            }}className="bg-yellow-400 px-3   py-1 text-sm  rounded">Popular</span>
                      <h3
                          style={{   
                              clear: "left",
                            fontSize: "1.5rem",
                              color: "gray",
                              marginBottom: "5vh",

            }}
                          className="text-xl  mt-2">1 Year Plan</h3>
                      <p
                          style={{    
                              fontSize: "2.5rem",
                              color: "black",
                              marginRight: "70%",
            }}
                          className="text-3xl mt-2">₹89,999</p>
                      <div
                          style={{
                              display: "flex",
                              marginTop: "1.5vh",
                      }}
                      >
                      <p
                          style={{
                              fontSize: "1.5rem",
                              color: "gray",
                          }}
                                
                          className="text-gray-500 line-through">₹1,79,999</p>
                          <p className="bg-green-200 text-green-800 text-sm inline-block px-2 py-1 rounded">Save 50%</p>
                          
                          </div>
          {/* <p className="bg-green-200 text-green-800 text-sm inline-block px-2 py-1 rounded">Save 20%+25%</p> */}
          {/* <p className="text-gray-700 text-sm mt-2">First time user discount</p> */}
                      <button
                          style={{
                              width: "100%",
                              marginTop: "10%",
                          }}
                          className="bg-orange-500 text-white px-4 py-2 rounded mt-4">Buy now</button>
        </div>
      </div>

      <div className="bg-white text-black p-8 rounded-lg shadow-lg mt-12 max-w-3xl mx-auto">
        <h3 className="text-2xl  text-center">Now enjoy premium benefits for all your internships and jobs</h3>
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">BENEFITS</th>
                <th className="p-3">FREE</th>
                <th className="p-3 bg-yellow-200">PREMIUM</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">World-class product with interview scheduler & tools</td>
                <td className="text-center">✔️</td>
                <td className="text-center bg-yellow-100">✔️</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Number of internship/job listings in a month</td>
                <td className="text-center">1</td>
                <td className="text-center bg-yellow-100">Unlimited</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Extra visibility for all listings</td>
                <td className="text-center">❌</td>
                <td className="text-center bg-yellow-100">✔️</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Smart database access for all internships and jobs</td>
                <td className="text-center">❌</td>
                <td className="text-center bg-yellow-100">✔️</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Unlock premium features like contact numbers, export to Excel</td>
                <td className="text-center">❌</td>
                <td className="text-center bg-yellow-100">✔️</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Dedicated Relationship Manager</td>
                <td className="text-center">❌</td>
                <td className="text-center bg-yellow-100">✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
          </div>
 </>
  );
};

export default Pricing;
