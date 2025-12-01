import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env

// Criar conexão PRIMEIRO
const database = mysql2.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    connectionLimit: 10
})

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

// ---------------------------
// GET USERS
// ---------------------------
app.get("/", (request, response) => {
    const selectCommand = "SELECT name, email FROM emillynayara_02mb"

    database.query(selectCommand, (error, users) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao buscar usuários" })
        }

        response.json(users)
    })
})

// ---------------------------
// LOGIN
// ---------------------------
app.post("/login", (request, response) => {
    const { email, password } = request.body

    const selectCommand = `SELECT * FROM emillynayara_02mb WHERE email = ?`

    database.query(selectCommand, [email], (error, users) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro no servidor" })
        }

        if (users.length === 0 || users[0].password !== password) {
            return response.json({ message: "Usuário ou senha incorretos!" })
        }

        return response.json({
            id: users[0].id,
            name: users[0].name
        })
    })
})

// ---------------------------
// CADASTRAR
// ---------------------------
app.post("/cadastrar", (request, response) => {
    const { name, email, password } = request.body

    const insertCommand = `
        INSERT INTO emillynayara_02mb(name, email, password)
        VALUES (?, ?, ?)
    `

    database.query(insertCommand, [name, email, password], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao cadastrar" })
        }

        response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
    })
})

// ---------------------------
// START SERVER
// ---------------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})
