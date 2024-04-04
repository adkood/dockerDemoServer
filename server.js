//for environment variables
const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const socketIO = require('socket.io');

// --------handling uncaughtException---------

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION!, Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

dotenv.config();

const db = require('./db');

const GlobalErrorHandler = require('./src/controllers/ErrorController');

const AuthRouter = require('./src/routes/AuthRoutes');
const UserRouter = require('./src/routes/UserRoutes');
const BookRouter = require('./src/routes/BookRoutes');
const AppError = require('./src/utils/AppError');

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));

db();


app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Mounting Auth Router
app.use('/api', AuthRouter);
app.use('/api', UserRouter)
app.use('/api', BookRouter);

// handling non-initialized route
app.all('*', (req, res, next) => {
    next(new AppError(404, "wrong route!"));
});

app.use(GlobalErrorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})


// ---------handling promise rejection------------ 

// process.on('unhandledRejection', err => {
//     console.log(err.name, err.message);
//     console.log('UNHANDLED REJECTION, Shutting down...');
//     server.close(() => {
//         process.exit(1);
//     });
// });

// handling socket-io

// io.on('connection', (socket) => {
//     console.log('New connection');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     })
// })