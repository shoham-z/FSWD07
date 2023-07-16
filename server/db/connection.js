var {MongoClient} = require('mongodb');
var uri = "mongodb+srv://fswd06:fswd06@cluster0.pp8gdmc.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
module.exports = client
// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         const db = client.db('fswd06')
//         db.createCollection('users')
//         db.createCollection('todos')
//         db.createCollection('posts')
//         db.createCollection('comments')
//         db.createCollection('albums')
//         db.createCollection('photos')
//         db.createCollection('users+pass')
//         console.log(db)
//         // Make the appropriate DB calls
//         await listDatabases(client);
//
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
//
// main()