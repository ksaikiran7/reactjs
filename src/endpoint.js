import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://localhost:5200/",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 4xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.clear();
      // localStorage.setItem("from", window.location.pathname);
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
