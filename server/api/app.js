const express = require('express');
const path = require('path');
const cors = require('cors');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pfpRouter = require('./routes/pfp');
const contactsRouter = require('./routes/contacts');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const {init_db} = require("./dbBridge");

const app = express();

app.set('view engine', 'ejs');
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/users', usersRouter);
app.use('/api/pfp', pfpRouter);

//init_db()
const userPhone = "1111111111";
getAllChats(userPhone)
  .then((result) => {
    console.log(result);
    // Process the result here
  })
  .catch((error) => {
    console.error(error);
  });
module.exports = app;
