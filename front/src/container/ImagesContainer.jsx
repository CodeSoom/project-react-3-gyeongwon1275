import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { loadImages } from '../data/postReducer';

import Image from '../components/Image';

export default function ImagesContainer() {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.post);

  const history = useHistory();

  useEffect(() => {
    dispatch(loadImages());
  }, [dispatch]);

  if (!images.length) {
    return <div>loading...</div>;
  }

  const handleClickImage = (postId) => {
    history.push(`post/${postId}`);
  };

  return (
    <ul>
      {images.map(({ id, url, postId }) => (
        <li key={id}>
          <Image
            postId={postId}
            src={url}
            onClick={handleClickImage}
          />
        </li>
      ))}
    </ul>
  );
}
