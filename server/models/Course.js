
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  level: {
    type : String
  },
  description: {
    type : String
  },
  image: {
    type : String
  },
  
  lectures : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Lecture"
    }
  ]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
