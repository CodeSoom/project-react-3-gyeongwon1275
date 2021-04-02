import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import PostsContainer from '../PostsContainer';

import mockPosts from '../../feature/mockData';

describe('PostsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      post: {
        posts: given.posts,
      },
    }));
  });

  context('without posts', () => {
    it('renders text "loading..."', () => {
      given('posts', () => []);
      render(<PostsContainer />);
      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('with posts', () => {
    it('renders Posts with image', () => {
      given('posts', () => mockPosts);
      render(<PostsContainer />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
