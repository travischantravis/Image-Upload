const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

const app = express();
const port = 3000;
// const upload = multer({ dest: __dirname + "/uploads/images" });

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage
}).single("myImage");

// EJS
app.set("view engine", "ejs");

// Public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render("index", {
        msg: err
      });
    } else {
      console.log(req.file);
      res.send("test");
    }
  });
});

// app.post("/upload", upload.single("photo"), (req, res) => {
//   if (req.file) {
//     res.json(req.file);
//   } else throw "error";
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
