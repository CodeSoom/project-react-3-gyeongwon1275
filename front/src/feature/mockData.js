export const mockImages = [
  {
    id: 1,
    url: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/image/1617006711806_52.78.98.183_1616661133297_dog.gif',
    created_at: '2021-03-29T08:34:00.000Z',
    postId: 1,
  },
];

export const mockPost = {
  id: 21,
  content: '꼬북이',
  created_at: '2021-04-18T03:52:50.000Z',
  userId: null,
  NonMemberId: 1,
  images: [
    {
      id: 19,
      url: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/image/1618717970558_localhost_%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3%20%281%29.jpeg',
      created_at: '2021-04-18T03:52:50.000Z',
      postId: 21,
    },
  ],
  user: {
    name: '김붕어',
    profileUrl: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/user/1618141058248_%EA%B9%80%EA%B2%BD%EC%9B%90',
  },
  nonMember: {
    name: '🐧 조롱이',
    profileUrl: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/userProfile/1618730622416_%F0%9F%90%A7%20%EC%A1%B0%EB%A1%B1%EC%9D%B4',
  },
};

export const mockComment = {
  id: 2,
  content: '댓글!',
  created_at: '2021-04-06T09:56:52.000Z',
  userId: null,
  postId: 6,
  nonMemberId: 1,
  user: {
    name: '김숭어',
    profileUrl: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/user/1618141058248_%EA%B9%80%EA%B2%BD%EC%9B%90',
  },
  nonMember: {
    name: '🐧 조롱이',
    profileUrl: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/userProfile/1618730622416_%F0%9F%90%A7%20%EC%A1%B0%EB%A1%B1%EC%9D%B4',
  },
};

export const mockSignUpFormValues = {
  userId: 'rud123',
  password: '123',
  passwordConfirm: '123',
  userName: '김붕어',
  email: 'rud123@naver.com',
  phone: '01012345678',
};

export const mockLoginFormValues = {
  userId: 'rud123',
  password: '123',
};

export const mockUser = {
  id: 3,
  user_id: 'rud285',
  name: '김붕어',
  phone: '01086901275',
  created_at: '2021-03-29T08:34:00.000Z',
  profileUrl: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/user/1618141058248_%EA%B9%80%EA%B2%BD%EC%9B%90',
};

export const mockNonMember = {
  id: 5,
  name: '🐧 나무발발이',
  profileUrl: 'https://animalphy-image-bucket.s3.ap-northeast-2.amazonaws.com/userProfile/1618733829117_%F0%9F%90%A7%20%EB%82%98%EB%AC%B4%EB%B0%9C%EB%B0%9C%EC%9D%B4',
};
