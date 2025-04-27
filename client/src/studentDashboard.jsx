import React, { useState } from "react";
import { motion } from "framer-motion";
import StudentNavbar from "./Components/studentNavbar";
import LoginModal from "./Components/LoginModal";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./studentDashboard.css";

const savedInternships = [
  {
    title: "Frontend Developer Intern",
    company: "Google",
    location: "Remote",
    stipend: "₹20,000 /month",
    duration: "6 months",
  },
  {
    title: "Data Analyst Intern",
    company: "Amazon",
    location: "Bangalore",
    stipend: "₹15,000 /month",
    duration: "4 months",
  },
];

const student = {
  name: "Shrawani Dalvi",
  collegeName: "Vasantdadapatil Pratishthan College of Engineering & Visual Arts",
  location: "Mumbai, Maharashtra, India",
  skills: ["React", "Firebase", "Mobile App Development", "Engineering", "English"],
  experience: [
    {
      jobTitle: "Software Developer Intern",
      organization: "Prema Creations",
      duration: "Jan 2024 - May 2024",
    },
  ],
  education: [
    {
      college: "Vasantdadapatil Pratishthan College of Engineering & Visual Arts",
      degree: "Bachelor of Engineering - Computer Science",
      duration: "Nov 2021 - Apr 2025",
    },
  ],
  linkedin: "https://www.linkedin.com/in/shrawani-dalvi-175484319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github: "https://github.com/shrawni144",
  twitter: "https://x.com/shrawanid17?t=FrYuONSR-VCvU4uT2GUkIA&s=08",
  photoURL: "https://media.licdn.com/dms/image/v2/D5635AQFgDoTcqHMNdg/profile-framedphoto-shrink_200_200/B56ZZ4AclLGQAY-/0/1745770105533?e=1746385200&v=beta&t=Jz0osuhIj7jItKracLE0EYXJvDydKk8mBKmMywRUH88", // default fallback
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
  className="max-w-6xl mx-auto px-6 relative profile-card" // << Added 'relative profile-card'
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
      <StudentNavbar setModalOpen={setModalOpen} />
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div className="w-full min-h-screen bg-gray-100 pb-20">
        {/* Banner */}
        <div className="relative w-full h-60 bg-blue-600">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D16AQF6qmz_0JzUIw/profile-displaybackgroundimage-shrink_350_1400/B4DZW8T7tnHkAc-/0/1742621098116?e=1751500800&v=beta&t=rH51HLUpnGFivIjPDDsmQqlSm06wS4QelvoyRVkaW9k"
            alt="Banner"
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        {/* Profile Card */}
        <motion.div
          className="max-w-6xl mx-auto px-6 -mt-28"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <div
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={student.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

              <div
                style={{
              marginTop:"18%"
            }}    className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">{student.name}</h2>
              <p className="text-gray-600 mt-2">{student.collegeName}</p>
              <p className="text-gray-500">{student.location}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                {student.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-6 mt-4 justify-center md:justify-start text-blue-600 text-2xl">
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={student.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={student.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Saved Internships */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-bold mb-6">Saved Internships</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {savedInternships.map((internship, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-blue-700">{internship.title}</h3>
                <p className="text-gray-600 mt-2"><strong>Company:</strong> {internship.company}</p>
                <p className="text-gray-600"><strong>Location:</strong> {internship.location}</p>
                <p className="text-gray-600"><strong>Stipend:</strong> {internship.stipend}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {internship.duration}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Profile Details Section */}
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold mb-6">Profile Details</h2>

          <div className="space-y-8">
            {/* Experience */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">Experience</h3>
              {student.experience.length === 0 ? (
                <p className="text-gray-500">No experience added yet.</p>
              ) : (
                student.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-lg font-semibold">{exp.jobTitle}</p>
                    <p className="text-gray-600">{exp.organization}</p>
                    <p className="text-gray-500">{exp.duration}</p>
                  </div>
                ))
              )}
            </motion.div>

            {/* Education */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Education</h3>
              {student.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-semibold">{edu.college}</p>
                  <p className="text-gray-600">{edu.degree}</p>
                  <p className="text-gray-500">{edu.duration}</p>
                </div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        </div>
        </motion.div>
    </>
  );
};

export default StudentDashboard;
