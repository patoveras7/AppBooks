const express = require('express');
const app = express();
const port = 3000;

const route = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');


app.use(express.json());
app.use('/books',route);
app.use(errorHandler);




app.listen(port, () => { 
    console.log(`Servidor Express.js en funcionamiento con puerto en ${port}`)
    }); 
    
