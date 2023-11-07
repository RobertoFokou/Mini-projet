const path = require("path");

const multer = require("multer");

var storage = multer.diskStorage({
  // destination: "./uploads",
  destination: function (res, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // console.log(file);
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      callback(null, true);
    } else {
      console.log("le format d'image est incorrex=ct");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
module.exports = upload;