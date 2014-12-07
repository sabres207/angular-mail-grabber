var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    http = require('http'),
    fs = require('fs');

process.__defineGetter__('stdout', function() { return fs.createWriteStream(__dirname + '/out.log', {flags:'a'}) })

var app = express();

app.use(express.static(path.normalize(__dirname + '/..')));
app.use(express.static(__dirname));

app.set('port', process.argv[2] || 80);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/urlcontent', function(request, response) {
    var data = '';
    console.log(request.body.url);
    http.get(request.body.url, function(res) {
        console.log(res);
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        response.status(500);
    }).on('data', function(chunk) {
        data += chunk;
        console.log('im in data');
    }).on('end', function() {
        response.json(200, res);
        console.log('im in end');
    });
/*    console.log(request);
    response.send('hey');*/
});

app.all("/*")
    .get(function(req, res) {
    res.sendfile("index.html");
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});