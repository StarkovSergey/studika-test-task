import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

import cleanCss from 'gulp-clean-css'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import minmax from 'postcss-media-minmax'

const sass = gulpSass(dartSass)

export const scss = () => app.gulp.src(app.path.src.scss, { sourcemaps: true }) // app.isDev
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: 'SCSS',
      message: 'Error: <%= error.message %>',
    }),
  ))
  .pipe(app.plugins.replace(/@img\//g, '../img/'))
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .pipe(postcss([
    autoprefixer(),
    minmax(),
  ]))
  .pipe(app.gulp.dest(app.path.build.css))
  .pipe(cleanCss())
  .pipe(rename({
    extname: '.min.css',
  }))
  .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: '.' }))
  .pipe(app.plugins.browsersync.stream())
