const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(()=>{
    const server = express()
    
    server.use(express.json())
    server.use(express.urlencoded({extended: true}))
    
    server.get('*',(req, res)=>{
        return handle(req,res);
    })
    server.listen(8081,()=>{
        console.log('프론트 서버는 8081')
    })
})