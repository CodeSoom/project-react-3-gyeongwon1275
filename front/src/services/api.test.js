import axios from 'axios';

import {
  getComments,
  getImages,
  getPost,
  postImage,
  postSignUp,
  postLogin,
  sendComment,
  sendPost,
  getUser,
  getNonMember,
} from './api';

import {
  mockComment,
  mockImages,
  mockPost,
  mockSignUpFormValues,
  mockLoginFormValues,
} from '../feature/mockData';

jest.mock('axios');

const http = axios.create({ baseURL: 'animalphy' });

describe('api', () => {
  describe('postImage', () => {
    const imageUrl = 'fake-image-address';

    beforeEach(() => {
      http.post.mockImplementationOnce(() => Promise.resolve({ data: { url: imageUrl } }));
    });

    it('returns image url ', async () => {
      const formData = new FormData();
      formData.append('image', 'imageContent');

      const { url } = await postImage(formData);

      expect(url).toBe(imageUrl);
    });
  });

  describe('sendPost', () => {
    beforeEach(() => {
      http.post.mockImplementationOnce(() => Promise.resolve({ data: 'ok' }));
    });

    it('returns "ok" when request success', async () => {
      const { data } = await sendPost({ text: 'dog', url: 'http://dog.com/dog1.gif', userId: 3 });

      expect(data).toBe('ok');
    });
  });

  describe('getImages', () => {
    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: { images: mockImages } }));
    });

    it('returns images when request success', async () => {
      const { images } = await getImages(3);

      expect(images[0]).toMatchObject(mockImages[0]);
    });
  });

  describe('getPost', () => {
    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: mockPost }));
    });

    it('returns post detail', async () => {
      const data = await getPost(2);

      expect(data).toMatchObject(mockPost);
    });
  });

  describe('sendComment', () => {
    beforeEach(() => {
      http.post.mockImplementationOnce(() => Promise.resolve({ data: 'ok' }));
    });

    it('returns "ok" when request success', async () => {
      const { data } = await sendComment({ postId: 1, comment: '댓글입니다.', userId: 3 });

      expect(data).toBe('ok');
    });
  });

  describe('getComments', () => {
    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: [mockComment] }));
    });

    it('returns images when request success', async () => {
      const data = await getComments();

      expect(data[0]).toMatchObject(mockComment);
    });
  });

  describe('postSignUp', () => {
    beforeEach(() => {
      http.post.mockImplementationOnce(() => Promise.resolve({ data: 'ok' }));
    });

    it('returns "ok" when request success', async () => {
      const { data } = await postSignUp(mockSignUpFormValues);

      expect(data).toBe('ok');
    });
  });

  describe('postLogin', () => {
    beforeEach(() => {
      http.post.mockImplementationOnce(() => Promise.resolve({ data: { accessToken: '1234' } }));
    });

    it('returns accessToken when request success', async () => {
      const { accessToken } = await postLogin(mockLoginFormValues);

      expect(accessToken).toBe('1234');
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: { } }));
    });

    it('returns user info when request success', async () => {
      const user = await getUser('1234');

      expect(user).toEqual({});
    });
  });

  describe('getNonMember', () => {
    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: { } }));
    });

    it('returns non member info when request success', async () => {
      const nonMember = await getNonMember();

      expect(nonMember).toEqual({});
    });
  });
});
