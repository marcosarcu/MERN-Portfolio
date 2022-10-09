import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function traerProyectos() {
    return client
        .connect()
        .then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").find().toArray();
        });
    }


//Export module
export default {
    traerProyectos
}