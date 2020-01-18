const express = require("express");
const multer = require("multer");
const router = express.Router();
const GridFsStorage = require("multer-gridfs-storage");
const Image = require("../models/Image");
require("dotenv/config");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./uploads1/");
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   cb(null, false);
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   }
// });

const storage = new GridFsStorage({
  url: process.env.DB_CONNECTION,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  res.render("image");
});
router.post("/upload", upload.single("myImage"), (req, res, err) => {
  if (err) throw err;
  console.log("Success post");
  console.log(req.file);
  res.status(201).send();
});

module.exports = router;
