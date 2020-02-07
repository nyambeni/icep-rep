const mysql = require('mysql');
const express =require('express');
const router = express.Router();
const mysqlConn= require('../config/conn');
const secretOrKey = 'secretKey';
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
// router.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

// Retrieve all artisan
router.get('/artisan', function (req, res) {
    let userType={userType:req.body.userType};
    mysqlConn.query('SELECT * FROM artisan' ,function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'artisan list.' });
    });
});

//get all artisan application based on catID 1

router.get('/artisan/catID/1', function (req, res) {
    let catID=1;
    mysqlConn.query('SELECT * FROM artisan WHERE catID=?' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'artisan  list.' });
    });
});

//get all artisan application based on catID 2
router.get('/artisan/catID/2', function (req, res) {
    let catID=2;
    mysqlConn.query('SELECT * FROM artisan WHERE catID=?' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'artisan  list.' });
    });
});
//get all artisan application based on catID 3
router.get('/artisan/catID/3', function (req, res) {
    let catID=3;
    mysqlConn.query('SELECT * FROM artisan WHERE catID=?' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'artisan  list.' });
    });
});
//get all artisan application based on catID 4
router.get('/artisan/catID/4', function (req, res) {
    let catID=4;
    mysqlConn.query('SELECT * FROM artisan WHERE catID=?' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'artisan  list.' });
    });
});

//get all artisan application based on catID 5
router.get('/artisan/catID/5', function (req, res) {
    let catID=5;
    mysqlConn.query('SELECT * FROM artisan WHERE catID=?' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'artisan  list.' });
    });
});

// Retrieve artisan with id 
router.get('/artisan/:id', function (req, res) {
    let user_id = {artID:req.body.artID};
     
    mysqlConn.query('SELECT * FROM artisan WHERE artID = ?', [user_id], (error, result) => {
            if (error) throw error;
     
            res.send(result);
        });
    });

// Retrieve artisan with with thecategory
router.post('/artisan/catID', function (req, res) {
    let catID = req.body.catID;
     
    mysqlConn.query('SELECT * FROM artisan WHERE catID = ?',[catID], (error, result) => {
            if (error) throw error;
     
            return res.send(result);
        });
    });

// Add a new Artisan 
router.post('/artisan', function (req, res) {
    let post = {firstName:req.body.firstName,surname:req.body.surname,
        email:req.body.email,contacts:req.body.contacts,
        address:req.body.address,catID:req.body.catID,
        address2:req.body.address2,password:req.body.password,};
    if (!post) {
      return res.status(400).send({  message: 'Please provide user' });
    }

    if(req.body.password.length < 8)
    {
       res.send({ msg: 'Password must be atleast 8 characters' });
       res.end()
   
    };
    
    mysqlConn.query("INSERT INTO artisan SET ? ",[post], function (error, results, fields) {
  if (error) throw error;
    // return res.send({  data: results, message: 'New user has been created successfully.' });
    });
});

 //deleting from db
//  Delete user

router.put('/artisan/update', function (req, res) {
    let artID=req.body.artID;
   let post = {firstName:req.body.firstName,surname:req.body.surname,email:req.body.email,contacts:req.body.contacts,address:req.body.address,password:req.body.password};
    
     if (!post) {
       return res.status(400).send({ error: user, message: 'Please provide infor' });
     }
    
        mysqlConn.query('UPDATE artisan SET ? WHERE artID=?' ,[post,artID],function (error, results, fields) {
            if (error) throw error;
            return res.send({ data: results, message: 'client  updated successfuly.' });
        });
    });

router.delete('/artisan/:id', function (req, res) {
    let user_id = {userId:req.body.userId};
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    mysqlConn.query('DELETE FROM approved WHERE userId =?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ status:200, results, message: 'User has been updated successfully.' });
    });
    }); 

    //get approved artisan

router.get('/aprovedArt', function (req, res) {
    let status=1;
    mysqlConn.query('SELECT * FROM approved',function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved artisan  list.' });
    });
});


// approved artisan based on Category


