import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";


dotenv.config()
const app = express()

// Middleware
app.use(morgan("dev"))
app.use(express.json())

// Routes

app.use("/api", routes)

// Gestion erreur

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: "Something went wrong !" })
})

// Demarrage du serveur

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
