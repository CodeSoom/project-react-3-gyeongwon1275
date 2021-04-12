import React from 'react';

import { render, screen } from '@testing-library/react';

import ProfileButton from '../ProfileButton';

import { mockUser } from '../../feature/mockData';

describe('ProfileButton', () => {
  context('with user ', () => {
    it('renders profile image, user name', () => {
      render(<ProfileButton user={mockUser} />);

      expect(screen.getByRole('img', { name: 'user-profile' })).toBeInTheDocument();
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });

  context('without user ', () => {
    it("doesn't render profile image, user name", () => {
      render(<ProfileButton user={null} />);

      expect(screen.queryByRole('img', { name: 'user-profile' })).not.toBeInTheDocument();
      expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    });
  });
});
