const express = require('express');
const router = express.Router();

const { Image } = require('../models');

router.get('/', async (request, response, next) => {
  try {
    const images = await Image.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
    });

    response.status(200).json(images);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
