import {identityFunctor} from '../utils/utils.js'

const capitalizeString = identityFunctor(
  'capitalize the first letter of each word in a string',
)
  .map(str => str.split(' '))
  .map(arr => arr.map(str => str.charAt(0).toUpperCase() + str.slice(1)))
  .fold(arr => arr.join(' '))

// Capitalize The First Letter Of Each Word In A String
