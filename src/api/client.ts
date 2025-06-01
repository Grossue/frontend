const baseURL = "https://3.34.90.27/spring";

const baseHeaders = {
  "Content-Type": "application/json",
};

const getHeadersWithToken = () => {
  const token = localStorage.getItem("token");
  return token
    ? { ...baseHeaders, Authorization: `Bearer ${token}` }
    : { ...baseHeaders };
};

interface RequestConfig {
  url: string;
  headers?: Record<string, string>;
  method: "get" | "post" | "delete" | "patch" | "put";
  params?: object;
  data?: object;
}

const sendAuthorizedRequest = async ({
  url,
  headers,
  method,
  data,
}: RequestConfig) => {
  const requestOptions: RequestInit = {
    method,
    headers: { ...getHeadersWithToken(), ...headers },
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(baseURL + url, requestOptions);
  return response.json();
};

const createRequestMethod =
  (method: RequestConfig["method"]) =>
  async (requestConfig: Omit<RequestConfig, "method">) =>
    sendAuthorizedRequest({ ...requestConfig, method });

export const request = {
  get: createRequestMethod("get"),
  post: createRequestMethod("post"),
  put: createRequestMethod("put"),
  patch: createRequestMethod("patch"),
  delete: createRequestMethod("delete"),
};
