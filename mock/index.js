const express = require('express')
const userData = require('./data/user')

const app = new express()

app.get('/api/user/list', (req, res) => {
    res.json(userData)
})

app.listen(3001, () => {
    console.log('start mock')
    console.log('http://localhost:3001/')
})