router.get('/aprovedArt/catID/1', function (req, res) {
    let catID=1;

    mysqlConn.query('SELECT * FROM approved WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});

// category 2
router.get('/aprovedArt/catID/2', function (req, res) {
    let catID=2;
    
    mysqlConn.query('SELECT * FROM approved WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});

// category 3
router.get('/aprovedArt/catID/3', function (req, res) {
    let catID=3;
    
    mysqlConn.query('SELECT * FROM approved WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});

// category 4
router.get('/aprovedArt/catID/4', function (req, res) {
    let catID=4;
    
    mysqlConn.query('SELECT * FROM approved WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});

// category 5
router.get('/aprovedArt/catID/5', function (req, res) {
    let catID=5;
   
    mysqlConn.query('SELECT * FROM approved WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});

//declined artisan
router.get('/allapp', function (req, res) {
    
    mysqlConn.query('SELECT * FROM approved',function (error, data1, fields) {
        if (error) throw error;
   
        mysqlConn.query('SELECT * FROM declined',function (error, data, fields) {
            alldata=data1.concat(data);
            if (error) throw error;
            return res.send({status:200, data:alldata, message: 'approved artisan  list.' });
        });
    });

});

//declined artisan
router.get('/declinedartisan', function (req, res) {
    
    mysqlConn.query('SELECT * from declined',function (error, data, fields) {
        if (error) throw error;
        return res.send({status:200, data: data, message: 'approved artisan  list.' });
    });
});

//declined artisan based on category
router.get('/declinedartisan/catID/1', function (req, res) {
    let catID=1;
  
    mysqlConn.query('SELECT * FROM declined WHERE catID=? ',[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});
// category 2
router.get('/declinedartisan/catID/2', function (req, res) {
    let catID=2;
    
    mysqlConn.query('SELECT * FROM declined WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});
// category 3
router.get('/declinedartisan/catID/3', function (req, res) {
    let catID=3;
   
    mysqlConn.query('SELECT * FROM declined WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});
// category 4
router.get('/declinedartisan/catID/4', function (req, res) {
    let catID=4;
    
    mysqlConn.query('SELECT * FROM declined WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});
// category 5
router.get('/declinedartisan/catID/5', function (req, res) {
    let catID=5;
   
    mysqlConn.query('SELECT * FROM declined WHERE catID=? ' ,[catID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'approved  list.' });
    });
});
//total artisan application
router.get('/totalartisan', (req, res) => {
    mysqlConn.query('SELECT count(artID) AS number  FROM artisan', (err, results, fields) => {
        if (!err)
  
            res.send(results);
        else
            res.send();
            res.end();
    })
  });
// total application  for approved  Artisan
router.get('/totalApprovedArtisan', (req, res) => {

    mysqlConn.query('SELECT count(artID) AS "total_artisan_application" FROM approved ', (err, data, fields) => {
        if (!err)
  
            res.send(data);
        else
            res.send(err);
            res.end();
    })
  });
// total application  for declined artisan
router.get('/totaldeclinedArtisan', (req, res) => {
    mysqlConn.query('SELECT count(artID) AS "declinedArtisan" FROM declined', (err, data, fields) => {
        if (!err)
  
            res.send(data);
        else
            res.send(err);
            res.end();
    })
  });

//api for client
router.get('/client', function (req, res) {
    let userType={userType:req.body.userType};
    mysqlConn.query('SELECT * FROM client' ,function (error, results, fields) {
        if (error) throw error;
        return res.send({ status:200, data: results, message: 'client list.' });
    });
});
// Retrieve client/artisan with id 
router.get('/client/:id', function (req, res) {
    let clientID = {clientID:req.body.clientID};
     
    mysqlConn.query('SELECT * FROM client WHERE clientID = ?', [clientID], (error, result) => {
            if (error) throw error;
     
            res.send(result);
        });
    });
// Add a new user  
router.post('/client', function (req, res) {
    let post = {name:req.body.name,surname:req.body.surname,email:req.body.email,contacts:req.body.contacts,address:req.body.address,address2:req.body.address2,password:req.body.password};
    if (!post) {
      return res.send({status:400, message: 'Please provide user' });
    } else {
    mysqlConn.query("INSERT INTO client SET ? ",[post], function (error, results, fields) {
        if (error) {
        }
    return res.send({ status:200, data:results, message: 'New client has been created successfully.' });


    

    });
    
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
        text: 'You are successfully Registered, you can login now '
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
//update client
router.post('/client/update', function (req, res) {
let name=req.body.name;
let email=req.body.email;
let surname=req.body.surname;
let password=req.body.password;
let clientID=req.body.clientID;
    
 if (!name ||!email ) {
   return res.status(400).send({ message: 'Please provide infor' });
 }

    mysqlConn.query('UPDATE client SET email=?, surname=?,  name=?, password=? WHERE clientID=?',[email,surname,name,password,clientID],function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'client  updated successfuly.' });
    });
});
//update client
router.put('/client/update2', function (req, res) {
    let clientID=req.body.clientID;
   let post = {name:req.body.name,surname:req.body.surname,email:req.body.email,contacts:req.body.contacts,address:req.body.address,password:req.body.password};
    
     if (!post) {
       return res.status(400).send({ error: user, message: 'Please provide infor' });
     }
    
        mysqlConn.query('UPDATE client SET ? WHERE clientID=?' ,[post,clientID],function (error, results, fields) {
            if (error) throw error;
            return res.send({ data: results, message: 'client  updated successfuly.' });
        });
    });
//  Delete user
router.delete('/client/:id', function (req, res) {
    let clientID = {clientID:req.body.clientID};
    if (!clientID) {
        return res.status(400).send({ message: 'Please provide user_id' });
    }
    mysqlConn.query('DELETE FROM client WHERE clientID =?', [clientID], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'client has been updated successfully.' });
    });
    }); 

// total application for jobposter
router.get('/totaljobPoster', (req, res) => {
    mysqlConn.query('SELECT count(clientID) AS "total_client" FROM client', (err, results, fields) => {
        if (!err)
  
            res.send(results);
        else
            res.send(err);
            res.end();
    })
  });
//update status
    router.post('/artisan_status', function (req, res) {
        var artID = (req.body.artID);
        mysqlConn.query('UPDATE  artisan SET status = 1 where artID = ? ',[artID], function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200,results, message: 'status updated.' });



        });

    });








    router.post('/artisan_declined', function (req, res) {

        let post = {artID:req.body.artID,firstName:req.body.firstName,surname:req.body.surname,email:req.body.email,contacts:req.body.contacts,
            catID:req.body.catID,address:req.body.address,
            address2:req.body.address2,password:req.body.password,status:req.body.status,reason:req.body.reason};

            
        
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
            text: post.reason
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send('email sent successfully')
            }
          });

        
          
          
            mysqlConn.query("INSERT INTO declined SET ? ",[post], function (error, results, fields) {
                if (error) throw error;
                //   return res.send({  data: results, message: 'New user has been created successfully.' });
                  });
        
        
               
        

        {

            mysqlConn.query('DELETE FROM artisan WHERE artID =?', [post.artID], function (error, results, fields) {
                if (error) throw error;
                // return res.send({ status:200, results, message: 'User has been updated successfully.' });
            })


        };
        
                    
            
    
        

         
    });


    router.post('/artisan_approved', function (req, res) {

        let post = {artID:req.body.artID,firstName:req.body.firstName,surname:req.body.surname,email:req.body.email,contacts:req.body.contacts,
            catID:req.body.catID,address:req.body.address,
            address2:req.body.address2,password:req.body.password,status:req.body.status,reason:req.body.reason};

        
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
            text: post.reason
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send('email sent successfully')
            }
          });

        


        mysqlConn.query("INSERT INTO approved SET ? ",[post], function (error, results, fields) {
            if (error) throw error;
            //   return res.send({  data: results, message: 'New user has been created successfully.' });
              });


              mysqlConn.query('DELETE FROM artisan WHERE artID =?', [post.artID], function (error, results, fields) {
                if (error) throw error;
                
            })


        
    });
//  changing statuses


router.post('/approvedstatus', function (req, res) {
    var artID = req.body.artID;
    mysqlConn.query('UPDATE  approved SET status = 1 where artID = ? ',[artID], function (error, results, fields) {
        if (error) throw error;
        console.log('KG ', artID)
        return res.send({status:200,results, message: 'status updated.' });
    });
});


router.post('/approvedstatus2', function (req, res) {
    var artID = req.body.artID;
    mysqlConn.query('UPDATE  approved SET status = 0 where artID = ? ',[artID], function (error, results, fields) {
        if (error) throw error;
        return res.send({status:200,results, message: 'status updated.' });
    });
});




router.post('/declinedstatus', function (req, res) {
    var artID = req.body.artID;
    mysqlConn.query('UPDATE  declined SET status = 1 where artID = ? ',[artID], function (error, results, fields) {
        if (error) throw error;
        return res.send({status:200,results, message: 'status updated.' });
    });
});


router.post('/declinedstatus2', function (req, res) {
    var artID = req.body.artID;
    mysqlConn.query('UPDATE  declined SET status = 0 where artID = ? ',[artID], function (error, results, fields) {
        if (error) throw error;
        return res.send({status:200,results, message: 'status updated.' });
    });
});



    router.post('/clientStatus', function (req, res) {
        var clientID = (req.body.clientID);
        mysqlConn.query('UPDATE  client SET status = 1 where clientID = ? ',[clientID], function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200,results, message: 'status updated.' });
        });
    });


    router.post('/clientStatus2', function (req, res) {
        var clientID = (req.body.clientID);
        mysqlConn.query('UPDATE  client SET status = 0 where clientID = ? ',[clientID], function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200,results, message: 'status updated.' });
        });
    });




    router.post('/jobstatus', function (req, res) {
        var job_id = req.body.job_id;
        mysqlConn.query('UPDATE  job_poster SET status = 1 where job_id= ? ',[job_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200,results, message: 'status updated.' });
        });
    });


    router.post('/jobstatus2', function (req, res) {
        var job_id = req.body.job_id;
        mysqlConn.query('UPDATE  job_poster SET status = 0 where job_id = ? ',[job_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200,results, message: 'status updated.' });
        });
    });



////////////////////////////////

// api for categories
    router.get('/category', function (req, res) {
        mysqlConn.query('SELECT * FROM category', function (error, results, fields) {
            if (error) throw error;
            return res.send({ status:200, data: results, message: 'category list.' });
        });
    });    
    // Retrieve category by id
    router.get('/category/:id', function (req, res) {    
        let catid={catId:req.params.catId};        
        mysqlConn.query('SELECT * FROM category WHERE catId = ?',[catid] ,(error, result) => {
                if (error) throw error;        
                res.send(result);
            });
        });
    // Add a new category 
    router.post('/category', function (req, res) {
        let post = {catID:req.body.catID,catName:req.body.catName};
        if (!post) {
          return res.status(400).send({ message: 'Please provide user' });
        }       
        mysqlConn.query("INSERT INTO category SET ? ",[post], function (error, results, fields) {
      if (error) throw error;
        return res.send({status:200, results, message: 'New category has been created successfully.' });
        });
    });
//update a category
    router.put('/update/category', function (req, res) {
        let post = {catId:req.body.catId,CatName:req.body.CatName};
        if (!post) {
          return res.status(400).send({ message: 'Please provide user' });
        }       
        mysqlConn.query("UPDATE  category SET ? ",[post], function (error, results, fields) {
      if (error) throw error;
        return res.send({status:200, results, message: 'New category has been created successfully.' });
        });
    });
    //get all descriptions
    router.get('/description', function (req, res) {
        let userType={userType:req.body.userType};
        mysqlConn.query('SELECT description FROM category' ,function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200, results, message: 'description list.' });
        });
    }); 
    //  Deleting category
    router.delete('/category/:id', function (req, res) {
        let user_id = {catId:req.body.catId};
        if (!user_id) {
            return res.status(400).send({  message: 'Please provide user_id' });
        }
        mysqlConn.query('DELETE FROM category WHERE catId =?', [user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200,data:results, message: 'category has been updated successfully.' });
        }) 
    });
