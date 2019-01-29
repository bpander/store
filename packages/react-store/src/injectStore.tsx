import React from 'react';
import { Store } from 'store/src';

import { ContextValue, StoreContext } from './StoreContext';

export interface MapStoreToProps<T, TOwnProps, P> {
  (store: Store<T>, ownProps: TOwnProps): P;
}

export const injectStore = function<T, TOwnProps, P>(mapStoreToProps: MapStoreToProps<T, TOwnProps, P>) {
  return (Component: React.ComponentType<P>) => {
    return class WrappedComponent extends React.Component<TOwnProps> {
      innerRender = (value: ContextValue<T>) => (
        value.store && <Component {...mapStoreToProps(value.store, this.props)} />
      );

      render() {
        return <StoreContext.Consumer>{this.innerRender}</StoreContext.Consumer>;
      }
    };
  };
};
