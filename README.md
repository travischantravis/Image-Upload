# Image Upload

Express.js

- put `css` and `js` in public folder

Dependencies

- Express
- Multer: image upload
  - Size limit: 1MB
  - File filter: check extension and mime type
  - Change filename to name + timestamp
- ejs: template engine

  - `app.set("view engine", "ejs");`

- Materialize: Require jQuery!
  - Form: file input

Folders:

- public
  - uploads
    - images
- views
  - index.ejs

```javascript
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
```

Thanks to [YouTube](https://www.youtube.com/watch?v=9Qzmri1WaaE)
