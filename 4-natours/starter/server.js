const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 8000;

const db = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('Moo! DB connected');
  });

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION! Terminating in 3..2..1..');
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`Moo! App is running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION! Terminating in 3..2..1..');
  server.close(() => {
    process.exit(1);
  });
});
