export interface BodySpec {
  name: string;
  type: // | 'button'
  // | 'checkbox'
  // | 'color'
  // | 'date'
  // | 'datetime'
  // | 'file'
  // | 'hidden'
  // | 'image'
  // | 'month'
  // | 'password'
  // | 'radio'
  // | 'range'
  // | 'reset'
  // | 'search'
  // | 'submit'
  // | 'week'
  // | 'url'
  'email' | 'number' | 'tel' | 'text' | 'time';
  maxlength?: number;
  minlength?: number;
  placeholder?: string | number;
  required?: boolean;
  pattern?: string;
}

export interface APIConfigType {
  title: string;
  url: string;
  method: string;
  body: BodySpec[];
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
      },
    ],
  },
];
