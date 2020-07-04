import React, { ReactNode } from 'react';
import { Method } from 'axios';

export const generateSelectOptions = (options: string[]): ReactNode[] =>
  options.map((str, index) => <option key={index}>{str}</option>);

export const isMethodWithBody = (method: Method) => {
  const postMethods = ['put', 'post', 'patch', 'PUT', 'POST', 'PATCH'];
  return postMethods.includes(method);
};
