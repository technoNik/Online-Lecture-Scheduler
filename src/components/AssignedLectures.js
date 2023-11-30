import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AssignedLectures = ({instructorName}) => {
  const [assignedLectures, setAssignedLectures] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", instructorName);
    const toastId = toast.loading("Loading...");
    axios
      .post(
        "http://localhost:5000/api/instructors/getInstructorDetails",
        formData
      )
      .then((response) => {
        setAssignedLectures(response.data.instructor.lectures);
        console.log(response);
        toast.success("Lectures Fetched Successfully.");
        toast.dismiss(toastId);
      })
      .catch((error) => {
        console.error("Error fetching assigned lectures:", error);
        toast.error("Error while fetching assigned lectures");
        toast.dismiss(toastId);
      });
  };

  return (
    <div className="bg-blue-100 min-h-[calc(100vh-3rem)] flex justify-center items-center">
      <div className="w-3/5 bg-blue-200 rounded-md px-6 py-4 mx-auto text-center">
        <h2 className="text-blue-900 text-3xl font-semibold">
          Instructor Panel
        </h2>

        <div className="flex flex-col items-center gap-3 mt-3">
          <label>
            <p className="text-blue-600 text-xl">
              Welcome {instructorName}<span></span>
            </p>
          </label>
          <button
            onClick={handleSearch}
            className="bg-slate-600 w-fit px-5 py-3 rounded-md hover:bg-slate-400 transition-all duration-100"
          >
            Search Assigned Lectures
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl text-blue-700">Assigned Lectures</h3>
          <ul className="text-left">
            {assignedLectures &&
              assignedLectures?.map((lecture) => (
                <li
                  key={lecture._id}
                >{`Date: ${lecture.date}, Lecture: ${lecture.lectureName}`}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssignedLectures;
