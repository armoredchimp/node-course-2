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
  .then((con) => {
    console.log(con.connections);
    console.log('Moo! DB connected');
  });

app.listen(port, () => {
  console.log(`Moo! App is running on port ${port}...`);
});
