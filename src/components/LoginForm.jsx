import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignedLectures from "./AssignedLectures";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isLogged, setIslogged] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getInstructors = () => {
    axios
      .get("http://localhost:5000/api/instructors/getInstructors")
      .then((response) => setInstructors(response?.data?.instructors));
  };

  useEffect(() => {
    getInstructors();
  }, []);

  const handleLogin = (e) => {
    const ins = selectedInstructor.name;
    e.preventDefault();
    console.log(password);
    if (password === ins) {
      setIslogged(true);
      setIsCollapsed(true);
    }
  };

  return (
    <div className="w-2/5 bg-blue-200 rounded-md px-6 py-4 mx-auto ">
      <form>
        <div
          className={`bg-blue-200 flex flex-col rounded-md  ${isCollapsed ? "hidden" : ""}`}
        >
          <h1 className="text-blue-900 text-3xl font-semibold">Login</h1>
          <label htmlFor="instructor">Select Instructor: </label>
          <select
            id="instructor"
            value={selectedInstructor ? selectedInstructor._id : ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selected = instructors.find(
                (instructor) => instructor._id === selectedId
              );
              setSelectedInstructor(selected);
            }}
          >
            <option value="">Select an Instructor</option>
            {instructors &&
              instructors?.map((instructor) => (
                <option key={instructor?._id} value={instructor?._id}>
                  {instructor?.name}
                </option>
              ))}
          </select>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="bg-green-500 text-blue-300 px-4 py-2 mx-40 my-3 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
      {isLogged && <AssignedLectures instructorName={selectedInstructor.name}/>}
    </div>
  );
};

export default LoginForm;
