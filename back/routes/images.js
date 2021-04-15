const express = require('express');

const { Op } = require('sequelize');

const router = express.Router();

const { Image } = require('../models');

router.get('/', async (request, response, next) => {

  try {
    const lastId = parseInt(request.query.lastId, 10)

    const where = lastId ? { id: { [Op.lt]: lastId } } : null

    const images = await Image.findAll({
      limit: 10,
      where,
      order: [['created_at', 'DESC']],
    });

    response.status(200).json(images);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
