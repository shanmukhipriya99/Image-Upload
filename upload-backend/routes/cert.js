const connection = require("../database/db");
const express = require("express");
const timestamp = require("unix-timestamp");
const multer = require('multer');
const router = new express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + "-"+ file.originalname);  
    }
  });
  const upload = multer({storage: storage});

router.post('/cert', upload.single('image'), (req, res) => {
  let uploaded = "";
  if(req.file != undefined) {
    uploaded = req.file.path;
  }
  var image = {
    cert: uploaded,
    timestamp: timestamp.now()
  };
  if(image.image !== '') {
    let query = "INSERT INTO certificates SET ?";
    connection.query(query, image, (err, rows) => {
        if (err) {
            console.log(image);
            return res.status(500).json({ error: err });
            
        }
        return res
            .status(200)
            .send({ success: true, message: "Certificate successfully saved!" });
    });
  } else {
        return res.status(400).send({ success: false, message: "No image!" });
    }
  
});

module.exports = router;