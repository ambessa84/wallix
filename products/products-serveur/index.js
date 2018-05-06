const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'react_sql'
});

connection.connect(err => {
	if (err) {
		return err;
	}
});

app.use(cors());

app.get('/', (req, res) => {
	res.send('go to products to see all the products.');
});

app.get('/logs', (request, response) => {
	const data = [];
	let index = 0;
	function readFiles(dirname, onFileContent, onError) {
	  fs.readdir(dirname, function(err, filenames) {
		if (err) {
		  onError(err);
		  return;
		}
		filenames.forEach(function(filename) {
		  fs.readFile(dirname + filename, 'utf-8', function(err, content) {
			if (err) {
			  onError(err);
			  return;
			}
			const obj = {
				index: index,
				name: filename,
				content
			}
			data.push(obj);
			index++;
			onFileContent(filename, content);
		  });
		});
	  });
	}
	
	readFiles('./assets/logs/', function(filename, content) {
	  response.send(data);
	}, function(err) {
	  throw err;
	});
});

app.get('/sql/query-1', function(request, response){
	let numberOfFiles = 0;
    const data = request.body;
    const path = './assets/sql/query-1.sql';
	const dir = './assets/logs/';
    const callback = function(arg){
        const query = arg.replace(/{{[ ]{0,2}([a-zA-Z0-9\.\_\-]*)[ ]{0,2}}}/g, function(str, mch){ return data[mch]});
        connection.query(query, function(err, rows){
            if (!err){
                response.send(rows);
            } else {
                console.log(err);
                response.send({error: err, query: query});
            }
        });
    };
	
	fs.readdir(dir, (err, files) => {
	  numberOfFiles = files.length;
	});

    fs.readFile(path, 'utf8', function(err, data){
        if (!err){
            callback(data);
			createLogFile(data);
        } else {
            callback(err);
        }
    });
	
	const createLogFile = function (arg) {
		fs.writeFile(dir + 'log-' + (numberOfFiles + 1), arg, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	}
});

app.listen(4000, () => {
	console.log('Server listening on port 4000');
});