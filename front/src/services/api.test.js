import axios from 'axios';

import {
  getImages,
  postImage,
  sendPost,
} from './api';

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
    const mockImage = {
      id: 1, url: 'http://dog.com/dog1.gif', created_at: '2021-03-29T08:34:00.000Z', postId: 3,
    };

    beforeEach(() => {
      http.get.mockImplementationOnce(() => Promise.resolve({ data: { images: [mockImage] } }));
    });

    it('returns images when request success', async () => {
      const { images } = await getImages();

      expect(images[0]).toMatchObject(mockImage);
    });
  });
});
