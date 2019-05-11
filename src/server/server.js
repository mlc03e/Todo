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
  // console.log("before change", todos);
  const requestId=  request.params.id;
  todos=  todos.filter(todo=>{
    return todo.id !== requestId
  });
  // console.log("after change", todos);
  res.json({message: 'todo has been delted', data: todos})
});

app.put('/todos/:id', (request, res) => {
  // res.status(500).send({ message: 'not implemented' });
  // const requestId= request.params.id;
  // console.log(request.body.data[0].status);
  const todoStatus=request.body.data[0].status
    res.json({todoStatus: 'complete'})

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
