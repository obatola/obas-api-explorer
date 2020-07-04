import React, { ReactElement, useState } from 'react';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import styled from 'styled-components';

import { generateSelectOptions, isMethodWithBody } from '../../shared/utils';
import { apiMethods, contentTypeMap } from './constants';
import {
  Button,
  Input,
  Select,
  TextArea,
} from '../../shared/styles/Input.style';
import Response from '../explorerComponent/Response';
import {
  Label,
  LabelContentWrapper,
  SectionWrapper,
  Title,
} from '../explorerComponent/ExplorerComponent.style';
import { Card } from '../../shared/styles/Card.style';

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
  const [axiosResponse, setAxiosResponse] = useState<AxiosResponse | null>();
  const [axiosError, setAxiosError] = useState<object | null>();
  const [requestURL, setRequestURL] = useState<string>(
    'https://my-json-server.typicode.com/typicode/demo/posts'
  );

  const resetResponse = () => {
    setResponse(null);
    setAxiosResponse(null);
    setAxiosError(null);
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
    setAxiosResponse(response);
  };

  const handleFailedAPIRequest = (error: AxiosError<any>) => {
    setIsLoading(false);
    setAxiosError(error.toJSON());
  };

  const sendAPI = (requestConfig: AxiosRequestConfig) => {
    axios(requestConfig)
      .then(handleSuccessfulAPIRequest)
      .catch(handleFailedAPIRequest);
  };

  const handleSendAPI = () => {
    setIsLoading(true);
    resetResponse();
    sendAPI(generateRequestConfig());
  };

  const generateRequestConfig = (): AxiosRequestConfig => {
    if (isMethodWithBody(requestMethod)) {
      return {
        method: requestMethod,
        url: requestURL,
        data: requestBody,
        headers: {
          'Content-Type': contentTypeMap[requestBodyType],
        },
      };
    }
    return {
      method: requestMethod,
      url: requestURL,
    };
  };

  const renderBody = () => {
    if (isMethodWithBody(requestMethod)) {
      return (
        <div>
          <LabelContentWrapper>
            <Label>Body Type</Label>
            <Select
              fullWidth
              value={requestBodyType}
              onChange={(event) =>
                setRequestBodyType(event.target.value as Method)
              }
            >
              {generateSelectOptions(Object.keys(contentTypeMap))}
            </Select>
          </LabelContentWrapper>
          <LabelContentWrapper>
            <Label>Body</Label>
            <TextArea
              fullWidth
              rows={4}
              value={requestBody}
              onChange={(event) => setRequestBody(event.target.value)}
            />
          </LabelContentWrapper>
        </div>
      );
    }
  };

  return (
    <>
      <Card>
        <Title>Custom API</Title>
        <SectionWrapper>
          <LabelContentWrapper>
            <Label>URL</Label>
            <Input
              fullWidth
              type="text"
              value={requestURL}
              onChange={(event) => setRequestURL(event.target.value)}
            />
          </LabelContentWrapper>

          <LabelContentWrapper>
            <Label>Method</Label>
            <Select
              fullWidth
              value={requestMethod}
              onChange={(event) =>
                setRequestMethod(event.target.value as Method)
              }
            >
              {generateSelectOptions(apiMethods)}
            </Select>
          </LabelContentWrapper>

          {renderBody()}

          <InputWrappers>
            <Button onClick={handleSendAPI}>Send Request</Button>
          </InputWrappers>
        </SectionWrapper>

        <SectionWrapper>
          <Response
            isLoading={isLoading}
            response={response}
            message={message}
            axiosResponse={axiosResponse}
            axiosError={axiosError}
          />
        </SectionWrapper>
      </Card>
    </>
  );
}

export default RestConsole;
