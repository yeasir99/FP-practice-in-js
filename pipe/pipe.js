import {pipe} from '../utils/utils.js'

const stringToArr = str => str.split(' ')

const uppercaseFirstCharOfArrStr = arr =>
  arr.map(str => str.charAt(0).toUpperCase() + str.slice(1))

const arrToString = arr => arr.join(' ')

// Function invoke from left to right
// left ----->---->----> right

const capitalizeString = pipe(
  stringToArr,
  uppercaseFirstCharOfArrStr,
  arrToString,
)

capitalizeString('capitalize the first letter of each word in a string')

// Capitalize The First Letter Of Each Word In A String
