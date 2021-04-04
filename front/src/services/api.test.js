import axios from 'axios';

import {
  getImages,
  getPost,
  postImage,
  sendPost,
} from './api';

import { mockImages, mockPost } from '../feature/mockData';

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
      const { data } = await sendPost({ text: 'dog', url: 'http://dog.com/dog1.gif' });

      expect(data).toBe('ok');
    });
  });

  describe('getImages', () => {
    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: { images: mockImages } }));
    });

    it('returns images when request success', async () => {
      const { images } = await getImages();

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
});
