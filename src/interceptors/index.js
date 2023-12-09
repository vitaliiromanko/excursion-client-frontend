import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const response = await axios.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        error.config.headers[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);