//GET ALL JOBS POSTED
    router.get('/job_poster', function (req, res) {
        mysqlConn.query('SELECT * FROM job_poster' ,function (error, results, fields) {
            if (error) throw error;
            return res.send({status:200, results, message: 'posted job list.' });
        });
    }); 

/// post a job
router.post('/post_job', function (req, res) {
    let post = {name:req.body.name,surname:req.body.surname,job_heading:req.body.job_heading,category:req.body.category,email:req.body.email,contacts:req.body.contacts,location:req.body.location,image:req.body.image,full_description:req.body.full_description};
    if (!post) {
      return res.send({status:400, message: 'Please provide your details' });
    } else {
    mysqlConn.query("INSERT INTO job_poster SET ? ",[post], function (error, results, fields) {
        if (error) {
        }
    return res.send({ status:200, data:results, message: 'New job posted successfully' });
    });

}
});







//GET ALL JOBS POSTED USING CATEGORY ID
router.get('/job/catID/:catID', function (req, res) {
    let catID=req.params.catID;
    mysqlConn.query('SELECT * FROM job_poster WHERE category="' + catID+ '"',function (error, results) {
        if (error) throw error;
        return res.send({status:200, data: results, message: 'job  list.' });
    });
});


router.get('/totalJobs', (req, res) => {
    
    mysqlConn.query('SELECT count(job_id) AS "total_job" FROM job_poster', (err, data, fields) => {
        if (!err)
            res.send(data);
        else
            res.send(err);
            res.end();
    })
  });



