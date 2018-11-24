const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Creating a new server
const server = express();
const DB = './db.json';

server.use(bodyParser.json({
  extended: true
}));

server.use((req, res, next) => {
  console.log("Getting request", req.method, req.originalUrl);
  next();
});

server.use('/api', (req, res, next) => {
  res.locals.db = JSON.parse(fs.readFileSync(DB).toString());
  next()
})


server.get('/api/v1/items', (req, res) => {
  res.json(res.locals.db);
});


server.post('/api/v1/items', (req, res) => {
  // Implement adding an ID to the new object
  const data = res.locals.db;
  data.lists.shopping.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(data));
  res.send('ok');
});


server.get('/api/v1/items/:id', (req, res) => {
  console.log(req.params.id);
  res.send('TODO');
});

server.put('/api/v1/items/:id', (req, res) => {
  console.log(req.params.id);
  res.send('TODO');
});

server.delete('/api/v1/items/:id', (req, res) => {
  console.log(req.params.id);
  res.send('TODO');
});

server.listen(3000);
console.log('Server is running on port 3000');
