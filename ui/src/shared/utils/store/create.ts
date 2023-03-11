import { createContext, useContext, useEffect } from "react";
import { observable } from "mobx";

interface DIContainerData<S> {
  $store: S;
  reset: () => void;
}

interface IUseStoreParams {
  resetStoreAfterUnmount?: boolean;
}

/**
 * @summary Creates a store instance and returns a hook for getting data from the store + resetting the store
 *
 * @StoreProvider Used to wrap the components of consuming stores, with the ability to replace 'data' with mock ones.
 * @example
 * const mockData = {store: new MockStore(), reset: () => {mockData.store = new MockStore()}}
 * <StoreProvider data={mockData}>
 *  <ProjectPlanPage/>
 * </StoreProvider>
 */
export const create = <S>(Store: new () => S) => {
  const data = observable({
    $store: new Store(),
    reset: () => {
      data.$store = new Store();
    },
  });

  const DIContainer = createContext<DIContainerData<S>>(data);

  return {
    StoreProvider: DIContainer.Provider,
    useStore: ({
      resetStoreAfterUnmount = false,
    }: IUseStoreParams = {}): DIContainerData<S> => {
      useEffect(
        function onResetStoreAfterUnmountFx() {
          if (resetStoreAfterUnmount) {
            return data.reset;
          }
        },
        [resetStoreAfterUnmount]
      );

      return useContext(DIContainer);
    },
  };
};
