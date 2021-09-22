const express = require('express')
const path = require('path')
const app = express();
const port = 7090


app.get('/index.js', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.js')));
app.get('/*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})