let express = require('express');
let app = express();
let cors = require('cors');
let mysql = require('mysql2');

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dbpassword',
  database: 'classschedule',
});

con.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + con.threadId);
});

app.use(cors());

let port = process.env.PORT || 8080;

let bodyParser = require('body-parser');

//create application/json parser
let jsonParser = bodyParser.json();

// create application/ x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world from express 2');
});

app.listen(port, () => {
  console.log(`this app listening on port ${port}`);
});

app.get('/api/users', (req, res) => {
  const userId = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    userId: userId,
    token: token,
    geo: geo,
  });
});

app.get('/api/:classnumber', (req, res) => {
  res.send(`your class number is ${req.params.classnumber}`);
});

app.param('name', (req, res, next, name) => {
  const modified = name.toUpperCase();

  req.name = modified;
  next();
});

app.get('/api/users/:name', (req, res) => {
  res.send(`Hello ${req.name}!`);
});

app.post('/api/users', (req, res) => {
  let userId = req.body.id;
  let token = req.body.token;
  let geo = req.body.geo;

  res.send({
    userId: userId,
    token: token,
    geography: geo,
  });
});

app.get('/subject', (req, res) => {
  con.query('SELECT * FROM subject', function (err, result, fields) {
    if (err) {
      throw err;
    }

    console.log(result);
    res.send(result);
  });
});
