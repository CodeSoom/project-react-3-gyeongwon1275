export const mockImages = [
  {
    id: 1,
    url: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/image/1617006711806_52.78.98.183_1616661133297_dog.gif',
    created_at: '2021-03-29T08:34:00.000Z',
    postId: 1,
  },
];

export const mockPost = {
  id: 1,
  content: '개사진 입니다.',
  created_at: '2021-03-29T08:34:00.000Z',
  userId: null,
  images: [
    {
      id: 1,
      url: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/image/1617006711806_52.78.98.183_1616661133297_dog.gif',
      created_at: '2021-03-29T08:34:00.000Z',
      postId: 2,
    },

  ],
};
