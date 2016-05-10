var filter = function(directoryName, filenameExt, callback){
  var list = [];
  var path = require('path');
  require('fs').readdir(directoryName, function(req,res){

    if(req){return callback(req, null)}
    for( var i = 0; i<res.length; i++){
      if(path.extname(res[i]) == '.' + filenameExt){
        list.push(res[i]);
      }
    }

    return callback(null,list);
  })
}

module.exports = filter;
