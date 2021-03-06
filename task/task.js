import fs from 'fs'
import {Task} from '../utils/utils.js'

const App_ = () =>
  fs.readFile('./config.json', 'utf-8', (error, contents) => {
    if (error) throw error
    console.log(error, contents)
    const newContent = contents.replace(/3/g, '6')
    fs.writeFile('./config1.json', newContent, (err, _) => {
      if (err) throw err
      console.log('success')
    })
  })

const readFile = (filePath, enc) =>
  Task((rej, res) =>
    fs.readFile(filePath, enc, (err, contents) =>
      err ? rej(err) : res(contents),
    ),
  )

const writeFile = (filePath, contents) =>
  Task((rej, res) =>
    fs.writeFile(filePath, contents, (err, content) =>
      err ? rej(err) : res(content),
    ),
  )

const App = () =>
  readFile('./config.json', 'utf-8')
    .map(contents => contents.replace(/3/g, '6'))
    .chain(newContent => writeFile('./config1.json', newContent))

App().fork(
  () => console.log('error'),
  () => console.log('Success'),
)
