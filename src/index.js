import express, { response } from "express"
import cors from "cors"

import { persons } from "./persons.js"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) =>{
    response.json(persons)
})

app.post("/cadastrar", (request, response) => {
    //desestruturação
    const { user } = request.body
    console.log(user)

    //cadastro no banco de dados

    response.status(201).json({ message : "Usuário cadastrado com sucesso!" })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
}) 