import React, { useState, useEffect } from "react";
import InternshipCard from "../Cards/InternshipCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import axios from "axios";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import {app} from "../utils/firebase";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import LoginModal from "./LoginModal";
import Navbar from "./Navbar";


// import data from "./browseAll.json";
const SideNav = () => {


  const [isModalOpen, setModalOpen] = useState(false);
  
  const data = [
    {
      "site": "Internshala",
      "title": "GPT Development",
      "companyName": "Medius Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/gpt-development-internship-in-mumbai-at-medius-technologies-private-limited1679142519",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Softgenics India Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-softgenics-india-private-limited1678716588",
      "location": "Work From Home",
      "stipend": "6,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "DevOps Engineer",
      "companyName": "Power Code Technology Pvt Ltd",
      "location": "Remote in Pune, Maharashtra",
      "stipend": "From ₹60,000 a month",
      "link": "https://in.indeed.com/company/Power-Code-Technology-Pvt-Ltd/jobs/Devop-Engineer-38a80ddaaf61bc75?fccid=8c2f9a2bf3d81504&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Have the technical skill to review, verify, and validate the software code developed in the project.\n Troubleshooting techniques and fixing the code bugs.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "CodeIgniter, Laravel & Vue.js Development",
      "companyName": "QBH Solution Private Limited",
      "link": "https://internshala.com/internship/detail/codeigniter-laravel-vuejs-development-work-from-home-job-internship-at-qbh-solution-private-limited1678870997",
      "location": "Work From Home",
      "stipend": "10,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer Intern",
      "companyName": "Viral Inbound",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=c7450fd606bb36ee&fccid=4e384931a1a53596&vjs=3",
      "tags": "",
      "description": "  Developing back-end website applications.\n Strong analytical and problem-solving skills.\n Ensuring the multi-device responsiveness of applications.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Intern",
      "companyName": "Agnito Technologies Pvt Ltd",
      "location": "Bhopal, Madhya Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/company/Agnito-Technologies-Pvt-Ltd/jobs/Software-Development-Intern-c8e4cbab8242245d?fccid=4cd5b5345f8e7960&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Graduation-B.E./B.Tech/MCA/BCA/M.Tech.\n 1st, 2nd, 3rd, 4th Year students can come.\n Job Types: Full-time, Internship.\n Total work: 1 year (Preferred).\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer - Nodejs/Reactjs",
      "companyName": "So-Creative",
      "location": "Sahibzada Ajit Singh Nagar, Ludhiana, Punjab",
      "stipend": "₹60,000 - ₹80,000 a month",
      "link": "https://in.indeed.com/company/So--Creative/jobs/Full-Stack-Developer-dbc6135339711526?fccid=b99eb70d001e0c58&vjs=3",
      "tags": "Easily apply",
      "description": "  Total work: 3 years (Preferred).\n Excellence in at least one framework like strongloop loopback, express.js, sails.js.\n (Optional) or Reactjs or Nuxtjs.\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Internshala",
      "title": "React Native Design",
      "companyName": "Eupheus Learning",
      "link": "https://internshala.com/internship/detail/react-native-design-internship-in-delhi-at-eupheus-learning1679656510",
      "location": "Delhi",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "The Depository Trust &amp;amp; Clearing Corporation (DTCC)",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-the-depository-trust-amp-amp-clearing-corporation-dtcc-chennai-5-to-6-years-141122500725",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": "The Information Technology Intern will participate in the collection and analysis of pr..."
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer",
      "companyName": "Zoof Software Solutions",
      "location": "Navi Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=c68f5cb478463872&fccid=ac62b4690c885b04&vjs=3",
      "tags": "",
      "description": "  Workspace which nurtures talent and thinking.\n Internships which cherish knowledge and experience.\n And take pledge to provide employment as more as possible.\n",
      "postedDate": "PostedPosted 19 days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Duck Creek",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-duck-creek-technologies-remote-0-to-2-years-300123502178",
      "location": "remote",
      "stipend": "Not disclosed",
      "description": ". ABOUT THE SUMMER INTERNSHIP: . . . . . . . Duck Creeks Summer Internship program is f..."
    },
    {
      "site": "LinkedIN",
      "title": "Sr Software Engineer",
      "companyName": "Zuora",
      "location": "Chennai, Tamil Nadu, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  OUR VISION: THE WORLD. SUBSCRIBED.\nCustomers have changed. They’re looking for new ways to engage with businesses. Consumers today have a new set of expectations. They want outcomes, not ownership. Customization, not generalization. Constant improvement, not planned obsolescence.\nIn the old world (let’s call it the Product Economy) it was all about things. Acquiring new customers, shipping commodities, billing for one-time transactions. But in today’s new era, it’s all about relationships. More and more customers are becoming subscribers because subscription experiences built around services meet consumers’ needs better than the static offerings or a single product.\nOur vision is “The World Subscribed” where one day every company will be a part of the Subscription Economy® (a phrase coined by our CEO, Tien Tzuo, and author of the best-selling book Subscribed).\nAs consumers wave goodbye to ownership, join us as we help companies win on their journey to usership!\nTHE TEAM\nModern finance leaders are looking for new ways to strategically advise their business and ultimately scale revenue growth. But as they adopt increasingly complex pricing models incorporating a mix of subscriptions, one-time, and usage-based offers, their financial close process has become more resource-intensive, prone to human error, and can span weeks.\nWith Zuora Revenue, businesses can not only automatically recognize, reconcile, and analyze revenue in real-time, but they can accurately close the books as early as Day 0, while easily forecasting their revenue targets.\nYou read more about it at https://www.zuora.com/products/revenue/\nTHE OPPORTUNITY (AKA: Why you want this role over any other out there) \nWe are looking for a Sr Engineer who is self-motivated to design, develop, test, and operate cutting-edge, large scalable, and enterprise SaaS applications.\nOur Tech Stack: Java, Spring, Rest API, Microservices, Kafka, AWS, Kubernetes, Terraform, Apache Pinot, AngularJS, Oracle, PL/SQL, Jenkins\nWhat You’ll Achieve\nEnable scrum teams to be successful by designing & building DevOps tools and CI/CD pipelines to meet the delivery and quality commitmentsPlan, design and implement the right tooling for the operation of large scale enterprise SaaS applicationsHelp the team achieve the bold goal of every commit reaching production post quality gates.Help with Zuora’s transition to micro-service and cloud-based architecture.Raise the bar on engineering practices and code quality.\nWhat You’ll Need To Be Successful\nBTech/BE/BS/MS/PHD in Computer Engineering discipline or relevant degree. 10+ years of experience specializing in Dev/ops for enterprise SaaS products Self-starter who is able to make a large impact with minimal supervision.Proficiency with AWS Services including Lambda, EC2, ECS, EMR, S3, Cloudwatch.Strong in scripting languages such as Python, Groovy etcHands-on experience with build engineering tools such as Gitlab, Jenkins, docker, chef, or similar (Ability to learn new tools)Hands-on experience with modern container orchestration services such as K8’s/ ECS etc.Knowledge of Oracle, and PL/SQL will be an advantageExcellent Problem Solving and communication skills.\nWhat are the benefits of working at Zuora?\nEmployee Stock Purchase PlanMedical Coverage and Parental Leave Carrer cash to keep yourself updatedRefresh/wellness holidays along with standard time offOur campus includes a game area along with a well-stocked pantry\nAbout Zuora & Our “zeo” Culture\nZuora (NYSE: ZUO) Zuora provides the leading cloud-based subscription management platform that functions as a system of record for subscription businesses across all industries. Powering the Subscription Economy®, the Zuora platform was architected specifically for dynamic, recurring subscription business models and acts as an intelligent subscription management hub that automates and orchestrates the entire subscription order-to-revenue process seamlessly across billing and revenue recognition. Zuora serves more than 1,000 companies around the world, including Box, Ford, Penske Media Corporation, Schneider Electric, Siemens, Xplornet, and Zoom.\nAt Zuora, we have one CEO but every employee is empowered and supported to be the ‘ZEO’ of their own career experience. By embedding inclusion and belonging into our processes, policies and culture, we are building a workplace where our 1,200+ ZEOs across North America, Europe, and APAC can bring all the elements of who they are into their work. In addition to an industry-leading six-month, 100% paid parental leave for all our ZEOs, we also offer programs to support your mental health and give back to our communities along with “career cash” and plenty of learning and development opportunities.\nTo learn more visit www.zuora.com\nZuora is proud to be an Equal Employment Opportunity Employer.\nWe believe the Subscription Economy has the power to make the world a better place by broadening access, increasing inclusion, and bolstering sustainability. At Zuora, we’re creating a culture that every ZEO wants to subscribe to. We achieve our vision and mission for diversity and inclusion through our framework ONE ZUORA: Inspiring Innovation through Inclusion.\nZuora does not discriminate on the basis of, and considers individuals seeking employment with Zuora without regards to, race, religion, color, national origin, sex (including pregnancy, childbirth, reproductive health decisions, or related medical conditions), sexual orientation, gender identity, gender expression, age, status as a protected veteran, status as an individual with a disability, genetic information, political views or activity, or other applicable legally protected characteristics.\nZuora is proud to be an Equal Opportunity Employer committed to creating an inclusive environment for all. We encourage candidates from all backgrounds to apply. Applicants in need of special assistance or accommodation during the interview process or in accessing our website may contact us by sending an email to assistance(at)zuora.com.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer II",
      "companyName": "HARMAN International",
      "location": "Bengaluru, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  Will be responsible to implementing the platform software for frameworkWill have to contribute to design and ArchitectureWill be responsible to do customer requirement analysisWill have to help ram up new recruits on technical frontWill be responsible to independently own and execute core framework modulesShould be enthusiastic to learn new technologies also. Should have an innovative mindset towards problems. \nResponsibilities:\nContribute to architecture, design and reviews. Independently execute module ownership. Design, Develop and maintain framework solutions. Develop & Integrate System software with middleware and applications. \nDevelop high-quality and production ready software\nRequirements: \nFollowing experience and knowledge is needed:\nB-Tech/BE, 3-6 years experience in embedded software. 3+ years of experience in Automotive and IVI systems. Expertise in C++98,C++1,C++141 fluent in concepts of Design Patterns. Expertise in concepts like OOPS, MultithreadingExpertise in Linux system programming, Android FrameworkGood Knowledge of IPC and RPC mechanisms available in LinuxExposure to code generators would be an added advantageShould have excellent debugging skills using GDB etcShould have exposure to UML\\SysML, should be able to understand UML\\SysML diagrams and contribute to UML\\SysML based designs. Experience with Linux is a Must. Exposure to QNX, Integrity and Android will be added advantage. Exposure to internet protocols like TCP, UDPExperience with Camera/display will be good to have. Should be able to drive the design and architecture discussionsExcellent communication and negotiation skillsShould be able to work independently, contribute to requirements reviews, analysis of customer change requests\nShould have fair exposure into analyzing and debugging existing software or designing and building new ones.\nDesired Characteristics:\nKey competencies\nCritical thinking and Collaborative problem-solving skillsPlanning and organizingGood communication (verbal and written) and interpersonal skillsAdaptabilityProven coding skills",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "Gaming Animator",
      "companyName": "PlanetMeta.Live",
      "link": "https://internshala.com/internship/detail/gaming-animator-work-from-home-job-internship-at-planetmetalive1679595006",
      "location": "Work From Home",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "ACR & Company Charted Accountants",
      "location": "Calicut, Kerala",
      "stipend": "₹15,000 - ₹50,000 a month",
      "link": "https://in.indeed.com/company/ACR-&-Company-Charted-Accountants/jobs/Software-Developer-ed8327ce5b0c5e55?fccid=8e42394ebbc9f214&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Business Consultant Start-Up is looking for Experience/Fresher Software Developers for customisation of ERP Software.\n Part-time hours: 25 per week.\n",
      "postedDate": "PostedPosted 11 days ago"
    },
    {
      "site": "Internshala",
      "title": "Virtual Reality Unity 3D Development",
      "companyName": "Gesture Research",
      "link": "https://internshala.com/internship/detail/virtual-reality-unity-3d-development-internship-in-multiple-locations-at-gesture-research1678443435",
      "location": "Chandigarh,Delhi,Gurgaon",
      "stipend": "7,500 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Embedded Software And Hardware Engineering",
      "companyName": "Neuranics Lab Private Limited",
      "link": "https://internshala.com/internship/detail/embedded-software-and-hardware-engineering-internship-in-delhi-at-neuranics-lab-private-limited1679302519",
      "location": "Delhi",
      "stipend": "25,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Sr. Software Engineer - Consul",
      "companyName": "Hashicorp",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=038344a4517f16d2&fccid=044076f542c2a482&vjs=3",
      "tags": "",
      "description": "  Empathy for the people operating, learning, teaching and supporting software you write, and consider their experience when making design decisions and…\n",
      "postedDate": "PostedPosted 15 days ago"
    },
    {
      "site": "Naukri",
      "title": "Hiring For Associate software Engineer",
      "companyName": "GlobalLogic",
      "link": "https://www.naukri.com/job-listings-hiring-for-associate-software-engineer-globallogic-gurgaon-gurugram-0-to-1-years-070323004535",
      "location": "Gurgaon/Gurugram",
      "stipend": "1-4 Lacs PA",
      "description": "Experience: 0 to 1 Years Good knowledge of Regular Expressions. . . . Strong OOPS Conce..."
    },
    {
      "site": "Internshala",
      "title": "ASP.NET Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/aspnet-development-internship-in-delhi-at-isourse1678783646",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Gape Labs",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-gape-labs1678879526",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Finsoftai",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-finsoftai-pune-0-to-0-years-230323501189",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Bachelor s / Master s Degree in Computer Science, Information Technology or Electronics..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Truckx",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-truckx-inc-pune-0-to-2-years-230721500309",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": ". As a software engineer intern in backend team, you will be building backend services ..."
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Piety Innovation Labs Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-piety-innovation-labs-private-limited1678708504",
      "location": "Work From Home",
      "stipend": "3,000 lump sum",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-part-time-job-internship-at-mumbai-in-idz-digital-private-limited1679393933",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "IoT Software Engineer Intern",
      "companyName": "Wozart Technologies",
      "location": "Hyderabad, Telangana",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=7bd5efbdb84f17a8&fccid=badf5c5b73bc6f1c&vjs=3",
      "tags": "",
      "description": "At Wozart, we are on a mission to enhance and simplify everyday human life while protecting the environment. We believe simplification of everyday human life…",
      "postedDate": "PostedPosted 30 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern",
      "companyName": "MethodHub Software Pvt. Ltd.",
      "location": "Sahibzada Ajit Singh Nagar, Ludhiana, Punjab",
      "stipend": "₹8,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/MethodHub-Software-Pvt.-Ltd./jobs/Software-Engineer-Intern-eb0b7019009a8c9f?fccid=95408dc6d5b27532&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Documenting and testing new software applications.\n Researching, investigating and fixing a wide range of technical issues.\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Averoft",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-bhopal-at-averoft1678701397",
      "location": "Bhopal",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "BoredPages Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-boredpages-private-limited1678658959",
      "location": "Work From Home",
      "stipend": "10,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Engineer",
      "companyName": "CANGRA Talents",
      "location": "Remote in Lucknow, Uttar Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=05e83f1cf21bc1d2&fccid=a0bf67ac44d86ed7&vjs=3",
      "tags": "",
      "description": "  Calling candidates for interview schedule.\n Interacting with Clients for JDs and CVs.\n Very good verbal and writing communication skills.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer - Intern (React Js Developer)",
      "companyName": "Castus Info",
      "location": "Hyderabad, Telangana",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=3b939d6559c76147&fccid=ca3802d16d16daad&vjs=3",
      "tags": "Easily apply",
      "description": "  Strong hands-on experience with source code management systems like TFS.\n Confident in using UI/UX designs or wireframes to create the respective code and the…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Paarsh Infotech",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-nashik-at-paarsh-infotech1678903050",
      "location": "Nashik",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-mumbai-at-idz-digital-private-limited1679389105",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Internship - Software Engineering Intern",
      "companyName": "The Hiring Box",
      "link": "https://www.naukri.com/job-listings-internship-software-engineering-intern-the-hiring-box-bangalore-bengaluru-0-to-1-years-191222501725",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "You need to know React, Node & Fundamentals of Javascript very well to apply for this p..."
    },
    {
      "site": "Internshala",
      "title": "React + .NET Development",
      "companyName": "Eonian Software Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/react-net-development-internship-in-ahmedabad-at-eonian-software-solutions-private-limited1679404081",
      "location": "Ahmedabad",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Omangom Infosystems",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-omangom-infosystems-delhi-ncr-0-to-0-years-140323006160",
      "location": "Delhi / NCR",
      "stipend": "1.25-2.5 Lacs PA",
      "description": "Basic Requirements :-Good Programming and Coding AbilityPositive AttitudeEagerness to L..."
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "GITS India Solutions P Ltd",
      "location": "Delhi, Delhi",
      "stipend": "Up to ₹15,000 a month",
      "link": "https://in.indeed.com/company/GITS-India-Solutions-P-Ltd/jobs/Software-Developer-Intern-108e4897226fd5b2?fccid=aad0133d74d75981&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Write “clean”, well designed code.\n Troubleshoot, test and maintain the core product software and databases to ensure strong optimization and functionality.\n",
      "postedDate": "PostedPosted 23 days ago"
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Jardine Lloyd Thompson",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-jardine-lloyd-thompson-india-pvt-ltd-mumbai-0-to-2-years-220323500534",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "A Trainee Software Engineer will be expected to learn the basic principles of software ..."
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Gauge.ro (Lalita Ventures)",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-gaugero-lalita-ventures1678891078",
      "location": "Work From Home",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Content Creation (Advanced Java)",
      "companyName": "Learning Curve Technology",
      "link": "https://internshala.com/internship/detail/content-creation-advanced-java-work-from-home-job-internship-at-learning-curve-technology1679633701",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "DCNPL Private Limited",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-indore-at-dcnpl-private-limited1679293273",
      "location": "Indore",
      "stipend": "2,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Full Stack Development",
      "companyName": "Integrin Enterprise Solutions",
      "link": "https://internshala.com/internship/detail/java-full-stack-development-internship-in-multiple-locations-at-integrin-enterprise-solutions1679058104",
      "location": "Coimbatore,Coimbatore North,Coimbatore South",
      "stipend": "5,500-7,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Junior Python Developer",
      "companyName": "AltissAdvance Tech Private Limited",
      "location": "Mumbai, Maharashtra",
      "stipend": "From ₹15,000 a month",
      "link": "https://in.indeed.com/company/AltissAdvance-Tech-Private-Limited/jobs/Junior-Python-Developer-f3c54b8f7d565641?fccid=ace5c220416a3c00&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Looking for a candidate, with at least 6 months of experience working on Python & Django projects, who has a passion for innovation, curiosity and obsession for…\n",
      "postedDate": "PostedPosted 25 days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Manual Test Engineer",
      "companyName": "cure.fit (cult.fit)",
      "location": "Bengaluru, Karnataka, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Founded in 2016 by Mukesh Bansal and Ankit Nagori , Cure.fit is a mobile app that takes a holistic approach towards health and fitness by bringing together all aspects of a healthy lifestyle on a single platform. Cure.fit offers both online and offline experiences across fitness, nutrition and mental well-being through its 4 products, i.e. Cult.fit , Eat.fit , Mind.fit & Care.fit with the aim to make fitness fun and easy\n\nAs a Quality member, you will test the applications developed by custom development. You will be involved in end-to-end processes and metrics for software testing within the organization . You will collaborate with project managers and software developers to establish reporting metrics, test scenarios, and efficiencies through manual testing and streamlining QA techniques to achieve quality objectives.\n\nThis Role Demands Someone Who Has\nAbility to work effectively in a fast-paced and changing business environment.Flexibility, adaptability, and work in minimal supervision if required are must to have to be successful in this role.\nSkills & Experience\nWell versed with testing methodologies\nMust-Have Skills\nHaving good knowledge on iOS/Android based apps testing.Highly proficient in manual testing (Different types of testing: Regression, Sanity, Smoke & Functionality related)Good at writing manual test cases with all possible scenarios.Knowledge of defect reporting & bug tracking using JiraGood in debugging skillsKnowledge of software development lifecycleGood communication skills\nGood To Have Skills\nDecent problem solving skills and ability to write code.API testingWebsite testingPrevious experience of testing e-commerce applicationsExperience working with Agile methodologiesAbility to find, file, and manage bugs, aggressively driving qualityExperienced in testing larger scale projects/ quick changes from planning to sign offMust be extremely responsive, able to work under pressure in crisis with a strong sense of urgencyAbility to independently create test data as per the requirements\nEducation And Experience\nRequires Bachelors in Engineering Degree or equivalent2-4 years minimum professional experience in testing\nKey Responsibilities\nAnalyzing the requirement from a testing perspectiveCreating test plans and writing test scriptsClosely working with the scrum master and product owner to identify the risk areasManaging the defects logged and tracking them till they get closedPerforming RCA over the defects loggedIn-depth regression testing which will cover all the components\nAt Cure.fit , our mission is to “make health easy”. Through our products and services, we want to enable people to significantly improve their overall health, reduce the risk of lifestyle diseases and enable a long, disease free life. We are deeply passionate about health, fitness, and the general well-being and are eager to leverage the power of technology to help people live healthier, happier lives.\n\nIn pursuit of this objective, we are always looking for excellent team members to fulfill the vision of building these incredible and innovative products.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-gurgaon-at-aaptatt1678883551",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - CBTC - Railway Infrastructure",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-software-engineer-cbtc-railway-infrastructure-siemens-limited-pune-0-to-8-years-300621501758",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Knowledge of radio principle for CBTC. . You have experience in reading and understandi..."
    },
    {
      "site": "Internshala",
      "title": "Robotics Development",
      "companyName": "Peepul Agri Ventures LLP",
      "link": "https://internshala.com/internship/detail/robotics-development-internship-in-hyderabad-at-peepul-agri-ventures-llp1679376784",
      "location": "Hyderabad",
      "stipend": "15,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Robotics",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/robotics-work-from-home-job-internship-at-attitude-matterz1678960696",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Techvolt Software Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-multiple-locations-at-techvolt-software-private-limited1679574156",
      "location": "Chennai,Coimbatore,Erode,Karur,Tirunelveli,Virudhunagar,Pollachi,Namakkal,Salem,Trichey,Viluppuram",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Intern or Trainee - Software Developer",
      "companyName": "Jivrus Technologies",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ceb620551a004982&fccid=a08963bedc976cc0&vjs=3",
      "tags": "",
      "description": "  Troubleshoot, debug, fix and enhance existing software products.\n Program well-designed, maintainable, testable and efficient code.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Test Engineer",
      "companyName": "Logic Factor India",
      "location": "Hybrid remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=573e0c4b56d79451&fccid=1ee74bb5abdea1db&vjs=3",
      "tags": "",
      "description": "  Between 2 to 4 years of professional software testing experience having good knowledge in manual testing, automation testing, web-windows-mobile testing and…\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Engineering (React JS)",
      "companyName": "InGen Dynamics Inc. (Part Of AH Dynamics And Robotics Private Limited)",
      "link": "https://internshala.com/internship/detail/software-engineering-react-js-internship-in-kozhikode-bangalore-at-ingen-dynamics-inc-part-of-ah-dynamics-and-robotics-private-limited1678691584",
      "location": "Kozhikode,Bangalore",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Associate IV, Software Engineering, SQL Reporting Developer",
      "companyName": "Xerox",
      "location": "Remote in Kochi, Kerala",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=782897f69bb0bbef&fccid=fd6a32f24dd4ee0d&vjs=3",
      "tags": "",
      "description": "  Responsible for those functions, activities, and skills required for analysis, design, coding, integration, test & maintenance of software modules, subsystems…\n",
      "postedDate": "PostedPosted 29 days ago"
    },
    {
      "site": "Internshala",
      "title": "AWS DevOps Engineering",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/aws-devops-engineering-internship-in-gurgaon-at-aaptatt1679459643",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern - Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-noida-1-to-2-years-220223501010",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Fresh Engineering graduate in electronics or Comp Science . Very good digital / analog ..."
    },
    {
      "site": "Internshala",
      "title": "Game Design",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/game-design-internship-in-mumbai-at-idz-digital-private-limited1679393679",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer (MERN Stack) internship",
      "companyName": "Redgates IT Solutions",
      "location": "Remote",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/RedGates-IT-Solutions/jobs/Full-Stack-Developer-Internship-6eb16fcb44062f67?fccid=aa3d102219ed3c56&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  The role involves engagement with the business on advising the Complete technical side of product conceptualization, development, testing, commissioning, and…\n",
      "postedDate": "EmployerActive 7 days ago"
    },
    {
      "site": "Internshala",
      "title": "CodeIgniter & Laravel Development",
      "companyName": "Bridcodes Global Private Limited",
      "link": "https://internshala.com/internship/detail/codeigniter-laravel-development-work-from-home-job-internship-at-bridcodes-global-private-limited1678873304",
      "location": "Work From Home",
      "stipend": "6,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Java Developer - Intern",
      "companyName": "AutoRABIT Holding Inc.",
      "location": "Hyderabad, Telangana",
      "stipend": "₹8,00,000 - ₹10,00,000 a year",
      "link": "https://in.indeed.com/rc/clk?jk=bc6eaa799e35a8a5&fccid=72d05a02fe0f72e8&vjs=3",
      "tags": "Easily apply",
      "description": "  Work Type: Full Time Internship for 3-6 months working from office, five days a week.\n Analyze code using static analysis tools to identify potential security…\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "Data Engineering",
      "companyName": "Go Digital Technology Consulting",
      "link": "https://internshala.com/internship/detail/data-engineering-internship-in-pune-mumbai-at-go-digital-technology-consulting1679288295",
      "location": "Pune,Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "Zaivic Tech-Wellness Solutions Private Limited",
      "location": "Mysore, Karnataka",
      "stipend": "₹8,955 - ₹25,000 a month",
      "link": "https://in.indeed.com/company/Zaivic-Tech--Wellness-Solutions-Private-Limited/jobs/Web-Developer-a8d6c66500c1942c?fccid=43f04612c2ad47be&vjs=3",
      "tags": "Easily applyResponsive employer",
      "description": "  Regulates exposure to business stakeholders and executive management as well as other authorities.\n Builds, designs, and maintains all websites and software…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer (Backend) Intern",
      "companyName": "Crio.Do",
      "link": "https://www.naukri.com/job-listings-software-engineer-backend-intern-crio-do-bangalore-bengaluru-0-to-1-years-140323004211",
      "location": "Bangalore/Bengaluru(Koramangala)",
      "stipend": "Not disclosed",
      "description": "Requirements 7+ projects in GitHub with at least 3 solid projects Looking for batch 202..."
    },
    {
      "site": "Internshala",
      "title": "Software Analytics",
      "companyName": "Pinkmoon Technologies",
      "link": "https://internshala.com/internship/detail/software-analytics-internship-in-vijayawada-at-pinkmoon-technologies1679578933",
      "location": "Vijayawada",
      "stipend": "5,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern: Software Engineering",
      "companyName": "BayaTree",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-bayatree-kolkata-mumbai-new-delhi-hyderabad-secunderabad-pune-chennai-bangalore-bengaluru-0-to-1-years-211118500010",
      "location": "Kolkata, Mumbai, New Delhi, Hyderabad/Secunderabad, Pune, Chennai, Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "You should be a fresh graduate/ post graduate with good communication skills and passio..."
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "HololabXR",
      "link": "https://internshala.com/internship/detail/unity-development-part-time-job-internship-at-jabalpur-in-hololabxr1679299432",
      "location": "Jabalpur",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Trainee",
      "companyName": "Shri Ramswaroop Digital Technology Pvt Ltd",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-shri-ramswaroop-digital-technology-pvt-ltd-lucknow-0-to-2-years-241122006237",
      "location": "Lucknow",
      "stipend": "50,000-2.5 Lacs PA",
      "description": "Roles and Responsibilities Job Title/Designation:Software Engineer - TraineeEmployment ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-software-engineer-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-241221501632",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Should have Strong problem solving capability. . Be able to contribute as strong hands-..."
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Eldrok Technology India",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-gurgaon-at-eldrok-technology-india1678878919",
      "location": "Gurgaon",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Associate I Software Engineer",
      "companyName": "S&P Global Inc.",
      "link": "https://www.naukri.com/job-listings-associate-i-software-engineer-s-p-global-inc-bangalore-bengaluru-0-to-2-years-250323500448",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Strong programming skills in Python Automation preferably in Windows environment Should..."
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Medius Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-work-from-home-job-internship-at-medius-technologies-private-limited1678707896",
      "location": "Work From Home",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Ouriken - IT Services & IT Consulting",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-thane-at-ouriken-it-services-it-consulting1679057222",
      "location": "Thane",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Backend Engineer",
      "companyName": "Helius Technologies",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=251a776d86a1e357&fccid=b3282c125f18e0c0&vjs=3",
      "tags": "",
      "description": "  Optional Onboarding Training Program: We have a dedicated 3- to 6- month onboarding program to help back-end engineers learn the basics of back end-to-end…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Fresher - QA",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-software-engineer-fresher-qa-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-290921501859",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": ". 0-2 years of experience in Software Industry, preferably from Product companiesWorkin..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer / Trainees",
      "companyName": "easybookingz, TIS Pvt. Ltd",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainees-easybookingz-tis-pvt-ltd-bengaluru-bangalore-0-to-1-years-070818500242",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Location: Full time & Benguluru . Must be comfortable working in fuzzy environments- wh..."
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Samisan Tech Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-samisan-tech-private-limited1679122988",
      "location": "Mumbai",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Pressbuddy Software Solutions",
      "link": "https://internshala.com/internship/detail/react-native-development-work-from-home-job-internship-at-pressbuddy-software-solutions1679376358",
      "location": "Work From Home",
      "stipend": "6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Deep Learning",
      "companyName": "Pianalytix Edutech Private Limted",
      "link": "https://internshala.com/internship/detail/deep-learning-work-from-home-job-internship-at-pianalytix-edutech-private-limted1678652620",
      "location": "Work From Home",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Hvantage Technologies Incorporated",
      "link": "https://internshala.com/internship/detail/net-development-work-from-home-job-internship-at-hvantage-technologies-incorporated1679115678",
      "location": "Work From Home",
      "stipend": "2,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Engineer – Haskell",
      "companyName": "vacation labs",
      "location": "Porvorim, Goa",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a64b1de35dfbabec&fccid=5b3b0c70132f8412&vjs=3",
      "tags": "",
      "description": "  At least 6 months of experience with an FP-lang, eg Haskell, Elm, Purescript, Scala, F# etc.\n Someone who can take ownership and can operate in an environment of…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "CogniSaaS Technologies",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=1eedf7abac148909&fccid=e75d3f1dfa1cbef2&vjs=3",
      "tags": "",
      "description": "  Experience of using any hosted source code management system like GitHub.\n Work as part of the dev team on software design, development and testing.\n",
      "postedDate": "PostedPosted 23 days ago"
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "The Crafty Talk",
      "link": "https://internshala.com/internship/detail/machine-learning-work-from-home-job-internship-at-the-crafty-talk1679564504",
      "location": "Work From Home",
      "stipend": "12,700 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-noida-1-to-2-years-130123500432",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Strong C/C++ development skills with a good understanding of object-oriented design. St..."
    },
    {
      "site": "Indeed",
      "title": "Software Developer (Intern)",
      "companyName": "Commud Networks",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=4dfee2330007b9df&fccid=2dff79acb58b3253&vjs=3",
      "tags": "",
      "description": "  We are looking for software development interns to join the Commud gang for both 6 and 8 months terms.\n We're looking for passionate developers who love clean…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Vidagdhan Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-vidagdhan-technologies-private-limited1678509425",
      "location": "Work From Home",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps",
      "companyName": "DeHaat",
      "link": "https://internshala.com/internship/detail/devops-internship-in-gurgaon-at-dehaat1679050238",
      "location": "Gurgaon",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Internship full stack web developer",
      "companyName": "White Vectors",
      "location": "Remote in Chandigarh, Chandigarh",
      "stipend": "₹15,000 a month",
      "link": "https://in.indeed.com/company/White-Vectors/jobs/Internship-Full-Stack-Web-Developer-77bb7610961664f9?fccid=a8a80af2bf0e678d&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Understanding of Agile software development methodologies.\n Candidates must have experience using Microsoft Azure to build and deploy applications, as well as a…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Content Developer",
      "companyName": "Wiluminaty Lifestyle Private Limited",
      "location": "Remote in Nagpur, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/company/Wiluminaty-Lifestyle-Private-Limited/jobs/Content-Developer-93751023c46473e9?fccid=453cdc22a098bc74&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  4.Capturing good video content using phone camera for You-Tube Video.\n 6.Well versed in current trends on viral content.\n Goal-oriented and customer-oriented.\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Piyshef Technologies",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-udaipur-at-piyshef-technologies1679375430",
      "location": "Udaipur",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Development Engineer",
      "companyName": "Greenizon Agritech Consultancy",
      "link": "https://www.naukri.com/job-listings-software-development-engineer-jai-kisan-bangalore-bengaluru-0-to-4-years-301122501469",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "The ideal candidate is the one who is willing to undergo 6 months on internship with us..."
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "MWW (CryptoKnights)",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-mww-cryptoknights1678082507",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering (Web)",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/software-development-engineering-web-work-from-home-job-internship-at-attitude-matterz1679219097",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "SailPoint",
      "location": "Maharashtra, India, ",
      "description": "About the job\n        \n\n\n        \n                  SailPoint is seeking a Backend Software Engineer to help build a new cloud-based SaaS identity analytics product. We are looking for well-rounded backend or full stack engineers who are passionate about building and delivering reliable, scalable microservices and infrastructure for SaaS products. This is a unique opportunity to build something from scratch but have the backing of an organization that has the muscle to take it to market quickly, with a very satisfied customer base. \n\nResponsibilities Deliver efficient, maintainable, robust Java based microservices. Produce designs and rough estimates, and implement features based on product requirements. Collaborate with peers on designs, code reviews, and testing. Produce unit and end-to-end tests to improve code quality and maximize code coverage for new and existing features. \n\nRequirements 2 to 5 years Expert in Core Java Web Service architectureSOAP & REST based Experience in any Databases like Oracle, MSSQL and Sybase Good hands-on experience on XMLJSON Experience in Any Application server - Tomcat, JBoss, Weblogic ,WebSpherStrong Java experience Great communication skills BS in Computer Science, or a related field Proficient experience with object-oriented analysis and design skills Proficient experience with an object-oriented programming language and techniques Proficient understanding of Java Frameworks \n\nPreferred Experience with AWS Exposure to Cloud ServicesExperience with Continuous Delivery UI technologies – Web Tool Kits like ExtJSExperience instrumenting code for gathering production performance metrics Design Patterns and usage\n\nSailPoint is an equal opportunity employer and we welcome everyone to our team. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or veteran status.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Angels Virtual World",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-delhi-at-angels-virtual-world1679316823",
      "location": "Delhi",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "MentorBoxx",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-mentorboxx1679306939",
      "location": "Work From Home",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Varadvinayak Infotech Pvt Ltd",
      "location": "Remote in Mumbai, Maharashtra",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Varadvinayak-Infotech-Pvt-Ltd/jobs/Software-Developer-845c28cbacc86fba?fccid=6ef48f4dbb20b186&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  SHOULD HAVE KNOWLEDGE IN HTML, CSS, PHP, JAVA, SQL, WEBSITE UI DESIGN, ANDROID APP DEVELOPERS ETC.\n DEPEND UPON PERFORMANCE WILL DECIDE TO MAKE EMPLOYEE…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer I",
      "companyName": "Eventbrite",
      "location": "India, Remote",
      "description": "About the job\n        \n\n\n        \n                  THE CHALLENGE\nEventbrite's business continues to grow and scale rapidly, powering millions of events. Event creators and event goers need new tools and technologies that empower them to have the most meaningful live experiences. As a Software Engineer at Eventbrite, you will build beautiful, responsive, delightful and intuitive user interfaces that people are excited to use\nTHE TEAM\nWe're a people-focused Engineering organization: the women and men on our team value working together in small teams to solve big problems, supporting an active culture of mentorship and inclusion, and pushing themselves to learn new things daily. Pair programming, weekly demos, tech talks, and quarterly hackathons are at the core of how we’ve built our team and product. We believe in engaging with the community, regularly hosting free events with some of the top technical speakers, and actively contributing to open source software (check out Britecharts as an example!). Our technology spans across web, mobile, API, big data, machine learning, search, physical point of sale, and scanning systems. To learn more about some of the frontend teamwork, check out our frontend blog\nTHE SKILL SET\nAdvanced English Level1-2 years of experience working in a Software Development role Experience with or the excitement to work with Python and Django web frameworkUnderstanding that great code is also maintainable codeYou care about making sure your code is well testedA result driven self starter with great communication and collaboration skillsUnit-testing know-how required, experience with TDD or BDD is an added bonusKnowledge of front-end technologies (HTML, CSS, Ajax, Javascript)Database experience (ideally MySQL, NoSQLis a plus)OOP/OOD knowledge\nBONUS POINTS\nExperience with AWS and developing APIsExperience using non-relational databasesFamiliarity with Eventbrite and a passion for live events\nWhat We Offer\nAt Eventbrite, we strive to support our Britelings and their loved ones through different stages of life with robust and attractive benefits, financial and physical wellness options, and great perks. In addition to offering a competitive salary and company stock, we have other great benefits available. In the Briteland, you’ll find great medical plans, fertility and adoption benefits, wellness reimbursement, generous parental leave, and much more.\nWe Care About Your Mental Health And Wellbeing.\nOur employees enjoy free coaching sessions with Modern Health. We also offer free therapy sessions with a psychologist. You’ll also have access to private medical insurance for you and your family, that includes dental care. And our wellness program to pay for your gym expenses.\nWe work hard to cultivate a diverse, equitable and inclusive culture where Britelings feel like they belong.\nEmployees can participate in resource groups and we offer programming throughout the year to support a diverse and inclusive workplace.\nWe offer ongoing training and career development that meets people where they are in their careers.\nWe offer unlimited access to courses in Udemy, leadership coaching for all managers, Briteling led talks, and weekly company-wide town halls with our CEO. We take culture seriously and design programs with employee feedback in mind to make Eventbrite a great place to work no matter where you work from in the world.\nWork-life balance & flexibility is extremely important to us.\nOur employees can choose what works best for them: work in one of our offices, be fully remote or the best of both worlds! We believe in a flexible working environment to allow Britelings to perform at their best ensuring a healthy work-life balance. We have recently implemented Britebreak Fridays: all Britelings turn off their computers and take the first Friday of every month off to focus on their wellbeing.\nAbout Eventbrite\nEventbrite is a global self-service ticketing and experience technology platform that serves a community of hundreds of thousands of event creators in nearly 180 countries. Since inception, Eventbrite has been at the center of the experience economy, transforming the way people organize and attend events. The company was founded by Julia Hartz, Kevin Hartz and Renaud Visage, with a vision to build a self-service platform that would make it possible for anyone to create and sell tickets to live experiences. The Eventbrite platform provides an intuitive, secure, and reliable service that enables creators to plan and execute their live and online events, whether it’s an annual culinary festival attracting thousands of foodies, a professional webinar, a weekly yoga workshop or a youth dance class. With over 290 million tickets distributed for over 5 million total events in 2021, Eventbrite is where people all over the world discover new things to do or new ways to do more of what they love. Learn more at www.eventbrite.com .\nIS THIS ROLE NOT AN EXACT FIT?\nSign up to keep in touch and we’ll let you know when we have new positions on our team .\nEventbrite is committed to equality of opportunity for all staff, and applications from all suitably qualified individuals are encouraged, regardless of age, disability, sex, gender reassignment, sexual orientation, pregnancy and maternity, race, religion or belief and marriage and civil partnerships.\nApplicant Privacy Notice",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Flutter Developer",
      "companyName": "Softrefine Technology",
      "location": "Remote in Ahmedabad, Gujarat",
      "stipend": "₹13,660 - ₹54,910 a month",
      "link": "https://in.indeed.com/company/Softrefine-Technology/jobs/Flutter-Developer-d43fe3539daf7b69?fccid=760e550e218a7820&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Experience using Restful APIs to integrate mobile applications to server-side systems.\n Deep experience contributing to and managing high-scale production mobile…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "Viral Inbound",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=d1e219e18b387ddf&fccid=4e384931a1a53596&vjs=3",
      "tags": "",
      "description": "  Integrate data from various back-end services and databases.\n Gather and refine specifications and requirements based on technical needs.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Bakerstreet Fintech Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-pune-at-bakerstreet-fintech-private-limited1678951679",
      "location": "Pune",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Front End Developer",
      "companyName": "CYGEN",
      "location": "Hyderabad, Telangana",
      "stipend": "₹1,80,000 - ₹5,00,000 a year",
      "link": "https://in.indeed.com/company/Cygen/jobs/Front-End-Developer-7d5de6e41b920a2e?fccid=7a05055f821ff93b&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Minimum of 1 years of experience developing modern, responsive, and cross-browser-compatible websites using HTML, CSS, and JavaScript.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-071122501323",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Required Qualifications and Experience . . . . Should have good understanding of Client..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - React Native",
      "companyName": "moglix",
      "link": "https://www.naukri.com/job-listings-software-engineer-react-native-moglix-noida-0-to-3-years-090922501881",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": ". 7, Should have good experience in iOS, React Native & Redux We are looking for a smar..."
    },
    {
      "site": "Indeed",
      "title": "React JS Developer",
      "companyName": "ANTINO LABS PRIVATE LIMITED",
      "location": "HSR Layout, Bengaluru, Karnataka",
      "stipend": "Up to ₹8,00,000 a year",
      "link": "https://in.indeed.com/company/Antino-Labs/jobs/React-Js-Developer-f0abfe92a5147563?fccid=7a274369650c81a8&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  3 years of understanding of React.js and its core principles.\n Develop a flexible & well-structured frontend architecture, along with the APIs to support it.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "MEAN Stack Developer",
      "companyName": "Qwerty Thoughts Media Pvt Ltd",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "Up to ₹80,000 a month",
      "link": "https://in.indeed.com/company/Qwerty-Thoughts-Media-Pvt-Ltd/jobs/Mean-Stack-Developer-c69b407cc1d8a9ae?fccid=a210e1cb8aa1f8df&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Collaborate well with engineers, researchers, and data implementation specialists to design and create advanced, elegant, and efficient systems.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Node js developer",
      "companyName": "Nextgen Techno Ventures Pvt Ltd",
      "location": "Mumbai, Maharashtra",
      "stipend": "₹8,158 - ₹33,000 a month",
      "link": "https://in.indeed.com/company/Nextgen-Techno-Ventures-Pvt-Ltd/jobs/Node-Js-Developer-16c3477ca1974f83?fccid=5899b03fd09613b3&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Availability to resolve urgent web application issues outside of business hours.\n Developing and maintaining all server-side network components.\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Internshala",
      "title": "Power BI Development",
      "companyName": "BlueTide Solutions Pvt Ltd",
      "link": "https://internshala.com/internship/detail/power-bi-development-part-time-job-internship-at-gurgaon-in-bluetide-solutions-pvt-ltd1679460422",
      "location": "Gurgaon",
      "stipend": "15,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Frontend Developer",
      "companyName": "Learnix Edutech Pvt. Ltd.",
      "location": "Noida, Uttar Pradesh",
      "stipend": "₹1,80,000 - ₹4,25,000 a year",
      "link": "https://in.indeed.com/rc/clk?jk=094e5f6e4ca962e9&fccid=4a32ac50e2ea5027&vjs=3",
      "tags": "Easily apply",
      "description": "  Job description: Web Development Using Html, Css, Bootstrap & Javascript Skill(s) required: Strong understanding of Html, Css, Boostrap & Javascript CTC Offered…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Shortgun LLP",
      "link": "https://internshala.com/internship/detail/game-development-internship-in-mumbai-at-shortgun-llp1678431897",
      "location": "Mumbai",
      "stipend": "10,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "Zapplogics Solutions LLP",
      "link": "https://internshala.com/internship/detail/unity-development-work-from-home-job-internship-at-zapplogics-solutions-llp1678686175",
      "location": "Work From Home",
      "stipend": "2,000-4,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Logibricks Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-pune-at-logibricks-technologies-private-limited1679658040",
      "location": "Pune",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Altisource Software Engineer - Fresher - QA",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-altisource-software-engineer-fresher-qa-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-011121500169",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Requirement 0-2 years of experience in Software Industry, preferably from Product compa..."
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Duckcart",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-duckcart1679662466",
      "location": "Work From Home",
      "stipend": "2,500-7,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Trainee",
      "companyName": "IT Jobcell",
      "location": "Thiruvananthapuram, Kerala",
      "stipend": "From ₹15,000 a month",
      "link": "https://in.indeed.com/company/IT-JOBCELL/jobs/Software-Trainee-763f75e30d522aae?fccid=20e851191e087d45&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Analyze, design and develop applications.\n The permanent employment will be offered only after the successful completion of training.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Senior Software Engineer",
      "companyName": "NAF Technology India",
      "location": "Chennai, Tamil Nadu, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  Position Summary:    Do you love a Challenge? Are you Passionate about technology? Are you customer obsessed? Looking to innovate? Join NAF Tech!  New American Funding(NAF) is a mortgage lender offering an array of loan options. Established in 2003 and headquartered in Tustin, CA, United States, NAF has 4400+ strong work-force across 167 branches and a servicing portfolio of 229,000+ loans and $60.7 Billion.  By having a clear understanding of product requests, collaborating with our product teams and designers, and providing solutions to our business problems, this role will provide insights in our development efforts. We're expecting this candidate to be able to make independent decisions, and use their creativity to solve different problems, and most important of all, have fun with the team here!  Responsibilities:  Define the long-term technical strategy and architecture vision for device management, leveraging new technologies to deliver features to our customers. Think out of box, plan and build frameworks as building blocks, be updated with the technology and improve frameworks on timely manner Analyse User requirements, clarify and cascade as needed for clear understanding and implementation Professionally maintain all software and create updates regularly to address customer concerns Troubleshoot coding problems quickly and efficiently to ensure a productive workplace Ensure software security by developing programs to actively monitor the defined standards Collaborate with team members to determine best coding practices and enhance client experience Develop Successors in Place by mentoring the individuals and assist in their career growth and update them with the technical challenges that might come their way Document and demonstrate solutions by developing documentation, flowcharts, layouts, diagrams, charts and code comments Updates job knowledge by studying state-of-the-art development tools, programming techniques, and computing equipment Actively participate in Internal initiatives, contribute to org wide Technology initiatives  Core Competencies:  Bachelor’s Degree in Computer Science or equivalent Overall, 5+ years of Software development experience 2+ years of experience contributing to the architecture and design (architecture, design patterns, reliability and scaling) of new and current systems Strong C/S Foundation and competencies on Data Structures, Algorithms and Software Design Principles supporting multiple channels. Proficiency in either of these - C#, VB.Net, ASP.net, React and AngularJS, HTML5, CSS3, SASS Proficiency in Angular 12, NGRX, C# Azure AppService and Functions, Cosmos DB, Blob Storage, ElasticSearch, SQL Server is a plus.Integration expertise working with third-party libraries and APIs Possess expert knowledge in performance, scalability, enterprise system architecture, and engineering best practices. Knowledge in latest Architectural patterns that facilitates TDD approach, Knowledge in Unit Testing Experience in being part of Production deployments and related activities Ability to work in Agile fast paced environment with knowledge on CI/CD /Monitoring frameworks and related DevOps tools (Jenkins,Jira,Google Analytics if any) Proficient in Problem solving Ability to work as part of Team or as Individual contributors Excellent communication and interpersonal skills working across multiple geographies  Nice to Have:  Optimize Applications/Frameworks to maximize speed and scale Working Knowledge of Django, Flask and React.JS Proficient in Relational Databases querying A Deep understanding of cross functional teams and working across the teams Ability to handle Aggressive timelines and achieve optimal solutions to the Business requirements.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Back-end Developer (Python, MongoDB, AWS)",
      "companyName": "EnactOn Technologies",
      "location": "Remote in Surat, Gujarat",
      "stipend": "₹4,80,000 - ₹18,00,000 a year",
      "link": "https://in.indeed.com/rc/clk?jk=4b3e9805d755fa64&fccid=5709600aba0f4f56&vjs=3",
      "tags": "",
      "description": "  A Backend Developer is one of the primary types of software developers, who create and develop software that runs on a server and a browser.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Jeronone Technology Pvt Ltd.",
      "location": "Mohali, Punjab",
      "stipend": "",
      "link": "https://in.indeed.com/company/Jeronone-Technology-Pvt-Ltd./jobs/Software-Developer-7d92bdd7848f5cbd?fccid=cfa362704a3313b8&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidate must have expertise in back-end technologies like *WordPress*, *Shopify*, *Laravel*, *Magento*, and *CI*.\n",
      "postedDate": "PostedPosted 4 days ago"
    },
    {
      "site": "Internshala",
      "title": "Hardware Design Engineering",
      "companyName": "Strom Customized Solutions",
      "link": "https://internshala.com/internship/detail/hardware-design-engineering-internship-in-vadodara-at-strom-customized-solutions1678950116",
      "location": "Vadodara",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Next JS Front End Developer Intern",
      "companyName": "Absolute Compliance Private Limited",
      "location": "Remote in Bhopal, Madhya Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/company/Absolute-Compliance/jobs/Next-Js-Front-End-Developer-Intern-07ccaadf36f3defc?fccid=747d6f39e350eea1&vjs=3",
      "tags": "Easily apply",
      "description": "  Availability for 6 months, We will give time off during exams as required.\n Software development: 1 year (Preferred).\n Job Types: Full-time, Internship.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Flutter Developer Intern",
      "companyName": "Cmile",
      "location": "Remote in Pune, Maharashtra",
      "stipend": "₹5,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/Cmile/jobs/Flutter-Developer-Intern-22b621b57374d3ce?fccid=d70702e11b09fac7&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Create multi-platform apps for iOS & Android using Google's new Flutter development framework.\n Strong OO design and programming skills in DART and SDK Framework…\n",
      "postedDate": "EmployerActive 4 days ago"
    },
    {
      "site": "Internshala",
      "title": "Unity Game Development",
      "companyName": "Ether Verse",
      "link": "https://internshala.com/internship/detail/unity-game-development-work-from-home-job-internship-at-ether-verse1679357829",
      "location": "Work From Home",
      "stipend": "20,000-35,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-delhi-at-isourse1678778240",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Kodiak Networks",
      "link": "https://www.naukri.com/job-listings-software-engineer-motorola-solutions-india-private-ltd-bangalore-bengaluru-0-to-1-years-060223501129",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "On-call work are occasionally required for services developed by the team . . . . . . ...."
    },
    {
      "site": "Naukri",
      "title": "SOFTWARE ENGINEER INTERN",
      "companyName": "Qbotica",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-qbotica-remote-0-to-4-years-221122503590",
      "location": "remote",
      "stipend": "Not disclosed",
      "description": "As software engineer intern, you will build robust and scalable software, participate i..."
    },
    {
      "site": "Indeed",
      "title": "Mobile Application Developer Internship",
      "companyName": "Redgates IT Solutions",
      "location": "Remote",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/RedGates-IT-Solutions/jobs/Mobile-Application-Developer-Internship-2990205309c9f84e?fccid=aa3d102219ed3c56&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Our services cover the entire app lifecycle - conception, design, development, deployment, testing, release to app stores, and ongoing support.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern (Ref 20220407-3)",
      "companyName": "Telit Wireless Solutions",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=7ad9ef7b717020c7&fccid=5c7d5c0fa4a72ae0&vjs=3",
      "tags": "",
      "description": "  Bachelors or master’s degree in engineering.\n Replicate customer issues and suggest solutions.\n Wi-Fi, Bluetooth, smart module and other short range issue…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Video Game Development",
      "companyName": "Vestosa Casa Private Limited",
      "link": "https://internshala.com/internship/detail/video-game-development-work-from-home-job-internship-at-vestosa-casa-private-limited1679660437",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "React JS Developer",
      "companyName": "Render Infotech",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=0ab3c8324a46507a&fccid=8eff3c3e8ad975d0&vjs=3",
      "tags": "",
      "description": "  1+ years of Strong Experience in React JS, Javascript experience is mandatory.\n Experience : 1 Year To 5 Years.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Embedded Software Development",
      "companyName": "Improvians",
      "link": "https://internshala.com/internship/detail/embedded-software-development-internship-in-mumbai-at-improvians1679323895",
      "location": "Mumbai",
      "stipend": "12,000-14,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "WFH - Java Developer-Freelance Position",
      "companyName": "eNation Solutions Pvt. Ltd.,",
      "location": "Remote in Chennai, Tamil Nadu",
      "stipend": "₹40,000 - ₹75,000 a month",
      "link": "https://in.indeed.com/company/eNation-Solutions-Pvt.-Ltd.,/jobs/Wfh-8d6d59ed8d404e58?fccid=6e5906855525fa5a&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Hands on experience in 3-tier architecture environments with MS Internet explorer, Web server, Web logic 12c, and Oracle 8i/9i/10g database;\n",
      "postedDate": "PostedPosted 4 days ago"
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Rhytify Technologies",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-rhytify-technologies-private-limited-bengaluru-bangalore-0-to-4-years-120819502299",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Recent Computer Science Graduates with good gradesKnowledge of any RDBMS . . Good commu..."
    },
    {
      "site": "Internshala",
      "title": "Infra Administration",
      "companyName": "Code Inbound LLP",
      "link": "https://internshala.com/internship/detail/infra-administration-work-from-home-job-internship-at-code-inbound-llp1678879826",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Electronics Hardware Engineering",
      "companyName": "Techolution",
      "link": "https://internshala.com/internship/detail/electronics-hardware-engineering-internship-in-hyderabad-at-techolution1679562015",
      "location": "Hyderabad",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "The Crafty Talk",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-work-from-home-job-internship-at-the-crafty-talk1679564401",
      "location": "Work From Home",
      "stipend": "17,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "TruLOCAL India Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-trulocal-india-private-limited1679368112",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Ciber Global",
      "location": "Chennai, Tamil Nadu, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Position Description: Enhance existing Odyssey application using - JBOSS/Struts/EJB/JMS/Hibernate/ORM/JPA/Servlet/JSP/Angular/XML/XSLT/FOP/XEP/Apache/Rabbit MQ/Restful /Oracle DB - Has good knowledge on using CID-CD/Dev tools like Jenkins/Github/Gradle/Sonar/Checkmarx/Junit/Mokito/Selenium/Lombok - Develop new microservice-based application software using Java, Spring Framework/Spring boot/GCP/Tekton/ PostGreSQL - Contribute to feature and user story development / backlog refinement as part of the team’s Agile methodology. - Collaborate with other product teams on integrations, testing, and deployments - Improve application testing capabilities by implementing automated testing tools and best practices, writing Junit test cases. - Monitor and evaluate the performance of our solutions; support the production application and identify improvement opportunities  Skills Required: JAVA 8/11, Spring boot, PCF (Pivotal cloud foundry), Google Cloud Platform (GCP), Microservices, REST/SOAP, Gradle, CI/CD pipeline, MS SQL, Oracle, PostGreSQL, noSQL, Kafka, RabbitMQ, GitHub, Dynatrace, Splunk, reactjs  Skills Preferred: Successful candidate will have: - Strong analytical and problem-solving skills - Strong focus on quality practices - Good communication and interpersonal skills - Ability to multi-task and manage changing priorities - Ability to work independently and take initiative when facing unexpected problems - Leadership skills   Experience Required: - Overall 3-12 years of Java development experience - 3+ years of experience as a Java developer with good OOPS background - 3+ years of experience in Java development using Spring, Spring Boot - 3+ years of experience in Junit testing - 3+ years of experience in cloud microservices development (GCP, REST services, YML, PCF) - Experience with test-driven development / JUnit and pairing/mobbing practices - Familiarity with GitHub or equivalent source control repositories - Experience with CI/CD processes and tools (e.g., Jenkins) - Knowledge of build tools (e.g., Gradle) - Expertise with Oracle, and PostGreSQL; experience with NoSQL databases (MongoDB) nice to have - Experience troubleshooting application and performance issues; use of tools like Splunk , Dynatrace. - Good to have knowledge in legacy Java technologies like Struts, JSP, Servlet etc..",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "Python And AI Coding Instructing",
      "companyName": "Rancho Labs",
      "link": "https://internshala.com/internship/detail/python-and-ai-coding-instructing-work-from-home-job-internship-at-rancho-labs1679644130",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Angular Developer internship",
      "companyName": "I Can Infotech",
      "location": "Ahmedabad, Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/company/I-can-infotech/jobs/Angular-Developer-Internship-5102bc3bed9621fa?fccid=5fb98c157fcc1847&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Integrate software components into a fully functional software system.\n Must have a commitment to collaborative problem solving, sophisticated design, and…\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Developer",
      "companyName": "Heart It Out",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=e8105e1e59bc0a15&fccid=077cb259e6857b69&vjs=3",
      "tags": "",
      "description": "  Build interactive pages using custom code or page builders tool like elementor, oxybuilder.\n Work with the design team to implement complicated design ideas with…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "Agprop",
      "location": "New Delhi, Delhi",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=01d7cae5de7650e8&fccid=823a0998398b0a33&vjs=3",
      "tags": "",
      "description": "  Experience in building websites using HTML, CSS, JavaScript & MySQL.\n Knowledge of Bootstrap, GIT, MVC framework is preferred (not mandatory).\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Indeed",
      "title": "Fullstack Engineer",
      "companyName": "Helius Technologies",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=396bbea387408575&fccid=b3282c125f18e0c0&vjs=3",
      "tags": "",
      "description": "  Optional Onboarding Training Program: We have a dedicated 3- to 6- month onboarding program to help full stack engineers learn the basics of full stack…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Epitas",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-epitas-mangaluru-mangalore-0-to-2-years-310721500950",
      "location": "Mangaluru/Mangalore",
      "stipend": "Not disclosed",
      "description": "We are looking for energetic intern to join our software development team. The intern w..."
    },
    {
      "site": "Indeed",
      "title": "Backend Developer Intern",
      "companyName": "Contractzy",
      "location": "Madgaon, Goa",
      "stipend": "₹10,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Attort-Legal-consultancy-private-limited/jobs/Backend-Developer-Intern-97072dc9a363433d?fccid=598753c7cd5bbbca&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Duration 3 months (full-time offer will be rolled out post-completion based on your performance during the internship tenure).\n",
      "postedDate": "PostedPosted 24 days ago"
    },
    {
      "site": "Internshala",
      "title": "WhatsApp Chatbot Development",
      "companyName": "CattleGuru Private Limited",
      "link": "https://internshala.com/internship/detail/whatsapp-chatbot-development-work-from-home-job-internship-at-cattleguru-private-limited1679404801",
      "location": "Work From Home",
      "stipend": "3,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Celetel",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-noida-at-celetel1679478831",
      "location": "Noida",
      "stipend": "15,000-22,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer ( Onsite )",
      "companyName": "SJ Innovation",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-onsite-sj-innovation-llc-panaji-panjim-0-to-2-years-131022501563",
      "location": "Panaji/Panjim",
      "stipend": "Not disclosed",
      "description": "Outstanding coding abilities Thorough knowledge of atleast 1 programming language. Work..."
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Blackhawk Network",
      "location": "Kozhikode, Kerala, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  About Blackhawk Network\n\nRybbon, a Blackhawk Network Company, is looking for a talented and motivated software engineer with a passion for solving challenging problems and building products that customers love.\n\nThis is a great opportunity to join a Rybbon, Blackhawk Network company that is changing how businesses put the power of gifting to work.\n\nWho We Are\n\nRybbon is a platform for marketers to send & manage global e- gift campaigns like Amazon or Visa e-gift cards. Marketers love how Rybbon makes it easy to deliver gifts to hundreds and thousands of recipients. Rybbon is the only integrated gifting partner for the top marketing & survey platforms - SurveyMonkey, Marketo, HubSpot, and Qualtrics.\n\nRybbon has grown rapidly to more than 1000 customers with 5-star ratings on G2 Crowd and Capterra. Rybbon Division of Blackhawk is based in Washington DC, USA, and in Calicut, Kerala, India. Learn more about Rybbon at www.rybbon.net .\n\nRybbon was acquired by Blackhawk Networks in August 2021, a global leader in branded payments.\n\nAt Blackhawk Network, we shape the future of global branded payments through prepaid products, technologies, and networks that connect brands and people. Our collaborative innovation and scalable, security-minded solutions help our partners to increase reach, loyalty, and revenue. We believe our future holds great things for Blackhawk Network and its partners. We believe that together, we can shape the future. Our beliefs? Win as one team, be innovative, have global excellence, and be inspiring! Blackhawk is a multi-billion dollar US-based corporation, with headquarters in Pleasanton, California, and offices in over 28 countries.\n\nSo, what are you waiting for? Shape your career and join our global network.\n\nOverview\n\nBlackhawk Network is building a digital platform and products that unite people and brands. We facilitate cross-channel payments via cash-in, cash-out, and mobile payments. By leveraging blockchain, smart contracts, serverless technology, and real-time payment systems, we are unlocking the next million users through innovation.\n\nOur employees are our biggest assets! Come find out how we engage, with the biggest brands in the world. We look for people who collaborate, who are inspirational, who have a passion that can make a difference by working as a team while striving for global excellence.\n\nResponsibilities\n\n Our Stack \n\nFront End: Vue.js, Vuetify, Javascript\n\nBack End: Node.js, Sails.js\n\nData Store: MySQL / Amazon Aurora\n\nCloud: Amazon Web Services (AWS)\n\nYour Key Responsibilities\n Craft software designs to implement new features  Convert high-level business requirements to development tasks on JIRA.  Design & build integrations and APIs with third-party applications.  Write clean, concise, well-tested code  Troubleshoot issues reported from production and resolve them.  Code review other team member’s work, ensure that coding complies with the coding standards, and suggest improvements. \nQualifications\n Solid technical experience with the following technologies:  Web Technologies:  JavaScript / Node.js  HTML5 / CSS3  Vue.js, Vuetify  REST API  Databases:  MySQL or similar  Frameworks:  MVC  Sails.js for Node.js development  Microservices architecture  Bonus Skills:  PHP  Security Best Practices  AWS technologies and familiarity with DevOps model  2-5 Years of software development experience, in a web development environment  Love for learning new things and teaching others about them  Bachelor’s degree in Computer Science  Payments / eCommerce industry experience is a plus.  Self-starter",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Citiustech",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-citiustech-mumbai-0-to-1-years-190621500479",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "As a Trainee SoftwareEngineer , you will be part of an agile team to build healthcareap..."
    },
    {
      "site": "LinkedIN",
      "title": "Senior Software Engineer",
      "companyName": "Victoria's Secret",
      "location": "Bengaluru, Karnataka, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Description\nPurpose & Overview:\nDevelop, troubleshoot, debug and implement Salesforce.com and Force.com applications. Deliver innovative, high quality solutions to customers. Our Salesforce developer will have strong enterprise business application development. This position will work as part of a development team using rapid development practices.\nResponsibilities & Qualifications:\n Requires a bachelor’s degree (preferably in Computer Science) and 6 – 8 years of IT experience and at least 4 – 5 years of Force.com development experience, with a strong focus on Apex and lightning development. Expertise in lightning aura component development. Web component knowledge preferred. Strong expertise on salesforce point and click tools – Schema Builder, Process Flows, Approval Flows, Visual Work Flows, etc. Strong expertise on salesforce custom development – APEX Classes, APEX triggers, Asynchronous Processing – Batch Apex, Queueable Apex, Future Methods, Scheduled Apex Strong expertise in OOPs concepts and patterns Good Knowledge on Salesforce Application Design Patterns and integration patterns. Experience with integrating salesforce with other systems Experience on various SF products and thorough understanding of their architectures Configuration experience with standard and custom Salesforce objects and fields. Strong Knowledge on web development technologies - HTML, JavaScript, and CSS. Strong oral and written communication skills. Ability to work independently and as part of a team.\nQualifications\nQualifications – External\n Experience in continuous integration and version management tools like GIT hub Salesforce Lightning Web Components knowledge Knowledge on React JS or any JS framework. Salesforce DX Experience with Salesforce Lightning Connect Salesforce Platform Developer 2 Certification",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Productiv",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-productiv-bangalore-bengaluru-0-to-3-years-310123500513",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Familiarity with AWS and node.js / VUE.js a plus, but not required"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Migento KRMGT LLP",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-migento-krmgt-llp1678507117",
      "location": "Work From Home",
      "stipend": "5,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Trainee Software Engineer",
      "companyName": "R3 SYSTEMS INDIA PVT LTD",
      "location": "Nashik, Maharashtra",
      "stipend": "₹8,086 - ₹27,245 a month",
      "link": "https://in.indeed.com/company/R3-SYSTEMS-INDIA-PVT-LTD/jobs/Trainee-Software-Engineer-fed3bab678f318e9?fccid=fe490bce4a934dd3&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Document and maintain software functionality.\n Take ownership of customer issues reported and see problems through to resolution.\n Total work: 1 year (Preferred).\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Tutoring For Java",
      "companyName": "LevelApp",
      "link": "https://internshala.com/internship/detail/tutoring-for-java-work-from-home-job-internship-at-levelapp1678959088",
      "location": "Work From Home",
      "stipend": "3,500-6,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "The Trade Desk",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-the-trade-desk-bangalore-bengaluru-0-to-1-years-250123502346",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Enrolled in a bachelors degree in Computer Science / Engineering / IT or related program"
    },
    {
      "site": "Internshala",
      "title": "API Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/api-development-internship-in-delhi-at-isourse1678783760",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "UniAcco",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-mumbai-at-uniacco1678941722",
      "location": "Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Web Designer & Developer Internship",
      "companyName": "Dreams International",
      "location": "Pune, Maharashtra",
      "stipend": "₹3,000 a month",
      "link": "https://in.indeed.com/company/Dreams-International/jobs/Web-Designer-Developer-Internship-294ebb42ab1b5865?fccid=2755b52224ff8ee2&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Create new and edit existing CSS files to achieve web page design goals.\n Code basic HTML by hand and/or with the use of Notepad++ / Visual Studio.\n",
      "postedDate": "EmployerActive 4 days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Infineon",
      "link": "https://www.naukri.com/job-listings-software-engineer-infineon-technologies-pvt-ltd-bangalore-bengaluru-0-to-1-years-020223500888",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Exposure to Unix/ Linux Platforms . . Preferably having working knowledge in Perl/ Pyth..."
    },
    {
      "site": "Internshala",
      "title": "Java Programming (AWS DevOps)",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/java-programming-aws-devops-internship-in-gurgaon-at-aaptatt1679650862",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Java Full Stack Developer Intern",
      "companyName": "Integrin Enterprise Solutions",
      "location": "Coimbatore, Tamil Nadu+1 location",
      "stipend": "₹5,500 - ₹7,000 a month",
      "link": "https://in.indeed.com/company/Integrin-Enterprise-Solutions/jobs/Java-Full-Stack-Developer-Intern-b03a3b22e9230501?fccid=8b17bdd6a69efb59&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Candidates will contribute to software development, integration with different systems, software release management, and operations.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Enthuziastic",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-enthuziastic-remote-1-to-3-years-210323501158",
      "location": "Permanent Remote",
      "stipend": "Not disclosed",
      "description": "In the new world of work from home, we expect the ideal candidate to over-communicate ...."
    },
    {
      "site": "Internshala",
      "title": "Java Full Stack Development",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/java-full-stack-development-internship-in-gurgaon-at-aaptatt1679548948",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Machine Learning & Data Science",
      "companyName": "Kaholas",
      "link": "https://internshala.com/internship/detail/machine-learning-data-science-internship-in-delhi-at-kaholas1678591646",
      "location": "Delhi",
      "stipend": "5,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "UNIO Labs",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-hyderabad-at-unio-labs1678694314",
      "location": "Hyderabad",
      "stipend": "4,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Altisource Software Engineer",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-altisource-software-engineer-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-231221500016",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "WHAT YOU GET TO DO Participate in Development of new features in Vendorly Monitor platf..."
    },
    {
      "site": "Internshala",
      "title": "Research And Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/research-and-development-internship-in-delhi-at-isourse1679305608",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Openstack Apps",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-openstack-remote-0-to-1-years-211022501096",
      "location": "Remote",
      "stipend": "Not disclosed",
      "description": "Basic experience with at least one back end or front end programming language (e.g PHP,..."
    },
    {
      "site": "Indeed",
      "title": "Intern-Frontend Developer",
      "companyName": "F1studioz",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ca06d358c2ac185d&fccid=8d95ed67abf7612e&vjs=3",
      "tags": "",
      "description": "  Engineering Interns are expected to be part of us for at least 3-4 months to get experience in different products to a better extent.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development (PHP, JS)",
      "companyName": "Brandbuddiez Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-php-js-internship-in-mumbai-at-brandbuddiez-technologies-private-limited1678711444",
      "location": "Mumbai",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering (Web)",
      "companyName": "Yougetplaced Technology Services",
      "link": "https://internshala.com/internship/detail/software-development-engineering-web-work-from-home-job-internship-at-yougetplaced-technology-services1678863648",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "WordPress Web Developer Intern",
      "companyName": "Globify Offshoring Services Pvt Ltd",
      "location": "Mumbai, Maharashtra",
      "stipend": "₹7,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Globify-Offshoring-Services-Pvt-Ltd/jobs/Wordpress-Web-Developer-Intern-5b05f42f0e4a9183?fccid=01bbdb225ee7c414&vjs=3",
      "tags": "Easily applyUrgently hiring",
      "description": "  Create websites on WordPress, Wix, etc.\n Focus on content writing for websites, logo making and other miscellaneous tasks.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Internshala",
      "title": "ASP.NET Development",
      "companyName": "AtDrive",
      "link": "https://internshala.com/internship/detail/aspnet-development-work-from-home-job-internship-at-atdrive1679316621",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/net-development-work-from-home-job-internship-at-attitude-matterz1679224689",
      "location": "Work From Home",
      "stipend": "4,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "National Instruments",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-national-instruments-india-pvt-ltd-bangalore-bengaluru-1-to-2-years-050123500638",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "The Software Engineer Intern position is a challenging role within NI, requiring daily ..."
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Leads To Company",
      "location": "Remote in Kolkata, West Bengal",
      "stipend": "₹10,306 - ₹39,367 a month",
      "link": "https://in.indeed.com/company/Leads-To-Company/jobs/Software-Developer-4d6ee197a997d233?fccid=c052af36958d01db&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Experience using GitHub or similar environment.\n Write well designed, testable, efficient code.\n Proficient understanding of code versioning tools, such as Git.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "GoKapture",
      "link": "https://internshala.com/internship/detail/unity-development-work-from-home-job-internship-at-gokapture1679376598",
      "location": "Work From Home",
      "stipend": "10,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Internship - PHP/MySQL Full-Stack Software Developer",
      "companyName": "Supernova Systems",
      "location": "Satara, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=7665feee684dcc5d&fccid=e9b6dd7819c79611&vjs=3",
      "tags": "",
      "description": "  Must have basic knowledge in PHP, MySQL, HTML/CSS, JavaScript/jQuery & AJAX.\n Must have good communication skills.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Training Program on Live Project",
      "companyName": "Trucksvilla Logistics",
      "location": "Remote in Nagpur, Maharashtra",
      "stipend": "₹10,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Trucksvilla-Logistics/jobs/Software-Development-Training-Program-Live-Project-04a4ce3ee216a6ca?fccid=3acc585df2e0bef3&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Trucksvilla logistics is arranged Training Program on Live Project.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Unico Global",
      "link": "https://internshala.com/internship/detail/react-native-development-work-from-home-job-internship-at-unico-global1678870794",
      "location": "Work From Home",
      "stipend": "4,000-7,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Backend",
      "companyName": "Greenizon Agritech Consultancy",
      "link": "https://www.naukri.com/job-listings-software-engineer-backend-jai-kisan-bangalore-bengaluru-0-to-3-years-301122501470",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": ". Should be involved to drive product design discussionsShould be working with the fron..."
    },
    {
      "site": "Internshala",
      "title": "Unity Game Development",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/unity-game-development-work-from-home-job-internship-at-idz-digital-private-limited1679036863",
      "location": "Work From Home",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501211",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Should have good financial domain knowledge of business process and solutions Manage te..."
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering (Web)",
      "companyName": "Hyperlocal Entertainment",
      "link": "https://internshala.com/internship/detail/software-development-engineering-web-internship-in-pune-at-hyperlocal-entertainment1677608007",
      "location": "Pune",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Three JS Developer",
      "companyName": "Invisible Fiction",
      "location": "Anand, Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/company/Invisible-Fiction/jobs/Three-Js-Developer-6aafd834a5765b5f?fccid=cf64c5e22a795878&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Take ownership of creating high-quality code and take care of the design, development, and bug fixing.\n Design, develop and improve viewer APIs and viewer…\n",
      "postedDate": "EmployerActive 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Optimistic Group",
      "location": "Sahibzada Ajit Singh Nagar, Ludhiana, Punjab",
      "stipend": "₹9,845 - ₹43,793 a month",
      "link": "https://in.indeed.com/company/Optimistic-Group/jobs/Software-Developer-41ebe306d4cb1875?fccid=37c8d7526edc7b19&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Be proficient in server-side development and optimization of data, including database creation and management and debugging Integrate data from various back-end…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "Buddha Education Association Incorporation",
      "link": "https://internshala.com/internship/detail/machine-learning-work-from-home-job-internship-at-buddha-education-association-incorporation1679126953",
      "location": "Work From Home",
      "stipend": "21,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Microservice Development",
      "companyName": "Indian Institute Of Technology Bombay",
      "link": "https://internshala.com/internship/detail/java-microservice-development-internship-in-mumbai-at-indian-institute-of-technology-bombay1679555116",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Blackcoffer",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-blackcoffer1679318140",
      "location": "Work From Home",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Development (Conversational AI Product)",
      "companyName": "Phamax Analytic Resources",
      "link": "https://internshala.com/internship/detail/development-conversational-ai-product-work-from-home-job-internship-at-phamax-analytic-resources1679300563",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Blackcoffer",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-blackcoffer1679117997",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Embedded Software Engineer",
      "companyName": "VerveTronics Imagineering Pvt. Ltd.",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/company/VerveTronics-Imagineering-Pvt.-Ltd./jobs/Embedded-Software-Engineer-81faa2ade721c9c2?fccid=e42404045bac4be3&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  You will be a lead developer responsible for the development of new software products and enhancements to existing products.\n Create reliable and robust designs.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "DevOps Engineer Intern - Bangalore",
      "companyName": "Guidewire Software, Inc.",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=61e2878034b162fb&fccid=be90d89fb010b0bf&vjs=3",
      "tags": "",
      "description": "  Assist with the design, deployment, and maintenance of our software applications and infrastructure.\n Good understanding of software development methodologies,…\n",
      "postedDate": "PostedPosted 16 days ago"
    },
    {
      "site": "Indeed",
      "title": "Intern Software Engineer",
      "companyName": "InsightsE",
      "location": "Remote in Raipur, Chhattisgarh",
      "stipend": "₹5,000 a month",
      "link": "https://in.indeed.com/company/Insightse/jobs/Intern-Software-Engineer-9e4a1f33f3d6add5?fccid=53a25a4cadb845d1&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Accelerated *learning environment/training* with hands on experience in building world-class SaaS products along with other associated processes around it.\n",
      "postedDate": "PostedToday"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern (Mobile Web)",
      "companyName": "Approwess Technologies",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-mobile-web-approwess-technologies-private-limited-mumbai-0-to-1-years-211020500003",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": ". . . . . As a software intern at Approwess, youll have real responsibility, real work ..."
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "Twin Reality Technologies LLP",
      "link": "https://internshala.com/internship/detail/unity-development-part-time-job-internship-at-vadodara-in-twin-reality-technologies-llp1679652839",
      "location": "Vadodara",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Applied AI (Open AI)",
      "companyName": "Persist Ventures",
      "link": "https://internshala.com/internship/detail/applied-ai-open-ai-work-from-home-job-internship-at-persist-ventures1679308211",
      "location": "Work From Home",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer I",
      "companyName": "Airasia",
      "link": "https://www.naukri.com/job-listings-software-engineer-i-airasia-india-private-limited-bangalore-bengaluru-0-to-3-years-251122502171",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Experience in writing, executing and monitoring automated test suites using a variety o..."
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "BoredLeaders Games Private Limited",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-boredleaders-games-private-limited1679543845",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Institutional Shareholder Services",
      "link": "https://www.naukri.com/job-listings-software-engineer-institutional-shareholder-services-inc-mumbai-0-to-4-years-270922501053",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Rapid design and implementation of user interfaces within constraints of a UI framework..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Marvell Semiconductors",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-marvell-india-pvt-ltd-bangalore-bengaluru-0-to-1-years-150323501993",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Studying for a Masters degree in Computer Networks, Electronics and Communication Syste..."
    },
    {
      "site": "Internshala",
      "title": "Software Engineering (Python)",
      "companyName": "InGen Dynamics Inc. (Part Of AH Dynamics And Robotics Private Limited)",
      "link": "https://internshala.com/internship/detail/software-engineering-python-internship-in-kozhikode-bangalore-at-ingen-dynamics-inc-part-of-ah-dynamics-and-robotics-private-limited1678691529",
      "location": "Kozhikode,Bangalore",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer",
      "companyName": "Atoconn System Labs",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-atoconn-system-labs-private-limited-thane-6-to-11-years-140519500126",
      "location": "Thane",
      "stipend": "Not disclosed",
      "description": "Intern Software Engineer Location: Thane (Experience : 0-0. 6 Yr) Qualification : B. E ..."
    },
    {
      "site": "Internshala",
      "title": "UAV Pilot And Test Engineering",
      "companyName": "Indian Robo Store",
      "link": "https://internshala.com/internship/detail/uav-pilot-and-test-engineering-internship-in-noida-at-indian-robo-store1679397238",
      "location": "Noida",
      "stipend": "8,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Trainee",
      "companyName": "Williams Lea",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-williams-lea-kochi-cochin-0-to-1-years-270223005265",
      "location": "Permanent Remote",
      "stipend": "4.5-5 Lacs PA",
      "description": "As a new graduate, youll have the opportunity to work alongside experienced developers ..."
    },
    {
      "site": "Indeed",
      "title": "Web Developer Internship",
      "companyName": "Tech Soft Solutions",
      "location": "Remote in Sirhind, Punjab",
      "stipend": "₹1,000 - ₹1,500 a month",
      "link": "https://in.indeed.com/company/TECH-SOFT-SOLUTIONS/jobs/Web-Developer-Internship-f0a54370786254bb?fccid=52cccbc38252f922&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  You will get proper training also, so don't hesitate to apply if you don't have any coding background.\n Currently offering \"Project Internship in Full Stack Web…\n",
      "postedDate": "Hiring ongoing"
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "Techvolt Software Private Limited",
      "link": "https://internshala.com/internship/detail/machine-learning-internship-in-multiple-locations-at-techvolt-software-private-limited1679573295",
      "location": "Coimbatore,Erode,Tirunelveli,Pollachi,Namakkal,Tiruppur,Salem,Tiruchipalli",
      "stipend": "2,500 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Front End Development (ReactJS)",
      "companyName": "Omikron Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/front-end-development-reactjs-work-from-home-job-internship-at-omikron-technologies-private-limited1679368107",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "TechGropse Private Limited",
      "link": "https://internshala.com/internship/detail/react-native-development-internship-in-noida-at-techgropse-private-limited1678773987",
      "location": "Noida",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Peppermint Communications Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-multiple-locations-at-peppermint-communications-private-limited1678771300",
      "location": "Ulhasnagar,Thane,Dombivli,Kalyan,Bhiwandi,Ambernath",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Senior Software Engineer",
      "companyName": "Securin Inc.",
      "location": "Chennai, Tamil Nadu, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  Requirements for Java DeveloperAt least 5-8 years of work experience as a Java Developer or any similar role.Experience with Object-Oriented Design. And In-depth knowledge of popular frameworks like Spring Boot, JPA, Spring Batch etc.,Familiar with SQL or Search like MySQL, and Elastic SearchExperience with large and disparate data set.Creating Web Services and RESTful services with Web API.Familiar with Open Source tools and good to have experience with Amazon Web Service (AWS).Familiar with Caching Solution like RedisGood to have Containerization skills and working with CI CD pipeline\nResponsibilities \nImplementing modernized application design and testing features before release.Hands-on experience in developing software with agile or scrum methodologies.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "3D Modelling & Texturing For Game Asset (Blender/Maya/Substance Painter)",
      "companyName": "MB Softech Consultants",
      "link": "https://internshala.com/internship/detail/3d-modelling-texturing-for-game-asset-blender-maya-substance-painter-work-from-home-job-internship-at-mb-softech-consultants1678706724",
      "location": "Work From Home",
      "stipend": "5,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Blender And Unity Development",
      "companyName": "Futuralis",
      "link": "https://internshala.com/internship/detail/blender-and-unity-development-work-from-home-job-internship-at-futuralis1679386594",
      "location": "Work From Home",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Jarvics Technologies",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-multiple-locations-at-jarvics-technologies1678873743",
      "location": "Chandigarh,Patiala,Kharar,Mohali,Kurali",
      "stipend": "8,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Trainee Email Developer - HTML/CSS",
      "companyName": "ContinuumGlobal, Inc.",
      "location": "Delhi",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=89b95143c9d5b484&fccid=d2593d14f9dfb3dc&vjs=3",
      "tags": "",
      "description": "  Understanding of UX design, Interaction design and Information Architecture design.\n Performing Email construction and coding using a combination of manual and…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Light & Wonder",
      "location": "Chennai, Tamil Nadu, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Gaming:\nWelcome to the world of land-based gaming. Light & Wonder’s gaming team builds cutting-edge technology, products, and content for the most iconic casinos and operators across the globe.\nPosition Summary\nJob Description\nSoftware Development Engineer: Plans, designs, develops and tests software systems or applications for software enhancements and new products including cloud-based or internet-related tools. Most companies should be able to match to a specific software development engineer position. Use this position if company does not breakout software development positions such as Software Engineer (Applications) (5141-5146) or Software Engineer (Systems) (5161-5166).\nSupervisory Responsibilities\nThis position has no supervisory responsibilities.\nJob Level Description\nWorks on defined tasks that sometimes require the application of independent judgment. Developing individual contributor.\nQualifications\nEducation\nBachelors degree in related field.\nYears Of Related Experience\nYears of experience 2 to 5 years\nPhysical Requirements\nThe physical demands described here are representative of those that must be met by an employee to successfully perform the essential functions of this job. Reasonable accommodations may be made to enable individuals with disabilities to perform the essential functions. While performing the duties of this job, the employee is regularly required to sit, stand, walk, bend, use hands, operate a computer, and have specific vision abilities to include close and distance vision, and ability to adjust focus working with computer and business equipment.\nWork Conditions\nScientific Games Corporation and its affiliates (collectively, “SG”) are engaged in highly regulated gaming and lottery businesses. As a result, certain SG employees may, among other things, be required to obtain a gaming or other license(s), undergo background investigations or security checks, or meet certain standards dictated by law, regulation or contracts. In order to ensure SG complies with its regulatory and contractual commitments, as a condition to hiring and continuing to employ its employees, SG requires all of its employees to meet those requirements that are necessary to fulfill their individual roles. As a prerequisite to employment with SG (to the extent permitted by law), you shall be asked to consent to SG conducting a due diligence/background investigation on you.\nThis job description should not be interpreted as all-inclusive; it is intended to identify major responsibilities and requirements of the job. The employee in this position may be requested to perform other job-related tasks and responsibilities than those stated above.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer",
      "companyName": "Coland services Private Limited",
      "location": "Trichur, Kerala",
      "stipend": "",
      "link": "https://in.indeed.com/company/Coland-services-Private-Limited/jobs/Software-Engineer-cbbc4776a672a4b7?fccid=242c13156d4aad6b&vjs=3",
      "tags": "Easily applyUrgently hiring",
      "description": "  Basic functions are do the technical maintenance of our website/webapp and he must have good sounds in - React.js , Laravel , MySQL and server setup/operations.\n",
      "postedDate": "EmployerActive 18 days ago"
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-ahmedabad-1-to-2-years-100822500741",
      "location": "Ahmedabad",
      "stipend": "Not disclosed",
      "description": "Position Requirements: . . Fresh Engineering graduate in electronics or Comp Science . ..."
    },
    {
      "site": "Internshala",
      "title": "Instructor (C,C++&Java)",
      "companyName": "Roboiotics Services LLP",
      "link": "https://internshala.com/internship/detail/instructor-c-c-java-internship-in-chandigarh-bhopal-at-roboiotics-services-llp1678864888",
      "location": "Chandigarh,Bhopal",
      "stipend": "35,000-60,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Megaminds IT Services",
      "link": "https://internshala.com/internship/detail/python-development-work-from-home-job-internship-at-megaminds-it-services1679141852",
      "location": "Work From Home",
      "stipend": "6,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Teaching (Programming: Java)",
      "companyName": "FavTutor",
      "link": "https://internshala.com/internship/detail/teaching-programming-java-work-from-home-job-internship-at-favtutor1679718401",
      "location": "Work From Home",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "Buddha Education Association Incorporation",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-work-from-home-job-internship-at-buddha-education-association-incorporation1679395505",
      "location": "Work From Home",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-noida-1-to-2-years-270123501824",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Fresh Engineering graduate in electronics or Comp Science Very good digital/analog skil..."
    },
    {
      "site": "Indeed",
      "title": "PHP Developer Intern",
      "companyName": "Orange Global",
      "location": "Remote in Noida, Uttar Pradesh",
      "stipend": "From ₹5,000 a month",
      "link": "https://in.indeed.com/company/Orange-Global/jobs/PHP-Developer-Intern-c736c86b9a3698f1?fccid=d7df0064579653c8&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Software development: 1 year (Preferred).\n Audit and check the client's website on a daily basis.\n Fix bugs and do UI changes when asked.\n",
      "postedDate": "PostedPosted 9 days ago"
    },
    {
      "site": "Naukri",
      "title": "software engineering intern",
      "companyName": "Medyug Technology",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-medyug-technology-pvt-ltd-bengaluru-bangalore-2-to-5-years-090117500589",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "MTBNG - SWINT - 01 : Internship Description: Requirements:Good knowledge of algorithmsM..."
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "7 Dots Smart Solutions (OPC) Private Limited",
      "location": "Hyderabad, Telangana",
      "stipend": "₹10,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/7-Dots-Smart-Solutions-(OPC)-Private-Limited/jobs/Web-Developer-Intern-40ee3319b7ba4d19?fccid=af8b3430c6a81f29&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Good at software engineering principles and algorithms.\n Designing and building intuitive and visually appealing user interfaces for our products using modern…\n",
      "postedDate": "EmployerActive 4 days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Anthology Inc",
      "location": "Chennai, Tamil Nadu, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Job Description\n\nSoftware Engineer\n\nChennai, India\n\nThe Opportunity\n\nAnthology offers the largest EdTech ecosystem on a global scale, supporting over 150 million users in 80 countries. Our mission is to provide dynamic, data-informed experiences to the global education community so that learners and educators can achieve their goals.\n\nWe believe in the power of a truly diverse and inclusive workforce. As we expand globally, we are committed to making diversity, inclusion, and belonging a foundational part of not only our hiring practices but who we are as a company.\n\nFor more information about Anthology and our career opportunities, please visit www.anthology.com .\n\nIn this role, you will join a motivated, creative, and energetic team that works in a flexible and agile fashion to deliver world-class products to the education market. By joining this team, you will become a core contributing member to Anthology’s EdTech Platform initiative. This future state platform will seamlessly and uniquely deliver a revolutionized learning experience through innovation, continuous delivery, and architectural integration.\n\nAs a Software Engineer, you will work in a SAFe Agile environment to deliver and build the next-generation EdTech platform. You will be developing and maintaining microservices that provide the foundation for teaching and learning core capabilities and features. A successful candidate must be comfortable with complex software development projects and be an innovative thinker capable of communicating multi-faceted technical concepts. As a direct contributor, the candidate must have a track record of achieving goals and meeting deadlines on multi-team projects, and the ability to work in an aggressive, fast-paced environment with evolving requirements. In addition to developing software, the ideal candidate can troubleshoot problems and support our production environments.\n\nWe are looking for a candidate with strong backend skills, with the willingness to expand and grow their skillset. This engineer will be working in a serverless environment on the AWS platform and should have a strong desire to learn as technologies evolve.\n\nThe Candidate\n\nRequired skills/qualifications:\n At least 3 years of experience in product development  Passion for software development (Python, Node.js)  Experience implementing Web Services (REST API) using Domain Driven Design and service-oriented architecture  Experience building in large-scale, AWS environments  Experience with AWS serverless: Lambda, DynamoDB, Event Bridge, ECS Fargate , etc.  Experience with git (GitHub), test driven development and CI/CD lifecycles  Ability to communicate effectively with technical and non-technical audiences in a global environment \n\nPreferred Skills/qualifications\n\n Experience with infrastructure as code, such as CDK (preferred), CloudFormation , or Terraform \n\nThe Office\n\nWe have an office in one of the biggest cultural, economic, and educational centers in South India: Chennai.\n Located on OMR, the IT corridor of South Chenna i  Easy access to Velachery, Thiruvanmiyur Railway station and bus stop  Very close to Tidel Park, and SRP Tools – Holiday Inn  Office provides lunch and snacks on all working days  Office is situated in 6th floor of Ascendas Phase 2 ( Crest Building)  Fun Committee, Happy Fete Team, Food Committee, and Sports Committee ensures fun at work  ISR Team actively engages employees in contributing to various local charities \n\nThis job description is not designed to contain a comprehensive listing of activities, duties, or responsibilities that are required. Nothing in this job description restricts management's right to assign or reassign duties and responsibilities at any time.\n\nAnthology is an equal employment opportunity/affirmative action employer and considers qualified applicants for employment without regard to race, gender, age, color, religion, national origin, marital status, disability, sexual orientation, gender identity/expression, protected military/veteran status, or any other legally protected factor.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Web Designer /Developer",
      "companyName": "true pharms labs llp",
      "location": "Mumbai, Maharashtra",
      "stipend": "₹9,823 - ₹34,870 a month",
      "link": "https://in.indeed.com/company/true-pharms-labs-llp/jobs/Web-Designer-63f01c76c6e65077?fccid=f5f37200c02c7fae&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidate need to design and develop website of both platform wordpress and shopify and he must have good knowledge of ecommerce too.\n",
      "postedDate": "EmployerActive 9 days ago"
    },
    {
      "site": "Indeed",
      "title": "Backend / Data Engineer Intern",
      "companyName": "LocaleAI Technologies",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=5d4944628f2afc1d&fccid=dde6c1ed8a6dfddd&vjs=3",
      "tags": "",
      "description": "  Who is a polyglot, fluent in system design principles and not in a particular language or framework.\n Your day might begin with designing a new micro-service…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development (DevOps)",
      "companyName": "Talocity InstaSolutions Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-devops-internship-in-gurgaon-at-talocity-instasolutions-private-limited1678800537",
      "location": "Gurgaon",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ASP.NET/C# Development",
      "companyName": "Go Digital Technology Consulting",
      "link": "https://internshala.com/internship/detail/aspnet-c-development-internship-in-mumbai-at-go-digital-technology-consulting1679288318",
      "location": "Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Development",
      "companyName": "Jarvics Technologies",
      "link": "https://internshala.com/internship/detail/devops-development-internship-in-chandigarh-mohali-at-jarvics-technologies1678794095",
      "location": "Chandigarh,Mohali",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Meta Soft Tech Systems Private Limted",
      "link": "https://www.naukri.com/job-listings-software-engineer-meta-soft-tech-systems-private-limted-chennai-tiruchirapalli-trichy-0-to-0-years-030323005041",
      "location": "Chennai, Tiruchirapalli/Trichy",
      "stipend": "Not disclosed",
      "description": "Bachelor s degree in CSC/ EEE / ECE with good knowledge in Core Java/ C/ C+ Knowledge o..."
    },
    {
      "site": "Internshala",
      "title": "Solidity Development",
      "companyName": "Lambda Vision",
      "link": "https://internshala.com/internship/detail/solidity-development-work-from-home-job-internship-at-lambda-vision1679394027",
      "location": "Work From Home",
      "stipend": "80 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Roblox Game Development",
      "companyName": "Stareout Games",
      "link": "https://internshala.com/internship/detail/roblox-game-development-work-from-home-job-internship-at-stareout-games1678904585",
      "location": "Work From Home",
      "stipend": "15,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Data Tagging",
      "companyName": "Salesken",
      "link": "https://internshala.com/internship/detail/data-tagging-internship-in-bangalore-at-salesken1679046415",
      "location": "Bangalore",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Ideekay Studios",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-ideekay-studios1679395315",
      "location": "Work From Home",
      "stipend": "4,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Backend Engineer",
      "companyName": "Replicon",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=442dcf193496f671&fccid=a292f3c3173416ca&vjs=3",
      "tags": "Easily apply",
      "description": "  You know how to design, explain and build a resilient, scalable, secure and observable system from scratch.\n Software development and system architecture skills …\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "The Swastik Pharmaceuticals",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-vijayawada-at-the-swastik-pharmaceuticals1679325774",
      "location": "Vijayawada",
      "stipend": "2,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Engineer- Backend (7-10 Years)",
      "companyName": "PhonePe",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=38167aef811ecff7&fccid=9efe0489759405d1&vjs=3",
      "tags": "",
      "description": "  Extensive experience in object-oriented design skills, knowledge of design patterns, and huge passion and ability to design intuitive module and class-level…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Android/Web Development",
      "companyName": "Pacy Labs Private Limited",
      "link": "https://internshala.com/internship/detail/android-web-development-internship-in-bangalore-at-pacy-labs-private-limited1678682289",
      "location": "Bangalore",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps",
      "companyName": "Zoraware Technologies",
      "link": "https://internshala.com/internship/detail/devops-internship-in-ghaziabad-at-zoraware-technologies1679057604",
      "location": "Ghaziabad",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Lead Software Engineer",
      "companyName": "Govivace Research and Software Services India Pvt...",
      "location": "Remote in Gautam Budh Nagar, Uttar Pradesh",
      "stipend": "₹25,000 - ₹1,00,000 a month",
      "link": "https://in.indeed.com/company/Govivace-Research-and-Software-Services-India-Pvt-Ltd/jobs/Lead-Software-Engineer-0775830eef4fb629?fccid=6de90ba9335d09b4&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Analyze and resolve technical issues related to software functionality and performance.\n Bachelor/master degree in respective fields like B.Tech/BSc.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "DG7",
      "location": "Andheri, Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=8dafd80079153d37&fccid=f8c80210735f15c9&vjs=3",
      "tags": "",
      "description": "  6 months / 1-year experience in web designing and development.\n Must have a passion for web design & development and an eagerness to learn more.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer (Qt)",
      "companyName": "Sciemetric Instruments Inc.",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=61aea16e5f2294bb&fccid=517635b09271cc1f&vjs=3",
      "tags": "",
      "description": "  Working with our team and through individual efforts, you will be involved in the analysis and composition of requirements, design of architectural and…\n",
      "postedDate": "PostedPosted 26 days ago"
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Apogaeis",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-apogaeis-technologies-bengaluru-bangalore-0-to-1-years-260619500926",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Business, Industry, Technology Management News, Trends, Tips Blogs for a Successful Pra..."
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering",
      "companyName": "Internshala",
      "link": "https://internshala.com/internship/detail/software-development-engineering-internship-in-gurgaon-at-internshala1679458542",
      "location": "Gurgaon",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Manual Test Engineer",
      "companyName": "cure.fit (cult.fit)",
      "location": "Bengaluru, Karnataka, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Founded in 2016 by Mukesh Bansal and Ankit Nagori , Cure.fit is a mobile app that takes a holistic approach towards health and fitness by bringing together all aspects of a healthy lifestyle on a single platform. Cure.fit offers both online and offline experiences across fitness, nutrition and mental well-being through its 4 products, i.e. Cult.fit , Eat.fit , Mind.fit & Care.fit with the aim to make fitness fun and easy\n\nAs a Quality member, you will test the applications developed by custom development. You will be involved in end-to-end processes and metrics for software testing within the organization . You will collaborate with project managers and software developers to establish reporting metrics, test scenarios, and efficiencies through manual testing and streamlining QA techniques to achieve quality objectives.\n\nThis Role Demands Someone Who Has\nAbility to work effectively in a fast-paced and changing business environment.Flexibility, adaptability, and work in minimal supervision if required are must to have to be successful in this role.\nSkills & Experience\nWell versed with testing methodologies\nMust-Have Skills\nHaving good knowledge on iOS/Android based apps testing.Highly proficient in manual testing (Different types of testing: Regression, Sanity, Smoke & Functionality related)Good at writing manual test cases with all possible scenarios.Knowledge of defect reporting & bug tracking using JiraGood in debugging skillsKnowledge of software development lifecycleGood communication skills\nGood To Have Skills\nDecent problem solving skills and ability to write code.API testingWebsite testingPrevious experience of testing e-commerce applicationsExperience working with Agile methodologiesAbility to find, file, and manage bugs, aggressively driving qualityExperienced in testing larger scale projects/ quick changes from planning to sign offMust be extremely responsive, able to work under pressure in crisis with a strong sense of urgencyAbility to independently create test data as per the requirements\nEducation And Experience\nRequires Bachelors in Engineering Degree or equivalent2-4 years minimum professional experience in testing\nKey Responsibilities\nAnalyzing the requirement from a testing perspectiveCreating test plans and writing test scriptsClosely working with the scrum master and product owner to identify the risk areasManaging the defects logged and tracking them till they get closedPerforming RCA over the defects loggedIn-depth regression testing which will cover all the components\nAt Cure.fit , our mission is to “make health easy”. Through our products and services, we want to enable people to significantly improve their overall health, reduce the risk of lifestyle diseases and enable a long, disease free life. We are deeply passionate about health, fitness, and the general well-being and are eager to leverage the power of technology to help people live healthier, happier lives.\n\nIn pursuit of this objective, we are always looking for excellent team members to fulfill the vision of building these incredible and innovative products.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Vistaar Digital Communications Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-vistaar-digital-communications-private-limited1679289070",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "DevOps Engineer",
      "companyName": "TechCrumb Solution Pvt Ltd",
      "location": "Delhi, Delhi",
      "stipend": "₹8,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/TechCrumb-Solution-Pvt-Ltd/jobs/Devop-Engineer-56386811f0628445?fccid=f2fca4e127e72f4f&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Quality control and management of the code base.\n Hands on experience with any cloud infra services like AWS.\n Designing procedures for system troubleshooting and…\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "PowerBI Development",
      "companyName": "IntelliSQR",
      "link": "https://internshala.com/internship/detail/powerbi-development-internship-in-delhi-at-intellisqr1679056219",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Funding Societies",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-funding-societies-bangalore-bengaluru-2-to-3-years-170323501999",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Currently pursuing a Bachelor s or Master s degree in Computer Science, Software Engine..."
    },
    {
      "site": "Internshala",
      "title": "Unity Game Development",
      "companyName": "Stareout Games",
      "link": "https://internshala.com/internship/detail/unity-game-development-work-from-home-job-internship-at-stareout-games1678903792",
      "location": "Work From Home",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "System Administration",
      "companyName": "Plus91 Technologies",
      "link": "https://internshala.com/internship/detail/system-administration-internship-in-patna-pune-at-plus91-technologies1678941616",
      "location": "Patna,Pune",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer - Intern (Remote/Gurgaon)",
      "companyName": "Tealfeed",
      "location": "Remote in Gurgaon District, Haryana",
      "stipend": "₹25,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=8096515b8fa9d87c&fccid=318044dbb8281914&vjs=3",
      "tags": "",
      "description": "  Understanding of state management using context or Redux.\n Building and maintaining frontend applications using Next.js.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development & Testing",
      "companyName": "InfoCentroid Software Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-testing-internship-in-indore-at-infocentroid-software-solutions-private-limited1679478309",
      "location": "Indore",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "ARAN",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-coimbatore-at-aran1679374983",
      "location": "Coimbatore",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "Sagaci Systems",
      "link": "https://internshala.com/internship/detail/unity-development-work-from-home-job-internship-at-sagaci-systems1679573482",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Associate Software Engineer",
      "companyName": "Mindfire Solutions",
      "location": "Delhi, Delhi",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=662456eeacaf16f3&fccid=5beecbf9b1fcfd6f&vjs=3",
      "tags": "",
      "description": "  Preferably with 6 months Internship done.\n Very comfortable with daily standup with clients, update daily work progress via Project Management systems, voice…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Android App Development",
      "companyName": "Shri Shyam Sawariya Parivar",
      "link": "https://internshala.com/internship/detail/android-app-development-work-from-home-job-internship-at-shri-shyam-sawariya-parivar1678856251",
      "location": "Work From Home",
      "stipend": "Unpaid",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Flutter Developer (Software Engineer, Fresher)",
      "companyName": "Square Infosoft",
      "location": "Surat, Gujarat",
      "stipend": "₹14,000 - ₹17,000 a month",
      "link": "https://in.indeed.com/company/Square-Infosoft/jobs/Flutter-Developer-1fcdf4c86eda6b03?fccid=0d9930d2de22e1b3&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Independently write quality code that is simple, reliable, and scalable.\n Passionate about writing high-quality code.\n Detect and troubleshoot application issues.\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer ( Backend , 3-5years)",
      "companyName": "PhonePe",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=698baa9da6abb8dd&fccid=9efe0489759405d1&vjs=3",
      "tags": "",
      "description": "  Extensive experience in object-oriented design skills, knowledge of design patterns, and huge passion and ability to design intuitive module and class-level…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501577",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Work with infra team to get desired configuration done for various initiatives undertak..."
    },
    {
      "site": "Indeed",
      "title": "Augmented Reality Developer",
      "companyName": "Medical Innovation Creativity and Entrepreneurship...",
      "location": "Mumbai, Maharashtra",
      "stipend": "From ₹10,000 a month",
      "link": "https://in.indeed.com/company/M.I.C.E-Labs/jobs/Augmented-Reality-Developer-0ad5f9764505f9bd?fccid=009eb4865aebbf60&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Experienced in working in a collaborative environment.\n Experienced in using *UI/UX designing,* *Unity Engine, Vuforia, Autodesk Maya, Blender *etc.\n",
      "postedDate": "PostedPosted 26 days ago"
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Zezo Softwares Private Limited",
      "link": "https://internshala.com/internship/detail/react-native-development-work-from-home-job-internship-at-zezo-softwares-private-limited1679129798",
      "location": "Work From Home",
      "stipend": "7,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Testing Engineer (Intern) - Web & Mobile",
      "companyName": "Shujabits Infotech Solutions",
      "link": "https://www.naukri.com/job-listings-software-testing-engineer-intern-web-mobile-shujabits-infotech-solutions-navi-mumbai-0-to-1-years-210323911629",
      "location": "Navi Mumbai",
      "stipend": "Not disclosed",
      "description": "RequirementsSKILLS AND EXPERIENCE REQUIRED FOR THIS ROLE:Excellent analytical ability.A..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern, Core Infrastructure",
      "companyName": "Poshmark",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-core-infrastructure-poshmark-chennai-0-to-1-years-230223501382",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": ". . . . . Our goal is to give you exposure to a range of development techniques and cur..."
    },
    {
      "site": "Indeed",
      "title": "WordPress Web Developer Intern",
      "companyName": "Globify Offshoring Services Pvt Ltd",
      "location": "Mumbai, Maharashtra",
      "stipend": "₹7,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Globify-Offshoring-Services-Pvt-Ltd/jobs/Wordpress-Web-Developer-Intern-5b05f42f0e4a9183?fccid=01bbdb225ee7c414&vjs=3",
      "tags": "Easily applyUrgently hiring",
      "description": "  Create websites on WordPress, Wix, etc.\n Focus on content writing for websites, logo making and other miscellaneous tasks.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "DevOps Engineer Intern",
      "companyName": "MethodHub Software Pvt. Ltd.",
      "location": "Sahibzada Ajit Singh Nagar, Ludhiana, Punjab",
      "stipend": "₹80,000 - ₹1,00,000 a year",
      "link": "https://in.indeed.com/company/MethodHub-Software-Pvt.-Ltd./jobs/Devop-Engineer-Intern-a97b4be7e79720d9?fccid=95408dc6d5b27532&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Out- of- the- box thinking and strong analytical skills with ability to conduct research, data analysis, and resolve complex problems is a prerequisite for this…\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "RevoltronX",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-revoltronx1678937521",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern/Fresher",
      "companyName": "SpherePlugins",
      "location": "Surat, Gujarat",
      "stipend": "₹3,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/HSquare-Technology/jobs/Python-Developer-Intern-Fresher-161b6cb765f3663c?fccid=0ee844c47c37757f&vjs=3",
      "tags": "Easily applyResponsive employer",
      "description": "  Writing scalable code using Python programming language.\n SpherePlugins.com* is a product-based company, primarily focused on web plugins, is looking for a…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer",
      "companyName": "TrustIn Software Services",
      "location": "Remote in Koramangala, Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=99edbb64f47f0d15&fccid=e34c1701eb9476dd&vjs=3",
      "tags": "",
      "description": "  B. Proficiency in using various technical tools,.\n POSH (Prevention of Sexual Harassment) implementation alongside unbiased employee support.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "IESoft Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-iesoft-technologies-private-limited1679649668",
      "location": "Mumbai",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developers",
      "companyName": "eCloudChain",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=4b920a196bb0d253&fccid=496764eaefc42796&vjs=3",
      "tags": "",
      "description": "  Develop web-based solutions using modern technologies, like React, Gatsby, and Graphql.\n Build POCs, MVPs & Production solutions for various business use-cases.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Jr./Mid Java Developer",
      "companyName": "WovV Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=3534b8f88ab1e1ec&fccid=5c4ea3c30ac35dd5&vjs=3",
      "tags": "",
      "description": "  Basic knowledge of TDD/BDD based frameworks like JUnit 4/Jmeter etc.\n Min 3 months of internship project completed.\n Knowledge in Redis (good to have).\n",
      "postedDate": "PostedPosted 10 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer and Designer",
      "companyName": "Employee Hub LLP",
      "location": "Remote",
      "stipend": "₹6,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Employee-Hub-LLP/jobs/Web-Developer-Designer-9d8df7db2f5a0be4?fccid=1626d5f6857f1e6c&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Should have worked with design/creative/UX team.\n Web design: 1 year (Preferred).\n Skills : Wordpress, Woocommerce, Shopify, Magento, PHP, MySQL, Open cart,…\n",
      "postedDate": "PostedPosted 17 days ago"
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Laurus Software Technologies",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-laurus-software-technologies-pvt-ltd-mumbai-0-to-1-years-301018501357",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Trainee Software Engineer"
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-work-from-home-job-internship-at-attitude-matterz1679220470",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Experience Web Developer Required",
      "companyName": "Hilt Web Solutions Pvt Ltd.",
      "location": "Kharar, Punjab",
      "stipend": "₹30,000 - ₹60,000 a month",
      "link": "https://in.indeed.com/company/Hilt-Web-Solutions/jobs/Experience-Web-Developer-f1906260f55b1304?fccid=25a2f91439aacb82&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Walk in / direct interview Monday to Saturday in between 11:00 AM- 5:00 PM.\n Job Types: Full-time, Fresher, Internship, Regular / Permanent.\n",
      "postedDate": "EmployerActive 9 days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Quantum IT Innovation",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-quantum-it-innovation1679394761",
      "location": "Work From Home",
      "stipend": "8,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "MunshiG",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-work-from-home-job-internship-at-munshig1679634771",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Backend Developer",
      "companyName": "Iraitech Innovations & Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=f7822b2dfba91c87&fccid=fdaa58151e4522ef&vjs=3",
      "tags": "",
      "description": "  Looking for a Python / Django Intern, who have intermediate to advance level hands-on knowledge on Django 2.x or 3.x.\n Perform debugging for software defects.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Xrevol Technologies Private Limited",
      "location": "Bengaluru, Karnataka",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Xrevol-Technologies-Private-Limited/jobs/Python-Developer-Intern-1aa15d3ecf58c994?fccid=faa4c655042a0fed&vjs=3",
      "tags": "Easily applyResponsive employer",
      "description": "  Develop and implement face and object recognition tools and software using GO.\n Develop and maintain Python-based applications using one or more Python web…\n",
      "postedDate": "EmployerActive 8 days ago"
    },
    {
      "site": "Internshala",
      "title": "Automation Testing",
      "companyName": "ExactSpace",
      "link": "https://internshala.com/internship/detail/automation-testing-internship-in-bangalore-at-exactspace1679763378",
      "location": "Bangalore",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Robotic Instructing",
      "companyName": "Rancho Labs",
      "link": "https://internshala.com/internship/detail/robotic-instructing-internship-in-delhi-at-rancho-labs1679286408",
      "location": "Delhi",
      "stipend": "8,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer-  Intern",
      "companyName": "Blueberry Digital Labs",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-blueberry-labs-hyderabad-secunderabad-2-to-4-years-290416500459",
      "location": "Hyderabad",
      "stipend": "Not disclosed",
      "description": "Company Description Blueberry Digital Labs (www. blueberrylabs. com) is a leading young..."
    },
    {
      "site": "Indeed",
      "title": "Trainee Software Engineer",
      "companyName": "Oriental Outsourcing Consultants Pvt. Ltd",
      "location": "Kharar, Punjab",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Oriental-Outsourcing-Consultants-Pvt.-Ltd/jobs/Trainee-Software-Engineer-b946652f97a9f606?fccid=ebbe72ce873223cf&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  After Completion of one year training the Salary Package will be 3-5 lakhs per annum (based on performance).\n An ability to communicate and work in a team.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Website Developer",
      "companyName": "Chat360.io",
      "location": "Pune, Maharashtra",
      "stipend": "₹15,000 - ₹25,000 a month",
      "link": "https://in.indeed.com/company/Chat360.io/jobs/Website-Developer-fc31e0625f51069f?fccid=830cd5fcb3f9e8cd&vjs=3",
      "tags": "Easily apply",
      "description": "  Write well designed, testable, efficient code by using best software development practices.\n Create and maintain software documentation.\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Net Developer",
      "companyName": "PieCode Infotech",
      "location": "Surat, Gujarat",
      "stipend": "₹11,355 - ₹44,296 a month",
      "link": "https://in.indeed.com/company/Piecode-InfoTech/jobs/Net-Developer-4819f0696d71b965?fccid=95fb95d39ec6c271&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Responsible for all traditional development activities like analysis, design, coding, testing, and documentation.\n Impressive hands-on experience in .\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Simbo.ai",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-simbo-ai-bengaluru-bangalore-0-to-1-years-250320501368",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Must know programming and scripting under Linux Must be able to spend at least 2 months..."
    },
    {
      "site": "Indeed",
      "title": "Mobile App Developer",
      "companyName": "Rivan Solutions",
      "location": "Secunderabad, Telangana",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=b63fc7699a17d441&fccid=72c6b1c217ab48d5&vjs=3",
      "tags": "",
      "description": "  Working with client and server-side.\n Working on the development of new applications on Flutter.\n Working on existing applications on Flutter.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Front End Developer",
      "companyName": "Pandora Finance",
      "location": "Remote in Delhi, Delhi",
      "stipend": "₹2,88,788 - ₹13,49,718 a year",
      "link": "https://in.indeed.com/company/Pandora-Finance/jobs/Front-End-Developer-2e4d7029bbb3df27?fccid=7a0977da7f191058&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Work with the design team to examine several approaches to problem-solving while assessing implementation intricacy, user experience, and product impact.\n",
      "postedDate": "EmployerActive 12 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "BYTE TECH COMPUTERS",
      "location": "Remote in Tiruppatur, Tamil Nadu",
      "stipend": "₹10,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/BYTE-TECH-COMPUTERS/jobs/Web-Developer-4b7ecfb9c17a8d6d?fccid=ffa9f89df1f8c4ba&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Know HTML, CSS, JavaScript, PHP, and other relevant web design coding languages.\n A *web designer*/*developer* is responsible for the *design*, layout and coding…\n",
      "postedDate": "PostedJust posted"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Protegrity",
      "location": "Mumbai, Maharashtra, India, Remote",
      "description": "About the job\n        \n\n\n        \n                  The global data privacy software market is projected to grow from $2.36 billion in 2022 to $25.85 billion by 2029.\nSo, if you are searching for an innovative career, then the cybersecurity industry might just be the one for you. Protegrity, an international provider of data protection solutions, is looking for new team members who want to make an impact in a company that prioritizes something we all care about: our privacy.\nWe need people who recognize the opportunity, can plan effectively, take action and execute in the enterprise marketplace with our intuitive, diverse, and future-forward global teams.\nSo, are you up for collaborating with the best in data security?\nJoin us on this journey and make an impact with one of the top 25 global software providers. We look forward to making our world become a better place with you on our team.\nApply and discover what’s next today!\nAs a software engineer with Protegrity’s talented product development team you will contribute to cutting-edge research, development and feature design/implementation in a fast-paced Agile environment. This position is perfect for smart technical individuals who enjoy building technology, working in a team of talented engineers and being part of end-to-end product delivery life cycle.\nTo qualify, you should have 3-5 years of relevant experience in developing & integrating scalable solutions. You should be highly versatile with full stack application programming and software application design concepts and aware with the latest trends in technology.\nResponsibilities may include but not be limited to\n Contribute to continuous development, enhancement and maintenance of existing and new products/features Contribute to appropriate software development methods, standards, tools to achieve well engineered outcome. Ability to work independently by applying development practices used by the team/organization including usage of design patterns, frameworks, programming/debugging environments, IDEs etc. Participating in Agile practices of the team/organization as an individual contributor and a team player. Adaptability to learn and enhance skills in the domain of data security alongside the product’s technical environment (like OS, cloud technology, container orchestration, native programming language of the environment, hardware etc.) Ability to review work of peer engineers/juniors alongside being an individual contributor. Excellent collaboration abilities within and across teams for technical requirements and product module dependencies. Ability to be a good team player and soft skilled person.\nIn addition to the qualifications a successful candidate will demonstrate\n 3+ years post-bachelor’s degree experience as software engineer in developing & integrating big data and/or cloud solutions. Knowledge on modern scalable/elastic systems in cloud like Databricks/ HDInisghts/ Dataflow/ Cloudera Data Platform/Big Query/Synapse etc. Any or multiple is desirable. Knowledge of large-scale SQL engines like Hive, Presto, SparkSQL etc. Experience on any or multiple of programming languages like Java/Python/Go/C++ Knowledge of Public Cloud technologies like AWS/GCP/Azure Understanding of containerized platforms like Kubernetes or Openshift Specifying, Designing, implementing and debugging high-performance Big Data and Cloud systems Experience on Linux OS and Shell Scripting Capability to specify, design, implement, debug and profile high-performance web application software. Should be strong at debugging, troubleshooting, profiling own’s code as well as reviewing that of peers. Sufficient knowledge of office productivity tools to represent formal exchange of technical content communication. Excellent verbal and written communication skills along with good rapport and collaboration with teammates within the team.\nGood to have skills -\n Knowledge of operating systems and concepts. Linux & Windows is the preference. Knowledge of creating and operating any multi node cluster like Hadoop. Knowledge of creating and operating any containerized platform like Kubernetes in cloud Knowledge of software performance measurements and tuning Understanding of software security requirements and associated standards like NIST, OWASP, PCI-DSS etc. Has gone through a devops cycle, CI/CD pipelines and software test automations. Knowledge of cryptography and cryptographic algorithms Knowhows of Agile process for product delivery.\nPreferred Qualifications\n Background to computer science and systems Experience on Java & Python programming language Knowledge of Public Cloud technologies like AWS/GCP/Azure Knowledge on modern scalable/elastic systems in cloud like Databricks/ HDInisghts/ Dataflow/ Cloudera Data Platform(CDP)/Big Query/Synapse etc. Any or multiple is desirable.\nWe offer a competitive salary and comprehensive benefits with generous vacation and holiday time off. All employees are also provided access to ongoing learning & development.\nEnsuring a diverse and inclusive workplace is our priority. We are committed to an environment of acceptance where you are free to bring your full self to work. All qualified applicants and current employees will not be discriminated against on the basis of race, color, religion, sex, sexual orientation, gender identity, age, national origin, disability or veteran status.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Trainee  SQL/PostgreSQL",
      "companyName": "Impact Analytics",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-sql-postgresql-impact-analytics-bangalore-bengaluru-0-to-1-years-150323003900",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Working towards or currently possess a bachelors degree from a four-year college or uni..."
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Analystt.ai",
      "link": "https://internshala.com/internship/detail/python-development-work-from-home-job-internship-at-analysttai1679119789",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Senior Software Engineer - Consul (Service Mesh)",
      "companyName": "HashiCorp",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=d8ee39df7d59c107&fccid=044076f542c2a482&vjs=3",
      "tags": "Easily apply",
      "description": "  Empathy for the people operating, learning, teaching and supporting software you write, and consider their experience when making design decisions and…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Wordpress Developer",
      "companyName": "Astha Technology Solution Pvt Ltd",
      "location": "Surat, Gujarat",
      "stipend": "₹10,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/company/Astha-Technology-Solution-Pvt-Ltd/jobs/Wordpress-Developer-1314c973b4f1d5fe?fccid=56d74c877d4084b2&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  WordPress front-end development using HTML, CSS, JavaScript, jQuery to create user-friendly web pages.\n You will work closely with our design and development…\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Internshala",
      "title": "QT Development",
      "companyName": "CSE, IIT Bombay",
      "link": "https://internshala.com/internship/detail/qt-development-work-from-home-job-internship-at-cse-iit-bombay1679025603",
      "location": "Work From Home",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development (Photogrammetry)",
      "companyName": "Alecado Systems",
      "link": "https://internshala.com/internship/detail/game-development-photogrammetry-work-from-home-job-internship-at-alecado-systems1679692635",
      "location": "Work From Home",
      "stipend": "3,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Reflexion.ai",
      "location": "Pune, Maharashtra",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Reflexion/jobs/Python-Developer-Intern-0a4eee7f91c5b9d1?fccid=859cad851543c688&vjs=3",
      "tags": "Easily apply",
      "description": "  Fluent in English, good communication skills and ability to work in a team.\n Data science model, code refactoring and optimization, containerization, deployment,…\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Naukri",
      "title": "Associate Software Engineer",
      "companyName": "S&P Global Inc.",
      "link": "https://www.naukri.com/job-listings-associate-software-engineer-s-p-global-inc-hyderabad-secunderabad-0-to-2-years-230323502501",
      "location": "Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "Willing to work in 24*5 environment on rotational shifts Basic knowledge of Linux / Win..."
    },
    {
      "site": "Internshala",
      "title": "Embedded Software Developement",
      "companyName": "Greenmed Technologies",
      "link": "https://internshala.com/internship/detail/embedded-software-developement-part-time-job-internship-at-chennai-in-greenmed-technologies1678338757",
      "location": "Chennai",
      "stipend": "3,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern - Python",
      "companyName": "Logicplum",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-python-logicplum-trivandrum-thiruvananthapuram-0-to-2-years-071221500332",
      "location": "Trivandrum/Thiruvananthapuram",
      "stipend": "Not disclosed",
      "description": "Working with team members to help develop optimal approaches to provide good architectu..."
    },
    {
      "site": "Indeed",
      "title": "Software Developer I/II - Intern",
      "companyName": "Agnik",
      "location": "India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ac56a9fb539aafce&fccid=0ad80630a67215ca&vjs=3",
      "tags": "Easily apply",
      "description": "  The interns will be involved in + Design, implementation and testing of data stream mining algorithms for embedded and distributed systems + Design, development…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Angular, React & HTML Developer",
      "companyName": "Artificial Reality",
      "location": "Navi Mumbai, Maharashtra",
      "stipend": "₹15,000 - ₹50,000 a month",
      "link": "https://in.indeed.com/company/Artificial-Reality/jobs/Angular-0404e1ede41edf1c?fccid=4a405283c06583fa&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  We are looking for an Freshers HTML developer to oversee the design, coding, and implementation of website projects.\n Strong knowledge of HTML & CSS Design.\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Internshala",
      "title": "Quality Assurance",
      "companyName": "Times Internet",
      "link": "https://internshala.com/internship/detail/quality-assurance-internship-in-noida-at-times-internet1679717298",
      "location": "Noida",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Site Galleria",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-site-galleria1678949258",
      "location": "Work From Home",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "ANK Digital Media",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-delhi-at-ank-digital-media1679395610",
      "location": "Delhi",
      "stipend": "3,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Logical Soft Tech",
      "link": "https://internshala.com/internship/detail/software-development-part-time-job-internship-at-indore-in-logical-soft-tech1679489254",
      "location": "Indore",
      "stipend": "8,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Suvya Web",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-surat-at-suvya-web1679287715",
      "location": "Surat",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Tetcos",
      "link": "https://www.naukri.com/job-listings-software-engineer-tetcos-bangalore-bengaluru-0-to-2-years-240323003731",
      "location": "Bangalore/Bengaluru",
      "stipend": "3.75-5.5 Lacs PA",
      "description": "Candidates with the following educational background. BTech, Computer Science only from..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer, developer / Programmer, 2022 graduate Can also appl",
      "companyName": "Creative Hands HR",
      "link": "https://www.naukri.com/job-listings-software-engineer-developer-programmer-2022-graduate-can-also-appl-creative-hands-hr-hyderabad-secunderabad-chennai-bangalore-bengaluru-0-to-1-years-261222001008",
      "location": "Temp. WFH - Hyderabad/Secunderabad, Chennai, Bangalore/Bengaluru",
      "stipend": "5-7 Lacs PA",
      "description": "Software Programmer / Developer Qualification- Diploma, BE / BTech IT, CSE, BCA, MCA, B..."
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer_Intern",
      "companyName": "EY",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=9faac7cd284dac0e&fccid=1544766d4c2915b0&vjs=3",
      "tags": "",
      "description": "  An ability to quickly understand complex concepts and use technology to support data modeling, analysis, visualization, or process automation.\n",
      "postedDate": "PostedPosted 20 days ago"
    },
    {
      "site": "Internshala",
      "title": "Notion Application Expert",
      "companyName": "Kishorchandra Kalyanji Agri LLP",
      "link": "https://internshala.com/internship/detail/notion-application-expert-part-time-job-internship-at-mumbai-in-kishorchandra-kalyanji-agri-llp1678586865",
      "location": "Mumbai",
      "stipend": "8,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "Pyther Innovations Private Limited",
      "location": "Ahmadabad, Gujarat",
      "stipend": "₹8,000 - ₹25,000 a month",
      "link": "https://in.indeed.com/company/Pyther-innovations-Private-Limited/jobs/Web-Developer-8dfdce1f8053cd82?fccid=d2040e51f898267c&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Final Technical + HR Round.\n We are a trusted Digital Engineering partner, with deep technical expertise and industry experience to create unique offerings to…\n",
      "postedDate": "PostedPosted 14 days ago"
    },
    {
      "site": "Internshala",
      "title": ".NET Support",
      "companyName": "P.I. Softek Limited",
      "link": "https://internshala.com/internship/detail/net-support-internship-in-noida-at-pi-softek-limited1678337350",
      "location": "Noida",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Backend Developer",
      "companyName": "Iraitech Innovations & Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=f7822b2dfba91c87&fccid=fdaa58151e4522ef&vjs=3",
      "tags": "",
      "description": "  Looking for a Python / Django Intern, who have intermediate to advance level hands-on knowledge on Django 2.x or 3.x.\n Perform debugging for software defects.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "PHP Web Development",
      "companyName": "Sensor Equation",
      "link": "https://internshala.com/internship/detail/php-web-development-work-from-home-job-internship-at-sensor-equation1678673584",
      "location": "Work From Home",
      "stipend": "4,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "GPMS Technology Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-delhi-at-gpms-technology-private-limited1679718418",
      "location": "Delhi",
      "stipend": "3,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "POC Development",
      "companyName": "Astute Lex Servicado Private Limited",
      "link": "https://internshala.com/internship/detail/poc-development-work-from-home-job-internship-at-astute-lex-servicado-private-limited1678445917",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer / Trainees",
      "companyName": "venuebookingz.com",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainees-venuebookingz-com-bengaluru-bangalore-0-to-2-years-310118501365",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Full time in Benguluru only Must be comfortable working in fuzzy environments- where bo..."
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Yougetplaced Technology Services",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-yougetplaced-technology-services1678288130",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Functional QA - Capital Market",
      "companyName": "NatWest Group",
      "link": "https://internshala.com/internship/detail/functional-qa-capital-market-internship-in-bangalore-at-natwest-group1678959216",
      "location": "Bangalore",
      "stipend": "45,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Etasens Technologies",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-etasens-technologies-chandigarh-0-to-1-years-100120500470",
      "location": "Chandigarh",
      "stipend": "Not disclosed",
      "description": "Minimum Qualifications : Should have an Engineer degree/final semester. Core Technologi..."
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "CvDragon India",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-kolkata-howrah-at-cvdragon-india1678773774",
      "location": "Kolkata,Howrah",
      "stipend": "7,500 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "SHN Advertising",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-kanpur-at-shn-advertising1679118633",
      "location": "Kanpur",
      "stipend": "4,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "NovusArk",
      "location": "Vadodara, Gujarat",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/NovusArk/jobs/Web-Developer-Intern-7de2912cc7f187d5?fccid=d3cfa09a2fc2f348&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Knowledge of anything else is an added benefit.\n Familiarity with front-end technologies (HTML5, CSS, JavaScript, bootstrap).\n Find and suggest good UI designs.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer",
      "companyName": "Helius Technologies",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=fd38d2303584de32&fccid=b3282c125f18e0c0&vjs=3",
      "tags": "",
      "description": "  Optional Onboarding Training Program: We have a dedicated 3- to 6- month onboarding program to help front-end engineers learn the basics of front end-to-end…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern, iOS",
      "companyName": "Poshmark",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-ios-poshmark-chennai-0-to-1-years-201222500547",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": "Over 12 weeks the intern can expect to become deeply involved in learning the tech stac..."
    },
    {
      "site": "Indeed",
      "title": "Web Designer & Developer",
      "companyName": "Indium 3D Printers",
      "location": "Remote in Gurgaon District, Haryana",
      "stipend": "₹10,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/Indium-3D-Printers/jobs/Web-Designer-Developer-e3f98e45bd1921db?fccid=51b3b098425cc330&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Write well designed, testable, efficient code by using best software development practices.\n We are looking for an outstanding Web Developer to be responsible…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Emerson",
      "location": "Maharashtra, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Job Description\n\nExperience and Skillset\n Minimum of 2 years in AngularJS  Proven experience as a core developer/programmer in a team of size 2-5.  Proficient in Angular, JavaScript (ES6), HTML5 and CSS3.  Knowledge of multiple back-end languages: Java-Spring Boot, C# (.net core) & JavaScript frameworks (Node.js)  Understanding and knowledge of programming fundamentals - Clean Code concepts, Object Oriented Design, unit testing etc.  Experience developing RESTful web services (creation, consumption, integration).  Proficient in at least one database technology like MS SQL, MySQL, PostgreSQL, or MongoDB.  Knowledge of Git version control, DevOps is a plus  Experience as a Developer in Agile projects.  Ability to code for multiple projects at a time  Ability to understand the business requirements, system architecture and process guidelines  Ability to tackle ambitious problems and work independently as well as part of a team.  Ability to handle end to end projects on individual basis  Knowledge of web and mobile UX/UI technologies and architectures.  Experience developing front-end client applications using the latest techniques such as Angular.js/JavaScript/HTML5/CSS3 front-end code across both web and mobile projects.  Understand when mobile web apps are appropriate, as opposed to native applications.  Responsibilities\n Coding, unit testing and fixing bugs or other coding issues.  Ability to code for complex requirements under tight timelines  Ability to work with cross functional / domain teams  Work in a fast-paced and agile development environment  Work with development teams and Solutions Architect to ideate software solutions.  Building front-ends for coded applications through using visual designs.  Develop and manage well-functioning databases and applications.  Write effective APIs.  Unit test to ensure responsiveness and efficiency.  Troubleshoot, debug and upgrade software.  Build features and applications with a mobile responsive design  Write technical documentation.  Work with data scientists and analysts to improve software.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer",
      "companyName": "Neemtree Internet Private Limited",
      "location": "Remote in Mumbai, Maharashtra",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Neemtree-Internet-Private-Limited/jobs/Full-Stack-Developer-c9dc69420ee7c61d?fccid=28b72343c33ae022&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Ii) Are you actively coding in Data structures and Algorithms using C or C++, If not, please specify the programming languages which you use.\n",
      "postedDate": "EmployerActive 5 days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Settyl",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-settyl1678299992",
      "location": "Work From Home",
      "stipend": "6,000-8,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "SailPoint",
      "location": "Maharashtra, India, ",
      "description": "About the job\n        \n\n\n        \n                  SailPoint is seeking a Backend Software Engineer to help build a new cloud-based SaaS identity analytics product. We are looking for well-rounded backend or full stack engineers who are passionate about building and delivering reliable, scalable microservices and infrastructure for SaaS products. This is a unique opportunity to build something from scratch but have the backing of an organization that has the muscle to take it to market quickly, with a very satisfied customer base. \n\nResponsibilities Deliver efficient, maintainable, robust Java based microservices. Produce designs and rough estimates, and implement features based on product requirements. Collaborate with peers on designs, code reviews, and testing. Produce unit and end-to-end tests to improve code quality and maximize code coverage for new and existing features. \n\nRequirements 2 to 5 years Expert in Core Java Web Service architectureSOAP & REST based Experience in any Databases like Oracle, MSSQL and Sybase Good hands-on experience on XMLJSON Experience in Any Application server - Tomcat, JBoss, Weblogic ,WebSpherStrong Java experience Great communication skills BS in Computer Science, or a related field Proficient experience with object-oriented analysis and design skills Proficient experience with an object-oriented programming language and techniques Proficient understanding of Java Frameworks \n\nPreferred Experience with AWS Exposure to Cloud ServicesExperience with Continuous Delivery UI technologies – Web Tool Kits like ExtJSExperience instrumenting code for gathering production performance metrics Design Patterns and usage\n\nSailPoint is an equal opportunity employer and we welcome everyone to our team. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or veteran status.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Gegnat Yards Pvt Ltd",
      "link": "https://internshala.com/internship/detail/net-development-part-time-job-internship-at-nagpur-in-gegnat-yards-pvt-ltd1678513004",
      "location": "Nagpur",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Data Validation",
      "companyName": "Accrete LLC",
      "link": "https://internshala.com/internship/detail/data-validation-internship-in-mumbai-at-accrete-llc1679559835",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Java Developer",
      "companyName": "Quantum Designs",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=862e48215358750d&fccid=79835d6fd024402d&vjs=3",
      "tags": "Easily apply",
      "description": "  Good understanding and hands-on experience with databases such as MySQL, Postgres etc.\n Fundamental knowledge on design patterns.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "SkillBoard",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-skillboard1679613658",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ROS (Robotics Operating System)",
      "companyName": "Enord Private Limited",
      "link": "https://internshala.com/internship/detail/ros-robotics-operating-system-internship-in-delhi-at-enord-private-limited1678798659",
      "location": "Delhi",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Softonauts Infotech Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-multiple-locations-at-softonauts-infotech-private-limited1678444821",
      "location": "Thane,Navi Mumbai,Badlapur,Vashi",
      "stipend": "5,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "MERN Web Stack Developer",
      "companyName": "vInnovate Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=1383ec912f2d85c8&fccid=3afe1e53dbe9293a&vjs=3",
      "tags": "",
      "description": "  HTML5, CSS, Bootstrap, JavaScript, ReactJS, NodeJS, MySQL, MongoDB,Exposure to Agile, DevOps, Cloud will be added advantage.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI) & Deep Learning",
      "companyName": "Stackfusion Private Limited",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-deep-learning-internship-in-pune-at-stackfusion-private-limited1679292792",
      "location": "Pune",
      "stipend": "10,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ASP.NET Development",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/aspnet-development-work-from-home-job-internship-at-attitude-matterz1679248165",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Devops Engineer ( Internship )",
      "companyName": "FloBiz",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=5b8de4d87df035ec&fccid=713f7635249577f0&vjs=3",
      "tags": "",
      "description": "  Excellent organizational and time management skills, and the ability to work on multiple projects at the same time.\n Awareness of DevOps and Agile principles.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Embedded Systems Software Development",
      "companyName": "NEE VEE Technologies",
      "link": "https://internshala.com/internship/detail/embedded-systems-software-development-internship-in-chennai-at-nee-vee-technologies1678541229",
      "location": "Chennai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Senior Software Engineer (Backend)",
      "companyName": "Meltwater",
      "location": "Coimbatore, Tamil Nadu, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  Meltwater offers comprehensive media monitoring and analysis across online news, print, broadcast, podcasts, and social media, capturing more content and conversations than anyone else in the industry.\n\nThe team consists of 12 engineers organized as 3 pods distributed between India and Europe. The team is responsible for all NLP operations at Meltwater, serving more than 15B inferences per day across 200 languages and 10+ NLP tasks. Our tech stack is: AWS, Kubernetes, Terraform, TensorFlow, Python, and Java.\n\nThe team is seeking a Senior Software Engineer (with DevOps experience) who wants to grow in an organization based on collaboration across team and country boundaries. With the massive production scale of our systems, small decisions you make may have a big impact on our product and our many customers.\n\nOur culture is based on a fundamental belief in people with a passion for learning new things and a desire to help those around you. We are strong believers in team autonomy, DevOps culture and continuous delivery. Meltwater development teams fully own and operate their subsystems, infrastructure, and run on-call rotations.\n\nRequirements\nAt least 4 years’ experience in Software Engineering and DevOps. Proficient in Java with strong knowledge of JVM internals. Working knowledge of Python Understanding of AWS services for distributed data and message processing (e.g., Route53, S3, SQS, Athena, EC2) Demonstrable knowledge and skills with Kubernetes Deployment or operationalizing large-scale distributed data processing systems Terraform and Apache Kafka experience is a bonus.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501215",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Any Graduate with good technical knowledge (PLSQL) An experience of more than 3 yearsEx..."
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Red Apple Learning",
      "link": "https://internshala.com/internship/detail/game-development-internship-in-kolkata-at-red-apple-learning1679464193",
      "location": "Kolkata",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Embedded C Software Engineer",
      "companyName": "DDSat Technologies Private Limited",
      "location": "Remote in Ghaziabad, Uttar Pradesh",
      "stipend": "From ₹10,000 a month",
      "link": "https://in.indeed.com/company/DDSat-Technologies-Private-Limited/jobs/Embedded-C-Software-Engineer-83b64e690f91ba6a?fccid=0f152e708378aa53&vjs=3",
      "tags": "Easily apply",
      "description": "  LCD, Matrix keypad, Menu-tree based functions, Automation of Motors.\n Qualification: Engineering Student / BE/BTECH with formal certification of Embedded C…\n",
      "postedDate": "PostedPosted 16 days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Light & Wonder - iGaming",
      "location": "Bengaluru, Karnataka, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  Company Description\n\nLight & Wonder is the global leader in cross-platform games and entertainment. We build new worlds of play, game experiences loved by players around the globe, powered by the world's largest and most trusted ecosystem. We are creators who are passionate about delivering the best digital experiences to players.\n\nThe iGaming division has undergone a period of transformation over the past 12 months and today employs 1,100 employees across the globe, serving over 200 customers with more than 3,000 games worldwide. We have recently acquired 4 businesses and are an exciting, fast paced journey ahead. We have a strong people-based culture, which encourages everyone to be bold, own opportunities and strive to build better, in everything we do.\n\nAdditional Information\n\nWhy would you enjoy working with us at Light & Wonder?\nCompetitive benefits, an open and supportive environment as well as a modern and exciting workplaceThe opportunity to interact with global teams on a regular basisTangible and genuine development - at Light & Wonder, you can take your career where you want it to go!\n\nAnd if that’s not enough; you will get to enjoy a stunning work location and flexible working practices whilst we provide you with the guidance and development skills you need to progress quickly and enhance your career.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "Software Development (DevOps)",
      "companyName": "Eurth Techtronics Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-devops-internship-in-hyderabad-at-eurth-techtronics-private-limited1678972507",
      "location": "Hyderabad",
      "stipend": "2,000-4,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Parrami Finance Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-parrami-finance-private-limited1679133330",
      "location": "Mumbai",
      "stipend": "5,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Development Engineer 1",
      "companyName": "Jio",
      "link": "https://www.naukri.com/job-listings-software-development-engineer-1-jio-bangalore-bengaluru-delhi-ncr-mumbai-all-areas-0-to-3-years-100323005317",
      "location": "Bangalore/Bengaluru, Delhi / NCR, Mumbai (All Areas)",
      "stipend": "Not disclosed",
      "description": "2+ years of non-internship professional software development experienceBE /B Tech in Co..."
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Dwebbox",
      "link": "https://internshala.com/internship/detail/react-native-development-internship-in-mumbai-at-dwebbox1678700443",
      "location": "Mumbai",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer I",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-software-engineer-i-cadence-design-systems-bangalore-bengaluru-0-to-2-years-311222500392",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": ". . . . . . . BTech / M.tech in Computer Science or Electrical Engineering Proficient i..."
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Ruhm Innovation Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-tumakuru-at-ruhm-innovation-private-limited1679640522",
      "location": "Tumakuru",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Automation Engineering",
      "companyName": "M TEC Software And Business Automation Private Limited",
      "link": "https://internshala.com/internship/detail/automation-engineering-work-from-home-job-internship-at-m-tec-software-and-business-automation-private-limited1679743604",
      "location": "Work From Home",
      "stipend": "10,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern",
      "companyName": "Inzint pvt ltd",
      "location": "Noida, Uttar Pradesh",
      "stipend": "₹12,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Inzint-pvt-ltd/jobs/Software-Engineer-Intern-0c1270ff3a33b9d8?fccid=eea140b0419f9441&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidates having hands-on experience in backend technologies like JavaScript (NodeJS), etc. would be preferred.\n Design, develop, and maintain web applications.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Backend Engineer",
      "companyName": "Replicon",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=442dcf193496f671&fccid=a292f3c3173416ca&vjs=3",
      "tags": "Easily apply",
      "description": "  You know how to design, explain and build a resilient, scalable, secure and observable system from scratch.\n Software development and system architecture skills …\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Kodiak Networks",
      "link": "https://www.naukri.com/job-listings-software-engineer-motorola-solutions-india-private-ltd-kolkata-0-to-4-years-210323500177",
      "location": "Kolkata",
      "stipend": "Not disclosed",
      "description": "In C, C++, scripting languages such as Python, TCL, and other languages as requiredenvi..."
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/machine-learning-work-from-home-job-internship-at-attitude-matterz1679220673",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern - ML Ops",
      "companyName": "Enterpret",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-ml-ops-enterpret-remote-0-to-1-years-090223502131",
      "location": "Permanent Remote",
      "stipend": "Not disclosed",
      "description": "Available for a full-time 3-6 month internship immediately. . . . Proficiency with Pyth..."
    },
    {
      "site": "Indeed",
      "title": "App Development Internship",
      "companyName": "Prajna Self Care Pvt Ltd",
      "location": "Vashi, Navi Mumbai, Maharashtra",
      "stipend": "₹15,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/Prajna-Self-Care/jobs/Application-Development-Internship-419355c598ab7e52?fccid=08866d6bafa656d5&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Excellent understanding of software design and programming principles.\n Develop technical documents and handbooks to accurately represent application design and…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Lead Software Engineer",
      "companyName": "HERE Technologies",
      "location": "Bengaluru East, Karnataka, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  What's the role? \nAs a Lead Software Engineer, you'll have the opportunity to work on this amazing product. Within the cross-functional and self-organized team, you’ll have fun working on systems under huge load and storing a vast amount of data in the very heart of our platform - the Delivery Platform. These services are mission-critical and meet demanding compliance, security, performance, and uptime requirements. You will help run it on production with full control and responsibility. Your role encompasses defining and working on features and technical tasks in a self-directed fashion, supporting your colleagues with technical challenges, working with product management to analyse requirements, talking to stakeholders, designing, implementing, and documenting solutions as well as testing and reviewing your colleagues' work.\nTeam Shared Responsibilities\n architecture, design, develop, test the backend components  evaluate and choose technologies suitable for work  elaboration and refinement of user stories  development infrastructure (build, testing, continuous integration, delivery)  run, monitor, and support in production, ensure our customers receive world-class service by periodically participating in 24x7 on-call shifts  team ceremonies (planning, demo, triage, retrospective)  communicate effectively about decisions, direction, and progress, both inside and outside the team \n Who are you? \nAn ambitious team-player who has experience developing and deploying production-grade services. You have experience with the production software lifecycle, as well as deployment of software to production ready, stable environments. You have 7+ years of professional software development and deployment experience including knowledge of continuous integration, continuous delivery, and automated testing disciplines. You also have good interpersonal skills and feel comfortable coordinating across teams in multiple design centres.\n Bachelor/Masters in a technical degree like C.S. or technical management  Strong programming skills with 7 plus years of experience; Python experience required  Experience with cloud-based technologies (e.g. AWS, Azure, GCP, OCI)  Experience with Kubernetes  Knowledge with distributed systems; Docker, Terraform, Puppet are desired  Experience with deployment automation systems (e.g. Jenkins, Gitlab, etc.)  Interest in high throughput, low latency, highly reliable systems at scale  Interest in DevOps methodologies to drive throughput and stability  What we offer \n Cutting-edge technology environment  Challenging real-world problems to solve  Work that makes a difference in the world  Freedom to decide how to perform your work  Variety in the types of projects  Variety of Learning & Development options.  Collaborative and encouraging Colleagues. \nHERE is an equal opportunity employer. We evaluate qualified applicants without regard to race, color, age, gender identity, sexual orientation, marital status, parental status, religion, sex, national origin, disability, veteran status, and other legally protected characteristics.\nMake HERE your destination, we are just getting started. Apply now!\n Who are we? \nHERE Technologies is a location data and technology platform company. We empower our customers to achieve better outcomes – from helping a city manage its infrastructure or a business optimize its assets to guiding drivers to their destination safely.\nAt HERE we take it upon ourselves to be the change we wish to see. We create solutions that fuel innovation, provide opportunity and foster inclusion to improve people’s lives. If you are inspired by an open world and driven to create positive change, join us. Learn more about us. Watch Video\nHERE is looking for Lead Software Engineers to join its fast-growing and highly motivated Delivery Platform team. The Delivery Platform team is responsible for providing the enabling layers to the HERE Platform through identity and access management, accounting, billing, container orchestration, cloud abstraction, big data management, processing, and streaming services. The Delivery Platform services are mission-critical and meet demanding compliance, security, performance, and uptime requirements.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "odoo",
      "location": "Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=db2ef6d4ee62de93&fccid=fb760e4fd5fa7bc8&vjs=3",
      "tags": "",
      "description": "  After 3 weeks of initial training, we'll present you all of them and you'll choose the one you prefer.\n Available 4 months min / 5 days per week.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer II",
      "companyName": "FIS",
      "location": "Chennai, Tamil Nadu, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Position Type\n\nFull time\n\nType Of Hire\n\nExperienced (relevant combo of work and education)\n\nEducation Desired\n\nBachelor of Computer Engineering\n\nTravel Percentage\n\n0%\n\nAre you curious, motivated, and forward-thinking? At FIS you’ll have the opportunity to work on some of the most challenging and relevant issues in financial services and technology. Our talented people empower us, and we believe in being part of a team that is open, collaborative, entrepreneurial, passionate and above all fun.\n\nAbout The Team\n\nThis role is a part of our Development Team. Develop core versions of software applications for sale to external clients. Identifies client purchasing requirements and technical specifications through Product Management and/or client representatives. Interacts with engineering groups to assist in design changes to equipment and/or software. Trains and communicates with clients on systems application.\n\nWhat You Bring\nShould have minimum 3+ Years of experience C, Unix, Database and the SDLC phaseStrong development skills in C DevelopmentExperience in any Database (Informix exposure is good to have)Should have a strong acumen in Data Structures, Algorithms, problem solving and Logical/Analytical SkillsThorough understanding of OOPs concepts, Design principles and implementation of different types of design patternsShould have experience in debugging\n\nWhat You Will Be Doing\nProviding technical expertise in every phase of the project lifecycle- from conceptual design to solution design, implementation, optimization and supportDrives the performance tuning, re-design and refactoring for a moduleBuild reusable code and libraries for future useOptimize application for maximum speed and scalabilityCollaborate with other team members and stakeholdersShould provide the documentation wherever required in the project (module tech doc, unit test cases, etc.)Sound understanding/experience in software development process, test driven development\n\nAdded bonus if you have\nKnowledge of FIS products and servicesKnowledge of financial services industryKnowledge of basic financial analysis principles and ratios\n\nWhat We Offer You\nAn exciting opportunity be a part of World’s Leading FinTech Product MNCTo be a part of vibrant team and to build up a career on core banking/payments domainA variety of career development tools, resources and opportunitiesTime to support charities and give back in your communityA fantastic range of benefits designed to help support your lifestyle and wellbeingA broad range of professional education and personal development opportunitiesA work environment built on collaboration, flexibility and respect\n\nPrivacy Statement\n\nFIS is committed to protecting the privacy and security of all personal information that we process in order to provide services to our clients. For specific information on how FIS protects personal information online, please see the Online Privacy Notice .\n\nSourcing Model\n\nRecruitment at FIS works primarily on a direct sourcing model; a relatively small portion of our hiring is through recruitment agencies. FIS does not accept resumes from recruitment agencies which are not on the preferred supplier list and is not responsible for any related fees for resumes submitted to job postings, our employees, or any other part of our company.\n\n#pridepass",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "Urjasoft Enterprises",
      "location": "Noida, Uttar Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=79cbad5376c6e1b5&fccid=d4406d2719c0a7f8&vjs=3",
      "tags": "",
      "description": "  Able to create graphics and designs for websites/software.\n B. Tech, B.E., MCA, or Any Graduate can apply.\n Knowledge of Photoshop with HTML/CSS is must.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Trainee",
      "companyName": "IT Jobcell",
      "location": "Thiruvananthapuram, Kerala",
      "stipend": "From ₹15,000 a month",
      "link": "https://in.indeed.com/company/IT-JOBCELL/jobs/Software-Trainee-763f75e30d522aae?fccid=20e851191e087d45&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Analyze, design and develop applications.\n The permanent employment will be offered only after the successful completion of training.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "Game Artist",
      "companyName": "Gape Labs",
      "link": "https://internshala.com/internship/detail/game-artist-work-from-home-job-internship-at-gape-labs1678091987",
      "location": "Work From Home",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Studio LCX Fashion Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-studio-lcx-fashion-private-limited1679584868",
      "location": "Mumbai",
      "stipend": "2,500 /week",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Techvolt Software Private Limited",
      "link": "https://internshala.com/internship/detail/java-development-part-time-job-internship-at-multiple-locations-in-techvolt-software-private-limited1679573830",
      "location": "Coimbatore,Erode,Karur,Pollachi,Namakkal,Tiruppur,Salem",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development (Metaverse-Based Games)",
      "companyName": "Hooman Digital LLP",
      "link": "https://internshala.com/internship/detail/game-development-metaverse-based-games-work-from-home-job-internship-at-hooman-digital-llp1678692840",
      "location": "Work From Home",
      "stipend": "5,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer ( Onsite )",
      "companyName": "SJ Innovation",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-onsite-sj-innovation-llc-panaji-panjim-0-to-2-years-131022501562",
      "location": "Panaji/Panjim",
      "stipend": "Not disclosed",
      "description": "Thorough knowledge of atleast 1 programming languageWorking knowledge of HTML, CSS, Jav..."
    },
    {
      "site": "Internshala",
      "title": "Spring Boot",
      "companyName": "Webknot Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/spring-boot-work-from-home-job-internship-at-webknot-technologies-private-limited1678775223",
      "location": "Work From Home",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Aarvy Technologies",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-gurgaon-at-aarvy-technologies1679385663",
      "location": "Gurgaon",
      "stipend": "2,000-3,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - PHP - Intern",
      "companyName": "Dongre Technoquip Pvt. Ltd",
      "link": "https://www.naukri.com/job-listings-software-engineer-php-intern-dongre-technoquip-pvt-ltd-mumbai-thane-0-to-1-years-181220500265",
      "location": "Mumbai, Thane",
      "stipend": "Not disclosed",
      "description": ". . . Educational Qualifications: . . Preferably from an software engineering / technic..."
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Go Digital Technology Consulting",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-mumbai-at-go-digital-technology-consulting1679288373",
      "location": "Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Yodlee",
      "link": "https://www.naukri.com/job-listings-software-engineer-yodlee-infotech-private-limited-bangalore-bengaluru-0-to-2-years-131021500572",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Skills & Knowledge : Java and J2EE and exposure to web technologies JSP, Servlet, HTML ..."
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Plushvie",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-ahmedabad-at-plushvie1678866565",
      "location": "Ahmedabad",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Associate Professional Software Engineer",
      "companyName": "DXC Technology",
      "link": "https://www.naukri.com/job-listings-associate-professional-software-engineer-dxc-technology-bangalore-bengaluru-0-to-5-years-220822501100",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Bachelors degree or equivalent combination of education and experienceBachelors degree ..."
    },
    {
      "site": "Naukri",
      "title": "Junior Software Engineer - Intern",
      "companyName": "Boxfile",
      "link": "https://www.naukri.com/job-listings-junior-software-engineer-intern-boxfile-chennai-0-to-1-years-220322501502",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": "Bachelor s degree, preferably in Computer Science, Information Technology, Computer Eng..."
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer",
      "companyName": "Riversand Technologies, Inc.",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-riversand-technologies-inc-remote-0-to-2-years-300123500388",
      "location": "remote",
      "stipend": "Not disclosed",
      "description": "Knowledge of professional software engineering practices & best practices for the full ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Telit",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-telit-bangalore-bengaluru-5-to-6-years-181122501402",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Qualifications: . . Bachelors or master s degree in engineeringNo experience required. ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Intern",
      "companyName": "Saras Analytics",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-saras-solutions-india-pvt-ltd-hyderabad-secunderabad-1-to-3-years-101022502841",
      "location": "Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "Requirements: . . . . Proficient in . . Demonstrable understanding of . . Design Patter..."
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "Srileo Technologies",
      "location": "Remote in Coimbatore, Tamil Nadu",
      "stipend": "₹5,141 - ₹14,071 a month",
      "link": "https://in.indeed.com/company/Srileo-Technologies/jobs/Web-Developer-Intern-37e5958bf38fa733?fccid=b33c70d6db78fd99&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  You should be currently enrolled in a relevant degree program (such as computer science, engineering or design) or have recently graduated from one.\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Naukri",
      "title": "Junior Software Engineers Freshers B-Tech /IT/MCA/BCA/BSC/MTech",
      "companyName": "Perennation Computer Solutions Global Private Limi Ted",
      "link": "https://www.naukri.com/job-listings-junior-software-engineers-freshers-b-tech-it-mca-bca-bsc-mtech-perennation-computer-solutions-global-private-limi-ted-bhubaneswar-kolkata-bangalore-bengaluru-0-to-3-years-220323006465",
      "location": "Hybrid - Bhubaneswar, Kolkata, Bangalore/Bengaluru",
      "stipend": "50,000-3 Lacs PA",
      "description": "Candidates should be passed out BE / B-Tech & ME/ M-Tech, BCA, MCA, and graduatesPerks ..."
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineer",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-cadence-design-systems-ahmedabad-0-to-2-years-100822500740",
      "location": "Ahmedabad",
      "stipend": "Not disclosed",
      "description": "Position Requirements: . . Fresh Engineering graduate in electronics or Comp Science . ..."
    },
    {
      "site": "Indeed",
      "title": "Intern React Developer",
      "companyName": "Widle Studio",
      "location": "Remote in Ahmadabad, Gujarat",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=c2cb9a7584e497bb&fccid=101c059f1e701edc&vjs=3",
      "tags": "",
      "description": "  Communication with a client and other team layersBug fixingStay current on the latest technologiesProject supportDeliver high-quality, tested, and secure code…\n",
      "postedDate": "PostedPosted 16 days ago"
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Techvins Software Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-gurgaon-at-techvins-software-private-limited1678764859",
      "location": "Gurgaon",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development (Ethical Hacking Capability for Antivirus Research and Development)",
      "companyName": "Wolfpack",
      "link": "https://internshala.com/internship/detail/software-development-ethical-hacking-capability-for-antivirus-research-and-development-work-from-home-job-internship-at-wolfpack1679739720",
      "location": "Work From Home",
      "stipend": "10,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Impact Analytics",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-impact-analytics-bangalore-bengaluru-0-to-1-years-140323011825",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "1 year of project experience working on developing web applicationsBachelors degree in ..."
    },
    {
      "site": "Indeed",
      "title": "Intern",
      "companyName": "Mercedes-Benz Research and Development India...",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=786c19e6966d60de&fccid=9ab138c02aaca829&vjs=3",
      "tags": "",
      "description": "  As a software developer / Intern , you will work on Computer Vision based PoCs.\n In an international mixed team you develop the software according to the company…\n",
      "postedDate": "PostedToday"
    },
    {
      "site": "Indeed",
      "title": "React JS Front end Developer",
      "companyName": "SAS ONE Pvt. Ltd.",
      "location": "Lucknow, Uttar Pradesh",
      "stipend": "₹6,00,000 - ₹7,00,000 a year",
      "link": "https://in.indeed.com/company/One-Corp/jobs/React-Js-Front-End-Developer-08587e435d7cf196?fccid=ce1bc98f547a4642&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Experience using Google Firebase and some analytics tools.\n In-depth understanding of the entire web development process (design, development and deployment).\n",
      "postedDate": "PostedPosted 19 days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501213",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Minimum Qualification: Graduate/ Post-graduate in Engineering Bachelors degree in Compu..."
    },
    {
      "site": "Indeed",
      "title": "Blockchain Developer",
      "companyName": "Investment house",
      "location": "Jaipura, Rajasthan",
      "stipend": "₹15,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/company/Investment-House/jobs/Blockchain-Developer-af6a24bb589073a5?fccid=1b85007c8c8e7985&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Collaborate with cross-functional teams to design, develop, and deploy blockchain-based websites and applications.\n Part-time hours: 40-60 per week.\n",
      "postedDate": "PostedToday"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Training Basket",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-training-basket-new-delhi-1-to-3-years-210223501757",
      "location": "New Delhi",
      "stipend": "Not disclosed",
      "description": "Criteria for Pre Placement Offer: Interview after successful completion of 2 months int..."
    },
    {
      "site": "Naukri",
      "title": "Software / Firmware Engineer - Intern",
      "companyName": "Marvell Semiconductors",
      "link": "https://www.naukri.com/job-listings-software-firmware-engineer-intern-marvell-india-pvt-ltd-bangalore-bengaluru-0-to-2-years-180323501194",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "1.Skill in Automation Strategy and Methodology. 2.Strong skills in Python scripting. 3...."
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Elysium Academy Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-coimbatore-at-elysium-academy-private-limited1679726432",
      "location": "Coimbatore",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Technical Support - AI Products",
      "companyName": "Quantian Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/technical-support-ai-products-internship-in-pune-at-quantian-technologies-private-limited1679400016",
      "location": "Pune",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Culture Booklet",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-culture-booklet1678554544",
      "location": "Work From Home",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "WiseTech Source",
      "location": "Madurai, Tamil Nadu",
      "stipend": "₹2,20,000 - ₹5,00,000 a year",
      "link": "https://in.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0BhM7Sy_IrpgxCCOItKBuZK-VrVe5evfgcLIwT2t6WtMjywnPmoMfYdfq-RkZ-gUHmZpJyHOVY_HdDr_cAx-AEedo6WkxdtmY0i9G_w5COMjcyQjvPpV8mrumBEqx6jxlqWqMt0B7n4RXgX1l4vGIwLCxm1bwbAEGgLr8Bn9S2zhNrqNWOfL1baj98KcJJdAA5l5bFLC1mawm2kYAtRU2DnPyFwHX-LX_vDh_-283So35gKiG74JEW865pvD0j4F3WAFBd_JLl7BP1X6Jzk-2VMiehv6DYD2rCWfufyWh1wB9iuKKLCCzTewY1h-kNGWX-fkbDOsoTaNOklQ0KnPgNkOWvqrb_uznLXaof2d0kj9jCgAdrkw_KClrr0vin0J26_NX0pSv3li_D47PSSleYPexhoMI8zZbd0EWBXhxJ-LVZhZs2x1r1SegZHRppRJVS-xwhrMAcbW1tr_sYMsA7s74qpGT9EvIBmb9kZfZzsCUEJ7p3dKUMn60-sV2yPKunApw0sa9pYANAN5iaeSwwd&xkcb=SoCt-_M3ROGx15gH7r0KbzkdCdPP&p=1&fvj=1&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  3 months of On Job training* and 100% Guaranteed job on completion of training period & assigned tasks on latest technologies.\n",
      "postedDate": "EmployerActive 4 days ago"
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Infobeans",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-infobeans-technologies-limited-indore-0-to-0-years-131118600153",
      "location": "Indore",
      "stipend": "Not disclosed",
      "description": "We are conducting a WalkIn Drive to Hire fresh graduates to join usEducation : Bachelor..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Intern",
      "companyName": "Teknorix",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-teknorix-systems-panaji-panjim-0-to-1-years-020322500411",
      "location": "Panaji/Panjim",
      "stipend": "Not disclosed",
      "description": "What is expected from you? As a Software Engineer Intern, you will have to provide assi..."
    },
    {
      "site": "Naukri",
      "title": "Senior Software Engineer - C++ Golang",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-senior-software-engineer-c-golang-siemens-limited-bangalore-bengaluru-0-to-7-years-150323503230",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "You should be flexible for a Technology shift from C++ to Golang You Should be able to ..."
    },
    {
      "site": "Indeed",
      "title": "Software developer",
      "companyName": "RICI Tech",
      "location": "Remote in Ranchi, Jharkhand",
      "stipend": "₹25,000 - ₹40,455 a month",
      "link": "https://in.indeed.com/company/RICI-tech/jobs/Software-Developer-c6fb2b09a560a52b?fccid=e30c8d3e9fc9e86a&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  2.Having at least Bachelor's degree .\n Job Types: Full-time, Internship.\n React Native: 1 year (Preferred).\n Total work: 1 year (Preferred).\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Web Developer",
      "companyName": "CareerNaksha",
      "location": "Vadodara, Gujarat",
      "stipend": "₹18,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/CareerNaksha/jobs/Full-Stack-Web-Developer-0cf507caefb1102a?fccid=52dac60dabc9f5e0&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Proficiency with server-side languages such as python Ruby, java, PHP, and Net.\n Strong hands-on experience with JavaScript based development (framework like…\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "Sikharthy Infotech Private Limited",
      "location": "Remote in Salt Lake, Kolkata, West Bengal",
      "stipend": "₹4,000 - ₹6,000 a month",
      "link": "https://in.indeed.com/company/Sikharthy-Infotech-Private-Limited/jobs/Software-Developer-Intern-c99cee67f83bfb27?fccid=1b41c55bdd3d4033&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Education Qualification- Diploma/ B. Tech (Batches- 2020, 2021, 2022).\n Company's name- Sikharthy Infotech Private Limited.\n Total work: 1 year (Preferred).\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Internshala",
      "title": "Electronics Embedded Hardware & Software Engineering",
      "companyName": "Invictus Defence Systems Private Limited",
      "link": "https://internshala.com/internship/detail/electronics-embedded-hardware-software-engineering-internship-in-bangalore-at-invictus-defence-systems-private-limited1678951007",
      "location": "Bangalore",
      "stipend": "15,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineer",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-cadence-design-systems-ahmedabad-0-to-2-years-220922501736",
      "location": "Ahmedabad",
      "stipend": "Not disclosed",
      "description": "Fresh Engineering graduate in electronics or Comp Science Very good digital / analog sk..."
    },
    {
      "site": "Naukri",
      "title": "Associate Software Engineer",
      "companyName": "GlobalLogic",
      "link": "https://www.naukri.com/job-listings-associate-software-engineer-globallogic-gurgaon-gurugram-0-to-1-years-210323003915",
      "location": "Gurgaon/Gurugram",
      "stipend": "Not disclosed",
      "description": "Should be able to fix and maintain clients bug list as per priority Route the ticket / ..."
    },
    {
      "site": "Indeed",
      "title": "Intern: Software Engineering",
      "companyName": "BayaTree",
      "location": "Mohali, Punjab",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=43f603f168d0a174&fccid=abf65cda64e81187&vjs=3",
      "tags": "",
      "description": "You should be a fresh graduate/post graduate with good communication skills and passion for at least one area in software technologies (Development/QA/Design…",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "uReturn -Software Engineer / System Engineer / Data Engineer",
      "companyName": "Uber",
      "link": "https://www.naukri.com/job-listings-ureturn-software-engineer-system-engineer-data-engineer-uber-bangalore-bengaluru-0-to-3-years-190522500563",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Bachelors degree or equivalent in Computer Science, Engineering, Mathematics or related..."
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "Vehicle Care",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-internship-in-gurgaon-at-vehicle-care1679469371",
      "location": "Gurgaon",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Kreedy",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-kreedy1678385725",
      "location": "Work From Home",
      "stipend": "2,000 lump sum +  Incentives",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Epitas",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-epitas-mangaluru-mangalore-2-to-5-years-111121501683",
      "location": "Mangaluru/Mangalore",
      "stipend": "Not disclosed",
      "description": "Assess applicants relevant knowledge, skills, soft skills, experience and aptitudes"
    },
    {
      "site": "Indeed",
      "title": "PHP Web Developer Interns",
      "companyName": "Esenceweb",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a7084435e92dd153&fccid=78dc905985aeb5bc&vjs=3",
      "tags": "",
      "description": "  Required Skils: Hands-on practice of HTML, CSS, Bootstrap, Javascript, Jquery, My SQL Database, PHP Codeigniter Framework.\n",
      "postedDate": "PostedPosted 18 days ago"
    },
    {
      "site": "Internshala",
      "title": "FlutterFlow Development",
      "companyName": "OAK Appian Training",
      "link": "https://internshala.com/internship/detail/flutterflow-development-work-from-home-job-internship-at-oak-appian-training1678787349",
      "location": "Work From Home",
      "stipend": "12,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Android Developer - Intern",
      "companyName": "JumpingMinds",
      "location": "Delhi",
      "stipend": "₹15,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=99ef97ef97c5f1a3&fccid=20a7dcc8cb9d30dd&vjs=3",
      "tags": "",
      "description": "  Ability to understand business requirements and translate them into technical requirements.\n Professional hands-on Android Kotlin and App development experience …\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "SciTech Software Solutions",
      "location": "Remote in Chennai, Tamil Nadu",
      "stipend": "",
      "link": "https://in.indeed.com/company/SciTech-Software-Solutions/jobs/Web-Developer-Intern-2b310d34b1b04c3d?fccid=404d332ac8450a98&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidates having basic knowledge and willing to learn can be considered.\n Job Types: Full-time, Internship.\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Fresher/Intern",
      "companyName": "Pune Web Designers",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a245cb63998defc6&fccid=87d7186bf17dfc94&vjs=3",
      "tags": "Easily apply",
      "description": "  We are looking for interns and freshers in multiple verticals – like technology, design and marketing.\n We ensure we invest efforts to train newer talent,…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern - Angular",
      "companyName": "Logicplum",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-angular-logicplum-trivandrum-thiruvananthapuram-2-to-7-years-071221500333",
      "location": "Trivandrum/Thiruvananthapuram",
      "stipend": "Not disclosed",
      "description": "Develop awesome client-side applications, using Angular . . Optimize applications for m..."
    },
    {
      "site": "Internshala",
      "title": "Graphic Design (Game Design)",
      "companyName": "Itechnuts",
      "link": "https://internshala.com/internship/detail/graphic-design-game-design-internship-in-ahmedabad-at-itechnuts1678690696",
      "location": "Ahmedabad",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "InvestMentor",
      "location": "Ahmadabad, Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=bf3b29b71a4f669e&fccid=8ce2a332a6a3bccf&vjs=3",
      "tags": "",
      "description": "  Create codes for normal day-to-day tasks.\n Analyze and visualize market data and create optimum.\n Work on the creation and live execution of algorithms.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend developer Intern",
      "companyName": "Crest",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=17efac744007b7c5&fccid=7a8e0868f2f793ca&vjs=3",
      "tags": "Easily apply",
      "description": "  Troubleshoot, debug and upgrade software.\n Test software to ensure responsiveness and efficiency.\n Design client-side and server-side architecture.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Webknot Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-webknot-technologies-private-limited1678774688",
      "location": "Work From Home",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Development Intern",
      "companyName": "DailyGET",
      "location": "India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=039d5648f3485e3e&fccid=860026d8fe250be6&vjs=3",
      "tags": "",
      "description": "  We are looking for interns from Computer Science stream.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Internship",
      "companyName": "Cyber Instant Pvt. Ltd",
      "location": "Remote in Indore, Madhya Pradesh",
      "stipend": "₹1,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0AsdNbn4FVMv4hUp4k29S5aWiu17VBlxELlPuK89SbfuUERyKVzkqDPQVSAyejUGD90AeOrjJkrHaIQGJU4dqIGKfMKi7JERnNcGWvMbLtK4pEU0pqNtq7E8dmfhwjoWj2OfnjDpL-ELmWGgwLkNOqVHAdK9QBUpiTSnljq_ribyexE7yxFB8IfI4PqRwiNFx1KfjS805Vhd8El-PpTJiq5eAKVnebg2JGm1W_lPt6EtjbVeZrcsSoCjH6x-zVcXkoTnpYGdhfkB-TQn-FdRk85PrDa_b06NtJnCGhx8mHu0aop_Wo85htRl2iHO4TftcsThMOYRzuoPDAVUJNq-3sy58QHWuiijMbJX2a96BOMSQAPUEUVGXNBs2PTgh5PWOzE4IU40QrFxygO8nii17rVvE2KKMVWpYAOp2X2zZrivZTxsMECVtruidGrFgcpBM7CvFDzYFGzXNUBfREYijROwUc7qzR49j6OfeooKDgdh2Gz6ckzJUuF3Of1Q3HwfPgvDDsuW_X4HWN9qsVeRhXK66y-O1VXTS0=&xkcb=SoAw-_M3ROGx15gH7r0JbzkdCdPP&p=2&fvj=1&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Job Types: Part-time, Fresher, Internship.\n Part-time hours: 40 per week.\n Indore, Madhya Pradesh: Reliably commute or planning to relocate before starting work …\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Trainee C++ Developer",
      "companyName": "VXL Software Solutions",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-c-developer-vxl-software-mumbai-0-to-1-years-300919501308",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Software Engineer - Trainee C++ Developer - 15 vacancies Job details Trainee C Plus Plu..."
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Innovation Hacks AI",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-mumbai-at-innovation-hacks-ai1678974270",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501212",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "No / Less escalation from business. . . . Qualification, Experience / Skills, Leadershi..."
    },
    {
      "site": "Indeed",
      "title": "Internship for Marketing, Software Development, Software Testing & Q.A.",
      "companyName": "Geneka Technologies",
      "location": "Aurangabad, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=44de8fa9b301ac71&fccid=a7bb230cea78598b&vjs=3",
      "tags": "Easily apply",
      "description": "  Geneka Technologies Private Limited is seeking Management / Engineering / Computer Stream students as an interns.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Developer (with JavaScript proficiency)",
      "companyName": "Ontrack",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=91a8cb959d99fea4&fccid=687a9a41f65cade3&vjs=3",
      "tags": "",
      "description": "  Build high-quality mockups and design different prototypes.\n Basic Knowledge of graphics software such as Adobe Suite, Photoshop etc.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "HTML Developer Intern",
      "companyName": "Galagali Multimedia",
      "location": "Thane, Maharashtra",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=d77336392a5c76c9&fccid=7ebbbd67d05cf822&vjs=3",
      "tags": "",
      "description": "  We are looking for a creative intern with a high degree of proficiency in web development & design software such Dreamweaver and Adobe Photoshop.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "React Native",
      "companyName": "M/S R B Uttam Sahil India Private Limited",
      "link": "https://internshala.com/internship/detail/react-native-work-from-home-job-internship-at-m-s-r-b-uttam-sahil-india-private-limited1679471892",
      "location": "Work From Home",
      "stipend": "8,000-10,000 /month",
      "description": ""
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "Anthology Inc",
      "location": "Chennai, Tamil Nadu, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Job Description\n\nSoftware Engineer\n\nChennai, India\n\nThe Opportunity\n\nAnthology offers the largest EdTech ecosystem on a global scale, supporting over 150 million users in 80 countries. Our mission is to provide dynamic, data-informed experiences to the global education community so that learners and educators can achieve their goals.\n\nWe believe in the power of a truly diverse and inclusive workforce. As we expand globally, we are committed to making diversity, inclusion, and belonging a foundational part of not only our hiring practices but who we are as a company.\n\nFor more information about Anthology and our career opportunities, please visit www.anthology.com .\n\nIn this role, you will join a motivated, creative, and energetic team that works in a flexible and agile fashion to deliver world-class products to the education market. By joining this team, you will become a core contributing member to Anthology’s EdTech Platform initiative. This future state platform will seamlessly and uniquely deliver a revolutionized learning experience through innovation, continuous delivery, and architectural integration.\n\nAs a Software Engineer, you will work in a SAFe Agile environment to deliver and build the next-generation EdTech platform. You will be developing and maintaining microservices that provide the foundation for teaching and learning core capabilities and features. A successful candidate must be comfortable with complex software development projects and be an innovative thinker capable of communicating multi-faceted technical concepts. As a direct contributor, the candidate must have a track record of achieving goals and meeting deadlines on multi-team projects, and the ability to work in an aggressive, fast-paced environment with evolving requirements. In addition to developing software, the ideal candidate can troubleshoot problems and support our production environments.\n\nWe are looking for a candidate with strong backend skills, with the willingness to expand and grow their skillset. This engineer will be working in a serverless environment on the AWS platform and should have a strong desire to learn as technologies evolve.\n\nThe Candidate\n\nRequired skills/qualifications:\n At least 3 years of experience in product development  Passion for software development (Python, Node.js)  Experience implementing Web Services (REST API) using Domain Driven Design and service-oriented architecture  Experience building in large-scale, AWS environments  Experience with AWS serverless: Lambda, DynamoDB, Event Bridge, ECS Fargate , etc.  Experience with git (GitHub), test driven development and CI/CD lifecycles  Ability to communicate effectively with technical and non-technical audiences in a global environment \n\nPreferred Skills/qualifications\n\n Experience with infrastructure as code, such as CDK (preferred), CloudFormation , or Terraform \n\nThe Office\n\nWe have an office in one of the biggest cultural, economic, and educational centers in South India: Chennai.\n Located on OMR, the IT corridor of South Chenna i  Easy access to Velachery, Thiruvanmiyur Railway station and bus stop  Very close to Tidel Park, and SRP Tools – Holiday Inn  Office provides lunch and snacks on all working days  Office is situated in 6th floor of Ascendas Phase 2 ( Crest Building)  Fun Committee, Happy Fete Team, Food Committee, and Sports Committee ensures fun at work  ISR Team actively engages employees in contributing to various local charities \n\nThis job description is not designed to contain a comprehensive listing of activities, duties, or responsibilities that are required. Nothing in this job description restricts management's right to assign or reassign duties and responsibilities at any time.\n\nAnthology is an equal employment opportunity/affirmative action employer and considers qualified applicants for employment without regard to race, gender, age, color, religion, national origin, marital status, disability, sexual orientation, gender identity/expression, protected military/veteran status, or any other legally protected factor.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development (Java & React)",
      "companyName": "VASAPTEX LLP",
      "link": "https://internshala.com/internship/detail/software-development-java-react-internship-in-noida-at-vasaptex-llp1679635146",
      "location": "Noida",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unreal Development",
      "companyName": "HEXR Factory",
      "link": "https://internshala.com/internship/detail/unreal-development-internship-in-chennai-at-hexr-factory1679658153",
      "location": "Chennai",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "ForAll A-Tech",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-bhopal-at-forall-a-tech1679680837",
      "location": "Bhopal",
      "stipend": "5,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Developer II- Container Platform",
      "companyName": "DNEG",
      "location": "Mumbai, Maharashtra+2 locations",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=79037efccdad2024&fccid=d0cd21a0ba3fbacd&vjs=3",
      "tags": "",
      "description": "  Standard workflows for software developers and operations engineers.\n Knowledge of software development processes including coding standards, version control,…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Lohitech Solutions",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-lohitech-solutions1678461687",
      "location": "Work From Home",
      "stipend": "3,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Paarsh Infotech Pvt Ltd",
      "location": "Nashik, Maharashtra",
      "stipend": "From ₹12,700 a month",
      "link": "https://in.indeed.com/company/Paarsh-Infotech-Pvt-Ltd/jobs/Python-Developer-Intern-8661182d3bd86e11?fccid=f4c943f7711bc2d9&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Integrating user-facing elements using server-side logic.\n Writing scalable code using Python programming language.\n Coordinating with front-end developers.\n",
      "postedDate": "PostedPosted 17 days ago"
    },
    {
      "site": "Naukri",
      "title": "Interns - Software Engineering",
      "companyName": "Aphthartos Technologies",
      "link": "https://www.naukri.com/job-listings-interns-software-engineering-gighub-hyderabad-secunderabad-0-to-1-years-160621500530",
      "location": "Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "- We are looking for highly driven interns to help our product team build our core plat..."
    },
    {
      "site": "Internshala",
      "title": "Unity3D Game Development",
      "companyName": "The Learning Buddy",
      "link": "https://internshala.com/internship/detail/unity3d-game-development-work-from-home-job-internship-at-the-learning-buddy1678950929",
      "location": "Work From Home",
      "stipend": "5,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer",
      "companyName": "Terix International",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-terix-international-noida-0-to-1-years-100223501803",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Must have core PHP and MySql knowledge Good technical aptitude, willingness to learn ne..."
    },
    {
      "site": "Naukri",
      "title": "S/W Engineer/Intern",
      "companyName": "Marvell Semiconductors",
      "link": "https://www.naukri.com/job-listings-s-w-engineer-intern-marvell-india-pvt-ltd-pune-0-to-1-years-150323501992",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Write code, unit-tests as per discussion with team leader, and debug necessary C / C++ ..."
    },
    {
      "site": "Naukri",
      "title": "Intern  Software Engineering",
      "companyName": "Springworks",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-springworks-bengaluru-bangalore-1-to-6-years-110321501645",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "The intern will gain exciting realworld software engineering experience at a thriving c..."
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "CM.com",
      "location": "Greater Bengaluru Area, On-site",
      "description": "About the job\n        \n\n\n        \n                  The Challenge\nToday, people all over the world are connected. All day, every day. At CM.com we firmly believe that technology exists to enhance people’s lives. We enable our customers to be part of those lives. Constantly searching for ways to better connect people with each other is what drives us.To help us achieve this mission we are looking for an enthusiastic software engineer to help build our R&D hub in India.\nAs a software engineer at our India office in Bangalore, you will be part of the Connect team that takes the product from a Proof of Concept phase, to the market and to a mature product. The result will be that the Connect product is a mission critical integration into the marketplace. At CM.com we have over 300 people working in our R&D department divided over 25+ agile teams. \nThe productMany of our Payments, Messaging or SaaS products require integrations with external platforms (like Salesforce or Microsoft Dynamics) to truly maximize the value that our customers get out of their product. From Conversational A.I. Chatbots that communicate with ERPs, to a contact center application getting data from an order system, to CRMs that post records to our Customer Data Platform.To avoid a complex web of point solutions, we are launching a new product: CM Connect.  External platforms integrate with CM Connect once, after which the data contracts, authentication and authorization automatically cascade to multiple CM products.\nWhat you offerBachelor’s / Master’s degree in computer science / IT.4 to 8 years’ experience in overall software product development. Preferably in the Cloud/SaaS/Enterprise sectorExpert in C#, preferably with knowledge of the latest .Net 5 and 6 frameworksExperience defining and developing web service API’sAgile and Test driven development methodologiesExcellent verbal and written communication skills with a strong eye for detail\n\nWhat we offerA challenging job within an innovative and international fast-growing company. We are the fastest growing CPaaS company in 2022The opportunity to shape your job with your own skillsAwarded to be a Great Place to Work in 2021 & 2022 by CM.com employeesWorking together with motivated and entrepreneurial colleaguesOnboarding and buddy program to help you to get up to speedPlenty of opportunity for personal and professional growth through courses and training, by among others the CM Academy\nCM.com as a CompanyCM.com is a listed company (Euronext Amsterdam: CMCOM) and provides Conversational Commerce services from its cloud platform that connects enterprises and brands to the mobile phones of billions of consumers worldwide. Conversational Commerce is the convergence of messaging and payments.CM.com has over 1000 employees and 23 offices globally. The CM.com India office is in Bangalore and its headquarters is in Breda. In the Netherlands we have offices in Amsterdam, Utrecht, Arnhem, Enschede and Maastricht.\nApply now and ‘Start the ConversationAre you the candidate we are looking for? Please apply via our company website with your resume and tell us what excites you about this opportunity. The interview process will have four interviewing rounds.\nWe look forward to hearing from you.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Indeed",
      "title": "PYTHON DEVELOPERS (Intern)",
      "companyName": "Virtual Web Technologies",
      "location": "Fatorda, Goa",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=224d307445991a7f&fccid=de9fe27827fc9803&vjs=3",
      "tags": "",
      "description": "  Prepare API/ Endpoint which will serve data to front-end web application.\n Ability to manipulate data (Insert/Delete/Search etc) in Elasticsearch and Mysql…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "DevOps Engineer",
      "companyName": "TechCrumb Solution Pvt Ltd",
      "location": "Delhi, Delhi",
      "stipend": "₹8,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/TechCrumb-Solution-Pvt-Ltd/jobs/Devop-Engineer-56386811f0628445?fccid=f2fca4e127e72f4f&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Quality control and management of the code base.\n Hands on experience with any cloud infra services like AWS.\n Designing procedures for system troubleshooting and…\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Python developer",
      "companyName": "Drishti Works Pvt Ltd",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/company/Drishti-Works/jobs/Python-Developer-b9defd30a46e878f?fccid=8a90db9bf86574b0&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Participate in code reviews to ensure code quality and share knowledge with other team members.\n Participate in the design of new robotic systems, contributing…\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer (Training/Internship Program)",
      "companyName": "Apie Technologies Private Limited",
      "location": "Bhubaneswar, Orissa",
      "stipend": "₹4,000 a month",
      "link": "https://in.indeed.com/company/Apie-Technologies-Private-Limited/jobs/Full-Stack-Developer-0529343ea6c3ff1a?fccid=b8ac9d43135d90cb&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  The interns will actively contribute to projects and work closely with a mentor and other seniors on different Software Platforms like Android, iOS, React,…\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "salesforce developer intern",
      "companyName": "INTERNMEETS",
      "location": "Nagpur, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/company/Internmeets/jobs/Salesforce-Developer-Intern-a31ddab61625b95a?fccid=8afccc61b972c865&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Responsibilities: The responsibilities may include performingresearch, analyzing existing data and adding new ones, building or monitoring networks,Building…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Hackathon Training (Coding Students)",
      "companyName": "GEMA Education Technology Private Limited",
      "link": "https://internshala.com/internship/detail/hackathon-training-coding-students-work-from-home-job-internship-at-gema-education-technology-private-limited1679804063",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "PHP DEVELOPER, SOFTWARE ENGINEER",
      "companyName": "Godigi Infotech",
      "link": "https://www.naukri.com/job-listings-php-developer-software-engineer-godigi-infotech-mumbai-0-to-3-years-040122501238",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Experience 0 - 3 Years working Knowledge in web technologies and MYSQL ( HTML 5, CSS 3,..."
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer",
      "companyName": "Possibilitea - Media & Marketing Agency",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "From ₹30,000 a month",
      "link": "https://in.indeed.com/company/Possibilitea---Media-&-Marketing-Agency/jobs/Full-Stack-Developer-de29b906b1e80c88?fccid=c70f16ca04f2360f&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Fluent knowledge of latest HTML/CSS standards and best practices Working knowledge of JavaScript and AngularJS Working knowledge of Node.js and Express Solid…\n",
      "postedDate": "EmployerActive 15 days ago"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer (Entry Level)",
      "companyName": "MRI Software",
      "location": "Bangalore Rural, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  We are currently seeking a Junior Software Engineer to work within our global Product Development department working to apply defined software development life cycle processes to deliver production ready code of the highest quality, this individual will be diligent in testing their code and working with the team to produce\nMRI Software’s high standard product. This individual will work under the Agile development methodology in a cross-functional environment with other groups, both inside and outside the department including Product Management and Documentation, as well as create and test code in our dynamic team setting\nResponsibilities\nApplies defined practices and procedures to design, implement, and support software projectsBuilds effective working relationships with team membersActively seeks assistance as needed but demonstrates learning and growing independenceActively seeks guidance for prioritization and review of deliverables.Performs and designs testing protocols to ensure that the product is fully tested.\nRequirements\nCurrently pursuing a BE, Btech, MCA, MSC, or BCA Computer Science or related technical field (2022 Passout may also apply)Experience developing software or algorithms based on predetermined specificationsKnowledge of object-oriented programming, Microsoft .Net or Java preferredProficient with Source Control tools Familiarity with database objects (tables, stored procedures, queries, etc.) a plusAttention to detail is a mustGood written and verbal communication skills\nBenefits\nAbility to learn leading technical / industry standards and technologiesFlexible working arrangements (2 days in the office)Annual performance-related bonusHealth insurance6x Flexi Fridays: knock 2.5 hours off your day on a FridayEngaging, fun & inclusive culture: check out the MRI Software APAC Insta feed and stories!\nAbout The Business\nMRI Software is a global Proptech leader delivering innovative applications and hosted solutions that free real estate companies to elevate their business. \nOur flexible technology platform, along with an open and connected ecosystem, allows us to meet the unique needs of real estate businesses, from property-level management and accounting, to investment modeling and analytics for the global commercial and residential markets. With nearly five decades of expertise and insight, we have grown to include offices in across the United States, the United Kingdom, Hong Kong, Singapore, Australia, South Africa, New Zealand, Canada, and India, with over 3000 team members to support our clients and their unique needs!\nMRI is proud to be an Equal Employment Opportunity employer.",
      "link": "https://www.linkedin.com/jobs/view/3509269955/?eBP=CwEAAAGHHHfd4EnaKTOci-XPXRfC_vObBgjQG4wlRAwvSxGfeCaIi2g_NLHgGtLvpjOtzstkwwQ-dtDqp0JckJniaCIq-AxnyDigkLtH92xjcuhbHdZGc47IzvxmD1w04Q70izZScE6e_0pChfZThJzvToZainQOx0YNr4iv0DrX4QxJ1R-urrhw7djKtzlt8Ijn0OftU67ZSiwLaZGGN0Vy8cJJ5BrffFOU2h3xFbyWzwh4ZKsXAPHQ0F6S_BLw9o1PWPiEslxHEZvMZSWYSLe6MIZCGyJs-nWKNBPLBK7BCCqOIqc5KVyZIHS-bMCRm6_vDrU3mOBu3LhbSXdEpq6LYWB1DmZC7bURSsDR8AQVo99nu8Ddm43Wn7RO&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=kcxTBLPoeJLfjgwp7IJV4Q%3D%3D&trackingId=cMbLvb03PgNV40QSDYZCxQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "Internshala",
      "title": "DevOps",
      "companyName": "Medius Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/devops-internship-in-mumbai-at-medius-technologies-private-limited1679665193",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Logicplum",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-logicplum-trivandrum-thiruvananthapuram-0-to-1-years-100521500256",
      "location": "Trivandrum/Thiruvananthapuram",
      "stipend": "Not disclosed",
      "description": "Experience programming in C, C++, or PythonPractical experience with a wide variety of ..."
    },
    {
      "site": "Indeed",
      "title": "Senior Software Engineer - Consul (Service Mesh)",
      "companyName": "HashiCorp",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=d8ee39df7d59c107&fccid=044076f542c2a482&vjs=3",
      "tags": "Easily apply",
      "description": "  Empathy for the people operating, learning, teaching and supporting software you write, and consider their experience when making design decisions and…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - UI",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-software-engineer-ui-siemens-limited-bangalore-bengaluru-0-to-5-years-150323503232",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "BE/ B Tech/ MCA/ M Tech/ . Engineering Graduate / Post Graduate (preferably a major in ..."
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Hopes Capital",
      "location": "Remote in Nagpur, Maharashtra",
      "stipend": "₹4,500 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Hopes-Capital/jobs/Software-Developer-7a1a6d449ed3e28d?fccid=9448f8928da0c247&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Fixing and improving existing software.\n Producing clean, efficient code based on specifications.\n Testing and deploying programs and systems.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Intouch Consumer Care Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-jaipur-at-intouch-consumer-care-solutions-private-limited1678868686",
      "location": "Jaipur",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Gogaga Holidays Private Limited",
      "location": "Hyderabad, Telangana",
      "stipend": "Up to ₹14,000 a month",
      "link": "https://in.indeed.com/company/GOGAGA-HOLIDAYS-PRIVATE-LIMITED/jobs/Software-Developer-12bc4b0f408a025a?fccid=a10e982eb7bf19d1&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Researching, investigating and fixing a wide range of technical issues.\n Developing website using Angular12.\n Debugging and testing code.\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Internshala",
      "title": "NLP Engineering",
      "companyName": "UniAcco",
      "link": "https://internshala.com/internship/detail/nlp-engineering-internship-in-delhi-at-uniacco1678268191",
      "location": "Delhi",
      "stipend": "15,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Paarsh Infotech Pvt Ltd",
      "location": "Nashik, Maharashtra",
      "stipend": "From ₹12,700 a month",
      "link": "https://in.indeed.com/company/Paarsh-Infotech-Pvt-Ltd/jobs/Python-Developer-Intern-8661182d3bd86e11?fccid=f4c943f7711bc2d9&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Integrating user-facing elements using server-side logic.\n Writing scalable code using Python programming language.\n Coordinating with front-end developers.\n",
      "postedDate": "PostedPosted 17 days ago"
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (Using Python)",
      "companyName": "Nxtlogic Software Solutions",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-using-python-internship-in-multiple-locations-at-nxtlogic-software-solutions1679659496",
      "location": "Chennai,Coimbatore,Madurai",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Indeed",
      "title": "Intern Software Engineer (Onsite)",
      "companyName": "SJ INNOVATION",
      "location": "Goa",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ddd943d3f6721ae2&fccid=6e74c025908349d5&vjs=3",
      "tags": "",
      "description": "  Thorough knowledge of atleast 1 programming language.\n Working knowledge of HTML, CSS, Javascript is a must.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-gurgaon-at-aaptatt1679459083",
      "location": "Gurgaon",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Digital Business People",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-digital-business-people-pte-ltd-noida-hyderabad-secunderabad-0-to-1-years-300522503570",
      "location": "Noida, Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "Willing to learn new technologies and adapt quickly . . Good communications skills, abl..."
    },
    {
      "site": "Indeed",
      "title": "Python developer",
      "companyName": "Drishti Works Pvt Ltd",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/company/Drishti-Works/jobs/Python-Developer-b9defd30a46e878f?fccid=8a90db9bf86574b0&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Participate in code reviews to ensure code quality and share knowledge with other team members.\n Participate in the design of new robotic systems, contributing…\n",
      "postedDate": "PostedPosted 10 days ago"
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Reflexion.ai",
      "location": "Pune, Maharashtra",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Reflexion/jobs/Python-Developer-Intern-0a4eee7f91c5b9d1?fccid=859cad851543c688&vjs=3",
      "tags": "Easily apply",
      "description": "  Fluent in English, good communication skills and ability to work in a team.\n Data science model, code refactoring and optimization, containerization, deployment,…\n",
      "postedDate": "PostedPosted 10 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "Urjasoft Enterprises",
      "location": "Noida, Uttar Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=79cbad5376c6e1b5&fccid=d4406d2719c0a7f8&vjs=3",
      "tags": "",
      "description": "  Able to create graphics and designs for websites/software.\n B. Tech, B.E., MCA, or Any Graduate can apply.\n Knowledge of Photoshop with HTML/CSS is must.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Blockchain Developer",
      "companyName": "Investment house",
      "location": "Jaipura, Rajasthan",
      "stipend": "₹15,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/company/Investment-House/jobs/Blockchain-Developer-af6a24bb589073a5?fccid=1b85007c8c8e7985&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Collaborate with cross-functional teams to design, develop, and deploy blockchain-based websites and applications.\n Part-time hours: 40-60 per week.\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer",
      "companyName": "Helius Technologies",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=fd38d2303584de32&fccid=b3282c125f18e0c0&vjs=3",
      "tags": "",
      "description": "  Optional Onboarding Training Program: We have a dedicated 3- to 6- month onboarding program to help front-end engineers learn the basics of front end-to-end…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Intern: Software Engineering",
      "companyName": "BayaTree",
      "location": "Mohali, Punjab",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=43f603f168d0a174&fccid=abf65cda64e81187&vjs=3",
      "tags": "",
      "description": "You should be a fresh graduate/post graduate with good communication skills and passion for at least one area in software technologies (Development/QA/Design…",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "React Native Developer Intern",
      "companyName": "Dezy It",
      "location": "Remote in Mumbai, Maharashtra",
      "stipend": "₹10,000 a month",
      "link": "https://in.indeed.com/company/Dezy-It/jobs/React-Native-Developer-Intern-04966942d6849a5e?fccid=65ede97484411de6&vjs=3",
      "tags": "Easily applyResponsive employer",
      "description": "  Building architecture and maintaining excellent React Native applications with clean code.\n We help companies implement and manage UX Design and Design Thinking…\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Intern",
      "companyName": "DailyGET",
      "location": "India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=039d5648f3485e3e&fccid=860026d8fe250be6&vjs=3",
      "tags": "",
      "description": "  We are looking for interns from Computer Science stream.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Java Developer - Intern",
      "companyName": "AutoRABIT Holding Inc.",
      "location": "Hyderabad, Telangana",
      "stipend": "₹8,00,000 - ₹10,00,000 a year",
      "link": "https://in.indeed.com/rc/clk?jk=bc6eaa799e35a8a5&fccid=72d05a02fe0f72e8&vjs=3",
      "tags": "Easily apply",
      "description": "  Work Type: Full Time Internship for 3-6 months working from office, five days a week.\n Analyze code using static analysis tools to identify potential security…\n",
      "postedDate": "PostedPosted 4 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "Agprop",
      "location": "New Delhi, Delhi",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=01d7cae5de7650e8&fccid=823a0998398b0a33&vjs=3",
      "tags": "",
      "description": "  Experience in building websites using HTML, CSS, JavaScript & MySQL.\n Knowledge of Bootstrap, GIT, MVC framework is preferred (not mandatory).\n",
      "postedDate": "PostedPosted 10 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer- Backend (7-10 Years)",
      "companyName": "PhonePe",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=38167aef811ecff7&fccid=9efe0489759405d1&vjs=3",
      "tags": "",
      "description": "  Extensive experience in object-oriented design skills, knowledge of design patterns, and huge passion and ability to design intuitive module and class-level…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern",
      "companyName": "Shatam Technologies",
      "location": "Nagpur, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=b2efd1d4ddff9bc5&fccid=2325b0f3a54ac9c2&vjs=3",
      "tags": "",
      "description": "Qualifications: Bachelor's Degree/Master's Degree BCA/BCCA/BSc/MSc/BCom/MCom/BE/MTech /BTech Or any relevent degree Role : Software Engineer Intern Skills:…",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Internships for Python / EmberJS Developers for eventyay.com",
      "companyName": "FOSSASIA",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ac71c911095d538a&fccid=22450370b1c33e68&vjs=3",
      "tags": "",
      "description": "  Before you apply please set up the Open Event project first on a Linux system and make some pull requests to show your ability of contributing code to the…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Engineer (SDE) – Intern",
      "companyName": "ElectricPe",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=e82cb6b2a8715b01&fccid=ebc93346b05ab23c&vjs=3",
      "tags": "",
      "description": "  You should be able to build high-quality, innovative and fully performing software in compliance with coding standards and technical design.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer (Intern)",
      "companyName": "Commud Networks",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=4dfee2330007b9df&fccid=2dff79acb58b3253&vjs=3",
      "tags": "",
      "description": "  We are looking for software development interns to join the Commud gang for both 6 and 8 months terms.\n We're looking for passionate developers who love clean…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer - Fresher | Experience",
      "companyName": "Omy Infotech",
      "location": "Surat, Gujarat",
      "stipend": "₹10,000 - ₹50,000 a month",
      "link": "https://in.indeed.com/company/Omy-Infotech/jobs/Web-Developer-21423c6bd62e6f35?fccid=e273c3d8be81ff17&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Knowledge of jQuery/ Javascript/ Angular/ React and Bootstrap.\n Always ready to take on challenging work and learn new things.\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer Intern",
      "companyName": "Simbo.ai",
      "location": "Remote",
      "stipend": "From ₹25,000 a month",
      "link": "https://in.indeed.com/company/Medyug-Technology-Pvt-Ltd/jobs/Full-Stack-Developer-Intern-703185a84ebce03a?fccid=4495110d5a48a28a&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Proficiency with server-side languages such as Python, PHP.\n Experience with building C-projects.\n Knowledge of Makefiles, cross-compilation for ARM.\n",
      "postedDate": "PostedPosted 11 days ago"
    },
    {
      "site": "Indeed",
      "title": "Angular, React & HTML Developer",
      "companyName": "Artificial Reality",
      "location": "Navi Mumbai, Maharashtra",
      "stipend": "₹15,000 - ₹50,000 a month",
      "link": "https://in.indeed.com/company/Artificial-Reality/jobs/Angular-0404e1ede41edf1c?fccid=4a405283c06583fa&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  We are looking for an Freshers HTML developer to oversee the design, coding, and implementation of website projects.\n Strong knowledge of HTML & CSS Design.\n",
      "postedDate": "PostedPosted 7 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Intern",
      "companyName": "Agnito Technologies Pvt Ltd",
      "location": "Bhopal, Madhya Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/company/Agnito-Technologies-Pvt-Ltd/jobs/Software-Development-Intern-c8e4cbab8242245d?fccid=4cd5b5345f8e7960&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Graduation-B.E./B.Tech/MCA/BCA/M.Tech.\n 1st, 2nd, 3rd, 4th Year students can come.\n Job Types: Full-time, Internship.\n Total work: 1 year (Preferred).\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer",
      "companyName": "TrustIn Software Services",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=1a46a73451728241&fccid=e34c1701eb9476dd&vjs=3",
      "tags": "",
      "description": "  B. Proficiency in using various technical tools,.\n POSH (Prevention of Sexual Harassment) implementation alongside unbiased employee support.\n",
      "postedDate": "PostedToday"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer",
      "companyName": "stipe solutions pvt ltd",
      "location": "Bengaluru, Karnataka",
      "stipend": "From ₹1,80,000 a year",
      "link": "https://in.indeed.com/company/stipe-solutions-pvt-ltd/jobs/Software-Engineer-3f638407dc4415a3?fccid=f039925064d5e9e9&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Collaborate with team members to develop and implement software solutions that meet business requirements.\n Help identify and troubleshoot software defects and…\n",
      "postedDate": "PostedPosted 7 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "mhtechin",
      "location": "Remote in Pune, Maharashtra",
      "stipend": "₹2,000 - ₹6,000 a month",
      "link": "https://in.indeed.com/company/mhtechin/jobs/Software-Developer-Intern-bf2995771c342629?fccid=dd0afb663f363511&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  MHTECHIN is a Software and Product Development company.\n Pre-Placement offer will be given after completion of Internship.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Website Developer",
      "companyName": "Chat360.io",
      "location": "Pune, Maharashtra",
      "stipend": "₹15,000 - ₹25,000 a month",
      "link": "https://in.indeed.com/company/Chat360.io/jobs/Website-Developer-fc31e0625f51069f?fccid=830cd5fcb3f9e8cd&vjs=3",
      "tags": "Easily apply",
      "description": "  Write well designed, testable, efficient code by using best software development practices.\n Create and maintain software documentation.\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "React Developer",
      "companyName": "Infocruise Solutions Pvt Ltd",
      "location": "Bengaluru, Karnataka",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Infocruise-Solutions-Pvt-Ltd/jobs/React-Developer-5e8ca5c6b603585f?fccid=c4a6b9fea7dcf9d5&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  The candidate will be trained on react and related technology.\n Once the candidate successfully completes training, he/she will work on development of web/mobile…\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Embedded Software Engineer",
      "companyName": "VerveTronics Imagineering Pvt. Ltd.",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/company/VerveTronics-Imagineering-Pvt.-Ltd./jobs/Embedded-Software-Engineer-81faa2ade721c9c2?fccid=e42404045bac4be3&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  You will be a lead developer responsible for the development of new software products and enhancements to existing products.\n Create reliable and robust designs.\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern",
      "companyName": "MethodHub Software Pvt. Ltd.",
      "location": "Sahibzada Ajit Singh Nagar, Ludhiana, Punjab",
      "stipend": "₹8,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/MethodHub-Software-Pvt.-Ltd./jobs/Software-Engineer-Intern-eb0b7019009a8c9f?fccid=95408dc6d5b27532&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Documenting and testing new software applications.\n Researching, investigating and fixing a wide range of technical issues.\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer (Fresher/Experienced)",
      "companyName": "VanCoders",
      "location": "Remote in Hoshiarpur, Punjab",
      "stipend": "₹11,148 - ₹54,014 a month",
      "link": "https://in.indeed.com/company/VanCoders/jobs/Web-Developer-c9b3fef4fa97822f?fccid=39e08bbfb49fd07e&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  The candidate should possess excellent technical skills with ability to learn new technologies.\n 6 month industrial training candidates in PHP will be more…\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "Intern",
      "companyName": "Mercedes-Benz Research and Development India...",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=786c19e6966d60de&fccid=9ab138c02aaca829&vjs=3",
      "tags": "",
      "description": "  As a software developer / Intern , you will work on Computer Vision based PoCs.\n In an international mixed team you develop the software according to the company…\n",
      "postedDate": "PostedPosted 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "Open Innovations Lab",
      "location": "Jodhpur, Rajasthan",
      "stipend": "₹10,662 - ₹44,871 a month",
      "link": "https://in.indeed.com/company/Brenin-Technologies-Pvt.-Ltd./jobs/Web-Developer-Intern-04034d90fb56a86c?fccid=5b6ac25165654205&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Create cross-browser, fully functional web pages using HTML and CSS while strictly adhering to accessibility and W3C web standards.\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Testing Engineer",
      "companyName": "Clocktos Infotech",
      "location": "Chennai, Tamil Nadu",
      "stipend": "₹10,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/Clocktos-Infotech/jobs/Software-Testing-Engineer-fd2d6e211e0b0488?fccid=242e8c95a1c4f257&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Holds good knowledge and experience testing frameworks.\n Experience working directly with customers in various test lifecycle processes - test planning, test…\n",
      "postedDate": "EmployerActive 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "MEAN Stack Developer",
      "companyName": "Qwerty Thoughts Media Pvt Ltd",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "Up to ₹80,000 a month",
      "link": "https://in.indeed.com/company/Qwerty-Thoughts-Media-Pvt-Ltd/jobs/Mean-Stack-Developer-c69b407cc1d8a9ae?fccid=a210e1cb8aa1f8df&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Collaborate well with engineers, researchers, and data implementation specialists to design and create advanced, elegant, and efficient systems.\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Designer/Developer",
      "companyName": "Credwise",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "₹8,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Credwise/jobs/Web-Designer-Developer-abcfa1ce6251fead?fccid=6f3477ad299b5952&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Write well designed, testable, efficient code by using best software development practices.\n Familiarity with using Photoshop, Figma and other image-editing…\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front End Developer",
      "companyName": "iThink Logistics",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=247bfcb04bcd8da3&fccid=f26d589aed297079&vjs=3",
      "tags": "",
      "description": "  Understanding business requirements, task management, and contributing to high-level design.\n After a period of 3 months, candidates will be offered a full time…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Backend Engineer",
      "companyName": "Helius Technologies",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=251a776d86a1e357&fccid=b3282c125f18e0c0&vjs=3",
      "tags": "",
      "description": "  Optional Onboarding Training Program: We have a dedicated 3- to 6- month onboarding program to help back-end engineers learn the basics of back end-to-end…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "GITS India Solutions P Ltd",
      "location": "Delhi, Delhi",
      "stipend": "Up to ₹15,000 a month",
      "link": "https://in.indeed.com/company/GITS-India-Solutions-P-Ltd/jobs/Software-Developer-Intern-108e4897226fd5b2?fccid=aad0133d74d75981&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Write “clean”, well designed code.\n Troubleshoot, test and maintain the core product software and databases to ensure strong optimization and functionality.\n",
      "postedDate": "PostedPosted 24 days ago"
    },
    {
      "site": "Indeed",
      "title": "React Js, Vue Js Development Engineer - Internship (0 - 1 Yrs)",
      "companyName": "Mavinzent",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=505840eaa499996c&fccid=f937f9c7d7a16c60&vjs=3",
      "tags": "",
      "description": "  After the 6 Months internship according to the performance you will be the full-time employee.\n Strong programming background, OOPs, design patterns and data…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Associate Software Engineer",
      "companyName": "Mindfire Solutions",
      "location": "Delhi, Delhi",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=662456eeacaf16f3&fccid=5beecbf9b1fcfd6f&vjs=3",
      "tags": "",
      "description": "  Preferably with 6 months Internship done.\n Very comfortable with daily standup with clients, update daily work progress via Project Management systems, voice…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern/Fresher",
      "companyName": "SpherePlugins",
      "location": "Surat, Gujarat",
      "stipend": "₹3,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/HSquare-Technology/jobs/Python-Developer-Intern-Fresher-161b6cb765f3663c?fccid=0ee844c47c37757f&vjs=3",
      "tags": "Easily applyResponsive employer",
      "description": "  Writing scalable code using Python programming language.\n SpherePlugins.com* is a product-based company, primarily focused on web plugins, is looking for a…\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern",
      "companyName": "Etasens Technologies",
      "location": "Chandigarh, Chandigarh",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=439324d857f9d9be&fccid=1fdb493948c5aeaa&vjs=3",
      "tags": "",
      "description": "  Looking for highly motivated individuals looking to make a career in software engineering.\n Should have an Engineer degree/final semester.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Intern Software Engineer (Onsite)",
      "companyName": "SJ INNOVATION",
      "location": "Goa",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ddd943d3f6721ae2&fccid=6e74c025908349d5&vjs=3",
      "tags": "",
      "description": "  Thorough knowledge of atleast 1 programming language.\n Working knowledge of HTML, CSS, Javascript is a must.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Jr./Mid Java Developer",
      "companyName": "WovV Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=3534b8f88ab1e1ec&fccid=5c4ea3c30ac35dd5&vjs=3",
      "tags": "",
      "description": "  Basic knowledge of TDD/BDD based frameworks like JUnit 4/Jmeter etc.\n Min 3 months of internship project completed.\n Knowledge in Redis (good to have).\n",
      "postedDate": "PostedPosted 11 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "SciTech Software Solutions",
      "location": "Remote in Chennai, Tamil Nadu",
      "stipend": "",
      "link": "https://in.indeed.com/company/SciTech-Software-Solutions/jobs/Web-Developer-Intern-2b310d34b1b04c3d?fccid=404d332ac8450a98&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidates having basic knowledge and willing to learn can be considered.\n Job Types: Full-time, Internship.\n",
      "postedDate": "PostedPosted 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "Website Developer",
      "companyName": "Haptap Deals India Pvt Ltd",
      "location": "Remote in Jaipur, Rajasthan",
      "stipend": "₹6,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Haptap-Deals-India-Pvt-Ltd/jobs/Website-Developer-beab58555d48cfef?fccid=80e0f3e23bd64694&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Job Types: Full-time, Part-time, Fresher, Internship.\n Part-time hours: 30 per week.\n Jaipur, Jaipur, Rajasthan: Reliably commute or planning to relocate before…\n",
      "postedDate": "PostedPosted 8 days ago"
    },
    {
      "site": "Indeed",
      "title": "Trainee Email Developer - HTML/CSS",
      "companyName": "ContinuumGlobal, Inc.",
      "location": "Delhi",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=89b95143c9d5b484&fccid=d2593d14f9dfb3dc&vjs=3",
      "tags": "",
      "description": "  Understanding of UX design, Interaction design and Information Architecture design.\n Performing Email construction and coding using a combination of manual and…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Intern React Developer",
      "companyName": "Widle Studio",
      "location": "Remote in Ahmadabad, Gujarat",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=c2cb9a7584e497bb&fccid=101c059f1e701edc&vjs=3",
      "tags": "",
      "description": "  Communication with a client and other team layersBug fixingStay current on the latest technologiesProject supportDeliver high-quality, tested, and secure code…\n",
      "postedDate": "PostedPosted 18 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front-end Development - Internship",
      "companyName": "App & Geek",
      "location": "Bengaluru, Karnataka",
      "stipend": "₹8,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=7b2455f4dfdf6e92&fccid=9d56776cd0d966ae&vjs=3",
      "tags": "",
      "description": "  Translation of the UI/UX design wireframes to actual code that will produce visual elements of the application.\n Develop new user-facing features.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Designer /Developer",
      "companyName": "true pharms labs llp",
      "location": "Mumbai, Maharashtra",
      "stipend": "₹9,823 - ₹34,870 a month",
      "link": "https://in.indeed.com/company/true-pharms-labs-llp/jobs/Web-Designer-63f01c76c6e65077?fccid=f5f37200c02c7fae&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidate need to design and develop website of both platform wordpress and shopify and he must have good knowledge of ecommerce too.\n",
      "postedDate": "EmployerActive 10 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "DG7",
      "location": "Andheri, Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=8dafd80079153d37&fccid=f8c80210735f15c9&vjs=3",
      "tags": "",
      "description": "  Learn to make web pages live on a web server and get familiar with the hosting environment.\n 6 months / 1-year experience in web designing and development.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer (Training/Internship Program)",
      "companyName": "Apie Technologies Private Limited",
      "location": "Bhubaneswar, Orissa",
      "stipend": "₹4,000 a month",
      "link": "https://in.indeed.com/company/Apie-Technologies-Private-Limited/jobs/Full-Stack-Developer-0529343ea6c3ff1a?fccid=b8ac9d43135d90cb&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  The interns will actively contribute to projects and work closely with a mentor and other seniors on different Software Platforms like Android, iOS, React,…\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer ( Backend , 3-5years)",
      "companyName": "PhonePe",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=698baa9da6abb8dd&fccid=9efe0489759405d1&vjs=3",
      "tags": "",
      "description": "  Extensive experience in object-oriented design skills, knowledge of design patterns, and huge passion and ability to design intuitive module and class-level…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Embedded Developer",
      "companyName": "Highlake (Software)Technology",
      "location": "Remote in Pune, Maharashtra",
      "stipend": "From ₹5,00,000 a year",
      "link": "https://in.indeed.com/company/Highlake-(Software)Technology/jobs/Embedded-Developer-0cf8a04a7be71521?fccid=5acb66a33454dfb7&vjs=3",
      "tags": "Easily applyResponsive employerUrgently hiringHiring multiple candidates",
      "description": "  Hands on in writing structured software in C/C++ (ie experience multi-file programming, understanding of variable scopes, pointer operations and following…\n",
      "postedDate": "EmployerActive 7 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Intern",
      "companyName": "Inzint pvt ltd",
      "location": "Noida, Uttar Pradesh",
      "stipend": "₹12,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Inzint-pvt-ltd/jobs/Software-Engineer-Intern-0c1270ff3a33b9d8?fccid=eea140b0419f9441&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Candidates having hands-on experience in backend technologies like JavaScript (NodeJS), etc. would be preferred.\n Are you looking for *Winter Internship*?\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Node js developer",
      "companyName": "Nextgen Techno Ventures Pvt Ltd",
      "location": "Mumbai, Maharashtra",
      "stipend": "₹8,158 - ₹33,000 a month",
      "link": "https://in.indeed.com/company/Nextgen-Techno-Ventures-Pvt-Ltd/jobs/Node-Js-Developer-16c3477ca1974f83?fccid=5899b03fd09613b3&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Availability to resolve urgent web application issues outside of business hours.\n Developing and maintaining all server-side network components.\n",
      "postedDate": "PostedPosted 9 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Trainee",
      "companyName": "IT Jobcell",
      "location": "Thiruvananthapuram, Kerala",
      "stipend": "From ₹15,000 a month",
      "link": "https://in.indeed.com/company/IT-JOBCELL/jobs/Software-Trainee-763f75e30d522aae?fccid=20e851191e087d45&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Candidates must show ability and willingness to learn, be self motivated, hard working, flexible & result oriented.\n Analyze, design and develop applications.\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front end developer",
      "companyName": "Hatsoff digital pvt.ltd",
      "location": "Pune, Maharashtra",
      "stipend": "₹10,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/Hatsoff-digital-pvt.ltd/jobs/Front-End-Developer-f96de4ea120039c0?fccid=49e14c8f9f453277&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Job Types: Full-time, Internship.\n Salary: ₹10,000.00 - ₹20,000.00 per month.\n Pune, Maharashtra: Reliably commute or planning to relocate before starting work …\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front End Developer",
      "companyName": "Pandora Finance",
      "location": "Remote in Delhi, Delhi",
      "stipend": "₹2,88,788 - ₹13,49,718 a year",
      "link": "https://in.indeed.com/company/Pandora-Finance/jobs/Front-End-Developer-2e4d7029bbb3df27?fccid=7a0977da7f191058&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Work with the design team to examine several approaches to problem-solving while assessing implementation intricacy, user experience, and product impact.\n",
      "postedDate": "EmployerActive 13 days ago"
    },
    {
      "site": "Indeed",
      "title": "Sr. Software Engineer - Consul",
      "companyName": "Hashicorp",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=038344a4517f16d2&fccid=044076f542c2a482&vjs=3",
      "tags": "",
      "description": "  Empathy for the people operating, learning, teaching and supporting software you write, and consider their experience when making design decisions and…\n",
      "postedDate": "PostedPosted 17 days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developers",
      "companyName": "eCloudChain",
      "location": "Remote in India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=4b920a196bb0d253&fccid=496764eaefc42796&vjs=3",
      "tags": "",
      "description": "  Develop web-based solutions using modern technologies, like React, Gatsby, and Graphql.\n Build POCs, MVPs & Production solutions for various business use-cases.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "AI Software Engineer",
      "companyName": "AlphaICs",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=8dd2b8cab3090f93&fccid=0667f0e3c58d2ffe&vjs=3",
      "tags": "",
      "description": "  We are looking for candidates who can work with us for more than 3 months.\n Experience working with deep learning frameworks (Tensorflow, Pytorch, etc.) and…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Engineer Intern (JAVA/ PHP/ Testing)",
      "companyName": "Tecgemini",
      "location": "Thiruvananthapuram, Kerala",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=c424e23dc26fc1f8&fccid=c74a6d6406d53a6d&vjs=3",
      "tags": "Easily apply",
      "description": "  Send your resumes to : hr@tecgemini.com.\n TECGEMINI Info Services Pvt.Ltd , invites applications from candidates for their internship program.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer_Intern",
      "companyName": "EY",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=9faac7cd284dac0e&fccid=1544766d4c2915b0&vjs=3",
      "tags": "",
      "description": "  An ability to quickly understand complex concepts and use technology to support data modeling, analysis, visualization, or process automation.\n",
      "postedDate": "PostedPosted 22 days ago"
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Paarsh Infotech Pvt Ltd",
      "location": "Nashik, Maharashtra",
      "stipend": "From ₹12,700 a month",
      "link": "https://in.indeed.com/company/Paarsh-Infotech-Pvt-Ltd/jobs/Python-Developer-Intern-8661182d3bd86e11?fccid=f4c943f7711bc2d9&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Integrating user-facing elements using server-side logic.\n Writing scalable code using Python programming language.\n Coordinating with front-end developers.\n",
      "postedDate": "PostedPosted 19 days ago"
    },
    {
      "site": "Indeed",
      "title": "Golang Developer",
      "companyName": "Holo",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "₹3,00,000 - ₹4,00,000 a year",
      "link": "https://in.indeed.com/company/Holo/jobs/Golang-Developer-a965ce5619533084?fccid=57c928a8383125f1&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Software development: 1 year (Preferred).\n Urgently need 10 plus Golang Developer to work on the project.\n Bengaluru, Karnataka: Reliably commute or planning to…\n",
      "postedDate": "EmployerActive 2 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Programmer",
      "companyName": "Infocruise Solutions Pvt Ltd",
      "location": "Bengaluru, Karnataka",
      "stipend": "₹1,20,000 - ₹1,50,000 a year",
      "link": "https://in.indeed.com/company/Infocruise-Solutions-Pvt-Ltd/jobs/Software-Programmer-1127c9e33a6cfe15?fccid=c4a6b9fea7dcf9d5&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Experienced: The candidate will be directly inducted into the project wherein the candidate will be required to create software programs as instructed by their…\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer",
      "companyName": "CANGRA Talents",
      "location": "Remote in Lucknow, Uttar Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=05e83f1cf21bc1d2&fccid=a0bf67ac44d86ed7&vjs=3",
      "tags": "",
      "description": "  Calling candidates for interview schedule.\n Interacting with Clients for JDs and CVs.\n Very good verbal and writing communication skills.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer",
      "companyName": "Neemtree Internet Private Limited",
      "location": "Remote in Mumbai, Maharashtra",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Neemtree-Internet-Private-Limited/jobs/Full-Stack-Developer-c9dc69420ee7c61d?fccid=28b72343c33ae022&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Ii) Are you actively coding in Data structures and Algorithms using C or C++, If not, please specify the programming languages which you use.\n",
      "postedDate": "EmployerActive 7 days ago"
    },
    {
      "site": "Indeed",
      "title": "Backend Developer Intern",
      "companyName": "Contractzy",
      "location": "Madgaon, Goa",
      "stipend": "₹10,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Attort-Legal-consultancy-private-limited/jobs/Backend-Developer-Intern-97072dc9a363433d?fccid=598753c7cd5bbbca&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Duration 3 months (full-time offer will be rolled out post-completion based on your performance during the internship tenure).\n",
      "postedDate": "PostedPosted 26 days ago"
    },
    {
      "site": "Indeed",
      "title": "Java Full Stack Developer Intern",
      "companyName": "Integrin Enterprise Solutions",
      "location": "Coimbatore, Tamil Nadu+1 location",
      "stipend": "₹5,500 - ₹7,000 a month",
      "link": "https://in.indeed.com/company/Integrin-Enterprise-Solutions/jobs/Java-Full-Stack-Developer-Intern-9aef9ebdbcdb44d8?fccid=8b17bdd6a69efb59&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Candidates will contribute to software development, integration with different systems, software release management, and operations.\n",
      "postedDate": "PostedToday"
    },
    {
      "site": "Indeed",
      "title": "Lead Software Engineer",
      "companyName": "Govivace Research and Software Services India Pvt...",
      "location": "Remote in Gautam Budh Nagar, Uttar Pradesh",
      "stipend": "₹25,000 - ₹1,00,000 a month",
      "link": "https://in.indeed.com/company/Govivace-Research-and-Software-Services-India-Pvt-Ltd/jobs/Lead-Software-Engineer-0775830eef4fb629?fccid=6de90ba9335d09b4&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Analyze and resolve technical issues related to software functionality and performance.\n Bachelor/master degree in respective fields like B.Tech/BSc.\n",
      "postedDate": "EmployerActive 4 days ago"
    },
    {
      "site": "Indeed",
      "title": "Next JS Front End Developer Intern",
      "companyName": "Absolute Compliance Private Limited",
      "location": "Remote in Bhopal, Madhya Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/company/Absolute-Compliance/jobs/Next-Js-Front-End-Developer-Intern-07ccaadf36f3defc?fccid=747d6f39e350eea1&vjs=3",
      "tags": "Easily apply",
      "description": "  Availability for 6 months, We will give time off during exams as required.\n Software development: 1 year (Preferred).\n Job Types: Full-time, Internship.\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Mobile Application Development - Software Engineer",
      "companyName": "LilySys Solutions Private Limited",
      "location": "Delhi, Delhi",
      "stipend": "₹8,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/company/LilySys-Solutions-Private-Limited/jobs/Mobile-Application-Development-60e19276ce7f3ddb?fccid=151c65600654acc5&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  You will get chance to work on full life cycle of software development including requirement understanding, designing, development, testing, maintenance and…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "GSK Technologies",
      "location": "Puducherry, Puducherry",
      "stipend": "₹8,278 - ₹36,510 a month",
      "link": "https://in.indeed.com/company/GSK-Technologies/jobs/Web-Developer-669103b88b7a8f38?fccid=c367d24427c5dbcf&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Bachelor’s Degree in Computer Science or related field.\n 2+ years’ experience in application development and testing.\n Total work: 1 year (Preferred).\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Mobile Application Developer Internship",
      "companyName": "Redgates IT Solutions",
      "location": "Remote",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/RedGates-IT-Solutions/jobs/Mobile-Application-Developer-Internship-2990205309c9f84e?fccid=aa3d102219ed3c56&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Our services cover the entire app lifecycle - conception, design, development, deployment, testing, release to app stores, and ongoing support.\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Training Program on Live Project",
      "companyName": "Trucksvilla Logistics",
      "location": "Remote in Nagpur, Maharashtra",
      "stipend": "₹10,000 - ₹15,000 a month",
      "link": "https://in.indeed.com/company/Trucksvilla-Logistics/jobs/Software-Development-Training-Program-Live-Project-04a4ce3ee216a6ca?fccid=3acc585df2e0bef3&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Trucksvilla logistics is arranged Training Program on Live Project.\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer – Haskell",
      "companyName": "vacation labs",
      "location": "Porvorim, Goa",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a64b1de35dfbabec&fccid=5b3b0c70132f8412&vjs=3",
      "tags": "",
      "description": "  At least 6 months of experience with an FP-lang, eg Haskell, Elm, Purescript, Scala, F# etc.\n Someone who can take ownership and can operate in an environment of…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer",
      "companyName": "humit",
      "location": "Remote",
      "stipend": "₹15,000 - ₹25,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=4a920f42bc19d387&fccid=6d269c0d3ee39211&vjs=3",
      "tags": "",
      "description": "  Humit, a social networking app for bite-sized audio sharing and discovery, is looking for Frontend Engineering Interns, to join us in our pursuit to build the…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "HashHackCode",
      "location": "Chennai, Tamil Nadu",
      "stipend": "₹5,000 a month",
      "link": "https://in.indeed.com/company/HashHackCode/jobs/Web-Developer-Intern-e2921b661970a036?fccid=817160f1815ad922&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  In-depth knowledge of software prototyping and UX design tools.\n You will oversee the design, coding, and implementation of our web projects and build our in…\n",
      "postedDate": "PostedPosted 5 days ago"
    },
    {
      "site": "Indeed",
      "title": "Javascript Full Stack Developer",
      "companyName": "Tech Inject Global Solutions LLP",
      "location": "Chandigarh, Chandigarh",
      "stipend": "₹5,00,000 - ₹8,00,000 a year",
      "link": "https://in.indeed.com/company/Tech-Inject-Global-Solutions-LLP/jobs/Javascript-Full-Stack-Developer-83e7ff69b531a07c?fccid=89cb25c2fb65c0de&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Build scalable, high-performance, and user-friendly web applications using using frontend libraries / frameworks like React / Svelte / Vue .\n",
      "postedDate": "PostedPosted 4 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Varadvinayak Infotech Pvt Ltd",
      "location": "Remote in Mumbai, Maharashtra",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Varadvinayak-Infotech-Pvt-Ltd/jobs/Software-Developer-845c28cbacc86fba?fccid=6ef48f4dbb20b186&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  SHOULD HAVE KNOWLEDGE IN HTML, CSS, PHP, JAVA, SQL, WEBSITE UI DESIGN, ANDROID APP DEVELOPERS ETC.\n DEPEND UPON PERFORMANCE WILL DECIDE TO MAKE EMPLOYEE…\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Associate Software Engineer",
      "companyName": "CStream Inc.",
      "location": "Temporarily Remote in Chennai, Tamil Nadu",
      "stipend": "From ₹2,40,000 a year",
      "link": "https://in.indeed.com/company/CStream-Inc./jobs/Associate-Software-Engineer-f3394772a191e97b?fccid=b28637c8d8a436df&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Experience with software development and management tools like Jira, Git, Visual Studio Code.\n Experience with software development and management tools like…\n",
      "postedDate": "EmployerActive 10 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front End Developer",
      "companyName": "CYGEN",
      "location": "Hyderabad, Telangana",
      "stipend": "₹1,80,000 - ₹5,00,000 a year",
      "link": "https://in.indeed.com/company/Cygen/jobs/Front-End-Developer-7d5de6e41b920a2e?fccid=7a05055f821ff93b&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Minimum of 1 years of experience developing modern, responsive, and cross-browser-compatible websites using HTML, CSS, and JavaScript.\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "WFH - Java Developer-Freelance Position",
      "companyName": "eNation Solutions Pvt. Ltd.,",
      "location": "Remote in Chennai, Tamil Nadu",
      "stipend": "₹40,000 - ₹75,000 a month",
      "link": "https://in.indeed.com/company/eNation-Solutions-Pvt.-Ltd.,/jobs/Wfh-8d6d59ed8d404e58?fccid=6e5906855525fa5a&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Hands on experience in 3-tier architecture environments with MS Internet explorer, Web server, Web logic 12c, and Oracle 8i/9i/10g database;\n",
      "postedDate": "PostedPosted 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "MERN Web Stack Developer",
      "companyName": "vInnovate Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=1383ec912f2d85c8&fccid=3afe1e53dbe9293a&vjs=3",
      "tags": "",
      "description": "  HTML5, CSS, Bootstrap, JavaScript, ReactJS, NodeJS, MySQL, MongoDB,Exposure to Agile, DevOps, Cloud will be added advantage.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Python Developer Intern",
      "companyName": "Xrevol Technologies Private Limited",
      "location": "Bengaluru, Karnataka",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Xrevol-Technologies-Private-Limited/jobs/Python-Developer-Intern-1aa15d3ecf58c994?fccid=faa4c655042a0fed&vjs=3",
      "tags": "Easily applyResponsive employer",
      "description": "  Develop and implement face and object recognition tools and software using GO.\n Develop and maintain Python-based applications using one or more Python web…\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "7 Dots Smart Solutions (OPC) Private Limited",
      "location": "Hyderabad, Telangana",
      "stipend": "₹10,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/7-Dots-Smart-Solutions-(OPC)-Private-Limited/jobs/Web-Developer-Intern-40ee3319b7ba4d19?fccid=af8b3430c6a81f29&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Good at software engineering principles and algorithms.\n Designing and building intuitive and visually appealing user interfaces for our products using modern…\n",
      "postedDate": "EmployerActive 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "Backend Engineer",
      "companyName": "Replicon",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=442dcf193496f671&fccid=a292f3c3173416ca&vjs=3",
      "tags": "Easily apply",
      "description": "  You know how to design, explain and build a resilient, scalable, secure and observable system from scratch.\n Software development and system architecture skills …\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Embedded Software Engineer",
      "companyName": "Dhi Technologies",
      "location": "Ghorpadi, Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=214d66dbc0b11c38&fccid=7dc0c2d9e5c8243d&vjs=3",
      "tags": "",
      "description": "  Work closely with other developer leads / managers / architects & test teams, gather requirements, prioritize development efforts & deliver business value.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer - Test",
      "companyName": "PhonePe",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=6f1be7ef6775c1a9&fccid=9efe0489759405d1&vjs=3",
      "tags": "",
      "description": "  5 + years of software development and testing experience with strong people management.\n Debugging, solid communication, with the ability to track multiple test…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer and Designer",
      "companyName": "Employee Hub LLP",
      "location": "Remote",
      "stipend": "₹6,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/Employee-Hub-LLP/jobs/Web-Developer-Designer-9d8df7db2f5a0be4?fccid=1626d5f6857f1e6c&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Should have worked with design/creative/UX team.\n Web design: 1 year (Preferred).\n Skills : Wordpress, Woocommerce, Shopify, Magento, PHP, MySQL, Open cart,…\n",
      "postedDate": "PostedPosted 19 days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer (MERN Stack) internship",
      "companyName": "Redgates IT Solutions",
      "location": "Remote",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/RedGates-IT-Solutions/jobs/Full-Stack-Developer-Internship-6eb16fcb44062f67?fccid=aa3d102219ed3c56&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  The role involves engagement with the business on advising the Complete technical side of product conceptualization, development, testing, commissioning, and…\n",
      "postedDate": "EmployerActive 9 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer - Intern",
      "companyName": "Saras Analytics",
      "location": "Remote in Hyderabad, Telangana",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=b3aad6856b0bbbb9&fccid=1809a218656b7d6e&vjs=3",
      "tags": "",
      "description": "  Can step into specific projects to supply additional management, coding and engineering capacity as needed.\n Proficiency in JMS messaging using Apache Zookeeper…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer (Qt)",
      "companyName": "Sciemetric Instruments Inc.",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=61aea16e5f2294bb&fccid=517635b09271cc1f&vjs=3",
      "tags": "",
      "description": "  Working with our team and through individual efforts, you will be involved in the analysis and composition of requirements, design of architectural and…\n",
      "postedDate": "PostedPosted 27 days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Developer",
      "companyName": "Heart It Out",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=e8105e1e59bc0a15&fccid=077cb259e6857b69&vjs=3",
      "tags": "",
      "description": "  Build interactive pages using custom code or page builders tool like elementor, oxybuilder.\n Work with the design team to implement complicated design ideas with…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Hopes Capital",
      "location": "Remote in Nagpur, Maharashtra",
      "stipend": "₹4,500 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/Hopes-Capital/jobs/Software-Developer-7a1a6d449ed3e28d?fccid=9448f8928da0c247&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Fixing and improving existing software.\n Producing clean, efficient code based on specifications.\n Testing and deploying programs and systems.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "HTML Developer Intern",
      "companyName": "Galagali Multimedia",
      "location": "Thane, Maharashtra",
      "stipend": "₹5,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=d77336392a5c76c9&fccid=7ebbbd67d05cf822&vjs=3",
      "tags": "",
      "description": "  We are looking for a creative intern with a high degree of proficiency in web development & design software such Dreamweaver and Adobe Photoshop.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer / Designer / Freshers",
      "companyName": "Velocity Consultancy",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=2c533fefe32c99cb&fccid=9655533acf0547af&vjs=3",
      "tags": "",
      "description": "  Creating websites/a website using standard HTML/CSS practices.\n Proficiency in Photoshop, Illustrator or other visual design and wire-framing tools.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "CogniSaaS Technologies",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=1eedf7abac148909&fccid=e75d3f1dfa1cbef2&vjs=3",
      "tags": "",
      "description": "  Experience of using any hosted source code management system like GitHub.\n Work as part of the dev team on software design, development and testing.\n",
      "postedDate": "PostedPosted 25 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "odoo",
      "location": "Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=db2ef6d4ee62de93&fccid=fb760e4fd5fa7bc8&vjs=3",
      "tags": "",
      "description": "  After 3 weeks of initial training, we'll present you all of them and you'll choose the one you prefer.\n Available 4 months min / 5 days per week.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer Intern",
      "companyName": "Renderpub",
      "location": "Bengaluru, Karnataka",
      "stipend": "₹8,000 - ₹10,000 a month",
      "link": "https://in.indeed.com/company/RenderPub/jobs/Full-Stack-Developer-Intern-55e2cac0a7aa3e9e?fccid=d40154982ced2981&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  RenderPub is a real-time 3D design toolkit and metaverse platform for architectural design and product visualization.\n Experience with using CSS frameworks.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer (Internship)",
      "companyName": "CloudRedux Consultancy Services",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=300384585390a8e3&fccid=62fc259d85e306ac&vjs=3",
      "tags": "",
      "description": "  Software development lifecycle and usage of industry best practices for coding and application design.\n Solid understanding of data structures, algorithms,…\n",
      "postedDate": "PostedPosted 12 days ago"
    },
    {
      "site": "Indeed",
      "title": "React JS Developer",
      "companyName": "Render Infotech",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=0ab3c8324a46507a&fccid=8eff3c3e8ad975d0&vjs=3",
      "tags": "",
      "description": "  1+ years of Strong Experience in React JS, Javascript experience is mandatory.\n Experience : 1 Year To 5 Years.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer Internship",
      "companyName": "Zennode Technologies",
      "location": "Calicut, Kerala",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a56ec3afca2c226c&fccid=3ab7f17a5a82322f&vjs=3",
      "tags": "",
      "description": "  Have a good understanding of software development lifecycle and system design fundamentals.\n You will receive mentorship from experienced engineers and interact…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "Render Infotech",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=2cca345c6d77be30&fccid=8eff3c3e8ad975d0&vjs=3",
      "tags": "",
      "description": "  Experience in web technologies- HTML/CSS/Javascript/Bootstrap/Wordpress.\n Experience: 0.5 Year To 2 Years.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Angular Developer Intern",
      "companyName": "Indian Institute of Digital Education",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=7db94064f35d1561&fccid=858898ea691471da&vjs=3",
      "tags": "",
      "description": "  Identify and resolve front-end code issues, ensuring the elimination of bugs.\n Create clear, concise documentation to support code implementation.\n",
      "postedDate": "PostedJust posted"
    },
    {
      "site": "Indeed",
      "title": "Internship in Mohali Punjab as PHP developers & Web designers",
      "companyName": "e-Coding Hub Pvt. Ltd.",
      "location": "Mohali, Punjab",
      "stipend": "₹10,000 - ₹20,000 a month",
      "link": "https://in.indeed.com/company/e--Coding-Hub-Pvt.-Ltd./jobs/Internship-Punjab-PHP-Developer-Web-Designer-222f4d4c133e23a9?fccid=cd8ad93d2595e314&vjs=3",
      "tags": "Easily applyResponsive employerUrgently hiringHiring multiple candidates",
      "description": "  After *6 Months Internship*, good performing Candidates will be offered with full time job contracts also.\n All students who want to learn PHP Programming & Web…\n",
      "postedDate": "PostedPosted 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "ReactJs Front-end Developer Trainee",
      "companyName": "Creative Web Mall (India)",
      "location": "Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=57cbdea8ae013513&fccid=47f938f71120c031&vjs=3",
      "tags": "",
      "description": "  Any graduate with good knowledge on ReactJs Front-end.\n Good hold on English is a must.\n A computer with internet connection is needed as we are currently…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Microsoft DOTNET Software Engineer",
      "companyName": "V2 Technologies",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=b2dfd06b644d5bfd&fccid=1beface4eb9762df&vjs=3",
      "tags": "Easily apply",
      "description": "  Excellent ability to visualize, structure, and prototype solutions.\n 0-10 years of web development using C#, ASP .NET.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Front end developer - Internship",
      "companyName": "EnrichAI",
      "location": "India",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=8c5fd4c3f8a99462&fccid=21e97d53858dab19&vjs=3",
      "tags": "",
      "description": "  You participate in the development of exciting and innovative technology for our customer solutions at the side of experienced colleagues.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Embedded Software Developer",
      "companyName": "AERON SYSTEMS PVT LTD",
      "location": "Pune, Maharashtra",
      "stipend": "From ₹3,00,000 a year",
      "link": "https://in.indeed.com/company/Aeron-Systems-Pvt.-Ltd./jobs/Embedded-Software-Developer-2f591151ab035bb6?fccid=60762a1c0d0ce633&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "   Experience in embedded software coding.\n  Design, develop, code, test and debug system software.\n  Familiarity with software configuration management tools,…\n",
      "postedDate": "EmployerActive 7 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "SMARTJUNCTION",
      "location": "Remote in Bhubaneswar, Orissa",
      "stipend": "₹10,000 - ₹30,000 a month",
      "link": "https://in.indeed.com/company/SMARTJUNCTION/jobs/Web-Developer-3bda68800e36b380?fccid=f105cf7a41cd2df0&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Job Types: Full-time, Part-time, Regular / Permanent, Fresher, Internship, Contractual / Temporary, Freelance, Volunteer.\n Part-time hours: 40 per week.\n",
      "postedDate": "PostedPosted 23 days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Intern",
      "companyName": "NK Securities",
      "location": "Gandhinagar, Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=5f21ca6f864ab6e9&fccid=861ffed1c6ec3b4d&vjs=3",
      "tags": "",
      "description": "  Optimize trading systems by using networks and systems programming.\n Own and be responsible for modules including research, design, development, deployment,…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "PHP Web Developer Interns",
      "companyName": "Esenceweb",
      "location": "Pune, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a7084435e92dd153&fccid=78dc905985aeb5bc&vjs=3",
      "tags": "",
      "description": "  Required Skils: Hands-on practice of HTML, CSS, Bootstrap, Javascript, Jquery, My SQL Database, PHP Codeigniter Framework.\n",
      "postedDate": "PostedPosted 20 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front End Developer",
      "companyName": "Solvyfi Pvt. Ltd.",
      "location": "Jaipur, Rajasthan",
      "stipend": "₹10,000 - ₹30,000 a month",
      "link": "https://in.indeed.com/company/Solvyfi-Pvt.-Ltd./jobs/Front-End-Developer-cc5f87f1cade2ea7?fccid=3d43206e3dc558ed&vjs=3",
      "tags": "Easily apply",
      "description": "  Co-ordination with fellow developers.\n Job Types: Full-time, Regular / Permanent, Fresher, Internship.\n Jaipur, Rajasthan: Reliably commute or planning to…\n",
      "postedDate": "EmployerActive 11 days ago"
    },
    {
      "site": "Indeed",
      "title": "Front end developer",
      "companyName": "Grupverse",
      "location": "Bhubaneswar, Orissa",
      "stipend": "₹1,000 a month",
      "link": "https://in.indeed.com/company/Grupverse/jobs/Front-End-Developer-eec841d9165b7a52?fccid=354ea54b81cf738f&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Make readable code, integrate various UI components and achieve the proposed design.\n No fixed 9 to 5 schedule during the day, but has to complete the given…\n",
      "postedDate": "EmployerActive 14 days ago"
    },
    {
      "site": "Indeed",
      "title": "Intern Software Developer",
      "companyName": "TriMindTech Solutions Pvt Ltd",
      "location": "Hyderabad, Telangana",
      "stipend": "₹10,000 - ₹12,000 a month",
      "link": "https://in.indeed.com/company/TriMindTech-Solutions-Pvt-Ltd/jobs/Intern-Software-Developer-f78a526ae67ec9b3?fccid=e05b4e594d729dce&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Compensation:* 10 - 15K per month during Internship, 2.5 to 3LPA after internship (CTC may vary based on performance during internship).\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Leads To Company",
      "location": "Remote in Kolkata, West Bengal",
      "stipend": "₹10,306 - ₹39,367 a month",
      "link": "https://in.indeed.com/company/Leads-To-Company/jobs/Software-Developer-4d6ee197a997d233?fccid=c052af36958d01db&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Experience using GitHub or similar environment.\n Write well designed, testable, efficient code.\n Proficient understanding of code versioning tools, such as Git.\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer - Intern (Remote/Gurgaon)",
      "companyName": "Tealfeed",
      "location": "Remote in Gurgaon District, Haryana",
      "stipend": "₹25,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=8096515b8fa9d87c&fccid=318044dbb8281914&vjs=3",
      "tags": "",
      "description": "  Understanding of state management using context or Redux.\n Building and maintaining frontend applications using Next.js.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer Intern",
      "companyName": "Viral Inbound",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=c7450fd606bb36ee&fccid=4e384931a1a53596&vjs=3",
      "tags": "",
      "description": "  Developing back-end website applications.\n Strong analytical and problem-solving skills.\n Ensuring the multi-device responsiveness of applications.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Testing Engineer",
      "companyName": "Mirabilis Design",
      "location": "Chennai, Tamil Nadu",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=d693506ad03951f1&fccid=f740c42a943c7fc0&vjs=3",
      "tags": "",
      "description": "  Write a Python script to call a java application.\n When the java application finishes, compare the XML and text files saved from this Java application with the…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Embedded C Software Engineer",
      "companyName": "DDSat Technologies Private Limited",
      "location": "Remote in Ghaziabad, Uttar Pradesh",
      "stipend": "From ₹10,000 a month",
      "link": "https://in.indeed.com/company/DDSat-Technologies-Private-Limited/jobs/Embedded-C-Software-Engineer-83b64e690f91ba6a?fccid=0f152e708378aa53&vjs=3",
      "tags": "Easily apply",
      "description": "  LCD, Matrix keypad, Menu-tree based functions, Automation of Motors.\n Qualification: Engineering Student / BE/BTECH with formal certification of Embedded C…\n",
      "postedDate": "PostedPosted 18 days ago"
    },
    {
      "site": "Indeed",
      "title": "Microsoft DOTNET Software Engineer",
      "companyName": "V2 Technologies",
      "location": "Remote in Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=b2dfd06b644d5bfd&fccid=1beface4eb9762df&vjs=3",
      "tags": "Easily apply",
      "description": "  Excellent ability to visualize, structure, and prototype solutions.\n 0-10 years of web development using C#, ASP .NET.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "WFH - Java Developer-Freelance Position",
      "companyName": "eNation Solutions Pvt. Ltd.,",
      "location": "Remote in Chennai, Tamil Nadu",
      "stipend": "₹40,000 - ₹75,000 a month",
      "link": "https://in.indeed.com/company/eNation-Solutions-Pvt.-Ltd.,/jobs/Wfh-8d6d59ed8d404e58?fccid=6e5906855525fa5a&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Hands on experience in 3-tier architecture environments with MS Internet explorer, Web server, Web logic 12c, and Oracle 8i/9i/10g database;\n",
      "postedDate": "PostedPosted 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "WebSoulLabs",
      "location": "Remote in Ernakulam, Kerala",
      "stipend": "₹5,000 a month",
      "link": "https://in.indeed.com/company/WebSoulLabs/jobs/Web-Developer-Intern-9158f57c201610e8?fccid=1ede901f9ab34823&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Position* : Web Developer Intern(*Paid Training*).\n Working on the front-end to create an interactive user interface (UI).\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer",
      "companyName": "Leads To Company",
      "location": "Remote in Kolkata, West Bengal",
      "stipend": "₹10,306 - ₹39,367 a month",
      "link": "https://in.indeed.com/company/Leads-To-Company/jobs/Software-Developer-4d6ee197a997d233?fccid=c052af36958d01db&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Experience using GitHub or similar environment.\n Write well designed, testable, efficient code.\n Proficient understanding of code versioning tools, such as Git.\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Developer (MERN Stack) internship",
      "companyName": "Redgates IT Solutions",
      "location": "Remote",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/RedGates-IT-Solutions/jobs/Full-Stack-Developer-Internship-6eb16fcb44062f67?fccid=aa3d102219ed3c56&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  The role involves engagement with the business on advising the Complete technical side of product conceptualization, development, testing, commissioning, and…\n",
      "postedDate": "EmployerActive 9 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "Pyther Innovations Private Limited",
      "location": "Ahmadabad, Gujarat",
      "stipend": "₹8,000 - ₹25,000 a month",
      "link": "https://in.indeed.com/company/Pyther-innovations-Private-Limited/jobs/Web-Developer-8dfdce1f8053cd82?fccid=d2040e51f898267c&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Final Technical + HR Round.\n We are a trusted Digital Engineering partner, with deep technical expertise and industry experience to create unique offerings to…\n",
      "postedDate": "PostedPosted 16 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Internship",
      "companyName": "Tech Soft Solutions",
      "location": "Remote in Sirhind, Punjab",
      "stipend": "₹1,000 - ₹1,500 a month",
      "link": "https://in.indeed.com/company/TECH-SOFT-SOLUTIONS/jobs/Web-Developer-Internship-f0a54370786254bb?fccid=52cccbc38252f922&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  You will get proper training also, so don't hesitate to apply if you don't have any coding background.\n Currently offering \"Project Internship in Full Stack Web…\n",
      "postedDate": "Hiring ongoing"
    },
    {
      "site": "Indeed",
      "title": "Internship full stack web developer",
      "companyName": "White Vectors",
      "location": "Remote in Chandigarh, Chandigarh",
      "stipend": "₹15,000 a month",
      "link": "https://in.indeed.com/company/White-Vectors/jobs/Internship-Full-Stack-Web-Developer-77bb7610961664f9?fccid=a8a80af2bf0e678d&vjs=3",
      "tags": "Easily applyResponsive employerHiring multiple candidates",
      "description": "  Understanding of Agile software development methodologies.\n Candidates must have experience using Microsoft Azure to build and deploy applications, as well as a…\n",
      "postedDate": "EmployerActive 1 day ago"
    },
    {
      "site": "Indeed",
      "title": "Urgent Requirement: Software Engineer (.Net)",
      "companyName": "Thorias.com",
      "location": "Ahmedabad, Gujarat",
      "stipend": "",
      "link": "https://in.indeed.com/company/Thorias.com/jobs/Requirement-3611d7a858f1241d?fccid=2c04af0fe98ebd06&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  \\*Plan, review, and perform analysis, design, coding, testing and implementation of software systems.\n \\*A strong application design and coding skills.\n",
      "postedDate": "EmployerActive 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Mobile App Developer",
      "companyName": "Rivan Solutions",
      "location": "Secunderabad, Telangana",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=b63fc7699a17d441&fccid=72c6b1c217ab48d5&vjs=3",
      "tags": "",
      "description": "  Working with client and server-side.\n Working on the development of new applications on Flutter.\n Working on existing applications on Flutter.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Designer & Developer Internship",
      "companyName": "Dreams International",
      "location": "Pune, Maharashtra",
      "stipend": "₹3,000 a month",
      "link": "https://in.indeed.com/company/Dreams-International/jobs/Web-Designer-Developer-Internship-294ebb42ab1b5865?fccid=2755b52224ff8ee2&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Create new and edit existing CSS files to achieve web page design goals.\n Code basic HTML by hand and/or with the use of Notepad++ / Visual Studio.\n",
      "postedDate": "EmployerActive 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer and Designer",
      "companyName": "Almeka Technologies",
      "location": "Ernakulam, Kerala",
      "stipend": "₹30,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/company/Almeka-Technologies/jobs/Web-Developer-Designer-f2ef6c53f8f60977?fccid=c61b4b9b94aca9ad&vjs=3",
      "tags": "Easily applyUrgently hiringHiring multiple candidates",
      "description": "  Designing and managing the website back-end including database and server integration.\n Meeting with clients to discuss website design and function.\n",
      "postedDate": "PostedToday"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Intern",
      "companyName": "NovusArk",
      "location": "Vadodara, Gujarat",
      "stipend": "₹3,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/NovusArk/jobs/Web-Developer-Intern-7de2912cc7f187d5?fccid=d3cfa09a2fc2f348&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Knowledge of anything else is an added benefit.\n Familiarity with front-end technologies (HTML5, CSS, JavaScript, bootstrap).\n Find and suggest good UI designs.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Embedded C Software Engineer",
      "companyName": "DDSat Technologies Private Limited",
      "location": "Remote in Ghaziabad, Uttar Pradesh",
      "stipend": "From ₹10,000 a month",
      "link": "https://in.indeed.com/company/DDSat-Technologies-Private-Limited/jobs/Embedded-C-Software-Engineer-83b64e690f91ba6a?fccid=0f152e708378aa53&vjs=3",
      "tags": "Easily apply",
      "description": "  LCD, Matrix keypad, Menu-tree based functions, Automation of Motors.\n Qualification: Engineering Student / BE/BTECH with formal certification of Embedded C…\n",
      "postedDate": "PostedPosted 18 days ago"
    },
    {
      "site": "Indeed",
      "title": "Trainee Software Developer - .Net/MVC/React Js",
      "companyName": "Osource Global",
      "location": "Navi Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=a59cb88f10a7967b&fccid=71bd5c5b8cb9160a&vjs=3",
      "tags": "",
      "description": "  Skills - Basic Knowledge In Programming & Analytical Skill, Minimum 3-4 months Course / Internship in ASP.net / MVC / React JS, We also offer 5 Days Week Open…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Solidity Developer",
      "companyName": "Dyeus",
      "location": "Remote in Delhi, Delhi",
      "stipend": "₹6,00,000 - ₹12,00,000 a year",
      "link": "https://in.indeed.com/company/Dyeus/jobs/Solidity-Developer-8d5f11c536d93afe?fccid=b883bdec308906a3&vjs=3",
      "tags": "Easily applyResponsive employerUrgently hiringHiring multiple candidates",
      "description": "  To write, test, and deploy contracts on blockchains like Ethereum using the Solidity programming language.\n Work with a talented design team and senior engineers…\n",
      "postedDate": "PostedPosted 26 days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer",
      "companyName": "GSK Technologies",
      "location": "Puducherry, Puducherry",
      "stipend": "₹8,278 - ₹36,510 a month",
      "link": "https://in.indeed.com/company/GSK-Technologies/jobs/Web-Developer-669103b88b7a8f38?fccid=c367d24427c5dbcf&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Bachelor’s Degree in Computer Science or related field.\n 2+ years’ experience in application development and testing.\n Total work: 1 year (Preferred).\n",
      "postedDate": "PostedPosted 3 days ago"
    },
    {
      "site": "Indeed",
      "title": "Odoo Developers",
      "companyName": "IQminds Technology",
      "location": "Remote in Noida, Uttar Pradesh",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=17bf1ba550d41386&fccid=a34a0eda4c1e15ba&vjs=3",
      "tags": "",
      "description": "  Consistently create quality software that meets specific design and requirements on stated timelines.\n With 2-4 Years of Exp (1 Position).\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Engineer",
      "companyName": "aerxlabs",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=90b9f2e2baea754a&fccid=1a170fdf9f2bca1e&vjs=3",
      "tags": "Easily apply",
      "description": "  2-4 Years of professional experience in VC++, MFC and Windows GUI programming or 2-4 Years.\n Hand-son experience in using development tools (like IDEs, Debuggers…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer - Intern",
      "companyName": "Glood.AI",
      "location": "Remote in New Delhi, Delhi",
      "stipend": "₹15,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=aab0d42eb3ce2dbf&fccid=ee51eed1ad067c17&vjs=3",
      "tags": "",
      "description": "  No time for fussing around.\n Work on building & improving end to end stacks such as analytics, recommendation engine, storefront widgets, dashboards, etc.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Developer Intern",
      "companyName": "Concept Solutions",
      "location": "Thiruvananthapuram, Kerala",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=d2353470447cfc01&fccid=dfd8b704e3af91e7&vjs=3",
      "tags": "",
      "description": "  Extensive knowledge in object-oriented analysis, designs concepts and design patterns.\n Concept Solutions is looking for a number of intelligent, hard-working,…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Web Developer Internship",
      "companyName": "Wiculty Learning Solutions",
      "location": "Bengaluru, Karnataka",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=dd10e2b19b65f2d8&fccid=62cf11e8e5683baf&vjs=3",
      "tags": "",
      "description": "  Able to solve complex problemsHigh degree of independent judgment.\n Basic knowledge of modern HTML/CSSKnowledge with at least one of the following programming…\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Full Stack Web Developer",
      "companyName": "vInnovate Technologies",
      "location": "Remote",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=2037e5623417bb41&fccid=3afe1e53dbe9293a&vjs=3",
      "tags": "",
      "description": "  HTML5, CSS, Bootstrap, JavaScript, PHP, ReactJS, NodeJS, MySQL.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Engineer III",
      "companyName": "ZoomInfo Technologies LLC",
      "location": "Chennai, Tamil Nadu",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=94581a311ea87388&fccid=56c25448bab54e90&vjs=3",
      "tags": "Easily apply",
      "description": "  Well versed with design and development of presentation layer for web applications using technologies like ReactJS.\n Integration with 3rd party frameworks.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Python Developer",
      "companyName": "Testbook.com",
      "location": "Navi Mumbai, Maharashtra",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=952f1ca53a83fba5&fccid=29d508e7d8fb520b&vjs=3",
      "tags": "Easily apply",
      "description": "  Writing scalable code using Python programming language.\n Coordinating with development teams to determine application requirements.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "HTML Developer",
      "companyName": "Outreachdeal",
      "location": "Jaipur, Rajasthan",
      "stipend": "₹4,000 - ₹5,000 a month",
      "link": "https://in.indeed.com/company/Outreachdeal/jobs/HTML-Developer-e81d3c092e9e2c43?fccid=9d1d25761eda56f6&vjs=3",
      "tags": "Easily applyHiring multiple candidates",
      "description": "  Work with the design team and design tools.\n In this role, you will be required to collaborate with Website Designers on the initial web design, write the code.\n",
      "postedDate": "EmployerActive 6 days ago"
    },
    {
      "site": "Indeed",
      "title": "Back-end Developer (Python, MongoDB, AWS)",
      "companyName": "EnactOn Technologies",
      "location": "Remote in Surat, Gujarat",
      "stipend": "₹4,80,000 - ₹18,00,000 a year",
      "link": "https://in.indeed.com/rc/clk?jk=4b3e9805d755fa64&fccid=5709600aba0f4f56&vjs=3",
      "tags": "",
      "description": "  A Backend Developer is one of the primary types of software developers, who create and develop software that runs on a server and a browser.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "INTERNSHIP - SOFTWARE DEVELOPMENT (WITH STIPEND)",
      "companyName": "Aabasoft",
      "location": "Kochi, Kerala",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=ac3692895a9ef20a&fccid=d9064d0c32b14a66&vjs=3",
      "tags": "",
      "description": "  The intern will actively contribute to meaningful projects and work closely with a mentor and with senior leadership on different Software Platforms like .\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Frontend Engineer - Intern (Remote/Gurgaon)",
      "companyName": "Tealfeed",
      "location": "Remote in Gurgaon District, Haryana",
      "stipend": "₹25,000 - ₹40,000 a month",
      "link": "https://in.indeed.com/rc/clk?jk=8096515b8fa9d87c&fccid=318044dbb8281914&vjs=3",
      "tags": "",
      "description": "  Understanding of state management using context or Redux.\n Building and maintaining frontend applications using Next.js.\n",
      "postedDate": "PostedPosted 30+ days ago"
    },
    {
      "site": "Indeed",
      "title": "Software Development Internship",
      "companyName": "FORENSODIGITAL TECHNOLOGIES",
      "location": "Karnal, Haryana",
      "stipend": "",
      "link": "https://in.indeed.com/rc/clk?jk=7cd2aa5dd79d786a&fccid=25583e905a60742d&vjs=3",
      "tags": "Easily apply",
      "description": "  Software Development on Mac (Apple), Linux and Windows using C and C++.\n Sc (Computers, Electronics), MCA, MSc (Computers, Electronics, Mathematics).\n",
      "postedDate": "PostedPosted 30+ days ago"
    },

    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Quality Assurance",
      "companyName": "Times Internet",
      "link": "https://internshala.com/internship/detail/quality-assurance-internship-in-noida-at-times-internet1679717298",
      "location": "Noida",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "NatWest Group",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-delhi-gurgaon-at-natwest-group1679900231",
      "location": "Delhi,Gurgaon",
      "stipend": "45,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Product Development",
      "companyName": "IDA Business Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/product-development-work-from-home-job-internship-at-ida-business-solutions-private-limited1679933153",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI/ML)",
      "companyName": "Hacklab Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-ml-internship-in-bangalore-at-hacklab-solutions-private-limited1679923312",
      "location": "Bangalore",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Hacklab Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-bangalore-at-hacklab-solutions-private-limited1679923287",
      "location": "Bangalore",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development (Backend Development, Webscraping, Neo4j Db)",
      "companyName": "Amber Flux Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-backend-development-webscraping-neo4j-db-work-from-home-job-internship-at-amber-flux-private-limited1679927364",
      "location": "Work From Home",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Full Stack Development",
      "companyName": "Integrin Enterprise Solutions",
      "link": "https://internshala.com/internship/detail/java-full-stack-development-internship-in-multiple-locations-at-integrin-enterprise-solutions1679918776",
      "location": "Coimbatore,Coimbatore North,Coimbatore South",
      "stipend": "5,500-7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Krayton Gaming",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-krayton-gaming1679915953",
      "location": "Work From Home",
      "stipend": "4,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Developement",
      "companyName": "Vayuz Technologies",
      "link": "https://internshala.com/internship/detail/net-developement-internship-in-noida-at-vayuz-technologies1679918937",
      "location": "Noida",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "SkillBit",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-pune-at-skillbit1679913190",
      "location": "Pune",
      "stipend": "4,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ReactJS Development",
      "companyName": "Lambda Vision",
      "link": "https://internshala.com/internship/detail/reactjs-development-work-from-home-job-internship-at-lambda-vision1679920042",
      "location": "Work From Home",
      "stipend": "40 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Monkhub",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-monkhub1679910146",
      "location": "Work From Home",
      "stipend": "5,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "NMS Games Private Limited",
      "link": "https://internshala.com/internship/detail/unity-development-work-from-home-job-internship-at-nms-games-private-limited1679917104",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Joomla Development",
      "companyName": "Engineeers Passion",
      "link": "https://internshala.com/internship/detail/joomla-development-work-from-home-job-internship-at-engineeers-passion1679916182",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Teaching (Game Development)",
      "companyName": "Little Inventors Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/teaching-game-development-work-from-home-job-internship-at-little-inventors-technologies-private-limited1679908703",
      "location": "Work From Home",
      "stipend": "5,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI) (For 5G Communication)",
      "companyName": "IoT& Sensor Lab IIIT Naya Raipur",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-for-5g-communication-internship-in-raipur-at-iot-sensor-lab-iiit-naya-raipur1679914071",
      "location": "Raipur",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Google Dialogflow Chatbot",
      "companyName": "Real Estate News",
      "link": "https://internshala.com/internship/detail/google-dialogflow-chatbot-work-from-home-job-internship-at-real-estate-news1679827231",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "SAP",
      "companyName": "Godrej Koerber Supply Chain Limited",
      "link": "https://internshala.com/internship/detail/sap-internship-in-navi-mumbai-at-godrej-koerber-supply-chain-limited1679912120",
      "location": "Navi Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Madhuri Garments And Manufacturing",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-madhuri-garments-and-manufacturing1679853752",
      "location": "Work From Home",
      "stipend": "3,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Prompt Engineer",
      "companyName": "PVSquare Private Limited",
      "link": "https://internshala.com/internship/detail/prompt-engineer-work-from-home-job-internship-at-pvsquare-private-limited1679901881",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Golang Development",
      "companyName": "Zocket Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/golang-development-internship-in-bangalore-at-zocket-technologies-private-limited1679852631",
      "location": "Bangalore",
      "stipend": "25,000-30,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "LSN SOFTWARE SERVICES Private Limited",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-hyderabad-at-lsn-software-services-private-limited1679904811",
      "location": "Hyderabad",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Full Stack Application Development (Java, ReactJS And MongoDB)",
      "companyName": "LSN SOFTWARE SERVICES Private Limited",
      "link": "https://internshala.com/internship/detail/full-stack-application-development-java-reactjs-and-mongodb-internship-in-hyderabad-at-lsn-software-services-private-limited1679904419",
      "location": "Hyderabad",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "The Renal Project",
      "link": "https://internshala.com/internship/detail/devops-engineering-work-from-home-job-internship-at-the-renal-project1679897129",
      "location": "Work From Home",
      "stipend": "8,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "AI On Edge",
      "companyName": "Shunya IoT AI Research Private Limited",
      "link": "https://internshala.com/internship/detail/ai-on-edge-work-from-home-job-internship-at-shunya-iot-ai-research-private-limited1679893813",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Game Development",
      "companyName": "Apicon Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/unity-game-development-work-from-home-job-internship-at-apicon-solutions-private-limited1679814738",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Zapitel Technovations Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-multiple-locations-at-zapitel-technovations-private-limited1679827829",
      "location": "Delhi,Gurgaon,Noida",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Hackathon Training (Coding Students)",
      "companyName": "GEMA Education Technology Private Limited",
      "link": "https://internshala.com/internship/detail/hackathon-training-coding-students-work-from-home-job-internship-at-gema-education-technology-private-limited1679804063",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development (Photogrammetry)",
      "companyName": "Alecado Systems",
      "link": "https://internshala.com/internship/detail/game-development-photogrammetry-work-from-home-job-internship-at-alecado-systems1679692635",
      "location": "Work From Home",
      "stipend": "3,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Elysium Academy Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-coimbatore-at-elysium-academy-private-limited1679726432",
      "location": "Coimbatore",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps",
      "companyName": "Medius Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/devops-internship-in-mumbai-at-medius-technologies-private-limited1679665193",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Teaching (Programming: Java)",
      "companyName": "FavTutor",
      "link": "https://internshala.com/internship/detail/teaching-programming-java-work-from-home-job-internship-at-favtutor1679718401",
      "location": "Work From Home",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "ForAll A-Tech",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-bhopal-at-forall-a-tech1679680837",
      "location": "Bhopal",
      "stipend": "5,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "PractWorks Mentors Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-work-from-home-job-internship-at-practworks-mentors-private-limited1679657753",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (Using Python)",
      "companyName": "Nxtlogic Software Solutions",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-using-python-internship-in-multiple-locations-at-nxtlogic-software-solutions1679659496",
      "location": "Chennai,Coimbatore,Madurai",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "POC Development",
      "companyName": "Astute Lex Servicado Private Limited",
      "link": "https://internshala.com/internship/detail/poc-development-work-from-home-job-internship-at-astute-lex-servicado-private-limited1678445917",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unreal Development",
      "companyName": "HEXR Factory",
      "link": "https://internshala.com/internship/detail/unreal-development-internship-in-chennai-at-hexr-factory1679658153",
      "location": "Chennai",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Logibricks Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-pune-at-logibricks-technologies-private-limited1679658040",
      "location": "Pune",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Design",
      "companyName": "Eupheus Learning",
      "link": "https://internshala.com/internship/detail/react-native-design-internship-in-delhi-at-eupheus-learning1679656510",
      "location": "Delhi",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Programming (AWS DevOps)",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/java-programming-aws-devops-internship-in-gurgaon-at-aaptatt1679650862",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "IESoft Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-iesoft-technologies-private-limited1679649668",
      "location": "Mumbai",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "MunshiG",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-work-from-home-job-internship-at-munshig1679634771",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Ruhm Innovation Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-tumakuru-at-ruhm-innovation-private-limited1679640522",
      "location": "Tumakuru",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering (Web)",
      "companyName": "Hyperlocal Entertainment",
      "link": "https://internshala.com/internship/detail/software-development-engineering-web-internship-in-pune-at-hyperlocal-entertainment1677608007",
      "location": "Pune",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python And AI Coding Instructing",
      "companyName": "Rancho Labs",
      "link": "https://internshala.com/internship/detail/python-and-ai-coding-instructing-work-from-home-job-internship-at-rancho-labs1679644130",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Content Creation (Advanced Java)",
      "companyName": "Learning Curve Technology",
      "link": "https://internshala.com/internship/detail/content-creation-advanced-java-work-from-home-job-internship-at-learning-curve-technology1679633701",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Logical Soft Tech",
      "link": "https://internshala.com/internship/detail/software-development-part-time-job-internship-at-indore-in-logical-soft-tech1679489254",
      "location": "Indore",
      "stipend": "8,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Gaming Animator",
      "companyName": "PlanetMeta.Live",
      "link": "https://internshala.com/internship/detail/gaming-animator-work-from-home-job-internship-at-planetmetalive1679595006",
      "location": "Work From Home",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Studio LCX Fashion Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-studio-lcx-fashion-private-limited1679584868",
      "location": "Mumbai",
      "stipend": "2,500 /week",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "SkillBoard",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-skillboard1679613658",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Techvolt Software Private Limited",
      "link": "https://internshala.com/internship/detail/java-development-part-time-job-internship-at-multiple-locations-in-techvolt-software-private-limited1679573830",
      "location": "Coimbatore,Erode,Karur,Pollachi,Namakkal,Tiruppur,Salem",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Analytics",
      "companyName": "Pinkmoon Technologies",
      "link": "https://internshala.com/internship/detail/software-analytics-internship-in-vijayawada-at-pinkmoon-technologies1679578933",
      "location": "Vijayawada",
      "stipend": "5,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Techvolt Software Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-multiple-locations-at-techvolt-software-private-limited1679574156",
      "location": "Chennai,Coimbatore,Erode,Karur,Tirunelveli,Virudhunagar,Pollachi,Namakkal,Salem,Trichey,Viluppuram",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "Sagaci Systems",
      "link": "https://internshala.com/internship/detail/unity-development-work-from-home-job-internship-at-sagaci-systems1679573482",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "The Crafty Talk",
      "link": "https://internshala.com/internship/detail/machine-learning-work-from-home-job-internship-at-the-crafty-talk1679564504",
      "location": "Work From Home",
      "stipend": "12,700 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "The Crafty Talk",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-work-from-home-job-internship-at-the-crafty-talk1679564401",
      "location": "Work From Home",
      "stipend": "17,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Electronics Hardware Engineering",
      "companyName": "Techolution",
      "link": "https://internshala.com/internship/detail/electronics-hardware-engineering-internship-in-hyderabad-at-techolution1679562015",
      "location": "Hyderabad",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java & Microservices Development",
      "companyName": "NatWest Group",
      "link": "https://internshala.com/internship/detail/java-microservices-development-internship-in-gurgaon-at-natwest-group1679561461",
      "location": "Gurgaon",
      "stipend": "45,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Microservice Development",
      "companyName": "Indian Institute Of Technology Bombay",
      "link": "https://internshala.com/internship/detail/java-microservice-development-internship-in-mumbai-at-indian-institute-of-technology-bombay1679555116",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Data Validation",
      "companyName": "Accrete LLC",
      "link": "https://internshala.com/internship/detail/data-validation-internship-in-mumbai-at-accrete-llc1679559835",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "BoredLeaders Games Private Limited",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-boredleaders-games-private-limited1679543845",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Quantum IT Innovation",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-quantum-it-innovation1679394761",
      "location": "Work From Home",
      "stipend": "8,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Full Stack Development",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/java-full-stack-development-internship-in-gurgaon-at-aaptatt1679548948",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Celetel",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-noida-at-celetel1679478831",
      "location": "Noida",
      "stipend": "15,000-22,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI)",
      "companyName": "Vehicle Care",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-internship-in-gurgaon-at-vehicle-care1679469371",
      "location": "Gurgaon",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native",
      "companyName": "M/S R B Uttam Sahil India Private Limited",
      "link": "https://internshala.com/internship/detail/react-native-work-from-home-job-internship-at-m-s-r-b-uttam-sahil-india-private-limited1679471892",
      "location": "Work From Home",
      "stipend": "8,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Red Apple Learning",
      "link": "https://internshala.com/internship/detail/game-development-internship-in-kolkata-at-red-apple-learning1679464193",
      "location": "Kolkata",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "ANK Digital Media",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-delhi-at-ank-digital-media1679395610",
      "location": "Delhi",
      "stipend": "3,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Android App Development",
      "companyName": "Shri Shyam Sawariya Parivar",
      "link": "https://internshala.com/internship/detail/android-app-development-work-from-home-job-internship-at-shri-shyam-sawariya-parivar1678856251",
      "location": "Work From Home",
      "stipend": "Unpaid",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Power BI Development",
      "companyName": "BlueTide Solutions Pvt Ltd",
      "link": "https://internshala.com/internship/detail/power-bi-development-part-time-job-internship-at-gurgaon-in-bluetide-solutions-pvt-ltd1679460422",
      "location": "Gurgaon",
      "stipend": "15,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "AWS DevOps Engineering",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/aws-devops-engineering-internship-in-gurgaon-at-aaptatt1679459643",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-gurgaon-at-aaptatt1679459083",
      "location": "Gurgaon",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "WhatsApp Chatbot Development",
      "companyName": "CattleGuru Private Limited",
      "link": "https://internshala.com/internship/detail/whatsapp-chatbot-development-work-from-home-job-internship-at-cattleguru-private-limited1679404801",
      "location": "Work From Home",
      "stipend": "3,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering",
      "companyName": "Internshala",
      "link": "https://internshala.com/internship/detail/software-development-engineering-internship-in-gurgaon-at-internshala1679458542",
      "location": "Gurgaon",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Ideekay Studios",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-ideekay-studios1679395315",
      "location": "Work From Home",
      "stipend": "4,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Aarvy Technologies",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-gurgaon-at-aarvy-technologies1679385663",
      "location": "Gurgaon",
      "stipend": "2,000-3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React + .NET Development",
      "companyName": "Eonian Software Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/react-net-development-internship-in-ahmedabad-at-eonian-software-solutions-private-limited1679404081",
      "location": "Ahmedabad",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Development (Conversational AI Product)",
      "companyName": "Phamax Analytic Resources",
      "link": "https://internshala.com/internship/detail/development-conversational-ai-product-work-from-home-job-internship-at-phamax-analytic-resources1679300563",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Technical Support - AI Products",
      "companyName": "Quantian Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/technical-support-ai-products-internship-in-pune-at-quantian-technologies-private-limited1679400016",
      "location": "Pune",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "The Swastik Pharmaceuticals",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-vijayawada-at-the-swastik-pharmaceuticals1679325774",
      "location": "Vijayawada",
      "stipend": "2,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "UAV Pilot And Test Engineering",
      "companyName": "Indian Robo Store",
      "link": "https://internshala.com/internship/detail/uav-pilot-and-test-engineering-internship-in-noida-at-indian-robo-store1679397238",
      "location": "Noida",
      "stipend": "8,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-part-time-job-internship-at-mumbai-in-idz-digital-private-limited1679393933",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Design",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/game-design-internship-in-mumbai-at-idz-digital-private-limited1679393679",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Solidity Development",
      "companyName": "Lambda Vision",
      "link": "https://internshala.com/internship/detail/solidity-development-work-from-home-job-internship-at-lambda-vision1679394027",
      "location": "Work From Home",
      "stipend": "80 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Development",
      "companyName": "Gaura Web Tech",
      "link": "https://internshala.com/internship/detail/react-development-internship-in-ahmedabad-bangalore-at-gaura-web-tech1679391049",
      "location": "Ahmedabad,Bangalore",
      "stipend": "25,000-35,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-mumbai-at-idz-digital-private-limited1679389105",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Blender And Unity Development",
      "companyName": "Futuralis",
      "link": "https://internshala.com/internship/detail/blender-and-unity-development-work-from-home-job-internship-at-futuralis1679386594",
      "location": "Work From Home",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Piyshef Technologies",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-udaipur-at-piyshef-technologies1679375430",
      "location": "Udaipur",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "ARAN",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-coimbatore-at-aran1679374983",
      "location": "Coimbatore",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Robotics Development",
      "companyName": "Peepul Agri Ventures LLP",
      "link": "https://internshala.com/internship/detail/robotics-development-internship-in-hyderabad-at-peepul-agri-ventures-llp1679376784",
      "location": "Hyderabad",
      "stipend": "15,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "GoKapture",
      "link": "https://internshala.com/internship/detail/unity-development-work-from-home-job-internship-at-gokapture1679376598",
      "location": "Work From Home",
      "stipend": "10,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Pressbuddy Software Solutions",
      "link": "https://internshala.com/internship/detail/react-native-development-work-from-home-job-internship-at-pressbuddy-software-solutions1679376358",
      "location": "Work From Home",
      "stipend": "6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "TruLOCAL India Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-trulocal-india-private-limited1679368112",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Vistaar Digital Communications Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-vistaar-digital-communications-private-limited1679289070",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Blackcoffer",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-blackcoffer1679318140",
      "location": "Work From Home",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ASP.NET Development",
      "companyName": "Blackcoffer",
      "link": "https://internshala.com/internship/detail/aspnet-development-work-from-home-job-internship-at-blackcoffer1679318125",
      "location": "Work From Home",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Front End Development (ReactJS)",
      "companyName": "Omikron Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/front-end-development-reactjs-work-from-home-job-internship-at-omikron-technologies-private-limited1679368107",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Embedded Software Development",
      "companyName": "Improvians",
      "link": "https://internshala.com/internship/detail/embedded-software-development-internship-in-mumbai-at-improvians1679323895",
      "location": "Mumbai",
      "stipend": "12,000-14,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Angels Virtual World",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-delhi-at-angels-virtual-world1679316823",
      "location": "Delhi",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Embedded Software And Hardware Engineering",
      "companyName": "Neuranics Lab Private Limited",
      "link": "https://internshala.com/internship/detail/embedded-software-and-hardware-engineering-internship-in-delhi-at-neuranics-lab-private-limited1679302519",
      "location": "Delhi",
      "stipend": "25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Applied AI (Open AI)",
      "companyName": "Persist Ventures",
      "link": "https://internshala.com/internship/detail/applied-ai-open-ai-work-from-home-job-internship-at-persist-ventures1679308211",
      "location": "Work From Home",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "MentorBoxx",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-mentorboxx1679306939",
      "location": "Work From Home",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Research And Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/research-and-development-internship-in-delhi-at-isourse1679305608",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Functional QA - Capital Market",
      "companyName": "NatWest Group",
      "link": "https://internshala.com/internship/detail/functional-qa-capital-market-internship-in-bangalore-at-natwest-group1678959216",
      "location": "Bangalore",
      "stipend": "45,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "DCNPL Private Limited",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-indore-at-dcnpl-private-limited1679293273",
      "location": "Indore",
      "stipend": "2,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Artificial Intelligence (AI) & Deep Learning",
      "companyName": "Stackfusion Private Limited",
      "link": "https://internshala.com/internship/detail/artificial-intelligence-ai-deep-learning-internship-in-pune-at-stackfusion-private-limited1679292792",
      "location": "Pune",
      "stipend": "10,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Development",
      "companyName": "HololabXR",
      "link": "https://internshala.com/internship/detail/unity-development-part-time-job-internship-at-jabalpur-in-hololabxr1679299432",
      "location": "Jabalpur",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Suvya Web",
      "link": "https://internshala.com/internship/detail/net-development-internship-in-surat-at-suvya-web1679287715",
      "location": "Surat",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Go Digital Technology Consulting",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-mumbai-at-go-digital-technology-consulting1679288373",
      "location": "Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ASP.NET/C# Development",
      "companyName": "Go Digital Technology Consulting",
      "link": "https://internshala.com/internship/detail/aspnet-c-development-internship-in-mumbai-at-go-digital-technology-consulting1679288318",
      "location": "Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Data Engineering",
      "companyName": "Go Digital Technology Consulting",
      "link": "https://internshala.com/internship/detail/data-engineering-internship-in-pune-mumbai-at-go-digital-technology-consulting1679288295",
      "location": "Pune,Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ASP.NET Development",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/aspnet-development-work-from-home-job-internship-at-attitude-matterz1679248165",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Robotic Instructing",
      "companyName": "Rancho Labs",
      "link": "https://internshala.com/internship/detail/robotic-instructing-internship-in-delhi-at-rancho-labs1679286408",
      "location": "Delhi",
      "stipend": "8,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Parrami Finance Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-parrami-finance-private-limited1679133330",
      "location": "Mumbai",
      "stipend": "5,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Zezo Softwares Private Limited",
      "link": "https://internshala.com/internship/detail/react-native-development-work-from-home-job-internship-at-zezo-softwares-private-limited1679129798",
      "location": "Work From Home",
      "stipend": "7,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/net-development-work-from-home-job-internship-at-attitude-matterz1679224689",
      "location": "Work From Home",
      "stipend": "4,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/machine-learning-work-from-home-job-internship-at-attitude-matterz1679220673",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering (Web)",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/software-development-engineering-web-work-from-home-job-internship-at-attitude-matterz1679219097",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Machine Learning",
      "companyName": "Buddha Education Association Incorporation",
      "link": "https://internshala.com/internship/detail/machine-learning-work-from-home-job-internship-at-buddha-education-association-incorporation1679126953",
      "location": "Work From Home",
      "stipend": "21,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Megaminds IT Services",
      "link": "https://internshala.com/internship/detail/python-development-work-from-home-job-internship-at-megaminds-it-services1679141852",
      "location": "Work From Home",
      "stipend": "6,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Hvantage Technologies Incorporated",
      "link": "https://internshala.com/internship/detail/net-development-work-from-home-job-internship-at-hvantage-technologies-incorporated1679115678",
      "location": "Work From Home",
      "stipend": "2,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "GPT Development",
      "companyName": "Medius Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/gpt-development-internship-in-mumbai-at-medius-technologies-private-limited1679142519",
      "location": "Mumbai",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Analystt.ai",
      "link": "https://internshala.com/internship/detail/python-development-work-from-home-job-internship-at-analysttai1679119789",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Samisan Tech Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-mumbai-at-samisan-tech-private-limited1679122988",
      "location": "Mumbai",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "SHN Advertising",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-kanpur-at-shn-advertising1679118633",
      "location": "Kanpur",
      "stipend": "4,000-6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Blackcoffer",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-blackcoffer1679117997",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps",
      "companyName": "Zoraware Technologies",
      "link": "https://internshala.com/internship/detail/devops-internship-in-ghaziabad-at-zoraware-technologies1679057604",
      "location": "Ghaziabad",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Ouriken - IT Services & IT Consulting",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-thane-at-ouriken-it-services-it-consulting1679057222",
      "location": "Thane",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "PowerBI Development",
      "companyName": "IntelliSQR",
      "link": "https://internshala.com/internship/detail/powerbi-development-internship-in-delhi-at-intellisqr1679056219",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps",
      "companyName": "DeHaat",
      "link": "https://internshala.com/internship/detail/devops-internship-in-gurgaon-at-dehaat1679050238",
      "location": "Gurgaon",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Data Tagging",
      "companyName": "Salesken",
      "link": "https://internshala.com/internship/detail/data-tagging-internship-in-bangalore-at-salesken1679046415",
      "location": "Bangalore",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "3D Modelling & Texturing For Game Asset (Blender/Maya/Substance Painter)",
      "companyName": "MB Softech Consultants",
      "link": "https://internshala.com/internship/detail/3d-modelling-texturing-for-game-asset-blender-maya-substance-painter-work-from-home-job-internship-at-mb-softech-consultants1678706724",
      "location": "Work From Home",
      "stipend": "5,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Vue.js and Java/Python Development",
      "companyName": "Growlytics Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/vuejs-and-java-python-development-internship-in-bangalore-at-growlytics-technologies-private-limited1679039590",
      "location": "Bangalore",
      "stipend": "15,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Game Development",
      "companyName": "IDZ Digital Private Limited",
      "link": "https://internshala.com/internship/detail/unity-game-development-work-from-home-job-internship-at-idz-digital-private-limited1679036863",
      "location": "Work From Home",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "QT Development",
      "companyName": "CSE, IIT Bombay",
      "link": "https://internshala.com/internship/detail/qt-development-work-from-home-job-internship-at-cse-iit-bombay1679025603",
      "location": "Work From Home",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Roblox Game Development",
      "companyName": "Stareout Games",
      "link": "https://internshala.com/internship/detail/roblox-game-development-work-from-home-job-internship-at-stareout-games1678904585",
      "location": "Work From Home",
      "stipend": "15,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Innovation Hacks AI",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-mumbai-at-innovation-hacks-ai1678974270",
      "location": "Mumbai",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Gape Labs",
      "link": "https://internshala.com/internship/detail/game-development-work-from-home-job-internship-at-gape-labs1678879526",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Robotics",
      "companyName": "Attitude MatterZ",
      "link": "https://internshala.com/internship/detail/robotics-work-from-home-job-internship-at-attitude-matterz1678960696",
      "location": "Work From Home",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Bakerstreet Fintech Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-pune-at-bakerstreet-fintech-private-limited1678951679",
      "location": "Pune",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Tutoring For Java",
      "companyName": "LevelApp",
      "link": "https://internshala.com/internship/detail/tutoring-for-java-work-from-home-job-internship-at-levelapp1678959088",
      "location": "Work From Home",
      "stipend": "3,500-6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity Game Development",
      "companyName": "Stareout Games",
      "link": "https://internshala.com/internship/detail/unity-game-development-work-from-home-job-internship-at-stareout-games1678903792",
      "location": "Work From Home",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Site Galleria",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-site-galleria1678949258",
      "location": "Work From Home",
      "stipend": "3,000-5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "System Administration",
      "companyName": "Plus91 Technologies",
      "link": "https://internshala.com/internship/detail/system-administration-internship-in-patna-pune-at-plus91-technologies1678941616",
      "location": "Patna,Pune",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Electronics Embedded Hardware & Software Engineering",
      "companyName": "Invictus Defence Systems Private Limited",
      "link": "https://internshala.com/internship/detail/electronics-embedded-hardware-software-engineering-internship-in-bangalore-at-invictus-defence-systems-private-limited1678951007",
      "location": "Bangalore",
      "stipend": "15,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Unity3D Game Development",
      "companyName": "The Learning Buddy",
      "link": "https://internshala.com/internship/detail/unity3d-game-development-work-from-home-job-internship-at-the-learning-buddy1678950929",
      "location": "Work From Home",
      "stipend": "5,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Unico Global",
      "link": "https://internshala.com/internship/detail/react-native-development-work-from-home-job-internship-at-unico-global1678870794",
      "location": "Work From Home",
      "stipend": "4,000-7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Hardware Design Engineering",
      "companyName": "Strom Customized Solutions",
      "link": "https://internshala.com/internship/detail/hardware-design-engineering-internship-in-vadodara-at-strom-customized-solutions1678950116",
      "location": "Vadodara",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "RevoltronX",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-revoltronx1678937521",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "UniAcco",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-mumbai-at-uniacco1678941722",
      "location": "Mumbai",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Paarsh Infotech",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-nashik-at-paarsh-infotech1678903050",
      "location": "Nashik",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Gauge.ro (Lalita Ventures)",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-gaugero-lalita-ventures1678891078",
      "location": "Work From Home",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Engineering",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/devops-engineering-internship-in-gurgaon-at-aaptatt1678883551",
      "location": "Gurgaon",
      "stipend": "18,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Infra Administration",
      "companyName": "Code Inbound LLP",
      "link": "https://internshala.com/internship/detail/infra-administration-work-from-home-job-internship-at-code-inbound-llp1678879826",
      "location": "Work From Home",
      "stipend": "1,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Jarvics Technologies",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-multiple-locations-at-jarvics-technologies1678873743",
      "location": "Chandigarh,Patiala,Kharar,Mohali,Kurali",
      "stipend": "8,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Eldrok Technology India",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-gurgaon-at-eldrok-technology-india1678878919",
      "location": "Gurgaon",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Inside Sales Specialist",
      "companyName": "Skill-Lync",
      "link": "https://internshala.com/job/detail/inside-sales-specialist-fresher-jobs-in-multiple-locations-at-skill-lync1677762021",
      "location": "Delhi,Bangalore,Hyderabad,Chennai",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Plushvie",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-ahmedabad-at-plushvie1678866565",
      "location": "Ahmedabad",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "CodeIgniter & Laravel Development",
      "companyName": "Bridcodes Global Private Limited",
      "link": "https://internshala.com/internship/detail/codeigniter-laravel-development-work-from-home-job-internship-at-bridcodes-global-private-limited1678873304",
      "location": "Work From Home",
      "stipend": "6,000-10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "CodeIgniter, Laravel & Vue.js Development",
      "companyName": "QBH Solution Private Limited",
      "link": "https://internshala.com/internship/detail/codeigniter-laravel-vuejs-development-work-from-home-job-internship-at-qbh-solution-private-limited1678870997",
      "location": "Work From Home",
      "stipend": "10,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ROS (Robotics Operating System)",
      "companyName": "Enord Private Limited",
      "link": "https://internshala.com/internship/detail/ros-robotics-operating-system-internship-in-delhi-at-enord-private-limited1678798659",
      "location": "Delhi",
      "stipend": "2,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development Engineering (Web)",
      "companyName": "Yougetplaced Technology Services",
      "link": "https://internshala.com/internship/detail/software-development-engineering-web-work-from-home-job-internship-at-yougetplaced-technology-services1678863648",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Instructor (C,C++&Java)",
      "companyName": "Roboiotics Services LLP",
      "link": "https://internshala.com/internship/detail/instructor-c-c-java-internship-in-chandigarh-bhopal-at-roboiotics-services-llp1678864888",
      "location": "Chandigarh,Bhopal",
      "stipend": "35,000-60,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Peppermint Communications Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-multiple-locations-at-peppermint-communications-private-limited1678771300",
      "location": "Ulhasnagar,Thane,Dombivli,Kalyan,Bhiwandi,Ambernath",
      "stipend": "12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "DevOps Development",
      "companyName": "Jarvics Technologies",
      "link": "https://internshala.com/internship/detail/devops-development-internship-in-chandigarh-mohali-at-jarvics-technologies1678794095",
      "location": "Chandigarh,Mohali",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Python Development",
      "companyName": "Techvins Software Private Limited",
      "link": "https://internshala.com/internship/detail/python-development-internship-in-gurgaon-at-techvins-software-private-limited1678764859",
      "location": "Gurgaon",
      "stipend": "8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "FlutterFlow Development",
      "companyName": "OAK Appian Training",
      "link": "https://internshala.com/internship/detail/flutterflow-development-work-from-home-job-internship-at-oak-appian-training1678787349",
      "location": "Work From Home",
      "stipend": "12,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Softgenics India Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-softgenics-india-private-limited1678716588",
      "location": "Work From Home",
      "stipend": "6,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "API Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/api-development-internship-in-delhi-at-isourse1678783760",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "ASP.NET Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/aspnet-development-internship-in-delhi-at-isourse1678783646",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Product Engineering",
      "companyName": "Dashtoon",
      "link": "https://internshala.com/internship/detail/product-engineering-internship-in-bangalore-at-dashtoon1678781767",
      "location": "Bangalore",
      "stipend": "25,000-40,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "CvDragon India",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-kolkata-howrah-at-cvdragon-india1678773774",
      "location": "Kolkata,Howrah",
      "stipend": "7,500 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Isourse",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-delhi-at-isourse1678778240",
      "location": "Delhi",
      "stipend": "15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Spring Boot",
      "companyName": "Webknot Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/spring-boot-work-from-home-job-internship-at-webknot-technologies-private-limited1678775223",
      "location": "Work From Home",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Webknot Technologies Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-webknot-technologies-private-limited1678774688",
      "location": "Work From Home",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "TechGropse Private Limited",
      "link": "https://internshala.com/internship/detail/react-native-development-internship-in-noida-at-techgropse-private-limited1678773987",
      "location": "Noida",
      "stipend": "7,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "React Native Development",
      "companyName": "Dwebbox",
      "link": "https://internshala.com/internship/detail/react-native-development-internship-in-mumbai-at-dwebbox1678700443",
      "location": "Mumbai",
      "stipend": "10,000-15,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Engineering (React JS)",
      "companyName": "InGen Dynamics Inc. (Part Of AH Dynamics And Robotics Private Limited)",
      "link": "https://internshala.com/internship/detail/software-engineering-react-js-internship-in-kozhikode-bangalore-at-ingen-dynamics-inc-part-of-ah-dynamics-and-robotics-private-limited1678691584",
      "location": "Kozhikode,Bangalore",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Engineering (Python)",
      "companyName": "InGen Dynamics Inc. (Part Of AH Dynamics And Robotics Private Limited)",
      "link": "https://internshala.com/internship/detail/software-engineering-python-internship-in-kozhikode-bangalore-at-ingen-dynamics-inc-part-of-ah-dynamics-and-robotics-private-limited1678691529",
      "location": "Kozhikode,Bangalore",
      "stipend": "3,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Softonauts Infotech Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-multiple-locations-at-softonauts-infotech-private-limited1678444821",
      "location": "Thane,Navi Mumbai,Badlapur,Vashi",
      "stipend": "5,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Game Development",
      "companyName": "Shortgun LLP",
      "link": "https://internshala.com/internship/detail/game-development-internship-in-mumbai-at-shortgun-llp1678431897",
      "location": "Mumbai",
      "stipend": "10,000-25,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Virtual Reality Unity 3D Development",
      "companyName": "Gesture Research",
      "link": "https://internshala.com/internship/detail/virtual-reality-unity-3d-development-internship-in-multiple-locations-at-gesture-research1678443435",
      "location": "Chandigarh,Delhi,Gurgaon",
      "stipend": "7,500 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Kreedy",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-kreedy1678385725",
      "location": "Work From Home",
      "stipend": "2,000 lump sum +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Build With Innovation Private Limited",
      "link": "https://internshala.com/internship/detail/flutter-development-internship-in-delhi-at-build-with-innovation-private-limited1678384141",
      "location": "Delhi",
      "stipend": "10,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Embedded Software Developement",
      "companyName": "Greenmed Technologies",
      "link": "https://internshala.com/internship/detail/embedded-software-developement-part-time-job-internship-at-chennai-in-greenmed-technologies1678338757",
      "location": "Chennai",
      "stipend": "3,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Yougetplaced Technology Services",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-yougetplaced-technology-services1678288130",
      "location": "Work From Home",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Support",
      "companyName": "P.I. Softek Limited",
      "link": "https://internshala.com/internship/detail/net-support-internship-in-noida-at-pi-softek-limited1678337350",
      "location": "Noida",
      "stipend": "20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Flutter Development",
      "companyName": "Settyl",
      "link": "https://internshala.com/internship/detail/flutter-development-work-from-home-job-internship-at-settyl1678299992",
      "location": "Work From Home",
      "stipend": "6,000-8,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "NLP Engineering",
      "companyName": "UniAcco",
      "link": "https://internshala.com/internship/detail/nlp-engineering-internship-in-delhi-at-uniacco1678268191",
      "location": "Delhi",
      "stipend": "15,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "MWW (CryptoKnights)",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-mww-cryptoknights1678082507",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Immersive Design",
      "companyName": "Queppelin Technology Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/immersive-design-internship-in-multiple-locations-at-queppelin-technology-solutions-private-limited1678099063",
      "location": "Faridabad,Delhi,Gurgaon,Noida",
      "stipend": "10,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Java Development",
      "companyName": "Aaptatt",
      "link": "https://internshala.com/internship/detail/java-development-internship-in-gurgaon-at-aaptatt1678096071",
      "location": "Gurgaon",
      "stipend": "18,000 /month +  Incentives",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Robotics & Coding (HOD)",
      "companyName": "EduMarvel",
      "link": "https://internshala.com/internship/detail/robotics-coding-hod-internship-in-mumbai-at-edumarvel1678086961",
      "location": "Mumbai",
      "stipend": "6,000-12,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": ".NET Development",
      "companyName": "Modgenics Technology Solutions Private Limited",
      "link": "https://internshala.com/internship/detail/net-development-work-from-home-job-internship-at-modgenics-technology-solutions-private-limited1678003861",
      "location": "Work From Home",
      "stipend": "12,000-20,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Grafieks Analytics Limited",
      "link": "https://internshala.com/internship/detail/software-development-work-from-home-job-internship-at-grafieks-analytics-limited1674305621",
      "location": "Work From Home",
      "stipend": "5,000 /month",
      "description": ""
    },
    {
      "site": "Internshala",
      "title": "Software Development",
      "companyName": "Aester India Private Limited",
      "link": "https://internshala.com/internship/detail/software-development-internship-in-ernakulam-cochin-at-aester-india-private-limited1677839446",
      "location": "Ernakulam,Cochin",
      "stipend": "2,000 /month",
      "description": ""
    }
    ,
    {
      "site": "LinkedIN",
      "title": "Software Development Engineer In Test",
      "companyName": "Mastercard",
      "location": "Pune, Maharashtra, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  Our Purpose\n\nWe work to connect and power an inclusive, digital economy that benefits everyone, everywhere by making transactions safe, simple, smart and accessible. Using secure data and networks, partnerships and passion, our innovations and solutions help individuals, financial institutions, governments and businesses realize their greatest potential. Our decency quotient, or DQ, drives our culture and everything we do inside and outside of our company. We cultivate a culture of inclusion for all employees that respects their individual strengths, views, and experiences. We believe that our differences enable us to be a better team – one that makes better decisions, drives innovation and delivers better business results.\n\nJob Title\n\nSoftware Development Engineer In Test\n\nSoftware Development Engineer In Test\n\nWho is Mastercard?\n\nMastercard is a global technology company in the payments industry. Our mission is to connect and power an inclusive, digital economy that benefits everyone, everywhere by making transactions safe, simple, smart, and accessible. Using secure data and networks, partnerships and passion, our innovations and solutions help individuals, financial institutions, governments, and businesses realize their greatest potential.\n\nOur decency quotient, or DQ, drives our culture and everything we do inside and outside of our company. With connections across more than 210 countries and territories, we are building a sustainable world that unlocks priceless possibilities for all.\n\nOverview\n\nTo drive our future growth, we are scaling our platform and building new products. Ethoca’s growth is explosive, and only great problem-solvers, collaborators and thinkers can help us take it to the next level. If that sounds like you then keep reading!\n\nWe believe in decoupled, message-driven, and distributed systems. We strive to keep codebases small and manageable. We’re interested in reactive design patterns that will make our systems more resilient and responsive, yet remain elastic to change. As we proceed through our technology roadmap, we are evaluating and implementing new community endorsed technologies for every tier of our platform. Our backend tiers are presently JVM-based. We are using or considering technologies like Kafka, Springboot, ElasticSearch, Angular 10, Bootstrap, Chef, Ansible, Openstack, Docker and so on.\n\nWe want to hire a Software Development Engineer In Test who has a proven record of leading and solutioning full automation testing strategies and lifecycles for microservice-oriented systems using the appropriate industry leading products, patterns, and practices!\n\nRole\n Work as a member of an agile team to design, build, test, and deploy new products and features Create test plans to achieve the best test approach in collaboration with team members Create comprehensive and well-structured test cases for all test types in scope Design automated tests for features Independently design and implement modularized, data driven and reusable tests that can be executed on different environments Develop, maintain and identify improvements to the automation commons libraries and framework that will be used by the scrum teams Troubleshoot defects to resolution and closure Ensure test assets are kept up to date and continually evaluated against test objectives (maintain all testing assets) Execute automated test suites against the released version of the application with a goal of maintaining 100% test stability Support the release process by executing and maintaining test suites for smoke, sanity, regression and operational validation. Conduct reviews of test case coverage for any test types in scope to ensure appropriate risk-based testing approach is achieved. Conduct peer code reviews, providing feedback around logical implementation, and best practice improvement opportunities around patterns, algorithms, library usage, etc. Provide technical guidance, support and mentoring to more junior team members Make technology recommendations that balance business needs and technical requirements Proactively understand stakeholder needs, goals, expectations and viewpoints to deliver results Effectively host technology education forums (i.e. Technology Brown Bag Session) around relevant topics for the wider organization Independently apply problem solving skills to identify symptoms and root causes of issues Make effective and efficient decisions even when data is ambiguous Thrive in a highly collaborative company environment where agility is paramount\n\nAll About You\n Bachelor’s in Computer Science/ Technical Degree or related equivalent experience. Ability to understand new concepts quickly, and apply them accurately through an evolving, dynamic, agile environment. Knowledgeable with Continuous Integration & Delivery principles with an eye for automation Advanced working knowledge of Java. Experience with Selenium WebDriver. Experience using testing frameworks like Junit, TestNG, JMeter. Experience with JavaScript testing frameworks like protractor/jasmine. Experience with testing SOAP/REST web APIs. Working knowledge of DB2 and/or other relational databases. Expertise in microservice-based applications testing using Springboot Excellent knowledge of QA principles within SDLC. Excellent verbal and written communication skills. Experience working in a PCI DSS certified environment Experience working with Linux Virtual Machines in a Cloud Environment Not afraid to speak your mind about software design and on the flip side handle any criticism of your ideas with grace\n\nCorporate Security Responsibility\n\n All activities involving access to Mastercard assets, information, and networks comes with an inherent risk to the organization and, therefore, it is expected that every person working for, or on behalf of, Mastercard is responsible for information security and must\nAbide by Mastercard’s security policies and practices;Ensure the confidentiality and integrity of the information being accessed;Report any suspected information security violation or breach, andComplete all periodic mandatory security trainings in accordance with Mastercard’s guidelines.",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer (Entry Level)",
      "companyName": "MRI Software",
      "location": "Bangalore Rural, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  We are currently seeking a Junior Software Engineer to work within our global Product Development department working to apply defined software development life cycle processes to deliver production ready code of the highest quality, this individual will be diligent in testing their code and working with the team to produce\nMRI Software’s high standard product. This individual will work under the Agile development methodology in a cross-functional environment with other groups, both inside and outside the department including Product Management and Documentation, as well as create and test code in our dynamic team setting\nResponsibilities\nApplies defined practices and procedures to design, implement, and support software projectsBuilds effective working relationships with team membersActively seeks assistance as needed but demonstrates learning and growing independenceActively seeks guidance for prioritization and review of deliverables.Performs and designs testing protocols to ensure that the product is fully tested.\nRequirements\nCurrently pursuing a BE, Btech, MCA, MSC, or BCA Computer Science or related technical field (2022 Passout may also apply)Experience developing software or algorithms based on predetermined specificationsKnowledge of object-oriented programming, Microsoft .Net or Java preferredProficient with Source Control tools Familiarity with database objects (tables, stored procedures, queries, etc.) a plusAttention to detail is a mustGood written and verbal communication skills\nBenefits\nAbility to learn leading technical / industry standards and technologiesFlexible working arrangements (2 days in the office)Annual performance-related bonusHealth insurance6x Flexi Fridays: knock 2.5 hours off your day on a FridayEngaging, fun & inclusive culture: check out the MRI Software APAC Insta feed and stories!\nAbout The Business\nMRI Software is a global Proptech leader delivering innovative applications and hosted solutions that free real estate companies to elevate their business. \nOur flexible technology platform, along with an open and connected ecosystem, allows us to meet the unique needs of real estate businesses, from property-level management and accounting, to investment modeling and analytics for the global commercial and residential markets. With nearly five decades of expertise and insight, we have grown to include offices in across the United States, the United Kingdom, Hong Kong, Singapore, Australia, South Africa, New Zealand, Canada, and India, with over 3000 team members to support our clients and their unique needs!\nMRI is proud to be an Equal Employment Opportunity employer.",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Senior Dotnet Developer",
      "companyName": "Infosys",
      "location": "Chandigarh, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  ResponsibilitiesA day in the life of an Infoscion• As part of the Infosys delivery team, your primary role would be to interface with the client for quality assurance, issue resolution and ensuring high customer satisfaction.• You will understand requirements, create and review designs, validate the architecture and ensure high levels of service offerings to clients in the technology domain.• You will participate in project estimation, provide inputs for solution delivery, conduct technical risk planning, perform code reviews and unit test plan reviews.• You will lead and guide your teams towards developing optimized high quality code deliverables, continual knowledge management and adherence to the organizational guidelines and processes.• You would be a key contributor to building efficient programs/ systems and if you think you fit right in to help our clients navigate their next in their digital transformation journey, this is the place for you!\nEducational RequirementsBachelor of Engineering\nService LineApplication Development and Maintenance\nAdditional Responsibilities:• Knowledge of more than one technology• Basics of Architecture and Design fundamentals• Knowledge of Testing tools• Knowledge of agile methodologies• Understanding of Project life cycle activities on development and maintenance projects• Understanding of one or more Estimation methodologies, Knowledge of Quality processes• Basics of business domain to understand the business requirements• Analytical abilities, Strong Technical Skills, Good communication skills• Good understanding of the technology and domain• Ability to demonstrate a sound understanding of software quality assurance principles, SOLID design principles and modelling methods• Awareness of latest technologies and trends• Excellent problem solving, analytical and debugging skills\nTechnical and Professional Requirements:• Primary skills: .net• Desirables: asp>.net",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Senior Application Security Engineer (Bangkok based, relocation provided)",
      "companyName": "Agoda",
      "location": "Lucknow, Uttar Pradesh, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  About Agoda\nAgoda is an online travel booking platform for accommodations, flights, and more. We build and deploy cutting-edge technology that connects travelers with more than 2.5 million accommodations globally. Based in Asia and part of Booking Holdings, our 6,000+ employees representing 90+ nationalities foster a work environment rich in diversity, creativity, and collaboration. We innovate through a culture of experimentation and ownership, enhancing the ability for our customers to experience the world.\nGet to Know our Team: \nThe Security Department oversees security, compliance, GRC, and security operations for all Agoda. We are vigilant in ensuring there is no breach or vulnerability threatening our company or endangering our employees in order to keep Agoda safe and protected. This would be a great challenge for those who want to work with the best technology in a dynamic and advanced environment.\nThe Opportunity:\nYou will be working in a fast paced DevSecOps environment where code change happens at a rapid speed and where it is paramount to control security testing into a continuous deployment/integration flow.\nIn this Role, you’ll get to:\nPlay a lead role in developing and designing application-level security controls and standards. Perform application security design reviews against new products and services. Track and prioritize all security issues. Build internal security tools that help fix security problems at scale. Perform code review and drive remediation of discovered issues. Enable automated security testing at scale to measure vulnerability, and report on risk across all microservice, web and mobile platforms. Execute security tests on thousands of servers which are spread across on-premise and public cloud data centers. \nWhat you’ll Need to Succeed:\nStrong foundations in software engineering. Minimum of 7 years of technical experience with any combination of the following: threat modeling experience, secure coding, identity management and authentication, software development, cryptography, system administration and network security. Minimum 2 years experience with Software Development Life Cycle in one or more languages (Rust, Python, Go, Nodejs, etc.)Minimum 1 year experience with public/private cloud environments (Openshift, Rancher, K8s, AWS, GCP, Azure, etc.)Experience in running assessments using OWASP MASVS and ASVSWorking knowledge on exploiting and fixing application vulnerabilitiesStrong background in threat modelingIn-depth knowledge of common web application vulnerabilities (i.e. OWASP Top 10)Familiarity with automated dynamic scanners, fuzzers, and proxy toolsAn analytical mind for problem solving, abstract thought, and offensive security tacticsHighly effective communication skills, in both verbal and written forms, to effectively convey technical and non-technical concepts to a wide variety of audiences Relocation package is provided in case you prefer to relocate to Bangkok, Thailand. Our benefits are…Hybrid Working ModelWFH Set Up Allowance30 Days of Remote Working from anywhere globally every yearEmployee discount for accommodation globallyGlobal team of 90+ nationalities40+ offices and 25+ countriesAnnual CSR / Volunteer Time offBenevity Subscription for employee donationsVolunteering opportunities globallyFree Headspace subscriptionFree Odilo & Udemy subscriptionsAccess to Employee Assistance Program (third party for personal and workplace support)Enhanced Parental LeaveLife, TPD & Accident Insurance\n#sanfrancisco #sanjose #losangeles #sandiego #oakland #denver #miami #orlando #atlanta #chicago #boston #detroit #newyork #portland #philadelphia #dallas #houston #austin #seattle #sydney #melbourne #perth #toronto #vancouver #montreal #shanghai #beijing #shenzhen #prague #Brno #Ostrava #cairo #alexandria #giza #estonia #paris #berlin #munich #hamburg #stuttgart #cologne #frankfurt #dusseldorf #dortmund #essen #Bremen #leipzig #dresden #hanover #nuremberg #athens #hongkong #budapest #jakarta #bali #dublin #telaviv #jerusalem #milan #rome #venice #florence #naples #turin #palermo #bologna #tokyo #osaka #yokohama #nagoya #okinawa #fukuoka #sapporo #kualalumpur #malta #amsterdam #oslo #manila #warsaw #krakow #bucharest #doha #alrayyan #moscow #saintpetersburg #riyadh #jeddah #mecca #medina #singapore #capetown #johannesburg #seoul #barcelona #madrid #stockholm #zurich #taipei #tainan #taichung #kaohsiung #bangkok #Phuket #istanbul #dubai #abudhabi #sharjah #london #manchester #liverpool #edinburgh #kiev #hcmc #hanoi #amsterdam #bucharest #lodz #wroclaw #poznan #katowice #rio #salvador #newdelhi #Hyderabad #bangalore #Mumbai #Bengaluru #Chennai #Kolkata #Lucknow #bandung #yokohama #nagoya #okinawa #fukuoka #IT #4\nEqual Opportunity Employer \nAt Agoda, we pride ourselves on being a company represented by people of all different backgrounds and orientations. We prioritize attracting diverse talent and cultivating an inclusive environment that encourages collaboration and innovation. Employment at Agoda is based solely on a person’s merit and qualifications. We are committed to providing equal employment opportunity regardless of sex, age, race, color, national origin, religion, marital status, pregnancy, sexual orientation, gender identity, disability, citizenship, veteran or military status, and other legally protected characteristics.\nWe will keep your application on file so that we can consider you for future vacancies and you can always ask to have your details removed from the file. For more details please read our privacy policy .\nTo all recruitment agencies: Agoda does not accept third party resumes. Please do not send resumes to our jobs alias, Agoda employees or any other organization location. Agoda is not responsible for any fees related to unsolicited resumes.",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Cerner Application Developer",
      "companyName": "Accenture in India",
      "location": "Bengaluru, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Bengaluru\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : 1 Participate in various phases of the project Design, Build, Test and Deploy Ability to understand and develop complex integrations with on-premises, and cloud-based applications 2 Quickly resolve defects and provide root cause analysis, implementation support Work with vendor support team to resolve issues Work with different stakeholders like customer, Project manager, Architects, Testers\n\nTechnical Experience : 1 Experience in projects implementation experience in EMR and EHR systems and various modules like Ambulatory, Ancillary, Inpatient, Reporting, revcycle millennium of Cerner 2 Understanding of payer, provider and hospital management models in healthcare 3 Involved in design and implementation of EHR/EMR Systems\n\nProfessional Attributes : 1 Excellent communication and customer interaction skills Strong analytical capabilities to solve complicated issues arising during design and testing phases 2 Experience in HL7 and FHIR standards will be a plus\n\nEducational Qualification : Minimum 15 years of full-time education with Degree\n\nAdditional Information : Knowledge and experience in PL/SQL,Java,EMR, functional testing Cerner Millennium Certification\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Senior Software Engineer (.NET Fullstack)",
      "companyName": "Accurate Background",
      "location": "Hyderabad, Telangana, India, Hybrid",
      "description": "About the job\n        \n\n\n        \n                  When you join Accurate Background, you’re an integral part of making every hire the start of a success story. Your contributions will help us fulfill our mission of advancing the background screening experience through visibility and insights, empowering our clients to make smarter, unbiased decisions.\nThe Senior Software Engineer plays a key role in each software development lifecycle phase. This individual will lead the development efforts and closely work with the product manager to understand the requirements, be a hands-on developer up to 50%, and own the deployments and post-go-live support. Will also is responsible to help other developers, taking care of the designs for new features, and working collaboratively in case of any challenging problems and also works closely with the QA and other development teams to provide customer-centric solutions and build a world-class Candidate Experience platform to meet the exploding growth of the company and business demands.\nResponsibilities\nWork closely with the product manager to understand the requirements and come up with the necessary designsDevelop and maintain Angular service-oriented architecture platforms from start to finish.Validating requirementsDevelopment of complex SQL queriesSupport build and deploymentsIntegration/enterprise testingApplications support/troubleshooting within a production environmentProvide mentorship to junior developers.\nQualifications\n6+ years of system development experience At least 2 years of experience using the following technologies: Angular (Preferably latest versions), .Net Core, MySQL and/or SQL Server and/or MongoDB, and JSONDeep familiarity with Angular, rest APIs, DB, and SQLDeep familiarity with modern web application technologies & frameworksExperience in solutioning and developing enterprise integration systems.Develop, build, and deploy Tools such as Jenkins.Must be a self-starter who is highly organized, hands-on, and a team player.Ability to thrive in a fast-paced, startup environment.\n The Accurate Way: \nWe offer a fun, fast-paced environment, with lots of room for growth. We have an unwavering commitment to diversity, ensuring everyone has a complete sense of belonging here. To do this, we follow four guiding principles – Take Ownership, Be Open, Stay Curious, Work as One – core values that dictate what we stand for, and how we behave.\nTake ownership.\nBe accountable for your actions, your team, and the company. Accept responsibility willingly, especially when it’s what’s best for our customers. Give others every reason to trust you, believe in you, and count on you. Rise to every occasion with your personal best.\nBe open.\nBe open to new ideas. Be inclusive of people and ways of doing things. Make yourself accessible and approachable, and communicate with genuineness, transparency, honesty, and respect. Embrace differences.\nStay curious.\nStay curious even as you move forward. Tirelessly ask questions and challenge the status quo in your pursuit of new ideas, ways to solve problems, and to continually grow and improve.\n Work as one.\nWork together to create the best customer and workplace experience. Put our customers and employees first—before individual or departmental agendas. Make sure they get the help they need to succeed.\n About Accurate Background: \nAccurate Background’s vision is to make every hire the start of a success story. As a trusted provider of employment background screening and workforce monitoring services, Accurate Background gives companies of all sizes the confidence to make smarter, unbiased hiring decisions at the speed of demand. Experience a new standard of support with a dedicated team, comprehensive technology and insight, and the most extensive coverage and search options to advance your business while keeping your brand and people safe.",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Asset Performance Management Application Developer",
      "companyName": "Accenture in India",
      "location": "Gurgaon, Haryana, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Gurugram\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : Candidate should have strong industry/consulting experience in Asset Data Management, Asset Reliability Management Inventory Management functions Hands on experience on APM tools such as Meridium APM, AVEVA Rockwell Automation, DNV GL etcand EAM tools such as SAP PM/MM, INFOR, MAXIMO etc Knowledge on leading industry practice on Data Management ISO 14224, ISO 31000, ISO 55000, Reliability centered maintenance RCM, Asset Life Cycle, Asset Criticality analysis, Risk Management framework\n\nTechnical Experience : Candidate should have ability to conduct Asset Data, Reliability, work management Inventory Management diagnostics to identify value opportunities and develop improvement plan Candidate should have a well-rounded understanding in topics such as Reliability centered maintenance RCM, Asset Life Cycle, Asset Reliability Management, Asset Criticality analysis, Failure Mode effect analysis FMEA, Inventory optimization, Critical sparing review, Asset Material Data, Vendor Service Data Management\n\nProfessional Attributes : Good communication\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer I",
      "companyName": "Eventbrite",
      "location": "India, Remote",
      "description": "About the job\n        \n\n\n        \n                  THE CHALLENGE\nEventbrite's business continues to grow and scale rapidly, powering millions of events. Event creators and event goers need new tools and technologies that empower them to have the most meaningful live experiences. As a Software Engineer at Eventbrite, you will build beautiful, responsive, delightful and intuitive user interfaces that people are excited to use\nTHE TEAM\nWe're a people-focused Engineering organization: the women and men on our team value working together in small teams to solve big problems, supporting an active culture of mentorship and inclusion, and pushing themselves to learn new things daily. Pair programming, weekly demos, tech talks, and quarterly hackathons are at the core of how we’ve built our team and product. We believe in engaging with the community, regularly hosting free events with some of the top technical speakers, and actively contributing to open source software (check out Britecharts as an example!). Our technology spans across web, mobile, API, big data, machine learning, search, physical point of sale, and scanning systems. To learn more about some of the frontend teamwork, check out our frontend blog\nTHE SKILL SET\nAdvanced English Level1-2 years of experience working in a Software Development role Experience with or the excitement to work with Python and Django web frameworkUnderstanding that great code is also maintainable codeYou care about making sure your code is well testedA result driven self starter with great communication and collaboration skillsUnit-testing know-how required, experience with TDD or BDD is an added bonusKnowledge of front-end technologies (HTML, CSS, Ajax, Javascript)Database experience (ideally MySQL, NoSQLis a plus)OOP/OOD knowledge\nBONUS POINTS\nExperience with AWS and developing APIsExperience using non-relational databasesFamiliarity with Eventbrite and a passion for live events\nWhat We Offer\nAt Eventbrite, we strive to support our Britelings and their loved ones through different stages of life with robust and attractive benefits, financial and physical wellness options, and great perks. In addition to offering a competitive salary and company stock, we have other great benefits available. In the Briteland, you’ll find great medical plans, fertility and adoption benefits, wellness reimbursement, generous parental leave, and much more.\nWe Care About Your Mental Health And Wellbeing.\nOur employees enjoy free coaching sessions with Modern Health. We also offer free therapy sessions with a psychologist. You’ll also have access to private medical insurance for you and your family, that includes dental care. And our wellness program to pay for your gym expenses.\nWe work hard to cultivate a diverse, equitable and inclusive culture where Britelings feel like they belong.\nEmployees can participate in resource groups and we offer programming throughout the year to support a diverse and inclusive workplace.\nWe offer ongoing training and career development that meets people where they are in their careers.\nWe offer unlimited access to courses in Udemy, leadership coaching for all managers, Briteling led talks, and weekly company-wide town halls with our CEO. We take culture seriously and design programs with employee feedback in mind to make Eventbrite a great place to work no matter where you work from in the world.\nWork-life balance & flexibility is extremely important to us.\nOur employees can choose what works best for them: work in one of our offices, be fully remote or the best of both worlds! We believe in a flexible working environment to allow Britelings to perform at their best ensuring a healthy work-life balance. We have recently implemented Britebreak Fridays: all Britelings turn off their computers and take the first Friday of every month off to focus on their wellbeing.\nAbout Eventbrite\nEventbrite is a global self-service ticketing and experience technology platform that serves a community of hundreds of thousands of event creators in nearly 180 countries. Since inception, Eventbrite has been at the center of the experience economy, transforming the way people organize and attend events. The company was founded by Julia Hartz, Kevin Hartz and Renaud Visage, with a vision to build a self-service platform that would make it possible for anyone to create and sell tickets to live experiences. The Eventbrite platform provides an intuitive, secure, and reliable service that enables creators to plan and execute their live and online events, whether it’s an annual culinary festival attracting thousands of foodies, a professional webinar, a weekly yoga workshop or a youth dance class. With over 290 million tickets distributed for over 5 million total events in 2021, Eventbrite is where people all over the world discover new things to do or new ways to do more of what they love. Learn more at www.eventbrite.com .\nIS THIS ROLE NOT AN EXACT FIT?\nSign up to keep in touch and we’ll let you know when we have new positions on our team .\nEventbrite is committed to equality of opportunity for all staff, and applications from all suitably qualified individuals are encouraged, regardless of age, disability, sex, gender reassignment, sexual orientation, pregnancy and maternity, race, religion or belief and marriage and civil partnerships.\nApplicant Privacy Notice",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Dassault Systemes CATIA (V3-V5) Application Developer",
      "companyName": "Accenture in India",
      "location": "Bengaluru, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Bengaluru\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : Responsible for customer interaction Responsible for managing quality document KPIs, RCA etc and report to the Management in the absence of the Lead Should be able to train the team on various topics with respect to 3D Harness design\n\nTechnical Experience : Good experience in Airbus A350 or A320 Program on Electrical system installation ESI Proficiency in A350/A320 electrical harness 3D Design, Full 3D Design, 2D Design and checks Experience on Airbus Tools Methods is must Good understanding of Engineering Drawing is must Airbus VPM and PASS certificate is added advantage\n\nProfessional Attributes : Good communication, verbal and written Should be an excellent and dynamic team player\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "SAP ABAP Development Application Developer",
      "companyName": "Accenture in India",
      "location": "Mumbai, Maharashtra, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Mumbai\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : Resource should be from Mumbai - no offers to be released for other location Participate in process and system design, configuration, integration testing, user training, and post go-live support in a global SAP instance 2 Analyze complex business processes and provide consultation to users regarding processes and procedures to ensure business in achieving maximum efficiencies out of SAP 3 Facilitate business process discussions and translation of business requirements into configuration and tech\n\nTechnical Experience : Good knowledge of information technology, especially in the areas of SAP related product and technology implementation 2 Good knowledge and hands-on experience in design, configuration and support for the following SAP FICO module 3 Good knowledge of key integration points between SAP Enterprise Resource Planning ERP modules, as well as good understanding of the data design in SAP S4/HANA 4 Good planning and coordination skills 5 Strong writing, verbal communication and presentation skills\n\nProfessional Attributes : Ability to communicate with end clients, Good analytical skills, flexibility, ability to lead/help the team in day to day work and management potential\n\nEducational Qualification : Graduate from any stream\n\nAdditional Information : Candidate has to work daily in client location mumbai\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Edge Computing Application Developer",
      "companyName": "Accenture in India",
      "location": "Bengaluru, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Bengaluru\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : Docker, Container Orchestration for Edge, IoT Hub Edge Model Management and Monitoring Integration of Open Source Software OSS Experience in using Jupyter, Sagemaker, Google colab\n\nTechnical Experience : Embedded Linux, Embedded C/C, Python Azure IoT Edge / AWS IoT Greengrass Core Artificial Intelligence Machine Learning for Edge ML Framework: scikit-learn, xgboost DNN Framework: tensorflow, pytorch Edge computing HW hands on with NVIDIA Jetson/Intel NUC/Intel VPU/OpenMV/ESP32/Drone\n\nProfessional Attributes : Good Communication Skills\n\nEducational Qualification : BE /BTech in MLAI Or BE /BTech in any stream Post Graduation in MLAI\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Edge Computing Application Developer",
      "companyName": "Accenture in India",
      "location": "Bengaluru, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Bengaluru\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : Docker, Container Orchestration for Edge, IoT Hub Edge Model Management and Monitoring Integration of Open Source Software OSS Experience in using Jupyter, Sagemaker, Google colab\n\nTechnical Experience : Embedded Linux, Embedded C/C, Python Azure IoT Edge / AWS IoT Greengrass Core Artificial Intelligence Machine Learning for Edge ML Framework: scikit-learn, xgboost DNN Framework: tensorflow, pytorch Edge computing HW hands on with NVIDIA Jetson/Intel NUC/Intel VPU/OpenMV/ESP32/Drone\n\nProfessional Attributes : Good Communication Skills\n\nEducational Qualification : BE /BTech in MLAI Or BE /BTech in any stream Post Graduation in MLAI\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Siemens Teamcenter Application Developer",
      "companyName": "Accenture in India",
      "location": "Bengaluru, Karnataka, India, ",
      "description": "About the job\n        \n\n\n        \n                  About Accenture: Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Technology and Operations services and Accenture Song-all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients, people, shareholders, partners and communities. Visit us at accenture.com\n\nProject Role :Application Developer\n\nProject Role Description :Design, build and configure applications to meet business process and application requirements.\n\nManagement Level :10\n\nWork Experience :4-6 years\n\nWork location :Bengaluru\n\nMust Have Skills :\n\nGood To Have Skills :\n\nJob Requirements : \n\nKey Responsibilities : Minimum 4-6 years experience as a Teamcenter Developer In-depth knowledge of Teamcenter customization troubleshooting Excellent Knowledge of FMS, Pool Manager, Dispatcher Excellent knowledge in Active workspace customization Develop the solution for the documented design Perform testing of the implementation QA validation Perform proof of concepts\n\nTechnical Experience : Operating Systems - Linux - Windows Server Teamcenter -BMIDE, TC data model, -SOA, ITK customization, Extensions -Active workspace customization Programming -Java,JDBC, C, JavaScripting, SQL, NodeJS, Scripting Languages - Batch - PowerShell - Unix Shell Scripting\n\nProfessional Attributes : 1 Good analytical skills 2 Experience in handling modules independently 3 Good communication skills and Team player\n\nEducational Qualification : BE/BTech/MTech\n 15 years of full time education",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "PayPal",
      "location": "Mumbai Metropolitan Region, Remote",
      "description": "About the job\n        \n\n\n        \n                  At PayPal (NASDAQ: PYPL), we believe that every person has the right to participate fully in the global economy. Our mission is to democratize financial services to ensure that everyone, regardless of background or economic standing, has access to affordable, convenient, and secure products and services to take control of their financial lives.\nJob Description Summary:\nWhat you need to know about the role- As a full stack software engineer, Participate in the full development lifecycle, including design, coding, automated testing, and production releases of backend services. Be a problem solver and drive to get results. Able to find and fix performance, scalability and other live issues in a time critical environment. Prototype ideas quickly using cutting edge technologies. Meet our team PayPal Quality Tooling team is at forefront of designing, developing, and maintain key productivity applications and frameworks for PayPal engineers. We provide a holistic solution to reduce release cycle for product development and quality teams. We build various powerful, highly usable tools and services which enable engineers to produce high quality software\nJob Description:\nYour way to impact:\nWe believe in ‘One Team Behaviours’ and Innovation, Collaboration, Inclusion and Wellness are major pillars for our success.\nYou are extremely passionate about making your team the best place to be and it’s obvious to everyone around you that you have fun with your work and your co-workers alike.\nYou’ve experimented and successfully survived many different types of technologies and methodologies, which has left you with a healthy appreciation for what works best where.\nYou are a technologist at heart and miraculously mastered the art of neither being dogmatic nor Myopic in your focus.\nYou are humble enough to be flexible to the will of the frameworks, constraints and people you work with especially when doing so makes our products and customer experience better.\nWhen you take on a task whether it’s huge and innovative or small and mundane, you’re going to see it through to the best of your ability.\nYour day to day:\nBe able to independently design, code, and test complex features, as well as lead and mentor other engineers, help build engineering teamsDrive both technology and product innovation through rapid prototyping and iterative developmentBe a technical subject matter expert and represent the full internal and external capabilities of the platform.Able to drive complex architectural discussions that involve multiple systemsIdentify any product/functionality gaps and collaborate internal product and technology teams to define the necessary development to support solution delivery.Drive integration efforts and lead critical work streams of strategic initiatives sponsored by senior executivesDrive engineering excellency through CI/CDPro-active response in identifying and troubleshooting integration or technical issues.\n\n\nWhat do you need to bring:\nBachelor’s/Master’s in Computer Science, Software Engineering or equivalent experience.3+ years’ hands on experience in JavaScript/Node/React application development.Experience with Python, GoLang and scripting languages.Experience in building automation frameworks and tools.Experience with GitHub, CI/CD, unit testing, and functional testingExperience in both relational and non-relational DB, like Oracle and CouchDBExcellent problem-solving and communication skills.\n\n\nSelf-motivated and fully committed dynamic individual with ability to adapt and adjust to fast-paced environment.\nOur Benefits:\nAt PayPal, we’re committed to building an equitable and inclusive global economy. And we can’t do this without our most important asset—you. That’s why we offer benefits to help you thrive in every stage of life. We champion your financial, physical, and mental health by offering valuable benefits and resources to help you care for the whole you.\nWe have great benefits including a flexible work environment, employee shares options, health and life insurance and more. To learn more about our benefits please visit https://www.paypalbenefits.com\nWho We Are:\nTo learn more about our culture and community visit https://about.pypl.com/who-we-are/default.aspx\nPayPal has remained at the forefront of the digital payment revolution for more than 20 years. By leveraging technology to make financial services and commerce more convenient, affordable, and secure, the PayPal platform is empowering more than 400 million consumers and merchants in more than 200 markets to join and thrive in the global economy. For more information, visit paypal.com.\nPayPal provides equal employment opportunity (EEO) to all persons regardless of age, color, national origin, citizenship status, physical or mental disability, race, religion, creed, gender, sex, pregnancy, sexual orientation, gender identity and/or expression, genetic information, marital status, status with regard to public assistance, veteran status, or any other characteristic protected by federal, state or local law. In addition, PayPal will provide reasonable accommodations for qualified individuals with disabilities. If you are unable to submit an application because of incompatible assistive technology or a disability, please contact us at paypalglobaltalentacquisition@paypal.com.\nAs part of PayPal’s commitment to employees’ health and safety, we have established in-office Covid-19 protocols and requirements, based on expert guidance. Depending on location, this might include a Covid-19 vaccination requirement for any employee whose role requires them to work onsite. Employees may request reasonable accommodation based on a medical condition or religious belief that prevents them from being vaccinated.\nREQ ID R0100175",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Software Engineer",
      "companyName": "PayPal",
      "location": "Mumbai Metropolitan Region, Remote",
      "description": "About the job\n        \n\n\n        \n                  At PayPal (NASDAQ: PYPL), we believe that every person has the right to participate fully in the global economy. Our mission is to democratize financial services to ensure that everyone, regardless of background or economic standing, has access to affordable, convenient, and secure products and services to take control of their financial lives.\nJob Description Summary:\nWhat you need to know about the role- As a full stack software engineer, Participate in the full development lifecycle, including design, coding, automated testing, and production releases of backend services. Be a problem solver and drive to get results. Able to find and fix performance, scalability and other live issues in a time critical environment. Prototype ideas quickly using cutting edge technologies. Meet our team PayPal Quality Tooling team is at forefront of designing, developing, and maintain key productivity applications and frameworks for PayPal engineers. We provide a holistic solution to reduce release cycle for product development and quality teams. We build various powerful, highly usable tools and services which enable engineers to produce high quality software\nJob Description:\nYour way to impact:\nWe believe in ‘One Team Behaviours’ and Innovation, Collaboration, Inclusion and Wellness are major pillars for our success.\nYou are extremely passionate about making your team the best place to be and it’s obvious to everyone around you that you have fun with your work and your co-workers alike.\nYou’ve experimented and successfully survived many different types of technologies and methodologies, which has left you with a healthy appreciation for what works best where.\nYou are a technologist at heart and miraculously mastered the art of neither being dogmatic nor Myopic in your focus.\nYou are humble enough to be flexible to the will of the frameworks, constraints and people you work with especially when doing so makes our products and customer experience better.\nWhen you take on a task whether it’s huge and innovative or small and mundane, you’re going to see it through to the best of your ability.\nYour day to day:\nBe able to independently design, code, and test complex features, as well as lead and mentor other engineers, help build engineering teamsDrive both technology and product innovation through rapid prototyping and iterative developmentBe a technical subject matter expert and represent the full internal and external capabilities of the platform.Able to drive complex architectural discussions that involve multiple systemsIdentify any product/functionality gaps and collaborate internal product and technology teams to define the necessary development to support solution delivery.Drive integration efforts and lead critical work streams of strategic initiatives sponsored by senior executivesDrive engineering excellency through CI/CDPro-active response in identifying and troubleshooting integration or technical issues.\n\n\nWhat do you need to bring:\nBachelor’s/Master’s in Computer Science, Software Engineering or equivalent experience.3+ years’ hands on experience in JavaScript/Node/React application development.Experience with Python, GoLang and scripting languages.Experience in building automation frameworks and tools.Experience with GitHub, CI/CD, unit testing, and functional testingExperience in both relational and non-relational DB, like Oracle and CouchDBExcellent problem-solving and communication skills.\n\n\nSelf-motivated and fully committed dynamic individual with ability to adapt and adjust to fast-paced environment.\nOur Benefits:\nAt PayPal, we’re committed to building an equitable and inclusive global economy. And we can’t do this without our most important asset—you. That’s why we offer benefits to help you thrive in every stage of life. We champion your financial, physical, and mental health by offering valuable benefits and resources to help you care for the whole you.\nWe have great benefits including a flexible work environment, employee shares options, health and life insurance and more. To learn more about our benefits please visit https://www.paypalbenefits.com\nWho We Are:\nTo learn more about our culture and community visit https://about.pypl.com/who-we-are/default.aspx\nPayPal has remained at the forefront of the digital payment revolution for more than 20 years. By leveraging technology to make financial services and commerce more convenient, affordable, and secure, the PayPal platform is empowering more than 400 million consumers and merchants in more than 200 markets to join and thrive in the global economy. For more information, visit paypal.com.\nPayPal provides equal employment opportunity (EEO) to all persons regardless of age, color, national origin, citizenship status, physical or mental disability, race, religion, creed, gender, sex, pregnancy, sexual orientation, gender identity and/or expression, genetic information, marital status, status with regard to public assistance, veteran status, or any other characteristic protected by federal, state or local law. In addition, PayPal will provide reasonable accommodations for qualified individuals with disabilities. If you are unable to submit an application because of incompatible assistive technology or a disability, please contact us at paypalglobaltalentacquisition@paypal.com.\nAs part of PayPal’s commitment to employees’ health and safety, we have established in-office Covid-19 protocols and requirements, based on expert guidance. Depending on location, this might include a Covid-19 vaccination requirement for any employee whose role requires them to work onsite. Employees may request reasonable accommodation based on a medical condition or religious belief that prevents them from being vaccinated.\nREQ ID R0100175",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    },
    {
      "site": "LinkedIN",
      "title": "Lead II - Software Engineering",
      "companyName": "UST",
      "location": "Thiruvananthapuram, Kerala, India, On-site",
      "description": "About the job\n        \n\n\n        \n                  Job Description\n\nRole Proficiency:\n\nAct creatively to develop applications by selecting appropriate technical options optimizing application development maintenance and performance by employing design patterns and reusing proven solutions. Account for others' developmental activities; assisting Project Manager in day to day project execution.\n\nOutcomes\n Interpret the application feature and component designs to develop the same in accordance with specifications.  Code debug test document and communicate product component and feature development stages.  Validate results with user representatives integrating and commissions the overall solution. Select and create appropriate technical options for development such as reusing improving or reconfiguration of existing components while creating own solutions for new contexts Optimises efficiency cost and quality.  Influence and improve customer satisfaction Influence and improve employee engagement within the project teams Set FAST goals for self/team; provide feedback to FAST goals of team members\nMeasures Of Outcomes\n Adherence to engineering process and standards (coding standards) Adherence to project schedule / timelines Number of technical issues uncovered during the execution of the project Number of defects in the code Number of defects post delivery Number of non compliance issues Percent of voluntary attrition On time completion of mandatory compliance trainings\nCode\n\nOutputs Expected:\nCode as per the designDefine coding standards templates and checklistsReview code – for team and peers\nDocumentation\nCreate/review templates\nchecklists\n\nguidelines\n\nstandards for design/process/developmentCreate/review deliverable documents. Design documentation\nRequirements\n\ntest cases and results\n\nConfigure\nDefine and govern configuration management planEnsure compliance from the team\nTest\nReview/Create unit test cases\nscenarios and executionReview test plan created by testing teamProvide clarifications to the testing team\nDomain Relevance\nAdvise software developers on design and development of features and components with deeper understanding of the business problem being addressed for the clientLearn more about the customer domain and identify opportunities to provide value addition to customersComplete relevant domain certifications\nManage Project\nSupport Project Manager with inputs for the projectsManage delivery of modulesManage complex user stories\nManage Defects\nPerform defect RCA and mitigationIdentify defect trends and take proactive measures to improve quality\nEstimate\nCreate and provide input for effort and size estimation and plan resources for projects\nManage Knowledge\nConsume and contribute to project related documents\nshare point\n\nlibraries and client universitiesReview the reusable documents created by the team\nRelease\nExecute and monitor release process\nDesign\nContribute to creation of design (HLD\nLLD\n\nSAD)/architecture for applications\n\nfeatures business components and data models \n\nInterface With Customer\nClarify requirements and provide guidance to Development TeamPresent design options to customersConduct product demosWork closely with customer architects for finalizing design\nManage Team\nSet FAST goals and provide feedbackUnderstand aspirations of the team members and provide guidance opportunities etcEnsure team members are upskilledEnsure team is engaged in projectProactively identify attrition risks and work with BSE on retention measures\nCertifications\nObtain relevant domain and technology certifications\nSkill Examples\n Explain and communicate the design / development to the customer Perform and evaluate test results against product specifications Break down complex problems into logical components Develop user interfaces business software components  Use data models Estimate time and effort resources required for developing / debugging features / components Perform and evaluate test in the customer or target environments  Make quick decisions on technical/project related challenges Manage a team mentor and handle people related issues in team Have the ability to maintain high motivation levels and positive dynamics within the team. Interface with other teams designers and other parallel practices Set goals for self and team. Provide feedback for team members Create and articulate impactful technical presentations Follow high level of business etiquette in emails and other business communication Drive conference calls with customers and answer customer questions Proactively ask for and offer help Ability to work under pressure determine dependencies risks facilitate planning handling multiple tasks. Build confidence with customers by meeting the deliverables timely with a quality product. Estimate time and effort of resources required for developing / debugging features / components\nKnowledge Examples\n Appropriate software programs / modules  Functional & technical designing Programming languages – proficient in multiple skill clusters DBMS Operating Systems and software platforms Software Development Life Cycle Agile – Scrum or Kanban Methods Integrated development environment (IDE)  Rapid application development (RAD) Modelling technology and languages Interface definition languages (IDL)  Broad knowledge of customer domain and deep knowledge of sub domain where problem is solved\nAdditional Comments\n\nPTEC is looking for a Java Senior Developer to work with one of the leading financial services organization in the US and Canada. The ideal candidate must possess strong background on micro-services development in Spring Boot. The candidate must possess excellent written and verbal communication skills with the ability to collaborate effectively with domain experts and technical experts in the team. Responsibilities: As a Senior Developer, you will\n Maintain active relationships with Product Owner to understand business requirements, lead requirement gathering meetings and review designs with the product owner Own his backlog items and coordinate with other team members to develop the features planned for each sprint Perform technical design reviews and code reviews Be Responsible for prototyping, developing, and troubleshooting software in the user interface or service layers Perform peer reviews on source code to ensure reuse, scalability and the use of best practices Participate in collaborative technical discussions that focus on software user experience, design, architecture, and development Perform demonstrations for client stakeholders on project features and sub features, which utilizes the latest Front end and Backend development technologies Requirements: 6+ years of experience in Java development Skills in developing applications using multi-tier architecture Knowledge of google/AWS cloud Angular 5 or above, Java/JEE, Spring, Spring boot, REST/SOAP web services, Hibernate, SQL, Tomcat, Application servers (WebSphere), SONAR, Agile, AJAX, Jenkins..etc Skills in UML, application designing/architecture, Design Patterns..etc skills in Unit testing application using Junit or similar technologies, Angular unit testing tools such as Karma, Jasmine, Protractor ��� Experience with BDD-Cucumber for automation Good communication skills Leadership skills Provide overlap coverage with onsite/customer teams till 9 PM IST Capability to support QA teams with test plans, root cause analysis and defect fixing Strong experience in Responsive design, cross browser web applications Strong knowledge of web service models Strong knowledge in creating and working with APIs Experience with Cloud services, specifically on Google cloud Strong exposure in Agile, Scaled Agile based development models Familiar with Interfaces such as REST web services, swagger profiles, JSON payloads. Familiar with tools/utilities such as Bitbucket / Jira / Confluence",
      "link": "https://www.linkedin.com/jobs/view/3542125516/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SCHOOL_RECRUIT&refId=umTz6CIvxgbV7z2fcfOE%2FQ%3D%3D&trackingId=LJ0du8PNwlXlt14TOmpRMQ%3D%3D&trk=flagship3_search_srp_jobs",
      "stipend": "Not disclosed"
    }
    ,
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Marvell Semiconductors",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-marvell-india-pvt-ltd-bangalore-bengaluru-0-to-1-years-150323501993",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Studying for a Masters degree in Computer Networks, Electronics and Communication Syste..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Finsoftai",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-finsoftai-pune-0-to-0-years-230323501189",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Bachelor s / Master s Degree in Computer Science, Information Technology or Electronics..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Impact Analytics",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-impact-analytics-bangalore-bengaluru-0-to-1-years-140323011825",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "1 year of project experience working on developing web applicationsBachelors degree in ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer (Backend) Intern",
      "companyName": "Crio.Do",
      "link": "https://www.naukri.com/job-listings-software-engineer-backend-intern-crio-do-bangalore-bengaluru-0-to-1-years-140323004211",
      "location": "Bangalore/Bengaluru(Koramangala)",
      "stipend": "Not disclosed",
      "description": "Requirements 7+ projects in GitHub with at least 3 solid projects Looking for batch 202..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Enthuziastic",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-enthuziastic-remote-1-to-3-years-210323501158",
      "location": "Permanent Remote",
      "stipend": "Not disclosed",
      "description": "In the new world of work from home, we expect the ideal candidate to over-communicate ...."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Funding Societies",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-funding-societies-bangalore-bengaluru-2-to-3-years-170323501999",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Currently pursuing a Bachelor s or Master s degree in Computer Science, Software Engine..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Productiv",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-productiv-bangalore-bengaluru-0-to-3-years-310123500513",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Familiarity with AWS and node.js / VUE.js a plus, but not required"
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Simbo.ai",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-simbo-ai-bengaluru-bangalore-0-to-1-years-250320501368",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Must know programming and scripting under Linux Must be able to spend at least 2 months..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "The Trade Desk",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-the-trade-desk-bangalore-bengaluru-0-to-1-years-250123502346",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Enrolled in a bachelors degree in Computer Science / Engineering / IT or related program"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern (Mobile Web)",
      "companyName": "Approwess Technologies",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-mobile-web-approwess-technologies-private-limited-mumbai-0-to-1-years-211020500003",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": ". . . . . As a software intern at Approwess, youll have real responsibility, real work ..."
    },
    {
      "site": "Naukri",
      "title": "Internship - Software Engineering Intern",
      "companyName": "The Hiring Box",
      "link": "https://www.naukri.com/job-listings-internship-software-engineering-intern-the-hiring-box-bangalore-bengaluru-0-to-1-years-191222501725",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "You need to know React, Node & Fundamentals of Javascript very well to apply for this p..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Duck Creek",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-duck-creek-technologies-remote-0-to-2-years-300123502178",
      "location": "remote",
      "stipend": "Not disclosed",
      "description": ". ABOUT THE SUMMER INTERNSHIP: . . . . . . . Duck Creeks Summer Internship program is f..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Epitas",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-epitas-mangaluru-mangalore-0-to-2-years-310721500950",
      "location": "Mangaluru/Mangalore",
      "stipend": "Not disclosed",
      "description": "We are looking for energetic intern to join our software development team. The intern w..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Truckx",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-truckx-inc-pune-0-to-2-years-230721500309",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": ". As a software engineer intern in backend team, you will be building backend services ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern, Core Infrastructure",
      "companyName": "Poshmark",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-core-infrastructure-poshmark-chennai-0-to-1-years-230223501382",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": ". . . . . Our goal is to give you exposure to a range of development techniques and cur..."
    },
    {
      "site": "Naukri",
      "title": "SOFTWARE ENGINEER INTERN",
      "companyName": "Qbotica",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-qbotica-remote-0-to-4-years-221122503590",
      "location": "remote",
      "stipend": "Not disclosed",
      "description": "As software engineer intern, you will build robust and scalable software, participate i..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Openstack Apps",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-openstack-remote-0-to-1-years-211022501096",
      "location": "Remote",
      "stipend": "Not disclosed",
      "description": "Basic experience with at least one back end or front end programming language (e.g PHP,..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern, iOS",
      "companyName": "Poshmark",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-ios-poshmark-chennai-0-to-1-years-201222500547",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": "Over 12 weeks the intern can expect to become deeply involved in learning the tech stac..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Etasens Technologies",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-etasens-technologies-chandigarh-0-to-1-years-100120500470",
      "location": "Chandigarh",
      "stipend": "Not disclosed",
      "description": "Minimum Qualifications : Should have an Engineer degree/final semester. Core Technologi..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Intern",
      "companyName": "Teknorix",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-teknorix-systems-panaji-panjim-0-to-1-years-020322500411",
      "location": "Panaji/Panjim",
      "stipend": "Not disclosed",
      "description": "What is expected from you? As a Software Engineer Intern, you will have to provide assi..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern",
      "companyName": "Logicplum",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-logicplum-trivandrum-thiruvananthapuram-0-to-1-years-100521500256",
      "location": "Trivandrum/Thiruvananthapuram",
      "stipend": "Not disclosed",
      "description": "Experience programming in C, C++, or PythonPractical experience with a wide variety of ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineering Intern - ML Ops",
      "companyName": "Enterpret",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-ml-ops-enterpret-remote-0-to-1-years-090223502131",
      "location": "Permanent Remote",
      "stipend": "Not disclosed",
      "description": "Available for a full-time 3-6 month internship immediately. . . . Proficiency with Pyth..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern - Python",
      "companyName": "Logicplum",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-python-logicplum-trivandrum-thiruvananthapuram-0-to-2-years-071221500332",
      "location": "Trivandrum/Thiruvananthapuram",
      "stipend": "Not disclosed",
      "description": "Working with team members to help develop optimal approaches to provide good architectu..."
    },
    {
      "site": "Naukri",
      "title": "Intern: Software Engineering",
      "companyName": "BayaTree",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-bayatree-kolkata-mumbai-new-delhi-hyderabad-secunderabad-pune-chennai-bangalore-bengaluru-0-to-1-years-211118500010",
      "location": "Kolkata, Mumbai, New Delhi, Hyderabad/Secunderabad, Pune, Chennai, Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "You should be a fresh graduate/ post graduate with good communication skills and passio..."
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineer",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-cadence-design-systems-ahmedabad-0-to-2-years-220922501736",
      "location": "Ahmedabad",
      "stipend": "Not disclosed",
      "description": "Fresh Engineering graduate in electronics or Comp Science Very good digital / analog sk..."
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineer",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-cadence-design-systems-ahmedabad-0-to-2-years-100822500740",
      "location": "Ahmedabad",
      "stipend": "Not disclosed",
      "description": "Position Requirements: . . Fresh Engineering graduate in electronics or Comp Science . ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - PHP - Intern",
      "companyName": "Dongre Technoquip Pvt. Ltd",
      "link": "https://www.naukri.com/job-listings-software-engineer-php-intern-dongre-technoquip-pvt-ltd-mumbai-thane-0-to-1-years-181220500265",
      "location": "Mumbai, Thane",
      "stipend": "Not disclosed",
      "description": ". . . Educational Qualifications: . . Preferably from an software engineering / technic..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer-  Intern",
      "companyName": "Blueberry Digital Labs",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-blueberry-labs-hyderabad-secunderabad-2-to-4-years-290416500459",
      "location": "Hyderabad",
      "stipend": "Not disclosed",
      "description": "Company Description Blueberry Digital Labs (www. blueberrylabs. com) is a leading young..."
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer",
      "companyName": "Terix International",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-terix-international-noida-0-to-1-years-100223501803",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Must have core PHP and MySql knowledge Good technical aptitude, willingness to learn ne..."
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer",
      "companyName": "Riversand Technologies, Inc.",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-riversand-technologies-inc-remote-0-to-2-years-300123500388",
      "location": "remote",
      "stipend": "Not disclosed",
      "description": "Knowledge of professional software engineering practices & best practices for the full ..."
    },
    {
      "site": "Naukri",
      "title": "Interns - Software Engineering",
      "companyName": "Aphthartos Technologies",
      "link": "https://www.naukri.com/job-listings-interns-software-engineering-gighub-hyderabad-secunderabad-0-to-1-years-160621500530",
      "location": "Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "- We are looking for highly driven interns to help our product team build our core plat..."
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer ( Onsite )",
      "companyName": "SJ Innovation",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-onsite-sj-innovation-llc-panaji-panjim-0-to-2-years-131022501563",
      "location": "Panaji/Panjim",
      "stipend": "Not disclosed",
      "description": "Outstanding coding abilities Thorough knowledge of atleast 1 programming language. Work..."
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer ( Onsite )",
      "companyName": "SJ Innovation",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-onsite-sj-innovation-llc-panaji-panjim-0-to-2-years-131022501562",
      "location": "Panaji/Panjim",
      "stipend": "Not disclosed",
      "description": "Thorough knowledge of atleast 1 programming languageWorking knowledge of HTML, CSS, Jav..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Telit",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-telit-bangalore-bengaluru-5-to-6-years-181122501402",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Qualifications: . . Bachelors or master s degree in engineeringNo experience required. ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "National Instruments",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-national-instruments-india-pvt-ltd-bangalore-bengaluru-1-to-2-years-050123500638",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "The Software Engineer Intern position is a challenging role within NI, requiring daily ..."
    },
    {
      "site": "Naukri",
      "title": "software engineering intern",
      "companyName": "Medyug Technology",
      "link": "https://www.naukri.com/job-listings-software-engineering-intern-medyug-technology-pvt-ltd-bengaluru-bangalore-2-to-5-years-090117500589",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "MTBNG - SWINT - 01 : Internship Description: Requirements:Good knowledge of algorithmsM..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Intern",
      "companyName": "Saras Analytics",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-saras-solutions-india-pvt-ltd-hyderabad-secunderabad-1-to-3-years-101022502841",
      "location": "Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "Requirements: . . . . Proficient in . . Demonstrable understanding of . . Design Patter..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Training Basket",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-training-basket-new-delhi-1-to-3-years-210223501757",
      "location": "New Delhi",
      "stipend": "Not disclosed",
      "description": "Criteria for Pre Placement Offer: Interview after successful completion of 2 months int..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "The Depository Trust &amp;amp; Clearing Corporation (DTCC)",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-the-depository-trust-amp-amp-clearing-corporation-dtcc-chennai-5-to-6-years-141122500725",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": "The Information Technology Intern will participate in the collection and analysis of pr..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern",
      "companyName": "Epitas",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-epitas-mangaluru-mangalore-2-to-5-years-111121501683",
      "location": "Mangaluru/Mangalore",
      "stipend": "Not disclosed",
      "description": "Assess applicants relevant knowledge, skills, soft skills, experience and aptitudes"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Intern - Angular",
      "companyName": "Logicplum",
      "link": "https://www.naukri.com/job-listings-software-engineer-intern-angular-logicplum-trivandrum-thiruvananthapuram-2-to-7-years-071221500333",
      "location": "Trivandrum/Thiruvananthapuram",
      "stipend": "Not disclosed",
      "description": "Develop awesome client-side applications, using Angular . . Optimize applications for m..."
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-noida-1-to-2-years-270123501824",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Fresh Engineering graduate in electronics or Comp Science Very good digital/analog skil..."
    },
    {
      "site": "Naukri",
      "title": "Intern - Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-noida-1-to-2-years-220223501010",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Fresh Engineering graduate in electronics or Comp Science . Very good digital / analog ..."
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-noida-1-to-2-years-130123500432",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": "Strong C/C++ development skills with a good understanding of object-oriented design. St..."
    },
    {
      "site": "Naukri",
      "title": "Intern-Software Engineering",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-cadence-design-systems-ahmedabad-1-to-2-years-100822500741",
      "location": "Ahmedabad",
      "stipend": "Not disclosed",
      "description": "Position Requirements: . . Fresh Engineering graduate in electronics or Comp Science . ..."
    },
    {
      "site": "Naukri",
      "title": "Intern  Software Engineering",
      "companyName": "Springworks",
      "link": "https://www.naukri.com/job-listings-intern-software-engineering-springworks-bengaluru-bangalore-1-to-6-years-110321501645",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "The intern will gain exciting realworld software engineering experience at a thriving c..."
    },
    {
      "site": "Naukri",
      "title": "S/W Engineer/Intern",
      "companyName": "Marvell Semiconductors",
      "link": "https://www.naukri.com/job-listings-s-w-engineer-intern-marvell-india-pvt-ltd-pune-0-to-1-years-150323501992",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Write code, unit-tests as per discussion with team leader, and debug necessary C / C++ ..."
    },
    {
      "site": "Naukri",
      "title": "Intern Software Engineer",
      "companyName": "Atoconn System Labs",
      "link": "https://www.naukri.com/job-listings-intern-software-engineer-atoconn-system-labs-private-limited-thane-6-to-11-years-140519500126",
      "location": "Thane",
      "stipend": "Not disclosed",
      "description": "Intern Software Engineer Location: Thane (Experience : 0-0. 6 Yr) Qualification : B. E ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Snowflake",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-software-engineer-snowflake-siemens-limited-bangalore-bengaluru-0-to-5-years-270323500272",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Responsible for the development and delivery of parts of a product, in accordance with ..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Citiustech",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-citiustech-mumbai-0-to-1-years-190621500479",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "As a Trainee SoftwareEngineer , you will be part of an agile team to build healthcareap..."
    },
    {
      "site": "Naukri",
      "title": "Junior Software Engineer - Intern",
      "companyName": "Boxfile",
      "link": "https://www.naukri.com/job-listings-junior-software-engineer-intern-boxfile-chennai-0-to-1-years-220322501502",
      "location": "Chennai",
      "stipend": "Not disclosed",
      "description": "Bachelor s degree, preferably in Computer Science, Information Technology, Computer Eng..."
    },
    {
      "site": "Naukri",
      "title": "Senior Software Engineer - C++ Golang",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-senior-software-engineer-c-golang-siemens-limited-bangalore-bengaluru-0-to-7-years-150323503230",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "You should be flexible for a Technology shift from C++ to Golang You Should be able to ..."
    },
    {
      "site": "Naukri",
      "title": "Software Development Engineer 1",
      "companyName": "Jio",
      "link": "https://www.naukri.com/job-listings-software-development-engineer-1-jio-bangalore-bengaluru-delhi-ncr-mumbai-all-areas-0-to-3-years-100323005317",
      "location": "Bangalore/Bengaluru, Delhi / NCR, Mumbai (All Areas)",
      "stipend": "Not disclosed",
      "description": "2+ years of non-internship professional software development experienceBE /B Tech in Co..."
    },
    {
      "site": "Naukri",
      "title": "Software / Firmware Engineer - Intern",
      "companyName": "Marvell Semiconductors",
      "link": "https://www.naukri.com/job-listings-software-firmware-engineer-intern-marvell-india-pvt-ltd-bangalore-bengaluru-0-to-2-years-180323501194",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "1.Skill in Automation Strategy and Methodology. 2.Strong skills in Python scripting. 3...."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Infineon",
      "link": "https://www.naukri.com/job-listings-software-engineer-infineon-technologies-pvt-ltd-bangalore-bengaluru-0-to-1-years-020223500888",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Exposure to Unix/ Linux Platforms . . Preferably having working knowledge in Perl/ Pyth..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Fresher - QA",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-software-engineer-fresher-qa-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-290921501859",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": ". 0-2 years of experience in Software Industry, preferably from Product companiesWorkin..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Java (Fresher -Batch 2022 passout only)",
      "companyName": "Paytm",
      "link": "https://www.naukri.com/job-listings-software-engineer-java-fresher-batch-2022-passout-only-paytm-noida-0-to-1-years-270323007289",
      "location": "Hybrid - Noida",
      "stipend": "Not disclosed",
      "description": "Batch - 2022 (BTech) . Preferred Qualifications : BTech - 2022 batch, Bachelors / Maste..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-software-engineer-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-241221501632",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Should have Strong problem solving capability. . Be able to contribute as strong hands-..."
    },
    {
      "site": "Naukri",
      "title": "Altisource Software Engineer",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-altisource-software-engineer-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-231221500016",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "WHAT YOU GET TO DO Participate in Development of new features in Vendorly Monitor platf..."
    },
    {
      "site": "Naukri",
      "title": "Altisource Software Engineer - Fresher - QA",
      "companyName": "Altisource",
      "link": "https://www.naukri.com/job-listings-altisource-software-engineer-fresher-qa-altisource-business-solutions-pvt-ltd-bangalore-bengaluru-0-to-2-years-011121500169",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Requirement 0-2 years of experience in Software Industry, preferably from Product compa..."
    },
    {
      "site": "Naukri",
      "title": "PHP DEVELOPER, SOFTWARE ENGINEER",
      "companyName": "Godigi Infotech",
      "link": "https://www.naukri.com/job-listings-php-developer-software-engineer-godigi-infotech-mumbai-0-to-3-years-040122501238",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Experience 0 - 3 Years working Knowledge in web technologies and MYSQL ( HTML 5, CSS 3,..."
    },
    {
      "site": "Naukri",
      "title": "Associate I Software Engineer",
      "companyName": "S&P Global Inc.",
      "link": "https://www.naukri.com/job-listings-associate-i-software-engineer-s-p-global-inc-bangalore-bengaluru-0-to-2-years-250323500448",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Strong programming skills in Python Automation preferably in Windows environment Should..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - UI",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-software-engineer-ui-siemens-limited-bangalore-bengaluru-0-to-5-years-150323503232",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "BE/ B Tech/ MCA/ M Tech/ . Engineering Graduate / Post Graduate (preferably a major in ..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Omangom Infosystems",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-omangom-infosystems-delhi-ncr-0-to-0-years-140323006160",
      "location": "Delhi / NCR",
      "stipend": "1.25-2.5 Lacs PA",
      "description": "Basic Requirements :-Good Programming and Coding AbilityPositive AttitudeEagerness to L..."
    },
    {
      "site": "Naukri",
      "title": "Associate Software Engineer",
      "companyName": "GlobalLogic",
      "link": "https://www.naukri.com/job-listings-associate-software-engineer-globallogic-gurgaon-gurugram-0-to-1-years-210323003915",
      "location": "Gurgaon/Gurugram",
      "stipend": "Not disclosed",
      "description": "Should be able to fix and maintain clients bug list as per priority Route the ticket / ..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Jardine Lloyd Thompson",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-jardine-lloyd-thompson-india-pvt-ltd-mumbai-0-to-2-years-220323500534",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "A Trainee Software Engineer will be expected to learn the basic principles of software ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Kodiak Networks",
      "link": "https://www.naukri.com/job-listings-software-engineer-motorola-solutions-india-private-ltd-bangalore-bengaluru-0-to-1-years-060223501129",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "On-call work are occasionally required for services developed by the team . . . . . . ...."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer / Trainees",
      "companyName": "venuebookingz.com",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainees-venuebookingz-com-bengaluru-bangalore-0-to-2-years-310118501365",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Full time in Benguluru only Must be comfortable working in fuzzy environments- where bo..."
    },
    {
      "site": "Naukri",
      "title": "Associate Professional Software Engineer",
      "companyName": "DXC Technology",
      "link": "https://www.naukri.com/job-listings-associate-professional-software-engineer-dxc-technology-bangalore-bengaluru-0-to-5-years-220822501100",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Bachelors degree or equivalent combination of education and experienceBachelors degree ..."
    },
    {
      "site": "Naukri",
      "title": "uReturn -Software Engineer / System Engineer / Data Engineer",
      "companyName": "Uber",
      "link": "https://www.naukri.com/job-listings-ureturn-software-engineer-system-engineer-data-engineer-uber-bangalore-bengaluru-0-to-3-years-190522500563",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Bachelors degree or equivalent in Computer Science, Engineering, Mathematics or related..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Infobeans",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-infobeans-technologies-limited-indore-0-to-0-years-131118600153",
      "location": "Indore",
      "stipend": "Not disclosed",
      "description": "We are conducting a WalkIn Drive to Hire fresh graduates to join usEducation : Bachelor..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Yodlee",
      "link": "https://www.naukri.com/job-listings-software-engineer-yodlee-infotech-private-limited-bangalore-bengaluru-0-to-2-years-131021500572",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Skills & Knowledge : Java and J2EE and exposure to web technologies JSP, Servlet, HTML ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer / Trainees",
      "companyName": "easybookingz, TIS Pvt. Ltd",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainees-easybookingz-tis-pvt-ltd-bengaluru-bangalore-0-to-1-years-070818500242",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Location: Full time & Benguluru . Must be comfortable working in fuzzy environments- wh..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Institutional Shareholder Services",
      "link": "https://www.naukri.com/job-listings-software-engineer-institutional-shareholder-services-inc-mumbai-0-to-4-years-270922501053",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Rapid design and implementation of user interfaces within constraints of a UI framework..."
    },
    {
      "site": "Naukri",
      "title": "Software Development Engineer",
      "companyName": "Greenizon Agritech Consultancy",
      "link": "https://www.naukri.com/job-listings-software-development-engineer-jai-kisan-bangalore-bengaluru-0-to-4-years-301122501469",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "The ideal candidate is the one who is willing to undergo 6 months on internship with us..."
    },
    {
      "site": "Naukri",
      "title": "Junior Software Engineers Freshers B-Tech /IT/MCA/BCA/BSC/MTech",
      "companyName": "Perennation Computer Solutions Global Private Limi Ted",
      "link": "https://www.naukri.com/job-listings-junior-software-engineers-freshers-b-tech-it-mca-bca-bsc-mtech-perennation-computer-solutions-global-private-limi-ted-bhubaneswar-kolkata-bangalore-bengaluru-0-to-3-years-220323006465",
      "location": "Hybrid - Bhubaneswar, Kolkata, Bangalore/Bengaluru",
      "stipend": "50,000-3 Lacs PA",
      "description": "Candidates should be passed out BE / B-Tech & ME/ M-Tech, BCA, MCA, and graduatesPerks ..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Trainee  SQL/PostgreSQL",
      "companyName": "Impact Analytics",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-sql-postgresql-impact-analytics-bangalore-bengaluru-0-to-1-years-150323003900",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": "Working towards or currently possess a bachelors degree from a four-year college or uni..."
    },
    {
      "site": "Naukri",
      "title": "Associate Software Engineer",
      "companyName": "S&P Global Inc.",
      "link": "https://www.naukri.com/job-listings-associate-software-engineer-s-p-global-inc-hyderabad-secunderabad-0-to-2-years-230323502501",
      "location": "Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "Willing to work in 24*5 environment on rotational shifts Basic knowledge of Linux / Win..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Kodiak Networks",
      "link": "https://www.naukri.com/job-listings-software-engineer-motorola-solutions-india-private-ltd-kolkata-0-to-4-years-210323500177",
      "location": "Kolkata",
      "stipend": "Not disclosed",
      "description": "In C, C++, scripting languages such as Python, TCL, and other languages as requiredenvi..."
    },
    {
      "site": "Naukri",
      "title": "Hiring For Associate software Engineer",
      "companyName": "GlobalLogic",
      "link": "https://www.naukri.com/job-listings-hiring-for-associate-software-engineer-globallogic-gurgaon-gurugram-0-to-1-years-070323004535",
      "location": "Gurgaon/Gurugram",
      "stipend": "1-4 Lacs PA",
      "description": "Experience: 0 to 1 Years Good knowledge of Regular Expressions. . . . Strong OOPS Conce..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Meta Soft Tech Systems Private Limted",
      "link": "https://www.naukri.com/job-listings-software-engineer-meta-soft-tech-systems-private-limted-chennai-tiruchirapalli-trichy-0-to-0-years-030323005041",
      "location": "Chennai, Tiruchirapalli/Trichy",
      "stipend": "Not disclosed",
      "description": "Bachelor s degree in CSC/ EEE / ECE with good knowledge in Core Java/ C/ C+ Knowledge o..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - CBTC - Railway Infrastructure",
      "companyName": "Siemens",
      "link": "https://www.naukri.com/job-listings-software-engineer-cbtc-railway-infrastructure-siemens-limited-pune-0-to-8-years-300621501758",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Knowledge of radio principle for CBTC. . You have experience in reading and understandi..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - React Native",
      "companyName": "moglix",
      "link": "https://www.naukri.com/job-listings-software-engineer-react-native-moglix-noida-0-to-3-years-090922501881",
      "location": "Noida",
      "stipend": "Not disclosed",
      "description": ". 7, Should have good experience in iOS, React Native & Redux We are looking for a smar..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-071122501323",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Required Qualifications and Experience . . . . Should have good understanding of Client..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501577",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Work with infra team to get desired configuration done for various initiatives undertak..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501215",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Any Graduate with good technical knowledge (PLSQL) An experience of more than 3 yearsEx..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501213",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Minimum Qualification: Graduate/ Post-graduate in Engineering Bachelors degree in Compu..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501212",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "No / Less escalation from business. . . . Qualification, Experience / Skills, Leadershi..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Bajaj Finserv Ltd.",
      "link": "https://www.naukri.com/job-listings-software-engineer-bajaj-finserv-ltd-pune-0-to-3-years-070223501211",
      "location": "Pune",
      "stipend": "Not disclosed",
      "description": "Should have good financial domain knowledge of business process and solutions Manage te..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer, developer / Programmer, 2022 graduate Can also appl",
      "companyName": "Creative Hands HR",
      "link": "https://www.naukri.com/job-listings-software-engineer-developer-programmer-2022-graduate-can-also-appl-creative-hands-hr-hyderabad-secunderabad-chennai-bangalore-bengaluru-0-to-1-years-261222001008",
      "location": "Temp. WFH - Hyderabad/Secunderabad, Chennai, Bangalore/Bengaluru",
      "stipend": "5-7 Lacs PA",
      "description": "Software Programmer / Developer Qualification- Diploma, BE / BTech IT, CSE, BCA, MCA, B..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Apogaeis",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-apogaeis-technologies-bengaluru-bangalore-0-to-1-years-260619500926",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Business, Industry, Technology Management News, Trends, Tips Blogs for a Successful Pra..."
    },
    {
      "site": "Naukri",
      "title": "Software Testing Engineer (Intern) - Web & Mobile",
      "companyName": "Shujabits Infotech Solutions",
      "link": "https://www.naukri.com/job-listings-software-testing-engineer-intern-web-mobile-shujabits-infotech-solutions-navi-mumbai-0-to-1-years-210323911629",
      "location": "Navi Mumbai",
      "stipend": "Not disclosed",
      "description": "RequirementsSKILLS AND EXPERIENCE REQUIRED FOR THIS ROLE:Excellent analytical ability.A..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Rhytify Technologies",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-rhytify-technologies-private-limited-bengaluru-bangalore-0-to-4-years-120819502299",
      "location": "Bengaluru",
      "stipend": "Not disclosed",
      "description": "Recent Computer Science Graduates with good gradesKnowledge of any RDBMS . . Good commu..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer I",
      "companyName": "Cadence",
      "link": "https://www.naukri.com/job-listings-software-engineer-i-cadence-design-systems-bangalore-bengaluru-0-to-2-years-311222500392",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": ". . . . . . . BTech / M.tech in Computer Science or Electrical Engineering Proficient i..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Backend",
      "companyName": "Greenizon Agritech Consultancy",
      "link": "https://www.naukri.com/job-listings-software-engineer-backend-jai-kisan-bangalore-bengaluru-0-to-3-years-301122501470",
      "location": "Bangalore/Bengaluru",
      "stipend": "Not disclosed",
      "description": ". Should be involved to drive product design discussionsShould be working with the fron..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Laurus Software Technologies",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-laurus-software-technologies-pvt-ltd-mumbai-0-to-1-years-301018501357",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Trainee Software Engineer"
    },
    {
      "site": "Naukri",
      "title": "Software Engineer - Trainee C++ Developer",
      "companyName": "VXL Software Solutions",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-c-developer-vxl-software-mumbai-0-to-1-years-300919501308",
      "location": "Mumbai",
      "stipend": "Not disclosed",
      "description": "Software Engineer - Trainee C++ Developer - 15 vacancies Job details Trainee C Plus Plu..."
    },
    {
      "site": "Naukri",
      "title": "Trainee Software Engineer",
      "companyName": "Digital Business People",
      "link": "https://www.naukri.com/job-listings-trainee-software-engineer-digital-business-people-pte-ltd-noida-hyderabad-secunderabad-0-to-1-years-300522503570",
      "location": "Noida, Hyderabad/Secunderabad",
      "stipend": "Not disclosed",
      "description": "Willing to learn new technologies and adapt quickly . . Good communications skills, abl..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer",
      "companyName": "Researchtech",
      "link": "https://www.naukri.com/job-listings-software-engineer-researchtech-mumbai-all-areas-0-to-1-years-270323008014",
      "location": "Hybrid - Mumbai (All Areas)",
      "stipend": "1-1.75 Lacs PA",
      "description": "Candidate should have worked as an individual contributor in most stages of SDLC requir..."
    },
    {
      "site": "Naukri",
      "title": "Software Engineer Trainee",
      "companyName": "Williams Lea",
      "link": "https://www.naukri.com/job-listings-software-engineer-trainee-williams-lea-kochi-cochin-0-to-1-years-270223005265",
      "location": "Permanent Remote",
      "stipend": "4.5-5 Lacs PA",
      "description": "As a new graduate, youll have the opportunity to work alongside experienced developers ..."
    }

  ]
  const db = getFirestore(app);
  const [multipleSelectValuesOption, setMultipleSelectValuesOption] =
    useState("");
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    let _user = JSON.parse(localStorage.getItem("user"));
    if (sidenav == 6 && !_user) {
      alert("Please Login to save & view saved internships.");
      setSidenav(1);
    }
  });
  const [
    multipleSelectValuesOptionLocation,
    setMultipleSelectValuesOptionLocation,
  ] = useState("");
  // console.log(multipleSelectValuesOption)
  const [sidenav, setSidenav] = useState(1);
  const [internships, setInternships] = useState(data);
  const [saveInternships, setSaveInternships] = useState(data);
  // useEffect(() => {
  //   setInternships(data);
  // }, []);
  const getInternships = async () => {
    // await fetch("../../public/browseAll.json")
    //   .then(function (data) {
    // handle success
    // const data = await require("browseAll.json");
    setInternships(data);
    setSaveInternships(data);
    console.log(data);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // });
  };
  const getInternshipsInternshala = async () => {
    // await axios
    //   .get("http://localhost:4000/internshala/software%20engineer")
    //   .then(function (response) {
    // handle success
    setInternships(
      saveInternships.filter((i) => {
        return i.site == "Internshala";
      })
    );

    // setInternships(response?.data?.data);
    // setSaveInternships(response?.data?.data);
    // console.log(response?.data?.data);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // });
  };
  const getInternshipsLinkedin = async () => {
    // await axios
    //   .get("http://localhost:4000/linkedin/software%20engineer")
    //   .then(function (response) {
    //     // handle success

    //     setInternships(response?.data?.data);
    //     setSaveInternships(response?.data?.data);
    //     console.log(response?.data?.data);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    setInternships(
      saveInternships.filter((i) => {
        return i.site == "LinkedIN";
      })
    );
  };
  const getInternshipsNaukri = async () => {
    // await axios
    //   .get("http://localhost:4000/naukri/software%20engineer")
    //   .then(function (response) {
    //     // handle success

    //     setInternships(response?.data?.data);
    //     setSaveInternships(response?.data?.data);
    //     console.log(response?.data?.data);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    setInternships(
      saveInternships.filter((i) => {
        return i.site == "Naukri";
      })
    );
  };
  const getInternshipsIndeed = async () => {
    // await axios
    //   .get("http://localhost:4000/indeed/software%20engineer")
    //   .then(function (response) {
    //     // handle success

    //     setInternships(response?.data?.data);
    //     setSaveInternships(response?.data?.data);
    //     console.log(response?.data?.data);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    setInternships(
      saveInternships.filter((i) => {
        return i.site == "Indeed";
      })
    );
  };

  const handleOnchange = (val) => {
    alert("Server Down Can't fetch internships by category")
    // setMultipleSelectValuesOption(val);
  }
  const handleOnchangeLocation = (val) => {
    setMultipleSelectValuesOptionLocation(val);
    filterInternships();
  };

  const multiSelectTag = [
    {
      label: "Software Engineer",
      value: "Software Engineer",
    },
    {
      label: "Backend Development Intern",
      value: "Backend Development Intern",
    },
    {
      label: "Frontend Development Intern",
      value: "Frontend Development Intern",
    },
    {
      label: "Mobile Development Intern",
      value: "Mobile Development Intern",
    },
  ];
  const multiSelectTagLocation = [
    {
      label: "Work From Home",
      value: "Work From Home",
    },
    {
      label: "India",
      value: "India",
    },
    {
      label: "Mumbai",
      value: "Mumbai",
    },
    {
      label: "Banglore",
      value: "Banglore",
    },
    {
      label: "Hydrebad",
      value: "Hydrebad",
    },
    {
      label: "Delhi",
      value: "Delhi",
    },
    {
      label: "Pune",
      value: "Pune",
    },
  ];

  const getSavedInternships = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.email) {
      const querySnapshot = await getDocs(collection(db, user.email));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docID: doc.id });
      });
      console.log(arr);
      setInternships(arr);
      setSaveInternships(arr);
    } else {
      alert("Please Login to view saved internships");
    }
  };

  const saveInternship = async (internship) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.email) {
      await addDoc(collection(db, user.email), {
        ...internship,
      });
    }
  };

  const filterInternships = async () => {
    let _locations = multipleSelectValuesOptionLocation.split(",");
    console.log(_locations);
    if (_locations.length === 1 && _locations[0] === "") {
      setInternships(saveInternships);
      return;
    }
    let res = saveInternships.filter((i) => {
      return _locations.includes(i.location);
    });
    console.log(res);
    // setInternships(res);
    setInternships(res);
  };

  useEffect(() => {
    filterInternships();
    setSaveInternships(data);
  }, [multipleSelectValuesOptionLocation]);

  return (

    <>

       <Navbar setModalOpen={setModalOpen} />
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      
    <div className="pt-6  md:pl-20 md:pr-20 pr-3 pl-3">
      <div>
        <div className="text-2xl md:text-3xl  font-medium">
          Search For Internships
        </div>
      </div>
      <div className="flex flex-row gap-5 pt-6 pb-2 flex-wrap justify-between">
        <div className="flex flex-row gap-5 flex-wrap">
          <div
            className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setSidenav(1);
              getInternships();
            }}
            style={{ backgroundColor: sidenav === 1 ? "#F6A92E" : "white" }}
          >
            Browse All
          </div>
          <div
            className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setSidenav(2);
              getInternshipsInternshala();
            }}
            style={{ backgroundColor: sidenav === 2 ? "#F6A92E" : "white" }}
          >
            Internshala
          </div>
          <div
            className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setSidenav(3);
              getInternshipsLinkedin();
            }}
            style={{ backgroundColor: sidenav === 3 ? "#F6A92E" : "white" }}
          >
            Linked In
          </div>
          <div
            className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setSidenav(4);
              getInternshipsIndeed();
            }}
            style={{ backgroundColor: sidenav === 4 ? "#F6A92E" : "white" }}
          >
            Indeed
          </div>
          <div
            className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setSidenav(5);
              getInternshipsNaukri();
            }}
            style={{ backgroundColor: sidenav === 5 ? "#F6A92E" : "white" }}
          >
            Naukri
          </div>
          <div
            className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setSidenav(6);
              getSavedInternships();
            }}
            style={{ backgroundColor: sidenav === 6 ? "#F6A92E" : "white" }}
          >
            Saved Internships
          </div>
        </div>
        <div>Total internships found : {internships.length}</div>
      </div>
      <hr></hr>
      <div
        className="flex p-3 gap-4 flex-col md:flex-row"
        style={{ height: "78vh" }}
      >
        <div className="basis-1/4 flex items-center  flex-col p-3 gap-2"
          style={{
            transition: "box-shadow .25s, -webkit-box-shadow .25s",
            boxShadow:
              " 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)",
          }}
        >
          <div className="w-full flex flex-col justify-center items-center" >
            <div className="font-bold">
              {/* <FilterAltOutlinedIcon /> */}
              Filter
            </div>
            <div className="flex flex-col mt-3">
              <div className=" flex items-center justify-start font-semibold">
                Category
              </div>
              <MultiSelect
                style={{ border: "none" }}
                className="multi-select"
                onChange={handleOnchange}
                options={multiSelectTag}
              />
              {/* <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
              /> */}
            </div>
            <div className="flex flex-col mt-4">
              <div className=" flex items-center justify-start font-semibold">
                Location
              </div>
              <MultiSelect
                style={{ border: "none" }}
                className="multi-select"
                onChange={handleOnchangeLocation}
                options={multiSelectTagLocation}
              />
              {/* <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
              /> */}
            </div>
          </div>
        </div>
        <div className="basis-3/4 h-full  flex flex-col gap-6 scrollbar-thin scrollbar-thumb-navOrange pr-3 scrollbar-track-orange-100 overflow-y-scroll">
          {data.length && displayData.length == 0 ? (
            <div>
              {internships.map((i) => {
                return (
                  <InternshipCard
                    currValue={sidenav}
                    docID={i?.docID}
                    site={i?.site}
                    title={i?.title}
                    stipend={i?.stipend}
                    location={i?.location}
                    companyName={i?.companyName}
                    link={i?.link}
                    description={i?.description}
                    getSavedInternships={filterInternships}
                    allInterns={true}
                  />
                );
              })}
            </div>
          ) : (
            <div
              className="mt-10 flex items-center justify-center flex-col"
              style={{ height: "145px" }}
            >
              <img
                src="notfound.svg"
                alt=""
                style={{ height: "100%", width: "100%" }}
              />
              <div className="flex justify-center items-center font-bold">
                Internships Not Found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SideNav;
