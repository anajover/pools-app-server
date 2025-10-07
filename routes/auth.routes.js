const router = require("express").Router();
const UserModel = require("../models/User.model.js");

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const isAuthenticated = require("./middlewares/isAuthenticated.js");

// POST "/api/auth/signup" => registrar un usuario
router.post("/signup", async (req, res, next) => {

    const { email, password } = req.body;

    // Validaciones de backend
    if (!email || !password) {
        res.status(400).json({ errorMessage: "Los campos no están completos"})
        return;
    }

    // opcional. Validar si el correo tiene formato correcto
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (passwordRegex.test(password) === false) {
        res.status(400).json({errorMessage: "contraseña no válida, necesita 8 char, una letra y un número"})
        return; // hasta aqui llega la ruta
    }

    try {

        const foundUser = await UserModel.findOne({ email })
        if (foundUser !== null) {
            res.status(400).json({ errorMessage: "Usuario ya registrado"});
            return;
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        await UserModel.create({
            email,
            password: hashPassword
        })

        res.json("usuario creado")

    } catch (error) {
        next(error)
    }
})

// POST "/api/auth/login" => verificar las credenciales del usuario y abrirle "sesion"
router.post("/login", async (req, res, next) => {

    const {email, password} = req.body;

    try {

        const foundUser = await UserModel.findOne({email})
        if (foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no registrado"})
            return;
        }

        const passwordMatch = await bcryptjs.compare(password, foundUser.password)
        console.log(passwordMatch)

        if (passwordMatch === false) {
            res.status(401).json({ errorMessage: "La contraseña no es correcta"})
            return;
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email
            //puedes guardar otros usuarios, como isAdmin  por ej
        }

        // añadir aqui si hay propiedades tipo isAdmin o isOperator


        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "24h" }
        )

        res.json({ authToken: authToken })

    }catch(error) {
        next(error)
    }
}) 

// GET "/api/auth/verify" => chequear que el token es valido, la ruta se usa para flujo de FE
router.get("/verify", isAuthenticated, (req, res, next) => {

    //chequear que el token es valido
    //enviar al FE la info del usuario del token
    console.log(req.payload) // ! Esto es el req.session.user
    console.log("todo bien con el middleware")
    res.json(req.payload)
})


module.exports = router;