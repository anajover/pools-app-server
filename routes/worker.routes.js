const WorkerModel = require("../models/Worker.model");
const isAuthenticated = require("./middlewares/isAuthenticated");

const router = require("express").Router();

// POST "/api/workers" => añadir un trabajador a la DB
router.post("/", isAuthenticated, async (req, res, next) => {

    const { name, surname, nif, phone, email, workerType, taskNumber, isAssigned, taskDate } = req.body

    try {

        const response = await WorkerModel.create({
            name,
            surname,
            nif,
            phone,
            email,
            workerType,
            taskNumber,
            isAssigned,
            taskDate
        })
        res.json(response)

    } catch (error) {
        next(error)
    }
})

// GET "/api/workers" => listados de trabajadores por nombre
router.get("/", isAuthenticated ,async (req, res, next) => {
    try {
        const response = await WorkerModel.find().select("name surname workerType")
        res.json(response)
    } catch (error) {
        next (error)
    }
})

// GET "/api/workers/:id" => ver los detalles de un trabajador
router.get("/:id", isAuthenticated, async(req, res, next) => {

    const {id} = req.params

    try {

        const response = await WorkerModel.findById(id).populate("taskNumber")
        res.json(response)

    } catch(error){
        next(error)
    }
})

// GET "/api/workers/:id" => ver los detalles de un trabajador
router.get("/:id", isAuthenticated, async (req, res, next) => {

    const { id } = req.params

    try {

        const response = await WorkerModel.findById(id)
        res.json(response)

    } catch (error) {
        next(error)
    }
})

// DELETE "/api/workers/:id" => Borrar un trabajador
router.delete("/:id", isAuthenticated, async (req, res, next) => {

    const { id } = req.params

    try {

        await WorkerModel.findByIdAndDelete(id)
        res.json("el trabajador se ha eliminado")

    } catch (error) {
        next (error)
    }
})

// PATCH "/api/workers/:id" => editar un trabajador
router.patch("/:id", isAuthenticated, async (req, res, next) => {
    
    const { id } = req.params
    const {name, surname, nif, phone, email, workerType, taskNumber, isAssigned, taskDate } = req.body

    try {

        await WorkerModel.findByIdAndUpdate(id, {
            name,
            surname,
            nif,
            phone,
            email,
            workerType,
            taskNumber,
            isAssigned,
            taskDate
        })
        res.json("el trabajador se  ha actualizado")

    } catch (error) {
        next(error)
    }
})


module.exports = router;