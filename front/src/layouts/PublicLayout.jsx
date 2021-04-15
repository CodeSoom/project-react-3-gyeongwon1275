import React from 'react';

import styled from '@emotion/styled';

const FormWrapper = styled.div({
  padding: '1rem',
  width: '100%',
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (min-width: 768px)': {
    margin: '0 auto',

    width: '25vw',
  },

});

export default function PublicLayout({ component: Component }) {
  return (
    <FormWrapper>
      <Component />
    </FormWrapper>
  );
}
