import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import PostFormContainer from '../PostFormContainer';

describe('PostFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: { formVisible: given.formVisible },
    }));
  });

  context('when post modal is opened', () => {
    it('renders PostForm', () => {
      given('formVisible', () => true);

      render(<PostFormContainer />);

      expect(screen.getByRole('heading', { name: '짤 올리기' })).toBeInTheDocument();
    });
  });

  context('when post modal is closed', () => {
    it('doesn`t render PostForm', () => {
      given('formVisible', () => false);

      render(<PostFormContainer />);

      expect(screen.queryByRole('heading', { name: '짤 올리기' })).toBeNull();
    });
  });
});
