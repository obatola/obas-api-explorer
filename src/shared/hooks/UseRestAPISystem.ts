import { useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseRestAPISystemHook {
  isLoading: boolean;
  responseJSON?: object;
  responseString?: string;
  axiosResponse?: AxiosResponse;
  axiosError?: object;
  sendAPI: (requestConfig: AxiosRequestConfig) => void;
}

function useRestAPISystem(): UseRestAPISystemHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseJSON, setResponseJSON] = useState<object>();
  const [responseString, setResponseString] = useState<string>();
  const [axiosResponse, setAxiosResponse] = useState<AxiosResponse>();
  const [axiosError, setAxiosError] = useState<object>();

  const resetResponse = () => {
    setResponseJSON(undefined);
    setAxiosResponse(undefined);
    setAxiosError(undefined);
    setResponseString(undefined);
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
      setResponseString(value);
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
    resetResponse();
    setIsLoading(true);

    axios(requestConfig)
      .then(handleSuccessfulAPIRequest)
      .catch(handleFailedAPIRequest);
  };

  return {
    isLoading,
    responseJSON,
    responseString,
    axiosResponse,
    axiosError,
    sendAPI,
  };
}

export default useRestAPISystem;
