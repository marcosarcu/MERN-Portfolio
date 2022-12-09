import { ObjectID } from 'bson';
import galleryServices from '../../services/gallery.services.js';

function findGalleryById(req, res) {
    const id = req.params.id;
    galleryServices.traerGaleriaPorId(id)
        .then(function (gallery) {
            if (gallery) {
                res.status(200).json(gallery);
            } else {
                res.status(404).json({ message: "Galeria no encontrada" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválido" });
        })
}

async function createGallery(req, res) {
    const gallery = {
        imgs: [],
        _id: ObjectID()
    };

    galleryServices.crearGaleria(gallery, req.params.id)
        .then(function (gallery) {
            if (gallery) {
                res.status(200).json({ message: "Galeria creada con exito" });
            } else {
                res.status(404).json({ message: "Galeria no creada" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválido" });
        })
}

async function addImageToGallery(req, res) {
    const id = req.params.id;
    const img = req.body.img;
    const desc = req.body.desc;
    galleryServices.agregarImagenAGaleria(id, img, desc)
        .then(function (gallery) {
            if (gallery) {
                res.status(200).json({ message: "Imagen agregada con exito" });
            } else {
                res.status(404).json({ message: "Galeria no encontrada" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválido" });
        })
}

async function deleteGalleryImage(req, res) {
    const id = req.params.id;
    const img = req.body.img;
    galleryServices.eliminarImagenDeGaleria(id, img)
        .then(function (gallery) {
            if (gallery) {
                res.status(200).json({ message: "Imagen eliminada con exito" });
            } else {
                res.status(404).json({ message: "Galeria no encontrada" });
            }
        })
        .catch(function () {
            res.status(500).json({ message: "ID del proyecto inválido" });
        })
}

export {
    findGalleryById, createGallery, addImageToGallery, deleteGalleryImage
}
