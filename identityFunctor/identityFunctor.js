import {Id, compose} from '../utils/utils.js'

const stringToArr = str => str.split(' ')

const uppercaseFirstCharOfArrStr = arr =>
  arr.map(str => str.charAt(0).toUpperCase() + str.slice(1))

const arrToString = arr => arr.join(' ')

const capitalizeString = Id.of(
  'capitalize the first letter of each word in a string',
)
  .map(compose(arrToString, uppercaseFirstCharOfArrStr, stringToArr))
  .extract()

// Capitalize The First Letter Of Each Word In A String
