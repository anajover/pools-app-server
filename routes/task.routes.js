const express = require("express");
const TaskModel = require("../models/Task.model");
require("../models/Worker.model");
require("../models/Pool.model");
const isAuthenticated = require("./middlewares/isAuthenticated");
const { nextTaskNumber } = require("../helpers/nextTaskNumber");

const router = require("express").Router();

// GET "/api/tasks" => lista todas las tareas
router.get("/", isAuthenticated ,async (req, res, next) => {
    try {
        const response = await TaskModel.find().populate("assignedTo").populate("poolData").populate("customerData")
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// GET "/api/tasks/:id" => ver los detalles de una tarea
router.get("/:id", isAuthenticated, async (req, res, next) => {

    const {id} = req.params

    try {
        
        const response = await TaskModel.findById(id)
        res.json(response)

    } catch(error) {
        next(error)
    }
})

// POST "/api/tasks" => crear una tarea
router.post("/", isAuthenticated, async (req, res, next) => {

    const { isUrgent, status, customerData, assignedTo, title, date } = req.body

    try {

        const taskNumber = await nextTaskNumber();

        const response = await TaskModel.create({
            isUrgent,
            status,
            customerData,
            assignedTo,
            taskNumber,
            title,
            date
        })
        res.json(response)
    } catch(error) {
        next(error)
    }
})

// DELTE "/api/tasks/:id" => eliminar una tarea
router.delete("/:id", isAuthenticated, async (req, res, next) => {

    const { id } = req.params;

    try {

        await TaskModel.findByIdAndDelete(id)
        res.json("la tarea ha sido eliminada.")

    } catch (error) {
        next(error)
    }

})

// PATCH "/api/task/:id" => editar una tarea
router.patch("/:id", isAuthenticated, async ( req, res, next) => {

    const { id } = req.params;
    const { isUrgent, taskNumber, status, customerData, assignedTo, poolData } = req.body;

    try {

        await TaskModel.findByIdAndUpdate(id, {
            isUrgent,
            taskNumber,
            status,
            customerData,
            assignedTo,
            poolData
        })
        res.json("se ha actualizado la tarea")

    } catch (error) {
        next(error)
    }
})

module.exports = router;