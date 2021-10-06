import {curry} from '../utils/utils.js'

const multiply = curry((x, y) => x * y)

const multiplyByTwo = multiply(2)

const result = multiplyByTwo(5) // 10

console.log(result)
