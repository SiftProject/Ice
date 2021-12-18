
const express = require('express')
const app = express()
const fs = require('fs')

app.get('/boxes', async(req, res)=>{
    try {
        const data = fs.readFileSync(`${__dirname}/db.json`, 'utf8')
        res.json(JSON.parse(data))
    } catch (err) {
        res.send({error: err.message})
    }
})

const port = process.env.PORT || 8080
app.listen(port, ()=>console.log('server runningon port ' + port))