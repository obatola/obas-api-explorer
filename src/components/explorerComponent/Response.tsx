import React, { ReactElement, Fragment, useState } from 'react';
import {
  Label,
  LabelContentWrapper,
  ReactJsoWrapper,
  SectionHeader,
} from './ExplorerComponent.style';
import ReactJson from 'react-json-view';
import { Button, TextArea } from '../../shared/styles/Input.style';
import { AxiosResponse } from 'axios';

interface ResponseProps {
  isLoading: boolean;
  responseJSON?: object | null;
  responseString?: string | null;
  axiosResponse?: AxiosResponse | null;
  axiosError?: object | null;
}

function Response({
  isLoading,
  responseJSON, // if response is a JSON
  responseString, // if response is a string
  axiosResponse, // response from Axios
  axiosError, // error from Axios
}: ResponseProps): ReactElement {
  const [viewRawResponse, setViewRawResponse] = useState(false);

  const toggleViewRawResponse = () => setViewRawResponse(!viewRawResponse);

  if (
    !isLoading &&
    !responseString &&
    !responseJSON &&
    !axiosResponse &&
    !axiosError
  )
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

  const renderResponseString = () => {
    if (!responseString) {
      return <Fragment />;
    }

    return (
      <LabelContentWrapper>
        <Label>Response Text</Label>
        <TextArea rows={4} value={responseString} disabled />
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

  const renderButton = () => {
    if (!!responseJSON || !!axiosError) {
      const buttonText = viewRawResponse
        ? 'view formatted response'
        : 'view raw response';

      return (
        <Button ghost compact onClick={toggleViewRawResponse}>
          {buttonText}
        </Button>
      );
    }
  };

  return (
    <>
      <SectionHeader>Response {renderButton()}</SectionHeader>
      {renderStatus()}
      {renderResponseObject(responseJSON)}
      {renderResponseObject(axiosError, { isError: true })}
      {renderResponseString()}
    </>
  );
}

export default Response;
