
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});


// default header
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept"] = "multi-part/formdata";

instance.interceptors.request.use(
  async (config) => {
    console.log(localStorage.getItem('Tokens'))
    const token = JSON.parse(localStorage.getItem("Tokens"));

    if (token) {
      console.log('tok.CC',token.access)
      config.headers.Authorization = `Bearer ${token?.access}`;
    }
console.log('interceptor',config);
    return config;
  }
  
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('errr1',error)

    if (
      error?.response?.data?.code === "token_not_valid" &&
      error?.response?.status === 401
    ) {
      if (
        error?.response?.data?.messages &&
        error?.response?.data?.messages[0]?.token_type === "access"
      ) {
        const originalConfig = error.config;
        originalConfig._retry = true;
        try {
          const tokens = JSON.parse(localStorage.getItem("Tokens"));
          console.log('tokennn',tokens)
          const response = await instance.post("users/token/refresh/", {
            refresh: tokens.refresh,
          });
          let accessToken = response?.data?.access;
console.log('acccceddsss ',accessToken)
console.log(JSON.stringify({ access: accessToken, refresh: tokens.refresh }))

          if (accessToken) {
            localStorage.setItem(
              "Tokens",
              JSON.stringify({ access: accessToken, refresh: tokens.refresh })
            );
          }

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  
    else {
      console.log('errr2',error)
      return Promise.reject(error);
    }
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 500) {
      const originalConfig = error.config;
      originalConfig._retry = true;
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
