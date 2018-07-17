const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://clark:clarky123@ds231501.mlab.com:31501/nodecrud', (err, client) => {
    if (err) return console.log(err)
    db = client.db('nodecrud') //database name

    app.listen(3000, () => {
        console.log('Server up: http://localhost:' + 3000)
    })
})

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        
        console.log('save to database')
        res.redirect('/')
    })
})
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })


app.get('/', (req, res) => {
    var cursor = db.collection('quotes').find().toArray((err, result) => {
        // console.log(result)
        if (err) return console.log(err)    
        res.render('index.ejs', {quotes: result})
    })  
        // res.render(views, locals)
        // res.sendFile(__dirname + '/index.html')
})
app.set('view engine', 'ejs')

//update
app.put('/quotes', (req, res) => {
    db.collection('quotes').findOneAndUpdate({name: 'Yoda'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {id: -1},
        upsert: true
    },  (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
})


app.delete('/', (req, res) => {
    db.collection('quotes').remove(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('successfully deleted')
        res.render('/')
    })
})