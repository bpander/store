import React from 'react';
import { Store, Unsubscribe } from 'store';
export interface StoreProviderProps<T> {
    store: Store<T>;
}
interface StoreProviderState<T> {
    storeState: T;
}
export declare class StoreProvider<T> extends React.Component<StoreProviderProps<T>, StoreProviderState<T>> {
    unsubscribe: Unsubscribe | null;
    constructor(props: StoreProviderProps<T>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: StoreProviderProps<T>): void;
    componentWillUnmount(): void;
    subscribe(): void;
    render(): JSX.Element;
}
export {};
