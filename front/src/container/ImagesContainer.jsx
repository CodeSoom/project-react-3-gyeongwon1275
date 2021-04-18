import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';

import { loadImages, loadImagesMore, setViewMoreButtonVisible } from '../data/postReducer';

import Image from '../components/Image';
import ViewMoreButton from '../components/ViewMoreButton';

const ImageWrapper = styled.ul({

  display: 'flex',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',

  '@media (min-width: 768px)': {

    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

});

export default function ImagesContainer() {
  const dispatch = useDispatch();
  const { images, viewMoreButtonVisible } = useSelector((state) => state.post);

  const history = useHistory();

  useEffect(() => {
    dispatch(loadImages());

    const onScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

      const hasTotallyScrolled = scrollHeight === clientHeight + scrollTop;

      if (!hasTotallyScrolled) {
        return;
      }

      if (hasTotallyScrolled) {
        dispatch(setViewMoreButtonVisible(true));
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [dispatch]);

  if (!images.length) {
    return <div>loading...</div>;
  }

  const handleClickViewMore = () => {
    const lastId = images[images.length - 1].id;

    dispatch(loadImagesMore(lastId));
    dispatch(setViewMoreButtonVisible(false));
  };

  const handleClickImage = (postId) => {
    history.push(`post/${postId}`);
  };

  return (
    <>
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
      <ViewMoreButton
        viewMoreButtonVisible={viewMoreButtonVisible}
        onClick={handleClickViewMore}
      />
    </>
  );
}
