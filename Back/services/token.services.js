import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db('AH_P1');
const tokens = db.collection('Tokens');

async function create(token){
    await client.connect();
    await tokens.insertOne({ token });
}

async function findByToken(token){
    await client.connect();
    const tokenExist = await tokens.findOne({ token });
    return tokenExist;
}

async function deleteOne(token){
    await client.connect();
    await tokens.deleteOne({ token });
}

export default {
    create,
    findByToken,
    deleteOne
}