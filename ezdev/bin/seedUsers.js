const userModel = require('../models/User')
const mongoose = require('mongoose')

const usersList = [{
    firstname: 'super',
    lastname: 'admin',
    email: 'admin@mail.com',
    password: '123456',
    phone: '+33601020304',
    city: 'Paris',
    zipcode: '75000',
    role: 'admin',
}, {
    firstname: 'Pierre',
    lastname: 'Etryhard',
    email: 'p.etryhard@mail.com',
    password: '123456',
    phone: '+33601020304',
    city: 'Creil',
    zipcode: '60100',
    role: 'student',
}, {
    firstname: 'Yannick',
    lastname: 'Bourenane',
    email: 'y.bourenane@mail.com',
    password: '123456',
    phone: '+33601020304',
    city: 'Gagny',
    zipcode: '93220',
    role: 'student',
}, {
    firstname: 'Guillaume',
    lastname: 'Amangoua',
    email: 'g.amangoua@mail.com',
    password: '123456',
    phone: '+33601020304',
    city: 'Paris',
    zipcode: '75000',
    role: 'teacher',
    id_languages: ['1', '2', '3'],
    price: '50€ de l\'heure'
}, {
    firstname: 'Franck-Olivier',
    lastname: 'Marmier',
    email: 'fo.marmier@mail.com',
    password: '123456',
    phone: '+33601020304',
    city: 'Paris',
    zipcode: '75000',
    role: 'teacher',
    id_languages: ['4', '5', '6'],
    price: '300€ la journée'
}]
async function pushSeed() {
    await mongoose
        .connect('mongodb://localhost/ezdev', {
            useNewUrlParser: true
        })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        });

    userModel.create(usersList).then(dbRes => console.log(dbRes)).catch(dbErr => console.log(dbErr))
}
pushSeed();