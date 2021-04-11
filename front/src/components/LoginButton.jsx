import React from 'react';

import { Button } from 'antd';

export default function LoginButton({ onClick }) {
  return (
    <div>
      <Button
        size="large"
        type="primary"
        onClick={onClick}
      >
        Login
      </Button>
    </div>
  );
}
