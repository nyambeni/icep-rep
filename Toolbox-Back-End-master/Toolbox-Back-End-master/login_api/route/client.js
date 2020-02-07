const express = require('express');
const route=express.Router();
const mysql = require('mysql');
const mysqlConn= require('../config/conn');
const secretOrKey = 'secretKey';
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

route.post('/sendMess', (req, res) => {
    let post = {msg:req.body.msg};
    let sql = 'INSERT INTO message SET ?';
    if(!post)
    {
        return res.send('please write the message');
    }
     mysqlConn.query(sql, post, (err, result) => {
        if(err) throw err;    
        res.send({status:200,result});
        res.end();
    });
});
//send message
route.post('/_sendMess', (req, res) => {
    let post = {msg:req.body.msg};
    let sql = 'INSERT INTO message SET ?';
    if(!post)
    {
        return res.send('google');
    }
    mysqlConn.query(sql, post, (err, result) => {
        if(err) throw err;
        
        res.send({status:200,result});
        res.end();
    });
});

//register
// Add a new user  
route.post('/register', function (req, res) {

    let post = ({name:req.body.name,surname:req.body.surname,
        email:req.body.email,address:req.body.address,
        password:req.body.password,contacts:req.body.contacts,address2:req.body.address2});
    
        if (!post){
            res.send({ msg: 'Please enter all fields' });
            res.end();
        }
      
        var user = post;
    
        bcrypt.hash(user.password, 10, function(err, hash){
                if(err) console.log(err);
                user.password = hash;
                //alert(user.password); //shows hashed password

                mysqlConn.query("INSERT INTO client SET ? ",[user], function (error, results, fields) {
                    if (error) throw error;
                    return res.send({status:200, data: results, message: 'New artisan has been created successfully.' });
                    });
                })



                
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
            text: 'You are successfuly registered to use loxionToolBox'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            
            }
          });
});

// Select all clients
route.get('/getClients', (req, res) => {
    let sql = 'SELECT * FROM client';
    let query = mysqlConn.query(sql, (err, results) => {
        if(err) throw err;
        res.send({status:200,results});
        res.end();
    });
});
// Select single client
route.get('/getClients/:clientId', (req, res) => {

     let clientID={clientID:req.body.clientID}
    let sql = `SELECT * FROM client WHERE clientID = ?`;
    let query = mysqlConn.query(sql,[clientID], (err, result) => {
        if(err) throw err;
        res.send({status:200,result});
    });
});


//total # of client
route.get('/totclient', (req, res) => {
    mysqlConn.query('SELECT count(clientID) AS "total registred clients" FROM client', (err, results, fields) => {
        if (!err)
  
            res.send({status:200,results});
        else
            res.send(err);
            res.end();
    })
  });

  route.post('/client/update', function (req, res) {
    let name=req.body.name;
    let email=req.body.email;
    let surname=req.body.surname;
    let clientID=req.body.clientID;
        
     if (!name ||!email ) {
       return res.status(400).send({ message: 'Please provide infor' });
     }
     
     
        mysqlConn.query('UPDATE client SET email=?, surname=?,  name=? WHERE clientID=?',[email,surname,name,clientID],function (error, results, fields) {
            if (error) throw error;
            return res.send({ data: results, message: 'client  updated successfuly.' });
        });
    });

module.exports=route;