import {partial} from '../utils/utils.js'

const firstAdd = partial((x, y, z) => (x + y) * z, 4, 5)

const multiplyByTwo = firstAdd(2) // 18
