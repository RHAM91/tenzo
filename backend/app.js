const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const AuthToken = require('./middlewares/AuthToken')
// const AuthSocket = require('./middlewares/AuthSocket')


const app = express()
const server = require('http').Server(app)
// const io = require('socket.io')(server,{
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// })



// io.use(AuthSocket)

// var clientes = []

// io.on('connection', (socket)=>{
//     console.log(`Cliente: ${socket.id}`)



//     socket.on('todo', (data) =>{
//         console.log(data)
//         io.emit('actualizar', 'news actualizar')
//     })

//     socket.on('news', (data) =>{ // PASO 4: recibe los datos de ruta del cliente, y los reenvia a todos los clientes
//         io.emit('modulo', data.modulo)
//     })



//     socket.on('disconnect', ()=>{
//         clientes.filter((cl, i) =>{
//             if (cl.id == socket.id) {
//                 clientes.splice(i, 1)
//             }
//         })

//         io.emit('master', clientes)
//     })
// })

app.use(cors())


process.env.NODE_ENV == 'development' ? app.use(morgan('dev')) : console.log('Produccion')
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(express.json())



// app.use(AuthToken)

// RUTAS DE SISTEMA

// app.use('/api/login', require('./routes/sistema/login.route'))
// app.use('/api/usuarios', require('./routes/sistema/usuarios.route'))


// RUTAS DE PRODUCCION

// app.use('/api/cursos', require('./routes/produccion/cursos.route'))


module.exports = server

