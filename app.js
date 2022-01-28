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

app.get('/copy', (request, response) => {
    if(request.query['text'] && request.query['text'] !== '') {
        require("child_process").spawn("clip").stdin.end(request.query['text'])
        readFile('./copied.html', 'utf8', (err, data) => {
            if(err) {
                response.status(500).send()
            }
            const new_data = data.toString('utf8').replace('%copytext%', request.query['text'])

            response.send(new_data)
        })
    }
})

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))