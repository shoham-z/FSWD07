const mysql = require("mysql2");
const util = require('util');
const axios = require("axios");

const con = mysql.createConnection({
    host: "bcrjamgqfdlxvyaek43l-mysql.services.clever-cloud.com",
    user: "ubadfxfo15rh2knb",
    password: "KWJDzPibMvcHzd12JjHj",
    database: "bcrjamgqfdlxvyaek43l",
});

const queryPromise = util.promisify(con.query).bind(con);

function init_db() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        let sql =
            "DELETE TABLE users";
        con.query(sql, function (err, result) {
            if (err) console.log('the table users already exist');
            console.log("users Table delete");
        });
        sql =
            "DELETE TABLE contacts";
        con.query(sql, function (err, result) {
            if (err) console.log('the table contacts already exist');
            console.log("users Table delete");
        });
        sql =
            "CREATE TABLE users (phone VARCHAR(255) PRIMARY KEY, name VARCHAR(255), userName VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) console.log('the table users already exist');
            console.log("users Table created");
        });
        sql =
            "CREATE TABLE contacts (phone1 VARCHAR(255) , phone2 VARCHAR(255) ,FOREIGN KEY (phone1) REFERENCES users(phone),FOREIGN KEY (phone2) REFERENCES users(phone), name VARCHAR(255))";
        //TODO create the rest of the tables
        con.query(sql, function (err, result) {
            if (err) console.log('the table contacts already exist');
            console.log("contact table created");
        });
    });

    addDemoUsers();
}

function addDemoUsers() {
    console.log("starting to add demo user to table")
    const sql = "INSERT INTO users (phone, name, userName, password, email)\n" +
        "    VALUES\n" +
        "    ('1234567890', 'John Doe', 'john_doe', 'password123', 'john.doe@example.com'),\n" +
        "        ('9876543210', 'Jane Smith', 'jane_smith', 'pass123word', 'jane.smith@example.com'),\n" +
        "        ('5555555555', 'Michael Johnson', 'michael_johnson', 'michael123', 'michael.johnson@example.com'),\n" +
        "        ('1111111111', 'Emily Wilson', 'emily_wilson', 'wilson456', 'emily.wilson@example.com'),\n" +
        "        ('9998887777', 'William Brown', 'william_brown', 'brown789', 'william.brown@example.com'),\n" +
        "        ('4443332222', 'Olivia Lee', 'olivia_lee', 'olivia123', 'olivia.lee@example.com'),\n" +
        "        ('6666666666', 'James Kim', 'james_kim', 'kim456', 'james.kim@example.com'),\n" +
        "        ('7777777777', 'Sophia Davis', 'sophia_davis', 'davis789', 'sophia.davis@example.com'),\n" +
        "        ('2222222222', 'Benjamin Rodriguez', 'benjamin_rodriguez', 'benjamin123', 'benjamin.rodriguez@example.com'),\n" +
        "        ('8888888888', 'Isabella Martinez', 'isabella_martinez', 'martinez789', 'isabella.martinez@example.com'),\n" +
        "        ('5554443333', 'Alexander Miller', 'alexander_miller', 'alexander123', 'alexander.miller@example.com'),\n" +
        "        ('4444444444', 'Emma Wilson', 'emma_wilson', 'emma456', 'emma.wilson@example.com'),\n" +
        "        ('7778889999', 'Michael Johnson', 'michael_johnson2', 'johnson456', 'michael.johnson2@example.com'),\n" +
        "        ('2221113333', 'Mia Thompson', 'mia_thompson', 'mia123', 'mia.thompson@example.com'),\n" +
        "        ('1112223333', 'Ethan Wilson', 'ethan_wilson', 'ethan456', 'ethan.wilson@example.com'),\n" +
        "        ('9991112222', 'Olivia Johnson', 'olivia_johnson', 'olivia123', 'olivia.johnson@example.com'),\n" +
        "        ('6664448888', 'William Wilson', 'william_wilson', 'william456', 'william.wilson@example.com'),\n" +
        "        ('5551118888', 'Sophia Brown', 'sophia_brown', 'sophia123', 'sophia.brown@example.com'),\n" +
        "        ('7776663333', 'James Smith', 'james_smith2', 'james456', 'james.smith2@example.com'),\n" +
        "        ('4442225555', 'Ava Johnson', 'ava_johnson', 'ava123', 'ava.johnson@example.com');";

    con.connect(function (err) {
        con.query(sql, function (err, result) {
            if (err) console.log('the table already exist');
            console.log("users added successfully");
        });
    });
}

