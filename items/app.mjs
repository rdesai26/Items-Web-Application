import createError from 'http-errors';
import express from 'express';
import hbs from 'hbs';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import indexRouter from './routes/index.mjs';
import itemsRouter from './routes/items.mjs';
import {router as usersRouter, initPassport} from './routes/users.mjs';
import apiRouter from './routes/api.mjs';
import bodyParser from 'body-parser';
import flash from 'req-flash';



const __dirname = path.resolve();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(logger('dev'));
app.use((bodyParser).urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard mouse',
  resave: true,
  saveUninitialized: true,
  name: 'itemscookie'
}));
app.use(flash());
flash({ locals: 'flash' });
initPassport(app);

app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});


app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

hbs.registerHelper('isdefined', function (value) {
  return value !== undefined;
});
export default app;
