const get = jest.fn();
const post = jest.fn();

const axios = {
  create({ baseURL }) {
    return {
      baseURL,
      get,
      post,
    };
  },
};

export default axios;
