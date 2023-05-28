import { mysql } from '.node_modules/mysql2';

// Creating a connection
const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'tdtnrpiwizp969o20t7k',
  password: 'pscale_pw_uakKvT7iuW38yl56fpzTcuYJujAvx7KNlyo289knU8B',
  database: 'wealthcrafters',
  ssl: { rejectUnauthorized: true },
  multipleStatements: true,
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Perform database operations
  // Queries have to be executed individually because of mysql2 requirements
  const createExpensesTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    username TEXT,
    password_hash TEXT
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    amount FLOAT NOT NULL,
    created_at DATETIME,
    created_by INT,
    KEY users_id_idx (created_by) 
  );

  CREATE TABLE IF NOT EXISTS income (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    amount FLOAT NOT NULL,
    created_at DATETIME,
    created_by INT,
    KEY users_id_idx (created_by) 
  );
`;

connection.query(createExpensesTableQuery, (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }

  console.log('Expenses table created successfully');
  connection.end(); // Closing the connection
});
});