import React, { FormEvent, ReactElement, useState, Fragment } from 'react';
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
import { isMethodWithBody } from '../../shared/utils';
import { contentTypeMap } from '../restConsole/constants';
import Response from './Response';
import { Card } from '../../shared/styles/Card.style';

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
  const [axiosResponse, setAxiosResponse] = useState<AxiosResponse | null>();
  const [response, setResponse] = useState<object | null>();
  const [axiosError, setAxiosError] = useState<object | null>();
  const [message, setMessage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const generateRequestConfig = (): AxiosRequestConfig => {
    if (isMethodWithBody(method)) {
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

  const renderBodySection = () => {
    if (!body) return <Fragment />;

    const bodyParamDivs = body.map((bodyConfig, index) => (
      <BodyParam onChange={handleBodyParamChange} {...bodyConfig} key={index} />
    ));

    return (
      <>
        <SectionHeader>Body</SectionHeader>
        {bodyParamDivs}
      </>
    );
  };

  return (
    <Card>
      <Title>{title}</Title>
      <SectionWrapper>
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
          {renderBodySection()}
          <Button>Send Request</Button>
        </SectionWrapper>
      </form>
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
  );
}

export default ExplorerComponent;
