const bodyParser = require('body-parser')

bodyParser.urlencoded({ extended: true })

app.use((req, res, next) => {
  let result = ''
  req.on('data', chunk => {
    result += chunk
  })
  req.on('end', () => {
    // req.__body = querystring.parse(result)
    // next()
  })
})
