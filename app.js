var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Se carga el módulo de sqlite3

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);


//conexion a mongodb
let dbURL = 'mongodb+srv://edubal:edubal@cluster0.vmirken.mongodb.net/Projecte?retryWrites=true&w=majority&appName=Cluster0'

const db = require('monk')(dbURL)

const movies = db.get('movies');
const actors = db.get('actors');

// USER routes

// movies
// GET
app.get('/api/movies', function (req, res) {
    movies.find({})
        .then(function (data) {
            result = {}
            result.movies = data;
            res.json(result);
        }).catch(function (error) {
        console.log(error)
    });
});
//Selection by id
app.get('/api/movies/:_id', function (req, res) {
    let _id = req.params._id;
    movies.find({'_id': _id})
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// DELETE
app.delete('/api/movies/:_id', function (req, res) {

    // Como es un string lo convertimos en entero
    let _id = req.params._id;
    let filter = {'_id': _id}

    movies.remove(filter)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// ADD
app.post('/api/movies', function (req, res) {

    let data_form = req.body;

    movies.insert(data_form)
        .then(function (data) {
            res.json(data)
            console.log(data)
        }).catch(function (error) {
        console.log(error)
    });

});
// Modify
app.post('/api/movies/:_id', function (req, res) {
    let _id = req.params._id;
    let data_form = req.body;
    let filter = {'_id': _id}

    movies.update(filter, {$set: data_form})
        .then(function (data) {
            res.json(data)
        })
        .catch(function (error) {
            logger.error('ERROR:', error);
        })
});

// actors
// GET
app.get('/api/actors', function (req, res) {

    actors.find({})
        .then(function (data) {
            result = {}
            result.actors = data;
            res.json(result);
        }).catch(function (error) {
        console.log(error)
    });
});
//Selection by id
app.get('/api/actors/:_id', function (req, res) {
    let _id = req.params._id;
    actors.find({'_id': _id})
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// DELETE
app.delete('/api/actors/:_id', function (req, res) {

    let _id = req.params._id;
    let filter = {'_id': _id}

    actors.remove(filter)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
// ADD
app.post('/api/actors', function (req, res) {

    let data_form = req.body;

    actors.insert(data_form)
        .then(function (data) {

            res.json(data)
            console.log(data)
        }).catch(function (error) {
        console.log(error)
    });
});
// Modify
app.post('/api/actors/:_id', function (req, res) {
    let _id = req.params._id;
    let data_form = req.body;
    let filter = {'_id': _id}

    actors.update(filter, {$set: data_form})
        .then(function (data) {
            res.json(data)
        })
        .catch(function (error) {
            logger.error('ERROR:', error);
        })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
