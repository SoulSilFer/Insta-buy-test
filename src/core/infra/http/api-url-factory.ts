const BACKEND_BASEURL = 'https://api.instabuy.com.br/apiv3';

export const makeApiURL = (path: string): string =>
  `${BACKEND_BASEURL}/${path}`;
