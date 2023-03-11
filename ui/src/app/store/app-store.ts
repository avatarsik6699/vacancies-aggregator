import { AuthService } from "@app/services/auth-service";
import { UserService } from "@app/services/user-service";
import { makeAutoObservable } from "mobx";
import { utils } from "@shared/utils";

export const enum APP_STORE_EVENTS {
  UPDATE_TOKEN,
}

namespace IStore {
  export type State = {
    services: {
      auth: AuthService;
      user: UserService;
    };
  };
}

type INotifyEventsPayload = { event: APP_STORE_EVENTS.UPDATE_TOKEN; payload?: null };

export class AppStore implements IStore.State {
  services = { auth: new AuthService(this), user: new UserService(this) };

  constructor() {
    makeAutoObservable(this);
  }

  notify({ event, payload }: INotifyEventsPayload) {
    if (event === APP_STORE_EVENTS.UPDATE_TOKEN) {
      this.services.user.setUserBaseOnToken();
    }
  }
}

export const {
  useStore: useAppStore,
  StoreProvider: AppStoreProvider,
} = utils.store.create(AppStore);
