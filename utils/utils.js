export const curry = f => x => y => f(x, y)

export const partial =
  (fn, ...args) =>
  (...restArgs) =>
    fn(...args, ...restArgs)

export const compose = (f, g) => x => f(g(x))

export const pipe = (f, g) => x => g(f(x))
