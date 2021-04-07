import React from 'react';

import { render, screen } from '@testing-library/react';

import PostDetail from '../PostDetail';

import { mockComment, mockPost } from '../../feature/mockData';

import { getTimeDifferenceToNow } from '../../utils';

jest.mock('../../utils');

describe('PostDetail', () => {
  const { content, images } = mockPost;

  beforeEach(() => {
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

    getTimeDifferenceToNow.mockImplementationOnce(() => '3일 전');
  });

  it('renders PostDetail', () => {
    render((
      <PostDetail
        post={mockPost}
        comments={[mockComment]}
        commentBoxOpen
      />
    ));

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText('3일 전')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'post-image' })).toHaveAttribute('src', images[0].url);

    expect(screen.getByText('글을 게시하려면 Enter 키를 누르세요.')).toBeInTheDocument();
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
  });
});
