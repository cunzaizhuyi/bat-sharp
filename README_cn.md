## bat-sharp

图片批处理工具。 

主要用于图片压缩 和 格式转换

基于fast-glob 和 sharp.js实现


### Why

在有少量图片时，可以使用https://tinypng.com/  进行图片压缩；
但当有大量图片时，比如上百张图片，tinypng会限制你，
虽然它说一次可以传20张图，但当你频繁操作时，它可能一次只能帮你压缩几张而已；
你只有降低操作频率，等几分钟，下一次才可能真的帮你压缩20张。

总之，如果有上百张图片时，用tinypng完整压缩完图片可能需要几分钟。

而且如果你想使用webp/avif这种体积更小的图片格式的话，它无能为力；

所以有了本工具。


### Install
```
npm i bat-sharp -D
```

### Usage

```javascript
const { batSharp } = require('bat-sharp');

batSharp({
  inputArr: ['./images/*.png'],
  format: 'webp', // png jpeg webp avif等
  outputPath: './images2/',
  outputConfig: { // 参考 https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
})
```

### related article
*  [几百张图片快速批处理工具bat-sharp.js介绍](https://segmentfault.com/a/1190000042232783)

### related video
[几百张图片几秒处理完毕！写了一个图片批处理工具](https://www.bilibili.com/video/BV1ea411U7Vu/)