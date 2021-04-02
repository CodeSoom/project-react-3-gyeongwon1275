import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { loadPosts } from '../data/postReducer';

export default function PostsContainer() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  if (!posts.length) {
    return <div>loading...</div>;
  }

  return (
    <ul>
      {posts.map(({ id, images }) => (
        <li key={id}>
          <Post
            src={images[0].url}
          />
        </li>
      ))}
    </ul>
  );
}
