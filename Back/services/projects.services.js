import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient("mongodb://127.0.0.1:27017");

// async function traerProyectos() {
//     return client
//         .connect()
//         .then(async function () {
//         const db = client.db("AH_P1");
//         return db.collection("Projects").find().toArray();
//         });
//     }


async function traerProyectos() {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            return db.collection("Projects").aggregate([
                {
                    $lookup: {
                        from: "technologies",
                        localField: "technologies",
                        foreignField: "_id",
                        as: "technologies"
                    }
                },
                {
                    $project: {
                        gallery: 0
                    }
                }

            ]).toArray();
        });
}



async function traerProyectosPublicos() {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            return db.collection("Projects").aggregate([
                {
                    $lookup: {
                        from: "technologies",
                        localField: "technologies",
                        foreignField: "_id",
                        as: "technologies"
                    },
                },
                {
                    $match: { public: true }
                },
                {
                    $project: {
                        gallery: 0
                    }
                }
            ]).toArray();
        });
}

async function traerProyectoPorId(id) {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            return db.collection("Projects").aggregate([
                {
                    $lookup: {
                        from: "technologies",
                        localField: "technologies",
                        foreignField: "_id",
                        as: "technologies"
                    }
                },
                {
                    $match: { _id: ObjectId(id) }
                },
                {
                    $project: {
                        gallery: 0
                    }
                }
            ]).toArray()
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
            const galleryId = await db.collection("Projects").findOne({ _id: ObjectId(id) }, { projection: { gallery: 1 } });
            db.collection("Projects").deleteOne({ _id: ObjectId(id) });
            // delete gallery
            return db.collection("Galleries").deleteOne({ _id: ObjectId(galleryId.gallery) });            
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

async function traerProyectosPorTecnologia(id) {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            return db.collection("Projects").aggregate([
                {
                    $lookup: {
                        from: "technologies",
                        localField: "technologies",
                        foreignField: "_id",
                        as: "technologies"
                    }
                },
                {
                    $match: { technologies: { $elemMatch: { _id: ObjectId(id) } } }
                },
                {
                    $project: {
                        gallery: 0
                    }
                }
            ]).toArray();
        });
}

export default {
    traerProyectos, traerProyectosPublicos, traerProyectoPorId, guardarProyecto, eliminarProyecto, editarProyecto, traerProyectosPorTecnologia
}