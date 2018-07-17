app.use(express.static('public'))
app.use(bodyParser.json())



var update = document.getElementById('update')

update.addEventLisnter('click',function() {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': "Jhon",
            'quote': 'Try, Fail, Learn, Go'
        })
    })
})