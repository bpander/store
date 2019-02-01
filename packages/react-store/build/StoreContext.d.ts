import React from 'react';
import { Store } from 'store';
export interface ContextValue<T> {
    store: Store<T> | null;
}
export declare const StoreContext: React.Context<ContextValue<any>>;
