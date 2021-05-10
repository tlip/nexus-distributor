import React from 'react';
import { reducerValues, useReducerActions } from 'hooks/useReducerActions';
import { theme } from 'theme';

type ElementSubscription = {
  name: string;
  node: any;
};

type ElementDimensions = {
  [subscriptionName: string]: ClientRect;
};

type DimensionsData = {
  width: number;
  height: number;
  large: boolean;
  medium: boolean;
  small: boolean;
  mobile: boolean;
  elements: ElementDimensions;
};

type SubscriptionsData = ElementSubscription[];

const parseBreakpoint = (value: string | number) => {
  const v = value.toString();
  if (v.includes('em')) {
    return +v.replace(/em/, '') * 16;
  } else if (v.includes('px')) {
    return +v.replace(/px/, '');
  } else {
    return +v;
  }
};

const BREAKPOINTS = theme.breakpoints.map(parseBreakpoint);

const calculateNewDimensions = (
  subs: ElementSubscription[]
): DimensionsData => {
  const dimensionsArr = subs
    .filter(({ node }) => !!node)
    .map(({ node, name }) => ({
      [name as string]: node?.getBoundingClientRect(),
    }));

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    large: window.innerWidth <= BREAKPOINTS[3],
    medium: window.innerWidth <= BREAKPOINTS[2],
    small: window.innerWidth <= BREAKPOINTS[1],
    mobile: window.innerWidth <= BREAKPOINTS[0],
    elements: Object.assign({}, ...dimensionsArr),
  };
};

export interface DimensionsContextState {
  page: NReducerActions.SyncReducerValue<DimensionsData>;
  subscriptions: NReducerActions.SyncReducerValue<SubscriptionsData>;
}

export interface DimensionsContextValues extends DimensionsData {
  ref?: React.RefObject<any>;
  subscribe(name: string, node: HTMLOrSVGElement): void;
  unsubscribe(name: string): void;
}

// Initial values
const initialState: DimensionsContextState = {
  page: reducerValues.sync<DimensionsData>(calculateNewDimensions([])),
  subscriptions: reducerValues.sync<SubscriptionsData>([]),
};

const initialContext: DimensionsContextValues = {
  ...(initialState.page.value as DimensionsData),
  ref: { current: null },
  subscribe: () => undefined,
  unsubscribe: () => undefined,
};

type DimensionsAction = {
  type: string;
  payload: any;
};

// Reducer
const packagesReducer = (
  state: DimensionsContextState,
  { type, payload }: DimensionsAction
): DimensionsContextState => {
  switch (type) {
    case 'SET_DIMENSIONS':
      return {
        ...state,
        page: payload,
      };
    case 'SET_ADD_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          ...payload,
          value: payload.value.concat(
            state.subscriptions.value as SubscriptionsData
          ),
        },
      };
    case 'SET_REM_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          value: (state.subscriptions.value as SubscriptionsData).filter(
            (s) => s.name === payload.name
          ),
        },
      };
    default:
      return state;
  }
};

// Create context
export const DimensionsContext = React.createContext(initialContext);

// Context Provider
export const DimensionsContextProvider: React.FC = ({ children }) => {
  const [store, dispatch] = React.useReducer(packagesReducer, initialState);
  const actions = useReducerActions(dispatch);
  const setDimensions = actions.sync('DIMENSIONS', store.page);
  const setSubscriptions = actions.sync(
    'ADD_SUBSCRIPTIONS',
    store.subscriptions
  );
  const removeSubscription = actions.sync(
    'REM_SUBSCRIPTIONS',
    store.subscriptions
  );
  const pageValue = store.page.value as DimensionsData;
  const subs = store.subscriptions.value as SubscriptionsData;

  const subscribe = React.useCallback(
    (name: string, node: HTMLOrSVGElement) => {
      setSubscriptions([{ name, node }]);
    },
    []
  );

  const unsubscribe = React.useCallback((name: string) => {
    const sub = subs.filter((s) => s.name === name);
    if (sub.length) {
      removeSubscription(sub);
    }
  }, []);

  React.useEffect(() => {
    const update = () => {
      const _subs = store.subscriptions.value as SubscriptionsData;
      setDimensions(calculateNewDimensions(_subs));
    };
    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, [subs]);

  const contextValue = { ...pageValue, subscribe, unsubscribe };

  return (
    <DimensionsContext.Provider value={contextValue}>
      {children}
    </DimensionsContext.Provider>
  );
};
