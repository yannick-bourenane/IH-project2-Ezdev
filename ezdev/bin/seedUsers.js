const userModel = require('../models/User')
const mongoose = require('mongoose')
const languageModel = require("../models/Language.js");




languageModel.create().then(languages =>{

    //Creer un tableau d'id.


    //Creer les utilitaster(
    // userModel.create().then)

})

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
    id_languages: ['5e3fe1a6605d429080d6f852', '5e3fe1a6605d429080d6f853', '5e3fe1a6605d429080d6f854', '5e3fe1a6605d429080d6f859', '5e3fe1a6605d429080d6f85a'],
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
    id_languages: ['5e3fe1a6605d429080d6f857', '5e3fe1a6605d429080d6f856', '5e3fe1a6605d429080d6f855', '5e3fe1a6605d429080d6f851'],
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