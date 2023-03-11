import { $api } from "@app/api/$api";
import { APP_STORE_EVENTS, AppStore } from "@app/store/app-store";
import { UserServiceTypes } from "./user-service";
import { Utils } from "@shared/types/types";
import { constants } from "@app/app.constants";
import { makeAutoObservable } from "mobx";
import { utils } from "@shared/utils";
import _ from "lodash";

namespace IStore {
  export type Actions = {
    signInFx: (params: {
      login: string;
      password: string;
    }) => { user: NonNullable<UserServiceTypes.State["user"]> };

    signUpFx: (params: {
      login: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }) => { user: NonNullable<UserServiceTypes.State["user"]> };
  };
}

export class AuthService {
  constructor(private readonly $store: AppStore) {
    makeAutoObservable(this);

    this.checkSignInFx();
  }

  signInFx = async (params: Utils.Params<IStore.Actions["signInFx"]>) => {
    try {
      const { data } = await $api.post<Utils.Return<IStore.Actions["signInFx"]>>(
        "/auth/login",
        params
      );

      this.onUpdateAccessToken(data.user.tokens.access);
    } catch (error) {
      console.log(error);
    }
  };

  signUpFx = async (params: Utils.Params<IStore.Actions["signUpFx"]>) => {
    try {
      const { data } = await $api.post<Utils.Return<IStore.Actions["signUpFx"]>>(
        "/auth/registration",
        params
      );
      this.onUpdateAccessToken(data.user.tokens.access);
    } catch (error) {
      console.log(error);
    }
  };

  signOutFx = async () => {
    try {
      await $api.post("/auth/logout");

      this.onUpdateAccessToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  checkSignInFx = async () => {
    try {
      const { data } = await $api.get<
        Pick<NonNullable<UserServiceTypes.State["user"]>, "tokens">
      >("/auth/refresh");

      this.onUpdateAccessToken(data.tokens.access);
    } catch (error) {
      console.log(error);
    }
  };

  private onUpdateAccessToken(accessToken: string | null) {
    if (_.isNull(accessToken)) {
      utils.ls.delete(constants.LS.TOKEN).then(() => {
        this.$store.notify({ event: APP_STORE_EVENTS.UPDATE_TOKEN });
      });
    } else {
      utils.ls.save(constants.LS.TOKEN, accessToken).then(() => {
        this.$store.notify({ event: APP_STORE_EVENTS.UPDATE_TOKEN });
      });
    }
  }
}
