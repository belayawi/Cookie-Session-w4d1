const express = require('express');
const path = require('path');

const session = require('express-session');

const app = express();

const date = new Date();
const hour = date.getHours();
console.log('hour is ', hour);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(
  session({
    secret: 'Express version',
    saveUninitialized: false,
    resave: false,
  })
);

app.get('/', (req, res) => {
  res.render('index', { hour: hour });
});

app.get('/output', (req, res) => {
  let name = req.session.name;
  let age = req.session.age;
  console.log( name, age);

  if (!name && !age) {
    name = 'person';
    age = 20;
  }
  res.send(`Welcome ${name} I am ${age} years old`);
});

app.post('/output', (req, res) => {
  req.session.name=req.body.name;
  req.session.age=req.body.age;
  res.redirect(`/output`);
  // res.redirect(`/output?name=${name}&age=${age}`);
});

app.listen(3000, () => {
  console.log('Listening at the port 300');
});
