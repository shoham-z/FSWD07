const express = require('express');
const path = require('path');
const cors = require('cors');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pfpRouter = require('./routes/pfp');
const messagesRouter = require('./routes/messages');
const contactsRouter = require('./routes/contacts');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const chatRouter = require('./routes/chat');
const {
    init_db,
    addMessage,
    getMessages,
    getChats,
    getUser,
    changPassword,
    deleteUser,
    deleteFromContacts,
    deleteFromMessages,
    getUserContacts
} = require("./dbBridge");

const app = express();

app.set('view engine', 'ejs');
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/users', usersRouter);
app.use('/api/pfp', pfpRouter);
app.use('/api/chats', chatRouter);

//init_db()
// const userPhone = "1111111111";
// getAllChats(userPhone)
//   .then((result) => {
//     console.log(result);
//     // Process the result here
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//const contact = { phone : "6666666666"}
//addMessage('1111111111',contact.phone,"hi my name is yehuda",'2023-07-19 18:30:00')
// getMessages('4442225555','0546457095')
// getUser('shoham')
// changPassword('0546457095','22')
// getContacts()
// getChats('4442225555')
// deleteFromContacts('0546457095')
// deleteFromMessages('0546457095')
// deleteUser('0546457095')
// getUserContacts('0587654321')
module.exports = app;
