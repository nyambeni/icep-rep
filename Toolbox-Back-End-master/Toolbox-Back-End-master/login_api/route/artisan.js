const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const router=express.Router();
multer = require('multer');
const secretOrKey = 'secretKey';
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const mysqlConn= require('../config/conn');
const bodyParser = require('body-parser');
let bcrypt = require('bcryptjs');

router.post('/art/register', function (req, res) {
    let post = {firstName:req.body.firstName,surname:req.body.surname,
        email:req.body.email,contacts:req.body.contacts,
        catID:req.body.catID,password:req.body.password,
        address:req.body.address,address2:req.body.address2};

    var userType = 1;

     if (!req.body.firstName||!req.body.surname||!req.body.email||
       !req.body.contacts||!req.body.catID||!req.body.password||
       !req.body.address||!req.body.address2){
         return res.send({ msg: 'Please enter all fields from jah-man' });
    }
    else if(req.body.password.length < 8)
        {
           res.send({ msg: 'Password must be atleast 8 characters' }); 
           res.end();
          return res.send(error)
        }
           else
           {
            var user = post;
    
            // bcrypt.hash(user.password, 10, function(err, hash){
            //         if(err) console.log(err);
            //         user.password = hash;
            //         //alert(user.password); //shows hashed password

                    mysqlConn.query("INSERT INTO artisan SET ? ",[user], function (error, results, fields) {
                        if (error) throw error;
                        return res.send({status:200, data: results, message: 'New artisan has been created successfully.' });
                        });
                    // })




                    
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'loxiontoolbox@gmail.com',
              pass: '1993#04a19B'
            }
          });
          
          var mailOptions = {
            from: 'loxiontoolbox@gmail.com',
            to: post.email,
            subject: 'LoxionToolBox',
            text: 'You are successfully registered please wait to be approved'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              
            }
          });
            }
});

//retrieve msg
router.get('/_Mess', (req, res) => {
    let post = req.body.clientID;
    let sql = 'select msg from message WHERE clientID = '+ post;
    if(!post)
    {
        return res.send('PLEASE enter clientID');
    }
    let query = mysqlConn.query(sql, post, (err, result) => {
        if(err) throw err;  
        res.send({status:200,result});
        res.end();
    });
});
//show all jobposter
router.get('/art/all', (req, res) => {
    mysqlConn.query('SELECT * FROM artisan    ', (err, results, fields) => {
        if (!err)
            res.send({status:200,results});
        else
            res.send(err);
    })
});
router.get('/art/:artID', (req, res) => {

    let clientID={artID:req.body.artID}
   let sql = `SELECT * FROM client WHERE artID = ?`;
   let query = mysqlConn.query(sql,[artID], (err, result) => {
       if(err) throw err;
       res.send({status:200,result});
   });
});
router.get('/totalartisan_', (req, res) => {
  mysqlConn.query('SELECT count(artID) AS "Total_artisan" FROM artisan', (err, results, fields) => {
      if (!err)
          res.send(results);
      else
          res.send(err);
  })
});

router.get('/updateArtisans', (req, res) => {
    let post = ({firstName:req.body.firstName,surname:req.body.surname,
        email:req.body.email,contacts:req.body.contacts,
        password:req.body.password,address:req.body.address,
        address2:req.body.address2});
        let artID =req.body.artID;

        var user = post;
        bcrypt.hash(user.password, 10, function(err, hash){
                if(err) console.log(err);
                user.password = hash;

                let sql = "update artisan set ? where artID = ?";
                mysqlConn.query(sql,[user,artID], (err, result) => {
                if(err) throw err;
                res.send({status:200,result,message:"artisan updated successfully"});
                res.end();});
        });
    });



 module.exports = router;
 
