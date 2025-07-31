'use client';
import CreatePost from './create-post-page';
import NoSsrWrapper from './no-ssr-wrapper';

export default function Page() {
  return (
    <NoSsrWrapper>
      <CreatePost />
    </NoSsrWrapper>
  );
}
