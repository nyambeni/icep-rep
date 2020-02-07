var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')
const mysqlConn= require('../config/conn');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
//uploading picture 
router.post("/upload", upload.single('pic'), (req, res, next) => {
    
     var name = req.file.filename;
     var path = req.file.path; 

     mysqlConn.query("INSERT INTO files SET fileName = ?",[name],function (error, results, fields) {
      if (error) throw error;          
      return res.send({name, message: 'picture uploaded successfully.' });
      });
});

router.get('/download', function(req,res,next){
    filepath = path.join(__dirname,'./upload') +'/'+ req.body.name;
    res.sendFile(filepath);
});


module.exports = router;