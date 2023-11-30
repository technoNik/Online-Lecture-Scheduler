const mongoose = require('mongoose');
const Lecture = require('./Lecture');

const instructorSchema = new mongoose.Schema({
  name: {
    type : String
  },
  lectures : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Lecture"
    }
  ]
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
