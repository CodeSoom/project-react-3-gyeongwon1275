import React from 'react';

import { useDispatch } from 'react-redux';

import { PlusCircleFilled } from '@ant-design/icons';

import styled from '@emotion/styled';

import { setFormVisible } from '../data/postReducer';

import PostFormContainer from '../container/PostFormContainer';

const PlusIcon = styled(PlusCircleFilled)({
  fontSize: '2rem', color: '#333', backgroundColor: '#fff', borderRadius: '1rem',
});

export default function Header() {
  const dispatch = useDispatch();

  const openPostForm = () => {
    dispatch(setFormVisible(true));
  };

  return (
    <div className="header">
      <div className="logo-box">AnimalPhy</div>
      <div className="upload-box">
        <button type="button" onClick={openPostForm}>
          <PlusIcon />
        </button>
      </div>
      <PostFormContainer />
    </div>
  );
}
