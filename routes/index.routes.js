const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Rutas
const customerRoutes = require("./customer.routes.js")
router.use("/customers", customerRoutes)

const poolRoutes = require("./pool.routes.js")
router.use("/pools", poolRoutes)

const uploadRoutes = require("./upload.routes.js")
router.use("/upload", uploadRoutes)

const taskRoutes = require("./task.routes.js")
router.use("/tasks", taskRoutes)

const workerRoutes = require("./worker.routes.js")
router.use("/workers", workerRoutes)

const calendarRoutes = require("./calendar.routes.js")
router.use("/calendar", calendarRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

module.exports = router;
