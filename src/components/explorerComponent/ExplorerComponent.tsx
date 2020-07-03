import React, { FormEvent, ReactElement, useState } from 'react';
import {
  Label,
  LabelContentWrapper,
  SectionHeader,
  SectionWrapper,
  Title,
} from './ExplorerComponent.style';
import { APIConfigType } from '../../APIConfig';
import BodyParam from './BodyParam';
import { Button } from '../../shared/styles/Input.style';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isPostMethod } from '../../shared/utils';
import { contentTypeMap } from '../restConsole/constants';
import Response from './Response';

interface RequestBodyType {
  [key: string]: any;
}

function ExplorerComponent({
  title,
  url,
  method,
  body,
}: APIConfigType): ReactElement {
  const [requestBody, setRequestBody] = useState<RequestBodyType>({});
  const [response, setResponse] = useState<object | null>();
  const [message, setMessage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const sendAPI = (requestConfig: AxiosRequestConfig) => {
    axios(requestConfig)
      .then(handleSuccessfulAPIRequest)
      .catch(handleFailedAPIRequest);
  };

  const generateRequestConfig = (): AxiosRequestConfig => {
    if (isPostMethod(method)) {
      return {
        method,
        url,
        data: requestBody,
        headers: {
          'Content-Type': contentTypeMap.json,
        },
      };
    }
    return {
      method,
      url,
    };
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    resetResponse();

    sendAPI(generateRequestConfig());
  };

  const handleBodyParamChange = (key: string, value: string | number) => {
    setRequestBody({
      ...requestBody,
      [key]: value,
    });
  };

  const renderBodyParams = () => {
    const bodyParamDivs = body.map((bodyConfig) => (
      <BodyParam onChange={handleBodyParamChange} {...bodyConfig} />
    ));

    return <>{bodyParamDivs}</>;
  };

  return (
    <div>
      <Title>{title}</Title>
      <SectionWrapper>
        <SectionHeader>API</SectionHeader>
        <LabelContentWrapper>
          <Label>Base URL</Label>
          <div>{url}</div>
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>Method:</Label>
          <div>{method}</div>
        </LabelContentWrapper>
      </SectionWrapper>
      <form onSubmit={handleSubmit}>
        <SectionWrapper>
          <SectionHeader>Body</SectionHeader>
          {renderBodyParams()}
          <Button>Send Request</Button>
        </SectionWrapper>
      </form>
      <SectionWrapper>
        <Response isLoading={isLoading} response={response} message={message} />
      </SectionWrapper>
    </div>
  );
}

export default ExplorerComponent;
