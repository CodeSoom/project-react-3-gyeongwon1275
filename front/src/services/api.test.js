import axios from 'axios';

import { postImage } from './api';

jest.mock('axios');

describe('api', () => {
  describe('postImage', () => {
    const imageUrl = 'fake-image-address';

    beforeEach(() => {
      const http = axios.create({ baseURL: 'animalphy' });
      http.post.mockImplementationOnce(() => Promise.resolve({ data: { url: imageUrl } }));
    });

    it('returns image url ', async () => {
      const formData = new FormData();
      formData.append('image', 'imageContent');

      const { url } = await postImage(formData);

      expect(url).toBe(imageUrl);
    });
  });
});