//   // server.post("/register", (req, res) => {
//   //   const {
//   //     username,
//   //     password,
//   //     name,
//   //     email,
//   //     phone,
//   //     address,
//   //     website,
//   //     company
//   //   } = req.body;
//   //
//   //   const insertUserQuery = `INSERT INTO users (phone,name,username, password, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//   //   const values = [username, password, name, email, phone, address, website, company];
//   //   con.connect(function (err) {
//   //     if (err) throw err;
//   //     // console.log("Connected!");
//   //   });
//   //   con.query(insertUserQuery, values, (err, result) => {
//   //     if (err) {
//   //       console.error(err);
//   //       res.status(500).json({ error: "Internal server error" });
//   //     } else {
//   //       console.log('User registered successfully');
//   //       res.json({ message: "User registered successfully" });
//   //     }
//   //   });
//   // });

// async function getUsername(username) {
//     con.connect(function (err) {
//         if (err) throw err;

//         // console.log("Connected!");

//         const sql = `SELECT * FROM passwords AS p JOIN users AS u ON p.userId = u.id WHERE u.userName = '${username}' AND p.password = '${password}'`;

//         con.query(sql, function (err, results, fields) {
//           if (err) throw err;
//           // console.log("query done");
//           return results[0];
//         });
//       });
// }

// //   const insertUsersData = (data) => {
// //     const query = 'INSERT INTO users (id, name, userName, phone, email, address, website, company) VALUES ?';
// //     const values = data.map(item => {
// //       const { id, name, username, email, phone, website, address, company } = item;
// //       return [id, name, username, phone, email, address.street + address.suite + address.city, website, company.name];
// //     });

// //     con.query(query, [values], (error, results) => {
// //       if (error) {
// //         console.error('Error inserting data into table:', error);
// //       } else {
// //         console.log('Data inserted successfully');
// //       }
// //     });
// //   };

// // con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     var sql = "CREATE TABLE users (id INT  PRIMARY KEY, name VARCHAR(255), userName VARCHAR(255), email VARCHAR(255), address VARCHAR(255), website VARCHAR(255), company VARCHAR(255))";
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log("Table created");
// //     });
// //   });

// // con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     const sql = "CREATE TABLE privetChats (userId VARCHAR (255), userId VARCHAR (255), messageID INT)";
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log("Table created");
// //
// //     //   axios.get('https://jsonplaceholder.typicode.com/todos')
// //     //     .then(response => {
// //     //       const data = response.data;
// //     //       insertTodosData(data);
// //     //       con.end(); // Close the connection after the data insertion is complete
// //     //     })
// //     //     .catch(error => {
// //     //       console.error('Error fetching data from API:', error);
// //     //       con.end(); // Close the connection in case of an error
// //     //     });
// //     });
// //   });

// //   const insertTodosData = (data) => {
// //     const query = 'INSERT INTO todos (userId, id, title, completed) VALUES ?';
// //     const values = data.map(item => {
// //       const { userId, id, title, completed } = item;
// //       return [userId, id, title, completed];
// //     });

// //     con.query(query, [values], (error, results) => {
// //       if (error) {
// //         console.error('Error inserting data into table:', error);
// //       } else {
// //         console.log('Data inserted successfully');
// //       }
// //     });
// //   };

// // con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     const sql = "CREATE TABLE chats (messageID INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR (255), userID INT, time TIME)";
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log("Table created");
// //
// //     //   axios.get('https://jsonplaceholder.typicode.com/posts')
// //     //     .then(response => {
// //     //       const data = response.data;
// //     //       insertPostsData(data);
// //     //       con.end(); // Close the connection after the data insertion is complete
// //     //     })
// //     //     .catch(error => {
// //     //       console.error('Error fetching data from API:', error);
// //     //       con.end(); // Close the connection in case of an error
// //     //     });
// //     });
// //   });

