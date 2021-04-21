import React from 'react';

import { render, screen } from '@testing-library/react';

import { setMatchMediaMock } from '../../../__mocks__/matchMedia';

import Comments from '../Comments';

import { mockComment } from '../../feature/mockData';

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
    it('render comment author name, profile image with user', () => {
      render((
        <Comments
          comments={[{
            ...mockComment,
            nonMember: null,
          }]}
        />));

      expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', mockComment.user.profileUrl);
    });
  });

  context('without user', () => {
    it('render comment author name, profile image with nonMember', () => {
      render((
        <Comments
          comments={[{
            ...mockComment,
            user: null,
          }]}
        />));

      expect(screen.getByText(mockComment.nonMember.name)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', mockComment.nonMember.profileUrl);
    });
  });

  context('without comments', () => {
    it("doesn't render", () => {
      render((<Comments comments={[]} />));

      expect(screen.queryByText(mockComment.content)).not.toBeInTheDocument();
    });
  });
});
