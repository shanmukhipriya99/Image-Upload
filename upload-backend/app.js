//Importing packages
const express = require("express");
const cors = require("cors");
require("./database/db");

const app = express();
const port = process.env.PORT || 8080;

//Importing routes
const cert = require("./routes/cert");

//Importing middleware
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cert);

//Listening...
app.listen(port, () => {
    console.log("Serving on port " + port);
}); 
