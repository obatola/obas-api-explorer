import React, {ReactElement, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import ReactJson from 'react-json-view';
import {isObject} from "util";

function RestConsole(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [message, setMessage] = useState();
  const [apiURL, setAPIURL] = useState('https://api.github.com/users/hacktivist123/repos');

  const resetResponse = () => {
    setResponse(null);
    setMessage(null);
  };

  const handleResponse = (value: any) => {
    if (typeof value === 'object') {
      try {
        JSON.parse(value);
      } catch(e) {
        setMessage(value.toString());
      }
    } else {
      setMessage(value);
    }
  }

  const sendAPI = () => {
    setIsLoading(true);
    resetResponse();

    axios.get(apiURL).then((response: AxiosResponse<any>) => {
      setIsLoading(false);
      setResponse(response);
    }).catch((error: AxiosError<any>) => {
      setIsLoading(false);
      if (error.response) {
        handleResponse(error.response);
      } else if (error.request) {
        console.log('Error | The request was made but no response was received. ', error.request);
        handleResponse('Error | The request was made but no response was received. ');
      } else {
        console.log('Error | Something happened in setting up the request that triggered an Error. ', error.message);
        handleResponse(error.message);
      }
    });
  }

  if (isLoading) return (<div>Loading...</div>);

  return (
    <div>
      <input type="text" value={apiURL} onChange={event => setAPIURL(event.target.value)}/>
      <button onClick={sendAPI}>Send API</button>
      {response && <ReactJson collapsed={1} src={response} />}
      {message && message}
    </div>
  )
}

export default RestConsole;
