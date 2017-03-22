const gzippo = require('gzippo')
const express = require('express')
const app = express()

app.use(gzippo.staticGzip("" + __dirname + "/dist"))
app.listen(process.env.PORT || 5000)