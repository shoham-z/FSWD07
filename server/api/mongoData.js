const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://fswd06:fswd06@cluster0.pp8gdmc.mongodb.net/?retryWrites=true&w=majority";

async function insert(collection, data) {
    let client = new MongoClient(uri);
    const db = client.db('fswd06');
    if (collection !== "loginCredentials") {

        let arr = await db.collection(collection).find({}).toArray();
        client.close();

        data.id = arr.length + 1;
    }

    client = new MongoClient(uri);

    db.collection(collection).insertOne(data)
        .then(r => console.log(r))
    client.close();
}

function update(collection, data) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');

    const myquery = {id: data.id};
    const newData = {$set: data};

    db.collection(collection).updateOne(myquery, newData)
        .then(r => console.log(r))
    client.close();
}

function remove(collection, id) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');

    db.collection(collection).deleteOne({id: id})
        .then(r => console.log(r))
    client.close();
}
function removeUser(collection, username) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');

    db.collection(collection).deleteOne({username: username})
        .then(r => console.log(r))
    client.close();
}
async function getCommentsByPostId(postId) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection("comments").find(postId ? {'postId': parseInt(postId)} : {}).toArray()
    client.close();
    return result;
}

async function getPicturesByAlbumId(albumId) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection("photos").find(albumId? {'albumId': parseInt(albumId)} : {}).toArray()
    client.close();
    return result;
}

async function getCollectionById(collection, id) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection(collection).find(id ? {'id': parseInt(id)} : {}).toArray()
    client.close();
    return result;
}

async function getCollectionByUsername(collection, username) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection(collection).find(username ? {'username': username} : {}).toArray()
    client.close();
    return result;
}

async function getPostsByUserId(userId) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection("posts").find(userId ? {'userId': parseInt(userId)} : {}).toArray()
    client.close();
    return result;
}

async function getAlbumsByUserId(userId) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection("albums").find(userId ? {'userId': parseInt(userId)} : {}).toArray()
    client.close();
    return result;
}

async function getTodosByUserId(userId) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection("todos").find(userId ? {'userId': parseInt(userId)} : {}).toArray()
    client.close();
    return result;
}

async function getUsername(username) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');
    let result = await db.collection("loginCredentials").find({"username": username}).toArray();
    client.close();
    return result[0];
}

async function importUsernames() {
    const client = new MongoClient(uri);

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const json = await response.json();
    json.map((s) => {
        let lat = s.address.geo.lat;
        insert('loginCredentials', {username: s.username, password: lat.substring(lat.indexOf('.') + 1)})
    });

    await client.close();
}

async function addUser(username, password) {
    const client = new MongoClient(uri);

    insert('loginCredentials', {username, password});

    await client.close();
    return 0;
}

async function addUserDetails(username, data) {
    const client = new MongoClient(uri);

    insert('users', {username, data});

    await client.close();
    return 0;
}

async function updateUsername(username, newPassword) {
    const client = new MongoClient(uri);

    const db = client.db('fswd06');

    const myquery = {username: username};
    const newData = {$set: {password: newPassword}};

    db.collection("loginCredentials").updateOne(myquery, newData)
        .then(r => console.log(r))

    await client.close();
}

module.exports = {
    insert, update, remove, addUser, addUserDetails,
    getAlbumsByUserId, getPicturesByAlbumId, updateUsername, removeUser,
    getCommentsByPostId, getCollectionById, getCollectionByUsername, getPostsByUserId, getTodosByUserId, getUsername
};