import path from 'path'
import fs from 'fs'
// @ts-expect-error type-declaration
import sharp from 'sharp'
import fg from 'fast-glob'

interface IOptions {
  inputArr: string[]
  format: string
  outputPath: string
  outputConfig?: Object

  /**
   * @default true
   */
  maintainRelativePath?: boolean
}

const getFileName = (path: string) => {
  return path.replace(/(.*\/)*([^.]+).*/gi, '$2')
}

const getRelativePathName = (path: string) => {
  // split by `/`
  const p = path.split('/')

  // remove the first dot
  if (p[0] === '.')
    p.shift()

  // // remove the given path like `image`
  // if (p.length >= 2)
  //   p.shift()

  // remove extension
  const f = p[p.length - 1].split('.')
  if (f.length >= 2)
    f.pop()

  // filePath/fileName
  p[p.length - 1] = f.join('.')
  const pathName = p.join('/')

  // filePath without fileName
  p.pop()
  return [pathName, p.join('/')]
}

export const batSharp = async (options: IOptions) => {
  const {
    inputArr = [],
    format = 'png',
    outputPath,
    outputConfig = {},
    maintainRelativePath = true,
  } = options || {}

  if (!outputPath || !inputArr?.length || !format)
    return

  const entries = await fg(inputArr, { dot: true })

  console.log('input file list: ', entries)

  const isExist = fs.existsSync(path.normalize(outputPath))
  if (!isExist)
    fs.mkdirSync(outputPath)

  let isAllSucc = true
  for (const filePath of entries) {
    let targetPathName = ''

    if (maintainRelativePath) {
    // get filePath and filePath without fileName
      const [pathName, pathWithoutName] = getRelativePathName(filePath)
      targetPathName = path.join(outputPath, `${pathName}.${format}`)
      const targetPath = path.join(outputPath, pathWithoutName)

      // ensure file path exists
      if (!fs.existsSync(path.normalize(targetPath)))
        fs.mkdirSync(targetPath)
    }
    else {
      targetPathName = path.join(outputPath, `${getFileName(filePath)}.${format}`)
    }

    // compress and output
    sharp(filePath)[format](outputConfig)
      .toFile(`${targetPathName}`, (err: string) => {
        if (err)
          isAllSucc = false
      })
  }
  if (isAllSucc)
    console.log(`Task finished! Please check the path ${outputPath}.`)
}
