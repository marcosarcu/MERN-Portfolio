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

async function traerProyectosPublicos() {
    return client
        .connect()
        .then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").find({ public: true }).toArray();
        });
    }

async function traerProyectoPorId(id) {
    return client
        .connect()
        .then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").findOne({ _id: ObjectId(id) });
        });
    }

async function guardarProyecto(project) {
    return client
        .connect()
        .then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").insertOne(project);
    });
}

async function eliminarProyecto(id) {
    return client
        .connect()
        .then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").deleteOne({ _id: ObjectId(id) });
    });
}

async function editarProyecto(id, project) {
    return client
        .connect()
        .then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").updateOne({ _id: ObjectId(id) }, { $set: project });
    });
}

export default {
    traerProyectos, traerProyectosPublicos, traerProyectoPorId, guardarProyecto, eliminarProyecto, editarProyecto
}