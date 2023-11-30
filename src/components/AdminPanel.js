import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LectureTab from "./LectureTab";

const AdminPanel = () => {
  const [instructors, setInstructors] = useState([]);
  const [newInstructorName, setNewInstructorName] = useState("");
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const getInstructors = () => {
    axios
      .get("http://localhost:5000/api/instructors/getInstructors")
      .then((response) => setInstructors(response?.data?.instructors))
      .catch((error) => console.error("Error fetching instructors:", error));
  };

  useEffect(() => {
    getInstructors();
  }, []);

  const handleAddInstructor = () => {
    const toastId = toast.loading("Loading...");
    axios
      .post("http://localhost:5000/api/instructors/addInstructor", {
        name: newInstructorName,
      })
      .then((response) => {
        console.log("Instructor added successfully:", response?.data);
        toast.dismiss(toastId);
        toast.success("Instructor Added");
        getInstructors();
        setNewInstructorName("");
      })
      .catch((error) => console.error("Error adding instructor:", error));
    toast.dismiss(toastId);
  };
  const handleAddCourse = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", courseData.name);
    formData.append("level", courseData.level);
    formData.append("description", courseData.description);
    formData.append("image", selectedFile);

    const toastId = toast.loading("Loading...");
    console.log(courseData);
    axios
      .post("http://localhost:5000/api/courses/addCourse", formData)
      .then((response) => {
        toast.dismiss(toastId);
        toast.success("Course Added Successfully.");
        console.log("Course added successfully:", response.data);
        setCurrentCourse(response?.data);
        setCourseData({
          name: "",
          level: "",
          description: "",
          image: "",
        });
        setPreview("");
        setSelectedFile("");
      })
      .catch((error) => {
        toast.dismiss(toastId);
        console.error("Error adding course:", error);
      });
  };

  return (
    <div className="bg-blue-100 min-h-[calc(100vh-3rem)] pt-10">
      <div className="w-3/5 bg-blue-200 rounded-lg px-6 py-4 mx-auto">
        <h2 className="text-blue-900 text-3xl font-bold text-center">
          Admin Panel
        </h2>
        <div className="mt-4 flex flex-col gap-y-4 bg-blue-100 rounded-lg p-6">
          <h3 className="text-2xl text-blue-700 font-semibold text-center">
            Add New Instructor
          </h3>
          <div className="flex flex-row gap-x-4 justify-between">
            <input
              type="text"
              placeholder="Instructor Name"
              value={newInstructorName}
              onChange={(e) => setNewInstructorName(e.target.value)}
              className="w-[75%] px-4 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
            />
            <button
              onClick={handleAddInstructor}
              className="bg-slate-700 text-blue-300 px-5 py-2 rounded-md"
            >
              Add Instructor
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-y-4 bg-blue-100 rounded-lg p-6">
          <h3 className="text-2xl text-blue-700 font-semibold text-center">
            List of Instructors
          </h3>
          <select className="bg-blue-300 font-semibold text-center">
          <option value="">Avalaible Instructors</option>
            {instructors &&
              instructors?.map((instructor) => (
                <option key={instructor?._id} value={instructor?._id}>
                  {instructor?.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-4 bg-blue-100 rounded-lg p-6">
          <h3 className="text-3xl text-blue-900 font-semibold text-center">
            Add Course
          </h3>

          <form onSubmit={handleAddCourse} className="flex flex-col gap-y-4 ">
            <label className="w-full">
              <p>
                Course Name<span>*</span>
              </p>
              <input
                type="text"
                value={courseData.name}
                name="name"
                placeholder="Enter name"
                onChange={(e) =>
                  setCourseData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
              />
            </label>

            <label>
              <p>
                Course Level <span>*</span>
              </p>
              <input
                type="text"
                name="level"
                placeholder="Enter Level"
                value={courseData.level}
                onChange={(e) =>
                  setCourseData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
              />
            </label>

            <label>
              <p>
                Course Description<span>*</span>
              </p>
              <input
                type="text"
                name="description"
                placeholder="Enter Description"
                value={courseData.description}
                onChange={(e) =>
                  setCourseData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
              />
            </label>

            <label>
              <p>
                Course Thumbnail <span>*</span>
              </p>
              <input
                type="file"
                value={courseData.image}
                onChange={(e) => {
                  imageHandler(e);
                  setCourseData((prevState) => ({
                    ...prevState,
                    [e.target.name]: selectedFile,
                  }));
                }}
                onClick={() => inputRef.current.click()}
                className="hidden"
                accept="image/*"
              />
              <div
                ref={inputRef}
                className="flex bg-gray-700 min-w-full h-[300px] justify-center items-center rounded-md"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="thumnail"
                    className="w-[80%] h-[80%] rounded-md"
                  />
                ) : (
                  <div>
                    <p className="text-blue-600 font-semibold text-center">
                      Add thumbnail for the Course
                    </p>
                  </div>
                )}
              </div>
            </label>

            <button
              type="submit"
              className="bg-gray-500 px-8 py-3 rounded-md text-blue-600 font-bold hover:bg-gray-300 transition-all duration-100 w-fit mx-auto"
            >
              Add Course
            </button>
          </form>
        </div>

        <div className="mt-4 bg-blue-100 rounded-lg p-6">
          {currentCourse && (
            <div>
              <h2>Add Lectures for : {currentCourse?.data?.name}</h2>

              <div>
                <LectureTab course={currentCourse} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
