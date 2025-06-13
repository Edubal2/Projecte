var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Se carga el módulo de sqlite3
var sqlite3 = require('sqlite3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

//se carga el modulo de knex
//se inicializa knex con sqlite3

var db = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: 'database.sqlite'
      },
      useNullAsDefault: true,
    }
);

// USER routes

// movies
// GET
app.get('/api/movies', function(req, res) {
    db.select('m.id','m.title', 'm.year', 'm.director', 'm.box_office', 'm.image')
        .from('movies as m')
        .then(function(data) {
            result = {}
            result.movies=data;
            res.json(result);
        }).catch(function (error) {
        console.log(error)
    });
});

//Selection by id
app.get('/api/movies/:id', function(req, res) {
    let id = parseInt(req.params.id);
    db.select('m.id','m.title', 'm.year', 'm.director', 'm.box_office',  'm.image')
        .from('movies as m')
        .where('m.id', id)
        .then(function(data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// DELETE
app.delete('/api/movies/:id', function (req, res) {

    // Como es un string lo convertimos en entero
    let id = parseInt(req.params.id);
    console.log('WILL DELETE' + id);

    db.delete()
        .from('movies')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// ADD
app.post('/api/movies', function (req, res) {

    let data_form = req.body;
    console.log('app.je app.post(). Params:', data_form)

    db.insert(data_form)
        .into('movies')
        .then(function (data) {

            res.json(data)
            console.log(data)
        }).catch(function (error) {
        console.log(error)
    });

});
// Modify
app.post('/api/movies/:id', function (req, res) {
    let id = req.params.id;
    let movieData = req.body;

    db('movies')
        .update(movieData)
        .where('id', id)
        .then(function (data) {
            res.json(data)
        })
        .catch(function (error) {
            logger.error('ERROR:', error);
        })
});


// actors
// GET
app.get('/api/actors', function(req, res) {
    db.select('a.id','m.title','a.name', 'a.nationality', 'a.birth_date', 'a.height', 'a.awards', 'a.social_networks', 'a.image' )
        .from('actors as a')
        .join('movies as m', 'a.movies_id', 'm.id')
        .then(function(data) {
            result = {}
            result.actors=data;
            res.json(result);
        }).catch(function (error) {
        console.log(error)
    });
});
//Selection by id
app.get('/api/actors/:id', function(req, res) {
    let id = parseInt(req.params.id);
    db.select('a.id', 'a.movies_id', 'a.name', 'a.nationality', 'a.birth_date', 'a.height', 'a.awards', 'a.social_networks', 'a.image' )
        .from('actors as a')
        .where('a.id', id)
        .then(function(data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});

// DELETE
app.delete('/api/actors/:id', function (req, res) {

    let id = parseInt(req.params.id);
    console.log('WILL DELETE' + id);

    db.delete()
        .from('actors')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// ADD
app.post('/api/actors', function (req, res) {

    let data_form = req.body;
    console.log('app.je app.post(). Params:', data_form)

    db.insert(data_form)
        .into('actors')
        .then(function (data) {

            res.json(data)
            console.log(data)
        }).catch(function (error) {
        console.log(error)
    });
});
// Modify
app.post('/api/actors/:id', function (req, res) {
    let id = req.params.id;
    let actorData = req.body;

    db('actors')
        .update(actorData)
        .where('id', id)
        .then(function (data) {
            res.json(data)
        })
        .catch(function (error) {
            logger.error('ERROR:', error);
        })
});

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

module.exports = app;
