import { compose, curry } from '../utils/utils.js'

const stringToArr = str => str.split(' ')

const uppercaseFirstCharOfArrStr = arr =>
  arr.map(str => str.charAt(0).toUpperCase() + str.slice(1))

const arrToString = arr => arr.join(' ')

// Function invoke right to left
// left <---<---<--- right

const capitalizeString = compose(
  arrToString,
  uppercaseFirstCharOfArrStr,
  stringToArr,
)

capitalizeString('capitalize the first letter of each word in a string')

// Capitalize The First Letter Of Each Word In A String

/**
 * @param {string} str string number.
 */

// trimedString: String -> String
const trimedString = str => str.trim()

/**
 * @param {string} str string number
 */

// stringToNmuber: String -> Number
const stringToNmuber = str => parseInt(str)

/**
 * @param {number, number} number literal
 */
// add: Number -> Number -> Number
const add = (x, y) => x + y

/**
 * @param {number} number literal
 */
// charCodeToString: Number -> String

const charCodeToString = num => String.fromCharCode(num)

const charCode = compose(
  charCodeToString,
  curry(add)(1),
  stringToNmuber,
  trimedString,
)

charCode(' 64')

// A
