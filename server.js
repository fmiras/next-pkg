const { createServer } = require('http')
const { parse } = require('url')

let next

try {
  next = require('next')
} catch (e) {
  console.log(`No module 'next' found, using parent-require (dev mode)`)
  const prequire = require('parent-require')
  next = prequire('next')
}

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  createServer((req, res) => handle(req, res, parse(req.url, true).pathname))
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
