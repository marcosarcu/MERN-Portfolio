import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import adminRouter from './routes/admin.js';
import projectsApiRouter from './api/routes/projects.api.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/', projectsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (!(req.url.startsWith('/api'))) {
    next(createError(404));
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: `Error ${err.status}`});
});

let port = 3000;

app.listen(port, () => {
  console.log(`App abierta en puerto ${port}`)
})

export default app;

