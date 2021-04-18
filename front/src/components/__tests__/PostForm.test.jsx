import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import PostForm from '../PostForm';
import { mockImages } from '../../feature/mockData';

describe('PostForm', () => {
  const onClose = jest.fn();
  const onClick = jest.fn();
  const onChangeText = jest.fn();
  const onChangeImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders post upload form', () => {
    render((
      <PostForm
        onClose={onClose}
        onChangeImage={onChangeImage}
        onChangeText={onChangeText}
        onClick={onClick}
        text="개사진"
        image={mockImages[0].url}
        formVisible
      />));

    expect(screen.getByText('짤 올리기')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '올리기' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();

    const textInput = screen.getByPlaceholderText('xxx님 어떤 짤인가요?');
    expect(textInput).toBeInTheDocument();
    expect(textInput.value).toBe('개사진');

    expect(screen.getByRole('button', { name: 'file-image' })).toBeInTheDocument();
  });

  it('listens close, changeText, changeImage, click event ', () => {
    render((
      <PostForm
        onClose={onClose}
        onChangeImage={onChangeImage}
        onChangeText={onChangeText}
        onClick={onClick}
        text="개사진"
        image={mockImages[0].url}
        formVisible
      />));

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();

    const textInput = screen.getByPlaceholderText('xxx님 어떤 짤인가요?');
    fireEvent.change(textInput, { target: { value: '고양이' } });
    expect(onChangeText).toHaveBeenCalled();

    const imageInput = screen.getByTestId('image-file-input');
    fireEvent.change(imageInput, { target: { files: ['고양이'] } });
    expect(onChangeImage).toHaveBeenCalled();

    const submitButton = screen.getByRole('button', { name: '올리기' });
    fireEvent.click(submitButton);
    expect(onClick).toHaveBeenCalled();
  });
});
