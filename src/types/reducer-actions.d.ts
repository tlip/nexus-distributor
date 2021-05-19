declare namespace NReducerActions {
  interface ReducerValue<T> {
    value?: T | null;
  }

  interface SyncReducerValue<T> extends ReducerValue<T> {}

  interface AsyncReducerValue<T> extends ReducerValue<T> {
    lastUpdated: Date | null;
    isFetching: boolean;
    error: null | string;
  }

  interface ReducerValues {
    sync: SyncReducerValue;
    async: AsyncReducerValue;
  }

  type Type = string;

  type StateValue<T> = ReducerValue<T> | AsyncReducerValue<T>;

  type ComposeAction = <T>(type: Type, payload: StateValue<T>) => void;

  type Action<T> = (value: T) => void;

  type AsyncAction = (...args: any[]) => Promise<any>;

  type SyncActionCreator = <T>(
    subType: Type,
    current?: ReducerValue<T>
  ) => Action<T>;

  type AsyncActionCreator = <T, K>(
    subType: Type,
    fetchFxn: (...arguments: T[]) => any,
    current: AsyncReducerValue<K>,
    disableLastUpdated?: boolean
  ) => AsyncAction;

  type AsyncActionCreator = <T>(
    subType: Type,
    fetchFxn: () => any,
    current: AsyncReducerValue<T>
  ) => AsyncAction;

  type HookValue = {
    sync: SyncActionCreator;
    async: AsyncActionCreator;
  };
}
