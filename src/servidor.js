import express from "express"
import {engine} from 'express-handlebars'
import {Server as SocketIOServer} from 'socket.io'
import { ProductsManager } from "./productsManager.js"

const productsManager = new ProductsManager('./localStorage/products.json')
const app = express()
app.engine('handlebars',engine())
app.set('views', './views')
app.set('view engine' , 'handlebars')
app.use(express.static('./public'))

const httpServer = app.listen(8080)
const io = new SocketIOServer(httpServer)

io.on('connection', clientSocket => {
    console.log(`new client connected!  socket id # ${clientSocket.id}`)
    // clientSocket.emit('message', {hola : 'world'})
    // clientSocket.emit('alert', 'estas siendo alertadooooo')
    // clientSocket.on('message', datosAdjuntos =>{
    //     console.log(`datos adjuntos => ${datosAdjuntos}`)
    // })
})

app.get('/',(req,res) =>{
    res.render('layouts/main', {})
    
} )

app.get('/products',async (req,res) => {
    const products = await productsManager.getProducts()
    res.render('products' , {
        productsExist : products.length > 0 ,
        products
    })
})



