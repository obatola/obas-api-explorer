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
import { AxiosRequestConfig } from 'axios';
import { isMethodWithBody } from '../../shared/utils';
import { contentTypeMap } from '../restConsole/constants';
import Response from './Response';
import { Card } from '../../shared/styles/Card.style';
import useAxiosAPISender from '../../shared/hooks/UseAxiosAPISender';

interface RequestBodyType {
  [key: string]: any;
}

function ExplorerComponent({
  title,
  url,
  method,
  body,
}: APIConfigType): ReactElement {
  const {
    isLoading,
    responseJSON,
    responseString,
    axiosResponse,
    axiosError,
    sendAPI,
  } = useAxiosAPISender();
  const [requestBody, setRequestBody] = useState({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendAPI(generateRequestConfig());
  };

  const handleBodyParamChange = (key: string, value: string | number) => {
    setRequestBody({
      ...requestBody,
      [key]: value,
    });
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
          <Label>Method</Label>
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
          responseJSON={responseJSON}
          responseString={responseString}
          axiosResponse={axiosResponse}
          axiosError={axiosError}
        />
      </SectionWrapper>
    </Card>
  );
}

export default ExplorerComponent;
