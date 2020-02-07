const express = require('express');
const mysql = require('mysql');
const router=express.Router();
const mysqlConn= require('../config/conn');
//const bodyParser = require('body-parser');

//router.use(bodyParser.urlencoded({extended : true}));
//router.use(bodyParser.json());

//get all categories
 router.get('/_category', function (req, res) {
        mysqlConn.query('SELECT * FROM category', function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200, data: results });
        });
    }); 
    // Retrieve client/artisan with category id 
    router.get('/_category/:id', function (req, res) {  
        let post={cartID:req.body.cartId,cartName:req.body.cartName};
        let cartId=post.params.cartID;        
        mysqlConn.query('SELECT * FROM category WHERE id = ?', cartId, (error, result) => {
                if (error) throw error;
         
                response.send({status:200,result});
            });
        });


        router.post('/jobPoster', function (req, res) {
            let post = {name:req.body.name,surname:req.body.surname,email:req.body.email,image:req.body.image,
                        job_heading:req.body.job_heading,category:req.body.category,
                        contacts:req.body.contacts,location:req.body.location,full_description:req.body.full_description};
        
            var _email = req.body.email;
            if (!req.body.name||!req.body.surname||!req.body.email||
                !req.body.job_heading||!req.body.category||
                !req.body.contacts||!req.body.location||!req.body.full_description){
                return res.send({ msg: 'Please enter all fields from jah-man' });
           }
    
                    mysqlConn.query("INSERT INTO job_poster SET ? ",[post], function (error, results, fields) {
                        if (error) throw error;            
                        return res.send({status:200, results, message: 'New job has been posted successfully.' });
                        });  
        });


        router.get('/all_Jobs', function (req, res) {
            mysqlConn.query('SELECT * FROM job_poster j,category c WHERE c.catID=j.category', function (error, results, fields) {
                if (error) throw error;
                return res.send({status:200, data: results });
            });
        }); 


        router.post('/updatejob', (req, res) => {
            let post = ({name:req.body.name,surname:req.body.surname,
                job_heading:req.body.job_heading,category:req.body.category,
                contacts:req.body.contacts,full_description:req.body.full_description,
                location:req.body.location});
                let job_id =req.body.job_id;
        
                        let sql = "update job_poster set ? where job_id = ?";
                        mysqlConn.query(sql,[post,job_id], (err, result) => {
                        if(err) throw err;
                        res.send({status:200,result,message:"job updated successfully"});
                        res.end();});
                });


                router.post('/job_status', function (req, res) {
                    var job_id = (req.body.job_id);
                    mysqlConn.query('UPDATE  job_poster SET status = 1 where job_id = ? ',[job_id], function (error, results, fields) {
                        if (error) throw error;
                        return res.send({status:200,results, message: 'status updated.' });
                    });
                });

 module.exports = router;
