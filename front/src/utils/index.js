import { formatDistanceToNow } from 'date-fns';
import koreanLocale from 'date-fns/locale/ko';

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const getTimeDifferenceToNow = (createdTime) => formatDistanceToNow(new Date(createdTime), {
  includeSeconds: true,
  addSuffix: true,
  locale: koreanLocale,
});
