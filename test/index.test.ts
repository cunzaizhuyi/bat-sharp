import { batSharp } from '../src/index'

const inputArr = ['./images/**/*.png']
const outputPath = './images_compressed'

await batSharp({
  inputArr,
  format: 'webp', // png jpeg webp avif and so on
  outputPath,
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
  maintainRelativePath: true,
})
