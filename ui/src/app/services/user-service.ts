import { AppStore } from "@app/store/app-store";
import { constants } from "@app/app.constants";
import { makeAutoObservable } from "mobx";
import { utils } from "@shared/utils";
import jwt from "jwt-decode";

namespace Types {
  export type State = {
    user: {
      id: number;
      login: string;
      email: string;
      is_verified?: boolean;
      tokens: {
        access: string;
      };
    } | null;
  };
}

type IJWTAccessPayload = Omit<NonNullable<Types.State["user"]>, "tokens">;

export class UserService implements Types.State {
  user: Types.State["user"] = null;

  constructor(private readonly $store: AppStore) {
    makeAutoObservable(this);
  }

  setUserBaseOnToken() {
    utils.ls.get<string>(constants.LS.TOKEN).then(token => {
      if (token) {
        const user = jwt<IJWTAccessPayload>(token);

        this.user = {
          ...user,
          tokens: {
            access: token,
          },
        };
      } else {
        if (this.user) this.user = null;
      }
    });
  }
}

export type { Types as UserServiceTypes };
