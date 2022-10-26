import { describe, it } from 'vitest'
import { batSharp } from '../src/index'

describe('test compress pictures', () => {
  const inputArr = ['./images/**/*.png']
  const outputPath = './images_compressed'

  it('should maintain relative path', async () => {
    batSharp({
      inputArr,
      format: 'webp', // png jpeg webp avif and so on
      outputPath,
      outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
        quality: 60,
      },
      maintainRelativePath: true,
    })
  })
})
