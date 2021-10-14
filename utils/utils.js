export const curry = f => x => y => f(x, y)

export const partial =
  (fn, ...args) =>
  (...restArgs) =>
    fn(...args, ...restArgs)

export const compose = (f, g) => x => f(g(x))

export const pipe = (f, g) => x => g(f(x))

export const identityFunctor = x => ({
  map: f => identityFunctor(f(x)),
  fold: f => f(x),
})

export const Box = x => ({
  map: f => Box(f(x)),
  chain: f => f(x),
  fold: f => f(x),
})

export const log = x => console.log(x) || x

export const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
})
