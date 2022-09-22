var fs  = require("fs")
var http  = require("http");

// Escribí acá tu servidor
http.createServer((req, res) => {
    fs.readFile('showByName/images' + req.url, (err, data) => {
        if(data) {
            res.writeHead(200, {'Content-type': 'image/jpeg'});
            res.end(data)
        } else{
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end('Error: not found')
        }
    })
})
.listen(3000, "localhost")
