import React from 'react';

import { useDispatch } from 'react-redux';

import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import styled from '@emotion/styled';

import { setFormVisible } from '../data/postReducer';

import PostFormContainer from '../container/PostFormContainer';
import LoginButtonContainer from '../container/LoginButtonContainer';
import Logo from './Logo';

const DesktopUploadButton = styled.button({
  '@media (max-width: 768px)': {
    display: 'none',
  },

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  margin: '0 10px',
  padding: '6.4px 15px',

  width: 'auto',
  height: '40px',

  backgroundColor: '#6157ff',
  borderRadius: '2px',

  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#473fd0',
  },

  transition: 'all 0.3s',
});

const MobileUploadButton = styled.button({
  '@media (min-width: 768px)': {
    display: 'none',
  },
  marginRight: '10px',

  height: '40px',

  fontSize: '1.7rem',
  fontWeight: 'bold',

  cursor: 'pointer',
});

const UploadIcon = styled(UploadOutlined)({
  fontSize: '1.5rem',
  marginRight: '5px',
});

const HeaderWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',

  flex: '1 1 auto',

  height: 'auto',
});

const LogoWrapper = styled.div({

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  flex: '8 8 auto',

  '@media (min-width: 768px)': {
    marginLeft: '5px',

    flex: '7 7 auto',
  },
});
const UploadButtonWrapper = styled.div({

  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  flex: '2 2 auto',

  '@media (min-width: 768px)': {
    flex: '3 3 auto',
  },
});

export default function Header() {
  const dispatch = useDispatch();

  const openPostForm = () => {
    dispatch(setFormVisible(true));
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <UploadButtonWrapper>
        <DesktopUploadButton type="button" onClick={openPostForm}>
          <UploadIcon />
          <span>Upload</span>
        </DesktopUploadButton>
        <MobileUploadButton type="button" onClick={openPostForm}>
          <PlusOutlined />
        </MobileUploadButton>
      </UploadButtonWrapper>
      <LoginButtonContainer />
      <PostFormContainer />
    </HeaderWrapper>
  );
}
