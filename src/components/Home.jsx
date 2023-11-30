import React, { useEffect, useState } from 'react'
import CourseCard from "./CourseCard"
import axios from 'axios';

const Home = () => {

    const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/getCourses")
      .then((response) => {
        console.log(response);
        setCourses(response?.data?.data)
    })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-gray-100 to-gray-300 pt-6">
      <div className='flex flex-col justify-center items-center'>
        <h1 className="text-gray-600 font-semibold text-5xl">ONLINE LECTURE SCHEDULING</h1>
      </div>
        <div className="grid grid-cols-3 place-items-center gap-5 p-8 w-11/12 mx-auto ">
          {
            courses && (
              courses.map((course) => (
                <div key={course._id}>
                  <CourseCard course={course}/>
                </div>
              ))
            )
          }
        </div>
    </div>
  )
}

export default Home