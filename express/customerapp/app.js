var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// var logger = function(req, res, next){
//     console.log('logging...');
//     next();
// }
// app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Body Parser middleware

//Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
})

//Express Validator middleware
app.use(expressValidator({
    errorFormatter:function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(), 
        formParam = root;

        while(namespace.lengthl) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg : msg, 
            value: value
        };
    }
}))



// var people = [
//     {
//     name:'Jeff',
//     age:'30'
// },
// {
//     name:'Mary',
//     age:'28'
// }
// ];

var users = [
    {
        id:'1',
        first_name:'john',
        last_name:'doe',
        email:'jdoe@email.com'
    },
    {
        id:'2',
        first_name:'mary',
        last_name:'smith',
        email:'msmith@email.com'
    },
    {
        id:'3',
        first_name:'kevin',
        last_name:'jones',
        email:'kjones@email.com'
    }
]

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    // res.send('Hello World');
    // res.send('Hello');
    res.render('index' , {
    users: users
    })
});

app.post('/users/add', function(req, res) {
        // console.log(req.body.first_name);
        req.checkBody('first_name','First Name is required').notEmpty();
        req.checkBody('last_name','Last Name is required').notEmpty();
        req.checkBody('email','Email is required').notEmpty();

        var errors = req.validationErrors();
        
    if (errors){
        console.log('ERRORS');
            res.render('index', {
                title:'Customers',
                users:users,
                errors: errors
            });
        } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log("SUCCESS");
    }
});

app.listen(3000, function(){
    console.log('server started on port 3000');
});
