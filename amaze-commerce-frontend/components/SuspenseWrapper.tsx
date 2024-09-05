import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const SuspenseWrapper: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseWrapper;
