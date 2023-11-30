import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="flex flex-col w-[320px] gap-y-3 rounded-md bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <img
        src={course?.image}
        alt="thumnail"
        loading="lazy"
        className="rounded-t-md w-[full] h-[300px]"
      />
      <div className="flex flex-col gap-y-2 px-4 py-3 rounded p-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <p className="text-2xl text-blue-100 font-semibold">{course?.name}</p>
          <p className="text-xl text-blue-200">Level : {course?.level}</p>
          <p className="text-xl text-blue-200">{course?.description}</p>
        </div>
    </div>
  );
};

export default CourseCard;
