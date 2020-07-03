import React, { ReactElement, useState } from 'react';
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

  const sendRequest = () => {
    console.log('send request', { url, method, requestBody });
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
      <SectionWrapper>
        <SectionHeader>Body</SectionHeader>
        {renderBodyParams()}
        <Button onClick={sendRequest}>Send Request</Button>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>Response</SectionHeader>
      </SectionWrapper>
    </div>
  );
}

export default ExplorerComponent;
