import axios from 'axios';

import { getPosts, postImage, sendPost } from './api';

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

  describe('getPosts', () => {
    const mockPost = { id: 1, text: 'dog', url: 'http://dog.com/dog1.gif' };

    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: { posts: [mockPost] } }));
    });

    it('returns "ok" when request success', async () => {
      const { posts } = await getPosts();

      expect(posts[0]).toMatchObject(mockPost);
    });
  });
});
