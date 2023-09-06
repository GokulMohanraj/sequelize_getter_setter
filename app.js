const {sequelize, users} = require('./models')
const express = require('express')
const app = express()
app.use(express.json())

app.post('/register', async(req, res) =>{
    const{username, password, email, role} = req.body;
    try {
        const user = await users.create({username, password, email, role})
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Something wrong')
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

app.get('/user/:username/about', async( req, res ) => {
    try {
        const username = req.params.username;
        const data = await users.findOne({
            where:{username : username}
        })
        const aboutUser = data.aboutUser
        return res.json(aboutUser)
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