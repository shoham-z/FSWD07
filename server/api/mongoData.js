const mysql = require('mysql2');
const axios = require('axios');

const con = mysql.createConnection({
    host: "http://bcrjamgqfdlxvyaek43l-mysql.services.clever-cloud.com",
    user: "ubadfxfo15rh2knb",
    password: "KWJDzPibMvcHzd12JjHj",
    database: "bcrjamgqfdlxvyaek43l"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "CREATE TABLE users (phone VARCHAR(255) PRIMARY KEY, name VARCHAR(255), userName VARCHAR(255), password VARCHAR(255), email VARCHAR(255), country VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      con.end()
    });
  });

  .post("/register", (req, res) => {
    const {
      username,
      password,
      name,
      email,
      phone,
      address,
      website,
      company
    } = req.body;
  
    const insertUserQuery = `INSERT INTO users (phone,name,username, password, email, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [username, password, name, email, phone, address, website, company];
    con.connect(function (err) {
      if (err) throw err;
      // console.log("Connected!");
    });
    con.query(insertUserQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log('User registered successfully');
        res.json({ message: "User registered successfully" });
      }
    });
  });

async function getUsername(username) {
    con.connect(function (err) {
        if (err) throw err;
        
        // console.log("Connected!");
    
        const sql = `SELECT * FROM passwords AS p JOIN users AS u ON p.userId = u.id WHERE u.userName = '${username}' AND p.password = '${password}'`;
    
        con.query(sql, function (err, results, fields) {
          if (err) throw err;
          // console.log("query done");
          return results[0];
        });
      });
}



//   const insertUsersData = (data) => {
//     const query = 'INSERT INTO users (id, name, userName, phone, email, address, website, company) VALUES ?';
//     const values = data.map(item => {
//       const { id, name, username, email, phone, website, address, company } = item;
//       return [id, name, username, phone, email, address.street + address.suite + address.city, website, company.name];
//     });

//     con.query(query, [values], (error, results) => {
//       if (error) {
//         console.error('Error inserting data into table:', error);
//       } else {
//         console.log('Data inserted successfully');
//       }
//     });
//   };

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE users (id INT  PRIMARY KEY, name VARCHAR(255), userName VARCHAR(255), email VARCHAR(255), address VARCHAR(255), website VARCHAR(255), company VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "CREATE TABLE privetChats (userId VARCHAR (255), userId VARCHAR (255), messageID INT)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");

    //   axios.get('https://jsonplaceholder.typicode.com/todos')
    //     .then(response => {
    //       const data = response.data;
    //       insertTodosData(data);
    //       con.end(); // Close the connection after the data insertion is complete
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data from API:', error);
    //       con.end(); // Close the connection in case of an error
    //     });
    });
  });

//   const insertTodosData = (data) => {
//     const query = 'INSERT INTO todos (userId, id, title, completed) VALUES ?';
//     const values = data.map(item => {
//       const { userId, id, title, completed } = item;
//       return [userId, id, title, completed];
//     });

//     con.query(query, [values], (error, results) => {
//       if (error) {
//         console.error('Error inserting data into table:', error);
//       } else {
//         console.log('Data inserted successfully');
//       }
//     });
//   };

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "CREATE TABLE chats (messageID INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR (255), userID INT, time TIME)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");

    //   axios.get('https://jsonplaceholder.typicode.com/posts')
    //     .then(response => {
    //       const data = response.data;
    //       insertPostsData(data);
    //       con.end(); // Close the connection after the data insertion is complete
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data from API:', error);
    //       con.end(); // Close the connection in case of an error
    //     });
    });
  });

//   const insertPostsData = (data) => {
//     const query = 'INSERT INTO posts (userId, id, title, body) VALUES ?';
//     const values = data.map(item => {
//       const { userId, id, title, body } = item;
//       return [userId, id, title, body];
//     });

//     con.query(query, [values], (error, results) => {
//       if (error) {
//         console.error('Error inserting data into table:', error);
//       } else {
//         console.log('Data inserted successfully');
//       }
//     });
//   };


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "CREATE TABLE groups (groupId INT AUTO_INCREMENT PRIMARY KEY , adminID INT)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");

    //   axios.get('https://jsonplaceholder.typicode.com/comments')
    //     .then(response => {
    //       const data = response.data;
    //       insertCommentsData(data);
    //       con.end(); // Close the connection after the data insertion is complete
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data from API:', error);
    //       con.end(); // Close the connection in case of an error
    //     });
    });
  });

//   const insertCommentsData = (data) => {
//     const query = 'INSERT INTO comments (postId, id, name, email, body) VALUES ?';
//     const values = data.map(item => {
//       const { postId, id, name, email, body } = item;
//       return [postId, id, name, email, body];
//     });

//     con.query(query, [values], (error, results) => {
//       if (error) {
//         console.error('Error inserting data into table:', error);
//       } else {
//         console.log('Data inserted successfully');
//       }
//     });
//   };


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "CREATE TABLE groupUsers (groupId INT, userID INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");

    // axios.get('https://jsonplaceholder.typicode.com/users')
    //   .then(response => {
    //     const data = response.data;
    //     insertPasswordsData(data);
    //     con.end(); // Close the connection after the data insertion is complete
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data from API:', error);
    //     con.end(); // Close the connection in case of an error
    //   });
  });

});

// const insertPasswordsData = (data) => {
//   const query = 'INSERT INTO passwords (userId, password) VALUES ?';
//   const values = data.map(item => {
//     const { id, address } = item;
//     return [id, address.geo.lat.slice(-4)];
//   });

//   con.query(query, [values], (error, results) => {
//     if (error) {
//       console.error('Error inserting data into table:', error);
//     } else {
//       console.log('Data inserted successfully');
//     }
//   });

//   const grantQuery = `GRANT ALL PRIVILEGES ON project6.passwords TO 'root'@'localhost'`;

//   connection.query(grantQuery, (grantError, grantResults) => {
//       if (grantError) {
//         console.error('Error granting privileges:', grantError);
//       } else {
//         console.log('Access granted to manager user');
//       }
//   });

// };