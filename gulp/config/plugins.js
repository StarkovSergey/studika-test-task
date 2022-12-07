import replace from 'gulp-replace'; // поиск и замена
import plumber from 'gulp-plumber'; // обработка ошибок
import notify from 'gulp-notify'; // сообщения (подсказки)
import browsersync from 'browser-sync'; // локальный сервер
import newer from 'gulp-newer'; // проверка обновления
import ifPlugin from 'gulp-if';

export const plugins = {
  replace,
  plumber,
  notify,
  browsersync,
  newer,
  if: ifPlugin,
};
