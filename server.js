'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var Keycloak = require('keycloak-connect')
var memoryStore = new session.MemoryStore()

var app = express()

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}))

let kcConfig = {
  "realm": "SAP-Test",
  "auth-server-url": "http://192.168.0.153:7000/auth",
  "ssl-required": "external",
  "resource": "Node-Js-client",
  "public-client": true
}

var keycloak = new Keycloak({ store: memoryStore }, kcConfig)

app.use( keycloak.middleware() )


app.get('/inbox', keycloak.protect(), function (req, res) {
  console.log("connected")
})

app.listen(3000)
