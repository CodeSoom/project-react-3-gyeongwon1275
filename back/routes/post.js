const express = require('express');
const router = express.Router();

const { Post, Image, Comment, User, NonMember } = require('../models');

const { upload } = require('../middleWares/imageUpload');


router.post('/image', upload.array('image'), (request, response) => {
  response.status(201).json({ url: request.files[0].location });
});

router.post('/', async (request, response, next) => {
  const { text, url, userId, nonMemberId } = request.body;

  try {
    const { id } = await Post.create({
      content: text,
      userId: userId ? userId : null,
      nonMemberId: nonMemberId ? nonMemberId : null,
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
      include: [
        { model: Image },
        { model: User, attributes: ['name', 'profileUrl'] },
        { model: NonMember, attributes: ['name', 'profileUrl'] },
      ],
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

    const { comment: content, userId, nonMemberId } = request.body

    await Comment.create({
      content: content,
      postId: id,
      userId: userId ? userId : null,
      nonMemberId: nonMemberId ? nonMemberId : null,
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
      include: [
        { model: User, attributes: ['name', 'profileUrl'] },
        { model: NonMember, attributes: ['name', 'profileUrl'] },
      ],
      limit: 10,
      order: [['created_at', 'DESC']],
    })
    response.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
