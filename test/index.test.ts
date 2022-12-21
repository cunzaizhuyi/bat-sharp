import { batSharp } from '../src/index'

const inputArr = ['./images/**/*.png']
const outputPath = './images_compressed'

await batSharp({
  inputArr,
  format: 'webp', // 'jpeg' | 'jp2' | 'png' | 'webp' | 'gif' | 'avif' | 'heif' | 'tiff'
  outputPath,
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#webp
    quality: 60,
  },
  maintainRelativePath: true,
})
