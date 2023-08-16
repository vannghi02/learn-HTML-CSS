import fs from 'fs';
import path from 'path';
import { src, dest } from 'gulp';
import cache from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import vinylBuffer from 'vinyl-buffer';
import spritesmith from 'gulp.spritesmith-multi';
import sort from 'gulp-sort';
import merge from 'merge-stream';
import del from 'del';
import config from '../../config.json';
import "babel-polyfill";

export const generateImages = () =>
  src(config.imgSetting.src)
    .pipe(cache('generateImages'))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ], {
      verbose: true
    }))
    .pipe(dest(config.imgSetting.dist))

export const generateSprite = () => {
  var opts = {
    spritesmith: function (options, sprite, icons) {
      options.imgPath = `../img/${options.imgName}`;
      options.cssName = `_${sprite}.scss`;
      options.cssTemplate = `./src/css/sprites-data/spritesmith-mixins.handlebars`
      options.cssSpritesheetName = sprite;
      options.padding = 4;
      options.algorithm = 'binary-tree';
      return options;
    }
  };
  var spriteData = src('./src/img/sprites/**/*.png').pipe(spritesmith(opts)).on('error', function (err) {
    console.log(err);
  });

  var imgStream = spriteData.img
    .pipe(vinylBuffer())
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 5 }),
    ], {
      verbose: true
    }))
    .pipe(dest('./dist/img/'));
  var cssStream = spriteData.css.pipe(dest('./src/css/sprites-data'));

  return merge(imgStream, cssStream);
}

const getFolders = (dir) => {
  let result = [];
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  } else if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    result = fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
  }
  return result;
}


