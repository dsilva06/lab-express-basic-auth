// ℹ️ Gets access to environment variables/settings

require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)

const express = require('express');

// Handles the handlebars

const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index.routes');
const users = require('./routes/users.routes');

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 600000,
      },
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost/signup-test",
        ttl: 600000,
      }),
    })
  );



app.use('/', index);
app.use('/users', users);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

