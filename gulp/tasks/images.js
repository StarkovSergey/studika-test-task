import imagemin from 'gulp-imagemin';

export const images = () => app.gulp.src(app.path.src.images)
  .pipe(app.plugins.plumber(
  ))
  .pipe(app.plugins.newer(app.path.build.images))
  .pipe(
    app.plugins.if(
      app.isBuild,
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0 to 7
      }),
    ),
  )
  .pipe(app.gulp.dest(app.path.build.images))
  .pipe(app.gulp.src(app.path.src.svg))
  .pipe(app.gulp.dest(app.path.build.images))
  .pipe(app.plugins.browsersync.stream());
