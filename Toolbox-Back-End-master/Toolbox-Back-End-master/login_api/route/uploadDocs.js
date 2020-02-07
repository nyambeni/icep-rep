var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './route/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'application/pdf'|| 'application/msword' ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({storage: storage,limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });
 //upload document
router.post("/_upload", upload.single('doc'), (req, res, next) => {
    
     var name = req.body.name;
     var path = req.file.path;

     mysqlConn.query("INSERT INTO files SET fileName = ?",[name],function (error, results, fields) {
      if (error) throw error;          
      return res.send({status:200, message: 'file uploaded successfully.' });
      });
});

router.get('/_download', function(req,res,next){
    filepath = path.join(__dirname,'./upload') +'/'+ req.body.name;
    res.sendFile(filepath);
    console.log(filepath);
});

module.exports = router;