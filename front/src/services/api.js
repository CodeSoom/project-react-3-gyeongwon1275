import axios from 'axios';

const baseURL = 'http://localhost:8080';

const http = axios.create({ baseURL });

export const postImage = async (image) => {
  const { data } = await http.post('/post/image', image);

  return data;
};

export const sendPost = ({ text, url }) => http.post('/post', { text, url });
