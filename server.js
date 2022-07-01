// imported the http built-in Module
const http = require('http'), 
// imported the file system built-in module
    fs = require('fs'), 
// imported URL built-in module
    url = require('url');
// used http's function to create server based on two parameteres, request and response
http.createServer((request, response) => { 
// defined a variable for address requested from user
    let addr = request.url, 
// defined a q variable that contains the function to parse the url
    q = url.parse(addr, true), 
    filePath = ''; 
// appending the requested urls + current date of the request into the log.txt
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => { 
// defined an if statement to check if it has error, if not it will add the request to the log.txt
        if (err) {
             console.log(err); 
        } else {
            console.log('Added to log.'); 
        } 
    });
// this checks if there is a file with the name documentation in the folder, if not the server will load the index.html page 
    if (q.pathname.includes('documentation')) { 
        filePath =(__dirname + '/documentation.html'); 
    } else { 
        filePath = 'index.html'; 
    } 

    fs.readFile(filePath, (err, data) => { 
        if (err) { throw err; } 
        response.writeHead(200, {'Content-Type': 'text/html' }); 
        response.write(data); response.end(); 
    }); 
}).listen(8080);
console.log('My first server uis running on Port 8080.');