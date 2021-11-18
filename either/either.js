import fs from 'fs'
import {Either, Log} from '../utils/utils.js'

const {Right, Left, of, tryCatch, fromNullable} = Either

const readFileSync = path => tryCatch(() => fs.readFileSync(path))
const parseJson = content => tryCatch(() => JSON.parse(content))

const getPort = () =>
  readFileSync('./config.json')
    .chain(parseJson)
    .map(config => config.port)
    .fold((x = 3000) => Log(x), Log)

getPort()
