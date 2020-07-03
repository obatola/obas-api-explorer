import React, { ReactElement } from 'react';

export const generateSelectOptions = (options: string[]): ReactElement[] =>
  options.map((str, index) => <option key={index}>{str}</option>);

export const isPostMethod = (method: string) => {
  const postMethods = ['put', 'post', 'PUT', 'POST'];
  return postMethods.includes(method);
};
