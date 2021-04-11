const path = require('path');

const express = require('express');
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');

const AWS = require('aws-sdk');

const { Post, Image, Comment, User } = require('../models');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read-write',
    bucket: 'animalphy-image-bucket',
    key(request, file, callback) {
      callback(
        null,
        `image/${Date.now()}_${request.hostname}_${path.basename(
          file.originalname,
        )}`,
      );
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
});

router.post('/image', upload.array('image'), (request, response) => {
  response.status(201).json({ url: request.files[0].location });
});

router.post('/', async (request, response, next) => {
  const { text, url, userId } = request.body;

  try {
    const { id } = await Post.create({
      content: text,
      userId: userId ? userId : null,
    });

    await Image.create({
      url: url,
      postId: id,
    });

    response.status(201).send('ok');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    const post = await Post.findOne({
      where: { id: id },
      include: [{ model: Image }, { model: User, attributes: ['name'] }],
    });

    response.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/comment', async (request, response, next) => {
  const { id } = request.params;

  try {
    const post = await Post.findOne({
      where: { id },
    });

    if (!post) {
      return response.status(404).send('존재하지 않는 게시글입니다.');
    }

    const { comment: content, userId } = request.body

    await Comment.create({
      content: content,
      postId: id,
      userId: userId ? userId : null,
    })

    response.status(201).send('ok');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/comments', async (request, response, next) => {
  const { id } = request.params;

  try {
    const post = await Post.findOne({
      where: { id },
    });

    if (!post) {
      return response.status(404).send('존재하지 않는 게시글입니다.');
    }

    const comments = await Comment.findAll({
      where: {
        postId: id,
      },
      include: [{ model: User, attributes: ['name'] }],
      limit: 10,
      order: [['created_at', 'DESC']],
    })
    response.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
