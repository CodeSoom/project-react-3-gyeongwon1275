const express = require('express');
const router = express.Router();

const { Post, Image } = require('../models');

router.get('/', async (request, response, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
      include: [{ model: Image,
        attributes: ['url'],
      }],
    });

    response.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
