import React from 'react';
import { Store } from 'store';

export interface ContextValue<T> {
  store: Store<T> | null;
}

// tslint:disable-next-line no-any
export const StoreContext = React.createContext<ContextValue<any>>({ store: null });
