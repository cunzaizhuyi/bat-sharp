## bat-sharp

[中文](https://github.com/cunzaizhuyi/bat-sharp/blob/master/README_cn.md)

bat-sharp is a image batch processing tool.

Features:
* image compress
* image format convert

It base on fast-glob.js and sharp.js


### Install
```
npm i bat-sharp -D
```

### Usage

```javascript
const { batSharp } = require('bat-sharp');

batSharp({
  inputArr: ['./images/*.png'],
  format: 'webp', // png jpeg webp avif and so on
  outputPath: './images2/',
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
  maintainRelativePath: true,  // <-- this value is true by default
})
```

### Why

you can use https://tinypng.com/ to image compress when you
has a few images;

but tinypng will limit you if you has hundreds of images;
tinypng says that it can compress 20 images once a time,
however it can't do this actually when you upload images continually.
it only compress less than 20 images at a time.

you need wait some minutes for next upload operation;


In a word，compressing hundreds of images will waste you amounts of time;

In addition, if you want convert your png or jpg images to
other format, this site can't help you;

so, bat-sharp was born!

It's very tiny and fast!

Try it!
