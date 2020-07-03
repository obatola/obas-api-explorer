import React, { ReactElement, Fragment, useState } from 'react';
import { ReactJsoWrapper, SectionHeader } from './ExplorerComponent.style';
import ConditionalRender from '../conditionalRender/ConditionalRender';
import ReactJson from 'react-json-view';
import { TextArea } from '../../shared/styles/Input.style';

interface ResponseProps {
  isLoading: boolean;
  response?: object | null;
  message?: string | null;
}

function Response({
  isLoading,
  response,
  message,
}: ResponseProps): ReactElement {
  const [viewRawResponse, setViewRawResponse] = useState(false);

  const toggleViewRawResponse = () => setViewRawResponse(!viewRawResponse);

  if (!isLoading && !message && !response) return <Fragment />;

  if (isLoading) {
    return (
      <>
        <SectionHeader>Response</SectionHeader>
        Loading...
      </>
    );
  }

  const buttonText = viewRawResponse
    ? 'view formatted response'
    : 'view raw response';
  let responseDiv;
  if (viewRawResponse) {
    responseDiv = (
      <TextArea rows={4} value={JSON.stringify(response)} disabled />
    );
  } else {
    responseDiv = (
      <ReactJsoWrapper>
        <ReactJson name={false} collapsed={2} src={response || {}} />
      </ReactJsoWrapper>
    );
  }

  return (
    <>
      <SectionHeader>
        Response <button onClick={toggleViewRawResponse}>{buttonText}</button>
      </SectionHeader>
      <ConditionalRender displayChildren={!!response}>
        {responseDiv}
      </ConditionalRender>
      <ConditionalRender displayChildren={!!message}>
        {message}
      </ConditionalRender>
    </>
  );
}

export default Response;
