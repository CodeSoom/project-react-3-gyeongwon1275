import React from 'react';

import Header from '../components/Header';

export default function DefaultLayout({ component: Component }) {
  return (
    <div className="main-wrap">
      <Header />
      <Component />
    </div>
  );
}
