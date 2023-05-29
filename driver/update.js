import { createConnection } from 'mysql2';

// Creating a connection
const connection = createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'tdtnrpiwizp969o20t7k',
  password: 'pscale_pw_uakKvT7iuW38yl56fpzTcuYJujAvx7KNlyo289knU8B',
  database: 'wealthcrafters',
  ssl: { rejectUnauthorized: true },
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Perform database operation
  const updateQuery = `UPDATE users SET email = 'newemail@example.com' WHERE id = 1`;

  connection.query(updateQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Update query executed successfully:', updateQuery);

    // Closing the connection
    connection.end();
  });
});