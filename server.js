const express = require('express');
const app = express();

const SERVER_PORT = 3000;

app.get('/', require('./functions'));

app.listen(SERVER_PORT, () => console.log(`Server runs at http://localhost:${SERVER_PORT}`));
