import {compose} from '../utils/utils.js'

const stringToArr = str => str.split(' ')

const uppercaseFirstCharOfArrStr = arr =>
  arr.map(str => str.charAt(0).toUpperCase() + str.slice(1))

const arrToString = arr => arr.join(' ')

const capitalizeString = compose(
  arrToString,
  compose(uppercaseFirstCharOfArrStr, stringToArr),
)

capitalizeString('capitalize the first letter of each word in a string')

// Capitalize The First Letter Of Each Word In A String

// It also work same
/*
const capitalizeString = compose(
  compose(arrToString, uppercaseFirstCharOfArrStr),
  stringToArr
);

// or

const returnedFn = compose(uppercaseFirstCharOfArrStr, stringToArr);
const capitalizeString = compose(arrToString, returnedFn);

*/
