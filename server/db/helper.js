var {MongoClient} = require('mongodb');
var uri = "mongodb+srv://fswd06:fswd06@cluster0.pp8gdmc.mongodb.net/?retryWrites=true&w=majority";

async function main(){
    const client = new MongoClient(uri);



    const coll_list = ['todos', 'posts', 'albums','comments', 'photos']
    coll_list.map(s=>{
        getUsers(s)
    })
    await client.close();

    async function getUsers(coll) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${coll}`);
        const json = await response.json();
        return json.map((s) => {
            insert(s,coll)
        });
    }



// var {MongoClient} = require('mongodb');
// var uri = "mongodb+srv://fswd06:fswd06@cluster0.pp8gdmc.mongodb.net/?retryWrites=true&w=majority";
//
// const client = new MongoClient(uri);
    async function insert(data,collection){

        await client.connect()
        const db = client.db('fswd06')
        await db.collection(collection).insertOne(data)
        console.log(collection)
    }
}





main()