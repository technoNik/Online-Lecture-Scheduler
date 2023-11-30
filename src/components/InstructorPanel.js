import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoginForm from './LoginForm';

const InstructorPanel = () => {
  const [assignedLectures, setAssignedLectures] = useState([]);
  const [username, setUsername] = useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(username)
    formData.append("name", username);
    const toastId = toast.loading("Loading...");
    axios.post('http://localhost:5000/api/instructors/getInstructorDetails', formData)
      .then(response => {
        setAssignedLectures(response.data.instructor.lectures);
        console.log(response)
        toast.success("Lectures Fetched Successfully.")
        toast.dismiss(toastId);
      } )
      .catch(error => {
        console.error('Error fetching assigned lectures:', error);
        toast.error("Error while fetching assigned lectures");
        toast.dismiss(toastId);
      } );
  }

  return (
    <div className="bg-blue-100 min-h-[calc(100vh-3rem)] flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default InstructorPanel;
