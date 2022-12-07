import gulp from 'gulp';
import { path } from './gulp/config/path.js'; // импорт путей
import { plugins } from './gulp/config/plugins.js';

// импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { fonts } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/svg-sprite.js'; // импорт общих плагинов

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
};

// наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy); // за какими файлами следить, что нужно сделать
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { sprite }; // будем отдельно запускать эту задачу

// основные задачи
const mainTasks = gulp.parallel(copy, html, scss, js, images, fonts);

// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// экспорт сценариев
export { dev };
export { build };

// выполнение сценария по умолчанию
gulp.task('default', dev);
