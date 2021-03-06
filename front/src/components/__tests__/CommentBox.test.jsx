import React from 'react';

import {
  render, screen,
} from '@testing-library/react';

import { setMatchMediaMock } from '../../../__mocks__/matchMedia';

import CommentBox from '../CommentBox';

import { mockComment, mockUser } from '../../feature/mockData';

describe('CommentBox', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    setMatchMediaMock();

    onChange.mockClear();
    onSubmit.mockClear();
  });

  context('with commentBoxOpen', () => {
    it('renders comment, comment form', () => {
      render(<CommentBox
        commentBoxOpen
        comment="댓글"
        profileUrl={mockUser.profileUrl}
        comments={[mockComment]}
        onChange={onChange}
        onSubmit={onSubmit}
      />);

      expect(screen.getByText(mockComment.content)).toBeInTheDocument();

      const input = screen.getByLabelText('comment-input');
      expect(input.value).toBe('댓글');

      const commentFormProfileImage = screen.getByRole('img', { name: 'comment-form-profile' });

      expect(commentFormProfileImage).toBeInTheDocument();
      expect(commentFormProfileImage).toHaveAttribute('src', mockUser.profileUrl);
    });
  });

  context('without commentBoxOpen', () => {
    it("doesn't render comment, comment form", () => {
      render(<CommentBox
        commentBoxOpen={false}
        comment="댓글"
        profileUrl={mockUser.profileUrl}
        comments={[mockComment]}
        onChange={onChange}
        onSubmit={onSubmit}
      />);

      expect(screen.queryByText(mockComment.content)).not.toBeInTheDocument();

      expect(screen.queryByLabelText('comment-input')).not.toBeInTheDocument();
    });
  });
});
