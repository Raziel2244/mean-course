const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images");
  },
  filename: (_req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

const PostController = require("../controllers/posts");

router.post(
  "",
  checkAuth,
  multer({
    storage: storage
  }).single("image"),
  PostController.postCreate
);

router.put(
  "/:id",
  checkAuth,
  multer({
    storage: storage
  }).single("image"),
  PostController.postUpdate
);

router.get("", PostController.postFetchAll);

router.get("/:id", PostController.postFetchOne);

router.delete("/:id", checkAuth, PostController.postDelete);

module.exports = router;
