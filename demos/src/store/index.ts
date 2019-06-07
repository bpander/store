export type Setter<T> = (target: T) => T;

export interface Middleware<T> {
  (state: T, prevState?: T): T;
}

export interface Listener<T> {
  (newState: T, prevState: T): void;
}

export interface Unsubscribe {
  (): void;
}

export interface Store<T> {
  getState: () => T;
  update: (setter: Setter<T>) => void;
  subscribe: (listener: (newState: T, prevState: T) => void) => Unsubscribe;
  k: <K extends keyof T>(key: K) => Store<T[K]>;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

const makeK = <T>(store: Omit<Store<T>, 'k'>) => {
  const k = <K extends keyof T>(key: K): Store<T[K]> => {
    const getState = () => store.getState()[key];
    const subscribe = (listener: Listener<T[K]>) => {
      return store.subscribe((outerState: T, prevOuterState: T) => {
        if (outerState[key] !== prevOuterState[key]) {
          listener(outerState[key], prevOuterState[key]);
        }
      });
    };
    const update = (setter: Setter<T[K]>) => {
      const outerState = store.getState();
      const newValue = setter(outerState[key]);
      if (outerState[key] !== newValue) {
        store.update(() => ({ ...outerState, [key]: newValue }));
      }
    };
    const storeSansK = { getState, subscribe, update };
    return { ...storeSansK, k: makeK(storeSansK) };
  };
  return k;
};

export const createStore = <T>(initialState: T, ...middleware: Middleware<T>[]): Store<T> => {
  let state: T = middleware.reduce((s, m) => m(s), initialState);
  const listeners: Listener<T>[] = [];

  const getState = () => state;
  const update = (setter: Setter<T>) => {
    const newState = setter(state);
    const prevState = state;
    state = middleware.reduce((s, m) => m(s, prevState), newState);
    if (prevState !== state) {
      listeners.forEach(listener => listener(state, prevState));
    }
  };
  const subscribe = (listener: Listener<T>): Unsubscribe => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  const storeSansK = { getState, update, subscribe };
  return { ...storeSansK, k: makeK(storeSansK) };
};
