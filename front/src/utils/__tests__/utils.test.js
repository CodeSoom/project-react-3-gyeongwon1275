import dataURLtoFile from '../index';

describe('dataURLtoFile', () => {
  it('returns File', () => {
    const dataUrl = 'data:image/png;base64,abcdefg';
    const fileName = 'testfile';

    const file = dataURLtoFile(dataUrl, fileName);

    expect(file).not.toBeNull();
  });
});
