const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: "1", text: 'Hello, world!', status: 'active' },
  { id: "2", text: 'Pick up groceries', status: 'complete' },
  { id: "3", text: 'Walk Dog', status: 'active'},
  { id: "4", text: 'Eat lunch', status: 'active'}
];

app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});

app.get('/todos', (req, res) => {
  res.json(JSON.stringify(todos));

});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id === parseInt(id);
  });


  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', (req, res) => {
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const id = `${todos.length + 1}`;
  const newTodo = { id, text, status: 'active' };

  todos.push(newTodo);

  res.status(201).json(todos);
});

app.delete('/todos/:id', (request, res) => {
  // res.status(500).send({ message: 'not implemented' });
  // console.log(parseInt(request.params.id));
  // debugger
  // console.log("request", request.params);
  // console.log("res", res);
  console.log("before change", todos);
  const requestId=  request.params.id;
   todos=  todos.filter(todo=>{

    return todo.id !== requestId
  });
  console.log("after change", todos);
  // const index=  todos.indexOf(todo);
  // console.log(index);
  // todos.splice(index, 1);
  // console.log(todos);
  res.json({message: 'todo has been delted', data: todos})
});

app.put('/todos/:id', (request, res) => {
  // res.status(500).send({ message: 'not implemented' });
  //had problems with json, seems to be reading html
  const requestId= request.params.id;
  let todo= todos.filter(todo=>{
    todo.id === requestId
  })[0];
  const index=  todos.indexOf(todo);
  const keys= Object.keys(request.body);
  keys.forEach(key=>{
    todo[key] = request.body[key];
  });
  todos[index] = todo
  res.json(todos[index]);
});

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
