const SERVER_PORT = 3000;
const app = require('express')();

app.get('/', require('./functions'));

app.listen(SERVER_PORT, () => console.log(`Server runs at http://localhost:${SERVER_PORT}`));
