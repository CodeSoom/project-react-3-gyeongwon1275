import React from 'react';

import { useParams } from 'react-router-dom';

import PostDetailContainer from '../container/PostDetailContainer';

export default function PostDetailPage({ params }) {
  const { id } = params || useParams();

  return (
    <PostDetailContainer postId={id} />
  );
}
