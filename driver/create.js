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
    -- Insert into User table
    INSERT INTO users (id, email, username, password_hash) VALUES (1, 'user1@example.com', 'user1', 'hash1');

    -- Insert into Expenses table
    INSERT INTO expenses (id, description, amount, created_at, created_by) VALUES (1, 'food', 100, NOW(), 1);

    -- Insert into Income table
    INSERT INTO income (id, description, amount, created_at, created_by) VALUES (1, 'stocks', 100, NOW(), 1);
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
