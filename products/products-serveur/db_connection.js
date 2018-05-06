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