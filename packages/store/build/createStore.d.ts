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
export declare const createStore: <T>(initialState: T, ...middleware: Middleware<T>[]) => Store<T>;
