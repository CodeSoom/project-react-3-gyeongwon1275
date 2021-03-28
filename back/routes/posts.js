const express = require('express');
const router = express.Router();

const { Post, Image } = require('../models');

router.get('/', async (request, response, next) => {
  try {
    const posts = await Post.findAll({
      include: Image,
    });

    response.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
