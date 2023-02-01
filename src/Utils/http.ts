import { DecriptionData } from './encription';

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
let NodeBaseURL = ``;
let localIP = 'https://app.sneqhealth.com/api/v1/';
const host = window.location.hostname;
if (host && host === 'app.sneqhealth.com') {
  // set online server endpoints

  NodeBaseURL = `https://app.sneqhealth.com/api/v1/`;
} else if (host && host === 'https://app.sneqhealth.com/api/v1/') {
  // Staging server endpoints

  NodeBaseURL = `https://app.sneqhealth.com/api/v1/`;
} else {
  // local development
  NodeBaseURL = localIP;
}
const baseQuery = fetchBaseQuery({
  baseUrl: NodeBaseURL,

  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = localStorage.getItem('authtoken');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      headers.set('Access-Control-Allow-Origin', '*');
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'splitApi',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['activity', 'auth_user', 'Counter'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => 'test',
  }),
});

export const encriptionData = localStorage.getItem('auth');

let access_token = encriptionData ? DecriptionData(encriptionData) : false;
console.log(access_token, 'access_tok');
export const updateToken = (token: String) => {
  console.log(token, 'tokee');

  localStorage.setItem('authtoken', token as any);
};

if (access_token?.payload?.result?.accessToken) {
  updateToken(access_token?.payload?.result?.accessToken);
}

export { NodeBaseURL };
