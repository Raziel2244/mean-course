const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkMime = require("../middleware/check-mime");
const PostController = require("../controllers/posts");

router.post("", checkAuth, checkMime, PostController.postCreate);

router.put("/:id", checkAuth, checkMime, PostController.postUpdate);

router.get("", PostController.postFetchAll);

router.get("/:id", PostController.postFetchOne);

router.delete("/:id", checkAuth, PostController.postDelete);

module.exports = router;
