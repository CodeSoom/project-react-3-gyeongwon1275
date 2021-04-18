import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import PostFormContainer from '../PostFormContainer';

import { setPostText } from '../../data/postReducer';

describe('PostFormContainer', () => {
  const dispatch = jest.fn();

  const readAsDataURL = jest.spyOn(FileReader.prototype, 'readAsDataURL');

  const addEventListener = jest.spyOn(FileReader.prototype, 'addEventListener');

  beforeEach(() => {
    dispatch.mockClear();
    readAsDataURL.mockClear();
    addEventListener.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    given('formVisible', () => true);
    useSelector.mockImplementation((selector) => selector({
      post: {
        formVisible: given.formVisible,
        imageFile: { readerResult: '', name: '' },
        text: '개사진입니다.',
        error: '',
        posts: [],
      },
    }));
  });

  context('when post modal is opened', () => {
    it('renders PostForm', () => {
      given('formVisible', () => true);

      render(<PostFormContainer />);

      expect(screen.getByRole('heading', { name: '짤 올리기' })).toBeInTheDocument();
      expect(screen.getByRole('textbox').value).toBe('개사진입니다.');
    });
  });

  context('when post modal is closed', () => {
    it('doesn`t render PostForm', () => {
      given('formVisible', () => false);

      render(<PostFormContainer />);

      expect(screen.queryByRole('heading', { name: '짤 올리기' })).toBeNull();
    });
  });

  it('uploads image file', () => {
    render(<PostFormContainer />);

    const imageFileInput = screen.getByTestId('image-file-input');

    const imageFile = new Blob();

    fireEvent.change(imageFileInput, { target: { files: [imageFile] } });

    expect(readAsDataURL).toHaveBeenCalledWith(imageFile);

    fireEvent.load(imageFileInput);

    expect(addEventListener).toHaveBeenCalled();
  });

  it('inputs post content text', () => {
    render(<PostFormContainer />);

    const textArea = screen.getByRole('textbox');

    expect(textArea).toBeInTheDocument();

    fireEvent.change(textArea, { target: { value: '강아지' } });

    expect(dispatch).toHaveBeenCalledWith(setPostText('강아지'));
  });

  it('sends post', () => {
    render(<PostFormContainer />);

    const button = screen.getByRole('button', { name: '올리기' });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
