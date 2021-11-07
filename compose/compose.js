import {compose} from '../utils/utils.js'

const stringToArr = str => str.split(' ')

const uppercaseFirstCharOfArrStr = arr =>
  arr.map(str => str.charAt(0).toUpperCase() + str.slice(1))

const arrToString = arr => arr.join(' ')

const capitalizeString = compose(
  arrToString,
  uppercaseFirstCharOfArrStr,
  stringToArr,
)

capitalizeString('capitalize the first letter of each word in a string')

// Capitalize The First Letter Of Each Word In A String
