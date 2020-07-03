import React, { ReactElement, useState } from 'react';
import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

import { generateSelectOptions, isPostMethod } from '../../shared/utils';
import { apiMethods, contentTypeMap } from './constants';
import ConditionalRender from '../conditionalRender/ConditionalRender';

const InputWrappers = styled.div`
  margin-bottom: 20px;
`;

function RestConsole(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<object | null>();
  const [message, setMessage] = useState<string | null>();
  const [requestMethod, setRequestMethod] = useState<Method>('get');
  const [requestBody, setRequestBody] = useState<string | undefined>();
  const [requestBodyType, setRequestBodyType] = useState<string>('text');
  const [requestURL, setRequestURL] = useState<string>(
    'https://my-json-server.typicode.com/typicode/demo/posts'
  );

  const resetResponse = () => {
    setResponse(null);
    setMessage(null);
  };

  const handleResponse = (value: any) => {
    if (typeof value === 'object') {
      try {
        JSON.parse(JSON.stringify(value));
        setResponse(value);
      } catch (e) {
        setMessage(value.toString());
      }
    } else {
      setMessage(value);
    }
  };

  const handleSuccessfulAPIRequest = (response: AxiosResponse<any>) => {
    setIsLoading(false);

    handleResponse(response.data);
  };

  const handleFailedAPIRequest = (error: AxiosError<any>) => {
    setIsLoading(false);

    if (error.response) {
      handleResponse(error.response);
    } else if (error.request) {
      console.log(
        'Error | The request was made but no response was received. ',
        error.request
      );
      handleResponse(error.request);
    } else {
      console.log(
        'Error | Something happened in setting up the request that triggered an Error. ',
        error.message
      );
      handleResponse(error.message);
    }
  };

  const sendAPI = () => {
    let requestConfig = {};

    setIsLoading(true);
    resetResponse();

    if (isPostMethod(requestMethod)) {
      requestConfig = {
        method: requestMethod,
        url: requestURL,
        data: requestBody,
        headers: {
          'Content-Type': contentTypeMap[requestBodyType],
        },
      };
    } else {
      requestConfig = {
        method: requestMethod,
        url: requestURL,
      };
    }

    axios(requestConfig)
      .then(handleSuccessfulAPIRequest)
      .catch(handleFailedAPIRequest);
  };

  const renderResponseSection = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <InputWrappers>
        <ConditionalRender displayChildren={!!response}>
          <div>
            <ReactJson name={false} collapsed={2} src={response || {}} />
            <textarea rows={4} value={JSON.stringify(response)} disabled />
          </div>
        </ConditionalRender>
        <ConditionalRender displayChildren={!!message}>
          {message}
        </ConditionalRender>
      </InputWrappers>
    );
  };

  const displayBody: boolean =
    requestMethod === 'put' || requestMethod === 'post';

  return (
    <div>
      <InputWrappers>
        <select
          value={requestMethod}
          onChange={(event) => setRequestMethod(event.target.value as Method)}
        >
          {generateSelectOptions(apiMethods)}
        </select>
      </InputWrappers>

      <InputWrappers>
        <input
          type="text"
          value={requestURL}
          onChange={(event) => setRequestURL(event.target.value)}
        />
      </InputWrappers>

      <InputWrappers>
        {displayBody && (
          <div>
            <select
              value={requestBodyType}
              onChange={(event) =>
                setRequestBodyType(event.target.value as Method)
              }
            >
              {generateSelectOptions(Object.keys(contentTypeMap))}
            </select>
            <textarea
              rows={4}
              value={requestBody}
              onChange={(event) => setRequestBody(event.target.value)}
            />
          </div>
        )}
      </InputWrappers>

      <InputWrappers>
        <button onClick={sendAPI}>Send API</button>
      </InputWrappers>

      {renderResponseSection()}
    </div>
  );
}

export default RestConsole;
