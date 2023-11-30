const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload")
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload ({
  useTempFiles : true,
  tempFileDir : "/tmp/"
}))

// MongoDB connection
const dbConnect = require("./config/database");
dbConnect();

// Cloudinary connection
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();
// mongoose.connect('mongodb://localhost:27017/lecture-scheduling', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const instructorRoutes = require('./routes/instructor');
const courseRoutes = require('./routes/course');
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
