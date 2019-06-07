
export type Getter<T, V> = (target: T) => V;
export type Setter<T>    = (target: T) => T;

export type Lens<T, U> = {
  get: Getter<T, U>;
  set: {
    (value: U): Setter<T>;
    (f: Setter<U>): Setter<T>;
  };
  k: { <K extends keyof U>(key: K): Lens<T, U[K]>; };
};

interface SetSelf<T, U> {
  (value: U): Setter<T>;
}

const copy = <T>(x: T): T => {
  if (Array.isArray(x)) {
    return x.slice() as {} as T;
  } else if (x && typeof x === 'object') {
    return { ...x };
  } else {
    return x;
  }
};

const lensImpl = <T, U>(get: Getter<T, U>, setSelf: SetSelf<T, U>): Lens<T, U> => {

  const compose = <V>(other: Lens<U, V>): Lens<T, V> => {
    return lensImpl(
      t => other.get(get(t)),
      v => t => {
        return setSelf(other.set(v)(get(t)))(t);
      },
    );
  };

  const k = <K extends keyof U>(key: K): Lens<T, U[K]> => {
    return compose(lensImpl(
      t => t[key],
      v => t => {
        if (v === t[key]) {
          return t;
        }
        const copied = copy(t);
        copied[key] = v;
        return copied;
      },
    ));
  };

  const set = (modifier: U | Setter<U>) => {
    if (typeof modifier === 'function') {
      return (t: T) => setSelf((modifier as Setter<U>)(get(t)))(t);
    } else {
      return setSelf(modifier);
    }
  };

  return { get, set, k };
};

export const lens = <T>(): Lens<T, T> => lensImpl(t => t, v => _ => v);
