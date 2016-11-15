/* 
Jarrod Craven
 
Assignment 3 - Using Node.js

In Node.js Create a server that will do the following:

When the user goes to http://localhost:3000/todo (Links to an external site.) 
it will display the week2 demo json file (todo.json or download itView in a new window) 
with the content-type as "application/json". Display the file as is.
 */

var http = require('http');
var url = require('url');
var fileSystem = require('fs');

http.createServer(function (request, response) {
    
    var pathName = url.parse(request.url).pathname;
    console.log('pathName ' + pathName);
    var fileName = pathName.substr(1); /* lets remove the "/" from the name */    
    console.log('fileName ' + fileName);
    var testrequest = url.parse(request.url);
    console.log('request' + testrequest);
    
    if (fileName === 'todo'){
        fileName += '.json';
    }
    if (fileName ==='index'){
        fileName += '.html';
    }
    console.log('fileName after ' + fileName);
    
    /* lets try to read the html page found */
    fileSystem.readFile(fileName , callback);

    function callback(err, data) {
        if (err) {
            console.error(err);
            /* Send the HTTP header 
             * HTTP Status: 400 : NOT FOUND
             * Content Type: text/html 
             */
            response.writeHead(400, {'Content-Type': 'text/html'});   
            response.write('<!DOCTYPE html><html><body><div>Page Not Found</div></body></html>');
        } else {
            /* Send the HTTP header 
             * HTTP Status: 200 : OK
             * Content Type: text/html 
             */
            if(fileName === 'index.html'){
                response.writeHead(200, {'Content-Type': 'text/html'});
            } else {
            response.writeHead(200, {'Content-Type': 'application/json'});
            }
            response.write(data.toString());
        }     
        
        /* the response is complete */
        response.end();
    }

   
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/index.html');

