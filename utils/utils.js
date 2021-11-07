export const curry = f => x => y => f(x, y)

export const partial =
  (fn, ...args) =>
  (...restArgs) =>
    fn(...args, ...restArgs)

export const compose =
  (...Fns) =>
  (...x) => {
    let state = true
    return Fns.reduceRight(
      (acc, fn) =>
        fn(
          ...(state
            ? (() => {
                state = false
                return acc
              })()
            : [acc]),
        ),
      x,
    )
  }

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

export const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
})

export const tryCatch = f => {
  try {
    return Right(f())
  } catch (error) {
    return Left(error)
  }
}

export const fromNullable = x => (x != null ? Right(x) : Left(x))

export const Task = fork => ({
  fork,
  ap: other =>
    Task((rej, res) => fork(rej, f => other.fork(rej, x => res(f(x))))),
  map: f => Task((rej, res) => fork(rej, x => res(f(x)))),
  chain: f => Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  concat: other =>
    Task((rej, res) =>
      fork(rej, x =>
        other.fork(rej, y => {
          console.log('X', x, 'Y', y)
          res(x.concat(y))
        }),
      ),
    ),
  fold: (f, g) =>
    Task((rej, res) =>
      fork(
        x => f(x).fork(rej, res),
        x => g(x).fork(rej, res),
      ),
    ),
})
Task.of = x => Task((rej, res) => res(x))
Task.rejected = x => Task((rej, res) => rej(x))
Task.fromPromised =
  fn =>
  (...args) =>
    Task((rej, res) =>
      fn(...args)
        .then(res)
        .catch(rej),
    )
