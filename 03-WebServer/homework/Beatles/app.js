var http = require('http');
var fs   = require('fs');

http.createServer((req, res) => {
  var beatle = req.url.split('/').pop();
  beatle = beatle.replace('%20', ' ');
  var found = beatles.find((e) => e.name === beatle);

  if(found) {
    res.writeHead(200, {'Content-type': 'text/html'})
    var miHtml2 = fs.readFileSync(__dirname + '/beatle.html', 'utf-8')

    miHtml2 = miHtml2.replace(/{name}/g, found.name);
    miHtml2 = miHtml2.replace('{birthdate}', found.birthdate);
    miHtml2 = miHtml2.replace('{profilePic}', found.profilePic);

    return res.end(miHtml2)
  }

  if(req.url.substring(0, 5) === '/api/') {
    if(found) {
      res.writeHead(200, {'Content-type': 'application/json'});
      return res.end(JSON.stringify(found))
    }
  }

  if(req.url === '/') {
    res.writeHead(200, {'Content-type': 'text/html'})
    var miHtml = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    return res.end(miHtml)
  }
  
  if(req.url === '/api') {
    res.writeHead(200, {'Content-type': 'application/json'});
    return res.end(JSON.stringify(beatles))
  }
  
  
  else{
    res.writeHead(404, {'Content-type': 'text/plain'});
    return res.end('Error: not found')
  }
})
.listen(3000, 'localhost');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
];
