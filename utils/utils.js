export const curry = fn => {
  const curryN =
    (n, fn) =>
    (...args) =>
      args.length >= n
        ? fn(...args)
        : curryN(n - args.length, (...innerArgs) => fn(...args, ...innerArgs))

  return curryN(fn.length, fn)
}

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

export const pipe =
  (...Fns) =>
  (...x) => {
    let state = true
    return Fns.reduce(
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

export const Id = x => ({
  map: f => Id(f(x)),
  chain: f => f(x),
  extract: () => x,
  concat: o => Id(x.concat(o.extract())),
})
Id.of = x => Id(x)

export const Log = x => console.log(x) || x

export const Either = (() => {
  const Right = x => ({
    chain: f => f(x),
    ap: other => other.map(x),
    alt: other => Right(x),
    extend: f => f(Right(x)),
    concat: other =>
      other.fold(
        x => other,
        y => Right(x.concat(y)),
      ),
    traverse: (of, f) => f(x).map(Right),
    map: f => Right(f(x)),
    fold: (_, g) => g(x),
    toString: () => `Right(${x})`,
  })

  const Left = x => ({
    chain: _ => Left(x),
    ap: _ => Left(x),
    extend: _ => Left(x),
    alt: other => other,
    concat: _ => Left(x),
    traverse: (of, _) => of(Left(x)),
    map: _ => Left(x),
    fold: (f, _) => f(x),
    toString: () => `Left(${x})`,
  })

  const of = Right
  const tryCatch = f => {
    try {
      return Right(f())
    } catch (e) {
      return Left(e)
    }
  }

  const fromNullable = x => (x != null ? Right(x) : Left(x))

  return {Right, Left, of, tryCatch, fromNullable}
})()

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
