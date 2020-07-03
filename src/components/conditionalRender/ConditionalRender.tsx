import React, { PropsWithChildren } from 'react';

interface ConditionalRenderProps {
  displayChildren: boolean;
}

export default function ConditionalRender({
  displayChildren,
  children,
}: PropsWithChildren<ConditionalRenderProps>) {
  if (displayChildren) {
    return <>{children}</>;
  }

  return null;
}
