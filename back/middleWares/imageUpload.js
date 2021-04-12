const path = require('path');

const multer = require('multer');
const multerS3 = require('multer-s3');

const AWS = require('aws-sdk');

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

module.exports = { upload }