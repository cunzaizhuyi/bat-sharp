import path from 'path'
import fs from 'fs'
// @ts-expect-error
import sharp from 'sharp'
import fg from 'fast-glob'

interface IOptions {
  inputArr: string[]
  format: string
  outputPath: string
  outputConfig?: Object
}

const getFileName = (path: string) => {
  return path.replace(/(.*\/)*([^.]+).*/gi, '$2')
}

export const batSharp = async (options: IOptions) => {
  const {
    inputArr = [],
    format = 'png',
    outputPath,
    outputConfig = {},
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
    const targetPath = path.join(outputPath, `${getFileName(filePath)}.${format}`)
    sharp(filePath)[format](outputConfig)
      .toFile(`${targetPath}`, (err: string) => {
        if (err)
          isAllSucc = false
      })
  }
  if (isAllSucc)
    console.log('处理完毕')
}

// 测试demo
// batSharp({
//   inputArr: ['./images/*.png'],
//   format: 'webp',
//   outputPath: './images2/',
//   outputConfig: {
//     quality: 60,
//   },
// })
