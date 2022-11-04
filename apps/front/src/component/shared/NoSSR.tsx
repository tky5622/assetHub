"use client";

import dynamic from 'next/dynamic';
import React, { FC } from 'react';

type MyComponenProps = {
  children: React.ReactNode
}

const NonSSRWrapper: FC<MyComponenProps> = (props) => (
  <React.Fragment>{props.children}</React.Fragment>
)
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
})
