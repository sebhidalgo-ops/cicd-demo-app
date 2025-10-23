const http = require('http');
const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(`<h1>Hello from Elastic Beanstalk CI/CD! pipeline.</h1>`);
});
server.listen(port, () => console.log(`Listening on ${port}`));


