// DEBUG=cvdev-sandbox2:* npm start

// implementing configuration
/*var nconf = require('nconf');
nconf.argv()
   .env()
   .file({ file: './db.json' })
   .set('rootpath',__dirname);
//*/
// modules
var express = require('express'),
  i18n = require("i18n"),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  session = require('express-session'),
  config = require ('./webpack.config.js'),
  cssModulesRequireHook = require ( 'css-modules-require-hook'),
  webpack = require ( 'webpack'),
  webpackDevMiddleware = require ( 'webpack-dev-middleware'),
  webpackHotMiddleware = require ( 'webpack-hot-middleware');

cssModulesRequireHook({generateScopedName: '[path][name]-[local]'});

const compiler = webpack(config),
  isDeveloping = process.env.NODE_ENV !== 'production',
  port = isDeveloping ? 3000 : process.env.PORT;




// implementing routes
var routes   = require ('./routes/index'),
  api   = require ('./routes/api');
  admin   = require ('./routes/admin')
  init = require ('./routes/init');
  

i18n.configure({
  locales:['en'],
  directory: __dirname + '/locales',
  extension: '.json'
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
  }));
app.use(passport.initialize());

app.use('/', routes);
app.use('/api',api);
app.use('/admin',admin);
app.use('/init',init);

// Serve hot-reloading bundle to client
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath, stats: { colors: true } 
}));
app.use(webpackHotMiddleware(compiler));


// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]adminclient[\/\\]/.test(id)) delete require.cache[id];
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
