// in axios.d.ts
import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    IS_RETRY?: boolean;
  }
}
