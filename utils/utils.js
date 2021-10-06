export const curry = f => x => y => f(x, y)

export const partial =
  (fn, ...args) =>
  (...restArgs) =>
    fn(...args, ...restArgs)
