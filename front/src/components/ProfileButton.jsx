import React from 'react';

import styled from '@emotion/styled';

import { DownOutlined } from '@ant-design/icons';

const ProfileWrapper = styled.div({

  display: 'flex',

  width: '160px',
  height: '36px',

  fontWeight: 'bold',

  backgroundColor: '#3e3e3e',

  cursor: 'pointer',

});

const ProfileImageWrapper = styled.img({

  objectFit: 'cover',
  width: '25%',
  height: '100%',

  backgroundColor: '#white',

});

const UserNameWrapper = styled.div({

  display: 'flex',
  alignItems: 'center',

  padding: '0 0.5rem',

  width: '50%',
  height: '100%',

  overflow: 'hidden',
});

const IconWrapper = styled.div({
  width: '25%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function ProfileButton({ user }) {
  if (user) {
    const { profileUrl, name } = user;
    return (
      <ProfileWrapper>

        <ProfileImageWrapper src={profileUrl} alt="user-profile" />

        <UserNameWrapper>
          {name}
        </UserNameWrapper>
        <IconWrapper>
          <DownOutlined />
        </IconWrapper>
      </ProfileWrapper>
    );
  }
  return (
    <></>
  );
}
