import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import {
  collection,
  addDoc,
  doc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { app  , db} from "../firebaseConfig";
import Swal from 'sweetalert2';

const InternshipCard = (props) => {

  const isUserLoggedIn = () => {
    console.log("checking for user")
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.parse(localStorage.getItem('user')))
    if (user) {
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'Please log in to save internships!',
        confirmButtonColor: 'black', // orange button like your theme
      });
      return false;
    }
  };
  

  const saveInternship = async (internship) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.email) {
      await addDoc(collection(db, user.email), {
        ...internship,
      });
    }
    console.log("Saving internship");
    alert("Internship saved to your profile");
  };
  const removeSavedInternship = async (docID) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.email) {
      await deleteDoc(doc(db, user.email, docID));
      await props.getSavedInternships();
    }
  };
  const [bookmark, setBookmark] = useState(0);
  // }
  const desc = props?.description;
  toString(desc);
  var firstLine = desc.split("\n", 12)[0];
  return (
    <div>
      <div
        className="p-4"
        style={{
          transition: "box-shadow .25s, -webkit-box-shadow .25s",
          boxShadow:
            " 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)",
        }}
      >
        <div className=" flex justify-between gap-1">
          <div className="w-14 shrink-0 inline-block justify-center">
            <div style={{ height: "70%",width:"100%" }}>
              <img
                src={`${props.site.toLowerCase()}-small.png`}
                alt=""
                style={{
                  fontSize: "45px",
                  color: "rgb(10,102,194)",
                  height: "50%",
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 basis-6/7">
            <div className=" shadow-black-100  rounded-md p-1 md:pt-2 flex items-center justify-start font-strong text-xl  ">
              {props?.title}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-1 ">
              <div className=" shadow-black-100  rounded-md p-1 flex items-center justify-start font-semiStrong">
                {props?.companyName}
              </div>
              <div className="flex items-center justify-start   shadow-black-100 font-semiStrong">
                {props?.location}
              </div>
              <div className="flex items-center justify-start   shadow-black-100 font-semiStrong">
                {props.stipend ? `Salary : ${props?.stipend}` : "Salary : Not Disclosed"}
              </div>
            </div>
            <div
              className=" shadow-black-100  rounded-md p-1 flex items-center justify-start text-base "
              style={{ fontWeight: "500", textOverflow: "ellipsis" }}
            >
              {firstLine}
            </div>
            <div className=" shadow-black-100  rounded-md p-1 flex items-center justify-end cursor-pointer ">
              <button
                onClick={() => window.open(props?.link)}
                className="bg-navOrange py-1 px-5 rounded-md"
              >
                view
              </button>
            </div>
          </div>
          {props?.currValue != 6 ? (
            <div className=" flex justify-end pt-2 ">
              {bookmark === 0 && (
                <BookmarkBorderIcon
                  className="text-navOrange cursor-pointer"
                  style={{ fontSize: "30px" }}
                  onClick={() => {
                    if (isUserLoggedIn()) {

                      setBookmark(1);
                      saveInternship({
                        title: props?.title,
                        companyName: props?.companyName,
                        location: props?.location,
                        stipend: props?.stipend,
                        description: props?.description,
                        link: props?.link,
                        site: props?.site,
                      });
                    }
                  }}
                />
              )}
              {bookmark === 1 && (
                <BookmarkOutlinedIcon
                  className="text-navOrange cursor-pointer"
                  style={{ fontSize: "30px" }}
                  onClick={() => {
                    setBookmark(0);
                  }}
                />
              )}
            </div>
          ) : (
            <div className=" flex justify-end pt-2 ">
              <DeleteOutlineIcon
                className="text-navOrange cursor-pointer"
                style={{ fontSize: "30px" }}
                onClick={async () => {
                  setBookmark(1);

                  await removeSavedInternship(props.docID);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
