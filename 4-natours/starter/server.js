const app = require('./app');

const port = 6000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
