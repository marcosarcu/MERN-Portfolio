import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
const client = new MongoClient("mongodb://127.0.0.1:27017");
const users = client.db('AH_P1').collection('Users');

export async function getAll(filter) {
    await client.connect();
    const usersCollection = await users.find(filter).toArray();
    return usersCollection;
}

export async function create(user){
    const newUser = { ...user};
    await client.connect();
    const userExist = await users.findOne({ email: newUser.email });
    if(userExist) throw new Error('User already exist');
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await users.insertOne(newUser);
    return newUser;
}

export async function deleteOne(id){
    await client.connect();
    await users.deleteOne({ _id: ObjectId(id) });
}

export async function login(user){
    await client.connect();
    const userExist = await users.findOne({
        email: user.email
    });
    if(!userExist) throw new Error('Contraseña o email incorrectos');
    const validPassword = await bcrypt.compare(user.password, userExist.password);
    if(!validPassword) throw new Error('Contraseña o email incorrectos');
    return userExist;
}

export async function getById(id){
    await client.connect();
    const user = await users.findOne({ _id: ObjectId(id) });
    return user;
}