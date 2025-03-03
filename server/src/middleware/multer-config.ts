import multer, { StorageEngine, Multer } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload: Multer = multer({ storage: storage });

export default upload;
