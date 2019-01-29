export const compose = <R>(...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)));
