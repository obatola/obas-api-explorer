import React, { ReactElement, Fragment, useState } from 'react';
import {
  Label,
  LabelContentWrapper,
  ReactJsoWrapper,
  SectionHeader,
} from './ExplorerComponent.style';
import ReactJson from 'react-json-view';
import { Button, TextArea } from '../../shared/styles/Input.style';
import ConditionalRender from '../conditionalRender/ConditionalRender';
import { AxiosResponse } from 'axios';

interface ResponseProps {
  isLoading: boolean;
  response?: object | null;
  message?: string | null;
  axiosResponse?: AxiosResponse | null;
  axiosError?: object | null;
}

function Response({
  isLoading,
  response,
  message,
  axiosResponse,
  axiosError,
}: ResponseProps): ReactElement {
  const [viewRawResponse, setViewRawResponse] = useState(false);

  const toggleViewRawResponse = () => setViewRawResponse(!viewRawResponse);

  if (!isLoading && !message && !response && !axiosResponse && !axiosError)
    return <Fragment />;

  if (isLoading) {
    return (
      <>
        <SectionHeader>Response</SectionHeader>
        Loading...
      </>
    );
  }

  const renderResponseObject = (
    responseObject: object | null | undefined,
    { title, isError }: { title?: string; isError?: boolean } = {}
  ) => {
    if (!responseObject) {
      return <Fragment />;
    }

    const label = isError ? 'Error Message' : 'Response JSON';

    if (viewRawResponse) {
      return (
        <LabelContentWrapper>
          <Label>{label}</Label>
          <TextArea
            rows={4}
            error={isError}
            value={JSON.stringify(responseObject)}
            disabled
          />
        </LabelContentWrapper>
      );
    }

    return (
      <LabelContentWrapper>
        <Label>{label}</Label>
        <ReactJsoWrapper error={isError}>
          <ReactJson name={false} collapsed={2} src={responseObject || {}} />
        </ReactJsoWrapper>
      </LabelContentWrapper>
    );
  };

  const renderStatus = () => {
    if (axiosResponse && axiosResponse.status) {
      return (
        <LabelContentWrapper>
          <Label>Status</Label>
          {axiosResponse.status}
        </LabelContentWrapper>
      );
    }
  };

  const buttonText = viewRawResponse
    ? 'view formatted response'
    : 'view raw response';

  return (
    <>
      <SectionHeader>
        Response{' '}
        <Button ghost compact onClick={toggleViewRawResponse}>
          {buttonText}
        </Button>
      </SectionHeader>
      {renderStatus()}
      {renderResponseObject(response)}
      {renderResponseObject(axiosError, { isError: true })}
      <ConditionalRender displayChildren={!!message}>
        {message}
      </ConditionalRender>
    </>
  );
}

export default Response;
