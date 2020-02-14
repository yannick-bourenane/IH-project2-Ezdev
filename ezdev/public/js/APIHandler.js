// AXIOS SETUP
const service = axios.create({
    baseURL: 'https://ezdev.herokuapp.com'
    //baseURL: 'http://localhost:9000'
});

export default service;