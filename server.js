// // Setup basic express server
// var express = require('express');
// var app = express();
// var path = require('path');
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// var port = process.env.PORT || 3000;
//
// app.set('view engine', 'html');
// server.listen(port, function () {
//     console.log('Server listening at port %d', port);
// });
//
// // Routing
// // app.get('/', function (req, res) {
// //     console.log("Hi");
// //     res.sendfile(__dirname, + '/index.html');
// // });
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.route('/').get(todoList.showHomePage);
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var io = require('socket.io')(http);
var formidable = require('formidable');
var fs = require('fs');
var XLSX = require('xlsx');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

//Routing upload, write and show excel file
app.post('/upload', function (req, res) {

    var form = formidable.IncomingForm();
    // parse a file upload
    form.parse(req, function (err, fields, files) {
        // console.log(files);
        var olgPath = files.fileToUpload.path;
        var fileName = files.fileToUpload.name;
        var newPath = 'download/' + fileName;
        // write file to directory
        fs.rename(olgPath, newPath, function (err) {
            if (err) res.redirect('/');
            console.log('file ' + fileName + ' is saved');
        });
        // export path file
        module.exports.pathFile = newPath;
        res.redirect('/read_file');
    });
});

app.get('/read_file', function (req, res) {
    // To '/' page redirect button
    var allData = [];
    // import path file
    var path = module.exports.pathFile;
    // parse file to workbook
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function (y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        for (z in worksheet) {
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            var col = z.substring(0, 1);
            var row = parseInt(z.substring(1));
            var value = worksheet[z].v;
            //store header names
            if (row === 1) {
                headers[col] = value;
                continue;
            }
            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        allData.push(data);
    });
    module.exports.data = allData;
    res.redirect('/show_table');
});

app.get('/show_table', function (req, res) {
    var respBody = '<a href="/">to main page</a>';
    var allData = module.exports.data;
    for (var i = 0; i < allData.length; i++) {
        // create every table for every sheet
        respBody += '<table border="1" style="padding: 5px" ><tr>';
        if (allData[i][0] !== undefined) {
            // get keys from first object and write as head table
            var objKeys = Object.keys(allData[i][0]);
            for (let key of objKeys) {
                respBody += '<th>' + key + '</th>';
            }
            respBody += '</tr>';
        }
        // get body table
        for (let obj of allData[i]) {
            var inf = obj;
            if (inf !== undefined) {
                var keys = Object.keys(inf);
                respBody += '<tr>';
                for (let key of keys) {
                    // console.log('Key: ' + key);
                    respBody += '<td>' + inf[key] + '</td>';
                    // console.log('Value: ' + inf[key]);
                }
                respBody += '</tr>';
            }
        }
        respBody += '</table>';
    }
    res.header("Content-Type", "text/html; charset=utf-8");
    res.write(respBody, 'UTF-8');
    res.end();
});

//Sockets chat message
io.on('connection', function (socket) {

    //User connected
    console.log('a user connected');

    //Get chat message
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });

    //User disconnect
    socket.on('disconnect', function () {
        console.log('user disconnect')
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

