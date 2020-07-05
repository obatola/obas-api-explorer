import { Method } from 'axios';

export interface BodySpec {
  name: string;
  type:
    | 'month'
    | 'password'
    | 'datetime'
    | 'range'
    | 'date'
    | 'week'
    | 'url'
    | 'color'
    | 'email'
    | 'number'
    | 'tel'
    | 'text'
    | 'time';
  maxlength?: number;
  minlength?: number;
  rangeMin?: number;
  rangeMax?: number;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
}

export interface GlobalConfigType {
  viewRestConsole?: boolean;
}

export const globalConfig: GlobalConfigType = {
  viewRestConsole: false,
};

export interface APIConfigType {
  title: string;
  url: string;
  method: Method;
  body?: BodySpec[];
}

export const apiConfig: APIConfigType = {
  title: 'Add new user',
  url: 'https://jsonplaceholder.typicode.com/users',
  method: 'POST',
  body: [
    {
      name: 'email',
      type: 'email',
      maxlength: 24,
      minlength: 3,
    },
    {
      name: 'full-name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'phone',
      type: 'tel',
      pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
    },
  ],
};
