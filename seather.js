#!/usr/bin/env node
//Scott Lindh 2018


var exports = module.exports = {};
var request = require('request');
var program = require('commander');
var crypto = require('crypto');
const fs = require('fs');

const encrypt = require('cifra').Encrypt;
const decrypt = require('cifra').Decrypt;

var baseurl = "https://sia.pixeldrain.com";

//Encrypts files using Node's built-in Cipher class. Encryption is stream-based for low memory footprint.
// Encryption : "aes-256-cbc" cipher algorithm


 program
  //.arguments('<file>')
  .option('-e, --encrypt <password>', '...to encrypt file')  
  .option('-c, --decrypt <password>', '...to de-crypt file')  
  .option('-u, --upload <file>', 'A file to upload')
  .option('-d, --download <id>', 'ID for file to download') 
  .parse(process.argv);

  if (program.upload){
    var file = process.argv.slice(2)[1];

      ///
      // check if need encryption
      if (program.encrypt){
          var randint = Math.random() * (0 - 1000) + 1000;
          var key = process.argv.slice(2)[3];
          console.log("Encryption Key: " + key);
          //var fileName = file + "." + randint + '.encrypted.dat';
          //console.log("Encrypted File Name: " + fileName);
            // Encrypt file.
          var fileName = file + ".enc";

            encrypt.file(file, key, "AES-256-CBC")
            .then(() => {
                //decrypt.file('./arg.js.enc','mafasd');
                  console.log('[FILE]: %s', fileName);
                    //Make POST request to API
                    var name = ""
                    fileUpload(name, fileName, function(result){
                        if(result.success){
                            if(result.body.success){
                                console.log(result.body.message);
                                console.log("Upload and Encryption a Success !");
                            }else{
                                console.log("Error uploading...");
                            }		
                        }else{
                            console.log(result.error);	
                        }
                    })                
            });                
                
      } else{
          //
            console.log('[FILE]: %s', file);
            //Make POST request to API
            var name = ""
            fileUpload(name, file, function(result){
                if(result.success){
                    if(result.body.success){
                        console.log(result.body.message);
                        console.log("Upload a Success, no encryption used !");
                    }else{
                        console.log("Error uploading...");
                    }		
                }else{
                    console.log(result.error);	
                }
            })
      }


      

  }else if (program.download){
    if (program.decrypt){
        var id = process.argv.slice(2)[1];
        console.log('[ID]: %s', id);
        var key = process.argv.slice(2)[3];
        console.log('[KEY]: %s', key);
        fileDownload(id, function(res){
          if(!res.error){
                // Decrypt file.
                decrypt.file(res.data, key, "AES-256-CBC")
                .then(() => {
                    console.log("File download and decription a success !");
                });
          }else{
              console.log("ERROR: ")
              console.log(res.data)
          }
      });

    }else{
        var id = process.argv.slice(2)[1];
        console.log('[ID]: %s', id);
        fileDownload(id, function(res){
          if(!res.error){
              console.log(res.data);
          }else{
              console.log("ERROR: ")
              console.log(res.data)
          }
      });
    }   

  }else{
      //

  }






function fileUpload(name, file, callback){
    var url = baseurl + "/api/file";
    var req = request.post(url, function (err, resp, body) {
        if (err) {
          console.log('Error!');
          console.log(err);
        } else {            
            body = JSON.parse(body);
            if(body.success){
                console.log(body);
                //console.log(url + "/" + body.id);
            }else{
                console.log({"id":"ERROR","success":false});
            }

        }
      });
      var form = req.form();
      
      
      var newfs = fs.createReadStream(file)
      var filedata = form.append('file', newfs);
      //var buffer = new Buffer(new Uint8Array(newfs))
      //form.append('file', buffer, {
      //  name: 'myfile.txt',
      //  contentType: 'text/plain'
      //});
};

//Make GET request to API
/*
apiRequest("/api/file/KChLlT/info", function(result){
	if(result.success){
		console.log(result.message);
	}else{
		console.log(result.error);	
	}
})
*/
function apiRequest(uri, callback){
	var url = baseurl + uri;
	//console.log(url);
	request.get(url, function (error, response, body) {
    if(error){
 			return callback({success:false, error:error});
		}else{
			return callback({success:true, message:body});
		}
	  //console.log('error:', error);
	  //console.log('statusCode:', response && response.statusCode); 
	  //console.log('body:', body);
	});
};


//info
//Get info for file id
//test id: Ey-Wpm KChLlT bPmbqD
/*
info("Ey-Wpm", function(res){
	if(!res.error){
		console.log(res.data);
	}else{
		console.log("ERROR: " + res.data)
	}
});
*/
function info(id, callback){
	apiRequest("/api/file/"+id+"/info", function(result){
        if(result.success){
            return callback({success:true, data:result.message});
        }else{
            return callback({success:false, data:result.error});	
        }
    })
}


//file download
//download file based on id
//test id: Ey-Wpm KChLlT bPmbqD
/*
fileDownload("Ey-Wpm", function(res){
	if(!res.error){
		console.log(res.data);
	}else{
        console.log("ERROR: ")
        console.log(res.data)
	}
});
*/
function fileDownload(id, callback){
    info(id, function(res){
        if(!res.error){
            info(id, function(res){
                if(!res.error){
                    //console.log(res.data);
                    var d = JSON.parse(res.data);
                    //console.log(d['file_name']);
                    var url2 = baseurl + "/api/file/" + id ;
                    var r = request(url2);
                    r.on('response',  function (res) {
                        res.pipe(fs.createWriteStream('./' + d['id'] + d['file_name']));
                        console.log("Download Done: " + './' + d['id'] + d['file_name']);
                        return callback({success:true, data:d['id'] + d['file_name']});
                    });
                }else{
                    console.log("ERROR: " + res.data)
                }
            });
        }else{
            console.log("ERROR: " + res.data)
        }
    });

}











