const mysql = require("mysql2");
const util = require("util");

const con = mysql.createConnection({
    host: "bcrjamgqfdlxvyaek43l-mysql.services.clever-cloud.com",
    user: "ubadfxfo15rh2knb",
    password: "KWJDzPibMvcHzd12JjHj",
    database: "bcrjamgqfdlxvyaek43l",
});


function init_db() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "DROP TABLE contacts";
        con.query(sql, function (err, result) {
            if (err) console.log("error deleting contacts table: " + err);
            else console.log("contacts Table delete");
        });
        sql = "DROP TABLE users";
        con.query(sql, function (err, result) {
            if (err) console.log("error deleting users table: " + err);
            else console.log("users Table delete");
        });
        sql =
            "CREATE TABLE users (phone VARCHAR(255) PRIMARY KEY, name VARCHAR(255), userName VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) console.log("the table users already exist");
            console.log("users Table created");
        });
        sql =
            "CREATE TABLE contacts (phone1 VARCHAR(255) , phone2 VARCHAR(255) ,FOREIGN KEY (phone1) REFERENCES users(phone),FOREIGN KEY (phone2) REFERENCES users(phone), name VARCHAR(255))";
        //TODO create the rest of the tables
        con.query(sql, function (err, result) {
            if (err) console.log("the table contacts already exist");
            console.log("contact table created");
        });
    });


    addDemoUsers();
}

function addDemoUsers() {
    console.log("starting to add demo user to table");
    const sql =
        "INSERT INTO users (phone, name, userName, password, email)\n" +
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
            if (err) console.log("the table already exist");
            console.log("users added successfully");
        });
    });
}

function addDemoContacts() {
    console.log("starting to add demo contact to table");
    const sql =
        "INSERT INTO contacts (phone1, phone2, name)\n" +
        "    VALUES\n" +
        "('1111111111','6666666666','n');";
    "('1111111111','4442225555','y');";
    "('1111111111','1112223333','c');";
    "('1111111111','6664448888','d');";
    con.connect(function (err) {
        con.query(sql, function (err, result) {
            if (err) console.log("the table already exist");
            console.log("contacts added successfully");
        });
    });
}

function addDemoMessages() {
    console.log("starting to add demo contact to table");
    const sql =
        "INSERT INTO messages (sender, receiver, content,  time)\n" +
        "    VALUES\n" +
        "('1111111111', '4442225555', 'Hi Emily, how have you been?', '2023-07-19 13:00:00');";
    "('6664448888', '1111111111', 'Hello Michael, I have been busy but good.', '2023-07-19 14:00:00');";
    "('1111111111', '6664448888', 'Glad to hear that!', '2023-07-19 15:00:00');";
    con.connect(function (err) {
        con.query(sql, function (err, result) {
            if (err) console.log("the table already exist");
            console.log("contacts added successfully");
        });
    });
}



function getContactsByUserId(userPhone) {
    console.log(userPhone);
    let response;
    const sql = `SELECT * FROM contacts WHERE phone1 = '${userPhone}';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        response = result;
    });
    return response;
}

async function getUserContacts(userPhone) {
    const sql = `SELECT * FROM contacts WHERE phone1 = '${userPhone}';`;

    try {
        const queryPromise = util.promisify(con.query).bind(con);

        const response = await queryPromise(sql);
        console.log(response); // Process the retrieved users data
        return response;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function getContacts() {
    const sql = `SELECT * FROM contacts;`;

    try {
        const queryPromise = util.promisify(con.query).bind(con);

        console.log("getting contacts")
        return await queryPromise(sql);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function getAllChats(userPhone) {
    console.log(userPhone);
    let response;
    const sql = `SELECT c.name, m.content, m.time
    FROM contacts c
    LEFT JOIN messages m ON c.phone1 = m.sender OR c.phone1 = m.receiver OR c.phone2 = m.sender OR c.phone2 = m.receiver
    WHERE c.phone1 = ${userPhone} OR c.phone2 = ${userPhone}
    ORDER BY m.time DESC;`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    response = result;
  });
  return response;
}


function getAllChats(userPhone) {
  console.log(userPhone);
  const sql = `SELECT c.name, m.content, m.time
    FROM contacts c
    LEFT JOIN messages m ON c.phone1 = m.sender OR c.phone1 = m.receiver OR c.phone2 = m.sender OR c.phone2 = m.receiver
    WHERE c.phone1 = ${userPhone} OR c.phone2 = ${userPhone}
    ORDER BY m.time DESC;`;

  return new Promise((resolve, reject) => {
    con.query(sql, [userPhone, userPhone], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function addUser(userData) {
    let response;
    const insertUserQuery = `INSERT INTO users (phone,name,userName, password, email) VALUES (?, ?, ?, ?, ?)`;
    const values = [userData.phone, userData.name, userData.username, userData.password, userData.email];
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
        const queryPromise = util.promisify(con.query).bind(con);

        return await queryPromise(sql);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function getUser(username) {
    const sql = `SELECT * FROM users WHERE userName='${username}'`;

    try {
        const queryPromise = util.promisify(con.query).bind(con);

        const user = await queryPromise(sql);
        console.log(user); // Process the retrieved users data
        return user;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function usernamePasswordMatch(username, password) {
    const sql = `SELECT * FROM users WHERE userName='${username}' and password='${password}'`;

    try {
        const queryPromise = util.promisify(con.query).bind(con);

        const user = await queryPromise(sql);
        console.log(user); // Process the retrieved users data
        return 0;
    } catch (error) {
        console.error("Error fetching users:", error);
        return -1;
    }
}

async function addContact(userphone, contact) {
    const query = 'INSERT INTO contacts (phone1, phone2, name) VALUES (?, ?, ?)';
    const values = [userphone, contact.phone, contact.name];
    try {
        await con.execute(query, values);

        console.log("success")
        return 0;
    } catch (error) {
        console.log("fail")
        return -1;
    }
}

async function getUserPhone(username) {
    const sql = `SELECT * FROM users WHERE userName='${username}'`;

    try {
        const queryPromise = util.promisify(con.query).bind(con);

        const user = await queryPromise(sql);
        return user[0].phone;
    } catch (error) {
        console.error("Error fetching users:", error);
        return -1;
    }
}

module.exports = {
    init_db,
    getContactsByUserId: getUserContacts,
    addUser,
    getUsers,
    getUser,
    usernamePasswordMatch,
    addContact,
    getContacts,
    getUserPhone
};
