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

  context('without comments', () => {
    it("doesn't render", () => {
      render((<Comments comments={[]} />));

      expect(screen.queryByText(mockComment.content)).not.toBeInTheDocument();
    });
  });
});
