import React, { ChangeEvent, ReactElement, useState } from 'react';
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
  const [responseJSON, setResponseJSON] = useState<object | null>();
  const [responseString, setResponseString] = useState<string | null>();
  const [requestMethod, setRequestMethod] = useState<Method>('get');
  const [axiosResponse, setAxiosResponse] = useState<AxiosResponse | null>();
  const [axiosError, setAxiosError] = useState<object | null>();
  const [requestBody, setRequestBody] = useState<string | undefined>();
  const [requestBodyType, setRequestBodyType] = useState<string>('text');
  const [requestURL, setRequestURL] = useState<string>(
    'https://my-json-server.typicode.com/typicode/demo/posts'
  );

  const resetResponse = () => {
    setResponseJSON(null);
    setAxiosResponse(null);
    setAxiosError(null);
    setResponseString(null);
  };

  const handleResponse = (value: any) => {
    if (typeof value === 'object') {
      try {
        JSON.parse(JSON.stringify(value));
        setResponseJSON(value);
      } catch (e) {
        setResponseString(value.toString());
      }
    } else {
      setResponseString(value + '');
    }
  };

  const handleSuccessfulAPIRequest = (response: AxiosResponse<any>) => {
    setIsLoading(false);

    handleResponse(response.data);
    setAxiosResponse(response);
  };

  const handleFailedAPIRequest = (error: AxiosError<any>) => {
    setIsLoading(false);
    setAxiosResponse(error.response);
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

  const handleBodyTypeChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setRequestBodyType(event.target.value as string);

  const handleRequestBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setRequestBody(event.target.value);

  const renderBody = () => {
    if (isMethodWithBody(requestMethod)) {
      return (
        <div>
          <LabelContentWrapper>
            <Label>Body Type</Label>
            <Select
              fullWidth
              value={requestBodyType}
              onChange={handleBodyTypeChange}
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
              onChange={handleRequestBodyChange}
            />
          </LabelContentWrapper>
        </div>
      );
    }
  };

  const handleURLChange = (event: ChangeEvent<HTMLInputElement>) =>
    setRequestURL(event.target.value);

  const handleMethodChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setRequestMethod(event.target.value as Method);

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
              onChange={handleURLChange}
            />
          </LabelContentWrapper>

          <LabelContentWrapper>
            <Label>Method</Label>
            <Select
              fullWidth
              value={requestMethod}
              onChange={handleMethodChange}
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
            responseJSON={responseJSON}
            responseString={responseString}
            axiosResponse={axiosResponse}
            axiosError={axiosError}
          />
        </SectionWrapper>
      </Card>
    </>
  );
}

export default RestConsole;
