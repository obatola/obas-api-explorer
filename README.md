# Interactive API Explorer

### What is it?
 This tool is an interactive, browser-based tool for exploring endpoints. This tool accepts parameters describing endpoints (values such as url, method, headers, body etc) and produce a html component for sending requests to that endpoint.
 
 You can utilize the tool in two ways.
 1. You can edit the `apiConfigs` variable in the `src/APIConfig.ts` file. The variable requires that you provide an array of endpoint configurations that follow the schema below. If you wish to only display one API you can provide an array with one api config. There is also a custom RestConsole that rests at the bottom of provided APIs so that a user can test out custom api's on their own if they see fit. The rest console can be toggled on or off by setting `viewRestConsole` to `true` or `false` in the `globalConfig` variable also found in the file, `src/APIConfig.ts`
    ```
    [
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
        },
        ...
    ]
    ```
    
2. You can exclusively use the `ExplorerComponent` found in the following file `src/components/explorerComponent/ExplorerComponent.tsx`. This component is what displays a singular API Explorer. To use it you must provide the following props, `title`, `url`, `method`, `body`. The schema's for each are listed below.
    ```
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
    ```

### How does one run it?
- run `npm i` to install the necessary packages
- run `npm run start` to run the program locally, and go to `http://localhost:3000`
