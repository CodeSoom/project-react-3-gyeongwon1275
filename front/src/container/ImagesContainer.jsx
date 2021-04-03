import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../data/postReducer';

import Image from '../components/Image';

export default function ImagesContainer() {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadImages());
  }, []);

  if (!images.length) {
    return <div>loading...</div>;
  }

  return (
    <ul>
      {images.map(({ id, url, postId }) => (
        <li key={id}>
          <Image
            postId={postId}
            src={url}
          />
        </li>
      ))}
    </ul>
  );
}
