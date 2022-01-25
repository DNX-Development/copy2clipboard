const express = require('express')

const app = express()
const { readFile } = require('fs')

app.get('/', (request, response) => {
    readFile('./home.html', 'utf8', (err, data) => {
        if(err) {
            response.status(500).send()
        }
        response.send(data)
    })
})

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))