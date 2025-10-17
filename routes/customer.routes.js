const router = require("express").Router();
const CustomerModel = require("../models/Customer.model");
const PoolModel = require("../models/Pool.model");
const isAuthenticated = require("./middlewares/isAuthenticated");

// todo nuestro CRUD
// GET "/api/customers" => listados de clientes
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await CustomerModel.find()
        res.json(response)
    } catch(error) {
        next(error)
    }
})

// POST "/api/customers" => crear un nuevo cliente
router.post("/", isAuthenticated, async (req, res, next) => {

    const { nif, name, surname, phone, address, postalCode, city, province, country, contactLanguage, email } = req.body;

    try {

        const response = await CustomerModel.create({
            nif,
            name,
            surname,
            phone,
            address,
            postalCode,
            city,
            province,
            country,
            contactLanguage,
            email
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// GET "/api/customers/:id" => ver los detalles de un cliente
router.get("/:id", isAuthenticated, async (req, res, next) => {

    const { id } = req.params

    try {

        const response = await CustomerModel.findById(id)
        res.json(response)

    } catch (error) {
        next (error)
    }
})

// DELETE "/api/customers/:id" => borrar un cliente y sus piscinas asociadas
router.delete("/:id", isAuthenticated, async(req, res, next) => {

    const { id } = req.params
    
    try {

        await PoolModel.deleteMany({address: id})
        await CustomerModel.findByIdAndDelete(id)
        res.json("El cliente se ha eliminado")

    } catch(error) {
        next(error)
    }
})

// PATCH "/api/customers/:id" => editar un cliente
router.patch("/:id", isAuthenticated, async (req, res, next) => {

    const { id } = req.params
    const { nif, name, surname, phone, address, postalCode, city, province, country, contactLanguage, email } = req.body;

    try {

        await CustomerModel.findByIdAndUpdate(id, {
            nif,
            name,
            surname,
            phone,
            address,
            postalCode,
            city,
            province,
            country,
            contactLanguage,
            email
        })
        res.json("el cliente se ha actualizado")

    } catch (error) {
        next(error)
    }
})

module.exports = router;