import React from "react";

const courses = [
  {
    title: "Full Stack Development Course",
    badge: "course with guaranteed job",
    duration: "4 months course",
    salary: "₹3-10 LPA",
    opportunities: "1.08 Lac+ opportunities",
    rating: "New",
    image: "https://training-uploads.internshala.com/homepage/media/specialization_section/card-images-desktop/full-stack-web-development-specialization-v3.png.webp?v=v2", // Replace with your image
  },
  {
    title: "Data Science Course",
    badge: "course with internship placement",
    duration: "6 months course",
    salary: "₹40,000 total stipend",
    opportunities: "45,500+ opportunities",
    rating: "4.5",
    image: "https://training-uploads.internshala.com/homepage/media/specialization_section/card-images-desktop/data-science-specialization-v3.png.webp?v=v2",
  },
  {
    title: "Human Resource Management Course",
    badge: "course with job placement",
    duration: "3 months course",
    salary: "₹3-10 LPA",
    opportunities: "2.91 Lac+ opportunities",
    rating: "4.3",
    image: "https://training-uploads.internshala.com/homepage/media/specialization_section/card-images-desktop/human-resource-management-specialization.png.webp?v=v2",
  },
  {
    title: "Digital Marketing Course",
    badge: "course with guaranteed job",
    duration: "5 months course",
    salary: "₹3-10 LPA",
    opportunities: "6.25 Lac+ opportunities",
    rating: "4.4",
    image: "https://training-uploads.internshala.com/homepage/media/specialization_section/card-images-desktop/digital-marketing-specialization-v2.png.webp?v=v2",
  },
];

const CoursesSection = () => {
  return (
      <div className="px-8 py-12 bg-blue-50"
      
      >
          <h2
      style={{ color: "#363636"}} 
                className="text-5xl font-bold text-center mb-8">Placement Guarantee Courses</h2>
      <p className="text-center mb-12 text-gray-600">
        {/* ✅ Guaranteed placement &nbsp; ✅ 100% refund if not hired &nbsp; ✅ Become job ready */}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <span className="text-sm bg-yellow-300 px-2 py-1 rounded-full font-semibold">
                {course.badge}
              </span>
              <h3 className="mt-4 text-lg font-bold">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{course.duration}</p>
              <p className="text-gray-600 text-sm mt-1">{course.salary}</p>
              <p className="text-gray-600 text-sm mt-1">{course.opportunities}</p>
              <div className="flex justify-between items-center mt-4">
                <a
                  href="https://trainings.internshala.com/full-stack-web-development-placement-guarantee-course/?utm_source=is_web_IS-home-midsection_web1"
                  target="_blank"
                            className="text-blue-500 font-semibold hover:underline text-sm"
                >
                  Know more →
                </a>
                <span className="text-white bg-green-500 text-xs px-2 py-1 rounded-full">
                  {course.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;
