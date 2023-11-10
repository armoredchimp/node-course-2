require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 8000;

// console.log(app.get('env')) //development

// console.log(process.env);

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
