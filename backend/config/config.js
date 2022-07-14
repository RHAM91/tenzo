module.exports = {
    database :{
        host: '127.0.0.1',
        user: 'rubix', // puente
        password: '124578asD.$', // 124578asD.D
        database: process.env.NODE_ENV == 'development' ? 'membresias_dev' : 'membresias'
    }
}
