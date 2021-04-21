import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import PostDetailContainer from '../PostDetailContainer';

import {
  mockComment, mockNonMember, mockPost, mockUser,
} from '../../feature/mockData';

import { setMatchMediaMock } from '../../../__mocks__/matchMedia';

import { setComment, setCommentBoxOpen } from '../../data/postReducer';

describe('PostDetailContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      post: {
        post: given.post,
        commentBoxOpen: given.commentBoxOpen,
        comment: given.comment,
        comments: [mockComment],
      },
      user: {
        user: mockUser,
        nonMember: mockNonMember,
      },
    }));

    setMatchMediaMock();
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

    it('opens comment box', () => {
      given('post', () => mockPost);
      given('commentBoxOpen', () => false);

      render(<PostDetailContainer postId={5} />);

      const commentButton = screen.getByRole('button', { name: 'comment' });

      expect(commentButton).toBeInTheDocument();

      fireEvent.click(commentButton);
      expect(dispatch).toHaveBeenCalledWith(setCommentBoxOpen());
    });
  });

  context('when commentBox not opened', () => {
    it('renders nothing', () => {
      given('post', () => mockPost);
      given('commentBoxOpen', () => false);

      render(<PostDetailContainer postId={5} />);

      expect(screen.queryByText('글을 게시하려면 Enter 키를 누르세요.')).not.toBeInTheDocument();
    });
  });

  context('when commentBox opened', () => {
    it('renders comment box', () => {
      given('post', () => mockPost);
      given('commentBoxOpen', () => true);

      render(<PostDetailContainer postId={5} />);

      expect(screen.getByText('글을 게시하려면 Enter 키를 누르세요.')).toBeInTheDocument();
      expect(screen.getByText(mockComment.content)).toBeInTheDocument();

      const commentFormProfile = screen.getByRole('img', { name: 'comment-form-profile' });

      expect(commentFormProfile).toHaveAttribute('src', mockUser.profileUrl);
    });

    it('changes comment', () => {
      given('post', () => mockPost);
      given('commentBoxOpen', () => true);
      given('comment', () => '');

      render(<PostDetailContainer postId={5} />);

      const input = screen.getByLabelText('comment-input');
      expect(input).toBeInTheDocument();

      fireEvent.change(input, { target: { value: '댓글' } });
      expect(dispatch).toHaveBeenCalledWith(setComment('댓글'));
    });

    it('submits comment', () => {
      given('post', () => mockPost);
      given('commentBoxOpen', () => true);
      given('comment', () => '댓글');

      render(<PostDetailContainer postId={5} />);

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      fireEvent.submit(form);
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
