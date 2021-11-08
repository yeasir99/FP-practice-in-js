import {curry} from '../utils/utils.js'

const multiply = curry((x, y, z) => (x * y) / z)

const multiplyByTwo = multiply(10)

const divided = multiplyByTwo(5)

const result = divided(2) //25
