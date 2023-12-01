const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

    const db = mongoose.connection;
    db.on("error", (error) => {
        console.error("MongoDB connection error:");
        console.error(error);
        process.exit(1);
      });
    
      db.once("open", () => {
        console.log("Database Connected Successfully.");
      });

    // .then(() => console.log("Database Connected Successfully."))
    // .catch((error) => {
    //     console.log("Database connection error")
    //     console.error(error);
    //     console.log(error);
    //     process.exit(1);
    // })
};

module.exports = dbConnect;