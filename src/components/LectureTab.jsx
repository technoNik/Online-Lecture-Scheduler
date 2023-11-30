import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const LectureTab = ({course}) => {

    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [updatedCourse, setUpdatedCourse] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [formData, setFormData] = useState({
        lectureName : "",
        date : null,
    })

    const getInstructors = () => {
        axios
          .get("http://localhost:5000/api/instructors/getInstructors")
          .then((response) => setInstructors(response?.data?.instructors))
          .catch((error) => console.error("Error fetching instructors:", error));
      }
    
      useEffect(() => {
        getInstructors();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const bodyData = new FormData();
        bodyData.append("lectureName", formData.lectureName);
        bodyData.append("date", formData.date);
        bodyData.append("instructor", selectedInstructor);
        bodyData.append("course", course?.data?._id);
        const toastId = toast.loading("Loading...");
        try{
            const response = await axios.post("http://localhost:5000/api/courses/addLecture", bodyData);
            if(!response?.data?.success){
                throw new Error ("Failed to add lecture")
            }
            if(response) {
                setUpdatedCourse(response?.data?.data);
            }
            console.log("NEW LECTURE ADDED API..." , response);
            toast.success ("Lecture Added Successfully.");
        }catch(error){
            console.log(error);
            toast.error("Failed to add lecture");
        }
        toast.dismiss(toastId);
      }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label>
            <p>Lecture Name<span>*</span></p>
            <input type='text' placeholder='Enter lecture name' name='lectureName' value={formData.lectureName} required
             onChange={(e) =>
                  setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
            }
            className="w-full px-3 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
            />
        </label>

        <label>
            <p>Lecture Data<span>*</span></p>
            <input type='date' name='date' value={formData.date} required
            onChange={(e) =>
                  setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
                }
                className="w-full px-3 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
             />
        </label>

        <label>
            <p>Select Instructor<span>*</span></p>
            <select onChange={(e) => setSelectedInstructor(e.target.value)} 
            className="w-full px-3 py-2 bg-blue-300 rounded-md font-semibold text-blue-900"
            >
            <option value="">Select an instructor</option>
                { instructors &&
                    instructors?.map((instructor) => (
                    <option key={instructor?._id} value={instructor?._id}>
                    {instructor?.name}
                    </option>
                ))
                }
            </select>
        </label>
        <button type='submit' className='bg-slate-500 px-5 py-2 w-fit text-blue-700 rounded-md font-semibold'>
            Add Lecture
        </button>
    </form>
  )
}

export default LectureTab