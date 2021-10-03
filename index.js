const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

// Init middleware
// app.use(logger)

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Route
app.use('/api/members', require('./routes/api/members'))

//testing the route
// app.get('/', (req, res)=>{
//     // res.send("<h1>Hello World!! How are you??</h1>")
// })

const PORT = process.env.PORT || 5000;
app.listen(5000, ()=> {console.log(`listening at port ${PORT}`)});