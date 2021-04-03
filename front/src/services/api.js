import axios from 'axios';

const baseURL = process.env.BASEURL;

const http = axios.create({ baseURL });

export const postImage = async (image) => {
  const { data } = await http.post('/post/image', image);
  return data;
};

export const sendPost = ({ text, url }) => http.post('/post', { text, url });

export const getImages = async () => {
  const { data } = await http.get('/images');
  return data;
};
