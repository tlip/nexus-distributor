// Generate our initial state values

const syncReducerValue = <T>(
  value: T | null = null
): NReducerActions.ReducerValue<T> => ({
  value,
});

const asyncReducerValue = <T>(
  value: T | null = null
): NReducerActions.AsyncReducerValue<T> => ({
  value,
  lastUpdated: null,
  isFetching: false,
  error: null,
});

export const reducerValues: NReducerActions.ReducerValues = {
  sync: syncReducerValue,
  async: asyncReducerValue,
};

// Our action composer hook
export const useReducerActions = (
  dispatch: React.Dispatch<any>
): NReducerActions.HookValue => {
  const composeAction: NReducerActions.ComposeAction = (type, payload) => {
    dispatch({ type, payload });
  };

  return {
    // Create a Sync Action
    sync: (subType, current = {}) => (value) => {
      composeAction(`SET_${subType}`, { ...current, value });
    },

    // Create an Async Action
    async: (subType, fetchFxn, current, disableLastUpdated) => async (
      ...args
    ) => {
      const dataIsFresh = disableLastUpdated
        ? false
        : Date.now() - +(current.lastUpdated as Date) < 30000;
      if (current.isFetching || dataIsFresh) {
        return;
      }
      composeAction(`GET_${subType}`, { ...current, isFetching: true });

      let payload;
      const done = {
        ...current,
        isFetching: false,
        lastUpdated: new Date(),
      };

      try {
        const value = await fetchFxn(...args);
        const error = null;
        payload = { ...done, error, value };
      } catch (e) {
        const error = e.toString();
        payload = { ...done, error };
      }

      composeAction(`SET_${subType}`, payload);
    },
  };
};

export default useReducerActions;
