const {sequelize, users} = require('./models')
const express = require('express')
const app = express()
app.use(express.json())

app.post('/register', async(req, res) =>{
    const{username, password} = req.body;
    try {
        const user = await users.create({username, password})
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.json(500, 'Something wrong')
    }
})

app.get('/user/details', async(req, res) =>{
    try {
        const userDetails = await users.findAll()
        return res.json(userDetails)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
})


app.listen(3000, async() =>{
    console.log('Server is up and running in http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database connected')
})