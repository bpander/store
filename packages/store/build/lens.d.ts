export declare type Getter<T, V> = (target: T) => V;
export declare type Setter<T> = (target: T) => T;
export declare type Lens<T, U> = {
    get: Getter<T, U>;
    set: {
        (value: U): Setter<T>;
        (f: Setter<U>): Setter<T>;
    };
    k: {
        <K extends keyof U>(key: K): Lens<T, U[K]>;
    };
};
export declare const lens: <T>() => Lens<T, T>;
