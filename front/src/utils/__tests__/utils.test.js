import { formatDistanceToNow } from 'date-fns';
import koreanLocale from 'date-fns/locale/ko';

import { dataURLtoFile, getTimeDifferenceToNow } from '../index';

jest.mock('date-fns');

describe('utils', () => {
  describe('dataURLtoFile', () => {
    it('returns File', () => {
      const dataUrl = 'data:image/png;base64,abcdefg';
      const fileName = 'testfile';

      const file = dataURLtoFile(dataUrl, fileName);

      expect(file).not.toBeNull();
    });
  });

  describe('getTimeDifferenceToNow', () => {
    it('returns difference between current time and created time', () => {
      const createdTime = '2021-03-29T08:34:00.000Z';
      const option = {
        includeSeconds: true,
        addSuffix: true,
        locale: koreanLocale,
      };

      getTimeDifferenceToNow(createdTime);

      expect(formatDistanceToNow).toHaveBeenCalledWith(new Date(createdTime), option);
    });
  });
});
