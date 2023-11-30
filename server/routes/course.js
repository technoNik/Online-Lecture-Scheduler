const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const cloudinary = require("cloudinary").v2;
const Lecture = require("../models/Lecture");
const Instructor = require("../models/Instructor");

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

router.get("/getCourses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/addCourse", async (req, res) => {
  const { name, level, description } = req.body;

  const { image } = req.files;

  try {
    const thumbnailImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      300,
      85
    );
    const newCourse = new Course({
      name,
      level,
      description,
      image: thumbnailImage.secure_url,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json({
      success: true,
      data: savedCourse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/addLecture", async (req, res) => {
  const { lectureName, date, instructor, course } = req.body;
  console.log(lectureName, date, instructor, course);

  try {
    const existingLecture = await Lecture.findOne({
      instructor: instructor,
      date: date,
    });
    if (existingLecture) {
      return res.status(400).json({
        success: false,
        message: 'Instructor is already assigned a lecture on the specified date.',
      });
    }
    const newLecture = new Lecture({ lectureName, date, instructor, course });

    const savedLecture = await newLecture.save();

    const updatedCourse = await Course.findByIdAndUpdate(
      course,
      { $push: { lectures: savedLecture._id } },
      { new: true }
    )
      .populate("lectures")
      .exec();
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructor,
      { $push: { lectures: savedLecture._id } },
      { new: true }
    ).populate("lectures");

    res.status(201).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/getCourseDetails", async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log(courseId);
    const course = await Course.findById(courseId);
    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});


module.exports = router;
