const Post = require("../models/post");

exports.postCreate = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Post creation failed!"
      });
    });
};

exports.postUpdate = (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne(
    {
      _id: req.params.id,
      creator: req.userData.userId
    },
    post
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Update succesful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Post update failed!"
      });
    });
};

exports.postFetchAll = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        totalPosts: count
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.postFetchOne = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found!"
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.postDelete = (req, res) => {
  Post.deleteOne({
    _id: req.params.id,
    creator: req.userData.userId
  })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion succesful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Deleting post failed!"
      });
    });
};
