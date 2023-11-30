const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  lectureName : {
    type : String,
    required : true
  },
  date: { 
    type: Date, 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Instructor', 
    required: true 
  },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
