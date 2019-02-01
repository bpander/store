import React from 'react';
import { Store } from 'store';
import { ContextValue } from './StoreContext';
export interface MapStoreToProps<T, TOwnProps, P> {
    (store: Store<T>, ownProps: TOwnProps): P;
}
export declare const injectStore: <T, TOwnProps, P>(mapStoreToProps: MapStoreToProps<T, TOwnProps, P>) => (Component: React.ComponentType<P>) => {
    new (props: Readonly<TOwnProps>): {
        innerRender: (value: ContextValue<T>) => JSX.Element | null;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<TOwnProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<TOwnProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: TOwnProps, context?: any): {
        innerRender: (value: ContextValue<T>) => JSX.Element | null;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<TOwnProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<TOwnProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
