// var {MongoClient} = require('mongodb');
// var uri = "mongodb+srv://fswd06:fswd06@cluster0.pp8gdmc.mongodb.net/?retryWrites=true&w=majority";
//
// const client = new MongoClient(uri);
async function insert(data,collection){
    var {MongoClient} = require('mongodb');
    var uri = "mongodb+srv://fswd06:fswd06@cluster0.pp8gdmc.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    await client.connect()
    const db = client.db('fswd06')
    console.log(collection)
    await db.collection(collection).insertOne(data)
    await client.close();
}
module.exports = insert
