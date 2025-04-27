import React from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

const StudentProfileCard = ({ student, savedInternships }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg mb-10">

      {/* Banner Thumbnail */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      {/* Profile Image */}
      <div className="flex flex-col items-center -mt-16">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          {student.photoURL ? (
            <img src={student.photoURL} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <img src="https://via.placeholder.com/150" alt="Default Profile" className="object-cover w-full h-full" />
          )}
        </div>

        {/* Name */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{student.name}</h2>

        {/* College */}
        <p className="text-gray-600 text-lg">{student.collegeName}</p>

        {/* Location */}
        <p className="text-gray-500 text-md">{student.location}</p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {student.skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6">
          {student.profileLink && (
            <a
              href={student.profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-3xl"
            >
              <FaLinkedin />
            </a>
          )}

          {student.githubLink && (
            <a
              href={student.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black text-3xl"
            >
              <FaGithub />
            </a>
          )}

          {student.websiteLink && (
            <a
              href={student.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 text-3xl"
            >
              <FaGlobe />
            </a>
          )}
        </div>
      </div>

      {/* Saved Internships Section */}
      <div className="mt-12 px-6 pb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Internships</h2>

        {savedInternships.length === 0 ? (
          <p className="text-gray-500">You have not saved any internships yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedInternships.map((internship, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-700">{internship.title}</h3>
                <p className="text-gray-600"><strong>Company:</strong> {internship.company}</p>
                <p className="text-gray-600"><strong>Location:</strong> {internship.location}</p>
                <p className="text-gray-600"><strong>Stipend:</strong> {internship.stipend}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {internship.duration}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfileCard;


