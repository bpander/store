import React from 'react';
import { Store, Unsubscribe } from 'store/src';

import { StoreContext } from './StoreContext';

export interface StoreProviderProps<T> {
  store: Store<T>;
}

interface StoreProviderState<T> {
  storeState: T;
}

export class StoreProvider<T> extends React.Component<StoreProviderProps<T>, StoreProviderState<T>> {

  unsubscribe: Unsubscribe | null = null;

  constructor(props: StoreProviderProps<T>) {
    super(props);
    this.state = {
      storeState: this.props.store.getState(),
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate(prevProps: StoreProviderProps<T>) {
    if (this.props.store !== prevProps.store) {
      if (this.unsubscribe) { this.unsubscribe(); }
      this.subscribe();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) { this.unsubscribe(); }
  }

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(newStoreState => {
      this.setState(providerState => {
        if (providerState.storeState === newStoreState) {
          return null;
        }
        return { storeState: newStoreState };
      });
    });
  }

  render() {
    return (
      <StoreContext.Provider value={{ store: this.props.store }}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
