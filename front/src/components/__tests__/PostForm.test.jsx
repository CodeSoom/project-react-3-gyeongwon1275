import React from 'react';

import { render, screen } from '@testing-library/react';

import PostForm from '../PostForm';

describe('PostForm', () => {
  it('renders post upload form', () => {
    render(<PostForm formVisible />);

    expect(screen.getByText('짤 올리기')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '올리기' })).toBeInTheDocument();

    const textInput = screen.getByPlaceholderText('xxx님 어떤 짤인가요?');
    expect(textInput).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'file-image' })).toBeInTheDocument();
  });
});