//declined artisan
router.get('/images', function (req, res) {
    
    mysqlConn.query('SELECT * from files',function (error, data, fields) {
        if (error) throw error;
        return res.send({status:200, data: data, message: 'artisan image  list.' });
    });
});


router.post('/sendMessgeEmail', function (req, res) {

    let job_id = req.body.job_id;
    let email=req.body.email;

	if (job_id) {
		//Sending an email
		

		mysqlConn.query("SELECT * FROM job_poster WHERE job_id =?",[job_id], function (err, results) {

			if (err) {
				res.send({
					message: err,
					status: 400
				})
			} else {
				if (results.length > 0) {
					//generating a number
					var OTPSent = randomstring.generate({
						length: 400,
						charset: 'string'
					});

					var transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: 'tukum.baloyi@gmail.com',
							pass: 'morrishalata'
						}
					});

					var mailOptions = {
						from: 'tukum.baloyi@gmail.com',
						to: email ,
						subject: 'job',
						text: 'job post: ' + '\n\n\n\n\n Regards loxionToolBox'
					};

					transporter.sendMail(mailOptions, function (err, res, info) {
						if (err) {
							res.send({
								message: err,
								status: 400
							})
						} else {
							res.json({
								status: 200,
								message: "A pin has been sent to your TUT4LIFE account."
							})
						}
					})

					// var myQuery2 = "UPDATE student SET otp = '" + OTPSent + "' WHERE student_id = '" + student_id + "'";
					// db.query(myQuery2, (err, results => {
					// 	if (err) {
					// 		// console.log(err);
					// 		res.json({
					// 			message: err,
					// 			status: 400
					// 		});
					// 	} else {
					// 		// console.log(results);
					// 		res.json({
					// 			message: "Otp Updated",
					// 			status: 200
					// 		});
					// 	}
					// }))

				} else {
					res.send({
						message: "The student number doesn't exists"
					})
				}
			}
		});
	}
});



// send mesange 2



router.post('/sendMessgeEmail2', function (req, res) {

    // let job_id = req.body.job_id;
    var mess=req.body.mess;
    var email=req.body.email;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'loxiontoolbox@gmail.com',
      pass: '1993#04a19B'
    }
  });
  
  var mailOptions = {
    from: 'loxiontoolbox@gmail.com',
    to: email,
    subject: 'LoxionToolBox',
    text: mess
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.send('email has been sent successfully')
    }
  });
});





module.exports=router;
