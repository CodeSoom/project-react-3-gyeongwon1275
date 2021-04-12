import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import given from 'given2';

import LoginButtonContainer from '../LoginButtonContainer';

import { mockUser } from '../../feature/mockData';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('LoginButtonContainer', () => {
  function renderLoginButtonContainer() {
    return render((
      <MemoryRouter>
        <LoginButtonContainer />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    useSelector.mockImplementationOnce((selector) => selector({
      user: {
        accessToken: given.accessToken,
        user: given.user,
      },
    }));
  });

  context('without accessToken', () => {
    it('renders Login Button and go to the login form by clicking a button', () => {
      given('accessToken', () => '');
      given('user', () => null);

      renderLoginButtonContainer();

      const loginButton = screen.getByRole('button', { name: 'Login' });
      expect(loginButton).toBeInTheDocument();

      fireEvent.click(loginButton);

      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  context('with accessToken', () => {
    it('renders ProfileButton', () => {
      given('accessToken', () => '1234');
      given('user', () => mockUser);

      renderLoginButtonContainer();

      const loginButton = screen.queryByRole('button', { name: 'Login' });
      expect(loginButton).not.toBeInTheDocument();

      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'user-profile' })).toBeInTheDocument();
    });
  });
});
