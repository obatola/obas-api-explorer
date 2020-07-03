import React, { ReactNode } from 'react';

export const generateSelectOptions = (options: string[]): ReactNode[] =>
  options.map((str, index) => <option key={index}>{str}</option>);

export const isPostMethod = (method: string) => {
  const postMethods = ['put', 'post', 'PUT', 'POST'];
  return postMethods.includes(method);
};
