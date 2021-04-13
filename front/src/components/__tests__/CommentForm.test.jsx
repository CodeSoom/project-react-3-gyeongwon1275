import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { setMatchMediaMock } from '../../../__mocks__/matchMedia';

import CommentForm from '../CommentForm';

describe('CommentForm', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
    onSubmit.mockClear();

    setMatchMediaMock();
    render((
      <CommentForm
        comment="test"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    ));
  });

  it('listens change events ', () => {
    const input = screen.getByLabelText('comment-input');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '댓글' } });

    expect(onChange).toHaveBeenCalledWith('댓글');
  });

  it('listens submit events ', () => {
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalled();
  });
});
