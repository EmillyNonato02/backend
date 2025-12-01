import express, { response } from "express"
import cors from "cors"
import mysql2 from "mysql2"


const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) =>{
    const selectCommand = "SELECT name, email FROM emillynayara_02mb"

    database.query(selectCommand, (error, users) => {
        if(error){
            console.log(error)
            return
        }

        response.json(users)
    })
})

app.post("/login", (request, response) => {
    const { email, password } = request.body

    const selectCommand = `SELECT * FROM emillynayara_02mb WHERE email = ?`

    database.query(selectCommand, [email], (error, users) => {
        if(error){
            console.log(error)
            return
        }

        //se o usuário não existir ou a senha estiver incorreta
        if(users.length === 0||users[0].password !== password){
            response.json({ message: "Usuário ou senha incorretos!" })
            return
        }

        response.json({ id: users[0].id, name: user[0].name})  
    })
})

app.post(pontuação , (request, response) => {
    //pegar o id e a pontuação de dentro de request
    // selecione o usuário pelo id
    //alterar a pontuação do banco de dados usando a pontuação que foi recebida do front-end
})

app.post("/cadastrar", (request, response) => {
    //desestruturação
    const { user } = request.body
    console.log(user)

    //cadastro no banco de dados
    const insertCommand = `
        INSERT INTO emillynayara_02mb(name, email, password)
        VALUES (?, ?, ?)
    `

    database.query(insertCommand, [user.name, user.email, user.password], (error) =>{
        if(error){
            console.log(error)
            return
        }

        response.status(201).json({ message : "Usuário cadastrado com sucesso!" })
    })

})

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
}) 

const database = mysql2.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    connectionLimit: 10
})