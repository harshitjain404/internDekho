// import "./index.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import LoginModal from "./LoginModal";
import CoursesSection from "./courseSections";
import TrustedCompanies from "./trsustedCompanies";
import ReviewsCarousel from "./reviewCaurosel";


const Home = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    
    return (
        <>
           <Navbar setModalOpen={setModalOpen} />
            <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                     
        <div className="flex justify-center items-center" style={{ height: "78vh" }}>
            
        <div className='flex flex-col md:flex-row justify-center items-center md:px-20 md:pt-10 gap-7 ' id="header">
            <div className='basis-1/2 flex justify-center items-center order-2 md:order-1'>
                        <div className=' flex justify-center items-center flex-col w-72 text-3xl md:text-4xl font-strong'
                            style={{ color: "#363636", }}>
                    We're happy to see you here and can't wait to help you explore the internships.
                </div> 
            </div>
            <div className='basis-1/2 header-image order-1 md:order-2'>
                <img src="work.svg " className='img-fluid animated h-56 md:h-428' alt=""  />
            </div>
        </div>
                  
            </div>
            <CoursesSection /> 
            <hr />
            <TrustedCompanies />
            <hr />
            <ReviewsCarousel/>
            
    </>
  )
}

export default Home