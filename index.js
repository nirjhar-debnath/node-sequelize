const express = require('express')

const { sequelize, User, AadharCardDetails, Address, Role, UserRole } = require('./models')

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
            include: ['aadharCardDetails', 'roles', 'addresses']
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
    const id = req.params.id
    const { aadharNumber, name } = req.body
    try {
        const user = await User.findOne({ where: { id } })
        const aadharCardDetail = await AadharCardDetails.create({ aadharNumber, name })
        await aadharCardDetail.setUser(user)

        return res.json(aadharCardDetail)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.get('/users/:id/aadhar', async (req, res) => {
    const id = req.params.id
    
    try {
        const user = await User.findOne({ where: { id } })
        const aadharCardDetail = await user.getAadharCardDetail()

        return res.json(aadharCardDetail)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.post('/users/:id/addresses', async (req, res) => {
    const id = req.params.id
    const { name, street, city, country } = req.body

    try {
        const user = await User.findOne({ where: { id } })
        const addresses = await Address.create({ name, street, city, country })

        await addresses.setUser(user)

        return res.json(addresses)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }
})

app.get('/users/:id/addresses', async (req, res) => {
    const id = req.params.id
    try {
        const addresses = await Address.findAll({
            where : {userId:id}
        })

        return res.json(addresses)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})

app.get('/users/:id/addresses/:addressId', async (req, res) => {
    const userId = req.params.id
    const addressId = req.params.addressId
    try {
        const address = await Address.findOne({ where:{ id:addressId } })
        
        return res.json(address)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})

app.put('/users/:id/addresses/:addressId', async (req, res) => {
    const userId = req.params.id
    const addressId = req.params.addressId
    const { name, street, city, country } = req.body
    
    try {
        const address = await Address.findOne({ where:{ id:addressId } })

        address.name = name
        address.street = street
        address.cty = city
        address.country = country

        await address.save()
        return res.json(address)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})

app.post('/users/:userId/roles', async (req, res) => {
    const id = req.params.userId
    const { name } = req.body

    try {
        const user = await User.findOne({where:{id}})
        const role = await Role.create({name})

        //create an object with which to create the UserRole
        const userRole = {
            roleId: role.id,
            userId: id
        }

        await UserRole.create(userRole)
        return res.json(role)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})

app.get('/users/:userId/roles', async (req, res) => {
    const id = req.params.userId

    try {
        const roles = await UserRole.findAll({ where:{ userId:id } })

        return res.json(roles)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// remove roles??

/* app.put('/users/:userId/roles', async (req, res) => {
    const {name} = req.body

    try {
        const role = await
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
}) */

app.listen({ port:8000 }, async () => {
    console.log('Server up on http://localhost:8000')
    //await sequelize.sync({ force:true })
    await sequelize.authenticate()
    console.log('Database connected!')
})