import {partial} from '../utils/utils.js'

// example 1

const multiplyByTwo = partial((x, y, z) => (x + y) * z, 4, 5)

const result = multiplyByTwo(2) // 18

// example 2

const pluralize = (singular, plural, user) =>
  user.length > 1 ? `${user.length} ${plural}` : `single ${singular}`

const checkUser = partial(pluralize, 'user', 'users')

const users = checkUser(['mike', 'richard', 'steve']) // 3 users
