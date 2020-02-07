var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './route/upload/')
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname )
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'video/mpeg' || file.mimetype === 'video/x-msvideo'|| file.mimetype ==='video/mp4') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: {
    },
    fileFilter: fileFilter
  });
//uploading video 
router.post("/upload_", upload.single('video'), (req, res, next) => {
    
     var name = req.body.name;
     var path = req.file.path; 
     
     mysqlConn.query("INSERT INTO files SET fileName = ?",[name],function (error, results, fields) {
      if (error) throw error;          
      return res.send({ message: 'video uploaded successfully.' });
      });   
});

router.get('/download_', function(req,res,next){
    filepath = path.join(__dirname,'./upload') +'/'+ req.body.name;
    res.sendFile(filepath);
});
module.exports = router;