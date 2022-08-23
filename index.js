const express = require('express')

const { sequelize, User, AadharCardDetails } = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    const { fullname, countryCode } = req.body

    try{
        const user = await User.create({ fullname, countryCode})

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users', async (req, res) => {
    try {
        const user = await User.findAll()

        return res.json(user)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error : "Something went wrong" })
    }
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({
            where: {id},
            //include: 'aadharCardDetails'
        })

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error : "Something went wrong" })
    }
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id
    const { fullname, countryCode } = req.body
    try {
        const user = await User.findOne({ where: {id} })
        user.fullname = fullname
        user.countryCode = countryCode

        await user.save()

        return res.json(user)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ where: { id } })

        await user.destroy()

        return res.json({ message:'User has been deleted!' })
    } catch(err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.post('/users/:id/aadhar', async (req, res) => {
    const userId = req.params.id
    const { aadharNumber, name } = req.body
    try {
        const user = await User.findOne({ where: { id: userId } })
        const aadharCardDetail = await AadharCardDetails.create({ aadharNumber, name })
        await aadharCardDetail.setUser(user)
        return res.json(aadharCardDetail)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.get('/users/:id/aadhar', async (req, res) => {
    const userId = req.params.id
    
    try {
        const user = await User.findOne({ where: { id: userId } })
        console.log(user);
        /* const aadharCardDetail = await AadharCardDetails.findAll()

        return res.json(aadharCardDetail) */
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.listen({ port:8000 }, async () => {
    console.log('Server up on http://localhost:8000')
    //await sequelize.sync({ force:true })
    await sequelize.authenticate()
    console.log('Database connected!')
})