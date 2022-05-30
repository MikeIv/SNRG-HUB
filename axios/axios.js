import baseAxios from 'axios';

const axiosConfig = {
  baseURL: 'https://api.synergyhub.ru/', // process.env.BASE_URL
  headers: {
    Accept: 'application/vnd.api+json', // process.env.ACCEPT
    'Content-Type': 'application/json', // process.env.CONTENT_TYPE
  },
};

function axiosCreate() {
  return baseAxios.create(axiosConfig);
}

export default function (context, inject) {
  const axios = axiosCreate();

  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => config, // Do something before request is sent
    (error) => Promise.reject(error), // Do something with request error
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => response,
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    (error) => {
      const message = error.response?.data?.error?.message;
      if (process.client && message) {
        window.$nuxt.$root.$emit('toast', {
          type: 'error',
          text: message,
        });
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  inject('axios', axios);
}

export { axiosCreate };
