import React from 'react';

import { render, screen } from '@testing-library/react';

import { setMatchMediaMock } from '../../../__mocks__/matchMedia';

import Comments from '../Comments';

import { mockComment, mockUser } from '../../feature/mockData';

describe('Comments', () => {
  beforeEach(() => {
    setMatchMediaMock();
  });

  context('with comments', () => {
    it('render Comment ', () => {
      render((<Comments comments={[mockComment]} />));

      expect(screen.getByText(mockComment.content)).toBeInTheDocument();
    });
  });

  context('with user', () => {
    it('render user name for comment author', () => {
      render((
        <Comments
          comments={[{
            id: 1,
            content: '댓글',
            created_at: '2021-03-29T08:34:00.000Z',
            userId: 4,
            postId: 6,
            user: mockUser,
          }]}
        />));

      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });

  context('without user', () => {
    it('render "아무개" for comment author', () => {
      render((
        <Comments
          comments={[{
            id: 1,
            content: '댓글',
            created_at: '2021-03-29T08:34:00.000Z',
            userId: 4,
            postId: 6,
            user: null,
          }]}
        />));

      expect(screen.getByText('아무개')).toBeInTheDocument();
    });
  });

  context('without comments', () => {
    it("doesn't render", () => {
      render((<Comments comments={[]} />));

      expect(screen.queryByText(mockComment.content)).not.toBeInTheDocument();
    });
  });
});
