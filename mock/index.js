const express = require('express')
const userData = require('./data/user')
const detail = require('./data/detail')

const app = new express()

app.get('/api/user/list', (req, res) => {
    res.json(userData)
})
app.get('/api/user/detail', (req, res) => {
    res.json(detail)
})
app.listen(3001, () => {
    console.log('start mock')
    console.log('http://localhost:3001/')
})
