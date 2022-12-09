import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function traerGaleriaPorId(id) {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            return db.collection("Projects").aggregate([
                {
                    $match: { _id: ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "Galleries",
                        localField: "gallery",
                        foreignField: "_id",
                        as: "gallery"
                    }
                },
                {
                    $project: {
                        gallery: 1,
                        _id: 0
                    }
                }
            ]).toArray();
        });
}

async function crearGaleria(gallery, projectId) {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            db.collection("Galleries").insertOne(gallery);
            // add gallery to project
            const galleryId = gallery._id;
            return db.collection("Projects").updateOne({ _id: ObjectId(projectId) }, { $set: { gallery: galleryId } });
        });
}

async function agregarImagenAGaleria(id, img, desc) {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            const galleryId = await db.collection("Projects").findOne({ _id: ObjectId(id) }, { projection: { gallery: 1, _id: 0 } });
            return db.collection("Galleries").updateOne({ _id: ObjectId(galleryId.gallery) }, { $push: { imgs: {desc: desc, img: img} } });
        });
}

async function eliminarImagenDeGaleria(id, img) {
    return client
        .connect()
        .then(async function () {
            const db = client.db("AH_P1");
            const galleryId = await db.collection("Projects").findOne({ _id: ObjectId(id) }, { projection: { gallery: 1, _id: 0 } });
            return db.collection("Galleries").updateOne({ _id: ObjectId(galleryId.gallery) }, { $pull: { imgs: {img: img} } });
        });
}

export default {
    traerGaleriaPorId, crearGaleria, agregarImagenAGaleria, eliminarImagenDeGaleria
}