const express = require('express');

const router = express.Router();

const { NonMember } = require('../models');

const { getProfileImage } = require('../middleWares/getProfileImage');

const { getAnimalName } = require('../middleWares/getAnimalName');

router.get('/', getAnimalName, getProfileImage, async (request, response, next) => {
  try {
    const { id, name, profileUrl } = await NonMember.create({
      name: request.body.userName,
      profileUrl: request.profileUrl,
    });

    response.status(201).json({ id, name, profileUrl });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
