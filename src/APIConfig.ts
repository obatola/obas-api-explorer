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

export interface APIConfigType {
  title: string;
  url: string;
  method: Method;
  body?: BodySpec[];
}

export const apiConfigs: APIConfigType[] = [
  {
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
        placeholder: '555-555-5555',
      },
    ],
  },
  {
    title: 'Update a post',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'PUT',
    body: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'body',
        type: 'text',
      },
      {
        name: 'website',
        type: 'url',
      },
      {
        name: 'creation data',
        type: 'date',
      },
      {
        name: 'primary color',
        type: 'color',
      },
      {
        name: 'rating',
        type: 'range',
        rangeMin: 0,
        rangeMax: 10,
      },
    ],
  },
  {
    title: 'Get a post',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
  },
  {
    title: 'Delete a post',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'DELETE',
  },
];
