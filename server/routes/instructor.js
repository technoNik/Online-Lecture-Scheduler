const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

router.get('/getInstructors', async (req, res) => {
    try {
      const instructors = await Instructor.find();
      res.json({
        success : true,
        instructors
      });
    } catch (error) {
      res.status(500).json({ 
        success :  false,
        message: error.message 
      });
    }
  });
  
  router.post('/addInstructor', async (req, res) => {
    const { name } = req.body;
  
    try {
      const newInstructor = new Instructor({ name });
      const savedInstructor = await newInstructor.save();
      res.status(201).json({
        success : true,
        instructor : savedInstructor
      });
    } catch (error) {
      res.status(400).json({
        success : false,
        message: error.message 
      });
    }
  });

  router.post('/getInstructorDetails', async (req, res) => {
    const { instructorId ,name} = req.body;
    console.log(name)
  
    try {
      const instructor = await Instructor.findOne({name : name}).populate("lectures").exec();
      if(!instructor){
        return res.status(404).json({
          success : false,
          message : "User not found"
        })
      }
      res.status(201).json({
        success : true,
        instructor : instructor
      });
    } catch (error) {
      res.status(400).json({
        success : false,
        message: error.message 
      });
    }
  });

module.exports = router;
