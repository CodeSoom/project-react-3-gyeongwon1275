const jdenticon = require('jdenticon');

const AWS = require('aws-sdk');

const Readable = require('stream').Readable;

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

async function getProfileImage (request, response, next) {

  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });

  const { userName } = request.body

  if (!userName) {
    return response.status(401).send('사용자 이름이 필요합니다.');
  }

  const profileImage = jdenticon.toPng(userName, 200);

  const fileStream = bufferToStream(profileImage);

  const fileName = `userProfile/${Date.now()}_${userName}`

  const uploadParams = { Bucket: 'animalphy-image-bucket', Key: fileName, Body: fileStream };

  const s3UploadPromise = () => new Promise((resolve, reject) => {
    s3.upload(uploadParams, function (error, data) {
      if (error) {
        return reject('s3 upload error');
      }
      resolve(data.Location)
    });
  })

  request.profileUrl = await s3UploadPromise()

  next();
}

module.exports = {
  getProfileImage,
};