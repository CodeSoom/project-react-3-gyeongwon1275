import axios from 'axios';

const baseURL = process.env.BASEURL;

const http = axios.create({ baseURL });

export const postImage = async (image) => {
  const { data } = await http.post('/post/image', image);
  return data;
};

export const sendPost = ({ text, url, userId }) => http.post('/post', { text, url, userId });

export const getImages = async (lastId = 0) => {
  const { data } = await http.get(`/images?lastId=${lastId}`);
  return data;
};

export const getPost = async (postId) => {
  const { data } = await http.get(`/post/${postId}`);
  return data;
};

export const sendComment = ({ postId, comment, userId }) => http.post(`/post/${postId}/comment`, { comment, userId });

export const getComments = async (postId) => {
  const { data } = await http.get(`/post/${postId}/comments`);
  return data;
};

export const postSignUp = (formValues) => http.post('/user/signup', formValues);

export const postLogin = async (formValues) => {
  const { data } = await http.post('/user/login', formValues);
  return data;
};

export const getUser = async (accessToken) => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const { data } = await http.get('/user', options);

  return data;
};
