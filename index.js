const express = require('express')

const { sequelize, User } = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    const {fullname, countryCode, aadharId} = req.body

    try{
        const user = await User.create({ fullname, countryCode, aadharId})

        return user.json()
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.listen({ port:8000 }, async () => {
    console.log('Server up on http://localhost:8000')
    await sequelize.sync({ force: true })
    console.log('Database connected!')
})