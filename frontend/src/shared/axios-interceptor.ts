import { BASE_URL } from "@/constants/generic.constants";
import axios, { InternalAxiosRequestConfig } from "axios";

const TIMEOUT = 1000000;

const onRequestSuccess = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.timeout = TIMEOUT;
  config.url = `${BASE_URL}/${config.url}`;
  return config;
};

const setupAxiosInterceptors = (onUnauthenticated: () => void): void => {
  const onResponseError = (err: any) => {
    const status = err.status || (err.response && err.response.status);

    let error;
    if (
      err.response?.data &&
      (err.response.data.errorMessage ||
        err.response.data.errorCode ||
        err.response.data.httpCode ||
        err.response.data.error ||
        err.response.data.reason)
    ) {
      error = err.response.data;
    } else {
      error = new Error("general.httpError " + status);
    }
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  /* istanbul ignore next */
  if (axios.interceptors) {
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use((res) => res, onResponseError);
  }
};

export { onRequestSuccess, setupAxiosInterceptors };
