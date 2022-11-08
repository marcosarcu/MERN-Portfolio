import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function findByProjectId(projectId) {
    return client.connect().then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").aggregate([
            {
                $match: { _id: ObjectId(projectId) }
            },
            {
                $project: { testimonials: 1, _id: 0 }                
            }
        ]).toArray();
    });
}

async function create(testimonial, projectId) {
    return client.connect().then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").updateOne(
            { _id: ObjectId(projectId) },
            { $push: { testimonials: testimonial } }
        );
    });
}


async function deleteTestimonial(projectId, testimonialId) {
    return client.connect().then(async function () {
        const db = client.db("AH_P1");
        return db.collection("Projects").updateOne(
            { _id: ObjectId(projectId) },
            { $pull: { testimonials: { _id: ObjectId(testimonialId) } } }
        );
    });
}

export default {
    findByProjectId,
    deleteTestimonial,
    create
}