import { Setter } from './lens';

export interface Middleware<T> {
  (state: T, prevState?: T): T;
}

export interface Listener<T> {
  (newState: T): void;
}

export interface Unsubscribe {
  (): void;
}

export interface Store<T> {
  getState: () => T;
  update: (setter: Setter<T>) => void;
  subscribe: (listener: (newState: T) => void) => Unsubscribe;
}

export const createStore = <T>(initialState: T, ...middleware: Middleware<T>[]): Store<T> => {
  let state: T = middleware.reduce((s, m) => m(s), initialState);
  const listeners: Listener<T>[] = [];

  const getState = () => state;
  const update = async (setter: Setter<T>) => {
    const newState = setter(state);
    const prevState = state;
    state = middleware.reduce((s, m) => m(s, prevState), newState);
    listeners.forEach(listener => listener(state));
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

  return { getState, update, subscribe };
};
