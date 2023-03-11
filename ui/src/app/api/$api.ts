import { UserServiceTypes } from "@app/services/user-service";
import { constants } from "@app/app.constants";
import { utils } from "@shared/utils";
import axios, { InternalAxiosRequestConfig } from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api",
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

$api.interceptors.response.use(
  config => config,
  async error => {
    if (axios.isAxiosError(error)) {
      // Unauthorized
      const { config, response } = error;
      if (response?.status === 401 && config && !config.IS_RETRY) {
        config.IS_RETRY = true;
        return repeatRequestAfterAuthorization(config);
      }
    }

    Promise.reject(error);
  }
);

async function repeatRequestAfterAuthorization(config: InternalAxiosRequestConfig<any>) {
  type IUserRefreshRequestParams = Pick<
    NonNullable<UserServiceTypes.State["user"]>,
    "tokens"
  >;

  try {
    const { data } = await $api.get<IUserRefreshRequestParams>("/user/refresh");

    utils.ls.save(constants.LS.TOKEN, data.tokens.access).then(() => {
      $api.request(config);
    });
  } catch (error) {
    // TODO:
    console.log(error, "НЕ АВТОРИЗОВАН");
  }
}

export { $api };
