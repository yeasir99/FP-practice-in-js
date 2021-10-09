import {curry} from '../utils/utils.js'

// const curry = f => x => y => f(x, y)

const multiply = curry((x, y) => x * y)

const multiplyByTwo = multiply(2)

const result = multiplyByTwo(5) // 10

// Explain

/* 
const curry = f => x => y => f(x, y)

1) First argument is a function 
okay let's see whats happen when we pass first argument (as a function) on curry function

const multiply = curry((x, y) => x * y)
so curry return a function like x => y => f(x, y)

when we call multiply

const multiplyByTwo = multiply(2)

it return another function like  y => f(2, y) 

when we call  

const result = multiplyByTwo(5)

it return  f(2, 5)  this function resolve with first argument what we pass first time on curry invoke (2, 5) => 2 * 5  

and result will be 10

*/

// In mathematics and computer science, currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.
