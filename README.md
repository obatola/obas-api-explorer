# Interactive API Explorer

### SuperVanilla?!
    - turns the rest console off
    - removes the ability to set multiple apis in the config
    - set's the config to only have the api from the spec

### What is it?
 This tool is an interactive, browser-based tool for exploring endpoints. This tool accepts a parameter describing an endpoint (values such as url, method, headers, body etc) and produces a html component for sending requests to that endpoint.
 
 You can utilize the tool in two ways.
 1. You can edit the `apiConfig` variable in the `src/APIConfig.ts` file. The variable requires that you provide a singular api configurations that follows the schema below. There is also a custom RestConsole that rests at the bottom of provided APIs so that a user can test out custom api's on their own if they see fit. The rest console can be toggled on or off by setting `viewRestConsole` to `true` or `false` in the `globalConfig` variable also found in the file, `src/APIConfig.ts`
    ```
    {
        title: string;
        url: string;
        method: 'get' | 'GET' | 'delete' | 'DELETE' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH';
        body?: {
          name: string;
          type: 'month'| 'password'| 'datetime'| 'range'| 'date'| 'week'| 'url'| 'color'| 'email'| 'number'| 'tel'| 'text'| 'time';
          maxlength?: number;
          minlength?: number;
          rangeMin?: number;
          rangeMax?: number;
          placeholder?: string;
          required?: boolean;
          pattern?: string;
        }
    }
    ```

### How does one run it?
- run `npm i` to install the necessary packages
- run `npm run start` to run the program locally, and go to `http://localhost:3000`
