import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';
import { loadImages } from '../data/postReducer';

import Image from '../components/Image';

const ImageWrapper = styled.ul({

  display: 'flex',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',

  '@media (min-width: 768px)': {

    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

});

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
    <ImageWrapper>
      {images.map(({ id, url, postId }) => (
        <li key={id}>
          <Image
            postId={postId}
            src={url}
            onClick={handleClickImage}
          />
        </li>
      ))}
    </ImageWrapper>
  );
}
