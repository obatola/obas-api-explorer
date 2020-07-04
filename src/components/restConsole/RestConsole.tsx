import React, { ChangeEvent, ReactElement, useState } from 'react';
import { AxiosRequestConfig, Method } from 'axios';

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
import useAxiosAPISender from '../../shared/hooks/UseAxiosAPISender';

function RestConsole(): ReactElement {
  const {
    isLoading,
    responseJSON,
    responseString,
    axiosResponse,
    axiosError,
    sendAPI,
  } = useAxiosAPISender();
  const [requestMethod, setRequestMethod] = useState<Method>('get');
  const [requestBody, setRequestBody] = useState<string | undefined>();
  const [requestBodyType, setRequestBodyType] = useState<string>('text');
  const [requestURL, setRequestURL] = useState<string>(
    'https://my-json-server.typicode.com/typicode/demo/posts'
  );

  const handleSendAPI = () => {
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

          <LabelContentWrapper>
            <Button onClick={handleSendAPI}>Send Request</Button>
          </LabelContentWrapper>
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
