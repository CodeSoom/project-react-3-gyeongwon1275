import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import PostDetailContainer from '../PostDetailContainer';

import { mockPost } from '../../feature/mockData';

describe('PostDetailContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      post: {
        post: given.post,
      },
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  context('without post', () => {
    it('renders loading...', () => {
      given('post', () => null);

      render(<PostDetailContainer postId={5} />);

      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('with post', () => {
    it('renders PostDetail componnet', () => {
      given('post', () => mockPost);

      render(<PostDetailContainer postId={5} />);

      expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    });
  });
});
