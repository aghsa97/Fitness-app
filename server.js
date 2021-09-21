var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const routes = require('./routes/routes');

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', function(request, response) {
    if(request.session.loggedin){
        response.redirect('/home'); 
    } else{
        response.render(path.join(__dirname, "/views/sharedViews/startPage"))
    }
});

app.use((request, result) => {
    result.status(404).render(path.join(__dirname, "/views/sharedViews/404"),  { title: '404' });
});

app.listen(3000);