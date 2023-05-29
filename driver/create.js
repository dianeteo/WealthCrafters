const mysql = require('mysql2');

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
  const insertStatements = `
    -- Insert into Expenses table
    INSERT INTO expenses (id, description, amount, created_at, created_by) VALUES (2, 'food', 5, NOW(), 2);
  `;

  connection.query(insertStatements, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Query executed successfully:', insertStatements);
  });

  // Closing the connection
  connection.end();
});