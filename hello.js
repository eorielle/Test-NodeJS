/* correction final ex
─────────────────────────────────────────────────────────────────────────────

     var http = require('http')
     var url = require('url')

     function parsetime (time) {
       return {
         hour: time.getHours(),
         minute: time.getMinutes(),
         second: time.getSeconds()
       }
     }

     function unixtime (time) {
       return { unixtime : time.getTime() }
     }

     var server = http.createServer(function (req, res) {
       var parsedUrl = url.parse(req.url, true)
       var time = new Date(parsedUrl.query.iso)
       var result

       if (/^\/api\/parsetime/.test(req.url))
         result = parsetime(time)
       else if (/^\/api\/unixtime/.test(req.url))
         result = unixtime(time)

       if (result) {
         res.writeHead(200, { 'Content-Type': 'application/json' })
         res.end(JSON.stringify(result))
       } else {
         res.writeHead(404)
         res.end()
       }
     })
     server.listen(Number(process.argv[2]))


*/
/* Final ex
var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res){

  var parse = url.parse(req.url, true);
  res.writeHead(200, {"Content-Type": "application/json"});

  if(parse.pathname == '/api/parsetime' && parse.query.iso != null){
    var date = new Date(parse.query.iso);
    var d = {};
    d["hour"] = date.getHours();
    d["min"]= date.getMinutes();
    d["s"]= date.getSeconds();

    var json =JSON.stringify(
      {
        hour: d["hour"],
        minute:d["min"],
        second:d["s"]
      }
    );
    console.log(json);
    res.end(json);

  } else if(parse.pathname == '/api/unixtime' && parse.query.iso != null){
    var date = new Date(parse.query.iso);
    var d = {};
    d["time"] = date.getTime();

    var json = (JSON.stringify({unixtime:d["time"]}));
    res.end(json);

  }

});
console.log(process.argv[2]);
server.listen(process.argv[2]);

*/

/* HTTP UPPER
var map = require('through2-map');

var http = require('http');

var server = http.createServer(function(req,res){
  //res.writeHead('Content-Type','text/plain');

  req.pipe(map(function (chunk){
    return chunk.toString().toUpperCase();
  })).pipe(res);

});

server.listen(process.argv[2]);
*/




/* HTTP File server
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
  res.writeHead('Content-Type','text/plain');
  var stream = fs.createReadStream(process.argv[3]);
  stream.pipe(res);
});

server.listen(process.argv[2]);
*/




/* Time server

var net = require('net');

var server = net.createServer(function(socket){
  var date = new Date();
  socket.write(date.getFullYear()+ "-"
  + (zeroFill(date.getMonth()+1)) + "-"
  + zeroFill(date.getDate()) + " "
  + zeroFill(date.getHours()) + ":"
  + zeroFill(date.getMinutes()) + "\n");
  socket.end();
});

server.listen(process.argv[2]);

function zeroFill( i )
{
  return (i<10 ? '0' : '') + i;
}
*/


/*var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3)
        printResults()
    }))
  })
}

for (var i = 0; i < 3; i++)
  httpGet(i)


---------------------------------------
var http = require('http');
var bl = require('bl');
var str = [];

http.get(process.argv[2],
  function(res){
    res.pipe(bl(function(req,res){
      if(req){console.error(req);}
      str.push(res.toString());

      http.get(process.argv[3],
        function(res){
          res.pipe(bl(function(req,res){
            if(req){console.error(req);}
            str.push(res.toString());

            http.get(process.argv[4],
              function(res){
                res.pipe(bl(function(req,res){
                  if(req){console.error(req);}
                  str.push(res.toString());
                  console.log(str[0]);
                  console.log(str[1]);
                  console.log(str[2]);
                }))
              });
          }))
        });
    }))
  });
*/


/* http collect

var http = require('http');
var bl = require('bl');

http.get(process.argv[2], function(res){
  res.pipe(bl(function(req,res){
    if(req){console.error(req);}
    var str = res.toString();
    console.log(str.length);
    console.log(str);
  }))
});
*/


/* HTTP no.1 !
var http = require('http');
http.get(process.argv[2], function(res){
  res.setEncoding("utf8").on("data", function(data){
    console.log(data);
  })
});
*/

/* module ex
var mod = require('./hellomodule');
mod(process.argv[2],process.argv[3], function(req,res){
  if(req){console.error(req);}
  for (var i = 0; i < res.length; i++) {
    console.log(res[i]);
  }
});
*/

/* Filename filtering
var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function(req,res){
  if(req){console.error(req);}
  for( var i = 0; i<res.length; i++){
    if(path.extname(res[i]) == '.' + process.argv[3]){
      console.log(res[i]);
    }
  }
})

*/


/* Async I/O
var fs = require('fs');

fs.readFile(process.argv[2], function(err,res){
  if(err){console.log(err);}
  var str = res.toString().split('\n');
  console.log(str.length-1);
});
*/


/* Synch IO
var fs = require('fs');

var buffer = fs.readFileSync(process.argv[2]);
var str = buffer.toString().split('\n');
console.log(str.length-1);
*/

/* Use Arguments
var sum = 0;

for(var i =2;i<process.argv.length;i++){
  sum += Number(process.argv[i]);
}

console.log(sum);
*/
