import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee-management-system-react-node-mysql_code-with-yousaf'
})

con.connect((err) => {
    if (err) {
        console.log("Error connecting to database", err);
    }else {
        console.log('Connected to database');
    }
})

export default con;