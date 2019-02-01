import React from 'react';
import { Store } from 'store/src';
export interface ContextValue<T> {
    store: Store<T> | null;
}
export declare const StoreContext: React.Context<ContextValue<any>>;
