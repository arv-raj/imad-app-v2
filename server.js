var express = require('express'); //Create web server (listen on port and handle http requests)
var morgan = require('morgan'); //Help with output logs
var path = require('path'); //Used to automatically convert URL as path

//var http = require('http');
var Pool = require('pg').Pool;

var config = {
    user: 'arv-raj',
    database: 'arv-raj',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article-One | Arvind',
        heading: 'Article One',
        date: 'Feb 5. 2017',
        content: `<p>
                    This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course.
                 </p>
                 <p>
                    This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course.
                 </p>
                 <p>
                    This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course. This is the content of my first web app under imad course.
                 </p>`
    },
    'article-two': {
        title: 'Article-Two | Arvind',
        heading: 'Article Two',
        date: 'Feb 5. 2017',
        content: `<p>
                    This is the content of my second web app under imad course. 
                 </p>`
    },
    'article-three': {
        title: 'Article-Three | Arvind',
        heading: 'Article Three',
        date: 'Feb 5. 2017',
        content: `<p>
                    This is the content of my third web app under imad course. 
                 </p>`
    }
};

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, intial-scale=1" />
        <link href="ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html>`
    ;
    return htmlTemplate;
}    

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'main.js')); 
});

var Pool = new Pool(config);

app.get('/test-db', function(req, res) {
    Pool.query('SELECT * from test', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result));
      }
    });
});

var counter =0;
app.get('/counter', function (req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names =[];
app.get('/submit-name', function (req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req, res) {
    //Article data object
    Pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function (err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           if(result.rows.length === 0){
               res.status(404).send('Article Not Found');
           }else {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData)); 
           }
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 5432; // Use 8080 for local development because you might already have apache running on 80
app.listen(5432, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
