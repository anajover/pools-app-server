const router = require("express").Router();

const uploader = require("./middlewares/uploader");

//  esta ruta solo va a enviar una imagen a cloudinary y recibe el URL

router.post("/", uploader.array("picture"), (req, res, next) => {

    const imageUrls = req.files.map(file => file.path);
    console.log("URLs de las imágenes subidas: ", imageUrls);
    //console.log("ruta Post de uploader", req.file.path) // la imagen de cloudinary

    res.json(imageUrls);
})

module.exports = router;

