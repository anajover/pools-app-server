const router = require("express").Router();
const CalendarModel = require("../models/Calendar.model");
const isAuthenticated = require("./middlewares/isAuthenticated");

// GET "/api/calendar/" => visualizar el calendario
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await CalendarModel.find();
        res.json(response)
    } catch (error) {
        next(error);
    }
});

// POST "/api/calendar/create" => crear una tarea nueva en el calendario
router.post("/", isAuthenticated, async (req, res, next) => {

    const { date, task, worker, title, customer, pool } = req.body

    try {

        const response = await CalendarModel.create({
            date,
            task,
            worker,
            title,
            customer,
            pool
        })
        res.json(response)

    }catch(error) {
        next(error)
    }
})

// GET "/api/calendar/:id" => ver los detalles de una cita de calendario
router.get("/:id", isAuthenticated, async (req, res, next) => {

    const {id} = req.params;

    try {

        const response = await CalendarModel.findById(id)
        res.json(response)

    } catch (error) {
        next(error)
    }
});

// DELETE "/api/calendar/:id" => Borrar una tarea del calendario
router.delete("/:id", isAuthenticated, async (req, res, next) => {

        const { id } = req.params;

        try {

            await CalendarModel.findByIdAndDelete(id)
            res.json("la cita se ha eliminado del calendario")

        } catch (error) {
            next(error)
        }
    });

    // PATCH "/api/calendar/:id" => Editar una cita del calendario
    router.patch("/:id", isAuthenticated, async (req, res, next) => {

        const {id} = req.params
        const { date, endDate, allDay, task, worker, title, customer, pool } = req.body

        try {
            await CalendarModel.findByIdAndUpdate(id, {
                date,
                endDate,
                allDay,
                task,
                worker,
                title,
                customer,
                pool
            })
            res.json("la tarea se ha actualizado")
        } catch (error) {
            next(error)
        }
    })

module.exports = router;