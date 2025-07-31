import dynamic from 'next/dynamic';
import React from 'react';

const NoSSRWrapper = (props: {
  children:
    | string
    | number
    | bigint
    | boolean
    // biome-ignore lint/suspicious/noExplicitAny: asdasdsa
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | React.ReactPortal
        // biome-ignore lint/suspicious/noExplicitAny: asd
        | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
  // biome-ignore lint/style/useFragmentSyntax: Test
}) => <React.Fragment>{props.children}</React.Fragment>;
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