// //   const insertPostsData = (data) => {
// //     const query = 'INSERT INTO posts (userId, id, title, body) VALUES ?';
// //     const values = data.map(item => {
// //       const { userId, id, title, body } = item;
// //       return [userId, id, title, body];
// //     });

// //     con.query(query, [values], (error, results) => {
// //       if (error) {
// //         console.error('Error inserting data into table:', error);
// //       } else {
// //         console.log('Data inserted successfully');
// //       }
// //     });
// //   };

// // con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     const sql = "CREATE TABLE groups (groupId INT AUTO_INCREMENT PRIMARY KEY , adminID INT)";
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log("Table created");
// //
// //     //   axios.get('https://jsonplaceholder.typicode.com/comments')
// //     //     .then(response => {
// //     //       const data = response.data;
// //     //       insertCommentsData(data);
// //     //       con.end(); // Close the connection after the data insertion is complete
// //     //     })
// //     //     .catch(error => {
// //     //       console.error('Error fetching data from API:', error);
// //     //       con.end(); // Close the connection in case of an error
// //     //     });
// //     });
// //   });

// //   const insertCommentsData = (data) => {
// //     const query = 'INSERT INTO comments (postId, id, name, email, body) VALUES ?';
// //     const values = data.map(item => {
// //       const { postId, id, name, email, body } = item;
// //       return [postId, id, name, email, body];
// //     });

// //     con.query(query, [values], (error, results) => {
// //       if (error) {
// //         console.error('Error inserting data into table:', error);
// //       } else {
// //         console.log('Data inserted successfully');
// //       }
// //     });
// //   };

// // con.connect(function(err) {
// //   if (err) throw err;
// //   console.log("Connected!");
// //   const sql = "CREATE TABLE groupUsers (groupId INT, userID INT)";
// //   con.query(sql, function (err, result) {
// //     if (err) throw err;
// //     console.log("Table created");
// //
// //     // axios.get('https://jsonplaceholder.typicode.com/users')
// //     //   .then(response => {
// //     //     const data = response.data;
// //     //     insertPasswordsData(data);
// //     //     con.end(); // Close the connection after the data insertion is complete
// //     //   })
// //     //   .catch(error => {
// //     //     console.error('Error fetching data from API:', error);
// //     //     con.end(); // Close the connection in case of an error
// //     //   });
// //   });
// //
// // });

// // const insertPasswordsData = (data) => {
// //   const query = 'INSERT INTO passwords (userId, password) VALUES ?';
// //   const values = data.map(item => {
// //     const { id, address } = item;
// //     return [id, address.geo.lat.slice(-4)];
// //   });

// //   con.query(query, [values], (error, results) => {
// //     if (error) {
// //       console.error('Error inserting data into table:', error);
// //     } else {
// //       console.log('Data inserted successfully');
// //     }
// //   });

// //   const grantQuery = `GRANT ALL PRIVILEGES ON project6.passwords TO 'root'@'localhost'`;

// //   connection.query(grantQuery, (grantError, grantResults) => {
// //       if (grantError) {
// //         console.error('Error granting privileges:', grantError);
// //       } else {
// //         console.log('Access granted to manager user');
// //       }
// //   });

// };

function getContactsByUserId(userPhone) {
    console.log(userPhone)
    let response;
    const sql = `SELECT * FROM contacts WHERE phone1 = '${userPhone}';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        response = result;
    });
    return response;
}

function addUser(userData) {
    let response;
    const insertUserQuery = `INSERT INTO users (phone,name,userName, password, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [userData.phone, userData.name, userData.userName, userData.password, userData.email];
    con.connect(function (err) {
        if (err) throw err;
        // console.log("Connected!");
    });
    con.query(insertUserQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            response = -1;
            //res.status(500).json({ error: "Internal server error" });
        } else {
            console.log('User registered successfully');
            response = 0;
            //res.json({ message: "User registered successfully" });
        }
    });
    return response;
}

async function getUsers() {
    const sql = "SELECT * FROM users"

    try {
        const users = await queryPromise(sql);
        console.log(users); // Process the retrieved users data
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
    }


}

module.exports = {init_db, getContactsByUserId, addUser, getUsers};