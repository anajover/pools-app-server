const router = require("express").Router();
const PoolModel = require("../models/Pool.model");
const isAuthenticated = require("./middlewares/isAuthenticated");

// todo nuestro CRUD
// * CREATE
// POST "/api/pools" => crear una nueva piscina
router.post("/", isAuthenticated, async (req, res, next) => {

    const { height, width, deep, volume, waterType, picture, address } = req.body

    try {

        const response = await PoolModel.create({
            height,
            width,
            deep,
            volume,
            waterType,
            picture,
            address
        })
        res.json(response)
    } catch (error) {
        next (error)
    }
})

// * CONSULTAR
// GET "/api/pools" => listados de piscinas
router.get("/", isAuthenticated, async (req, res, next) => {

    console.log(req.payload._id) // con esto se tiene acceso al usuario logueado
    // esto es el req.session.user._id de M2
    // ! solo se tiene acceso si la ruta utiliza el middleware isAuthenticated

    try {
        const response = await PoolModel.find().populate("address")
        res.json(response)
    } catch(error) {
        next(error)
    }
})

// GET "/api/pools/:id" => ver los detalles de una piscina
router.get("/:id", isAuthenticated, async (req, res, next) => {

    const { id } = req.params

    try {

        const response = await PoolModel.findById(id).populate("address")
        res.json(response)

    }catch (error) {
        next(error)
    }
})

// DELETE "/api/pools/:id" => borrar una piscina
router.delete("/:id", isAuthenticated, async(req, res, next) => {

    const { id } = req.params

    try {

        // buscar una piscina y borrarla de la BD
        await PoolModel.findByIdAndDelete(id)
        res.json("La piscina ha sido borrado")

    } catch (error) {
        next(error)
    }
})

// PATCH "/api/pools/:id" => editar una piscina
router.patch("/:id", isAuthenticated, async (req, res, next) => {

    const {id} = req.params
    const { height, width, deep, volume, waterType, picture, address } = req.body

    try {

        await PoolModel.findByIdAndUpdate(id, {
            height,
            width,
            deep,
            volume,
            waterType,
            picture,
            address
        })
        res.json("la piscina se ha actualizado")

    } catch (error) {
        next(error)
    }
})


module.exports = router;