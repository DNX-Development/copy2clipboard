const express = require('express')
const path = require('path')

const app = express()
const { readFile } = require('fs')

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get('/', (request, response) => {
    readFile('./home.html', 'utf8', (err, data) => {
        if(err) {
            response.status(500).send()
        }
        response.send(data)
    })
})

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))