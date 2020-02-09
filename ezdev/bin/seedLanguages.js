const languageModel = require('../models/Language')
const mongoose = require('mongoose')

const languagesList = [{
    name: 'PHP',
    logo: '<i class="fab fa-php"></i>'
}, {
    name: 'JavaScript',
    logo: '<i class="fab fa-js"></i>'
}, {
    name: 'React',
    logo: '<i class="fab fa-react"></i>'
}, {
    name: 'Node',
    logo: '<i class="fab fa-node"></i>'
}, {
    name: 'Laravel',
    logo: '<i class="fab fa-laravel"></i>'
}, {
    name: 'Python',
    logo: '<i class="fab fa-python"></i>'
}, {
    name: 'Java',
    logo: '<i class="fab fa-java"></i>'
}, {
    name: 'SASS',
    logo: '<i class="fab fa-sass"></i>'
}, {
    name: 'HTML',
    logo: '<i class="fab fa-html5"></i>'
}, {
    name: 'CSS',
    logo: '<i class="fab fa-css3"></i>'
}, {
    name: 'Wordpress',
    logo: '<i class="fab fa-wordpress"></i>'
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

    languageModel.create(languagesList).then(dbRes => console.log(dbRes)).catch(dbErr => console.log(dbErr))
}
pushSeed();